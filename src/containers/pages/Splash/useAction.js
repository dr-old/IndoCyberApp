import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useAction = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const {width, height} = Dimensions.get('window');
  const slides = [
    {
      key: 'one',
      title: 'Selamat datang',
      text: 'Halo Hamka muda selamat datang di Hamka+ tempat dimana kamu bisa cari apapun yang kamu mau',
      image: require('../../../assets/illustration/On-Board-1.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Udah siap belanja ?',
      text: 'Cari barang apa aja jadi lebih gampang',
      image: require('../../../assets/illustration/On-Board-2.png'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Atau mau berjualan ?',
      text: 'Kamu juga bisa buka toko dan mulai jualan',
      image: require('../../../assets/illustration/On-Board-3.png'),
      backgroundColor: '#22bcb5',
      onDone: () => navigation.push('Register'),
    },
  ];

  const onScrollEnd = e => {
    let pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.x / width + 0.5) + 1, 0),
      slides.length,
    );
    setPage(pageNumber - 1);
  };

  return {slides, width, height, page, onScrollEnd};
};

export default useAction;
