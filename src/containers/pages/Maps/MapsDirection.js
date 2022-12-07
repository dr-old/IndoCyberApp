import React, {Component, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View, Text, Button, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {NativeModules} from 'react-native';
import {color} from '../../../utils/styles';
import {ButtonIcon} from '../../../components/atoms';
import FormGooglePlace from '../../../components/molecules/FormGooglePlace';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 106.93515113591987;
const LONGITUDE = -6.189253579613453;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40};

const GOOGLE_MAPS_APIKEY = 'AIzaSyBWnPlLaF3eYIce7WB3sP2rdSW11WWnj40';
const reactNativeVersion = NativeModules.PlatformConstants.reactNativeVersion;
const reactNativeVersionString = reactNativeVersion
  ? `${reactNativeVersion.major}.${reactNativeVersion.minor}.${
      reactNativeVersion.patch
    }${reactNativeVersion.prerelease ? ' pre-release' : ''}`
  : '';

const reactNativeMapsVersion =
  require('../../../../node_modules/react-native-maps/package.json').version;
const reactNativeMapsDirectionsVersion =
  require('../../../../node_modules/react-native-maps-directions/package.json').version;

const styles = StyleSheet.create({
  versionBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  versionText: {
    padding: 4,
    backgroundColor: '#FFF',
    color: '#000',
  },
});

const MapsDirection = () => {
  const [coordinates, setCoordinates] = useState([
    'Jne tomang 6',
    'universitas trilogi',
  ]);
  // const [coordinates, setCoordinates] = useState([
  //   {
  //     latitude: 106.79768726990858,
  //     longitude: -6.178748831839049,
  //   },
  //   {
  //     latitude: 106.84918302573419,
  //     longitude: -6.252626325254966,
  //   },
  // ]);
  const mapView = useRef();
  const searchText = useRef();

  const onMapPress = e => {
    setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  };

  const onReady = result => {
    mapView.current.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 10,
        bottom: height / 10,
        left: width / 10,
        top: height / 10,
      },
    });
  };

  const onError = errorMessage => {
    console.log(errorMessage); // eslint-disable-line no-console
  };

  const setDistance = (distance, duration_in_traffic) => {
    // console.log('setDistance');
    setCoordinates({
      distance: parseFloat(distance),
      durationInTraffic: parseInt(duration_in_traffic),
    });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };
        mapView.current.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        // animate(region);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        // timeout: 20000,
        // maximumAge: 1000,
      },
    );
  };

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        zoomControlEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        ref={mapView} // eslint-disable-line react/jsx-no-bind
        onPress={onMapPress}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[coordinates.length - 1]}
          waypoints={coordinates.slice(1, -1)}
          mode="DRIVING"
          apikey={GOOGLE_MAPS_APIKEY}
          language="en"
          strokeWidth={4}
          strokeColor={color.green}
          onStart={params => {
            console.log(params);
            console.log(
              `Started routing between "${params.origin}" and "${
                params.destination
              }"${
                params.waypoints.length
                  ? ' using waypoints: ' + params.waypoints.join(', ')
                  : ''
              }`,
            );
          }}
          onReady={onReady}
          onError={errorMessage => {
            console.log(errorMessage);
          }}
          resetOnChange={false}
        />
        {/* <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} /> */}
      </MapView>
      <View style={stylesCust.buttonContainer}>
        <ButtonIcon
          solid={true}
          type="primary"
          name="crosshairs"
          size={20}
          style={[styles.shadow, stylesCust.button]}
          onClick={() => getCurrentPosition()}
        />
      </View>
      <View style={stylesCust.searchContainer}>
        <FormGooglePlace placeholder="Origin" />
        <FormGooglePlace placeholder="Destination" />
      </View>
    </View>
  );
};

const stylesCust = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
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
    backgroundColor: color.bluept,
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
});

export default MapsDirection;
