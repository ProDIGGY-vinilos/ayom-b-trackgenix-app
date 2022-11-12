import { combineReducers } from 'redux';

import timeSheetsReducer from './timeSheets/reducer';
import superAdminsReducer from './superAdmins/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  superAdmins: superAdminsReducer,
  projects: projectsReducer
});

export default rootReducer;
