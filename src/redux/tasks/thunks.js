import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  postTasksPending,
  postTasksSuccess,
  postTasksError,
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
      .then((response) => {
        if (response.status !== 201) {
          response
            .json()
            .then((data) => {
              throw new Error(data.message);
            })
            .catch((error) => {
              dispatch(postTasksError(error.toString()));
            });
        } else {
          dispatch(postTasksSuccess());
        }
      })
      .catch((error) => {
        dispatch(postTasksError(error.toString()));
      });
  };
};

export const deleteTask = (id, taskList) => {
  return (dispatch) => {
    dispatch(deleteTasksPending());
    fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        console.log(response.status);
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
          return dispatch(deleteTasksSuccess(taskList));
        }
      })
      .catch((error) => {
        dispatch(deleteTasksError(error.toString()));
      });
  };
};
