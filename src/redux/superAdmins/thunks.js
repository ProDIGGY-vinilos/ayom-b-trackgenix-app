import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  putSuperAdminsPending,
  putSuperAdminsSuccess,
  putSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError
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

export const postSuperAdmins = (url, superAdmin) => {
  return (dispatch) => {
    dispatch(postSuperAdminsPending());
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
          dispatch(postSuperAdminsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(postSuperAdminsError(error.toString()));
      });
  };
};

export const putSuperAdmins = (url, superAdmin) => {
  return (dispatch) => {
    dispatch(putSuperAdminsPending());
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
          dispatch(putSuperAdminsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(putSuperAdminsError(error.toString()));
      });
  };
};

export const deleteSuperAdmins = (id) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminsPending());
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
            .catch((err) => {
              dispatch(deleteSuperAdminsError(err.toString()));
            });
        } else {
          dispatch(deleteSuperAdminsSuccess(id));
        }
      })
      .catch((err) => {
        dispatch(deleteSuperAdminsError(err.toString()));
      });
  };
};
