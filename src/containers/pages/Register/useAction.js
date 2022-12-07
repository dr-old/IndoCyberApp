import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useAction = () => {
  const dispatch = useDispatch();
  // const regis = useSelector(state => state.registerReducer);
  const form = useSelector(state => state.generalReducer.formRegister);
  const navigation = useNavigation();
  const [isToogle, setToogle] = useState(true);

  const onChangeText = (type, value) => {
    dispatch({type: 'SET_FORM_REGISTER', inputType: type, inputValue: value});
  };

  const signUp = () => {
    console.log(form);
    navigation.push('VerifyUser');
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
  };
};

export default useAction;
