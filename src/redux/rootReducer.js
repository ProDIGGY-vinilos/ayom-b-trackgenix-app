import { combineReducers } from 'redux';
import AdminReducer from './admins/reducer';
import timeSheetsReducer from './timeSheets/reducer';

const rootReducer = combineReducers({
  admins: AdminReducer,
  timeSheets: timeSheetsReducer
});

export default rootReducer;
