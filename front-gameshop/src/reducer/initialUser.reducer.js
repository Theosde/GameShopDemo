const initialState = {
  user: {}
}

function initialUser( state = initialState, action){
  if(action.type == 'initialUserData') {
    console.log("reducerUser USER USER USER",action.dataUser);
    return { user: action.dataUser }  ; // traitement de l'information
  }else if (action.type == 'pushPagnier') {
    console.log("reducer add in pagnier");
    if (state.initialState == undefined) {
      state.user = []
    }

    ///////////////////
    state.user.push(action.data)
    console.log(action.data);
    console.log(state);


    return state;

  } else {
    return state;
  }
}


export default initialUser;
