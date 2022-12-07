import {combineReducers} from 'redux';
import authReducer from './authReducer';
import generalReducer from './generalReducer';
import mapsReducer from './mapsReducer';

export default combineReducers({
  generalReducer,
  mapsReducer,
  authReducer,
});
