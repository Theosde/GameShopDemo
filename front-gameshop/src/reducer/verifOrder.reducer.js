const initialInfoPanier = {
  verifOrder: []
}

function infoPanier( state = initialInfoPanier, action){
  if(action.type == 'verifOrder') {
    console.log("Redux data",action.data);
    return { verifOrder: action.data }  ; // traitement de l'information
  } else {
    return state;
  }
}

export default infoPanier;
