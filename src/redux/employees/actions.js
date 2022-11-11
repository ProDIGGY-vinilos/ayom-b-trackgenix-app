import { GET_EMPLOYEES_PENDING, GET_EMPLOYEES_FULFILLED, GET_EMPLOYEES_REJECTED } from './constant';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesFulfilled = (payload) => {
  return {
    type: GET_EMPLOYEES_FULFILLED,
    payload
  };
};

export const getEmployeesRejected = (error) => {
  return {
    type: GET_EMPLOYEES_REJECTED,
    payload: error
  };
};
