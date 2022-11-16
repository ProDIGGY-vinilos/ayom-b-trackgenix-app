import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  POST_EMPLOYEE_PENDING,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_ERROR,
  PUT_EMPLOYEE_PENDING,
  PUT_EMPLOYEE_SUCCESS,
  PUT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  EMPTY_ERROR
} from './constant';

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

export const emptyError = () => {
  return {
    type: EMPTY_ERROR
  };
};
