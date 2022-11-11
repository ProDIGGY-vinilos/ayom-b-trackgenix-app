import { combineReducers } from 'redux';
import AdminReducer from './admins/reducer';

const rootReducer = combineReducers({
  admins: AdminReducer
});

export default rootReducer;
