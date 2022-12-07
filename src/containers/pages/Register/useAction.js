import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import helpers from '../../../utils/helpers';

const useAction = () => {
  const dispatch = useDispatch();
  // const regis = useSelector(state => state.registerReducer);
  const form = useSelector(state => state.generalReducer.formRegister);
  const navigation = useNavigation();
  const [isToogle, setToogle] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const onChangeText = (type, value) => {
    dispatch({type: 'SET_FORM_REGISTER', inputType: type, inputValue: value});
  };

  const signUp = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(() => {
        setLoading(false);
        helpers.successMessage('User account created & signed in!');
        dispatch({type: 'CLEAN_FORM_REGISTER'});
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          helpers.errorMessage('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          helpers.errorMessage('That email address is invalid!');
        }
        setLoading(false);
      });
  };

  const signUpValidate = () => {
    if (form.firstName && form.lastName && form.email && form.password) {
      return true;
    } else {
      return false;
    }
  };

  return {
    isToogle,
    setToogle,
    onChangeText,
    form,
    signUp,
    signUpValidate,
    navigation,
    isLoading,
  };
};

export default useAction;
