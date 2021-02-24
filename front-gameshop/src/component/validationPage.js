import React from 'react';
import {Container,Row} from 'react-bootstrap/';
import {useSelector, useDispatch} from 'react-redux';



function ValidationPage() {
  const GameData = useSelector(state => state.pageProduct.game.games);
  const dispatch = useDispatch();

  // var userDataReducer = useSelector(state => state.initialUser.user.user);

  setTimeout(function () {
  dispatch({type:"changePage", data:'home'}); //will redirect to your index page (an ex: index.html)
}, 5000);

// console.log(userDataReducer)

  return (
    <Container className="ProductPage" style={{marginTop:"185px",marginBottom:"100px"}}>
      <Row style={{height:"200px",backgroundColor:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <p style={{fontWeight:"bold",marginTop:"15px",fontSize:"17px"}}>
          Merci de votre achat Mr bob, vous allez être redirigé sur la page d'acceuil du site.
        </p>
      </Row>
    </Container>
  );
}

export default ValidationPage;
