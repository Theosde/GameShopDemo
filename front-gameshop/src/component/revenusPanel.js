import React, {useState, useEffect} from 'react';
import {Row, Col } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';


function RevenusPanel() {

    const dispatch = useDispatch();

    var allOrderDash = useSelector(state => state.initialDayOrderDash);

    const [orderFetchBdd, setOrderFetchBdd] = useState([]);

    const [newTotal, setnewTotal] = useState(0);


    console.log(allOrderDash.order);


    var date = new Date()

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



    if (allOrderDash.order.length > 0) {


      allOrderDash.order.sort(function(a,b){return new Date(b.datepaiment) - new Date(a.datepaiment)})


      var total = 0;



      var allOrder = allOrderDash.order.map(e => {

        total = total+e.total

        // nb article
        var nbProduct = 0;
        e.refproduct.map(p => nbProduct = nbProduct + p.quantity )

        //DATE LIVRAISON
        var date = new Date(e.datepaiment)

        var heure = "00"
        var min = "00"


        if (date.getHours() < 10) {
          heure = '0'+ date.getHours()
        }else {
          heure = date.getHours()
        }

        if (date.getMinutes() < 10) {
          min = '0'+ date.getMinutes()
        }else {
          min = date.getMinutes()
        }

        return  <div class="operations resp-revenus" style={{marginBottom:"5px",borderRadius:"5px",height:"55px",width:"100%",backgroundColor:"#EFEFEF",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div style={{marginLeft:"15px"}}>{heure+"h"+min}</div>
                  <div>{nbProduct}</div>
                  <div style={{marginRight:"15px"}}>{e.total+"€"}</div>
                </div>



      })


      if (orderFetchBdd.length == 0) {
        setOrderFetchBdd(allOrder)
      }

      if (newTotal == 0) {
        setnewTotal(total)
      }
    }

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




            <div class="main-content" style={{overflow:"scroll",display:"flex",flexDirection:"column"}}>
              <div style={{overflow:"scroll"}}>
                  <div className="resp-revenus" style={{padding:"10px",backgroundImage: "linear-gradient(to right bottom, #5011a3, #3e0f81, #5011a3, #6412c7, #8071ff)",color:"white",borderRadius:"5px",display:"flex",justifyContent:"center",marginTop:"15px", marginBottom:"25px"}}>
                    {"Journée du "+jour+"/"+mois+"/"+année}
                  </div>
                  <div class="operations resp-revenus" style={{color:"white",marginBottom:"5px",borderRadius:"5px",height:"55px",width:"100%",backgroundImage: "linear-gradient(to right bottom, #5011a3, #3e0f81, #5011a3, #6412c7, #8071ff)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{marginLeft:"15px"}}>Heure</div>
                    <div>Nb de produits</div>
                    <div style={{marginRight:"15px"}}>Prix</div>
                  </div>
                  {orderFetchBdd}

                  <div class="operations" style={{borderRadius:"5px",color:"white",marginBottom:"25px",height:"55px",width:"100%",backgroundImage: "linear-gradient(to right bottom, #5011a3, #3e0f81, #5011a3, #6412c7, #8071ff)",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                    <div style={{marginRight:"15px"}}>{"Total : "+newTotal.toFixed(2)+"€"}</div>
                  </div>
            </div>
            </div>


        </div>
    </div>
  );
}

export default RevenusPanel;
