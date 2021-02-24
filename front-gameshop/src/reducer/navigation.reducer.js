const initialState = {
  pages: 'home'
}

function pagesChange( state = initialState, action){
  if(action.type == 'changePage') {
    console.log("reducerPage",action.data);
    return { pages: action.data }  ; // traitement de l'information
  } else {
    return state;
  }
}


export default pagesChange;
