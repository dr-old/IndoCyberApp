import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {color, styles} from '../../utils/styles';

function ButtonLabel({
  type,
  solid,
  outline,
  onClick,
  disabled,
  label,
  alignSelf,
  size = 'small',
  full = true,
}) {
  let bgcolor = '';
  let textcolor = '';
  let brcolor = '';
  let txsize = 12;
  let txstyle = null;
  if (type === 'primary') {
    bgcolor = color.blue4;
    brcolor = color.blue4;
    textcolor = color.blue;
  } else if (type === 'success') {
    bgcolor = color.green2;
    brcolor = color.green2;
    textcolor = color.green3;
  } else if (type === 'danger') {
    bgcolor = color.red3;
    brcolor = color.red3;
    textcolor = color.red;
  } else if (type === 'warning') {
    bgcolor = color.orange2;
    brcolor = color.orange2;
    textcolor = color.orange;
  } else {
    bgcolor = color.white2;
    brcolor = color.white2;
    textcolor = color.tgrey;
  }
  if (solid) {
    brcolor = disabled ? color.tgrey2 : textcolor;
    bgcolor = disabled ? color.tgrey2 : textcolor;
    textcolor = disabled ? color.tgrey : color.white;
  }
  if (outline) {
    brcolor = disabled ? color.tgrey2 : textcolor;
    bgcolor = disabled ? color.tgrey2 : textcolor;
    textcolor = disabled ? color.tgrey : color.white;
  }
  if (size === 'normal') {
    txstyle = styles.h4(textcolor, 'center');
  }
  if (size === 'large') {
    txstyle = styles.h3(textcolor, 'center');
  }
  let width = full ? '100%' : undefined;
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={stylesCust.filterBackground(bgcolor, alignSelf, brcolor, width)}>
      <Text
        style={
          txstyle
            ? txstyle
            : styles.textBase(txsize, textcolor, 'textMedium', 'capitalize')
        }>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const stylesCust = StyleSheet.create({
  filterBackground: (
    backgroundColor = color.white,
    alignSelf = 'center',
    borderColor,
    width = undefined,
  ) => ({
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: alignSelf,
    width: width,
  }),
});

export default ButtonLabel;
