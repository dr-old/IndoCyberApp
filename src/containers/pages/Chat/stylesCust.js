import {StyleSheet} from 'react-native';
import {color} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  chat: {marginHorizontal: 20, marginBottom: 30, flexDirection: 'row'},
  chatAvatar: backgroundColor => ({
    backgroundColor,
    width: 60,
    height: 60,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  chatBody: {flex: 1, marginLeft: 20, justifyContent: 'center'},
  chatInfo: {marginLeft: 20, justifyContent: 'center', alignItems: 'center'},
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
});

export default stylesCust;
