function statDay( state = [], action){
  if(action.type == 'initialStatDay') {
    console.log("reducer initialStatDay",action.data);
    return action.data; // traitement de l'information
  } else {
    return state;
  }
}

export default statDay;
