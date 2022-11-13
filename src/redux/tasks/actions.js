import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  POST_TASKS_PENDING,
  POST_TASKS_SUCCESS,
  POST_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR
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

export const postTasksPending = () => {
  return {
    type: POST_TASKS_PENDING
  };
};

export const postTasksSuccess = () => {
  return {
    type: POST_TASKS_SUCCESS
  };
};

export const postTasksError = (error) => {
  return {
    type: POST_TASKS_ERROR,
    payload: error
  };
};

export const deleteTasksPending = () => {
  return {
    type: DELETE_TASKS_PENDING
  };
};

export const deleteTasksSuccess = (payload) => {
  return {
    type: DELETE_TASKS_SUCCESS,
    payload
  };
};

export const deleteTasksError = (error) => {
  return {
    type: DELETE_TASKS_ERROR,
    payload: error
  };
};
