import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_ERROR,
  PUT_TIMESHEETS_PENDING,
  PUT_TIMESHEETS_SUCCESS,
  PUT_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_ERROR
} from './constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        error: '',
        isLoading: false
      };
    case POST_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: []
      };
    case PUT_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        error: '',
        isLoading: false
      };
    case PUT_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: []
      };
    case DELETE_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: [action.payload],
        error: '',
        isLoading: false
      };
    case DELETE_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: []
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
