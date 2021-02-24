
import React from 'react';
import {Row, Col } from 'reactstrap';


function Footer() {

  return (

    <Row className="footer-main">

        <Col style={{borderRight: "2px solid white",display:"flex",flexDirection:"column",justifyContent:"center" }}>

           <h5 style={{ margin: "1px", display: "flex", justifyContent: "center"}}>
             SERVICE
           </h5>

           <p style={{ margin: "1px" }}  >
             <a href="http://localhost:3001" style={{backgroundColor: "rgba(0,0,0,0)", display: "flex", justifyContent: "center"}}> Nous contacter  </a>
           </p>
           <p style={{ margin: "1px", display: "flex", justifyContent: "center"}}  >
            <a href="http://localhost:3001">Faire un don</a>
           </p>

       </Col>
        <Col style={{ margin:0, display:"flex",flexDirection:"column",justifyContent:"center" }}>
          <h5 style={{ margin: "1px", display: "flex", justifyContent: "center" }}>
            INFORMATIONS
          </h5>
          <p style={{ margin: "1px", color: "white", display: "flex", justifyContent: "center"}} >
           <a href="http://localhost:3001">Qui somme nous ?</a>
          </p>
          <p style={{ margin: "1px", display: "flex", justifyContent: "center"}}  >
         <a href="http://localhost:3001">Mentions légales</a>
          </p>
          <p style={{ margin: "1px", display: "flex", justifyContent: "center"}} >
           <a href="http://localhost:3001">Charte de confidialité</a>
          </p>
        </Col>
        <Col style={{borderLeft: "2px solid white", margin:0, display:"flex",flexDirection:"column",justifyContent:"center"  }}>
          <h5 style={{ margin: "1px",display: "flex", justifyContent: "center" }}>
            NOUS SUIVRE
          </h5>

          <Row className="footer-social" style={{marginTop: "20px",display:'flex', justifyContent:'center'}}>
            <img src="./instagram.png " alt="instagram" style={{height: "40px", width: "40px", marginLeft: "15px", marginRight: "15px", cursor: "pointer"}} href="http://localhost:3001" />
          <img src="./facebook.png " alt="facebook" style={{height: "40px", width: "40px", marginRight: "15px", cursor: "pointer" }} href="http://localhost:3001" />
          <img src="./twitter.png " alt="twitter" style={{height: "40px", width: "40px", marginRight: "15px", cursor: "pointer"}} href="http://localhost:3001" />
        </Row>
        </Col>
      </Row>

  );
}

export default Footer;
