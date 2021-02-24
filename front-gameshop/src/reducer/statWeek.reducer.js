function statDay( state = [], action){
  if(action.type == 'initialStatWeek') {
    console.log("reducer initialStatWeek",action.data);
    return action.data; // traitement de l'information
  } else {
    return state;
  }
}

export default statDay;
