import {Navbar,Nav,Image} from 'react-bootstrap/';
import Badge from 'react-bootstrap/Badge'
import LoginModal from './loginModal.js';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';



function Header() {
  const[modalShow,setModalShow] = useState(false)


  let modalClose =() => setModalShow(false)

  const userDataReducer = useSelector(state => state.initialUser.user.user);
  const dispatch = useDispatch();


var elementVariableHeader ;

if (userDataReducer) {
  console.log("header data",userDataReducer.panier.length);

  elementVariableHeader = <div style={{display:"flex"}}>
    <Nav.Item className="justify-content-end" onClick={()=> {
      dispatch({type:"initialUserData", dataUser: {user:undefined} })
      dispatch({type:"changePage", data:'home'})
    } }>
      <Nav.Link href="#"><Image height="50" width="50" src="./loginlogout.png"></Image></Nav.Link>
    </Nav.Item>

    <Nav.Item className="justify-content-end" onClick={()=> dispatch({type:"changePage", data:'myinfos'}) }>
      <Nav.Link href="#"><Image height="50" width="50" src="./user.png"></Image><Badge class="badge" style={{position:"absolute",top:"55px"}} variant="light">0</Badge></Nav.Link>
    </Nav.Item>

    <Nav.Item className="justify-content-end" onClick={()=> dispatch({type:"changePage", data:'dashboard'}) }>
      <Nav.Link href="#"><Image height="50" width="50" src="./dashboardicon.png"></Image></Nav.Link>
    </Nav.Item>

  </div>
}else {

  elementVariableHeader = <LoginModal show={modalShow} onHide={modalClose}/>

}



  return (
    <div className="navbar-main">
      <Navbar bg="light" className="justify-content-between shadow" fixed="top">
        <Navbar.Brand  href="#" style={{display:"flex",alignItems:"center",color:"white",marginLeft:"25px"}} onClick={()=>dispatch({type:"changePage", data:'home'})}>
          <Image
            height="50" width="50"
            src="/robot-prod.png"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <h2 className="hideMe" style={{marginLeft:"15px",textTransform:"uppercase"}}>Game-Shop</h2>
        </Navbar.Brand>
          <div style={{display:"flex"}}>

            {elementVariableHeader}

            <Nav.Item className="justify-content-end" onClick={()=>dispatch({type:"changePage", data:'panier'})}>
              <Nav.Link href="#"><Image height="50" width="50" src="./panier.png"></Image><Badge class="badge" style={{position:"absolute",top:"55px"}}variant="light">{userDataReducer ? userDataReducer.panier.length : "0"}</Badge></Nav.Link>
            </Nav.Item>

        </div>

      </Navbar>
    </div>
  );
}

export default Header;
