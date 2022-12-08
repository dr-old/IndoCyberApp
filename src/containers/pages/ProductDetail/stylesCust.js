import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {color, styles} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
  },
  price: {
    height: 50,
    width: '100%',
    backgroundColor: color.oranget,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: color.tgrey,
  },
  iconCategory: {
    backgroundColor: color.oranget4,
    borderColor: color.oranget4,
    color: color.bluep,
  },
  card: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonType: (clr = color.tblack) => ({
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: clr,
  }),
  buttonFloat: {
    position: 'absolute',
    left: 0,
    top: 30.9,
    marginLeft: 30,
    zIndex: 2,
  },
  qty: {
    width: 100,
    height: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  qtyText: [styles.h4(), {paddingBottom: 8}],
});

export default stylesCust;
