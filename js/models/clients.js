const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var clientSchema = new Schema({
    name: String,
    products: [{uniqueId: String, productId: String, quantity: Number, purchaseDate: Date, returnDate:Date}]
})

var Client = mongoose.model("Client", clientSchema);
module.exports = Client