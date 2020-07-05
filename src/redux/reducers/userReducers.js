import {
  SET_AUTHENTICATED,
  LOADING,
  STOP_LOADING,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOG_OUT,
} from "../types";
const initialState = {
  authenticated: false,
  loading: false,
  errors: {},
  data: {},
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        data: action.payload,
      };
    case LOG_OUT:
      return initialState;

    case LOADING:
      return {
        ...state,
        loading: true,
      };

    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        authenticated: true,
        loading: false,
        errors: null,
      };
    // case LOG_OUT:
    //   return {
    //     ...state,
    //     token: localStorage.removeItem("token"),
    //   };

    default:
      return state;
  }
}
