import React from 'react';
import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native';
import {color, styles} from '../../utils/styles';
import Divider from './Divider';

function ButtonImage({image, onClick, style, label, labelColor}) {
  return (
    <TouchableOpacity onPress={onClick} style={stylesCust.button}>
      <View style={style ? style : stylesCust.buttonImage}>
        <Image source={image} style={stylesCust.image} />
      </View>
      {label ? (
        <>
          <Divider height={3} />
          <Text
            style={styles.p7(labelColor ? labelColor : color.bluep, 'center')}>
            {label}
          </Text>
        </>
      ) : null}
    </TouchableOpacity>
  );
}

const stylesCust = StyleSheet.create({
  button: {
    width: 55,
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonImage: {
    height: 45,
    width: 45,
    backgroundColor: color.oranget4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  image: {resizeMode: 'contain'},
});

export default ButtonImage;
