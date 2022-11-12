import { combineReducers } from 'redux';

import timeSheetsReducer from './timeSheets/reducer';
import superAdminsReducer from './superAdmins/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  superAdmins: superAdminsReducer
});

export default rootReducer;
