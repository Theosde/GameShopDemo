function statMonth( state = [], action){
  if(action.type == 'initialStatMonth') {
    console.log("reducer initialStatMonth",action.data);
    return action.data; // traitement de l'information
  } else {
    return state;
  }
}

export default statMonth;
