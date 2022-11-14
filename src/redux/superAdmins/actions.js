import {
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_PENDING,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  POST_SUPERADMINS_ERROR
} from './constant';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (payload) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminsPending = () => {
  return {
    type: POST_SUPERADMINS_PENDING
  };
};

export const postSuperAdminsSuccess = (payload) => {
  return {
    type: POST_SUPERADMINS_SUCCESS,
    payload
  };
};

export const postSuperAdminsError = (error) => {
  return {
    type: POST_SUPERADMINS_ERROR,
    payload: error
  };
};
