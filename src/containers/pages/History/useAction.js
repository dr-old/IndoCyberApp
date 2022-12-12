import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

const useAction = () => {
  const login = useSelector(state => state.authReducer);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [isProduct, setProduct] = useState([]);

  const getTransaction = async () => {
    try {
      await database()
        .ref('indocyberapp/transaction')
        .orderByValue()
        .once('value')
        .then(function (snapshot) {
          let newData = [];
          snapshot.forEach(function (childSnapshot) {
            let data = childSnapshot.val();
            data['id'] = childSnapshot.key;
            newData.push(data);
          });
          setProduct(newData);
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getTransaction();
  });

  return {login, navigation, isProduct, isLoading};
};

export default useAction;
