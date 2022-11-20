import {
  getTimeSheetsPending,
  getTimeSheetsSuccess,
  getTimeSheetsError,
  getOneTimeSheetPending,
  getOneTimeSheetSuccess,
  getOneTimeSheetError,
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

export const getTimeSheets = () => {
  return (dispatch) => {
    dispatch(getTimeSheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet`)
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

export const getOneTimeSheet = (id) => {
  return (dispatch) => {
    dispatch(getOneTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`)
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

export const postTimeSheet = (data) => {
  return (dispatch) => {
    dispatch(postTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
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

export const putTimeSheet = (data, id) => {
  return (dispatch) => {
    dispatch(putTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
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

export const deleteTimeSheet = (id) => {
  return (dispatch) => {
    dispatch(deleteTimeSheetPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
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
