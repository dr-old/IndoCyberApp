import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ButtonIcon, ButtonLabel, Divider} from '../../../components/atoms';
import {ErrorMessage, LoadingIntern} from '../../../components/molecules';
import {helpers} from '../../../utils';
import {color, styles} from '../../../utils/styles';
import {Container, RouteForm} from '../../organism';
import stylesCust from './stylesCust';
import useAction from './useAction';

const MapsSearch = () => {
  const {
    form,
    maps,
    navigation,
    isDataBackup,
    onChangeText,
    handleSetLocation,
    handleClearText,
  } = useAction();

  const ListItem = ({onClick, icon, item}) => {
    return (
      <TouchableOpacity onPress={onClick} style={stylesCust.listItemRecent}>
        {icon ? (
          <ButtonIcon
            type={stylesCust.iconTransparent(color.tgrey)}
            label={
              form.originDetail?.geometry?.location
                ? `${parseFloat(
                    helpers.getDistance(
                      item.geometry.location,
                      form.originDetail?.geometry?.location,
                    ) / 1000,
                  ).toFixed(1)} km`
                : ''
            }
            name={icon}
            size={20}
            disabled={true}
          />
        ) : null}
        <View style={stylesCust.listItemText}>
          <Text style={styles.h7()} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.p4(color.tgrey3)} numberOfLines={2}>
            {item.vicinity}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Container
        navbar={{
          type: 'fixed',
          title: 'Where are you going today ?',
          onClick: () => navigation.goBack(),
        }}>
        <View style={stylesCust.contentBody}>
          <RouteForm
            label="Dari"
            placeholder="Set lokasi jemput"
            input={form?.origin}
            onClick={() => navigation.push('MapsLocation', {itemId: 'origin'})}
            onChangeText={value => onChangeText('origin', value, true)}
            onClearText={() => handleClearText('origin')}
            icon={{name: 'arrow-circle-up', color: color.green3}}
          />
          <RouteForm
            label="Menuju"
            placeholder="Cari lokasi tujuan"
            input={form?.destination}
            onClick={() =>
              navigation.push('MapsLocation', {itemId: 'destination'})
            }
            onChangeText={value => onChangeText('destination', value, true)}
            onClearText={() => handleClearText('destination')}
            icon={{name: 'arrow-circle-down', color: color.red}}
          />
        </View>
        <Divider bgColor={color.white4} mBot={10} height={10} />
        {!maps?.loading &&
        !maps?.error?.status &&
        (!form.origin || !form.destination) &&
        (!maps?.data?.data || maps?.data?.data?.length == 0) &&
        isDataBackup?.length > 0 ? (
          <View>
            {isDataBackup.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  onClick={() => handleSetLocation(maps.data.id, item, true)}
                  icon="clock"
                  item={item}
                />
              );
            })}
          </View>
        ) : null}
        {maps?.data?.data?.length > 0 ? (
          <View>
            {maps.data.data.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  onClick={() => handleSetLocation(maps.data.id, item)}
                  icon="map-marker-alt"
                  item={item}
                />
              );
            })}
          </View>
        ) : (
          <>
            {maps?.loading ? (
              <LoadingIntern marginVertical={50} />
            ) : (
              <>
                {maps?.error?.status && (form.origin || form.destination) ? (
                  <ErrorMessage
                    message="Data tidak ditemukan"
                    marginVertical={50}
                  />
                ) : null}
              </>
            )}
          </>
        )}
      </Container>
      <View style={stylesCust.contentBottom}>
        <ButtonLabel
          type="primary"
          solid={true}
          label="Lanjutkan!"
          size="large"
          disabled={
            form.originDetail?.place_id && form.destinationDetail?.place_id
              ? false
              : true
          }
          onClick={() => navigation.push('MapsDirection')}
        />
      </View>
    </>
  );
};

export default MapsSearch;
