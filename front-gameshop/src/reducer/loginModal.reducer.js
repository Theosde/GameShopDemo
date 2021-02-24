const initialState = {
  statusModal: false
}

function loginModal( state = initialState, action){
  if(action.type == 'loginModal') {
    console.log("reducer login modal");
    return { statusModal: action.data }  ; // traitement de l'information
  } else {
    return state;
  }
}


export default loginModal;
