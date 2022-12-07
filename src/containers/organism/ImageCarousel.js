import {StyleSheet, View, Image, useWindowDimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  useAnimatedRef,
} from 'react-native-reanimated';
import {color} from '../../utils/styles';
const ImageCarousel = ({data, autoPlay}) => {
  const scrollViewRef = useAnimatedRef(null);
  const [page, setPage] = useState(0);
  const [newData] = useState([
    {key: 'spacer-left'},
    ...data,
    {key: 'spacer-right'},
  ]);
  const {width} = useWindowDimensions();
  const SIZE = width * 0.8;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);
  const pageX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  // const onScroll = e => {
  //   let pageNumber = Math.min(
  //     Math.max(Math.floor(e.nativeEvent.contentOffset.x / SIZE + 0.5) + 1, 0),
  //     data.length,
  //   );
  //   setPage(pageNumber - 1);
  // };

  useEffect(() => {
    if (autoPlay) {
      let offset = 0;
      setInterval(() => {
        if (offset === SIZE * (data.length - 1)) {
          offset = 0;
        } else {
          offset += SIZE;
        }
        scrollViewRef.current.scrollTo({x: offset, y: 0});
      }, 2500);
    }
  }, [SIZE, SPACER, autoPlay, data.length, scrollViewRef]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const styleTransform = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.88, 1, 0.88],
            );
            let pageNumber = Math.min(
              Math.max(Math.floor(x.value / SIZE + 0.5) + 1, 0),
              data.length,
            );
            pageX.value = pageNumber - 1;
            return {
              transform: [{scale}],
            };
          });
          if (!item.image) {
            return <View style={{width: SPACER}} key={index} />;
          }
          return (
            <View style={{width: SIZE, styleTransform}} key={index}>
              <Animated.View style={[stylesCust.imageContainer]}>
                <Image source={item.image} style={stylesCust.image} />
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {/* <View style={stylesCust.paginationWrapper}>
        {data.map((_, index) => {
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
      </View> */}
    </View>
  );
};

export default ImageCarousel;

const stylesCust = StyleSheet.create({
  imageContainer: {
    borderRadius: 13,
    overflow: 'hidden',
  },
  image: {
    width: 283,
    height: 114,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: color.bluep,
    marginLeft: 10,
  },
});
