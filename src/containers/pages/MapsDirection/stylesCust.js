import {Platform, StyleSheet} from 'react-native';
import {color} from '../../../utils/styles';

const stylesCust = StyleSheet.create({
  page: {flex: 1},
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  buttonClear: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  button: {
    width: 38,
    height: 38,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonContainer: {
    width: 38,
    height: 38,
    right: 13,
    bottom: 120,
    position: 'absolute',
  },
  searchContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    minHeight: 50,
    overflow: 'hidden',
    backgroundColor: color.loading,
  },
  buttonModalize: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: 300,
  },
  routeContainer: {
    minHeight: 50,
    backgroundColor: color.white,
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 10,
  },
  routeBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeTitle: {flex: 1, paddingVertical: 10, paddingRight: 10},
  contentBottom: {
    marginHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: color.white,
  },
  content: {
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    paddingVertical: 20,
  },
  selectTransport: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.white4,
  },
  imageContainer: {width: 50, marginRight: 20},
  image: {resizeMode: 'contain', width: undefined, height: 50},
});

export default stylesCust;
