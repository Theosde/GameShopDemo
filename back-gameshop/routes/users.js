var express = require('express');
var router = express.Router();

var userModel = require('../models/usersModel')
var orderModel = require('../models/orderModel')
var gameModel = require('../models/productModel')




var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");

var uid2 = require("uid2");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});




// inscription
router.get('/signup/:firstname/:lastname/:birthday/:email/:phone/:rue/:codePostal/:ville/:civilite/:password', function(req, res, next) {

  var myPassword = req.params.password;
  var salt = uid2(32);

  var nbClient = uid2(10);


  var myPasswordHacke = SHA256(myPassword + salt).toString(encBase64);

  console.log(req.params);

  userModel.findOne({email:req.params.email},function(error,findUser){
    if (findUser) {
      res.json({result:false, error:"cette email ets déja lie a un compte"})
    }else {

      var newUser = new userModel({
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        birthday: req.params.birthday,
        email: req.params.email,
        phone: req.params.phone,
        password: myPasswordHacke,
        salt: salt,
        adresse: {rue:req.params.rue,codePostal:req.params.codePostal,ville:req.params.ville},
        adresselivraison: {rue:req.params.rue,codePostal:req.params.codePostal,ville:req.params.ville},
        avatar: "",
        civilite: req.params.civilite,
        numeroclient: nbClient,
        panier: [],
      });
      newUser.save(function(error, user) {
        if(error) {
          console.log(error);
        }else {
          console.log(user);
          res.json({user, result:true, error:""})
        }
      });
    }

  });

});


// inscription
router.post('/signup', function(req, res, next) {

  var myPassword = req.body.password;
  var salt = uid2(32);

  var nbClient = uid2(15);


  var myPasswordHacke = SHA256(myPassword + salt).toString(encBase64);

  console.log(req.body);

  userModel.findOne({email:req.body.email},function(error,findUser){
    if (findUser) {
      res.json({result:false, error:"cette email ets déja lie a un compte"})
    }else {

      var newUser = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        email: req.body.email,
        phone: req.body.phone,
        password: myPasswordHacke,
        salt: salt,
        adresse: {rue:req.body.rue,codePostal:req.body.codePostal,ville:req.body.ville},
        adresselivraison: {rue:req.body.rue,codePostal:req.body.codePostal,ville:req.body.ville},
        avatar: req.body.avatar,
        civilite: req.body.civilite,
        numeroclient: nbClient,
        panier: [],
      });
      newUser.save(function(error, user) {
        if(error) {
          console.log(error);
        }else {
          userModel.findOne({"email":req.params.email})
          .populate({path: 'panier'})
          .exec(function (err, findUser) {
            res.json({user:findUser})
          })
        }
      });
    }

  });

});



// connection
router.post('/signin', function(req, res, next) {
  console.log(req.body);
  userModel.findOne({email:req.body.email},function(error,findUser){
    if (findUser != null) {

      var mdp = SHA256(req.body.password + findUser.salt).toString(encBase64);;

      if (findUser.password === mdp ) {
        console.log("password ok");

        res.json({user:findUser, result:true, error:""})

      }else {
        console.log("password fail");
        res.json({result:false, error:"password"})
      }

    }else {
      res.json({result:false, error:"email"})
    }
  });
})

// connection
router.get('/signin/:email/:password', function(req, res, next) {
  console.log(req.params);

  userModel.findOne({"email":req.params.email})
  .populate({path: 'panier'})
  .exec(function (err, findUser) {
    if (findUser != null) {

      var mdp = SHA256(req.params.password + findUser.salt).toString(encBase64);;

      if (findUser.password === mdp ) {
        console.log("password ok");
        res.json({user:findUser, result:true, error:""})

      }else {
        console.log("password fail");
        res.json({result:false, error:"password"})
      }

    }else {
      res.json({result:false, error:"email"})
    }

  })


})



// add user
router.post('/add-user', function(req, res, next) {
console.log(req.body);
  var newUser = new userModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    salt: req.body.salt,
    adresse: req.body.adresse,
    adresselivraison: req.body.adresselivraison,
    panier: req.body.panier
  })
  newUser.save(function(error,envoieNewUser){
    if (error) {
      console.log(error);
    }else {
      console.log(envoieNewUser);
      res.json({user:envoieNewUser, result:true})
    }
  })
});



// add article in panier
router.get('/add-productinpanier/:email/:idProduct', function(req, res, next) {

  userModel.findOneAndUpdate({"email":req.params.email},{$push:{ panier:req.params.idProduct}},{new:true},function(error,newarticle){
    userModel.findOne({"email":req.params.email})
    .populate({path: 'panier'})
    .exec(function (err, newUser) {
      console.log(newUser);
      res.json({user:newUser})
    })

  })

});



// add article in panier
router.get('/gestionpanier/:email/:idProduct/', function(req, res, next) {

  userModel.findOne({"email":req.params.email},function (err, findUser) {

    var newPanier = findUser.panier.filter(e => e != req.params.idProduct)

    userModel.findOneAndUpdate({"email":req.params.email },{ panier: newPanier },{new:true},function(error,newarticle){

      userModel.findOne({"email":req.params.email})
      .populate({path: 'panier'})
      .exec(function (err, newUser) {
        console.log(newUser);
        res.json({user:newUser})
      })

    })

  })

});

// recup data user
router.get('/get-user/:email', function(req, res, next) {
  console.log("email",req.params.email);

  userModel.find({"email":req.params.email})
  .populate({path: 'panier'})
  .exec(function (err, findUser) {
    res.json({user:findUser[0]})
  })

});


// recup data user
router.get('/savecommand/:total/:adresslivraison/:datelivraison/:datepaiment/:iduser/:refproduct', function(req, res, next) {

   var idProduct = req.params.refproduct.split("_")

   // var datelivraison = new Date(req.params.datelivraison.slice(0,10))
   // var datepaiment = new Date(req.params.datepaiment.slice(0,10))

  var newOrder = new orderModel({
    total: req.params.total,
    adresslivraison: req.params.adresslivraison,
    datelivraison:  req.params.datelivraison,
    datepaiment:  req.params.datepaiment,
    statusorder: "livraison",
    iduser: req.params.iduser,
    refproduct: idProduct
  })
  newOrder.save(function(error,envoieNewOrder){
    if (error) {
      console.log(error);
    }else {
      console.log(envoieNewOrder);

      userModel.findOneAndUpdate({"_id":req.params.iduser},{ panier:[]},{new:true},function(error,newarticle){

        userModel.findOne({"_id":req.params.iduser})
        .populate({path: 'panier'})
        .exec(function (err, findUser) {
          res.json({user:findUser})
        })
      })

    }
  })

});


// recup data COMMAND
router.get('/get-order/:iduser', function(req, res, next) {

  orderModel.find({"iduser":req.params.iduser})
  .populate({path: 'refproduct.productId', populate: {path: 'productId', model:"product"} })
  .exec(function (err, findOrder) {
    console.log(findOrder);
    res.json({order:findOrder})
  })

});


// recup data COMMAND dashbord
router.get('/get-order-dashbord', function(req, res, next) {

  orderModel.find({})
  .populate({path: 'refproduct.productId', populate: {path: 'productId', model:"product"} })
  .exec(function (err, findOrder) {
    console.log(findOrder);
    res.json({order:findOrder})
  })

});

// recup data COMMAND Date
router.get('/get-order-dashbord/day', function(req, res, next) {
//datepaiment
  dateInitial = new Date()
  dateInitial.setHours(23)
  dateInitial.setMinutes(29)
  dateInitial.setSeconds(59)

  console.log(dateInitial.getHours());

  orderModel.find({ datepaiment: { $gt : new Date(dateInitial.setDate(dateInitial.getDate() - 1)) }    })
  .populate({path: 'refproduct.productId', populate: {path: 'productId', model:"product"} })
  .exec(function (err, findOrder) {
    console.log(findOrder);
    res.json({order:findOrder})
  })

});


// change adress livraison
router.get('/set-adresslivraison/:iduser/:firstname/:lastname/:rue/:codePostal/:adresseComplementaire/:ville/:pays', function(req, res, next) {

  userModel.findOneAndUpdate(
    {"_id":req.params.iduser},
    { adresselivraison:{
      "firstname": req.params.firstname,
      "lastname": req.params.lastname,
      "rue": req.params.rue,
      "codePostal": req.params.codePostal,
      "adresseComplementaire": req.params.adresseComplementaire,
      "ville": req.params.ville,
      "pays": req.params.pays
    }},
    {new:true}
  )
  .populate({path: 'panier'})
  .exec(function (err, newUser) {
    res.json({user:newUser})
  })




});



// Validation changement des stock + transforme panier en commande
router.get('/validation_panier/:iduser/:total/:allproduct', function(req, res, next) {

  console.log(req.params.allproduct);

  function chunkArray(myArray, chunk_size){
      var index = 0;
      var arrayLength = myArray.length;
      var tempArray = [];

      for (index = 0; index < arrayLength; index += chunk_size) {
          myChunk = myArray.slice(index, index+chunk_size);
          // Do something if you want with the group
          tempArray.push(myChunk);
      }

      return tempArray;
  }

  var datePaiment = new Date()
  var dateInitial = new Date()
  var dateModify = new Date(dateInitial.setDate(dateInitial.getDate() + 7));

  console.log("dateInitial",datePaiment);
  console.log("dateModify",dateModify);

  console.log(req.params.allproduct);

  reg = new RegExp('.|_');
  var tableIdProduct = req.params.allproduct.split(/[._]/);


  console.log("tableau foo",tableIdProduct);


  var tableGame = tableIdProduct.filter( e => {
    return e.length > 5
  } )
  console.log("tableau id game",tableGame);

  var newTableGame = chunkArray(tableIdProduct, 2);
  console.log("tableau divise un sur 2",newTableGame);


  var infopourBdd = [];
  for (var i = 0; i < newTableGame.length; i++) {
    infopourBdd.push({quantity:newTableGame[i][1], productId:newTableGame[i][0]})
  }

  console.log("table product pour bdd",infopourBdd);


  for (var i = 0; i < newTableGame.length; i++) {
    gameModel.updateOne({ _id: newTableGame[i][0]}, { $inc: {stock: -newTableGame[i][1], "metrics.orders": 1 }  }, function(error, raw) {});
  }




  userModel.findOneAndUpdate({"_id":req.params.iduser},{ panier: [] },{new:true},function(error,findUser){
    console.log("Find User",findUser.adresselivraison);

    var newOrder = new orderModel({
      total: req.params.total,
      adresslivraison: findUser.adresselivraison,
      datelivraison: dateModify,
      datepaiment: datePaiment,
      statusorder: "En Attente",
      iduser: req.params.iduser,
      refproduct: infopourBdd,
    })

    console.log(newOrder);

    newOrder.save(function(error,EnvoiNewOrder){
      if (error) {
        console.log(error);
      }else {
        console.log("AZERTYUIOP",EnvoiNewOrder);

        res.json({order:EnvoiNewOrder, user:findUser, result:true})
      }
    })



  })



});








module.exports = router;
