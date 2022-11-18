import {
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_PENDING,
  POST_SUPERADMIN_PENDING,
  POST_SUPERADMIN_SUCCESS,
  POST_SUPERADMIN_ERROR,
  PUT_SUPERADMIN_PENDING,
  PUT_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR
} from 'redux/superAdmins/constant';

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

export const postSuperAdminPending = () => {
  return {
    type: POST_SUPERADMIN_PENDING
  };
};

export const postSuperAdminSuccess = (payload) => {
  return {
    type: POST_SUPERADMIN_SUCCESS,
    payload
  };
};

export const postSuperAdminError = (error) => {
  return {
    type: POST_SUPERADMIN_ERROR,
    payload: error
  };
};

export const putSuperAdminPending = () => {
  return {
    type: PUT_SUPERADMIN_PENDING
  };
};

export const putSuperAdminSuccess = (payload) => {
  return {
    type: PUT_SUPERADMIN_SUCCESS,
    payload
  };
};

export const putSuperAdminError = (error) => {
  return {
    type: PUT_SUPERADMIN_ERROR,
    payload: error
  };
};

export const deleteSuperAdminPending = () => {
  return {
    type: DELETE_SUPERADMIN_PENDING
  };
};

export const deleteSuperAdminSuccess = (payload) => {
  return {
    type: DELETE_SUPERADMIN_SUCCESS,
    payload
  };
};

export const deleteSuperAdminError = (error) => {
  return {
    type: DELETE_SUPERADMIN_ERROR,
    payload: error
  };
};
