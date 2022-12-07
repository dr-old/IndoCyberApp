import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {color, styles} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  content: {
    backgroundColor: color.white8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  constentCard: {
    backgroundColor: color.white,
    height: Platform.OS === 'ios' ? 326 : 266,
    paddingTop: 43,
    paddingHorizontal: 30,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  contentImage: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
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
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {flex: 1, backgroundColor: color.white},
  slider: (width, height) => ({
    width,
    height,
    paddingTop: 100,
    backgroundColor: color.white7,
  }),
  description: [styles.p4(color.tgrey3, 'center'), {paddingHorizontal: 33}],
  image: {resizeMode: 'contain', height: 221, width: 221},
});

export default stylesCust;
