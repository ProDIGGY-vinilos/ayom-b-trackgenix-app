import { combineReducers } from 'redux';
import adminReducer from './admins/reducer';
import timeSheetsReducer from './timeSheets/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  admins: adminReducer,
  timeSheets: timeSheetsReducer,
  projects: projectsReducer
});

export default rootReducer;
