import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  postAdminsPending,
  postAdminsSuccess,
  postAdminsError,
  putAdminsPending,
  putAdminsSuccess,
  putAdminsError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(getAdminsSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(getAdminsError(err.toString()));
      });
  };
};

export const postAdmins = (data) => {
  return (dispatch) => {
    dispatch(postAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(postAdminsSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(postAdminsError(err.toString()));
      });
  };
};

export const putAdmins = (data, id) => {
  return (dispatch) => {
    dispatch(putAdminsPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.message);
        } else {
          dispatch(putAdminsSuccess(response.data));
        }
      })
      .catch((err) => {
        dispatch(putAdminsError(err.toString()));
      });
  };
};

export const deleteAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
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
              dispatch(deleteAdminError(err.toString()));
            });
        } else {
          dispatch(deleteAdminSuccess(id));
        }
      })
      .catch((err) => {
        dispatch(deleteAdminError(err.toString()));
      });
  };
};
