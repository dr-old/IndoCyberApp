import {spawn} from 'redux-saga/effects';
import mapsSaga from './mapsSaga';

export default function* rootSaga() {
  yield spawn(mapsSaga);
}
