import React from 'react';
import {View} from 'react-native';

function Divider({height, width, bgColor, mTop, mBot, mLeft, mRight}) {
  return (
    <View
      style={{
        marginTop: mTop,
        marginBottom: mBot,
        marginLeft: mLeft,
        marginRight: mRight,
        height,
        width: width || '100%',
        backgroundColor: bgColor || 'transparent',
      }}
    />
  );
}

export default Divider;
