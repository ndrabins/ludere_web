import {
  AUTH_USER,
  SIGN_OUT_USER,
  AUTH_ERROR,
  AUTH_SUCCESS,
  INITIALIZE_USER
} from "../actions/types";

const initialState = {
  authenticated: false,
  error: null,
  user: null,
  loading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: false,
        error: null,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        user: null,
        authenticated: false,
        error: null,
        loading: false
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message,
        loading: false
      };
    case INITIALIZE_USER:
      return state;
    default:
      return state;
  }
}
