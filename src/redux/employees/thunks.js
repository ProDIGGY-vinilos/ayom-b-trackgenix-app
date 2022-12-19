import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  getEmployeesWithDeletedPending,
  getEmployeesWithDeletedSuccess,
  getEmployeesWithDeletedError,
  getOneEmployeePending,
  getOneEmployeeSuccess,
  getOneEmployeeError,
  getEmployeeByFirebaseUidPending,
  getEmployeeByFirebaseUidSuccess,
  getEmployeeByFirebaseUidError,
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

export const getEmployees = (token) => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`, {
      headers: {
        token
      }
    })
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

export const getEmployeesWithDeleted = (token) => {
  return (dispatch) => {
    dispatch(getEmployeesWithDeletedPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/withDeleted`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getEmployeesWithDeletedSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getEmployeesWithDeletedError(error.toString()));
      });
  };
};

export const getOneEmployee = (id, token) => {
  return (dispatch) => {
    dispatch(getOneEmployeePending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getOneEmployeeSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getOneEmployeeError(error.toString()));
      });
  };
};

export const getEmployeeByFirebaseUid = (firebaseUid, token) => {
  return (dispatch) => {
    dispatch(getEmployeeByFirebaseUidPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/firebase/${firebaseUid}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getEmployeeByFirebaseUidSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getEmployeeByFirebaseUidError(error.toString()));
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

export const putEmployee = (url, payload, token) => {
  return (dispatch) => {
    dispatch(putEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${url}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        token
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

export const deleteEmployee = (id, token) => {
  return (dispatch) => {
    dispatch(deleteEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        token
      }
    })
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
