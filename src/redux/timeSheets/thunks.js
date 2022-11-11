import { getTimeSheetsError, getTimeSheetsSuccess, getTimeSheetsPending } from './actions';

export const getTimeSheets = () => {
  return (dispatch) => {
    dispatch(getTimeSheetsPending());
    fetch(`${process.env.REACT_APP_API_URL}/timeSheet`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        } else {
          dispatch(getTimeSheetsSuccess(data.data));
        }
      })
      .catch((error) => {
        dispatch(getTimeSheetsError(error.toString()));
      });
  };
};
