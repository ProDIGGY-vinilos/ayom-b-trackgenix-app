import { combineReducers } from 'redux';

import timeSheetsReducer from './timeSheets/reducer';
import employeesReducer from './employees/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  employees: employeesReducer
});

export default rootReducer;
