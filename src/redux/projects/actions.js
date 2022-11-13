import { GET_PROJECTS_PENDING, GET_PROJECTS_SUCCESS, GET_PROJECTS_ERROR } from './constant';

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
