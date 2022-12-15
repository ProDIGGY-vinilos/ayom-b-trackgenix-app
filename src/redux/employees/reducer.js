import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GET_ONE_EMPLOYEE_PENDING,
  GET_ONE_EMPLOYEE_SUCCESS,
  GET_ONE_EMPLOYEE_ERROR,
  GET_EMPLOYEE_BY_FIREBASE_UID_PENDING,
  GET_EMPLOYEE_BY_FIREBASE_UID_SUCCESS,
  GET_EMPLOYEE_BY_FIREBASE_UID_ERROR,
  POST_EMPLOYEE_PENDING,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_PENDING,
  PUT_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  CLEAR_ERROR
} from 'redux/employees/constant';

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
    case GET_ONE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_ONE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [action.payload]
      };
    case GET_ONE_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case GET_EMPLOYEE_BY_FIREBASE_UID_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEE_BY_FIREBASE_UID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_EMPLOYEE_BY_FIREBASE_UID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
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
        list: [...state.list, action.payload.data]
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
        list: [
          ...state.list.map((item) => {
            if (item._id === action.payload.data._id) {
              return action.payload.data;
            }
            return item;
          })
        ]
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
        error: ''
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        error: false,
        list: [...state.list.filter((element) => element._id !== action.payload)]
      };
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        list: [...state.list]
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
};

export default reducer;
