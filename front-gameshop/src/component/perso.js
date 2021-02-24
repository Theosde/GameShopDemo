import {Container,Row,Col} from 'react-bootstrap/';
import Form from 'react-bootstrap/Form';
import AddressModal from './addAdressModal.js'
import React,{useState} from 'react';


import {useSelector, useDispatch} from 'react-redux';



function Perso() {

    const [modalShow,setModalShow] = useState(false)

    let modalClose = () => setModalShow(false);

    const userDataReducer = useSelector(state => state.initialUser.user.user);
    const dispatch = useDispatch();


    var checkCivilite;
    if (userDataReducer.civilite) {
      checkCivilite = <div>
        <Form.Check
          custom
          inline
          label="Mr."
          type="radio"
          id="1"
          checked
          disabled
        />
        <Form.Check
          custom
          inline
          label="Mme"
          type="radio"
          id="1"
          disabled
        /></div>
    }else {
      checkCivilite = <div>
        <Form.Check
          custom
          inline
          label="Mr."
          type="radio"
          id="1"
          disabled
        />
        <Form.Check
          custom
          inline
          label="Mme"
          type="radio"
          id="1"
          checked
          disabled
        /></div>
    }


var monpremon;

if (userDataReducer.adresselivraison.lastname != undefined ) {
  monpremon = <p style={{marginTop:"10px"}}>Mr.{userDataReducer.adresselivraison.lastname+" "+userDataReducer.adresselivraison.firstname}</p>

}

  return (
<div>
<Row style={{padding:"28px",backgroundColor:"white",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
  <h4 className="bold">Informations Personnelles</h4>
  <p><span style={{color:"red"}}>* </span>Champs obligatoires</p>
</Row>

<Row style={{padding:"28px",backgroundColor:"white"}}>
  <Col xs="6">
    <Form.Label><span style={{color:"red"}}>* </span>Civilité</Form.Label><br></br>
    {checkCivilite}
  </Col>
</Row>

<Row style={{backgroundColor:"white"}}>
  <Col style={{marginTop:"15px"}}>
    <Form.Label><span style={{color:"red"}}>* </span>Prénom</Form.Label>
    <Form.Control placeholder="Prénom de l'utilisateur" value={userDataReducer.firstname} disabled/>
  </Col>
  <Col style={{marginTop:"15px"}}>
    <Form.Label><span style={{color:"red"}}>* </span>Date de naissance</Form.Label>
    <Form.Control placeholder="Date de naissance" value={userDataReducer.birthday} disabled/>
  </Col>
</Row>
<Row style={{backgroundColor:"white"}}>
  <Col style={{marginTop:"15px"}}>
    <Form.Label><span style={{color:"red"}}>* </span>Nom</Form.Label>
    <Form.Control placeholder="Nom de l'utilisateur" value={userDataReducer.lastname} disabled/>
  </Col>
  <Col style={{marginTop:"15px"}} xs="6">
    <Form.Label><span style={{color:"red"}}>* </span>E-mail</Form.Label>
    <Form.Control placeholder="E-mail" value={userDataReducer.email} />
  </Col>
</Row>
<Row className="fom-resp" style={{padding:"28px",backgroundColor:"white",display:"flex",justifyContent:"center",marginBottom:"25px"}}>
  <div style={{cursor:"pointer"}} className="btn-valider">
    Valider
  </div>
</Row>
<Row xs="12" md="2" style={{height:"15px" ,backgroundColor:"lightgrey"}}>

</Row>
<Row>
  <Col xs="12" style={{backgroundColor:"white", height:"auto"}}>

    <Row style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"25px",marginBottom:"25px"}}>
      <h4 className="bold">mes adresses enregistrées</h4>
    </Row>

    <Row className="adress-resp-info" style={{margin:"15px",display:"flex", justifyContent:"center"}}>
      <Col className="doted-border" xs="3" style={{backgroundColor:"#E4E4E4"}}>
        <img className="img-center" style={{marginTop:"65px"}} src="./icon-truck.png"/>
        <p style={{textAlign:"center",fontWeight:"bold",marginTop:"105px"}}>Adresse de Livraison</p>
      </Col>

      <Col className="info-card doted-border" xs="4" style={{backgroundColor:"#EFEFEF"}}>
        <div className="resp-margin" style={{marginLeft:"40px"}}>
          {monpremon}
          <p>{userDataReducer.adresselivraison.rue}</p>
          <p>{userDataReducer.adresselivraison.adressecomplementaire}</p>
          <p>{userDataReducer.adresselivraison.codePostal+" "+userDataReducer.adresselivraison.ville}</p>
          <p>{userDataReducer.adresselivraison.pays}</p>
          <br></br>
          <p style={{marginBottom:"10px"}}>----------------------------------</p>
      </div>
      </Col>
    </Row>

    <Row style={{display:"flex",justifyContent:"center",marginBottom:"25px"}}>


      <AddressModal
          show={modalShow}
          onHide={modalClose}
        />
    </Row>

  </Col>
</Row>
</div>
);
}

export default Perso;
