import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  POST_PROJECT_PENDING,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_ERROR
} from './constant';

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
