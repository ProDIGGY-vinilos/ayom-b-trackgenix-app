import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/superAdmins`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getSuperAdminsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.toString()));
      });
  };
};

export const postSuperAdmins = (url, superAdmin, method) => {
  return (dispatch) => {
    dispatch(postSuperAdminsPending());
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(superAdmin)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(postSuperAdminsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(postSuperAdminsError(error.toString()));
      });
  };
};
