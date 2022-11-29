import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ONE_ADMIN_PENDING,
  GET_ONE_ADMIN_SUCCESS,
  GET_ONE_ADMIN_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR
} from 'redux/admins/constant';

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
    case POST_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.data],
        error: '',
        isLoading: false
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
        isLoading: true
      };
    case PUT_ADMIN_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.map((admin) => {
            if (admin._id === action.data._id) {
              return action.data;
            } else {
              return admin;
            }
          })
        ],
        error: '',
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
        list: [...state.list.filter((task) => task._id !== action.payload)],
        error: '',
        isLoading: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
