import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_WITH_DELETED_PENDING,
  GET_TASKS_WITH_DELETED_SUCCESS,
  GET_TASKS_WITH_DELETED_ERROR,
  GET_ONE_TASK_PENDING,
  GET_ONE_TASK_SUCCESS,
  GET_ONE_TASK_ERROR,
  POST_TASK_PENDING,
  POST_TASK_SUCCESS,
  POST_TASK_ERROR,
  PUT_TASK_PENDING,
  PUT_TASK_SUCCESS,
  PUT_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  CLEAR_ERROR_MESSAGE
} from 'redux/tasks/constant';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: '',
  message: ''
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_TASKS_WITH_DELETED_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_TASKS_WITH_DELETED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_TASKS_WITH_DELETED_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_ONE_TASK_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_ONE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [action.payload]
      };
    case GET_ONE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case POST_TASK_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case POST_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload.data],
        error: '',
        message: action.payload.message
      };
    case POST_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case PUT_TASK_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case PUT_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [
          ...state.list.map((task) => {
            if (task._id === action.payload.data._id) {
              return action.payload.data;
            } else {
              return task;
            }
          })
        ],
        error: '',
        message: action.payload.message
      };
    case PUT_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [...state.list.filter((task) => task._id !== action.payload)]
      };
    case DELETE_TASK_ERROR:
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
      return {
        ...state
      };
  }
};

export default reducer;
