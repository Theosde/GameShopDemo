import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, combineReducers}  from 'redux';
import {Provider} from 'react-redux';


import initialGame from './reducer/initialGame.reducer';
import initialUser from './reducer/initialUser.reducer';
import pagesChange from './reducer/navigation.reducer';
import pageProduct from './reducer/pageProduct.reducer';
import verifOrder from './reducer/verifOrder.reducer';
import initialOrder from './reducer/initialOrder.reducer';
import initialAllOrderDash from './reducer/initialAllOrderDash.reducer';
import initialDayOrderDash from './reducer/initialDayOrderDash.reducer';
import loginModal from './reducer/loginModal.reducer';
import statDay from './reducer/statDay.reducer';
import statWeek from './reducer/statWeek.reducer';
import statMonth from './reducer/statMonth.reducer';
import statYear from './reducer/statYear.reducer';

const store = createStore(combineReducers({statDay,statWeek,statMonth,statYear,loginModal,initialGame,initialUser,pagesChange,pageProduct,verifOrder,initialOrder,initialAllOrderDash,initialDayOrderDash}));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
