import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR
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
    type: POST_EMPLOYEES_PENDING
  };
};

export const postEmployeesSuccess = (data) => {
  return {
    type: POST_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const postEmployeesError = (error) => {
  return {
    type: POST_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeesPending = () => {
  return {
    type: DELETE_EMPLOYEES_PENDING
  };
};

export const deleteEmployeesSuccess = (id) => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS,
    payload: id
  };
};

export const deleteEmployeesError = (error) => {
  return {
    type: DELETE_EMPLOYEES_ERROR,
    payload: error
  };
};
