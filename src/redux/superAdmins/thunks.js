import {
  getSuperAdminError,
  getSuperAdminSuccess,
  getSuperAdminPending,
  postSuperAdminPending,
  postSuperAdminSuccess,
  postSuperAdminError,
  putSuperAdminPending,
  putSuperAdminSuccess,
  putSuperAdminError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError
} from './actions';

export const getSuperAdmin = () => {
  return (dispatch) => {
    dispatch(getSuperAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/superAdmins`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getSuperAdminSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getSuperAdminError(error.toString()));
      });
  };
};

export const postSuperAdmin = (url, superAdmin) => {
  return (dispatch) => {
    dispatch(postSuperAdminPending());
    fetch(url, {
      method: 'POST',
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
          dispatch(postSuperAdminSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(postSuperAdminError(error.toString()));
      });
  };
};

export const putSuperAdmin = (url, superAdmin) => {
  return (dispatch) => {
    dispatch(putSuperAdminPending());
    fetch(url, {
      method: 'PUT',
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
          dispatch(putSuperAdminSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(putSuperAdminError(error.toString()));
      });
  };
};

export const deleteSuperAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        if (response.status !== 204) {
          response
            .json()
            .then((data) => {
              throw new Error(data.message);
            })
            .catch((error) => {
              dispatch(deleteSuperAdminError(error.toString()));
            });
        } else {
          dispatch(deleteSuperAdminSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(deleteSuperAdminError(error.toString()));
      });
  };
};
