var express = require('express');
var router = express.Router();
var gameModel = require('../models/productModel')
var orderModel = require('../models/orderModel')


const stripe = require ("stripe")("sk_test_y6MBey91UuUxT5paKOTPJ10S00nBIuulsY")


//Stripe Root
router.post('/checkout', async function(req,res,next){
  console.log(req.body);

  res.json({result:true})
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  console.log("route home");
  gameModel.find({},function(error,allGames){
    console.log("allGames");
    // console.log(allGames);
    res.json({result:true, games:allGames});
  });
});


router.post('/add-game', function(req, res, next) {

console.log(req.body);

  var newGame = new gameModel({
    name: req.body.name,
    genre: req.body.genre,
    desc: req.body.desc,
    prix: req.body.prix,
    publisher: req.body.publisher,
    stock: req.body.stock,
    img: req.body.img,
    datedesortie: req.body.datedesortie,
    platform: req.body.platform
  })

  console.log(newGame);


  newGame.save(function(error,envoieNewGame){
    if (error) {
      console.log(error);
    }else {
      console.log(envoieNewGame);
      res.json({game:envoieNewGame, result:true})
    }
  })

});

router.get('/productpage/:idProduct', function(req, res, next) {
  gameModel.findOne({_id:req.params.idProduct},function(error,theGame){
    console.log(theGame);
    res.json({result:true, games:theGame});
  });
});


router.get('/verifStock/:listIdProduit', function(req, res, next) {
  tableIdProduct = req.params.listIdProduit.split("_")
  gameModel.find({_id: { $in: tableIdProduct }  },function(error,InfoProduct){
    res.json({result:true, infoProduct:InfoProduct});
  });

});



///get-order-state-day
router.get('/get-order-state-day', function(req, res, next) {

  var initialDate = new Date()
  initialDate.setHours(23)
  initialDate.setMinutes(29)
  initialDate.setSeconds(59)


  orderModel.find({ datepaiment: { $gt : new Date(initialDate.setDate(initialDate.getDate() - 1)) }    },function(error,OrderDay){


    OrderDay.sort(function(a,b){return new Date(a.datepaiment) - new Date(b.datepaiment)})

    console.log(OrderDay);

    var trancheHour1 = {total: 0, orders:[]}
    var trancheHour2 = {total: 0, orders:[]}
    var trancheHour3 = {total: 0, orders:[]}
    var trancheHour4 = {total: 0, orders:[]}
    var trancheHour5 = {total: 0, orders:[]}
    var trancheHour6 = {total: 0, orders:[]}



    for (var i = 0; i < OrderDay.length; i++) {


      if (OrderDay[i].datepaiment.getHours() <= 4) {
        trancheHour1.total = trancheHour1.total + OrderDay[i].total
        trancheHour1.orders.push(OrderDay[i])
      }else if (OrderDay[i].datepaiment.getHours() <= 8) {
        trancheHour2.total = trancheHour2.total + OrderDay[i].total
        trancheHour2.orders.push(OrderDay[i])
      }else if (OrderDay[i].datepaiment.getHours() <= 12) {
        trancheHour3.total = trancheHour3.total + OrderDay[i].total
        trancheHour3.orders.push(OrderDay[i])
      }else if (OrderDay[i].datepaiment.getHours() <= 16) {
        trancheHour4.total = trancheHour4.total + OrderDay[i].total
        trancheHour4.orders.push(OrderDay[i])
      }else if (OrderDay[i].datepaiment.getHours() <= 20) {
        trancheHour5.total = trancheHour5.total + OrderDay[i].total
        trancheHour5.orders.push(OrderDay[i])
      }else if (OrderDay[i].datepaiment.getHours() <= 23) {
        trancheHour6.total = trancheHour6.total + OrderDay[i].total
        trancheHour6.orders.push(OrderDay[i])
      }


    }

    var tableStateDay = [trancheHour1,trancheHour2,trancheHour3,trancheHour4,trancheHour5,trancheHour6]
    console.log(tableStateDay);



    res.json({result:true, OrderStatDay:tableStateDay});
  });

});


///get-order-state-day
router.get('/get-order-state-month/:month/:annee', function(req, res, next) {

  console.log(req.params.month);
  console.log(req.params.annee);

  orderModel.find({},function(error,AllOrder){

    AllOrder.filter(e =>{
      return e.datepaiment.getFullYear() == req.params.annee
    })


    AllOrder.filter(e =>{
      return e.datepaiment.getMonth() == req.params.month
    })

    AllOrder.sort(function(a,b){return new Date(a.datepaiment) - new Date(b.datepaiment)})


    console.log("AllOrder",AllOrder.length);


    var TranchMoins1 = {total: 0, orders:[]}
    var TranchMoins2 = {total: 0, orders:[]}
    var TranchMoins3 = {total: 0, orders:[]}
    var TranchMoins4 = {total: 0, orders:[]}
    var TranchMoins5 = {total: 0, orders:[]}

    for (var i = 0; i < AllOrder.length; i++) {

      if (AllOrder[i].datepaiment.getDate() <= 7) {
        TranchMoins1.total = TranchMoins1.total + AllOrder[i].total
        TranchMoins1.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getDate() <= 14) {
        TranchMoins2.total = TranchMoins2.total + AllOrder[i].total
        TranchMoins2.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getDate() <= 22) {
        TranchMoins3.total = TranchMoins3.total + AllOrder[i].total
        TranchMoins3.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getDate() <= 29) {
        TranchMoins4.total = TranchMoins4.total + AllOrder[i].total
        TranchMoins4.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getDate() <= 31) {
        TranchMoins5.total = TranchMoins5.total + AllOrder[i].total
        TranchMoins5.orders.push(AllOrder[i])
      }


    }
    var tableStateMois = [TranchMoins1,TranchMoins2,TranchMoins3,TranchMoins4,TranchMoins5]
    console.log(tableStateMois);


    res.json({result:true, OrderStatMonth:tableStateMois});
  });


});

///get-order-state-day
router.get('/get-order-state-annee/:annee', function(req, res, next) {

  console.log(req.params.annee);

  orderModel.find({},function(error,AllOrder){

    AllOrder.filter(e =>{
      return e.datepaiment.getFullYear() == req.params.annee
    })

    AllOrder.sort(function(a,b){return new Date(a.datepaiment) - new Date(b.datepaiment)})


    console.log("AllOrder",AllOrder.length);


    var tranchAnnee1 = {total: 0, orders:[]}
    var tranchAnnee2 = {total: 0, orders:[]}
    var tranchAnnee3 = {total: 0, orders:[]}
    var tranchAnnee4 = {total: 0, orders:[]}
    var tranchAnnee5 = {total: 0, orders:[]}
    var tranchAnnee6 = {total: 0, orders:[]}
    var tranchAnnee7 = {total: 0, orders:[]}
    var tranchAnnee8 = {total: 0, orders:[]}
    var tranchAnnee9 = {total: 0, orders:[]}
    var tranchAnnee10 = {total: 0, orders:[]}
    var tranchAnnee11 = {total: 0, orders:[]}
    var tranchAnnee12 = {total: 0, orders:[]}


    for (var i = 0; i < AllOrder.length; i++) {

      if (AllOrder[i].datepaiment.getMonth() == 0) {
        tranchAnnee1.total = tranchAnnee1.total + AllOrder[i].total
        tranchAnnee1.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 1) {
        tranchAnnee2.total = tranchAnnee2.total + AllOrder[i].total
        tranchAnnee2.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 2) {
        tranchAnnee3.total = tranchAnnee3.total + AllOrder[i].total
        tranchAnnee3.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 3) {
        tranchAnnee4.total = tranchAnnee4.total + AllOrder[i].total
        tranchAnnee4.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 4) {
        tranchAnnee5.total = tranchAnnee5.total + AllOrder[i].total
        tranchAnnee5.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 5) {
        tranchAnnee6.total = tranchAnnee6.total + AllOrder[i].total
        tranchAnnee6.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 6) {
        tranchAnnee7.total = tranchAnnee7.total + AllOrder[i].total
        tranchAnnee7.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 7) {
        tranchAnnee8.total = tranchAnnee8.total + AllOrder[i].total
        tranchAnnee8.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 8) {
        tranchAnnee9.total = tranchAnnee9.total + AllOrder[i].total
        tranchAnnee9.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 9) {
        tranchAnnee10.total = tranchAnnee10.total + AllOrder[i].total
        tranchAnnee10.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 10) {
        tranchAnnee11.total = tranchAnnee11.total + AllOrder[i].total
        tranchAnnee11.orders.push(AllOrder[i])
      }else if (AllOrder[i].datepaiment.getMonth() == 11) {
        tranchAnnee12.total = tranchAnnee12.total + AllOrder[i].total
        tranchAnnee12.orders.push(AllOrder[i])
      }


    }
    var tableStateAnnee = [tranchAnnee1,tranchAnnee2,tranchAnnee3,tranchAnnee4,tranchAnnee5,tranchAnnee6,tranchAnnee7,tranchAnnee8,tranchAnnee9,tranchAnnee10,tranchAnnee11,tranchAnnee12]
    console.log(tableStateAnnee);


    res.json({result:true, OrderStatYear:tableStateAnnee});
  });


});


///get-order-state-day
router.get('/get-order-state-week', function(req, res, next) {

  var initialDate = new Date()
  initialDate.setHours(23)
  initialDate.setMinutes(29)
  initialDate.setSeconds(59)


  orderModel.find({ datepaiment: { $gte : new Date(initialDate.setDate(initialDate.getDate() - 6)) }    },function(error,OrderDay){


    OrderDay.sort(function(a,b){return new Date(a.datepaiment) - new Date(b.datepaiment)})

    var RefWeek = new Date()
    var lundi = RefWeek.getDate() - (RefWeek.getDay()-1)
    var arrayDayWeek = []


    for (var i = 0; i < OrderDay.length; i++) {
      if (OrderDay[i].datepaiment.getDate() >= 16) {
        console.log(OrderDay[i]);
        arrayDayWeek.push(OrderDay[i])
      }
    }


    var WeekDay1 = {total: 0, orders:[]}
    var WeekDay2 = {total: 0, orders:[]}
    var WeekDay3 = {total: 0, orders:[]}
    var WeekDay4 = {total: 0, orders:[]}
    var WeekDay5 = {total: 0, orders:[]}
    var WeekDay6 = {total: 0, orders:[]}
    var WeekDay0 = {total: 0, orders:[]}





    for (var i = 0; i < arrayDayWeek.length; i++) {


      if (arrayDayWeek[i].datepaiment.getDay() == 1) {
        WeekDay1.total = WeekDay1.total + arrayDayWeek[i].total
        WeekDay1.orders.push(arrayDayWeek[i])
      }else if (arrayDayWeek[i].datepaiment.getDay() == 2) {
        WeekDay2.total = WeekDay2.total + arrayDayWeek[i].total
        WeekDay2.orders.push(arrayDayWeek[i])
      }else if (arrayDayWeek[i].datepaiment.getDay() == 3) {
        WeekDay3.total = WeekDay3.total + arrayDayWeek[i].total
        WeekDay3.orders.push(arrayDayWeek[i])
      }else if (arrayDayWeek[i].datepaiment.getDay() == 4) {
        WeekDay4.total = WeekDay4.total + arrayDayWeek[i].total
        WeekDay4.orders.push(arrayDayWeek[i])
      }else if (arrayDayWeek[i].datepaiment.getDay() == 5) {
        WeekDay5.total = WeekDay5.total + arrayDayWeek[i].total
        WeekDay5.orders.push(arrayDayWeek[i])
      }else if (arrayDayWeek[i].datepaiment.getDay() == 6) {
        WeekDay6.total = WeekDay6.total + arrayDayWeek[i].total
        WeekDay6.orders.push(arrayDayWeek[i])
      }else if (arrayDayWeek[i].datepaiment.getDay() == 0) {
        WeekDay0.total = WeekDay0.total + arrayDayWeek[i].total
        WeekDay0.orders.push(arrayDayWeek[i])
      }

    }


    var tableStateWeek = [WeekDay1,WeekDay2,WeekDay3,WeekDay4,WeekDay5,WeekDay6,WeekDay0]
    // console.log(tableStateWeek);


    res.json({result:true, OrderStatWeek:tableStateWeek });
  });

});


// verif date de livraison
router.get('/verif-status-livraison', function(req, res, next) {


  orderModel.find({ statusorder: "En Attente"  },function(error,InfOrder){

    refDate = new Date()

  arrayAModifier = InfOrder.filter(e => e.datelivraison.getDate() <= refDate.getDate()  )


  for (var i = 0; i < arrayAModifier.length; i++) {
    orderModel.updateOne({ _id: arrayAModifier[i]._id}, { statusorder: "Livrée"  }, function(error, raw) {});
  }

    res.json({result:true});
  });

});







module.exports = router;
