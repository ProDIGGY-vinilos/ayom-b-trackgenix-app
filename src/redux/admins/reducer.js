import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ONE_ADMIN_PENDING,
  GET_ONE_ADMIN_SUCCESS,
  GET_ONE_ADMIN_ERROR,
  GET_ADMIN_BY_FIREBASE_UID_PENDING,
  GET_ADMIN_BY_FIREBASE_UID_SUCCESS,
  GET_ADMIN_BY_FIREBASE_UID_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  CLEAR_ERROR_MESSAGE
} from 'redux/admins/constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: '',
  message: ''
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
        error: action.payload
      };
    case GET_ONE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ONE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [action.payload]
      };
    case GET_ONE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_ADMIN_BY_FIREBASE_UID_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMIN_BY_FIREBASE_UID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_ADMIN_BY_FIREBASE_UID_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case POST_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload.data],
        error: '',
        isLoading: false,
        message: action.payload.message
      };
    case POST_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case PUT_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case PUT_ADMIN_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        error: false,
        list: [
          ...state.list.map((admin) => {
            if (admin._id === action.payload.data._id) {
              return action.payload.data;
            } else {
              return admin;
            }
          })
        ],
        isLoading: false
      };
    case PUT_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((task) => task._id !== action.payload.data)],
        message: action.payload.message,
        error: '',
        isLoading: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: '',
        message: ''
      };
    default:
      return state;
  }
};

export default reducer;
