import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import helpers from '../../../utils/helpers';

const useAction = () => {
  const dispatch = useDispatch();
  // const regis = useSelector(state => state.registerReducer);
  const form = useSelector(state => state.generalReducer.formLogin);
  const navigation = useNavigation();
  const [isToogle, setToogle] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const onChangeText = (type, value) => {
    dispatch({type: 'SET_FORM_LOGIN', inputType: type, inputValue: value});
  };

  const signIn = () => {
    console.log(form);
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(async () => {
        setLoading(false);
        helpers.successMessage('User account sign in is success!');
        dispatch({type: 'CLEAN_FORM_LOGIN'});
        const user = await auth().currentUser.getIdTokenResult();

        if (user?.token) {
          dispatch({
            type: 'SET_AUTH_USER',
            firstName: 'Danni',
            lastName: 'Ramdan',
            email: user.email,
            token: user.token,
          });
        }
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          helpers.errorMessage('That user account is not found!');
        }

        if (error.code === 'auth/invalid-email') {
          helpers.errorMessage('That email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          helpers.errorMessage('That password is invalid!');
        }

        console.log(error.message);
        setLoading(false);
      });
  };

  const signInValidate = () => {
    if (form.email && form.password) {
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
    signIn,
    signInValidate,
    navigation,
    isLoading,
  };
};

export default useAction;
