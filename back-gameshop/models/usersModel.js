const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  birthday: Date,
  email: String,
  phone: String,
  password: String,
  salt: String,
  adresse: {rue:String,codePostal:String,ville:String, adresseComplementaire:String, pays:String},
  adresselivraison: {firstname: String,lastname: String,rue:String,codePostal:String,ville:String, adresseComplementaire:String, pays:String},
  avatar: String,
  civilite: Boolean,
  numeroclient: String,
  panier: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
})
var usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel;
