import { combineReducers } from 'redux';

import timeSheetsReducer from './timeSheets/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer
});

export default rootReducer;
