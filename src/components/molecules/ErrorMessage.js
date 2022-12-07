import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {color, styles} from '../../utils/styles';

function ErrorMessage({marginVertical, message, image}) {
  return (
    <View style={stylesCust.divImage(marginVertical)}>
      <Text
        style={[
          styles.textBase(25, color.grey, 'textSemiBold'),
          {
            paddingBottom: 5,
            textAlign: 'center',
          },
        ]}>
        Oops!
      </Text>
      <Text
        style={[
          styles.textBase(14, color.grey),
          {
            paddingBottom: 10,
            textAlign: 'center',
          },
        ]}>
        {message}
      </Text>
      {/* {image ? (
        <Image
          source={require('../../../assets/maskot_jne.png')}
          style={stylesCust.image}
        />
      ) : null} */}
    </View>
  );
}

const stylesCust = StyleSheet.create({
  divImage: marginVertical => ({
    justifyContent: 'center',
    marginVertical,
    marginHorizontal: 17,
  }),
  image: {resizeMode: 'contain', width: undefined, height: 200},
});

export default ErrorMessage;
