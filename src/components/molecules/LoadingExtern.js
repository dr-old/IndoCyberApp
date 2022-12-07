import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {color, styles} from '../../utils/styles';

function LoadingExtern({backgroundColor}) {
  return (
    <View style={stylesCust.pageLoading(backgroundColor || color.loading)}>
      <View style={stylesCust.pageInnerLoading}>
        <ActivityIndicator size="large" color={color.bluep} />
        <Text style={stylesCust.text}>Loading...</Text>
      </View>
    </View>
  );
}

const stylesCust = StyleSheet.create({
  pageLoading: backgroundColor => ({
    position: 'absolute',
    zIndex: 9,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor,
  }),
  pageInnerLoading: {
    position: 'relative',
    zIndex: 99,
    paddingVertical: 17,
    paddingHorizontal: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: color.white,
  },
  text: [styles.p3(), {marginTop: 10}],
});

export default LoadingExtern;
