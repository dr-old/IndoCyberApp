import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {color, styles} from '../../../utils/styles';
import {Container} from '../../organism';
import {ButtonIcon, ButtonLabel, Divider} from '../../../components/atoms';
import ErrorMessage from '../../../components/molecules/ErrorMessage';
import stylesCust from './stylesCust';
import helpers from '../../../utils/helpers';
import useAction from './useAction';

function Checkout() {
  const {navigation, buy, isQty, setQty} = useAction();

  const product = [
    {
      title: 'IPhone 14 Pro Max RAM 16GB Free Softcase',
      place: 'Jakarta Pusat',
      price: 24000000,
      image: require('../../../assets/illustration/Iphone-14.png'),
    },
    {
      title: 'Sneakers High School',
      place: 'Jakarta Selatan',
      price: 500000,
      image: require('../../../assets/illustration/Shoes.png'),
    },
    {
      title: 'Premium shallot from bogor / 70gr for every package',
      place: 'Kab. Bandung',
      price: 10000,
      image: require('../../../assets/illustration/Shallot.png'),
    },
  ];

  function CardCart({data}) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('ChatDetail', {itemData: JSON.stringify(data)})
        }
        style={stylesCust.card}>
        <View style={stylesCust.cardImage}>
          <Image source={data.image} style={stylesCust.image} />
        </View>
        <View style={stylesCust.cardBody}>
          <View style={{height: 35, width: undefined}}>
            <Text style={styles.p4(color.tgrey)} numberOfLines={2}>
              {data.title}
            </Text>
          </View>
          <Text style={styles.h4(color.tblack)} numberOfLines={1}>
            {helpers.formatCurrency(data.price, 'Rp. ')}
          </Text>
          <ButtonIcon
            outline={true}
            type="warning"
            name="shopping-cart"
            size={20}
            alignSelf="flex-end"
            onClick={() => console.log('warning')}
          />
        </View>
        {/* <View style={stylesCust.chatInfo}>
          <Text style={[styles.textBase(10, color.grey), stylesCust.infoText]}>
            {`${moment(new Date(data.date)).format('DD MMM YY')}\n${moment(
              new Date(data.date),
            ).format('HH:mm')}`}
          </Text>
          {/* <View style={stylesCust.badges}>
            <Text style={[styles.textSemiBold, stylesCust.badgesText]}>99</Text>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  }

  return (
    <>
      <Container
        bgColor={color.white8}
        navbar={{
          type: 'fixed',
          title: 'Checkout',
          onClick: () => navigation.goBack(),
        }}>
        {product.length > 0 ? (
          <View style={stylesCust.feature}>
            <Divider height={10} />
            {product.map((item, index) => {
              return !item.title ? null : <CardCart key={index} data={item} />;
            })}
            <Divider height={20} />
          </View>
        ) : (
          <ErrorMessage marginVertical={50} message="Data is not found" />
        )}
      </Container>
      <ButtonLabel
        type="primary"
        solid={true}
        label="Buy!"
        size="large"
        onClick={() => buy()}
      />
    </>
  );
}

export default Checkout;
