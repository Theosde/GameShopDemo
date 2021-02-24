const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  name: String,
  genre: Array,
  desc: String,
  prix: Number,
  publisher: String,
  stock: Number,
  img: String,
  datedesortie: Date,
  platform: Array,

})
var productModel = mongoose.model('product', productSchema)

module.exports = productModel;
