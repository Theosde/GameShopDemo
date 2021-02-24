function statYear( state = [], action){
  if(action.type == 'initialStatYear') {
    console.log("reducer initialStatYear",action.data);
    return action.data; // traitement de l'information
  } else {
    return state;
  }
}

export default statYear;
