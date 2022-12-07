import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {color, styles} from '../../utils/styles';
import Divider from './Divider';

function ButtonIcon({
  type,
  solid,
  outline,
  onClick,
  disabled,
  name,
  size,
  style,
  label,
  labelOut,
  labelColor,
  marginVertical,
  borderRadius,
  alignSelf,
}) {
  let bgcolor = '';
  let textcolor = '';
  let brcolor = '';
  if (type === 'primary') {
    bgcolor = color.blue4;
    brcolor = color.blue4;
    textcolor = color.bluep;
  } else if (type === 'success') {
    bgcolor = color.green2;
    brcolor = color.green2;
    textcolor = color.green3;
  } else if (type === 'danger') {
    bgcolor = color.red3;
    brcolor = color.red3;
    textcolor = color.red;
  } else if (type === 'warning') {
    bgcolor = color.oranget;
    brcolor = color.oranget;
    textcolor = color.oranget;
  } else if (type === 'default') {
    bgcolor = color.white2;
    brcolor = color.white2;
    textcolor = color.grey;
  } else {
    bgcolor = type.backgroundColor;
    brcolor = type.borderColor;
    textcolor = type.color;
  }
  if (solid) {
    brcolor = textcolor;
    bgcolor = textcolor;
    textcolor = color.white;
  }
  if (outline) {
    brcolor = textcolor;
    bgcolor = color.white;
  }
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={
          style
            ? style
            : stylesCust.filterBackground(
                bgcolor,
                alignSelf,
                brcolor,
                marginVertical,
                borderRadius,
              )
        }
        onPress={onClick}>
        <FontAwesome5 name={name} size={size} color={textcolor} />
        {label ? (
          <>
            <Divider height={5} />
            <Text style={styles.h8(labelColor ? labelColor : textcolor)}>
              {label}
            </Text>
          </>
        ) : null}
      </TouchableOpacity>
      {labelOut ? (
        <>
          <Divider height={5} />
          <Text style={styles.h8(labelColor ? labelColor : textcolor)}>
            {labelOut}
          </Text>
        </>
      ) : null}
    </>
  );
}

const stylesCust = StyleSheet.create({
  filterBackground: (
    backgroundColor = color.white,
    alignSelf = 'flex-start',
    borderColor,
    marginVertical = 0,
    borderRadius = 4,
  ) => ({
    minHeight: 38,
    width: 48,
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderWidth: 1,
    borderRadius: borderRadius,
    marginVertical: marginVertical,
    justifyContent: 'center',
    alignSelf: alignSelf,
    alignItems: 'center',
  }),
});

export default ButtonIcon;
