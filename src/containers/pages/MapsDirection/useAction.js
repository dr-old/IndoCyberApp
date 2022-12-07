import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, PixelRatio, Platform} from 'react-native';
import {helpers} from '../../../utils';
import haversine from 'haversine';
import {AnimatedRegion} from 'react-native-maps';

const useAction = () => {
  const dispatch = useDispatch();
  const loc = useSelector(state => state.generalReducer.formLocation.location);
  const form = useSelector(state => state.generalReducer.formSearchMaps);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const navigation = useNavigation();
  const modalizeRef = useRef();
  const mapView = useRef();
  const region = {
    latitude: loc?.coords?.latitude,
    longitude: loc?.coords?.longitude,
    latitudeDelta: 0.05 / 200,
    longitudeDelta: 0.05 / 200,
  };
  const origin = {
    latitude: form.originDetail.geometry.location.lat,
    longitude: form.originDetail.geometry.location.lng,
  };
  const destination = {
    latitude: form.destinationDetail.geometry.location.lat,
    longitude: form.destinationDetail.geometry.location.lng,
  };
  let isPosition = {
    latitude: origin.latitude,
    longitude: origin.longitude,
    routeCoordinates: [],
    distanceTravelled: 0,
    prevLatLng: {},
    // coordinate: new AnimatedRegion(origin),
  };
  const priceBike = 14000; //sample tarif per 4km
  const priceCar = 21000; //sample tarif per 4km
  const priceList = [
    {
      image: require('../../../assets/illustration/motor.png'),
      name: 'One Bike',
      estimate: '1-3 Menit',
      price: priceBike,
    },
    {
      image: require('../../../assets/illustration/car.png'),
      name: 'One Car',
      estimate: '3-5 Menit',
      price: priceCar,
    },
  ];

  const onRounding = price => {
    let rnd = 100;
    let rates =
      (parseFloat(
        helpers.getDistance(
          form.destinationDetail.geometry.location,
          form.originDetail.geometry.location,
        ) / 1000,
      ).toFixed(1) /
        4) *
      parseFloat(price);
    let res = Math.round((parseInt(rates) / parseInt(rnd)) * parseInt(rnd));
    return res;
  };

  const onChangeLocation = (type, value) => {
    dispatch({type: 'SET_FORM_LOCATION', inputType: type, inputValue: value});
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // getWatchPosition();
      getCurrentPosition();
    }, 1000 * 1); // in milliseconds
    return () => {
      // clearWatch();
      clearInterval(intervalId);
    };
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
      {enableHighAccuracy: true},
    );
  };

  const getWatchPosition = () => {
    // try {
    //   const watchID = Geolocation.watchPosition(
    //     position => {
    //       const {routeCoordinates, distanceTravelled} = isPosition;
    //       const {latitude, longitude} = position.coords;
    //       const newCoordinate = {
    //         latitude,
    //         longitude,
    //       };
    //       // if (Platform.OS === 'android') {
    //       //   if (mapView?.current) {
    //       //     mapView?.current?.animateToRegion(newCoordinate, 500);
    //       //   }
    //       // } else {
    //       //   // coordinate.timing(newCoordinate).start();
    //       // }
    //       isPosition = {
    //         latitude,
    //         longitude,
    //         routeCoordinates: routeCoordinates.concat([newCoordinate]),
    //         distanceTravelled: distanceTravelled + calcDistance(newCoordinate),
    //         prevLatLng: newCoordinate,
    //       };
    //     },
    //     error => Alert.alert('WatchPosition Error', JSON.stringify(error)),
    //   );
    //   setSubscriptionId(watchID);
    // } catch (error) {
    //   Alert.alert('WatchPosition Error', JSON.stringify(error));
    // }
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
    // setPosition(null);
  };

  const calcDistance = newLatLng => {
    return haversine(isPosition?.prevLatLng, newLatLng) || 0;
  };

  const onReady = result => {
    let padding = 100;
    mapView.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: 80,
        bottom:
          Platform.OS === 'ios'
            ? padding + 200
            : PixelRatio.get() * padding + 50,
        left: 80,
        top:
          Platform.OS === 'ios'
            ? padding + 80
            : PixelRatio.get() * padding - 100,
      },
    });
  };

  return {
    form,
    navigation,
    region,
    mapView,
    origin,
    destination,
    modalizeRef,
    priceList,
    isPosition,
    onReady,
    onRounding,
    getWatchPosition,
  };
};

export default useAction;
