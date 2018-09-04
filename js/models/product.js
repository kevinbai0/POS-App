const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: String,
    price: Number
})
productSchema.methods.editPrice = function(price) {
    this.price = price;
    return this.price;
}

productSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
  
    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;
  
    next();
  });

var Product = mongoose.model("Product", productSchema);
module.exports = Product