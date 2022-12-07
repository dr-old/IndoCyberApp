import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {ButtonIcon, ButtonLabel, Divider} from '../../../components/atoms';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BarHeader, LoadingIntern} from '../../../components/molecules';
import {color, styles} from '../../../utils/styles';
import stylesCust from './stylesCust';
import useAction from './useAction';
import marker from '../../../assets/icon/Pin.png';
import {ImageCarousel} from '../../organism';

const MapsLocation = ({route}) => {
  const {itemId} = route.params;
  const {
    navigation,
    maps,
    loc,
    mapView,
    isSelect,
    onReady,
    getCurrentPosition,
    onRegionChange,
    onSetLocation,
  } = useAction();

  const LocationItem = ({item, index}) => {
    let coord = {
      coordinates: [
        {
          latitude: item?.geometry?.location?.lat,
          longitude: item?.geometry?.location?.lng,
        },
      ],
    };
    return (
      <TouchableOpacity
        style={stylesCust.address(
          isSelect?.place_id === item?.place_id ? color.blue3 : color.white8,
        )}
        onPress={() => onReady(coord, item, index)}>
        <ButtonIcon
          type={stylesCust.iconTransparent(color.red)}
          alignSelf="flex-start"
          name="arrow-circle-down"
          size={25}
          style={stylesCust.iconCust}
        />
        <View>
          <Text style={styles.h5(color.tblack)} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.p4(color.grey2)} numberOfLines={2}>
            {item.vicinity}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={stylesCust.page}>
      {Platform.OS === 'ios' ? <BarHeader /> : null}
      {loc?.location?.coords?.latitude ? (
        <MapView
          initialRegion={{
            latitude: loc?.location?.coords?.latitude,
            longitude: loc?.location?.coords?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          onRegionChangeComplete={region => onRegionChange(itemId, region)}
          style={stylesCust.map}
          ref={mapView}>
          {maps.data?.data?.length > 0 ? (
            <>
              {maps.data.data.slice(0, 3).map((item, index) => {
                let coord = {
                  coordinates: [
                    {
                      latitude: item?.geometry?.location?.lat,
                      longitude: item?.geometry?.location?.lng,
                    },
                  ],
                };
                return (
                  <Marker
                    key={index}
                    onPress={() => onReady(coord, item, index)}
                    coordinate={{
                      latitude: item.geometry.location.lat,
                      longitude: item.geometry.location.lng,
                    }}>
                    <View style={stylesCust.markerCust}>
                      <FontAwesome5
                        name="dot-circle"
                        size={20}
                        color={color.white}
                      />
                    </View>
                  </Marker>
                );
              })}
            </>
          ) : null}
        </MapView>
      ) : null}
      <View style={stylesCust.markerFixed}>
        <Image style={stylesCust.marker} source={marker} />
      </View>
      <View style={stylesCust.buttonModalize}>
        <ButtonIcon
          type="default"
          name="chevron-left"
          size={20}
          style={[styles.shadowCust(), stylesCust.button]}
          onClick={() => navigation.goBack()}
        />
        <ButtonIcon
          type="default"
          name="crosshairs"
          size={20}
          style={[styles.shadowCust(), stylesCust.button]}
          onClick={() => getCurrentPosition()}
        />
      </View>
      <View style={stylesCust.content}>
        <View style={stylesCust.locationTitle}>
          <Text style={styles.h4()}>
            {itemId === 'origin' ? 'Set lokasi jemput' : 'Cari lokasi tujuan'}
          </Text>
        </View>
        <View style={stylesCust.locationList}>
          {maps?.loading ? (
            <LoadingIntern marginVertical={30} />
          ) : (
            <>
              {maps?.data?.data?.length > 0 ? (
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                  <Divider width={30} />
                  {maps.data.data.slice(0, 3).map((item, index) => {
                    return <LocationItem item={item} key={index} />;
                  })}
                </ScrollView>
              ) : null}
            </>
          )}
        </View>
        <View style={stylesCust.locationButton}>
          <ButtonLabel
            type="primary"
            solid={true}
            label="Lanjutkan!"
            size="large"
            disabled={isSelect?.place_id ? false : true}
            onClick={() => onSetLocation(itemId, isSelect)}
          />
        </View>
      </View>
    </View>
  );
};

export default MapsLocation;
