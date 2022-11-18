import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  postEmployeesPending,
  postEmployeesSuccess,
  postEmployeesError,
  putEmployeesPending,
  putEmployeesSuccess,
  putEmployeesError,
  deleteEmployeesPending,
  deleteEmployeesSuccess,
  deleteEmployeesError
} from 'redux/employees/actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getEmployeesSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getEmployeesError(error.toString()));
      });
  };
};

export const postEmployee = (url, payload) => {
  return (dispatch) => {
    dispatch(postEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${url}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(postEmployeesSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(postEmployeesError(error.toString()));
      });
  };
};

export const putEmployee = (url, payload) => {
  return (dispatch) => {
    dispatch(putEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${url}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(putEmployeesSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(putEmployeesError(error.toString()));
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
