/* import { GET_TIMESHEETS_PENDING, GET_TIMESHEETS_SUCCESS, GET_TIMESHEETS_ERROR } from './constant';

export const getTimeSheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimeSheetsSuccess = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getTimeSheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
}; */

import { getTimeSheetsError, getTimeSheetsSuccess, getTimeSheetsPending } from './actions';

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
