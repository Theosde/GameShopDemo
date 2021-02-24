import React,{useState} from 'react';
import { Button } from 'reactstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap/';

import {useSelector, useDispatch} from 'react-redux';


function AddressModal() {

  const dispatch = useDispatch();

  const userDataReducer = useSelector(state => state.initialUser.user.user);

  const [show,setShow] = useState(false)

  const[modifAdressLivraison,setModifAdressLivraison] = useState({
    firstname: userDataReducer.adresselivraison.firstname,
    lastname: userDataReducer.adresselivraison.lastname,
    rue: userDataReducer.adresselivraison.rue,
    codePostal: userDataReducer.adresselivraison.codePostal,
    adresseComplementaire: userDataReducer.adresselivraison.adresseComplementaire,
    ville: userDataReducer.adresselivraison.ville,
    pays: userDataReducer.adresselivraison.pays
  })



  var handleClose = () => {
    setShow(false)
  }

  var handleShow = () => {
    setShow(true)
  }

    return (
      <>
        <Button variant="primary" onClick={handleShow} className="btn-adresse">
          Modifier mon adresse
        </Button>

        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title className="gradiant-text">Ajouter une Adresse</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col xs="6">
                <Form.Group controlId="formNom">
                  <Form.Label>Nom</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Nom" value={modifAdressLivraison.lastname} onChange={(e)=> {
                      var copyModifAdressLivraison = {...modifAdressLivraison}
                      copyModifAdressLivraison.lastname = e.target.value
                      console.log(copyModifAdressLivraison);
                      setModifAdressLivraison(copyModifAdressLivraison)
                  } }/>
                </Form.Group>
              </Col>
                <Col xs="6">
                <Form.Group controlId="formPrenom">
                  <Form.Label>Prenom</Form.Label><span style={{color:"red"}}>* </span>
                  <Form.Control type="text" placeholder="Prenom" value={modifAdressLivraison.firstname} onChange={(e)=> {
                      var copyModifAdressLivraison = {...modifAdressLivraison}
                      copyModifAdressLivraison.firstname = e.target.value
                      console.log(copyModifAdressLivraison);
                      setModifAdressLivraison(copyModifAdressLivraison)
                  } }/>
                </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formAdress">
                <Form.Label>Adresse</Form.Label><span style={{color:"red"}}>* </span>
                <Form.Control type="text" placeholder="Adresse" value={modifAdressLivraison.rue} onChange={(e)=> {
                    var copyModifAdressLivraison = {...modifAdressLivraison}
                    copyModifAdressLivraison.rue = e.target.value
                    console.log(copyModifAdressLivraison);
                    setModifAdressLivraison(copyModifAdressLivraison)
                } }/>
              </Form.Group>

              <Form.Group controlId="formSupAdress">
                <Form.Label>Complément d'Adresse</Form.Label><span style={{color:"red"}}>* </span>
                <Form.Control type="text" placeholder="Complément d'adresse" value={modifAdressLivraison.adresseComplementaire} onChange={(e)=> {
                    var copyModifAdressLivraison = {...modifAdressLivraison}
                    copyModifAdressLivraison.adresseComplementaire = e.target.value
                    console.log(copyModifAdressLivraison);
                    setModifAdressLivraison(copyModifAdressLivraison)
                } }/>
              </Form.Group>
              <Row>
                <Col xs="4">
                  <Form.Group controlId="formZip">
                    <Form.Label>Code postal </Form.Label><span style={{color:"red"}}>* </span>
                    <Form.Control type="text" placeholder="Code postal" value={modifAdressLivraison.codePostal} onChange={(e)=> {
                        var copyModifAdressLivraison = {...modifAdressLivraison}
                        copyModifAdressLivraison.codePostal = e.target.value
                        console.log(copyModifAdressLivraison);
                        setModifAdressLivraison(copyModifAdressLivraison)
                    } }/>
                  </Form.Group>
                </Col>
                <Col xs="8">
                  <Form.Group controlId="formTown">
                    <Form.Label>Ville</Form.Label><span style={{color:"red"}}>* </span>
                    <Form.Control type="text" placeholder="Ville" value={modifAdressLivraison.ville} onChange={(e)=> {
                        var copyModifAdressLivraison = {...modifAdressLivraison}
                        copyModifAdressLivraison.ville = e.target.value
                        console.log(copyModifAdressLivraison);
                        setModifAdressLivraison(copyModifAdressLivraison)
                    } }/>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formCountry">
                <Form.Label>Pays</Form.Label><span style={{color:"red"}}>* </span>
                <Form.Control type="text" placeholder="Pays" value={modifAdressLivraison.pays} onChange={(e)=> {
                    var copyModifAdressLivraison = {...modifAdressLivraison}
                    copyModifAdressLivraison.pays = e.target.value
                    console.log(copyModifAdressLivraison);
                    setModifAdressLivraison(copyModifAdressLivraison)
                } }/>
              </Form.Group>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-adresse" variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button  className="btn-adresse" variant="primary" onClick={() => {

              //find user connect
              fetch("https://arcane-temple-10797.herokuapp.com/users/set-adresslivraison/"+userDataReducer._id+"/"+modifAdressLivraison.firstname+"/"+modifAdressLivraison.lastname+"/"+modifAdressLivraison.rue+"/"+modifAdressLivraison.codePostal+"/"+modifAdressLivraison.adresseComplementaire+"/"+modifAdressLivraison.ville+"/"+modifAdressLivraison.pays)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log('MODIF ADRESS LIVRAISON RETOUR FETCH');
                console.log(data);
                dispatch({type:"initialUserData", dataUser:data})

              })
              .catch((error) => {
                console.log('Request failed USER', error)
              });


              handleClose()
            }}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default AddressModal;
