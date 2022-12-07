import {types} from '../actions/types';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  token: '',
};

// eslint-disable-next-line no-undef
export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        [action.type]: action.value,
      };
    case 'SET_AUTH_USER':
      return {
        ...state,
        email: action.email,
        firstName: action.firstName,
        lastName: action.lastName,
        token: action.token,
      };
    case 'CLEAN_AUTH_USER':
      return {
        ...state,
        email: '',
        firstName: '',
        lastName: '',
        token: '',
      };

    default:
      return state;
  }
};
