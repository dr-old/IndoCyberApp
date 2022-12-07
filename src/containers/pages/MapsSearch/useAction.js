import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {env, helpers} from '../../../utils';
import {Alert} from 'react-native';
import {fetchSearchMapsData} from '../../../redux/actions/mapsAction';

const useAction = () => {
  const dispatch = useDispatch();
  const maps = useSelector(state => state.mapsReducer);
  const loc = useSelector(state => state.generalReducer.formLocation.location);
  const form = useSelector(state => state.generalReducer.formSearchMaps);
  const navigation = useNavigation();
  const [isDataBackup, setDataBackup] = useState([]);

  const onChangeText = (type, value, search) => {
    dispatch({type: 'SET_FORM_SEARCHMAPS', inputType: type, inputValue: value});

    if (!value) {
      dispatch({type: 'GET_SEARCH_MAPS_RESET'});
    }

    if (search && value.length > 4) {
      onSearch(type, value);
    }
  };

  const onChangeLocation = (type, value) => {
    dispatch({type: 'SET_FORM_LOCATION', inputType: type, inputValue: value});
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentPosition();
      getRecent();
    }, 1000 * 1); // in milliseconds
    return () => clearInterval(intervalId);
  });

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        onChangeLocation('location', position);
      },
      error => {
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error));
        onChangeLocation('location', {});
      },
      {
        enableHighAccuracy: true,
        // timeout: 20000,
        // maximumAge: 1000,
      },
    );
  };

  const onSearch = (type, keyword) => {
    let payload = {
      link: 'nearbysearch/json',
      id: type,
      data: {
        location: `${loc?.coords?.latitude},${loc?.coords?.longitude}`,
        // radius: type === 'origin' ? 500 : 50000,
        rankby: 'distance',
        //type:restaurant
        keyword: keyword,
        key: env.GOOGLE_MAPS_APIKEY,
      },
    };
    dispatch(fetchSearchMapsData(payload));
  };

  const handleClearText = id => {
    onChangeText(id, '');
    onChangeText(`${id}Detail`, {});
    dispatch({type: 'GET_SEARCH_MAPS_RESET'});
  };

  const handleSetLocation = async (id, array, recent = null) => {
    let newId = id;
    let dataOld = await helpers.getLocalStorage('RECENT_PLACES_MAPS');
    let newData = [];
    if (dataOld) {
      let data = JSON.parse(dataOld);
      data = data.filter(l => l.place_id !== array.place_id);
      if (data.length >= 5) {
        data.splice(0, 1);
      }
      data.push(array);
      newData = data;
    } else {
      newData.push(array);
    }
    helpers.setLocalStorage(newData, 'RECENT_PLACES_MAPS');

    if (!form.origin && recent) {
      newId = 'origin';
    } else if (!form.destination && recent) {
      newId = 'destination';
    }

    onChangeText(newId, array.name);
    onChangeText(`${newId}Detail`, array);
    dispatch({type: 'GET_SEARCH_MAPS_RESET'});
  };

  const getRecent = async () => {
    let dataOld = [];
    dataOld = await helpers.getLocalStorage('RECENT_PLACES_MAPS');
    if (dataOld) {
      let newData = [];
      newData = JSON.parse(dataOld);
      setDataBackup(newData.reverse());
    } else {
      setDataBackup([]);
    }
  };

  return {
    form,
    maps,
    navigation,
    isDataBackup,
    onChangeText,
    handleSetLocation,
    handleClearText,
  };
};

export default useAction;
