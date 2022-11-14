import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  POST_TASKS_PENDING,
  POST_TASKS_SUCCESS,
  POST_TASKS_ERROR,
  PUT_TASKS_PENDING,
  PUT_TASKS_SUCCESS,
  PUT_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  OPEN_TASKS_MODAL,
  CLOSE_TASKS_MODAL
} from './constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  modal: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload,
        modal: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        modal: true,
        error: ''
      };
    case POST_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modal: true
      };
    case PUT_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: ''
      };
    case PUT_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case OPEN_TASKS_MODAL:
      return {
        ...state,
        isLoading: false,
        modal: true
      };
    case CLOSE_TASKS_MODAL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
