import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_ERROR,
  PUT_TIMESHEETS_PENDING,
  PUT_TIMESHEETS_SUCCESS,
  PUT_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_ERROR
} from './constant';

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

export const postTimeSheetsPending = () => {
  return {
    type: POST_TIMESHEETS_PENDING
  };
};

export const postTimeSheetsSuccess = (data) => {
  return {
    type: POST_TIMESHEETS_SUCCESS,
    data
  };
};

export const postTimeSheetsError = (error) => {
  return {
    type: POST_TIMESHEETS_ERROR,
    payload: error
  };
};

export const putTimeSheetsPending = () => {
  return {
    type: PUT_TIMESHEETS_PENDING
  };
};

export const putTimeSheetsSuccess = (data) => {
  return {
    type: PUT_TIMESHEETS_SUCCESS,
    data
  };
};

export const putTimeSheetsError = (error) => {
  return {
    type: PUT_TIMESHEETS_ERROR,
    payload: error
  };
};
//
export const deleteTimeSheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

export const deleteTimeSheetsSuccess = () => {
  return {
    type: DELETE_TIMESHEETS_SUCCESS
  };
};

export const deleteTimeSheetsError = (error) => {
  return {
    type: DELETE_TIMESHEETS_ERROR,
    payload: error
  };
};
