import React from 'react';
import {Row, Col } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';


import {Line} from 'react-chartjs-2';




function StatsPanel() {
  const dispatch = useDispatch();

  var StatDayReducer = useSelector(state => state.statDay);
  var StatWeekReducer = useSelector(state => state.statWeek);
  var StatMonthReducer = useSelector(state => state.statMonth);
  var StatYearReducer = useSelector(state => state.statYear);

  var dataToGraphDay = StatDayReducer.map(e => e.total.toFixed(2))
  var dataToGraphWeek = StatWeekReducer.map(e => e.total.toFixed(2))
  var dataToGraphMonth = StatMonthReducer.map(e => e.total.toFixed(2))
  var dataToGraphYear = StatYearReducer.map(e => e.total.toFixed(2))


console.log(dataToGraphWeek);

  const chartDay = {
    labels: ['0h', '4h', '8h', '12h', '16h', '20h', '24h'],
    datasets: [
      {
        label: 'Commandes du Jour',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(109,68,213,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(109,68,213,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(109,68,213,1)',
        pointHoverBorderColor: 'rgba(109,68,213,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataToGraphDay
      }
    ]
  };

  const chartWeek = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        label: 'Commandes de la Semaine',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(109,68,213,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(109,68,213,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(109,68,213,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataToGraphWeek
      }
    ]
  };


  const chartMonth = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4', 'Semaine 5'],
    datasets: [
      {
        label: 'Commandes du Mois par Semaine',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(109,68,213,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(109,68,213,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(109,68,213,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataToGraphMonth
      }
    ]
  };

  const chartYear = {
    labels: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', "Juin", "Juill", "Aout", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Commandes de l'Année par Mois",
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(109,68,213,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(109,68,213,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(109,68,213,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataToGraphYear
      }
    ]
  };

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




          <div class="main-content resp-stats-panel" style={{display:"flex",flexDirection:"column"}}>

            <div style={{overflow:"scroll"}}>
              <div className="gradiant-text" style={{width:"100%",display:"flex",justifyContent:"center",marginBottom:"55px",marginTop:"55px"}}>
                MES STATISTIQUES
              </div>

                <div style={{width:"100%",display:"flex", marginBottom:"65px"}}>
                  <Line data={chartDay} />
                </div>
                <div style={{width:"100%",display:"flex", marginBottom:"65px"}}>
                  <Line data={chartWeek}/>
                </div>
                <div style={{width:"100%",display:"flex", marginBottom:"65px"}}>
                  <Line data={chartMonth}/>
                </div>
                <div style={{width:"100%",display:"flex", marginBottom:"65px"}}>
                  <Line data={chartYear}/>
                </div>




              </div>

          </div>

        </div>
    </div>
  );

}




export default StatsPanel;
