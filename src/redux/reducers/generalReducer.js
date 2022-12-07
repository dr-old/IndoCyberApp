import {types} from '../actions/types';

const initialState = {
  modalList: {
    id: '',
    status: false,
    detail: [],
  },
  formRegister: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  formLogin: {
    email: '',
    password: '',
  },
  formVerify: {
    otp: '',
  },
  formLocation: {
    location: {},
    description: '',
    placeId: '',
    latitude: '',
    longitude: '',
  },
  formSearchMaps: {
    origin: '',
    originDetail: {},
    destination: '',
    destinationDetail: {},
  },
};

// eslint-disable-next-line no-undef
export default generalReducer = (state = initialState, action) => {
  switch (action.type) {
    // REDUCER MODALLIST
    case 'SET_MODAL_LIST':
      return {
        ...state,
        modalList: {
          ...state.modalList,
          id: action.id,
          status: action.status,
          detail: action.detail,
        },
      };

    //REDUCER FORM REGISTER
    case 'SET_FORM_REGISTER':
      return {
        ...state,
        formRegister: {
          ...state.formRegister,
          [action.inputType]: action.inputValue,
        },
      };

    //REDUCER FORM REGISTER
    case 'CLEAN_FORM_REGISTER':
      return {
        ...state,
        formRegister: {
          ...state.formRegister,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
      };

    //REDUCER FORM LOGIN
    case 'SET_FORM_LOGIN':
      return {
        ...state,
        formLogin: {
          ...state.formLogin,
          [action.inputType]: action.inputValue,
        },
      };

    //REDUCER FORM LOGIN
    case 'CLEAN_FORM_LOGIN':
      return {
        ...state,
        formLogin: {
          ...state.formLogin,
          email: '',
          password: '',
        },
      };

    //REDUCER FORM VERIFY OTP
    case 'SET_FORM_VERIFY':
      return {
        ...state,
        formVerify: {
          ...state.formVerify,
          [action.inputType]: action.inputValue,
        },
      };

    //REDUCER FORM VERIFY
    case 'CLEAN_FORM_VERIFY':
      return {
        ...state,
        formVerify: {
          ...state.formVerify,
          otp: '',
        },
      };

    //REDUCER FORM LOCATION
    case 'SET_FORM_LOCATION':
      return {
        ...state,
        formLocation: {
          ...state.formLocation,
          [action.inputType]: action.inputValue,
        },
      };

    //REDUCER FORM PLACE
    case 'SET_FORM_CURRENT_PLACE':
      return {
        ...state,
        formLocation: {
          ...state.formLocation,
          description: action.description,
          placeId: action.placeId,
          latitude: action.latitude,
          longitude: action.longitude,
        },
      };

    //REDUCER FORM LOCATION
    case 'CLEAN_FORM_LOCATION':
      return {
        ...state,
        formLocation: {
          ...state.formLocation,
          location: {},
          description: '',
          placeId: '',
          latitude: '',
          longitude: '',
        },
      };

    //REDUCER FORM SEARCH MAPS
    case 'SET_FORM_SEARCHMAPS':
      return {
        ...state,
        formSearchMaps: {
          ...state.formSearchMaps,
          [action.inputType]: action.inputValue,
        },
      };

    //REDUCER FORM SEARCH MAPS
    case 'CLEAN_FORM_SEARCHMAPS':
      return {
        ...state,
        formSearchMaps: {
          ...state.formSearchMaps,
          origin: '',
          destination: '',
        },
      };

    default:
      return state;
  }
};
