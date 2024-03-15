import { global } from "@/reducerActions/authActions";

export const authReducer = (state, action) => {
  switch (action.type) {
    case global.AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        authInfo: action.payload.authInfo,
        mainUser: action.payload.mainUser,
      };

    case global.SIGNUP:
      return {
        ...state,

        mainUser: action.payload.mainUser,
        errormessage: action.payload.errormessage,
        successmessage: action.payload.successmessage,
      };

    case global.SUCCESS:
      return {
        ...state,
        errormessage: "",
        successmessage: action.payload,
      };
    case global.ERROR:
      return {
        ...state,

        mainUser: "",
        errormessage: action.payload,
        successmessage: "",
      };
    case global.CLEAR_ERROR:
      return {
        ...state,

        successmessage: "",
        errormessage: "",
      };
    case global.CLEAR_SUCCESS:
      return {
        ...state,

        errormessage: "",
        successmessage: "",
      };

    case global.THEME:
      return {
        ...state,
        theme: !action.payload,
      };

    default:
      return state;
  }
};
