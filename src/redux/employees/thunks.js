import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  postEmployeesPending,
  postEmployeesSuccess,
  postEmployeesError,
  deleteEmployeesPending,
  deleteEmployeesSuccess,
  deleteEmployeesError
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

/* export const getEmployee = (id, data) => {

} */

export const postEmployee = (url, payload) => {
  return (dispatch) => {
    dispatch(postEmployeesPending());
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

export const deleteEmployee = (id) => {
  return (dispatch) => {
    dispatch(deleteEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (response.status !== 204) {
          response
            .json()
            .then((data) => {
              throw new Error(data.message);
            })
            .catch((error) => {
              dispatch(deleteEmployeesError(error.toString()));
            });
        } else {
          dispatch(deleteEmployeesSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(deleteEmployeesError(error.toString()));
      });
  };
};
