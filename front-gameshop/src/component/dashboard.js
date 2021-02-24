import React, {useState, useEffect} from 'react';
import {Row, Col } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';


function Dashboard() {

  const dispatch = useDispatch();



  //find all game
  fetch('https://arcane-temple-10797.herokuapp.com/verif-status-livraison')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log('retour fetch Mise A jour status livraison');
    console.log(data);


  })
  .catch((error) => {
    console.log('Request failed', error)
  });



  //find all game
  fetch('https://arcane-temple-10797.herokuapp.com/get-order-state-day')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log('retour fetch State Du Jour');
    console.log(data);

    dispatch(
      {type:"initialStatDay", data: data.OrderStatDay}
    )

  })
  .catch((error) => {
    console.log('Request failed', error)
  });


  var mois = new Date().getMonth()
  var annee = new Date().getFullYear()



  //find all game
  fetch('https://arcane-temple-10797.herokuapp.com/get-order-state-week')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log('retour fetch State Du Week');
    console.log(data);

    dispatch(
      {type:"initialStatWeek", data: data.OrderStatWeek}
    )

  })
  .catch((error) => {
    console.log('Request failed', error)
  });




  fetch(`https://arcane-temple-10797.herokuapp.com/get-order-state-month/${mois}/${annee}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log('retour fetch State Du Mois');
    console.log(data);

    dispatch(
      {type:"initialStatMonth", data: data.OrderStatMonth}
    )

  })
  .catch((error) => {
    console.log('Request failed', error)
  });


  fetch(`https://arcane-temple-10797.herokuapp.com/get-order-state-annee/${annee}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log('retour fetch State Du Année');
    console.log(data);

    dispatch(
      {type:"initialStatYear", data: data.OrderStatYear}
    )

  })
  .catch((error) => {
    console.log('Request failed', error)
  });






  //find all game
  fetch('https://arcane-temple-10797.herokuapp.com/users/get-order-dashbord')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log('retour fetch all order');
    console.log(data);
    dispatch(
      {type:"initialOrderDashData", data: data.order}
    )

  })
  .catch((error) => {
    console.log('Request failed', error)
  });


  //find all game
  fetch('https://arcane-temple-10797.herokuapp.com/users/get-order-dashbord/day')
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log('retour fetch all order');
    console.log(data);
    dispatch(
      {type:"initialOrderDashDay", data: data.order}
    )

  })
  .catch((error) => {
    console.log('Request failed', error)
  });





  return (
    <div>
        <div class="top-nav">
          <ul>
            <li class="logo">
              <div><img src="logo.png"/></div>
            </li>
            <li>
              <div>
                <img class="opacity" src="news.png"/>
                <p>Actualité</p>
              </div>
            </li>
            <li>
              <div>
                <img class="opacity" src="chat.png"/>
                <p>mes contacts</p>
              </div>
            </li>
            <li>
              <div>
                <img class="opacity" src="support.png"/>
                <p>Support technique</p>
              </div>
            </li>
            <li>
              <div>
                <img class="opacity" src="logout.png"/>
                <p>Déconnection</p>
              </div>
            </li>
            <li>
              <div>
                <img class="avatar" src="avatar.png"/>
              </div>
            </li>
          </ul>
        </div>



        <div class="zone-centrale">

          <div class="side-nav">
            <ul>
              <li onClick={()=> dispatch({type:"changePage", data:'revenusPanel'})}><span>1</span>Mes revenus du jour</li>
              <li onClick={()=> dispatch({type:"changePage", data:'commandPanel'}) }><span>2</span>Status des commandes</li>
              <li onClick={()=> dispatch({type:"changePage", data:'statsPanel'}) }><span>3</span>Mes statistiques</li>
              <li onClick={()=> dispatch({type:"changePage", data:'supportPanel'}) }><span>4</span>Support technique</li>
              <li onClick={()=> dispatch({type:"changePage", data:'dashboard'}) }><span>5</span>Menu Principal</li>
            </ul>
          </div>

          <div class="main-content">

            <div class="line-1">
              <div class="block">
                    <div class="box" onClick={()=> dispatch({type:"changePage", data:'revenusPanel'})}>
                      <div class="logo-income"></div>
                      <p style={{marginTop:"15px",fontSize:"16px"}} className="gradiant-text">Mes revenus du jour</p>
                    </div>
                    <div class="box" onClick={()=> dispatch({type:"changePage", data:'statsPanel'}) }>
                      <div class="logo-stats"></div>
                      <p style={{marginTop:"15px",fontSize:"16px"}} className="gradiant-text">Mes statistiques</p>
                    </div>
                </div>
            </div>

            <div class="line-2">
                <div class="box" onClick={()=> dispatch({type:"changePage", data:'commandPanel'}) }>
                  <div class="logo-depenses"></div>
                  <p style={{marginTop:"15px",fontSize:"16px"}} className="gradiant-text">Status des commandes</p>
                </div>
                <div class="box" onClick={()=> dispatch({type:"changePage", data:'supportPanel'}) }>
                  <div class="logo-support"></div>
                  <p style={{marginTop:"15px",fontSize:"16px"}} className="gradiant-text">Support</p>
                </div>
            </div>
          </div>



        </div>
    </div>
  );
}

export default Dashboard;
