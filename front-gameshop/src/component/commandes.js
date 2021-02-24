import {Container,Row,Col} from 'react-bootstrap/';
import Form from 'react-bootstrap/Form'
import React,{useState} from 'react';


import {useSelector, useDispatch} from 'react-redux';




function Commandes() {

  const orderDataReducer = useSelector(state => state.initialOrder);


  const [nbOrderEnCour,setNbOrderEnCour] = useState(0)



var orderAttente = 0

  var allOrdersList =  orderDataReducer.order.map(e => {

    if (e.statusorder == "En Attente") {
      orderAttente = orderAttente+1
    }

    console.log(e);
//nb article
    var nbProduct = 0;
    e.refproduct.map(p => nbProduct = nbProduct + p.quantity )



    //date
    var initialDate = new Date(e.datepaiment)
    var jour = "00";
    var mois = "00";
    var année = initialDate.getFullYear();

    if(initialDate.getDate() < 10){
    jour = '0'+ initialDate.getDate()
    }else{jour = initialDate.getDate()
    }

    if(initialDate.getMonth() < 10){
      mois = '0' + (initialDate.getMonth()+1)
    }else{
      mois = (initialDate.getMonth()+1)
    }




    return <div className="command-resp-list" style={{backgroundColor:"white",marginTop:"5px",width:"100%", display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"35px",paddingBottom:"35px",marginTop:"5px"}}>
        <Col xs="12" md="3"><p  style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}> {jour+'/'+mois+'/'+année} </p></Col>
        <Col xs="12" md="3"><p  style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}> {e.statusorder} </p></Col>
        <Col xs="12" md="3"><p  style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}> {nbProduct} </p></Col>
        <Col xs="12" md="3"> <p  style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}> {e.total+"€"} </p></Col>
      </div>


  })


// order en Attente
    if (nbOrderEnCour == 0) {
      setNbOrderEnCour(orderAttente)
    }


  return (
<div>

<Row style={{heigh:"300px",backgroundColor:"white"}}>
  <Col><img style={{marginLeft:"65px"}} src="./chest.png"/></Col>
  <Col style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <p> <span className="bold" style={{fontSize:"60px"}}>{nbOrderEnCour}</span> </p>
    <h1 style={{color:"grey",fontSize:"30px",marginTop:"-25px"}}>Commande en cours</h1>
  </Col>
</Row>

<Row style={{marginTop:"25px",height:"auto",backgroundColor:"lightgrey",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
  <div style={{backgroundColor:"white", width:"100%",textAlign:"center",paddingTop:"25px",paddingBottom:"25px"}}><h2 className="bold">Historique de vos commandes</h2></div>
  <div className="hideMe" style={{backgroundColor:"white",width:"100%", display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:"35px",paddingBottom:"25px",marginTop:"5px"}}>
    <Col className="hideMe" xs="12" md="3"><p style={{textAlign:"center",color:"grey",fontWeight:"bold"}}>Date de commande:</p></Col>
    <Col className="hideMe" xs="12" md="3"><p style={{textAlign:"center",color:"grey",fontWeight:"bold"}}>Status:</p></Col>
    <Col className="hideMe" xs="12" md="3"><p style={{textAlign:"center",color:"grey",fontWeight:"bold"}}>Nombre de produits:</p></Col>
    <Col className="hideMe" xs="12" md="3"><p style={{textAlign:"center",color:"grey",fontWeight:"bold"}}>Prix total:</p></Col>
  </div>

  {allOrdersList}

</Row>

</div>
  );
}

export default Commandes;
