import {current, produce} from 'immer'
import { login } from '../../axios/usersAxios'

export const myUsers={
  suppelierList:[],
manager:{name:"מנהל",password:"1234"},
isConnect:false,
isManeger: false, 
user: JSON.parse(localStorage.getItem("user")) || null,
currentUser:{products:[]}
}
  
export const userReducer = produce((state, action) => {
     switch (action.type) {
      case "REGISTATION":state.isConnect=true;
         state.currentUser=action.payload

         break;
      case "LOG_IN":
        if(action.payload.x=="m"){
            state.isManeger=true
            state.isConnect=true
        }
        else if(action.payload.x=="u"){
            state.isConnect=true
            state.isManeger=false
            state.currentUser=action.payload.user
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        }
   
          break;
    case "GET_USERS":
        state.suppelierList=action.payload
        break;
     

      default:
       break;
    }
    
  },myUsers)