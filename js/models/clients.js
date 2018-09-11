const mongoose = require("mongoose");
const Product = require("./product");

var Schema = mongoose.Schema;
var clientSchema = new Schema({
    name: String,
    transactions: [{product: {_id: String, name: String}, quantity: Number, purchaseDate: Date, returnDate:Date, total: Number}]
})

var Client = mongoose.model("Client", clientSchema);
module.exports = Client