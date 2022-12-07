import {Platform, StyleSheet} from 'react-native';
import {color} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  groupDate: {
    fontSize: 11,
    color: color.biru,
    alignSelf: 'center',
    backgroundColor: color.biruEmpat,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  chatType: {
    backgroundColor: color.white,
    height: Platform.OS == 'ios' ? 110 : 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textInput: {
    flex: 1,
    backgroundColor: color.white2,
    paddingVertical: Platform.OS == 'ios' ? 15 : 10,
    paddingHorizontal: 15,
    borderRadius: 13,
    marginRight: 15,
    marginTop: 10,
  },
  icon: backgroundColor => ({
    width: 48,
    height: 48,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor,
  }),
  chat: {marginHorizontal: 20, marginBottom: 30, flexDirection: 'row'},
  infoText: {color: color.abu, fontSize: 10},
  feature: {paddingBottom: 20},
});

export default stylesCust;
