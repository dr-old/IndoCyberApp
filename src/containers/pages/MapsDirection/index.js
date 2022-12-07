import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import {ButtonIcon, ButtonLabel, Divider} from '../../../components/atoms';
import {BarHeader, FormInput} from '../../../components/molecules';
import {color, styles} from '../../../utils/styles';
import {Container} from '../../organism';
import stylesCust from './stylesCust';
import useAction from './useAction';
import {env, helpers} from '../../../utils';
import {Modalize} from 'react-native-modalize';
import faker from '@faker-js/faker';

const MapsDirection = () => {
  const {
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
  } = useAction();

  const renderContentFixed = () => (
    <View style={stylesCust.contentBottom}>
      <ButtonLabel
        type="primary"
        solid={true}
        label="Lanjutkan!"
        size="large"
        disabled={
          form.originDetail?.name && form.destinationDetail?.name ? false : true
        }
        onClick={() => console.log()}
      />
    </View>
  );
  const renderContent = () => (
    <View style={stylesCust.content}>
      {Platform.OS === 'ios' ? <BarHeader /> : null}
      {priceList.map((item, index) => {
        return (
          <View key={index} style={stylesCust.selectTransport}>
            <View style={stylesCust.imageContainer}>
              <Image source={item.image} style={stylesCust.image} />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.h4()}>{item.name}</Text>
              <Text style={styles.p4(color.tgrey3)}>{item.estimate}</Text>
            </View>
            <Text style={styles.h5()}>
              {helpers.formatCurrency(onRounding(item.price), 'Rp.')}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const RouteContent = ({icon, type, title, subtitle, onClick}) => {
    return (
      <TouchableOpacity onPress={onClick} style={stylesCust.routeBody}>
        <ButtonIcon
          type={type}
          name={icon}
          size={20}
          style={[stylesCust.button]}
          disabled={true}
        />
        <View style={stylesCust.routeTitle}>
          <Text style={styles.h7()} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.p4(color.tgrey3)} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={stylesCust.page}>
      {Platform.OS === 'ios' ? <BarHeader /> : null}
      <MapView
        initialRegion={region}
        style={stylesCust.map}
        // zoomControlEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        ref={mapView}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          waypoints={[]}
          mode="DRIVING"
          apikey={env.GOOGLE_MAPS_APIKEY}
          language="en"
          strokeWidth={4}
          strokeColor={color.green}
          onStart={params => {
            console.log(params);
          }}
          onReady={onReady}
          onError={errorMessage => {
            console.log(errorMessage);
          }}
          resetOnChange={false}
        />
        <Marker coordinate={origin} pinColor={color.green3} />
        <Marker coordinate={destination} />
      </MapView>
      <View style={[stylesCust.routeContainer, styles.shadowCust()]}>
        <RouteContent
          type="success"
          icon="arrow-circle-up"
          title={form.originDetail.name}
          subtitle={
            form.originDetail?.vicinity
              ? form.originDetail.vicinity
              : form.originDetail.formatted_address
          }
          onClick={() => console.log(1)}
        />
        <Divider height={1} bgColor={color.white4} />
        <RouteContent
          type="danger"
          icon="arrow-circle-down"
          title={form.destinationDetail.name}
          subtitle={
            form.destinationDetail?.vicinity
              ? form.destinationDetail.vicinity
              : form.destinationDetail.formatted_address
          }
          onClick={() => console.log(2)}
        />
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
          onClick={() => onReady({coordinates: [origin, destination]})}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        modalStyle={styles.shadowCust()}
        alwaysOpen={300}
        handlePosition="inside">
        {renderContent()}
      </Modalize>
      <Modalize
        ref={modalizeRef}
        modalStyle={styles.shadowCust()}
        adjustToContentHeight={true}
        alwaysOpen={100}
        handlePosition="inside">
        {renderContentFixed()}
      </Modalize>
    </View>
  );
};

export default MapsDirection;
