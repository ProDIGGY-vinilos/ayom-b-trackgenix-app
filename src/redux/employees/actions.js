import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GET_EMPLOYEES_WITH_DELETED_PENDING,
  GET_EMPLOYEES_WITH_DELETED_SUCCESS,
  GET_EMPLOYEES_WITH_DELETED_ERROR,
  GET_ONE_EMPLOYEE_PENDING,
  GET_ONE_EMPLOYEE_SUCCESS,
  GET_ONE_EMPLOYEE_ERROR,
  GET_EMPLOYEE_BY_FIREBASE_UID_PENDING,
  GET_EMPLOYEE_BY_FIREBASE_UID_SUCCESS,
  GET_EMPLOYEE_BY_FIREBASE_UID_ERROR,
  POST_EMPLOYEE_PENDING,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_PENDING,
  PUT_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  CLEAR_ERROR_MESSAGE
} from 'redux/employees/constant';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const getEmployeesWithDeletedPending = () => {
  return {
    type: GET_EMPLOYEES_WITH_DELETED_PENDING
  };
};

export const getEmployeesWithDeletedSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_WITH_DELETED_SUCCESS,
    payload: data
  };
};

export const getEmployeesWithDeletedError = (error) => {
  return {
    type: GET_EMPLOYEES_WITH_DELETED_ERROR,
    payload: error
  };
};

export const getOneEmployeePending = () => {
  return {
    type: GET_ONE_EMPLOYEE_PENDING
  };
};

export const getOneEmployeeSuccess = (data) => {
  return {
    type: GET_ONE_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const getOneEmployeeError = (error) => {
  return {
    type: GET_ONE_EMPLOYEE_ERROR,
    payload: error
  };
};

export const getEmployeeByFirebaseUidPending = () => {
  return {
    type: GET_EMPLOYEE_BY_FIREBASE_UID_PENDING
  };
};

export const getEmployeeByFirebaseUidSuccess = (data) => {
  return {
    type: GET_EMPLOYEE_BY_FIREBASE_UID_SUCCESS,
    payload: data
  };
};

export const getEmployeeByFirebaseUidError = (error) => {
  return {
    type: GET_EMPLOYEE_BY_FIREBASE_UID_ERROR,
    payload: error
  };
};

export const postEmployeesPending = () => {
  return {
    type: POST_EMPLOYEE_PENDING
  };
};

export const postEmployeesSuccess = (data) => {
  return {
    type: POST_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const postEmployeesError = (error) => {
  return {
    type: POST_EMPLOYEE_ERROR,
    payload: error
  };
};

export const putEmployeesPending = () => {
  return {
    type: PUT_EMPLOYEE_PENDING
  };
};

export const putEmployeesSuccess = (data) => {
  return {
    type: PUT_EMPLOYEE_SUCCESS,
    payload: data
  };
};

export const putEmployeesError = (error) => {
  return {
    type: PUT_EMPLOYEE_ERROR,
    payload: error
  };
};

export const deleteEmployeesPending = () => {
  return {
    type: DELETE_EMPLOYEE_PENDING
  };
};

export const deleteEmployeesSuccess = (id) => {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    payload: id
  };
};

export const deleteEmployeesError = (error) => {
  return {
    type: DELETE_EMPLOYEE_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR_MESSAGE
  };
};
