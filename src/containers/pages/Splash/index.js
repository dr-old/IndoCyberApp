import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  Text,
  Platform,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {color, styles} from '../../../utils/styles';
import {BarHeader} from '../../../components/molecules';
import {ButtonLabel, Divider} from '../../../components/atoms';
import stylesCust from './stylesCust';
import useAction from './useAction';

const Splash = () => {
  const {slides, width, height, page, onScrollEnd} = useAction();

  const ItemNext = ({item}) => {
    return (
      <View style={stylesCust.slider(width, height)}>
        <View style={stylesCust.contentImage}>
          <Image source={item.image} style={stylesCust.image} />
        </View>
        <View style={{flex: 1}} />
        <View style={stylesCust.constentCard}>
          <Text style={styles.h3(color.tblack, 'center')}>{item.title}</Text>
          <Divider height={20} />
          <Text style={stylesCust.description}>{item.text}</Text>
          {item?.onDone ? (
            <>
              <Divider height={Platform.OS === 'ios' ? 10 : 20} />
              <ButtonLabel
                type="primary"
                solid={true}
                label="Mulai!"
                size="large"
                onClick={item.onDone}
              />
            </>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <>
      <BarHeader bgcolor={color.white7} />
      <SafeAreaView style={stylesCust.container}>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          decelerationRate="fast">
          {slides.map(item => {
            return <ItemNext key={item.key} item={item} />;
          })}
        </ScrollView>
        {page !== 2 ? (
          <View style={stylesCust.paginationWrapper}>
            {slides.map((_, index) => {
              return (
                <View
                  style={[
                    stylesCust.paginationDots,
                    {opacity: page === index ? 1 : 0.2},
                  ]}
                  key={index}
                />
              );
            })}
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default Splash;
