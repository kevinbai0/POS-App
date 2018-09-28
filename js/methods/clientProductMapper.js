
const productInfoFromClient = (products, client) => {
    let mostRecentDate = null
    let sum = 0;
    var owedProducts = [] // {name and quantity}
    client.transactions.map((transaction) => {
        // product: { _id: "", quantity: x, purchaseDate: Date, returnDate: Date }
        if (transaction.returnDate == null) {
            if (mostRecentDate == null) mostRecentDate = transaction.purchaseDate;
            else {
                if (transaction.purchaseDate > mostRecentDate) mostRecentDate = transaction.purchaseDate;
            }
            let found = products.find((product) => product._id == transaction.product._id);
            sum += found.price * transaction.quantity;
            owedProducts.push({product: found, quantity: transaction.quantity, purchaseDate: transaction.purchaseDate});
        }
    })
    let blurbString = "";
    for (var i = 0; i < owedProducts.length; i++) {
        if (i < 3) {
            blurbString += owedProducts[i].quantity + " " + owedProducts[i].product.name.toLowerCase();
        }
        if (i < 2 && i + 1 != owedProducts.length) blurbString += " • ";
        else if (i == 3) blurbString += "...";
    }
    return {mostRecentDate: mostRecentDate, sum: sum, blurbString: blurbString};
}

module.exports = productInfoFromClient;