const express = require('express');
const app = express();
const path = require("path");

const productInfoFromClient = require("./js/methods/clientProductMapper");

const mongoose = require("mongoose");
mongoose.connect("mongodb://kevinbai:victor-cardenas123@ds145072.mlab.com:45072/mydb", {useNewUrlParser: true});

var Product = require("./js/models/product");
var Client = require("./js/models/clients");

var router = express.Router();

router.use(express.json());

// Serve any static files
app.use(express.static(path.join(__dirname, 'front-end/build')));
// Handle React routing, return all requests to React app
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
});
app.get("/products", (req, res) => {
    res.sendFile(path.join(__dirname, 'front-end/build', 'index.html'));
})

// get clients
router.get('/clients', (req, res) => {
    Client.find({}, (err, clients) => {
        res.send(clients);
    })
});

router.get("/clients/bundled", (req, res) => {
    console.log("GET CLIENTS");
    let query = req.query.name == null ? "" : req.query.name;

    Client.find({name: new RegExp(query, "i")}, async (err, clients) => {
        let boosted = await Promise.all(clients.map(async (client) => {
            // find the most recent unpaid date and find sum of all unpaid items
            let results = await productInfoFromClient(Product, client);
            var newClient = {
                _id: client._id,
                name: client.name,
                products: client.products,
                mostRecentDate: results.mostRecentDate,
                sumOfDebt: results.sum,
                productsOwedBlurb: results.blurbString
            }
            
            return newClient;
        }));
        res.send(boosted);
    })
})

router.get("/clients/:client_id", (req, res) => {
    
    Client.findById(req.params.client_id, async (err, client) => {
        let results = await productInfoFromClient(Product, client);

        var newClient = {
            _id: client._id,
            name: client.name,
            products: client.products,
            mostRecentDate: results.mostRecentDate,
            sumOfDebt: results.sum,
            productsOwedBlurb: results.blurbString,
            currentProductsOwed: results.owedProducts,
        }

        res.send(newClient);
    })
})


router.get("/removeAll", (req, res) => {
    Client.deleteMany({}, (err) => {
    })
    Product.deleteMany({}, (err) => { res.send("Removed all")})
})

// add a client
router.post("/clients", (req, res) => {
    let name = req.body.name;
    var products = req.body.products;
    var normalizedProducts = products.map((product) => {
        product.purchaseDate = Date.now();
        product.returnDate = null;
        return product;
    });

    let newClient = new Client({
        name: name,
        products: normalizedProducts
    })
    newClient.save(() => {})
    res.end("Success");
})

router.put("/clients/:client_id", (req, res) => {
    let id = req.params.client_id;
    var products = req.body.newProducts.map((product) => {
        if (product.purchaseDate == null) product.purchaseDate = Date.now();
        if (product.returnDate == null) product.returnDate = null;
        return product;
    });
    Client.findByIdAndUpdate(id, {
        products: products
    }, (err, item) => {
        res.end("Success");
    });
})

router.put("/transactions/clients/:client_id", (req, res) => {
    let id = req.params.client_id;
    Client.findById(id, (err, client) => {
        var newProducts = client.products.map((product) => {
            if (product.returnDate == null) {
                product.returnDate = Date.now();
            }
            return product;
        });
        // update client
        Client.findByIdAndUpdate(id, { products: newProducts}, (err, client) => res.end("Complete"));
    })
})

// get products
router.get("/products", (req, res) => {
    Product.find({}, (err, products) => {
        let sortedProducts = products.sort((a,b) => a.name < b.name ? -1 : 1);
        console.log(sortedProducts);
        res.send(sortedProducts);
    });
});

// add a product
router.post("/products", (req, res) => {
    console.log("Request");
    console.log(req.body);
    let name = req.body.name;
    let price = req.body.price;
    let newProduct = new Product({
        name: name,
        price: price
    });
    newProduct.save(() => res.end("Okay"));
    res.end("Okay");
    
});

// edit a product
router.put("/products/:product_id", (req, res) => {
    let id = req.params.product_id;
    let newPrice = req.body.price;
    Product.findOneAndUpdate({_id: id}, {price: newPrice}, (err,user) => {
    })
    res.end("Success");
})
app.use("/api", router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Running on port " + port));