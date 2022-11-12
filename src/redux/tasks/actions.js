import { GET_TASKS_PENDING, GET_TASKS_SUCCESS, GET_TASKS_ERROR } from './constant';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (payload) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload
  };
};

export const getTasksError = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error
  };
};
