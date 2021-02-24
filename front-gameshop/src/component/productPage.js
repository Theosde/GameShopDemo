import React, {useState, useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap/';
import {useSelector, useDispatch} from 'react-redux';



function ProductPage() {
  const GameData = useSelector(state => state.pageProduct.game.games);
  var userDataReducer = useSelector(state => state.initialUser.user.user);

  const [useEffectFetchState, setuseEffectFetchState] = useState(true);


  const dispatch = useDispatch();

console.log("Page Product Data Game",GameData);

  return (
    <Container className="ProductPage" style={{marginTop:"115px"}}>
      <Row style={{height:"150px",backgroundColor:"white",marginBottom:"25px",display:"flex",alignItems:"center"}}>

        <Col xs="9">
          <Row className="resp-column" style={{display:"flex",alignItems:"center",marginLeft:"35px"}}>
            <p className="bold" style={{fontSize:"30px"}}>{GameData.name+" "}</p>
            <p style={{fontSize:"30px",fontWeight:"bold"}}>{" - "+GameData.platform.join(" ")}</p>
          </Row>
          <Row style={{marginLeft:"35px"}}>
            <p>{GameData.desc.substring(0, 75)+"..."}</p>
          </Row>
        </Col>

        <Col className="hideImg" xs="3" style={{display:"flex",alignItems:"center"}}>
          <img src="/robot-prod2.png" height="50" width="50"/>
          <p className="gradiant-text" style={{marginTop:"10px"}}>Game-Shop</p>
        </Col>
      </Row>

      <Row className="product-div" style={{height:"550px",backgroundColor:"white",marginBottom:"25px"}}>
        <Col xs="6">
          <img src={GameData.img} height="400" width="305" style={{marginTop:"100px", marginLeft:"95px", border:"2px solid grey"}}/>
        </Col>
        <Col xs="6" style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <Row className="enlarge-text" style={{marginTop:"55px",marginBottom:"15px",marginRight:"35px"}}>
            <p>{GameData.desc}</p>
          </Row>
          <Row className="button-resp" style={{backgroundColor:"lightgrey",marginRight:"35px"}}>
              <Col className="price-and-add">{GameData.prix}€</Col>
              <Col className="add-panier" onClick={()=> {


                if (userDataReducer == undefined) {

                  dispatch(
                    {type:"loginModal", data:true}
                  )

                }else {

                  fetch('https://arcane-temple-10797.herokuapp.com/users/add-productinpanier/'+userDataReducer.email+'/'+GameData._id)
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log('Fetch Ajout Article ');
                    console.log(data);

                    dispatch({type:"initialUserData", dataUser:data})
                    setuseEffectFetchState(!useEffectFetchState)
                  })
                  .catch((error) => {
                    console.log('Request failed', error)
                  });


                }

                }}>
                <img src="./panier.png" height="35" width="35" style={{marginRight:"15px"}}/>Ajouter au panier</Col>
          </Row>

          <Row className="resp-center-div" style={{display:"flex",justifyContent:"center",marginRight:"35px"}}>
            <div style={{height:"100px",width:"300px",backgroundColor:"white",marginTop:"35px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", border: GameData.stock > 20 ? "2px solid green" : "2px solid orange" }}
            >
              <p style={{fontWeight:"bold",marginTop:"10px"}}>disponibilité :</p>
              <p><span style={{color: GameData.stock > 20 ? "green" : "orange", fontWeight:"bold" }} >{GameData.stock > 20 ? "En Stock" : "Low Stock !" }</span></p>
            </div>
          </Row>
        </Col>

      </Row>

      <Container className="partie-basse" style={{height: "auto"}}>
        <Row style={{backgroundColor:"white", height:"100px",marginTop:"115px",marginBottom:"35px"}}>
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


    </Container>
  );
}

export default ProductPage;
