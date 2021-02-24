import React from 'react';
import {Row, Col } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';


function SupportPanel() {
  const dispatch = useDispatch();

  return (
    <div>
        <div className="top-nav">
          <ul>
            <li className="logo">
              <div><img src="logo.png"/></div>
            </li>
            <li>
              <div>
                <img className="opacity" src="news.png"/>
                <p>Actualité</p>
              </div>
            </li>
            <li>
              <div>
                <img className="opacity" src="chat.png"/>
                <p>mes contacts</p>
              </div>
            </li>
            <li>
              <div>
                <img className="opacity" src="support.png"/>
                <p>Support technique</p>
              </div>
            </li>
            <li>
              <div>
                <img className="opacity" src="logout.png"/>
                <p>Déconnection</p>
              </div>
            </li>
            <li>
              <div>
                <img className="avatar" src="avatar.png"/>
              </div>
            </li>
          </ul>
        </div>


        <div className="zone-centrale">

          <div className="side-nav">
            <ul>
              <li onClick={()=> dispatch({type:"changePage", data:'revenusPanel'})}><span>1</span>Mes revenus du jour</li>
              <li onClick={()=> dispatch({type:"changePage", data:'commandPanel'}) }><span>2</span>Status des commandes</li>
              <li onClick={()=> dispatch({type:"changePage", data:'statsPanel'}) }><span>3</span>Mes statistiques</li>
              <li onClick={()=> dispatch({type:"changePage", data:'supportPanel'}) }><span>4</span>Support technique</li>
              <li onClick={()=> dispatch({type:"changePage", data:'dashboard'}) }><span>5</span>Menu Principal</li>
            </ul>
          </div>




          <div className="main-content resp-support-panel" style={{display:"flex",flexDirection:"column"}}>
            <div className="gradiant-text" style={{width:"100%",display:"flex",justifyContent:"center",marginBottom:"55px",marginTop:"55px"}}>
              SUPPORT TECHNIQUE
            </div>
            <div style={{width:"100%"}}>
              <label>Entrer votre message ici</label>
              <textarea className="text-area" style={{height:"200px",width:"100%"}}></textarea>
            </div>
            <div style={{width:"100%",marginTop:"35px",display:"flex",justifyContent:"flex-end"}}>
              <a className="sendMess" href="mailto:arnaud.rey.job@gmail.com"> Envoyer </a>
            </div>





          </div>

        </div>
    </div>
  );
}

export default SupportPanel;
