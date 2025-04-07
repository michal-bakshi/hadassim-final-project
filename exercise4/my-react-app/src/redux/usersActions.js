export const addNewUser = (user) => {
    return{type: 'REGISTATION',payload:user}
  }
  export const loginFunc=(x,user)=>{
    debugger
    return {type:"LOG_IN",payload:{x:x,user:user}}
  }
  export const getUsers=(myData)=>{
    return {type:"GET_USERS",payload:myData}
  }