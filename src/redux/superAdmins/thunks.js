import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  getOneSuperAdminPending,
  getOneSuperAdminSuccess,
  getOneSuperAdminError,
  postSuperAdminPending,
  postSuperAdminSuccess,
  postSuperAdminError,
  putSuperAdminPending,
  putSuperAdminSuccess,
  putSuperAdminError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError
} from 'redux/superAdmins/actions';

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

export const getSuperAdminsById = (id) => {
  return (dispatch) => {
    dispatch(getOneSuperAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getOneSuperAdminSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getOneSuperAdminError(error.toString()));
      });
  };
};

export const postSuperAdmin = (superAdminId, superAdmin) => {
  return (dispatch) => {
    dispatch(postSuperAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/superAdmins`, {
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

export const putSuperAdmin = (superAdminId, superAdmin) => {
  return (dispatch) => {
    dispatch(putSuperAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/superAdmins/${superAdminId}`, {
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
