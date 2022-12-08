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
  const {navigation, isProduct, buy, updateQty} = useAction();

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
      <View style={stylesCust.card}>
        <View style={stylesCust.cardImage}>
          <Image source={{uri: data.image}} style={stylesCust.image} />
        </View>
        <View style={stylesCust.cardBody}>
          <View style={{height: 35, width: undefined}}>
            <Text style={styles.p4(color.tgrey)} numberOfLines={2}>
              {data.productName}
            </Text>
          </View>
          <Text style={styles.h4(color.tblack)} numberOfLines={1}>
            {helpers.formatCurrency(data.price, 'Rp. ')}
          </Text>
          <ButtonIcon
            type={stylesCust.buttonType()}
            name="plus-circle"
            size={20}
            onClick={() => console.log('plus', data)}
          />
          <View style={stylesCust.qty}>
            <ButtonIcon
              type={stylesCust.buttonType()}
              name="minus-circle"
              size={20}
              onClick={() => console.log('minus', data)}
            />
            <Text style={stylesCust.qtyText}>{data.qty}</Text>
            <ButtonIcon
              type={stylesCust.buttonType()}
              name="plus-circle"
              size={20}
              onClick={() => console.log('plus', data)}
            />
          </View>
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
      </View>
    );
  }

  return (
    <>
      <Container
        bgColor={color.white8}
        navbar={{
          type: 'fixed',
          title: 'Checkout',
          onClick: () => navigation.push('Home'),
        }}>
        {isProduct.length > 0 ? (
          <View style={stylesCust.feature}>
            <Divider height={10} />
            {isProduct.map((data, index) => {
              return !data?.productName ? null : (
                <View key={index} style={stylesCust.card}>
                  <View style={stylesCust.cardImage}>
                    <Image
                      source={{uri: data.image}}
                      style={stylesCust.image}
                    />
                  </View>
                  <View style={stylesCust.cardBody}>
                    <View style={{height: 35, width: undefined}}>
                      <Text style={styles.p4(color.tgrey)} numberOfLines={2}>
                        {data.productName}
                      </Text>
                    </View>
                    <Text style={styles.h4(color.tblack)} numberOfLines={1}>
                      {helpers.formatCurrency(data.price, 'Rp. ')}
                    </Text>
                    <View style={stylesCust.qty}>
                      <ButtonIcon
                        type={stylesCust.buttonType()}
                        name="minus-circle"
                        size={20}
                        onClick={() => updateQty('minus', data)}
                      />
                      <Text style={stylesCust.qtyText}>{data.qty}</Text>
                      <ButtonIcon
                        type={stylesCust.buttonType()}
                        name="plus-circle"
                        size={20}
                        onClick={() => updateQty('plus', data)}
                      />
                    </View>
                    <Text style={styles.h4(color.tblack)} numberOfLines={1}>
                      {helpers.formatCurrency(data.price * data.qty, 'Rp. ')}
                    </Text>
                    <Text style={styles.p4(color.tgrey)}>Sub Total</Text>
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
                </View>
              );
            })}
            <Divider height={20} />
          </View>
        ) : (
          <ErrorMessage marginVertical={50} message="Data is not found" />
        )}
      </Container>
      <View style={stylesCust.footer}>
        <ButtonLabel
          type="primary"
          solid={true}
          disabled={isProduct?.length > 0 ? false : true}
          label="Buy!"
          size="large"
          onClick={() => buy()}
        />
      </View>
    </>
  );
}

export default Checkout;
