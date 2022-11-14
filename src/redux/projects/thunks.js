import {
  getProjectsError,
  getProjectsSuccess,
  getProjectsPending,
  postProjectError,
  postProjectSuccess,
  postProjectPending
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
        console.log(error);
        dispatch(postProjectError(error.toString()));
      });
  };
};
