import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/header';
import Body from './component/homeBody';
import Slide from './component/caroussel';
import Footer from './component/footer';
import Panier from './component/panier';
import Myinfos from './component/myinfos';
import ProductPage from './component/productPage';
import ValidationPage from './component/validationPage';
import VerifPage from './component/verif';
//Dashboard
import Dashboard from './component/dashboard';
import CommandPanel from './component/commandPanel';
import SupportPanel from './component/supportPanel';
import RevenusPanel from './component/revenusPanel';
import StatsPanel from './component/statsPanel';

import {useSelector,useDispatch} from 'react-redux';

function App() {

  const reduxData = useSelector( state => state.pagesChange.pages);
  const dispatch = useDispatch();
  console.log(reduxData);

  var MainContent;

  if(reduxData == 'home'){
    MainContent = <div><Slide/><Body/></div>
    // MainContent = <ValidationPage/>
  }else if(reduxData == 'panier'){
    MainContent = <Panier/>
  }else if(reduxData == 'myinfos'){
    MainContent = <Myinfos/>
  }else if(reduxData == 'productPage'){
    MainContent = <ProductPage/>
  }else if(reduxData == 'validationPage'){
    MainContent = <ValidationPage/>
  }else if(reduxData == 'verif'){
    MainContent = <VerifPage/>
  }else if(reduxData == 'revenusPanel'){
    MainContent = <RevenusPanel/>
  }else if(reduxData == 'commandPanel'){
    MainContent = <CommandPanel/>
  }else if(reduxData == 'statsPanel'){
    MainContent = <StatsPanel/>
  }else if(reduxData == 'supportPanel'){
    MainContent = <SupportPanel/>
  }else if(reduxData == 'dashboard'){
    MainContent = <Dashboard/>
  }

  return (
  <div>
    <Header/>
    {MainContent}
    <Footer/>
  </div>

  );
}

export default App;
