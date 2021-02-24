import React, {useState, useEffect} from 'react';
import {Row, Col } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';


function CommandPanel() {
  const dispatch = useDispatch();

  var allOrderDash = useSelector(state => state.initialAllOrderDash);

    const [orderFetchBdd, setOrderFetchBdd] = useState([]);

  // pagination
    const [targetPage, setTargetPage] = useState(1);
    const [nbPage, setNbPage] = useState(0);



    console.log(allOrderDash.order);
    var allOrder = allOrderDash.order

    // filter date + recent au + ancien
    allOrder.sort(function(a,b){return new Date(b.datepaiment) - new Date(a.datepaiment)})




    //  PAGINATION
    var copyAllGame = [...allOrder]

    if (copyAllGame.length > 5) {
      var nbDePage = Math.ceil(copyAllGame.length/5)
      if (nbDePage != nbPage) {
        setNbPage(nbDePage)
      }
    }else {
      var nbDePage = 1
      if (nbDePage != nbPage) {
        setNbPage(nbDePage)
      }
    }

    var paginationTableau = copyAllGame.splice((targetPage-1)*5,5)

    var tableMap = [];
    for (var i = 1; i <= nbDePage; i++) {
      tableMap.push(i)
    }

    //BTN Pagination
    var paginationLi;
    paginationLi = tableMap.map(p => {
      return <li  className="pagination-btn" onClick={()=>{
        setTargetPage(p)

      }}>{p}</li>
    })

    var paginationFirst = <li className="pagination-btn" onClick={()=>{setTargetPage(1)}}> {"<<"} </li>
    var paginationPrev = <li className="pagination-btn" onClick={()=>{setTargetPage(targetPage-1)}}> {"<"} </li>
    var paginationSui = <li className="pagination-btn" onClick={()=>{setTargetPage(targetPage+1)}}> {">"} </li>
    var paginationLast = <li className="pagination-btn" onClick={()=>{setTargetPage(paginationLi.length)}}> {">>"} </li>


  console.log("paginationTableau",paginationTableau);






  var allOrder = paginationTableau.map(e => {

    // nb article
    var nbProduct = 0;
    e.refproduct.map(p => nbProduct = nbProduct + p.quantity )

    //DATE LIVRAISON
    var date = new Date(e.datepaiment)

    var jour = "00";
    var mois = "00";
    var année = date.getFullYear();

    if(date.getDate() < 10){
    jour = '0'+ date.getDate()
    }else{jour = date.getDate()
    }

    if(date.getMonth() < 10){
      mois = '0' + (date.getMonth()+1)
    }else{
      mois = (date.getMonth()+1)
    }


    return  <div style={{backgroundColor:"#EFEFEF",height:"60px",width:"100%",marginBottom:"15px",display:"flex",justifyContent:"space-around",alignItems:"center"}}>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>{jour+"/"+mois+"/"+année}</div>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>{nbProduct}</div>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>{e.total+"€"}</div>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>{e.statusorder}</div>
            </div>



  })









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
              <li onClick={()=> dispatch({type:"changePage", data:'statsPanel'}) }><span>4</span>Mes statistiques</li>
              <li onClick={()=> dispatch({type:"changePage", data:'supportPanel'}) }><span>3</span>Support technique</li>
              <li onClick={()=> dispatch({type:"changePage", data:'dashboard'}) }><span>3</span>Menu Principal</li>
            </ul>
          </div>




          <div class="main-content resp-command-panel" style={{overflow:"scroll",display:"flex",flexDirection:"column"}}>
            <div className="gradiant-text" style={{marginTop:"35px",marginBottom:"25px",width:"100%", display:"flex", justifyContent:"center"}}>
              HISTORIQUE DES COMMANDES CLIENTS
            </div>
            <div style={{marginBottom:"15px",fontWeight:"bold",color:"white",borderRadius:"5px",height:"60px",width:"100%",backgroundImage: "linear-gradient(to right bottom, #5011a3, #3e0f81, #5011a3, #6412c7, #8071ff)",display:"flex",alignItems:"center",justifyContent:"space-around"}}>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>Date d'achat</div>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>Nb d'article</div>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>Prix Total</div>
              <div style={{width:"25%",display:"flex",justifyContent:"center",alignItems:"center"}}>Status commandes</div>
            </div>
            {allOrder}
            <Row style={{display:"flex",justifyContent:"center"}}>
              <ul className="supress-padding" style={{display:"flex",justifyContent:"center"}}>
                {targetPage == 1 ? "" : paginationFirst}
                {targetPage == 1 ? "" : paginationPrev}
                {paginationLi}
                {nbPage == targetPage ? "" : paginationSui}
                {nbPage == targetPage ? "" : paginationLast}

              </ul>
            </Row>
          </div>





        </div>


    </div>
  );
}

export default CommandPanel;
