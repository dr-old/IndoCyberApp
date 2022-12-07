import {combineReducers} from 'redux';
import authReducer from './authReducer';
import generalReducer from './generalReducer';
import mapsReducer from './mapsReducer';
import productReducer from './productReducer';

export default combineReducers({
  generalReducer,
  mapsReducer,
  authReducer,
  productReducer,
});
