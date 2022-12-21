import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  getTasksWithDeletedPending,
  getTasksWithDeletedSuccess,
  getTasksWithDeletedError,
  getOneTaskPending,
  getOneTaskSuccess,
  getOneTaskError,
  postTaskPending,
  postTaskSuccess,
  postTaskError,
  putTaskPending,
  putTaskSuccess,
  putTaskError,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskError
} from 'redux/tasks/actions';

export const getTasks = (token) => {
  return (dispatch) => {
    dispatch(getTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      headers: {
        token
      }
    })
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

export const getTasksWithDeleted = (token) => {
  return (dispatch) => {
    dispatch(getTasksWithDeletedPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/withDeleted`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getTasksWithDeletedSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getTasksWithDeletedError(error.toString()));
      });
  };
};

export const getOneTask = (id, token) => {
  return (dispatch) => {
    dispatch(getOneTaskPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      headers: {
        token
      }
    })
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

export const postTask = (taskBody, token) => {
  return (dispatch) => {
    dispatch(postTaskPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(taskBody)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(postTaskSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(postTaskError(error.toString()));
      });
  };
};

export const putTask = (id, taskBody, token) => {
  return (dispatch) => {
    dispatch(putTaskPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(taskBody)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(putTaskSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(putTaskError(error.toString()));
      });
  };
};

export const deleteTask = (id, token) => {
  return (dispatch) => {
    dispatch(deleteTaskPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        token
      }
    })
      .then((response) => {
        if (response.status !== 204) {
          response
            .json()
            .then((data) => {
              throw new Error(data.message);
            })
            .catch((error) => {
              dispatch(deleteTaskError(error.toString()));
            });
        } else {
          dispatch(deleteTaskSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(deleteTaskError(error.toString()));
      });
  };
};
