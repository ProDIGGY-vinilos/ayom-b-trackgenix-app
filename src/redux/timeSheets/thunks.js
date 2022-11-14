import {
  getTimeSheetsPending,
  getTimeSheetsSuccess,
  getTimeSheetsError,
  postTimeSheetsPending,
  postTimeSheetsSuccess,
  postTimeSheetsError,
  putTimeSheetsPending,
  putTimeSheetsSuccess,
  putTimeSheetsError,
  deleteTimeSheetsPending,
  deleteTimeSheetsSuccess,
  deleteTimeSheetsError
} from './actions';

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

export const postTimeSheets = (data) => {
  return (dispatch) => {
    dispatch(postTimeSheetsPending);
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        description: data.description,
        date: data.date,
        project: data.project,
        task: data.task,
        employee: data.employee,
        hours: data.hours
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(postTimeSheetsSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(postTimeSheetsError(error.toString()));
      });
  };
};

export const putTimeSheets = (data, id) => {
  return (dispatch) => {
    dispatch(putTimeSheetsPending);
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        description: data.description,
        date: data.date,
        project: data.project,
        task: data.task,
        employee: data.employee,
        hours: data.hours
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(putTimeSheetsSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(putTimeSheetsError(error.toString()));
      });
  };
};

export const deleteTimeSheets = (id) => {
  return (dispatch) => {
    dispatch(deleteTimeSheetsPending);
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status !== 204) {
          throw new Error("Couldn't remove TimeSheet");
        } else {
          dispatch(deleteTimeSheetsSuccess());
        }
      })
      .catch((err) => {
        dispatch(deleteTimeSheetsError(err.toString()));
      });
  };
};
