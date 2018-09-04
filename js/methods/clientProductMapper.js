
const productInfoFromClient = async (Product, client) => {
    let mostRecentDate = null
    let sum = 0;
    var owedProducts = [] // {name and quantity}
    await Promise.all(client.products.map(async (product) => {
        // product: { _id: "", quantity: x, purchaseDate: Date, returnDate: Date }
        if (product.returnDate == null) {
            if (mostRecentDate == null) mostRecentDate = product.purchaseDate;
            else {
                if (product.purchaseDate > mostRecentDate) mostRecentDate = product.purchaseDate;
            }
            // add up the sum
            await Product.findById(product.productId, function(err, found) {
                console.log(found);
                sum += found.price * product.quantity;
                owedProducts.push({product: found, quantity: product.quantity});
            });
        }
    }))
    let blurbString = "";
    for (var i = 0; i < owedProducts.length; i++) {
        if (i < 3) {
            blurbString += owedProducts[i].quantity + " " + owedProducts[i].product.name.toLowerCase();
        }
        if (i < 2 && i + 1 != owedProducts.length) blurbString += " • ";
        else if (i == 3) blurbString += "...";
    }

    return {mostRecentDate: mostRecentDate, sum: sum, owedProducts: owedProducts, blurbString: blurbString};
}

module.exports = productInfoFromClient;