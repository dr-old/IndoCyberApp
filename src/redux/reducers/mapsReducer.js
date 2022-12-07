import {types} from '../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {},
};

// eslint-disable-next-line no-undef
export default mapsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    // REDUCER SEARCH MAPS
    case types.GET_SEARCH_MAPS:
      return {
        ...state,
        data: {},
        error: {},
        loading: true,
      };

    case types.GET_SEARCH_MAPS_SUCCESS:
      return {
        ...state,
        data: payload,
        error: {},
        loading: false,
      };

    case types.GET_SEARCH_MAPS_FAILURE:
      return {
        ...state,
        data: {},
        error: payload,
        loading: false,
      };

    case types.GET_SEARCH_MAPS_RESET:
      return {
        ...state,
        data: {},
        error: {},
        loading: false,
      };

    default:
      return state;
  }
};
