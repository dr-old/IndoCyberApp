import {StyleSheet} from 'react-native';
import {color} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: color.white,
  },
  contentBody: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  listItemRecent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    backgroundColor: color.white,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: color.white4,
  },
  listItem: {
    backgroundColor: color.white,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: color.white4,
  },
  listItemText: {flex: 1, paddingLeft: 10},
  contentBottom: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: color.white,
  },
  iconTransparent: (clr = color.green3) => ({
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: clr,
  }),
});

export default stylesCust;
