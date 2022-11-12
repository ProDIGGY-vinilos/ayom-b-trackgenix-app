import { combineReducers } from 'redux';
import AdminReducer from './admins/reducer';
import timeSheetsReducer from './timeSheets/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  admins: AdminReducer,
  timeSheets: timeSheetsReducer,
  projects: projectsReducer
});

export default rootReducer;
