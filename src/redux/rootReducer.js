import { combineReducers } from 'redux';
import adminReducer from 'redux/admins/reducer';
import timeSheetsReducer from 'redux/timeSheets/reducer';
import tasksReducer from 'redux/tasks/reducer';
import superAdminsReducer from 'redux/superAdmins/reducer';
import employeesReducer from 'redux/employees/reducer';
import projectsReducer from 'redux/projects/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  superAdmins: superAdminsReducer,
  employees: employeesReducer,
  admins: adminReducer,
  projects: projectsReducer,
  tasks: tasksReducer
});

export default rootReducer;
