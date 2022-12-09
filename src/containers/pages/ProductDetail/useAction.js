import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import helpers from '../../../utils/helpers';

const useAction = () => {
  const login = useSelector(state => state.authReducer);
  const navigation = useNavigation();
  const [isQty, setQty] = useState(1);

  const buy = async data => {
    data['qty'] = isQty;
    const oldData = await helpers.getLocalStorage(`@USER_${login.email}`);
    if (JSON.parse(oldData)?.length > 0) {
      let parse = JSON.parse(oldData);
      let oldFilter = parse.filter(i => i.id !== data.id);
      if (parse?.length > 0) {
        let oldQty = parse.find(i => i.id === data.id);
        if (oldQty?.qty) {
          data['qty'] = parseInt(data.qty + oldQty.qty);
        }
        let price =
          data?.discount > 0
            ? data.price - (data.price * data.discount) / 100
            : data.price;
        data['subtotal'] = parseInt(data.qty * price);
      }
      let newData = [...oldFilter, data];
      helpers.setLocalStorage(newData, `@USER_${login.email}`);
    } else {
      let price =
        data?.discount > 0
          ? data.price - (data.price * data.discount) / 100
          : data.price;
      data['subtotal'] = parseInt(data.qty * price);
      console.log(2, data);
      helpers.setLocalStorage([data], `@USER_${login.email}`);
    }
    navigation.push('Checkout');
  };

  return {navigation, buy, isQty, setQty};
};

export default useAction;
