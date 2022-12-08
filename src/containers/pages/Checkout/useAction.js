import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import database from '@react-native-firebase/database';
import helpers from '../../../utils/helpers';
import moment from 'moment';

const useAction = () => {
  const login = useSelector(state => state.authReducer);
  const navigation = useNavigation();
  const [isQty, setQty] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isProduct, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  });

  const getProduct = async () => {
    const oldData = await helpers.getLocalStorage(`@USER_${login.email}`);
    if (oldData) {
      setProduct(JSON.parse(oldData));
    } else {
      setProduct([]);
    }
  };

  const updateQty = async (type, data) => {
    console.log(type, data);
    let filter = [];
    if (type === 'plus') {
      data['qty'] = parseInt(data.qty + 1);
      filter = isProduct.filter(i => i.id !== data.id);
      let price =
        data?.discount > 0
          ? data.price - (data.price * data.discount) / 100
          : data.price;
      data['subtotal'] = parseInt(data.qty * price);
      filter.unshift(data);
    }
    if (type === 'minus') {
      data['qty'] = parseInt(data.qty - 1);
      filter = isProduct.filter(i => i.id !== data.id);
      let price =
        data?.discount > 0
          ? data.price - (data.price * data.discount) / 100
          : data.price;
      data['subtotal'] = parseInt(data.qty * price);
      if (data['qty'] > 0) {
        filter.unshift(data);
      }
    }
    setProduct(filter);
    await helpers.setLocalStorage(filter, `@USER_${login.email}`);
  };

  const confirm = () => {
    console.log(isProduct);
    const newReference = database().ref('/transaction').push();
    const postId = newReference.key;
    newReference
      .set({
        date: moment().format('YYYY-MM-DD HH:mm'),
        documentCode: 'TRX',
        documentNumber: 'TRX',
        email: login.email,
        total: '',
      })
      .then(() => {
        setLoading(false);
        ToastAndroid.show('User account created!', ToastAndroid.BOTTOM);
      })
      .catch(error => {
        ToastAndroid.show('Sign up is invalid!', ToastAndroid.BOTTOM);
        console.log('error', error);
        setLoading(false);
      });
    // if (oldData) {
    //   let parse = JSON.parse(oldData);
    //   let oldFilter = parse.filter(i => i.id !== data.id);
    //   if (parse?.length > 0) {
    //     let oldQty = parse.find(i => i.id === data.id);
    //     data['qty'] = parseInt(data['qty'] + oldQty.qty);
    //   }
    //   let newData = [...oldFilter, data];
    //   helpers.setLocalStorage(newData, `@USER_${login.email}`);
    // } else {
    //   helpers.setLocalStorage([data], `@USER_${login.email}`);
    // }
  };

  return {navigation, isProduct, isLoading, confirm, updateQty};
};

export default useAction;
