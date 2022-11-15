import { emptyErrorMessage } from './actions';

export const setEmptyErrorMessage = () => {
  return (dispatch) => {
    dispatch(emptyErrorMessage());
  };
};
