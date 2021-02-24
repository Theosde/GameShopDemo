const initialState = {
  game: {}
}

function pageProduct( state = initialState, action){
  if(action.type == 'dataPageProduct') {
    console.log("reducerPageProduct",action.data);
    return { game: action.data }  ; // traitement de l'information
  } else {
    return state;
  }
}


export default pageProduct;
