import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ONE_ADMIN_PENDING,
  GET_ONE_ADMIN_SUCCESS,
  GET_ONE_ADMIN_ERROR,
  GET_ADMIN_BY_FIREBASE_UID_PENDING,
  GET_ADMIN_BY_FIREBASE_UID_SUCCESS,
  GET_ADMIN_BY_FIREBASE_UID_ERROR,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR,
  PUT_ADMIN_PENDING,
  PUT_ADMIN_SUCCESS,
  PUT_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  CLEAR_ERROR_MESSAGE
} from 'redux/admins/constant';

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
    payload: error
  };
};

export const getOneAdminPending = () => {
  return {
    type: GET_ONE_ADMIN_PENDING
  };
};

export const getOneAdminSuccess = (payload) => {
  return {
    type: GET_ONE_ADMIN_SUCCESS,
    payload
  };
};

export const getOneAdminError = (error) => {
  return {
    type: GET_ONE_ADMIN_ERROR,
    payload: error
  };
};

export const getAdminByFirebaseUidPending = () => {
  return {
    type: GET_ADMIN_BY_FIREBASE_UID_PENDING
  };
};

export const getAdminByFirebaseUidSuccess = (payload) => {
  return {
    type: GET_ADMIN_BY_FIREBASE_UID_SUCCESS,
    payload
  };
};

export const getAdminByFirebaseUidError = (error) => {
  return {
    type: GET_ADMIN_BY_FIREBASE_UID_ERROR,
    payload: error
  };
};

export const postAdminPending = () => {
  return {
    type: POST_ADMIN_PENDING
  };
};

export const postAdminSuccess = (data) => {
  return {
    type: POST_ADMIN_SUCCESS,
    payload: data
  };
};

export const postAdminError = (error) => {
  return {
    type: POST_ADMIN_ERROR,
    error
  };
};

export const putAdminPending = () => {
  return {
    type: PUT_ADMIN_PENDING
  };
};

export const putAdminSuccess = (data) => {
  return {
    type: PUT_ADMIN_SUCCESS,
    data
  };
};

export const putAdminError = (error) => {
  return {
    type: PUT_ADMIN_ERROR,
    payload: error
  };
};

export const deleteAdminPending = () => {
  return {
    type: DELETE_ADMIN_PENDING
  };
};

export const deleteAdminSuccess = (payload) => {
  return {
    type: DELETE_ADMIN_SUCCESS,
    payload
  };
};

export const deleteAdminError = (error) => {
  return {
    type: DELETE_ADMIN_ERROR,
    payload: error
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR_MESSAGE
  };
};
