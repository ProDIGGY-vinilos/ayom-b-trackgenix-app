import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  getOneTaskPending,
  getOneTaskSuccess,
  getOneTaskError,
  postTasksPending,
  postTasksSuccess,
  postTasksError,
  putTasksPending,
  putTasksSuccess,
  putTasksError,
  deleteTasksPending,
  deleteTasksSuccess,
  deleteTasksError
} from './actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getTasksSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getTasksError(error.toString()));
      });
  };
};

export const getOneTask = (id) => {
  return (dispatch) => {
    dispatch(getOneTaskPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getOneTaskSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getOneTaskError(error.toString()));
      });
  };
};

export const postTask = (taskBody) => {
  return (dispatch) => {
    dispatch(postTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskBody)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(postTasksSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(postTasksError(error.toString()));
      });
  };
};

export const putTask = (id, taskBody) => {
  return (dispatch) => {
    dispatch(putTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskBody)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(putTasksSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(putTasksError(error.toString()));
      });
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(deleteTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status !== 204) {
          response
            .json()
            .then((data) => {
              throw new Error(data.message);
            })
            .catch((error) => {
              dispatch(deleteTasksError(error.toString()));
            });
        } else {
          dispatch(deleteTasksSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(deleteTasksError(error.toString()));
      });
  };
};
