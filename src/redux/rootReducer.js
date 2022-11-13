import { combineReducers } from 'redux';
import adminReducer from './admins/reducer';
import timeSheetsReducer from './timeSheets/reducer';
import tasksReducer from './tasks/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  admins: adminReducer,
  timeSheets: timeSheetsReducer,
  projects: projectsReducer,
  tasks: tasksReducer
});

export default rootReducer;
