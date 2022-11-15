import { getAdminsPending, getAdminsSuccess, getAdminsError } from './actions';

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
