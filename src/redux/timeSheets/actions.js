import { GET_TIMESHEETS_PENDING, GET_TIMESHEETS_SUCCESS, GET_TIMESHEETS_ERROR } from './constant';

export const getTimeSheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimeSheetsSuccess = (payload) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload
  };
};

export const getTimeSheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};
