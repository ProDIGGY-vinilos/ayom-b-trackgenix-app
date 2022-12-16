import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_WITH_DELETED_PENDING,
  GET_TIMESHEETS_WITH_DELETED_SUCCESS,
  GET_TIMESHEETS_WITH_DELETED_ERROR,
  GET_TIMESHEETS_BY_EMPLOYEE_PENDING,
  GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS,
  GET_TIMESHEETS_BY_EMPLOYEE_ERROR,
  GET_ONE_TIMESHEET_PENDING,
  GET_ONE_TIMESHEET_SUCCESS,
  GET_ONE_TIMESHEET_ERROR,
  POST_TIMESHEET_PENDING,
  POST_TIMESHEET_SUCCESS,
  POST_TIMESHEET_ERROR,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR
} from 'redux/timeSheets/constant';

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
        error: '',
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
    case GET_TIMESHEETS_WITH_DELETED_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_WITH_DELETED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_TIMESHEETS_WITH_DELETED_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_PENDING:
      return {
        ...state,
        error: '',
        isLoading: true
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: action.payload
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case GET_ONE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_ONE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        list: [action.payload]
      };
    case GET_ONE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case POST_TIMESHEET_PENDING:
      return {
        ...state,
        error: '',
        isLoading: true
      };
    case POST_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        error: '',
        isLoading: false
      };
    case POST_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case PUT_TIMESHEET_PENDING:
      return {
        ...state,
        error: '',
        isLoading: true
      };
    case PUT_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.map((task) => {
            if (task._id === action.payload._id) {
              return action.payload;
            } else {
              return task;
            }
          })
        ],
        error: '',
        isLoading: false
      };
    case PUT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        error: '',
        isLoading: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((task) => task._id !== action.payload)],
        error: '',
        isLoading: false
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    default:
      return {
        ...state
      };
  }
};

export default reducer;
