import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap/';
import {Navbar,Nav,Image} from 'react-bootstrap/';
import {Label,Input,FormGroup} from 'reactstrap';

import {useSelector, useDispatch} from 'react-redux';

function LoginModal (){

  const[loginState,setLoginState] = useState("login")
  const[Show,setShow] = useState(false)

  const[signInData,setSignInData] = useState({email:"",password:""})

  const[signUpData,setSignUpData] = useState({})

  const[confirmationPassword,setconfirmationPassword] = useState(false)

  const dispatch = useDispatch();

  const[messageErreur,setMessageErreur] = useState(false)



  var loginModal = useSelector(state => state.loginModal.statusModal);

  console.log("LOG avant if",loginModal);
  if (loginModal) {

    dispatch(
      {type:"loginModal", data:false}
    )
    setShow(true)

  }


  var handleClose = () => {
    setShow(false)
    setLoginState("login")
  }

  var handleShow = () => {
    setShow(true)
  }

  var ErrorMessage ;

  var signIn = () => {

    fetch('https://arcane-temple-10797.herokuapp.com/users/signin/'+signInData.email+"/"+signInData.password)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      console.log("Retour Fetch SignIn",data);
      console.log(data.result);


      if (data.result) {
        console.log("Retour Fetch SignIn",data);
        dispatch({type:"initialUserData", dataUser:data})
        setShow(false)
      }else {
        setMessageErreur(true)
      }


    })
    .catch(function(error) {
      console.log('Request failed', error)
    });


  }

  var signUp = () => {

    var date = new Date(signUpData.birthday+"T17:06:27.000Z");

    fetch('https://arcane-temple-10797.herokuapp.com/users/signup/'+signUpData.firstname+"/"+signUpData.lastname+"/"+date+"/"+signUpData.email+"/"+signUpData.phone+"/"+signUpData.rue+"/"+signUpData.codePostal+"/"+signUpData.ville+"/"+signUpData.civilite+"/"+signUpData.password)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log("Retour Fetch SignUp",data);
      setShow(false)
      setLoginState("login")
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });


  }

  if (messageErreur) {
    ErrorMessage = <Row style={{display:"flex",justifyContent:"center"}}>
                <p style={{marginTop:"25px",color:"red",border:"2px solid red",padding:"7px 190px",borderRadius:"7px"}}>Email ou mot de passe incorrect</p>
              </Row>
  }


    if(loginState == "login"){
    return (
      <>

        <Nav.Item className="justify-content-end" onClick={handleShow}>
          <Nav.Link href="#"><Image height="50" width="50" src="./login.png"></Image></Nav.Link>
        </Nav.Item>

        <Modal show={Show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title className="gradiant-text">Me Connecter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col xs="12">
                <Form.Group controlId="formNom">
                  <Form.Label>Email</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Email" value={signInData.email}  onChange={(e)=> {
                      var copysignInData = {...signInData}
                      copysignInData.email = e.target.value
                      setSignInData(copysignInData)
                  } }/>
                </Form.Group>
              </Col>
                <Col xs="12">
                <Form.Group controlId="formPrenom">
                  <Form.Label>Mot de passe</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Mot de passe" value={signInData.password}  onChange={(e)=> {
                      var copysignInData = {...signInData}
                      copysignInData.password = e.target.value
                      setSignInData(copysignInData)
                  } }/>
                </Form.Group>
                </Col>
              </Row>

                {ErrorMessage}

              <Row style={{cursor:"pointer"}}>
                <p className="change-modal" onClick = {() => {setLoginState("register")}}>Pas encore de compte?</p>
              </Row>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-adresse" variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button  className="btn-adresse" variant="primary" onClick={signIn}>
              Connection
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );

  }else if (loginState == "register") {

    return (
      <>
        <Nav.Item className="justify-content-end" onClick={handleShow}>
          <Nav.Link href="#"><Image height="50" width="50" src="./login.png"></Image></Nav.Link>
        </Nav.Item>

        <Modal show={Show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title className="gradiant-text">M'inscrire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Form.Label style={{marginLeft:"15px"}}><p style={{textAlign:"center",marginRight:"10px"}}><span style={{color:"red"}}>* </span>Civilité </p></Form.Label><br></br>
                <Form.Check
                  custom
                  inline
                  label="Mr."
                  type="radio"
                  name = "radio"
                  id="1"
                  Checked={signUpData.civilite}
                  onChange={(e)=> {
                      var copysignUpData = {...signUpData}
                      copysignUpData.civilite = !signUpData.civilite
                      setSignUpData(copysignUpData)
                  } }
                />
                <Form.Check
                  custom
                  inline
                  label="Mme"
                  type="radio"
                  name = "radio"
                  id="2"
                  Checked={!signUpData.civilite}
                  onChange={(e)=> {
                      var copysignUpData = {...signUpData}
                      copysignUpData.civilite = !signUpData.civilite
                      setSignUpData(copysignUpData)
                  } }

                />
                <Col xs="12">
                <Form.Group controlId="formNom">
                  <Form.Label>Nom</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Nom" onChange={(e)=> {
                      var copysignUpData = {...signUpData}
                      copysignUpData.lastname = e.target.value
                      setSignUpData(copysignUpData)
                  } }/>
                </Form.Group>
              </Col>
                <Col xs="12">
                <Form.Group controlId="formPrenom">
                  <Form.Label>Prénom</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Prenom" onChange={(e)=> {
                      var copysignUpData = {...signUpData}
                      copysignUpData.firstname = e.target.value
                      setSignUpData(copysignUpData)
                  } }/>
                </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                <Form.Group controlId="formNom">
                  <Form.Label>Email</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Email" onChange={(e)=> {
                      var copysignUpData = {...signUpData}
                      copysignUpData.email = e.target.value
                      setSignUpData(copysignUpData)
                  } }/>
                </Form.Group>
              </Col>
              </Row>
              <Row style={{marginLeft:"1px"}}>
                <Col xq="12" md="6">
                <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                    onChange={(e)=> {
                      var copysignUpData = {...signUpData}
                      copysignUpData.birthday = e.target.value
                      setSignUpData(copysignUpData)
                    }}
                  />
                </FormGroup>
                </Col>
                <Col xq="12" md="6">
                  <Form.Group controlId="formPrenom">
                    <Form.Label>Numéro de Téléphone</Form.Label><span style={{color:"red"}}>* </span>
                    <Form.Control type="text" placeholder="Numéro de Téléphone" onChange={(e)=> {
                        var copysignUpData = {...signUpData}
                        copysignUpData.phone = e.target.value
                        setSignUpData(copysignUpData)
                    } }/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                <Form.Group controlId="formNom">
                  <Form.Label>Adresse</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Adresse" onChange={(e)=> {
                      var copysignUpData = {...signUpData}
                      copysignUpData.rue = e.target.value
                      setSignUpData(copysignUpData)
                  } }/>
                </Form.Group>
              </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <Form.Group controlId="formNom">
                    <Form.Label>Code Postal</Form.Label><span style={{color:"red"}}>* </span>
                    <Form.Control type="text" placeholder="Code Postal" onChange={(e)=> {
                        var copysignUpData = {...signUpData}
                        copysignUpData.codePostal = e.target.value
                        setSignUpData(copysignUpData)
                    } }/>
                  </Form.Group>
                </Col>
                <Col xs="12" md="6">
                  <Form.Group controlId="formNom">
                    <Form.Label>Ville</Form.Label><span style={{color:"red"}}>* </span>
                    <Form.Control type="text" placeholder="Ville" onChange={(e)=> {
                        var copysignUpData = {...signUpData}
                        copysignUpData.ville = e.target.value
                        setSignUpData(copysignUpData)
                    } }/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs="12" md="6">
                  <Form.Group controlId="formNom">
                    <Form.Label>Password</Form.Label><span style={{color:"red"}}>* </span>
                    <Form.Control type="text" placeholder="Password" onChange={(e)=> {
                        var copysignUpData = {...signUpData}
                        copysignUpData.password = e.target.value
                        setSignUpData(copysignUpData)
                    } }/>
                  </Form.Group>
                </Col>
                <Col xs="12" md="6">
                  <Form.Group controlId="formNom">
                    <Form.Label>Confirme Password</Form.Label><span style={{color:"red"}}>* </span>
                    <Form.Control type="text" placeholder="Confirme Password" onChange={(e)=> {
                        var copysignUpData = {...signUpData}
                        copysignUpData.confPassword = e.target.value
                        setSignUpData(copysignUpData)
                    } }/>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <p className="change-modal" onClick = {() => {setLoginState("login")}}>Déjà un compte?</p>
              </Row>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-adresse" variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button  className="btn-adresse" variant="primary" onClick={signUp}>
              inscription
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )}

}

export default LoginModal;
