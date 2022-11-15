import { getSuperAdminsError, getSuperAdminsSuccess, getSuperAdminsPending } from './actions';

const getSuperAdmins = () => {
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

export default getSuperAdmins;
