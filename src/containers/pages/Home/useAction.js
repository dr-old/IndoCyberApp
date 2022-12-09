import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import database from '@react-native-firebase/database';
import {auth} from '@react-native-firebase/auth';

const useAction = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const [isProduct, setProduct] = useState([]);

  const category = [
    {
      name: `Pakaian\nWanita`,
      image: require('../../../assets/icon/Dress.png'),
      onClick: () => console.log(),
    },
    {
      name: `Pakaian\nPria`,
      image: require('../../../assets/icon/T-shirt.png'),
      onClick: () => console.log(),
    },
    {
      name: 'Skincare',
      image: require('../../../assets/icon/Skincare.png'),
      onClick: () => console.log(),
    },
    {
      name: 'Sepatu',
      image: require('../../../assets/icon/Shoes.png'),
      onClick: () => console.log('MapsLocation'),
    },
    {
      name: 'Elektronik',
      image: require('../../../assets/icon/Phone-Desktop.png'),
      onClick: () => navigation.push('Authenticate'),
    },
    {
      name: 'Lainnya',
      image: require('../../../assets/icon/More.png'),
      onClick: () => navigation.push('MapsSearch'),
    },
  ];
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
          }
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getProduct();
  });

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
    category,
    navigation,
    banner,
    isLoading,
    isProduct,
    signOut,
  };
};

export default useAction;
