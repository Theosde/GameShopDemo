import {Container,Row,Col} from 'react-bootstrap/';
import Form from 'react-bootstrap/Form'
import React,{useState} from 'react';
import Perso from './perso';
import Commandes from './commandes';


import {useSelector, useDispatch} from 'react-redux';



function Myinfos() {

  const userDataReducer = useSelector(state => state.initialUser.user.user);
  const dispatch = useDispatch();

  const [sousNav,setSousNav] = useState('perso')


  fetch("https://arcane-temple-10797.herokuapp.com/users/get-order/"+userDataReducer._id)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log("retour fetch get order",data);

    dispatch(
      {type:"initialOderData", data: data.order}
    )

  })
  .catch((error) => {
    console.log('Request failed validation_panier ', error)
  })






  return (
<div className="profile-div-resp">
    <Row>
        <Col className="side" xs="12" md="2">
          <img src="./avatar-1.jpg" style={{marginTop:"25px"}}/>
          <div className="user" style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
            <h3>{userDataReducer.firstname +" "+userDataReducer.lastname}</h3>
            <p>N° de client :</p>
            <p>{userDataReducer.numeroclient}</p>
          </div>
          <ul className="user-menu">
            <li style={{cursor:"pointer"}} onClick={()=> setSousNav("perso")}><a>Mes informations</a></li>
            <li style={{cursor:"pointer"}} onClick={()=> setSousNav("commandes")}><a>Mes commandes</a></li>
          </ul>
        </Col>

        <Col className="user-form" style={{marginTop: "155px",display:"flex",flexDirection:"column"}} xs="12" md="9">
          {sousNav == 'perso'?<Perso/>:<Commandes/>}

          <Row>
            <Container className="partie-basse" style={{height: "auto"}}>
              <Row style={{backgroundColor:"white", height:"100px",marginTop:"25px",marginBottom:"35px"}}>
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
          </Row>
        </Col>
    </Row>




</div>
  );
}

export default Myinfos;
