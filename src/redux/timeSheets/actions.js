import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_WITH_DELETED_PENDING,
  GET_TIMESHEETS_WITH_DELETED_SUCCESS,
  GET_TIMESHEETS_WITH_DELETED_ERROR,
  GET_TIMESHEETS_BY_EMPLOYEE_PENDING,
  GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS,
  GET_TIMESHEETS_BY_EMPLOYEE_ERROR,
  GET_ONE_TIMESHEET_PENDING,
  GET_ONE_TIMESHEET_SUCCESS,
  GET_ONE_TIMESHEET_ERROR,
  POST_TIMESHEET_PENDING,
  POST_TIMESHEET_SUCCESS,
  POST_TIMESHEET_ERROR,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR,
  CLEAR_ERROR_MESSAGE
} from 'redux/timeSheets/constant';

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

export const getTimeSheetsWithDeletedPending = () => {
  return {
    type: GET_TIMESHEETS_WITH_DELETED_PENDING
  };
};

export const getTimeSheetsWithDeletedSuccess = (payload) => {
  return {
    type: GET_TIMESHEETS_WITH_DELETED_SUCCESS,
    payload
  };
};

export const getTimeSheetsWithDeletedError = (error) => {
  return {
    type: GET_TIMESHEETS_WITH_DELETED_ERROR,
    payload: error
  };
};

export const getTimeSheetsByEmployeePending = () => {
  return {
    type: GET_TIMESHEETS_BY_EMPLOYEE_PENDING
  };
};

export const getTimeSheetsByEmployeeSuccess = (payload) => {
  return {
    type: GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS,
    payload
  };
};

export const getTimeSheetsByEmployeeError = (error) => {
  return {
    type: GET_TIMESHEETS_BY_EMPLOYEE_ERROR,
    payload: error
  };
};

export const getOneTimeSheetPending = () => {
  return {
    type: GET_ONE_TIMESHEET_PENDING
  };
};

export const getOneTimeSheetSuccess = (payload) => {
  return {
    type: GET_ONE_TIMESHEET_SUCCESS,
    payload
  };
};

export const getOneTimeSheetError = (error) => {
  return {
    type: GET_ONE_TIMESHEET_ERROR,
    payload: error
  };
};

export const postTimeSheetPending = () => {
  return {
    type: POST_TIMESHEET_PENDING
  };
};

export const postTimeSheetSuccess = (payload) => {
  return {
    type: POST_TIMESHEET_SUCCESS,
    payload
  };
};

export const postTimeSheetError = (error) => {
  return {
    type: POST_TIMESHEET_ERROR,
    payload: error
  };
};

export const putTimeSheetPending = () => {
  return {
    type: PUT_TIMESHEET_PENDING
  };
};

export const putTimeSheetSuccess = (payload) => {
  return {
    type: PUT_TIMESHEET_SUCCESS,
    payload
  };
};

export const putTimeSheetError = (error) => {
  return {
    type: PUT_TIMESHEET_ERROR,
    payload: error
  };
};
//
export const deleteTimeSheetPending = () => {
  return {
    type: DELETE_TIMESHEET_PENDING
  };
};

export const deleteTimeSheetSuccess = (payload) => {
  return {
    type: DELETE_TIMESHEET_SUCCESS,
    payload
  };
};

export const deleteTimeSheetError = (error) => {
  return {
    type: DELETE_TIMESHEET_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR_MESSAGE
  };
};
