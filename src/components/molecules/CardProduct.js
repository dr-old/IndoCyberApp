import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import helpers from '../../utils/helpers';
import {color, styles} from '../../utils/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CardProduct = ({data}) => {
  return (
    <View style={stylesCust.cardList}>
      {data.map((item, index) => {
        return (
          <View key={index} style={stylesCust.cardItem}>
            <View style={stylesCust.cardImage}>
              <Image
                source={{
                  uri: item.image,
                }}
                // source={require('../../assets/illustration/Iphone-14.png')}
                style={stylesCust.image}
              />
            </View>
            <View style={stylesCust.cardBody}>
              <View style={stylesCust.cardTitle}>
                <Text numberOfLines={2} style={stylesCust.title}>
                  {item.productName}
                </Text>
              </View>
              {item?.discount > 0 ? (
                <>
                  <Text numberOfLines={1} style={stylesCust.price}>
                    {helpers.formatCurrency(
                      parseFloat(
                        item.price - (item.price * item.discount) / 100,
                      ),
                      'Rp. ',
                    )}
                  </Text>
                  <Text numberOfLines={1} style={stylesCust.place}>
                    {helpers.formatCurrency(item.price, 'Rp. ')}
                  </Text>
                </>
              ) : (
                <Text numberOfLines={1} style={stylesCust.price}>
                  {helpers.formatCurrency(item.price, 'Rp. ')}
                </Text>
              )}
              {/* <View style={stylesCust.rating}>
                <FontAwesome5 name="star" size={8} color={color.oranges} />
                <Text style={stylesCust.ratingText}>5.0 | Terjual 10</Text>
              </View> */}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const stylesCust = StyleSheet.create({
  cardList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardItem: [
    {
      height: 212,
      width: '45%',
      marginBottom: 30,
      backgroundColor: color.white,
      borderRadius: 20,
    },
    styles.shadowCust(),
  ],
  image: {
    resizeMode: 'cover',
    width: 150,
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardImage: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {paddingHorizontal: 16},
  cardTitle: {
    height: 30,
    marginTop: 5,
    justifyContent: 'center',
  },
  title: styles.h9(),
  price: [styles.h7(), {marginTop: 5}],
  place: [styles.h9(), {marginVertical: 5, textDecorationLine: 'ine-through'}],
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: [styles.p7(color.tgrey), {marginLeft: 5}],
});

export default CardProduct;
