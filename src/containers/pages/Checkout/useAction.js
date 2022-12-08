import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import database from '@react-native-firebase/database';
import helpers from '../../../utils/helpers';

const useAction = () => {
  const login = useSelector(state => state.authReducer);
  const navigation = useNavigation();
  const [isQty, setQty] = useState(1);
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
      filter.unshift(data);
    }
    if (type === 'minus') {
      data['qty'] = parseInt(data.qty - 1);
      filter = isProduct.filter(i => i.id !== data.id);
      if (data['qty'] > 0) {
        filter.unshift(data);
      }
    }
    setProduct(filter);
    await helpers.setLocalStorage(filter, `@USER_${login.email}`);
  };

  const buy = async () => {
    const oldData = await helpers.getLocalStorage(`@USER_${login.email}`);
    console.log(oldData);
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

  return {navigation, isProduct, buy, updateQty};
};

export default useAction;
