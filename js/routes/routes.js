const express = require("express");
const Product = require("../models/product");
const Client = require("../models/clients");
const productInfoFromClient = require("../methods/clientProductMapper");

const passport = require("../config/passport");
const auth = require("./auth");

var router = express.Router();
router.use(express.json());

router.post("/authentication/login", (req, res) => {
    passport.authenticate("local", (req, res) => {
        res.json({authenticated: true});
    })
})

router.get('/clients', (req, res) => {
    Client.find({}, (err, clients) => {
        res.send(clients);
    })
});

router.get("/clients/bundled", (req, res) => {
    let query = req.query.name == null ? "" : req.query.name;
    Product.find({},(err, products) => {
        Client.find({name: new RegExp(query, "i")}, (err, clients) => {
            let boosted = clients.map((client) => {
                // find the most recent unpaid date and find sum of all unpaid items
                let results = productInfoFromClient(products, client);
                var newClient = {
                    _id: client._id,
                    name: client.name,
                    transactions: client.transactions,
                    mostRecentDate: results.mostRecentDate,
                    sumOfDebt: results.sum,
                    productsOwedBlurb: results.blurbString
                }
                
                return newClient;
            });
            res.send(boosted);
        })
    })
})

router.get("/clients/:client_id", (req, res) => {
    Product.find({}, (err, products) => {
        Client.findById(req.params.client_id, (err, client) => {
            let results = productInfoFromClient(products, client);
    
            var newClient = {
                _id: client._id,
                name: client.name,
                transactions: client.transactions,
                mostRecentDate: results.mostRecentDate,
                sumOfDebt: results.sum,
                productsOwedBlurb: results.blurbString,
            }
    
            res.send(newClient);
        })
    })
})


router.get("/removeAll", (req, res) => {
    Client.deleteMany({}, (err) => {
    })
    Product.deleteMany({}, (err) => { res.send("Removed all")})
})
router.get("/removeClients", (req, res) => {
    Client.deleteMany({}, (err) => { res.send("Removed all")})
})

// add a client
router.post("/clients", (req, res) => {
    let name = req.body.name;
    var transactions = req.body.transactions;
    var normalizedTransactions = transactions.map((transaction) => {
        let newTransaction = {
            product: {
                _id: transaction.product._id,
                name: transaction.product.name
            },
            quantity: transaction.quantity,
            purchaseDate: Date.now(),
            returnDate: null
        }
        return newTransaction;
    });

    let newClient = new Client({
        name: name,
        transactions: normalizedTransactions
    })
    newClient.save((err) => {
        res.end("Success")
    });
})

router.put("/clients/:client_id", (req, res) => {
    let id = req.params.client_id;
    var newTransactions = req.body.newClient.transactions.map((transaction) => {
        if (transaction.purchaseDate == null) transaction.purchaseDate = Date.now();
        return transaction;
    });
    Client.findByIdAndUpdate(id, {
        transactions: newTransactions
    }, (err, item) => {
        res.end("Success");
    });
});

router.put("/transactions/clients/:client_id", (req, res) => {
    Product.find({}, (err, products) => {
        let id = req.params.client_id;
        var newTransactions = req.body.client.transactions.map((transaction) => {
            let mutable = transaction;
            if (transaction.returnDate == null) {
                transaction.returnDate = Date.now();
                let productPrice = products.find((product) => product._id == transaction.product._id).price;
                let total = transaction.quantity * productPrice;
                transaction.total = total;
            }
            return transaction;
        });
        Client.findOneAndUpdate({_id: id}, {
            transactions: newTransactions
        }, (err, result) => res.end("Sucess"));
    })
    
})

// get products
router.get("/products", (req, res) => {
	let query = req.query.name == null ? "" : req.query.name;
    Product.find({name: new RegExp(query, "i")}, (err, products) => {
        let sortedProducts = products.sort((a,b) => a.name < b.name ? -1 : 1);
        res.send(sortedProducts);
    });
});

// add a product
router.post("/products", (req, res) => {
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
        res.end("Success");
    })
});

router.get("/transactions/:number_of_recent", (req, res) => {
    let param = req.param.number_of_recent;
    Client.find({}, (err, clients) => {
        let allTransactions = []
        clients.forEach((client) => {
            client.transactions.forEach((transaction) => {
                if (transaction.returnDate != null) {
                    allTransactions.push({name: client.name, transaction: transaction});
                }
            });
        });

        let sorted = allTransactions.sort((a,b) => {
            return a.transaction.returnDate < b.transaction.returnDate ? 1 : -1;
        })
        console.log(sorted);
        res.send(sorted);
    })
});

module.exports = router;