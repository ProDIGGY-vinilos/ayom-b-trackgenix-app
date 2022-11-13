import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR
} from './constant';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (payload) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    error
  };
};

export const postAdminsPending = () => {
  return {
    type: POST_ADMINS_PENDING
  };
};

export const postAdminsSuccess = (data) => {
  return {
    type: POST_ADMINS_SUCCESS,
    data
  };
};

export const postAdminsError = (error) => {
  return {
    type: POST_ADMINS_ERROR,
    payload: error
  };
};
