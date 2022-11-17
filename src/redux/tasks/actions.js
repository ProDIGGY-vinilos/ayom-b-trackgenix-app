import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_ONE_TASK_PENDING,
  GET_ONE_TASK_SUCCESS,
  GET_ONE_TASK_ERROR,
  POST_TASK_PENDING,
  POST_TASK_SUCCESS,
  POST_TASK_ERROR,
  PUT_TASK_PENDING,
  PUT_TASK_SUCCESS,
  PUT_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR
} from './constant';

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

export const getOneTaskPending = () => {
  return {
    type: GET_ONE_TASK_PENDING
  };
};

export const getOneTaskSuccess = (payload) => {
  return {
    type: GET_ONE_TASK_SUCCESS,
    payload
  };
};

export const getOneTaskError = (error) => {
  return {
    type: GET_ONE_TASK_ERROR,
    payload: error
  };
};

export const postTaskPending = () => {
  return {
    type: POST_TASK_PENDING
  };
};

export const postTaskSuccess = (payload) => {
  return {
    type: POST_TASK_SUCCESS,
    payload
  };
};

export const postTaskError = (error) => {
  return {
    type: POST_TASK_ERROR,
    payload: error
  };
};

export const putTaskPending = () => {
  return {
    type: PUT_TASK_PENDING
  };
};

export const putTaskSuccess = (payload) => {
  return {
    type: PUT_TASK_SUCCESS,
    payload
  };
};

export const putTaskError = (error) => {
  return {
    type: PUT_TASK_ERROR,
    payload: error
  };
};

export const deleteTaskPending = () => {
  return {
    type: DELETE_TASK_PENDING
  };
};

export const deleteTaskSuccess = (payload) => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload
  };
};

export const deleteTaskError = (error) => {
  return {
    type: DELETE_TASK_ERROR,
    payload: error
  };
};
