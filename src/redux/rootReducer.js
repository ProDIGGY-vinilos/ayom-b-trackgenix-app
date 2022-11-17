import { combineReducers } from 'redux';
import adminReducer from './admins/reducer';
import timeSheetsReducer from './timeSheets/reducer';
import tasksReducer from './tasks/reducer';
import superAdminsReducer from './superAdmins/reducer';
import employeesReducer from './employees/reducer';
import projectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  superAdmins: superAdminsReducer,
  employees: employeesReducer,
  admins: adminReducer,
  projects: projectsReducer,
  tasks: tasksReducer
});

export default rootReducer;
