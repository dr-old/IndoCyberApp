import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import helpers from '../../utils/helpers';
import {color, styles} from '../../utils/styles';
import {Divider} from '../atoms';

const ChatBubble = ({id, data}) => {
  return (
    <View
      style={id === data.id ? stylesCust.bubbleRight : stylesCust.bubbleLeft}>
      <Text
        style={
          id === data.id ? styles.textBase(13, color.white) : styles.textBase()
        }>
        {data.body}
      </Text>
      <Divider height={10} />
      <Text
        style={[
          styles.textBase(10, color.grey),
          id === data.id ? {alignSelf: 'flex-end'} : {},
        ]}>
        {helpers.dateTimeFormatName(new Date(data.date))}
      </Text>
      <View
        style={id === data.id ? stylesCust.rightArrow : stylesCust.leftArrow}
      />
      <View
        style={
          id === data.id
            ? stylesCust.rightArrowOverlap
            : stylesCust.leftArrowOverlap
        }
      />
    </View>
  );
};

const stylesCust = StyleSheet.create({
  bubbleLeft: {
    backgroundColor: color.blue3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: '10%',
    marginTop: 20,
    marginLeft: '5%',
    alignSelf: 'flex-start',
    borderBottomRightRadius: 13,
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
  },
  leftArrow: {
    position: 'absolute',
    backgroundColor: color.blue3,
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomRightRadius: 10,
    left: -10,
  },
  leftArrowOverlap: {
    position: 'absolute',
    backgroundColor: color.white,
    width: 20,
    height: 35,
    bottom: 0,
    borderBottomRightRadius: 18,
    left: -20,
  },
  bubbleRight: {
    backgroundColor: color.blue6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: '10%',
    marginTop: 20,
    marginRight: '5%',
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 13,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  rightArrow: {
    position: 'absolute',
    backgroundColor: color.blue6,
    width: 20,
    height: 25,
    bottom: 0,
    borderBottomLeftRadius: 10,
    right: -10,
  },
  rightArrowOverlap: {
    position: 'absolute',
    backgroundColor: color.white2,
    width: 20,
    height: 35,
    bottom: 0,
    borderBottomLeftRadius: 18,
    right: -20,
  },
});

export default ChatBubble;
