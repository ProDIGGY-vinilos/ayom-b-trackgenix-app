import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR
} from './constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: '',
  message: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list, action.payload.data],
        message: action.payload.message
      };
    case POST_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: [...state.list]
      };
    case DELETE_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list.filter((element) => element._id !== action.payload)],
        message: action.payload.message
      };
    case DELETE_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: [...state.list]
      };
    default:
      return state;
  }
};

export default reducer;
