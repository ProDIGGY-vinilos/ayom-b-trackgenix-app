import {
  getProjectsError,
  getProjectsSuccess,
  getProjectsPending,
  getOneProjectError,
  getOneProjectSuccess,
  getOneProjectPending,
  getProjectsByEmployeeError,
  getProjectsByEmployeeSuccess,
  getProjectsByEmployeePending,
  postProjectError,
  postProjectSuccess,
  postProjectPending,
  putProjectSuccess,
  putProjectPending,
  putProjectError,
  deleteProjectError,
  deleteProjectSuccess,
  deleteProjectPending
} from 'redux/projects/actions';

export const getProjects = (token) => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      headers: {
        token
      }
    })
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

export const getOneProject = (id, token) => {
  return (dispatch) => {
    dispatch(getOneProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getOneProjectSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getOneProjectError(error.toString()));
      });
  };
};

export const getProjectsByEmployee = (id, token) => {
  return (dispatch) => {
    dispatch(getProjectsByEmployeePending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/employee/${id}`, {
      headers: {
        token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getProjectsByEmployeeSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getProjectsByEmployeeError(error.toString()));
      });
  };
};

export const postProject = (projectBody, token) => {
  return (dispatch) => {
    dispatch(postProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        token
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

export const putProject = (id, projectBody, token) => {
  return (dispatch) => {
    dispatch(putProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        token
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

export const deleteProject = (id, token) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'aplication/json',
        token
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
