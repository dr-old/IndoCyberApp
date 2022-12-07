import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {color, styles} from '../../../utils/styles';
import {Container} from '../../organism';
import {Divider} from '../../../components/atoms';
import ErrorMessage from '../../../components/molecules/ErrorMessage';
import stylesCust from './stylesCust';

function Chat() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isSearch, setSearch] = useState(null);
  const [isData, setData] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const sample = [
    {
      id: 1,
      name: 'Danni',
      body: 'Halo, nama saya Danni salam kenal!',
      date: new Date(),
    },
    {
      id: 2,
      name: 'Ramdan',
      body: 'Halo, nama saya Ramdan salam kenal!',
      date: new Date(),
    },
    {
      id: 3,
      name: 'Oktafia',
      body: 'Halo, nama saya Oktafia salam kenal!',
      date: new Date(),
    },
    {
      id: 4,
      name: 'Rahmawati',
      body: 'Halo, nama saya Rahmawati salam kenal!',
      date: new Date(),
    },
  ];

  function ItemChat({data}) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('ChatDetail', {itemData: JSON.stringify(data)})
        }
        style={stylesCust.chat}>
        <View style={stylesCust.chatAvatar(color.blue3)}>
          <Text style={styles.textBase(30, color.blue)}>
            {data.name.charAt(0)}
          </Text>
        </View>
        <View style={stylesCust.chatBody}>
          <Text style={styles.textBase(17, color.grey2)} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={styles.textBase(13, color.grey)} numberOfLines={1}>
            {data.body}
          </Text>
        </View>
        <View style={stylesCust.chatInfo}>
          <Text style={[styles.textBase(10, color.grey), stylesCust.infoText]}>
            {`${moment(new Date(data.date)).format('DD MMM YY')}\n${moment(
              new Date(data.date),
            ).format('HH:mm')}`}
          </Text>
          {/* <View style={stylesCust.badges}>
            <Text style={[styles.textSemiBold, stylesCust.badgesText]}>99</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Container>
      {sample.length > 0 ? (
        <View style={stylesCust.feature}>
          <Divider height={40} />
          {sample.map(item => {
            return !item.name ? null : <ItemChat key={item.name} data={item} />;
          })}
          <Divider height={20} />
        </View>
      ) : (
        <ErrorMessage marginVertical={50} message="Data is not found" />
      )}
    </Container>
  );
}

export default Chat;
