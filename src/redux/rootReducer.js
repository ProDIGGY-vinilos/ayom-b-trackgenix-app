import { combineReducers } from 'redux';

import timeSheetsReducer from './timeSheets/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  projects: projectsReducer
});

export default rootReducer;
