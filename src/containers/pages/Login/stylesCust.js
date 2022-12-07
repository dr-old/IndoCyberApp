import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {color} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  groupInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  groupItem: {width: '47%'},
  contentBody: {marginHorizontal: 30},
  contentImage: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default stylesCust;
