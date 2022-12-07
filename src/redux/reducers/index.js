import {combineReducers} from 'redux';
import generalReducer from './generalReducer';
import mapsReducer from './mapsReducer';

export default combineReducers({
  generalReducer,
  mapsReducer,
});
