import {
  getTimeSheetsPending,
  getTimeSheetsSuccess,
  getTimeSheetsError,
  getOneTimeSheetPending,
  getOneTimeSheetSuccess,
  getOneTimeSheetError,
  getTimeSheetsByEmployeePending,
  getTimeSheetsByEmployeeSuccess,
  getTimeSheetsByEmployeeError,
  postTimeSheetPending,
  postTimeSheetSuccess,
  postTimeSheetError,
  putTimeSheetPending,
  putTimeSheetSuccess,
  putTimeSheetError,
  deleteTimeSheetPending,
  deleteTimeSheetSuccess,
  deleteTimeSheetError
} from 'redux/timeSheets/actions';

export const getTimeSheets = (token) => {
  return (dispatch) => {
    dispatch(getTimeSheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getTimeSheetsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getTimeSheetsError(error.toString()));
      });
  };
};

export const getTimeSheetsByEmployee = (id, token) => {
  return (dispatch) => {
    dispatch(getTimeSheetsByEmployeePending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/employee/${id}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getTimeSheetsByEmployeeSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getTimeSheetsByEmployeeError(error.toString()));
      });
  };
};

export const getOneTimeSheet = (id, token) => {
  return (dispatch) => {
    dispatch(getOneTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getOneTimeSheetSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getOneTimeSheetError(error.toString()));
      });
  };
};

export const postTimeSheet = (data, token) => {
  return (dispatch) => {
    dispatch(postTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        token
      },
      body: JSON.stringify({
        description: data.description,
        date: data.date,
        project: data.project,
        TimeSheet: data.TimeSheet,
        employee: data.employee,
        task: data.task,
        hours: data.hours
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(postTimeSheetSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(postTimeSheetError(error.toString()));
      });
  };
};

export const putTimeSheet = (data, id, token) => {
  return (dispatch) => {
    dispatch(putTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        token
      },
      body: JSON.stringify({
        description: data.description,
        date: data.date,
        project: data.project,
        TimeSheet: data.TimeSheet,
        employee: data.employee,
        task: data.task,
        hours: data.hours
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(putTimeSheetSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(putTimeSheetError(error.toString()));
      });
  };
};

export const deleteTimeSheet = (id, token) => {
  return (dispatch) => {
    dispatch(deleteTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        token
      }
    })
      .then((response) => {
        if (response.status !== 204) {
          throw new Error("Couldn't remove TimeSheet");
        } else {
          dispatch(deleteTimeSheetSuccess(id));
        }
      })
      .catch((err) => {
        dispatch(deleteTimeSheetError(err.toString()));
      });
  };
};
