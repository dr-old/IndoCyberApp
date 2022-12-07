import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Container} from '../../organism';
import stylesCust from './stylesCust';
import helpers from '../../../utils/helpers';
import ChatBubble from '../../../components/molecules/ChatBubble';
import {FormInput} from '../../../components/molecules';
import {color, styles} from '../../../utils/styles';
import {ButtonIcon} from '../../../components/atoms';

function ChatDetail({route}) {
  const dispatch = useDispatch();
  const {itemData} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [isSearch, setSearch] = useState(null);
  const [isData, setData] = useState([]);
  const [isChat, setChat] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const id = 1;

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
  ];

  const handleSendMessage = () => {
    console.log(isChat);
    setChat('');
  };

  return (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <Container>
        <View style={stylesCust.feature}>
          {sample.length > 0
            ? helpers.uniqBy(sample, 'id', 'reverse').map((item, index) => {
                return <ChatBubble key={index} id={id} data={item} />;
              })
            : null}
        </View>
      </Container>
      <View style={stylesCust.chatType}>
        <TextInput
          style={[styles.textBase(), stylesCust.textInput]}
          onChangeText={value => setChat(value)}
          value={isChat}
          returnKeyType="send"
          placeholderTextColor={color.grey}
          placeholder="Type in here..."
          onSubmitEditing={() => (!isChat ? null : handleSendMessage())}
        />
        <ButtonIcon
          solid={true}
          type="primary"
          name="paper-plane"
          size={20}
          onClick={() => console.log('primary')}
        />
        {/* <ButtonIcon
          style={stylesCust.icon(!isChat ? color.abu : color.biruLima)}
          onClick={() => handleSendMessage()}
          disabled={!isChat ? true : false}
          name="paper-plane"
          size={20}
          color={color.putih}
        /> */}
      </View>
    </View>
  );
}

export default ChatDetail;
