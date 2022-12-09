import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const useAction = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [isProduct, setProduct] = useState([]);
  const [isProductBackup, setProductBackup] = useState([]);
  const [isSearch, setSearch] = useState([]);
  const banner = [
    {
      image: require('../../../assets/illustration/Banner.png'),
    },
    {
      image: require('../../../assets/illustration/Banner-1.png'),
    },
    {
      image: require('../../../assets/illustration/Banner-2.png'),
    },
    {
      image: require('../../../assets/illustration/Banner-3.png'),
    },
  ];

  const onSearch = event => {
    let searchText = event;
    setSearch(searchText);
    searchText = searchText.trim().toUpperCase();
    let data = isProductBackup;
    if (data?.length > 0) {
      data = data.filter(l => l.productName?.toUpperCase().match(searchText));
      setProduct(data);
    }
  };

  const getProduct = async () => {
    try {
      await database()
        .ref('indocyberapp/product')
        .orderByValue()
        .once('value')
        .then(function (snapshot) {
          if (snapshot) {
            let newData = [];
            snapshot.forEach(function (childSnapshot) {
              let data = childSnapshot.val();
              data['id'] = childSnapshot.key;
              newData.push(data);
            });
            setProduct(newData);
            setProductBackup(newData);
          }
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [setProduct, setProductBackup]);

  // useFocusEffect(() =>
  //   useCallback(() => {
  //     const unsubscribe = getProduct();

  //     return () => unsubscribe();
  //   }, []),
  // );
  const signOut = () => {
    auth().signOut();
    dispatch({type: 'CLEAN_AUTH_USER'});
  };

  return {
    onSearch,
    signOut,
    navigation,
    banner,
    isSearch,
    isLoading,
    isProduct,
  };
};

export default useAction;
