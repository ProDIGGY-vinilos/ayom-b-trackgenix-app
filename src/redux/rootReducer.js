import { combineReducers } from 'redux';
import adminReducer from './admins/reducer';
import timeSheetsReducer from './timeSheets/reducer';
import superAdminsReducer from './superAdmins/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  admins: adminReducer,
  timeSheets: timeSheetsReducer,
  superAdmins: superAdminsReducer,
  projects: projectsReducer
});

export default rootReducer;
