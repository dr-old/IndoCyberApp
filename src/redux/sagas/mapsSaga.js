import {put, call, takeLatest} from 'redux-saga/effects';
import {types} from '../actions/types';
import {getApiMaps} from '../apis/baseApi';

function* fetchSearchMaps({payload}) {
  const response = yield call(getApiMaps, payload);
  if (response?.status === 'OK' && response?.results?.length > 0) {
    yield put({
      type: types.GET_SEARCH_MAPS_SUCCESS,
      payload: {id: payload.id, data: response.results},
    });
  } else {
    yield put({type: types.GET_SEARCH_MAPS_FAILURE, payload: response});
  }
}

export default function* mapsSaga() {
  yield takeLatest(types.GET_SEARCH_MAPS, fetchSearchMaps);
}
