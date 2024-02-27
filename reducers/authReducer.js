import { global } from "@/reducerActions/authActions"

export const authReducer=(state,action)=>{
switch(action.type){
    case global.SIGNUP:
        return {
          ...state,
            isAuthenticated: true,
            user: action.payload.user,
            errormessage: action.payload.errormessage,
            successmessage: action.payload.successmessage
        }
        case global.SIGNIN:
          return {
            ...state,
              isAuthenticated: true,
              user: action.payload.user,
              error: action.payload.errormessage,
              success: action.payload.successmessage
          }
          case global.THEME:
            return {
              ...state,
       theme:!action.payload }

 
    default:
        return state        
}
}