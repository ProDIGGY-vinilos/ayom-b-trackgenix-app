import {
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_PENDING,
  GET_ONE_SUPERADMIN_PENDING,
  GET_ONE_SUPERADMIN_SUCCESS,
  GET_ONE_SUPERADMIN_ERROR,
  GET_SUPER_ADMIN_BY_FIREBASE_UID_PENDING,
  GET_SUPER_ADMIN_BY_FIREBASE_UID_SUCCESS,
  GET_SUPER_ADMIN_BY_FIREBASE_UID_ERROR,
  POST_SUPERADMIN_PENDING,
  POST_SUPERADMIN_SUCCESS,
  POST_SUPERADMIN_ERROR,
  PUT_SUPERADMIN_PENDING,
  PUT_SUPERADMIN_SUCCESS,
  PUT_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR,
  CLEAR_ERROR_MESSAGE
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

export const getOneSuperAdminPending = () => {
  return {
    type: GET_ONE_SUPERADMIN_PENDING
  };
};

export const getOneSuperAdminSuccess = (payload) => {
  return {
    type: GET_ONE_SUPERADMIN_SUCCESS,
    payload
  };
};

export const getOneSuperAdminError = (error) => {
  return {
    type: GET_ONE_SUPERADMIN_ERROR,
    payload: error
  };
};

export const getSuperAdminByFirebaseUidPending = () => {
  return {
    type: GET_SUPER_ADMIN_BY_FIREBASE_UID_PENDING
  };
};

export const getSuperAdminByFirebaseUidSuccess = (payload) => {
  return {
    type: GET_SUPER_ADMIN_BY_FIREBASE_UID_SUCCESS,
    payload
  };
};

export const getSuperAdminByFirebaseUidError = (error) => {
  return {
    type: GET_SUPER_ADMIN_BY_FIREBASE_UID_ERROR,
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

export const clearError = () => {
  return {
    type: CLEAR_ERROR_MESSAGE
  };
};
