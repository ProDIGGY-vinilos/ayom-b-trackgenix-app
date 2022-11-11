import { getEmployeesPending, getEmployeesFulfilled, getEmployeesRejected } from './actions';

const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeesFulfilled(response.data));
      })
      .catch((error) => {
        dispatch(getEmployeesRejected(error.toString()));
      });
  };
};

export default getEmployees;
