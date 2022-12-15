import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  RELOGIN_PENDING,
  RELOGIN_SUCCESS,
  RELOGIN_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SET_AUTHENTICATION
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  authenticated: false,
  role: '',
  email: '',
  firebaseUid: '',
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
    case SIGN_UP_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case RELOGIN_PENDING:
      return { ...state };
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case SIGN_UP_ERROR:
    case RELOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        role: action.payload.role,
        email: action.payload.email,
        firebaseUid: action.payload.firebaseUid
      };
    }
    case RELOGIN_SUCCESS: {
      return {
        ...state,
        authenticated: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        role: null,
        firebaseUid: ''
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: true,
        role: action.payload.role,
        email: action.payload.email,
        firebaseUid: action.payload.firebaseUid
      };
    }
    default:
      return state;
  }
};

export default reducer;
