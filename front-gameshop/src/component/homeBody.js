import {Container,Row,Col,Collapse,Button,Form,FormControl,Pagination} from 'react-bootstrap/';
import React, {useState, useEffect} from 'react';



// import {connect} from 'react-redux';

import {useSelector, useDispatch} from 'react-redux';



function Body(pageProduct) {
  const [collapsePrix, setCollapsePrix] = useState(false);

  const [collapseGenre, setCollapseGenre] = useState(false);
  const [filterGenre, setFilterGenre] = useState([]);
  const [listGenreFilter, setListGenreFilter] = useState([]);

  const [collapsePlatform, setCollapsePlatform] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState([]);
  const [listPlatformFilter, setListPlatformFilter] = useState([]);


  const [collapseEditeur, setCollapseEditeur] = useState(false);
  const [filterEditeur, setFilterEditeur] = useState([]);
  const [listEditeurFilter, setListEditeurFilter] = useState([]);



  const [useEffectFetchState, setuseEffectFetchState] = useState(true);




  var allGamesReducer = useSelector(state => state.initialGame.games.games);



  var userDataReducer = useSelector(state => state.initialUser.user.user);

  const dispatch = useDispatch();

  console.log("userDataReducer",userDataReducer);


// filtre
  const [inputSearch, setInputSearch] = useState("");
  const [filterSelect, setFilterSelect] = useState("");

// pagination
  const [targetPage, setTargetPage] = useState(1);
  const [nbPage, setNbPage] = useState(0);



  pageProduct = (element) => {

    //find user connect
    fetch("https://arcane-temple-10797.herokuapp.com/productpage/"+element)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log('Page Product');
      console.log(data);
      dispatch(
        {type:"dataPageProduct", data: data}
      )
      dispatch(
        {type:"changePage", data:'productPage'}
      )
    })
    .catch((error) => {
      console.log('Request failed USER', error)
    });

  }


  useEffect(()=>{

    if (useEffectFetchState) {
      setuseEffectFetchState(!useEffectFetchState)

      console.log('Dans le if du useEffect');

      //find all game
      fetch('https://arcane-temple-10797.herokuapp.com/home')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('azertyuiopqsdfghjkmwxcvbn');
        console.log(data);
        dispatch({type:"initialGameData", data:data})
      })
      .catch((error) => {
        console.log('Request failed', error)
      });


      console.log("userDataReducer",userDataReducer);
      if (userDataReducer != undefined) {
        console.log("userDataReducer",userDataReducer);
        //find user connect
        fetch("https://arcane-temple-10797.herokuapp.com/users/get-user/"+userDataReducer.email)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log('USER Connect');
          console.log(data);
          dispatch({type:"initialUserData", dataUser:data})
        })
        .catch((error) => {
          console.log('Request failed USER', error)
        });
      }




    }

  })

// collapse
  var Navstyle ={

  }

  if (collapseEditeur == true || collapseGenre == true){
    Navstyle ={
      minHeight:"650px",
      marginTop:"75px",
      marginBottom:"25px"
    }
  }
  if (collapsePlatform == true & collapseEditeur == true || collapseEditeur == true & collapseGenre == true|| collapseGenre == true & collapsePlatform == true){
    Navstyle ={
      minHeight:"850px",
      marginTop:"75px",
      marginBottom:"25px"
    }
  }
  if (collapseGenre & collapseEditeur & collapsePlatform == true){
    Navstyle ={
      minHeight:"1000px",
      marginTop:"75px",
      marginBottom:"25px"
    }
  }



  console.log("DATA front reducer",allGamesReducer);



  var mapListGames;
if (allGamesReducer) {

//Filter SideBAR
  var allGenreGame = []
  var allPlatformGame = []
  var allEditeurGame = []

  for (var i = 0; i < allGamesReducer.length; i++) {
    console.log(allGamesReducer[i]);

    for (var j = 0; j < allGamesReducer[i].genre.length; j++) {
      if (!allGenreGame.includes(allGamesReducer[i].genre[j])) {
        allGenreGame.push(allGamesReducer[i].genre[j])
      }
    }

    for (var j = 0; j < allGamesReducer[i].platform.length; j++) {
      if (!allPlatformGame.includes(allGamesReducer[i].platform[j])) {
        allPlatformGame.push(allGamesReducer[i].platform[j])
      }
    }

    if (!allEditeurGame.includes(allGamesReducer[i].publisher)) {
      allEditeurGame.push(allGamesReducer[i].publisher)
    }


  }

  allGenreGame.sort()
  allPlatformGame.sort()
  allEditeurGame.sort()

  var listAllGenreGame;
  var listAllPlatformGame;
  var listAllEditeurGame;




  for (var i = 0; i < allGenreGame.length; i++) {

    listAllGenreGame = allGenreGame.map(e => {
      return <Form.Check style={{color:"black"}}
              type="checkbox"
              id={"checkbox"+i}
              label={e}
              onChange={()=> {
                if (listGenreFilter.includes(e)) {
                  setFilterGenre(listGenreFilter.splice(listGenreFilter.indexOf(e),1))
                }else {
                  setFilterGenre(listGenreFilter.push(e))
                }
              }}
            />
    })

    listAllPlatformGame = allPlatformGame.map(e => {
      return <Form.Check style={{color:"black"}}
              type="checkbox"
              id={"checkbox"+i}
              label={e}
              onChange={()=> {
                if (listPlatformFilter.includes(e)) {
                  setFilterPlatform(listPlatformFilter.splice(listPlatformFilter.indexOf(e),1))
                }else {
                  setFilterPlatform(listPlatformFilter.push(e))
                }
              }}
            />
    })

    listAllEditeurGame = allEditeurGame.map(e => {
      return <Form.Check style={{color:"black"}}
              type="checkbox"
              id={"checkbox"+i}
              label={e}
              onChange={()=> {
                if (listEditeurFilter.includes(e)) {
                  setFilterEditeur(listEditeurFilter.splice(listEditeurFilter.indexOf(e),1))
                }else {
                  setFilterEditeur(listEditeurFilter.push(e))
                }
              }}
            />
    })

  }



console.log("allGenreGame",allGenreGame);
console.log("allPlatformGame",allPlatformGame);
console.log("allEditeurGame",allEditeurGame);




// filter select
  if (filterSelect == "Du - cher au + cher") {
    allGamesReducer.sort(function(a,b){return a.prix - b.prix})
  }else if (filterSelect == "Du + cher au - cher") {
    allGamesReducer.sort(function(a,b){return b.prix - a.prix})
  }else if (filterSelect == "Du + récent au + ancien") {
    allGamesReducer.sort(function(a,b){return new Date(b.datedesortie) - new Date(a.datedesortie)})
  }else if (filterSelect == "Du + ancien au + récent") {
    allGamesReducer.sort(function(a,b){return new Date(a.datedesortie) - new Date(b.datedesortie)})
  }else {
    allGamesReducer.sort((a, b) => (a.name > b.name) ? 1 : -1)
  }


  // filter search
  var regex = new RegExp('(' +inputSearch.toLowerCase() + '){1,}')
  var newAllgame = allGamesReducer;
  if (inputSearch != "") {
    newAllgame = allGamesReducer.filter(g => regex.test(g.name.toLowerCase()) )
  }

  // filter checkout sidebar
  console.log("ListeGenre",listGenreFilter);
  console.log("ListePlatform",listPlatformFilter);
  console.log("ListeEditeur",listEditeurFilter);


  var sideFilter = newAllgame

  if (listGenreFilter.length > 0) {
    for (var i = 0; i < listGenreFilter.length; i++) {
      sideFilter = newAllgame.filter(g => g.genre.includes(listGenreFilter[i]) )
    }
  }

  var sideFilterGenre = sideFilter

  if (listPlatformFilter.length > 0) {
    console.log(listPlatformFilter);
    console.log(sideFilterGenre);

    for (var i = 0; i < listPlatformFilter.length; i++) {
      sideFilterGenre = sideFilterGenre.filter(g => g.platform.includes(listPlatformFilter[i]) )
    }
    console.log("result",sideFilterGenrePlatform);
  }

  var sideFilterGenrePlatform = sideFilterGenre

  if (listEditeurFilter.length > 0) {
    sideFilterGenrePlatform = sideFilterGenrePlatform.filter(g => g.publisher == listEditeurFilter)
  }






  //  PAGINATION
  var copyAllGame = [...sideFilterGenrePlatform]

  if (copyAllGame.length > 10) {
    var nbDePage = Math.ceil(copyAllGame.length/10)
    if (nbDePage != nbPage) {
      setNbPage(nbDePage)
    }
  }else {
    var nbDePage = 1
    if (nbDePage != nbPage) {
      setNbPage(nbDePage)
    }
  }

  var paginationTableau = copyAllGame.splice((targetPage-1)*10,10)

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


console.log(paginationTableau);

// LISTE des JEUX
  mapListGames = paginationTableau.map(e =>{

    return <Row className="product" style={{height:"200px",width:"100%",backgroundColor:"white",display:"flex",alignItems:"center",padding:"10px 0"}}>
      <Col xs="5" sm="2" className="product-img" onClick={ () => pageProduct(e._id) }><img style={{width:"100%",cursor:"pointer"}} src={e.img} /></Col>
      <Col xs="7" sm="5" className="product-desc">
        <h3 style={{cursor:"pointer",fontSize:25}} onClick={() => pageProduct(e._id)}>{e.name}</h3>
        <h6>{e.platform.join(", ")}</h6>
        <p style={{fontSize:13}}>{e.desc.substring(0, 75)+"..."}</p>
      </Col>
      <Col xs="6" sm="3" className="product-stock"><h5 style={{color: e.stock > 20 ? "green" : "orange" }}>{e.stock > 20 ? "En Stock" : "Low Stock !" }</h5></Col>
      <Col  xs="6" sm="2" className="product-price-btn" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <h4>{e.prix}€</h4>
        <div className="panier-btn" style={{cursor:"pointer"}}
          onClick={()=> {
            console.log("userDataReducer",userDataReducer);


            if (userDataReducer == undefined) {

              dispatch(
                {type:"loginModal", data:true}
              )

            }else {

              console.log(userDataReducer);
              console.log("hcgjv;bknkhghvhvhvjhvjhvj;hv;vj;hv;jhv;jh");

              fetch('https://arcane-temple-10797.herokuapp.com/users/add-productinpanier/'+userDataReducer.email+'/'+e._id)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                console.log('Fetch Ajout Article ');
                console.log(data);
                setuseEffectFetchState(!useEffectFetchState)
              })
              .catch((error) => {
                console.log('Request failed', error)
              });
            }



          }}
        ></div>
      </Col>
    </Row>
  })

}



  return (
    <Container className="body-main" style={Navstyle}>
      <Row>
        <Col style={{backgroundColor:"#333",height:"270px",maxHeight:"auto",color:"white", padding:"0"}} className="d-none d-md-block" md="3">
          <Button
            style={{width:"100%", textAlign:"left", backgroundColor:"#333", borderRadius:"0", border:"none", boxShadow:"none",borderBottom:"1px solid white"}}
            onClick={()=> {
              setFilterSelect("Du + récent au + ancien")
            }}>
            Nouveauté
          </Button>
          <Button
            style={{width:"100%", textAlign:"left", backgroundColor:"#333", borderRadius:"0", border:"none", boxShadow:"none",borderBottom:"1px solid white"}}
          >
            A venir

          </Button>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Button
              style={{width:"100%", textAlign:"left", backgroundColor:"#333", borderRadius:"0", border:"none", boxShadow:"none"}}
              onClick={() => setCollapseGenre(!collapseGenre)}
              aria-controls="example-collapse-text"
              aria-expanded={collapseGenre}
            >
              Genre
            </Button>
            <img onClick={() => setCollapseGenre(!collapseGenre)} src={collapseGenre ? "./dropup.png"  : "./dropdown.png" } style={{height:"18px",width:"18px",marginRight:"10px", cursor:"pointer"}}/>
          </div>
          <Collapse in={collapseGenre}>
              <div className="example-collapse-text">
                <Form>
                  {listAllGenreGame}
                </Form>

              </div>
          </Collapse>

          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",backgroundColor:"#333"}}>
            <Button
              style={{width:"100%", textAlign:"left", backgroundColor:"rgba(0,0,0,0)", border:"none", boxShadow:"none"}}
              onClick={() => setCollapsePlatform(!collapsePlatform)}
              aria-controls="example-collapse-text"
              aria-expanded={collapsePlatform}
            >
              Platform
            </Button>
          <img onClick={() => setCollapsePlatform(!collapsePlatform)} src={collapsePlatform ? "./dropup.png"  : "./dropdown.png" } style={{height:"18px",width:"18px",marginRight:"10px", cursor:"pointer"}}/>
        </div>
          <Collapse in={collapsePlatform}>
            <div className="example-collapse-text">
              <Form>
                {listAllPlatformGame}
              </Form>
            </div>
          </Collapse>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center",backgroundColor:"#333"}}>
            <Button
              style={{width:"100%", textAlign:"left", backgroundColor:"rgba(0,0,0,0)", border:"none", boxShadow:"none"}}
              onClick={() => setCollapseEditeur(!collapseEditeur)}
              aria-controls="example-collapse-text"
              aria-expanded={collapseEditeur}
            >
              Editeur
            </Button>
          <img onClick={() => setCollapseEditeur(!collapseEditeur)} src={collapseEditeur ? "./dropup.png"  : "./dropdown.png" } style={{height:"18px",width:"18px",marginRight:"10px", cursor:"pointer"}}/>
        </div>
          <Collapse in={collapseEditeur}>
            <div className="example-collapse-text">
              <Form>
                {listAllEditeurGame}
              </Form>
            </div>
          </Collapse>

        </Col>

      <Col xs="12" md="9">

          <div style={{display:"flex"}}>
            <Col style={{backgroundColor:"rgba(0,0,0,0)",color:"black",padding:"0"}} xs="8" md="8">
              <Form inline style={{width:"100%"}}>
                <FormControl type="text" placeholder="Recherchez ici" style={{margin:"5px"}} value={inputSearch} onChange={(e)=> {
                    setTargetPage(1)
                    setInputSearch(e.target.value)
                } }/>
              </Form>
            </Col>

            <Col style={{backgroundColor:"rgba(0,0,0,0)",color:"black",paddingRight:"0px"}} xs="4" md="4">
              <Form.Group style={{margin:"5px"}} controlId="exampleForm.ControlSelect1">

                 <Form.Control as="select" onChange={(e)=> {
                   console.log(e.target.value);
                   setFilterSelect(e.target.value)
                 }}>
                   <option>Par Nom</option>
                   <option>Du - cher au + cher</option>
                   <option>Du + cher au - cher</option>
                   <option>Du + récent au + ancien</option>
                   <option>Du + ancien au + récent</option>
                 </Form.Control>
               </Form.Group>
            </Col>
          </div>

        <Col className="content" style={{backgroundColor:"transparent",height:"400px",color:"black",display:"flex",flexDirection:"column",alignItems:"center",marginTop:"20px"}} xs="12" md="12">

          {mapListGames}

        </Col>

        <Col style={{display:"flex",justifyContent:"center"}}>
          <ul className="supress-padding" style={{display:"flex",justifyContent:"center"}}>
            {targetPage == 1 ? "" : paginationFirst}
            {targetPage == 1 ? "" : paginationPrev}
            {paginationLi}
            {nbPage == targetPage ? "" : paginationSui}
            {nbPage == targetPage ? "" : paginationLast}

          </ul>
        </Col>

      </Col>

      </Row>





    </Container>
  );
}

export default Body;
