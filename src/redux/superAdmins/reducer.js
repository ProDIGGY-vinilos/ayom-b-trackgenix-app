import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  POST_SUPERADMIN_PENDING,
  POST_SUPERADMIN_SUCCESS,
  POST_SUPERADMIN_ERROR,
  PUT_SUPERADMIN_PENDING,
  PUT_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR
} from 'redux/superAdmins/constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_SUPERADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case POST_SUPERADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list, action.payload]
      };
    case POST_SUPERADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case PUT_SUPERADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case PUT_SUPERADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [
          ...state.list.map((superAdmins) => {
            if (superAdmins._id === action.payload._id) {
              return action.payload;
            } else {
              return superAdmins;
            }
          })
        ]
      };
    case PUT_SUPERADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list.filter((superAdmins) => superAdmins._id !== action.payload)]
      };
    case DELETE_SUPERADMIN_ERROR:
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
