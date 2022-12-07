import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useAction = () => {
  const dispatch = useDispatch();
  // const regis = useSelector(state => state.registerReducer);
  const form = useSelector(state => state.generalReducer.formVerify);
  const navigation = useNavigation();

  const onChangeText = (type, value) => {
    dispatch({type: 'SET_FORM_VERIFY', inputType: type, inputValue: value});
  };

  const verify = () => {
    console.log(form);
    navigation.replace('Home');
  };

  const verifyValidate = () => {
    if (form.otp) {
      return true;
    } else {
      return false;
    }
  };

  return {
    onChangeText,
    form,
    verify,
    verifyValidate,
    navigation,
  };
};

export default useAction;
