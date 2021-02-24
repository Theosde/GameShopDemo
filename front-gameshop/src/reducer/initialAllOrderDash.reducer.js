const initialState = {
  order: []
}

function initialOrder( state = initialState, action){
  if(action.type == 'initialOrderDashData') {
    console.log("reducerOrderDash",action.data);
    return { order: action.data }  ; // traitement de l'information
  } else {
    return state;
  }
}


export default initialOrder;
