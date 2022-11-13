import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  postAdminsPending,
  postAdminsSuccess,
  postAdminsError
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
    dispatch(postAdminsPending);
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
