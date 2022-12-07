import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {env, helpers} from '../../../utils';
import {Alert, Platform} from 'react-native';
import {fetchSearchMapsData} from '../../../redux/actions/mapsAction';
import Geocoder from 'react-native-geocoding';

Geocoder.init(env.GOOGLE_MAPS_APIKEY);

const useAction = () => {
  const dispatch = useDispatch();
  const maps = useSelector(state => state.mapsReducer);
  const loc = useSelector(state => state.generalReducer.formLocation);
  const [isSelect, setSelect] = useState(null);
  const navigation = useNavigation();
  const mapView = useRef();

  const onChangeLocation = (type, value) => {
    dispatch({type: 'SET_FORM_LOCATION', inputType: type, inputValue: value});
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        onChangeLocation('location', position);
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        };
        mapView.current.animateToRegion(region);
      },
      error => {
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error));
        onChangeLocation('location', {});
      },
      {enableHighAccuracy: true},
    );
  };

  const onReady = (result, type = null, index = null) => {
    let padding = 100;
    if (type) {
      setSelect(isSelect?.place_id === type?.place_id ? null : type);
    }
    mapView.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: 80,
        bottom: Platform.OS === 'ios' ? padding + 30 : padding - 10,
        left: 80,
        top: Platform.OS === 'ios' ? padding - 100 : padding - 10,
      },
    });
  };

  const onSearch = (type, location) => {
    let payload = {
      link: 'nearbysearch/json',
      id: type,
      data: {
        location: `${location.latitude},${location.longitude}`,
        // radius: type === 'origin' ? 500 : 50000,
        rankby: 'distance',
        //type:restaurant
        // keyword: keyword,
        key: env.GOOGLE_MAPS_APIKEY,
      },
    };
    dispatch(fetchSearchMapsData(payload));
  };

  const onRegionChange = (type, region) => {
    onSearch(type, region);
  };

  const onSetLocation = async (type, value) => {
    let dataOld = await helpers.getLocalStorage('RECENT_PLACES_MAPS');
    let newData = [];
    if (dataOld) {
      let data = JSON.parse(dataOld);
      data = data.filter(l => l.place_id !== value.place_id);
      if (data.length >= 5) {
        data.splice(0, 1);
      }
      data.push(value);
      newData = data;
    } else {
      newData.push(value);
    }
    helpers.setLocalStorage(newData, 'RECENT_PLACES_MAPS');

    dispatch({
      type: 'SET_FORM_SEARCHMAPS',
      inputType: type,
      inputValue: value.name,
    });
    dispatch({
      type: 'SET_FORM_SEARCHMAPS',
      inputType: `${type}Detail`,
      inputValue: value,
    });
    dispatch({type: 'GET_SEARCH_MAPS_RESET'});
    navigation.goBack();
  };

  return {
    navigation,
    maps,
    loc,
    mapView,
    isSelect,
    onReady,
    getCurrentPosition,
    onRegionChange,
    onSetLocation,
  };
};

export default useAction;
