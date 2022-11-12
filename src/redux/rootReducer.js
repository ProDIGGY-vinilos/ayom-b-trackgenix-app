import { combineReducers } from 'redux';

import timeSheetsReducer from './timeSheets/reducer';
import tasksReducer from './tasks/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  tasks: tasksReducer
});

export default rootReducer;
