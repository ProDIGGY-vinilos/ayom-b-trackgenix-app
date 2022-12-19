import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_PROJECTS_WITH_DELETED_PENDING,
  GET_PROJECTS_WITH_DELETED_SUCCESS,
  GET_PROJECTS_WITH_DELETED_ERROR,
  GET_ONE_PROJECT_PENDING,
  GET_ONE_PROJECT_SUCCESS,
  GET_ONE_PROJECT_ERROR,
  GET_PROJECTS_BY_EMPLOYEE_PENDING,
  GET_PROJECTS_BY_EMPLOYEE_SUCCESS,
  GET_PROJECTS_BY_EMPLOYEE_ERROR,
  POST_PROJECT_PENDING,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR,
  PUT_PROJECT_PENDING,
  PUT_PROJECT_ERROR,
  PUT_PROJECT_SUCCESS,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_SUCCESS,
  CLEAR_ERROR_MESSAGE
} from 'redux/projects/constant';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsSuccess = (payload) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const getProjectsWithDeletedPending = () => {
  return {
    type: GET_PROJECTS_WITH_DELETED_PENDING
  };
};

export const getProjectsWithDeletedSuccess = (payload) => {
  return {
    type: GET_PROJECTS_WITH_DELETED_SUCCESS,
    payload
  };
};

export const getProjectsWithDeletedError = (error) => {
  return {
    type: GET_PROJECTS_WITH_DELETED_ERROR,
    payload: error
  };
};

export const getOneProjectPending = () => {
  return {
    type: GET_ONE_PROJECT_PENDING
  };
};

export const getOneProjectSuccess = (data) => {
  return {
    type: GET_ONE_PROJECT_SUCCESS,
    payload: data
  };
};

export const getOneProjectError = (error) => {
  return {
    type: GET_ONE_PROJECT_ERROR,
    payload: error
  };
};

export const getProjectsByEmployeePending = () => {
  return {
    type: GET_PROJECTS_BY_EMPLOYEE_PENDING
  };
};

export const getProjectsByEmployeeSuccess = (payload) => {
  return {
    type: GET_PROJECTS_BY_EMPLOYEE_SUCCESS,
    payload
  };
};

export const getProjectsByEmployeeError = (error) => {
  return {
    type: GET_PROJECTS_BY_EMPLOYEE_ERROR,
    payload: error
  };
};

export const postProjectPending = () => {
  return {
    type: POST_PROJECT_PENDING
  };
};

export const postProjectSuccess = (data) => {
  return {
    type: POST_PROJECT_SUCCESS,
    payload: data
  };
};

export const postProjectError = (error) => {
  return {
    type: POST_PROJECT_ERROR,
    payload: error
  };
};

export const putProjectPending = () => {
  return {
    type: PUT_PROJECT_PENDING
  };
};

export const putProjectSuccess = (data) => {
  return {
    type: PUT_PROJECT_SUCCESS,
    payload: data
  };
};

export const putProjectError = (error) => {
  return {
    type: PUT_PROJECT_ERROR,
    payload: error
  };
};

export const deleteProjectPending = () => {
  return {
    type: DELETE_PROJECT_PENDING
  };
};

export const deleteProjectSuccess = (payload) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload
  };
};

export const deleteProjectError = (error) => {
  return {
    type: DELETE_PROJECT_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR_MESSAGE
  };
};
