import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  postEmployeesPending,
  postEmployeesSuccess,
  postEmployeesError
} from './actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getEmployeesSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(getEmployeesError(error.toString()));
      });
  };
};

export const postEmployee = (url, payload) => {
  return (dispatch) => {
    dispatch(postEmployeesPending);
    fetch(`${process.env.REACT_APP_API_URL}/employees${url}`, payload)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(postEmployeesSuccess(response));
        }
      })
      .catch((error) => {
        dispatch(postEmployeesError(error.toString()));
      });
  };
};
