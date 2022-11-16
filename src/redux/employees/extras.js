import { emptyError } from './actions';

export const setEmptyError = () => {
  return (dispatch) => {
    dispatch(emptyError());
  };
};
