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

  const buy = async data => {
    data['qty'] = isQty;
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

  return {navigation, buy, isQty, setQty};
};

export default useAction;
