import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_ONE_PROJECT_PENDING,
  GET_ONE_PROJECT_SUCCESS,
  GET_ONE_PROJECT_ERROR,
  GET_PROJECTS_BY_EMPLOYEE_PENDING,
  GET_PROJECTS_BY_EMPLOYEE_SUCCESS,
  GET_PROJECTS_BY_EMPLOYEE_ERROR,
  POST_PROJECT_PENDING,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
  PUT_PROJECT_PENDING,
  PUT_PROJECT_SUCCESS,
  PUT_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  CLEAR_ERROR_MESSAGE
} from 'redux/projects/constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case GET_ONE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_ONE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [action.payload]
      };
    case GET_ONE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_PROJECTS_BY_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_PROJECTS_BY_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case POST_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_PROJECT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        list: [...state.list, action.payload.data],
        isLoading: false,
        error: ''
      };
    case POST_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case PUT_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_PROJECT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        list: [
          ...state.list.map((project) => {
            if (project._id === action.payload.data._id) {
              return action.payload.data;
            }
            return project;
          })
        ],
        isLoading: false,
        error: ''
      };
    case PUT_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((project) => project._id !== action.payload)],
        isLoading: false,
        error: ''
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: '',
        message: ''
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
