import {PixelRatio, Platform, StyleSheet} from 'react-native';
import {color, styles} from '../../../utils/styles';

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
  cardBalance: {
    flex: 1,
    backgroundColor: color.bluep,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCategoryIcon: {
    width: '33%',
    marginBottom: 10,
    alignItems: 'center',
  },
  cardCategory: [
    {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      justifyContent: 'space-between',
      paddingTop: 20,
      backgroundColor: color.white,
      borderRadius: 12,
    },
    styles.shadowCust(),
  ],
});

export default stylesCust;
