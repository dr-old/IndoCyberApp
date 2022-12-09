import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
import helpers from '../../../utils/helpers';
import moment from 'moment';

const useAction = () => {
  const login = useSelector(state => state.authReducer);
  const navigation = useNavigation();
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

  function onPostLike(postId) {
    database()
      .ref(`indocyberapp/transaction/${postId}`)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
      });
  }

  const confirm = () => {
    console.log(isProduct);
    setLoading(true);
    const newReference = database().ref('indocyberapp/transaction').push();
    const newRefDetail = database()
      .ref('indocyberapp/transactionDetail')
      .push();
    const postId = newReference.key;
    const id = moment().format('YYYYMMDD') + helpers.getSequence();
    const date = moment().format('YYYY-MM-DD HH:mm');
    // const str = '1';
    // str.padStart(4, '0'),

    newReference
      .set({
        date: date,
        documentCode: 'TRX',
        documentNumber: id,
        email: login.email,
        total: helpers.sumArrayNew(isProduct, 'subtotal'),
      })
      .then(() => {
        // Promise.all(
        isProduct.forEach(item => {
          database()
            .ref('indocyberapp/transactionDetail')
            .push()
            .set({
              currency: item.currency,
              documentCode: 'TRX',
              documentNumber: id,
              price: item.price,
              productCode: item.productCode,
              quantity: item.qty,
              subtotal: item.subtotal,
              unit: item.unit,
            })
            .then(val => {
              console.log(val);
              return true;
            })
            .catch(error => {
              console.log(error);
              return false;
            });
        });
        setLoading(false);
        setProduct([]);
        helpers.removeLocalStorage(`@USER_${login.email}`);
        // )
        //   .then(values => {
        //     console.log(values);
        //     setLoading(false);
        //     ToastAndroid.show('Transaction is created!', ToastAndroid.BOTTOM);
        //   })
        //   .catch(error => {
        //     console.log(error);
        //     setLoading(false);
        //     ToastAndroid.show('Transaction is Invalid!', ToastAndroid.BOTTOM);
        //   });
      })
      .catch(error => {
        ToastAndroid.show('Transaction is invalid!', ToastAndroid.BOTTOM);
        console.log('error', error);
        setLoading(false);
      });
  };

  return {navigation, isProduct, isLoading, confirm, updateQty};
};

export default useAction;
