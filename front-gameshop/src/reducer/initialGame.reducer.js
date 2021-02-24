const initialState = {
  games: []
}

function initialGame( state = initialState, action){
  if(action.type == 'initialGameData') {
    console.log("reducerGame",action.data);
    return { games: action.data }  ; // traitement de l'information
  } else {
    return state;
  }
}


export default initialGame;
