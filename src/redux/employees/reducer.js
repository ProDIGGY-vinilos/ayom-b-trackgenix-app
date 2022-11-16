import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  POST_EMPLOYEE_PENDING,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_PENDING,
  PUT_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  EMPTY_ERROR
} from './constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
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
    case POST_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list, action.payload.data],
        message: action.payload.message
      };
    case POST_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: [...state.list]
      };
    case PUT_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case PUT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list, action.payload.data],
        message: action.payload.message
      };
    case PUT_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: [...state.list]
      };
    case DELETE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list.filter((element) => element._id !== action.payload)],
        message: action.payload.message
      };
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: [...state.list]
      };
    case EMPTY_ERROR:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
};

export default reducer;
