import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getAdminsWithDeletedPending,
  getAdminsWithDeletedSuccess,
  getAdminsWithDeletedError,
  getOneAdminPending,
  getOneAdminSuccess,
  getOneAdminError,
  getAdminByFirebaseUidPending,
  getAdminByFirebaseUidSuccess,
  getAdminByFirebaseUidError,
  postAdminPending,
  postAdminSuccess,
  postAdminError,
  putAdminPending,
  putAdminSuccess,
  putAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError
} from 'redux/admins/actions';

export const getAdmins = (token) => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getAdminsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};

export const getAdminsWithDeleted = (token) => {
  return (dispatch) => {
    dispatch(getAdminsWithDeletedPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/withDeleted`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getAdminsWithDeletedSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getAdminsWithDeletedError(error.toString()));
      });
  };
};

export const getOneAdmin = (id, token) => {
  return (dispatch) => {
    dispatch(getOneAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getOneAdminSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getOneAdminError(error.toString()));
      });
  };
};

export const getAdminByFirebaseUid = (firebaseUid, token) => {
  return (dispatch) => {
    dispatch(getAdminByFirebaseUidPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/firebase/${firebaseUid}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getAdminByFirebaseUidSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getAdminByFirebaseUidError(error.toString()));
      });
  };
};

export const postAdmin = (data, token) => {
  return (dispatch) => {
    dispatch(postAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        token
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(postAdminSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(postAdminError(error.toString()));
      });
  };
};

export const putAdmin = (id, data, token) => {
  return (dispatch) => {
    dispatch(putAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        token
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(putAdminSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(putAdminError(error.toString()));
      });
  };
};

export const deleteAdmin = (id, token) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        token
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
              dispatch(deleteAdminError(error.toString()));
            });
        } else {
          dispatch(deleteAdminSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(deleteAdminError(error.toString()));
      });
  };
};
