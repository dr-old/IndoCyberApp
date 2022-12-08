import {StyleSheet} from 'react-native';
import {color, styles} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  card: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: color.white,
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderColor: color.line,
  },
  cardBody: {flex: 1, marginLeft: 15},
  infoText: {textAlign: 'center'},
  badges: {
    backgroundColor: color.biruEmpat,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgesText: {color: color.biru, fontSize: 11},
  feature: {
    backgroundColor: color.putih,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  image: {resizeMode: 'cover', width: '100%', height: 100, borderRadius: 8},
  cardImage: {
    height: 100,
    width: 143,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: color.white8,
    paddingHorizontal: 30,
    paddingVertical: 20,
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
    height: 45,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  qtyText: [styles.h4(), {paddingBottom: 5}],
});

export default stylesCust;
