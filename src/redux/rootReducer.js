import { combineReducers } from 'redux';

import timeSheetsReducer from './timeSheets/reducer';
import ProjectsReducer from './projects/reducer';

const rootReducer = combineReducers({
  timeSheets: timeSheetsReducer,
  Projects: ProjectsReducer
});

export default rootReducer;
