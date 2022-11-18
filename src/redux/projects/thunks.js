import {
  getProjectsError,
  getProjectsSuccess,
  getProjectsPending,
  postProjectError,
  postProjectSuccess,
  postProjectPending,
  putProjectSuccess,
  putProjectPending,
  putProjectError,
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
          dispatch(postProjectSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(postProjectError(error.toString()));
      });
  };
};

export const putProject = (id, projectBody) => {
  return (dispatch) => {
    dispatch(putProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PUT',
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
          dispatch(putProjectSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(putProjectError(error.toString()));
      });
  };
};

export const deleteProject = (id) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'aplication/json'
      }
    })
      .then((response) => {
        if (response.status !== 204) {
          throw new Error('Project cannot be deleted');
        } else {
          dispatch(deleteProjectSuccess(id));
        }
      })
      .catch((error) => {
        dispatch(deleteProjectError(error.toString()));
      });
  };
};
