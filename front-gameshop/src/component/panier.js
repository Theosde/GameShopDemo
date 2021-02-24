import React, {useState, useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap/';
import {Input} from 'reactstrap';
import StripeCheckout from "react-stripe-checkout";


import {useSelector, useDispatch} from 'react-redux';



function Panier() {


  const [panierData, setPanierData] = useState([]);
  const [totalPriceState, setTotalPriceState] = useState(0);

  const [nbArticlePanier, setNbArticlePanier] = useState(0);

  const[product] = React.useState({ name:"", price:totalPriceState });


  var userDataReducer = useSelector(state => state.initialUser.user.user);

  var userDataReducerV2 = useSelector(state => state);
  console.log("userDataReducerV2",userDataReducerV2);

  const dispatch = useDispatch();

  const [test, setTest] = useState(true);


var mapPanierUser;


if (userDataReducer) {

  if (nbArticlePanier == 0) {
    console.log("If nbArticlePanier == 0",userDataReducer.panier.length);
    // setNbArticlePanier(userDataReducer.panier.length)
  }


console.log("NOMBRE ARTICLE DANS LE PANIER ",nbArticlePanier);

  var newListIdGame = [];
  var dataPanierTraiter = [];

  var PanierVE = []

for (var i = 0; i < userDataReducer.panier.length; i++) {
  if (newListIdGame.includes(userDataReducer.panier[i]._id)) {
    dataPanierTraiter[newListIdGame.indexOf(userDataReducer.panier[i]._id)].quantity = dataPanierTraiter[newListIdGame.indexOf(userDataReducer.panier[i]._id)].quantity + 1
    PanierVE[newListIdGame.indexOf(userDataReducer.panier[i]._id)].quantity = PanierVE[newListIdGame.indexOf(userDataReducer.panier[i]._id)].quantity + 1
  }else {
    var addQuanti = Object.defineProperty(userDataReducer.panier[i], "quantity",{
      value: 1,
      writable: true
    })
    PanierVE.push({quantity:1,price:userDataReducer.panier[i].prix})
    newListIdGame.push(addQuanti._id)
    dataPanierTraiter.push(addQuanti)
  }
}
console.log("new liste TRAITER",dataPanierTraiter);


console.log(nbArticlePanier);
console.log(userDataReducer.panier.length);



var toto = 0 ;
if (totalPriceState == 0) {
  panierData.map(e =>{
    toto = toto + e.prix*e.quantity
    console.log(e);
  })
  console.log(toto);
  // setTotalPriceState(toto)
}



if (nbArticlePanier != userDataReducer.panier.length) {
  setNbArticlePanier(userDataReducer.panier.length)
  setPanierData(dataPanierTraiter)
  console.log(dataPanierTraiter);
  console.log(panierData);

  var toto = 0 ;
  dataPanierTraiter.map(e =>{
    toto = toto + e.prix*e.quantity
    console.log(e);
  })
  console.log(toto);
  setTotalPriceState(toto)


}


  mapPanierUser = panierData.map((e,key) => {

    var tableauDIX = [0,1,2,3,4,5,6,7,8,9];
    var optionCostom = tableauDIX.map(nb => {
      if (nb == e.quantity) {
        return <option value={nb} selected >{nb}</option>
      }else {
        return <option value={nb}>{nb}</option>
      }
    })


// fonstion STRIPE

    function handleToken(token,adresselivraison) {
      fetch('/checkout', {
          method: 'POST',
          body: JSON.stringify(token),
        }).then(response => {
      console.log(response);
    });
    dispatch({type:"changePage", data:'validationPage'})

    }

    //DATE LIVRAISON
    var date = new Date();
    date.setDate(date.getDate() + 7);
    // console.log(date)
    var jour = "00";
    var mois = "00";
    var année = date.getFullYear();

    if(date.getDate() < 10){
    jour = '0'+ date.getDate()
    }else{jour = date.getDate()
    }

    if(date.getMonth() < 10){
      mois = '0' + (date.getMonth()+1)
    }else{
      mois = (date.getMonth()+1)
    }



    return <Row className="product panierArticle" style={{height:"200px",width:"100%",backgroundColor:"white",display:"flex",alignItems:"center",padding:"10px 0"}}>
        <Col xs="5" sm="2" className="product-img"><img style={{width:"100%",cursor:"pointer"}} src={e.img}/></Col>
        <Col xs="7" sm="5" className="product-desc">
          <h3 style={{cursor:"pointer"}}>{e.name}</h3>
          <h6>{e.platform.join(", ")}</h6>
          <p>{e.desc.substring(0, 75)+"..."}</p>
        </Col>
        <Col xs="6" sm="2" style={{display:"flex", justifyContent:"center"}} className="product-stock"><h5 style={{color:"green"}}></h5>
        <p style={{marginTop:"15px",marginRight:"15px"}}>{"Quantité : "+ e.quantity}</p>

      </Col>
      <Col  xs="6" sm="2" className="product-price-btn" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h4>{e.prix}€</h4>
      </Col>
      <Col  className="div-trash-resp" xs="6" sm="1">
        <p className="trash-resp" style={{position:"absolute", top:"-100px", right:"0px" }} onClick={()=>{
          fetch('https://arcane-temple-10797.herokuapp.com/users/gestionpanier/'+userDataReducer.email+"/"+e._id)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            console.log(data);
            console.log(data.user.panier.length);
            dispatch({type:"initialUserData", dataUser:data})
          })
          .catch(function(error) {
            console.log('Request failed', error)
          });
        }}><img className="trash" height="35px" width="35px" src="./trash.png"/></p>
      </Col>
    </Row>

  })

  console.log(totalPriceState);


}



  //DATE LIVRAISON
  var date = new Date();
  date.setDate(date.getDate() + 7);
  // console.log(date)
  var jour = "00";
  var mois = "00";
  var année = date.getFullYear();

  if(date.getDate() < 10){
  jour = '0'+ date.getDate()
  }else{jour = date.getDate()
  }

  if(date.getMonth() < 10){
    mois = '0' + (date.getMonth()+1)
  }else{
    mois = (date.getMonth()+1)
  }


  return (
    <div className="page-panier">

      <Container className="partie-haute" style={{height: "auto"}}>
        <Row style={{backgroundColor:"white", height:"100px",marginTop:"115px",marginBottom:"35px"}}>
          <Col xs="12" style={{display:"flex", justifyContent:"center",alignItems:"center",marginTop:"15px"}}>
            <p style={{fontWeight:"bold"}}>{"Votre panier contient: "+panierData.length+" articles"}</p>
          </Col>
        </Row>
      </Container>


      <Container className="partie-produit">
        <Row>
          <Col className="product-list" xs="12" md="9">

            {mapPanierUser}

          </Col>

          <Col className="order-detail" xs="12" md="3" style={{height:"450px", backgroundColor:"white"}}>

            <Row className="delivery-maxdate" style={{display:"flex", flexDirection:"column", justifyContent: "space-around", alignItems:"center"}}>
              <p style={{marginBottom:"-55px"}}>Date de livraison estimée : </p>
              <p className="bold" style={{marginTop:"-35px",fontSize:"25px"}}>{jour+'/'+mois+'/'+année}</p>
            </Row>

            <Row className="total" style={{display:"flex", flexDirection:"column", justifyContent: "space-around", alignItems:"center"}}>
              <p style={{marginBottom:"-55px"}}>Montant total de vos produits :</p>
              <p className="bold" style={{marginTop:"-35px",fontSize:"30px"}}>{totalPriceState.toFixed(2) + "€"}</p>
            </Row>

            <Row className="command-now" style={{display:"flex", justifyContent:"center",alignItems:"center", cursor:"pointer"}}
               onClick={()=>{

              dispatch({type:"verifOrder", data:[totalPriceState.toFixed(2), panierData]})
              dispatch({type:"changePage", data:'verif'})

            }}>
              <div style={{fontWeight:"bold", color:"white"}}>Buy Now</div>
            </Row>

          </Col>
        </Row>
      </Container>


      <Container className="partie-basse" style={{height: "auto"}}>
        <Row style={{backgroundColor:"white", height:"100px",marginTop:"35px",marginBottom:"35px"}}>
          <Col xs="4" style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            <img style={{marginTop:"20px"}} src="./icon-creditcard.png"></img>
            <p className="bold">Paiement par carte ou Paypal</p>
          </Col>
          <Col xs="4" style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <img style={{marginTop:"20px"}} src="./icon-truck.png"></img>
            <p className="bold">Livraison Express</p>
          </Col>
          <Col xs="4" style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            <img  style={{marginTop:"20px"}}src="./icon-pinmap.png"></img>
            <p className="bold">SAV à Lyon</p>
          </Col>
        </Row>
      </Container>



    </div>
  );
}


export default Panier;
