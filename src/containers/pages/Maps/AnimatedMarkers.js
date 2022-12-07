import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
  Button,
  Image,
  SafeAreaView,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import {ButtonIcon, ButtonLabel} from '../../../components/atoms';
import {color, styles} from '../../../utils/styles';
import Geolocation from '@react-native-community/geolocation';
import {Modalize} from 'react-native-modalize';
import {faker} from '@faker-js/faker';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';

const AnimatedMarkers = ({location}) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBWnPlLaF3eYIce7WB3sP2rdSW11WWnj40'; // never save your real api key in a snack!

  const screen = Dimensions.get('window');

  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const LATITUDE_DELTA = 0.0922 / 10;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const destination = location;
  const [isLocation, setLocation] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const navigation = useNavigation();
  const marker = useRef();
  const mapView = useRef();
  const maps = {
    coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE,
    }),
  };
  const coordinates = [
    {
      name: 'Burger',
      latitude: 37.8025259,
      longitude: -122.4351431,
      image: require('../../../assets/product/burger.jpg'),
    },
    {
      name: 'Pizza',
      latitude: 37.7946386,
      longitude: -122.421646,
      image: require('../../../assets/product/pizza.jpg'),
    },
    {
      name: 'Soup',
      latitude: 37.7665248,
      longitude: -122.4165628,
      image: require('../../../assets/product/soup.jpg'),
    },
    {
      name: 'Sushi',
      latitude: 37.7834153,
      longitude: -122.4527787,
      image: require('../../../assets/product/sushi.jpg'),
    },
    {
      name: 'Curry',
      latitude: 37.7948105,
      longitude: -122.4596065,
      image: require('../../../assets/product/curry.jpg'),
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentPosition();
    }, 1000 * 5); // in milliseconds
    return () => clearInterval(intervalId);
  });

  // gotToMyLocation(){
  //   console.log('gotToMyLocation is called')
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords }) => {
  //       console.log("curent location: ", coords)
  //       console.log(this.map);
  //       if (this.map) {
  //         console.log("curent location: ", coords)
  //         this.map.animateToRegion({
  //           latitude: coords.latitude,
  //           longitude: coords.longitude,
  //           latitudeDelta: 0.005,
  //           longitudeDelta: 0.005
  //         })
  //       }
  //     },
  //     (error) => alert('Error: Are location services on?'),
  //     { enableHighAccuracy: true }
  //   )
  // }

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };
        setLocation(region);
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

  const animate = data => {
    const {coordinate} = maps;
    const newCoordinate = {
      latitude: data.latitude + (Math.random() - 0.5) * (LATITUDE_DELTA / 2),
      longitude: data.longitude + (Math.random() - 0.5) * (LONGITUDE_DELTA / 2),
    };

    if (Platform.OS === 'android') {
      marker.current.animateMarkerToCoordinate(newCoordinate, 500);
      // marker.current.fitToCoordinates([newCoordinate], {
      //   edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
      //   animated: false,
      // });
    } else {
      coordinate.timing({...newCoordinate, useNativeDriver: true}).start();
    }
  };

  const handleSearchPlaces = () => {
    navigation.push('MapsSearch');
  };

  return (
    <View style={stylesCust.container}>
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        style={stylesCust.map}
        showsUserLocation={true}
        zoomControlEnabled={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        region={isLocation}>
        <Marker.Animated ref={marker} coordinate={maps.coordinate} />
        {destination?.latitude ? (
          <MapViewDirections
            origin={isLocation}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          />
        ) : null}
      </MapView>
      <View style={stylesCust.buttonContainer}>
        <ButtonIcon
          type="default"
          name="plus"
          size={20}
          style={[styles.shadow, stylesCust.button]}
          onClick={() => getCurrentPosition()}
        />
        {/* <ButtonIcon
          type="default"
          name="minus"
          size={20}
          style={[styles.shadow, stylesCust.button]}
          onClick={() => handleZoomOut()}
        /> */}
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
  button: {
    width: 48,
    height: 38,
    backgroundColor: color.white,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    width: 100,
    height: 100,
    backgroundColor: color.blue,
    bottom: 100,
    position: 'absolute',
  },

  modal__header: {
    paddingVertical: 15,
    marginHorizontal: 15,

    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },

  modal__headerText: {
    fontSize: 15,
    fontWeight: '200',
  },

  content: {
    paddingHorizontal: 15,
  },

  content__row: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 15,

    borderBottomColor: '#f9f9f9',
    borderBottomWidth: 1,
  },

  content__avatar: {
    width: 38,
    height: 38,

    marginRight: 15,

    overflow: 'hidden',

    backgroundColor: '#eee',
    borderRadius: 19,
  },

  content__name: {
    fontSize: 16,
  },

  content__button: {
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 20,
  },
});

export default AnimatedMarkers;
