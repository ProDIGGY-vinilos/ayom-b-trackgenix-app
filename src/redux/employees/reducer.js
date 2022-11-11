import { GET_EMPLOYEES_PENDING, GET_EMPLOYEES_FULFILLED, GET_EMPLOYEES_REJECTED } from './constant';

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
        isLoading: true
      };
    case GET_EMPLOYEES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload
      };
    case GET_EMPLOYEES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        list: []
      };
    default:
      return state;
  }
};

export default reducer;
