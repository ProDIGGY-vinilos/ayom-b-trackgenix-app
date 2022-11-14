import {
  getProjectsError,
  getProjectsSuccess,
  getProjectsPending,
  postProjectError,
  postProjectSuccess,
  postProjectPending,
  deleteProjectError,
  deleteProjectSuccess,
  deleteProjectPending
} from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getProjectsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

export const postProject = (projectBody) => {
  return (dispatch) => {
    dispatch(postProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(projectBody)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(postProjectSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(postProjectError(error.toString()));
      });
  };
};

export const deleteProject = (id, projectsList) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
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
              dispatch(deleteProjectError(error.toString()));
            });
        } else {
          return dispatch(deleteProjectSuccess(projectsList));
        }
      })
      .catch((error) => {
        dispatch(deleteProjectError(error.toString()));
      });
  };
};
