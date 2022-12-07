import {types} from './types';

export function fetchSearchMapsData(data) {
  return {
    type: types.GET_SEARCH_MAPS,
    payload: data,
  };
}
