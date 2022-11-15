import {
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_PENDING
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
