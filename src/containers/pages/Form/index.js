import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {color, styles} from '../../../utils/styles';
import {ButtonIcon, ButtonLabel, Divider} from '../../../components/atoms';
import {FormInput} from '../../../components/molecules';
import helpers from '../../../utils/helpers';
import {Container} from '../../organism';

function Form() {
  const [input, setInput] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChangeDate = async (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDateTimepicker = mode => {
    setShow(!show);
    setMode(mode);
  };

  const handleSetLocalStorage = async () => {
    console.log('set to local storage', input);
    setInput('');
    await helpers.setLocalStorage(input, '@local_testing');
  };

  const handleGetLocalStorage = async () => {
    const data = await helpers.getLocalStorage('@local_testing');
    setInput(data);
    console.log('get from local storage', data);
  };

  return (
    <Container>
      <Text
        style={[
          styles.textBase(17),
          {textAlign: 'center', paddingVertical: 17},
        ]}>
        Input Text
      </Text>
      <Divider height={10} />
      <FormInput
        label="label"
        placeholder="Input text outline with label"
        type="outline"
        value={input}
        onChangeText={value => setInput(value)}
      />
      <FormInput
        placeholder="Input text outline without label"
        type="outline"
        value={input}
        onChangeText={value => setInput(value)}
      />
      <FormInput
        placeholder="Input text outline + disabled + without label + button"
        type="outline"
        value={input}
        onChangeText={value => setInput(value)}
        disabled={true}
        icon={{
          name: 'chevron-right',
          color: color.red,
          onClick: () => console.log('onclick'),
        }}
      />
      <FormInput
        placeholder="Input text outline + without label + button"
        type="solid"
        value={input}
        onChangeText={value => setInput(value)}
        disabled={true}
        icon={{
          name: 'chevron-right',
          color: color.red,
          onClick: () => console.log('onclick'),
        }}
      />
      <FormInput
        label="label"
        placeholder="Input text solid with label in disabled"
        type="solid"
        disabled={true}
        value={input}
        onChangeText={value => setInput(value)}
      />
      <FormInput
        placeholder="Input text solid without label"
        type="solid"
        value={input}
        onChangeText={value => setInput(value)}
      />
      <FormInput
        placeholder="Input text multiline solid without label"
        type="solid"
        value={input}
        onChangeText={value => setInput(value)}
        multiline={true}
      />
      <Text
        style={[
          {alignSelf: 'center', paddingVertical: 17},
          styles.textBase(17, color.blue),
        ]}>
        DateTime: {moment(new Date(date)).format('DD MMM YYYY HH:mm')}
      </Text>
      <View
        style={{
          flexDirection: 'row-reverse',
          paddingHorizontal: 17,
          justifyContent: 'space-between',
        }}>
        <ButtonLabel
          type="primary"
          solid={true}
          label="Save to Local"
          onClick={() => handleSetLocalStorage()}
        />
        <ButtonLabel
          type="primary"
          label="Get from Local"
          onClick={() => handleGetLocalStorage()}
        />
        <ButtonIcon
          type="success"
          name="calendar"
          size={20}
          onClick={() => showDateTimepicker('date')}
        />
        <ButtonIcon
          type="warning"
          name="clock"
          size={20}
          onClick={() => showDateTimepicker('time')}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChangeDate}
        />
      )}
      <Divider height={10} mTop={10} bgColor={color.white2} />
    </Container>
  );
}

export default Form;
