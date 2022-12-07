import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {ToastAndroid} from 'react-native';

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

  const pushUser = () => {
    const newReference = database().ref('indocyberapp/user').push();
    console.log('Auto generated key: ', newReference.key);
    newReference
      .set({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
      .then(() => {
        setLoading(false);
        ToastAndroid.show('User account created!', ToastAndroid.BOTTOM);
        dispatch({type: 'CLEAN_FORM_REGISTER'});
      })
      .catch(error => {
        ToastAndroid.show('Sign up is invalid!', ToastAndroid.BOTTOM);
        console.log('error', error);
        setLoading(false);
      });
  };

  const pushProduct = () => {
    setLoading(true);
    const newReference = database().ref('indocyberapp/product').push();
    newReference
      .set({
        productCode: 'SKUGIVKNG',
        productName: 'Giv Kuning',
        price: 10000,
        discount: 0,
        currency: 'IDR',
        dimension: '10 cm x 7 cm',
        unit: 'PCS',
      })
      .then(() => {
        setLoading(false);
        ToastAndroid.show('Product is created!', ToastAndroid.BOTTOM);
      })
      .catch(error => {
        ToastAndroid.show('Product is invalid!', ToastAndroid.BOTTOM);
        console.log('error', error);
        setLoading(false);
      });
  };

  const signUp = () => {
    // pushProduct();
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(() => {
        pushUser();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.BOTTOM,
          );
        }

        if (error.code === 'auth/invalid-email') {
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.BOTTOM,
          );
        }

        if (error.code === 'auth/weak-password') {
          ToastAndroid.show('That password is weak!', ToastAndroid.BOTTOM);
        }
        console.log(error.message);
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
