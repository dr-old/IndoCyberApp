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
import {LoadingExtern} from '../../../components/molecules';

function History() {
  const {login, navigation, isProduct, isLoading} = useAction();

  return (
    <Container
      loading={isLoading}
      bgColor={color.white8}
      navbar={{
        type: 'fixed',
        title: 'History Transaction',
        onClick: () => navigation.push('Home'),
      }}>
      {isProduct.filter(item => item?.email === login.email).length > 0 ? (
        <View style={stylesCust.feature}>
          <Divider height={10} />
          {isProduct
            .filter(item => item?.email === login.email)
            .map((data, index) => {
              return (
                <View key={index} style={stylesCust.card}>
                  <ButtonIcon
                    type={stylesCust.buttonType(color.green)}
                    name="check"
                    size={25}
                    onClick={() => console.log('plus')}
                  />
                  <View style={stylesCust.cardBody}>
                    <Text
                      style={[
                        styles.p4(color.tgrey),
                        {textTransform: 'uppercase'},
                      ]}
                      numberOfLines={2}>
                      {data.documentCode + data.documentNumber}
                    </Text>
                    <Text style={styles.h4(color.tblack)} numberOfLines={1}>
                      {helpers.formatCurrency(
                        data?.total ? data.total : 0,
                        'Rp. ',
                      )}
                    </Text>
                    <Text style={styles.p5(color.tblack)}>Total</Text>
                  </View>
                  <Text style={[styles.p4(color.tgrey)]} numberOfLines={2}>
                    {moment(data.date).format('DD MMM YYYY HH:mm')}
                  </Text>
                </View>
              );
            })}
          <Divider height={20} />
        </View>
      ) : (
        <ErrorMessage marginVertical={50} message="Data is not found" />
      )}
    </Container>
  );
}

export default History;
