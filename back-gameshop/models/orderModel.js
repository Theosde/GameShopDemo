const mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  total: Number,
  adresslivraison: String,
  datelivraison: Date,
  datepaiment: Date,
  statusorder: String,
  iduser: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  refproduct: [{quantity:Number, productId:{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }}],
})
var orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel;
