import React, {useState, useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap/';
import {useSelector, useDispatch} from 'react-redux';



function Verif() {
  const GameData = useSelector(state => state.pageProduct.game.games);
  const dispatch = useDispatch();
  const userDataReducer = useSelector(state => state.initialUser.user.user);

  const infoPanier = useSelector(state => state.verifOrder.verifOrder);


  const [newTotal, setNewTotal] = useState(0);
  const [verifStock, setVerifStock] = useState([]);

  const [boucleEnd, setboucleEnd] = useState(false);

  const [validationPanier, setValidationPanier] = useState(false);


  // var userDataReducer = useSelector(state => state.initialUser.user.user);

setTimeout(function () {
  dispatch({type:"changePage", data:'home'}); //will redirect to your index page (an ex: index.html)
}, 500000);


var monpremon;


console.log(userDataReducer);

console.log("wxcvbn,dfghjklm",infoPanier);

if (userDataReducer.adresselivraison.lastname != undefined ) {
  monpremon = <p style={{marginTop:"10px"}}>Mr.{userDataReducer.adresselivraison.lastname+" "+userDataReducer.adresselivraison.firstname}</p>
}

var affichagePanier;

affichagePanier = infoPanier[1].map(e => {
  return <Row style={{backgroundColor:"white",margin:"15px 5px",height:"100px",display:"flex",alignItems:"center"}}>
    <Col md="6">{e.name}</Col>
    <Col md="2" style={{color:e.quantity == 0 ? "Red" : "Blue"}}>{e.quantity}</Col>
    <Col md="3" className="gradiant-text">{e.prix*e.quantity+"€"}</Col>
  </Row>
})



var messageAlert;

if (boucleEnd) {

  if (validationPanier) {
    messageAlert = <p style={{marginTop:"25px",color:"red"}}>Un ou plusieurs de vos articles ne sont plus disponible</p>
  }


  affichagePanier = verifStock.map(e => {
    return <Row style={{backgroundColor:"white",margin:"15px 5px",height:"100px",display:"flex",alignItems:"center"}}>
      <Col md="6">{e.newDataGame.name}</Col>
      <Col md="2" style={{color: e.status === true ? "Black" : Number.isInteger(e.status) ? "Orange" : "Red"  }}>{e.newDataGame.quantity}</Col>
      <Col md="3" className="gradiant-text">{e.newDataGame.prix*e.newDataGame.quantity+"€"}</Col>
    </Row>
  })

}




  return (
    <Container className="ProductPage" style={{marginTop:"185px",marginBottom:"100px"}}>

      <Row  className="surrounded-div" style={{height:"600px",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Col className="verif-purple-div" style={{backgroundImage:"linear-gradient(to right bottom, #2d0b60, #3e0f81, #5011a3, #6412c7, #7912eb)",width:"40%",height:"100%"}}>

          {affichagePanier}

        </Col>

        <Col style={{backgroundColor:"#EFEFEF",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-around",flexDirection:"column"}}>

          {/*  cadre adresse */}
          <Row className="adesse-div" style={{width:"100%",height:"100px"}}>
            <Col className="doted-border" xs="6" style={{backgroundColor:"white"}}>
              <img className="img-center" style={{marginTop:"65px"}} src="./icon-truck.png"/>
              <p style={{textAlign:"center",fontWeight:"bold",marginTop:"105px"}}>Adresse de Livraison</p>
            </Col>

            <Col className="info-card doted-border" xs="6" style={{backgroundColor:"#EFEFEF"}}>
              <div style={{marginLeft:"40px"}}>
                {monpremon}
                <p>{userDataReducer.adresselivraison.rue}</p>
                <p>{userDataReducer.adresselivraison.adressecomplementaire}</p>
                <p>{userDataReducer.adresselivraison.codePostal+" "+userDataReducer.adresselivraison.ville}</p>
                <p>{userDataReducer.adresselivraison.pays}</p>
                <br></br>
                <p style={{marginBottom:"10px"}}>---------------------</p>
            </div>
            </Col>
          </Row>

          <Row style={{}}>
            <div className="resp-div-verif-btn" style={{backgroundColor:"white",width:"500px",height:"200px",display:"flex",flexDirection:"column",alignItems:"center"}}>
              {messageAlert}
              <p className="gradiant-text" style={{fontSize:"25px"}}>{boucleEnd ? "Total : "+newTotal+"€" :"Total : "+infoPanier[0]+"€"}</p>
              <div className="btn-valider" style={{marginTop:"-4px"}} onClick={()=>{



                if (!boucleEnd) {

                  var listIdProduit = infoPanier[1].map(e => e._id)

                  fetch("https://arcane-temple-10797.herokuapp.com/verifStock/"+listIdProduit.join("_"))
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log("Retour fetch verif stock",data.infoProduct);
                    console.log(infoPanier[1]);



                    var stock = data.infoProduct.sort((a, b) => (a.name > b.name) ? 1 : -1)
                    var panier = infoPanier[1].sort((a, b) => (a.name > b.name) ? 1 : -1)

                    var diff;
                    var resteDiff;
                    var statusStock = [...verifStock]

                    var newTotal = 0;

                    for (var i = 0; i < stock.length; i++) {
                      diff = stock[i].stock - panier[i].quantity

                      if (stock[i].stock == 0) {

                        panier[i].quantity = 0
                        statusStock.push({newDataGame: panier[i], status:false})
                        newTotal += panier[i].quantity*panier[i].prix
                        setValidationPanier(true)
                        setVerifStock(statusStock)

                      }else if (diff < 0) {
                        resteDiff = panier[i].quantity - stock[i].stock
                        panier[i].quantity = panier[i].quantity - resteDiff
                        statusStock.push({newDataGame: panier[i], status: resteDiff})
                        newTotal += panier[i].quantity*panier[i].prix
                        setValidationPanier(true)
                        setVerifStock(statusStock)
                      }else {

                        statusStock.push({newDataGame: panier[i], status:true})
                        newTotal += panier[i].quantity*panier[i].prix
                        setVerifStock(statusStock)

                      }

                    }

                    setNewTotal(newTotal.toFixed(2))
                    setboucleEnd(true)

                    var point = true;

                    for (var i = 0; i < statusStock.length; i++) {
                      if (statusStock[i].status === true) {

                      }else {
                        point = false
                      }
                    }


                    if (point) {
                      console.log("redirect panier ok");

                      var listGameURL = "";

                      for (var i = 0; i < infoPanier[1].length; i++) {
                        listGameURL += "_"+infoPanier[1][i]._id+"."+infoPanier[1][i].quantity
                      }

                      //find user connect
                      fetch("https://arcane-temple-10797.herokuapp.com/users/validation_panier/"+userDataReducer._id+"/"+infoPanier[0]+"/"+listGameURL.slice(1))
                      .then((res) => {
                        return res.json();
                      })
                      .then((data) => {
                        console.log(data);

                        dispatch({type:"initialUserData", dataUser:{user:data.user}})
                        dispatch({type:"changePage", data:'home'})

                      })
                      .catch((error) => {
                        console.log('Request failed validation_panier ', error)
                      });


                    }else {
                      console.log("modification panier");
                    }


                  })
                  .catch((error) => {
                    console.log('Request failed ', error)
                  });




                }else {

                  console.log("redirection + modif sotck");

                  var listGameURL = "";

                  for (var i = 0; i < verifStock.length; i++) {
                    listGameURL += "_"+verifStock[i].newDataGame._id+"."+infoPanier[1][i].quantity
                  }


                  //find user connect
                  fetch("https://arcane-temple-10797.herokuapp.com/users/validation_panier/"+userDataReducer._id+"/"+newTotal+"/"+listGameURL.slice(1))
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log(data);

                    dispatch({type:"initialUserData", dataUser:{user:data.user}})
                    dispatch({type:"changePage", data:'home'})

                  })
                  .catch((error) => {
                    console.log('Request failed validation_panier ', error)
                  });


                }



              }}>Valider</div>
            </div>
          </Row>

        </Col>
      </Row>
    </Container>
  );
}

export default Verif;
