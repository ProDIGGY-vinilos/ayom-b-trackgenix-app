import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_SUCCESS,
  PUT_ADMINS_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR
} from './constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: []
      };
    case POST_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_ADMINS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        error: '',
        isLoading: false
      };
    case POST_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: []
      };
    case PUT_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_ADMINS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        error: '',
        isLoading: false
      };
    case PUT_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: []
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: [action.payload],
        error: '',
        isLoading: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: []
      };
    default:
      return state;
  }
};

export default reducer;
