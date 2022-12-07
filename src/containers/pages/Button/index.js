import * as React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {ButtonIcon, ButtonLabel, Divider} from '../../../components/atoms';
import {color, styles} from '../../../utils/styles';
import {Container} from '../../organism';

function Button() {
  const navigation = useNavigation();

  const handleMessage = type => {
    showMessage({
      message: 'My message title',
      description: 'My message description',
      type: type,
    });
  };

  return (
    <Container>
      <Text
        style={[
          styles.textBase(17),
          {textAlign: 'center', paddingVertical: 17},
        ]}>
        Button Icon
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 17,
          flexWrap: 'wrap',
        }}>
        <ButtonIcon
          type={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: color.blue2,
          }}
          name="home"
          size={20}
          onClick={() => console.log('danger')}
        />
        <ButtonIcon
          outline={true}
          type="primary"
          name="home"
          size={20}
          onClick={() => console.log('primary')}
        />
        <ButtonIcon
          type="success"
          name="home"
          size={20}
          onClick={() => console.log('success')}
        />
        <ButtonIcon
          outline={true}
          type="warning"
          name="home"
          size={20}
          onClick={() => console.log('warning')}
        />
        <ButtonIcon
          type="default"
          name="home"
          size={20}
          onClick={() => console.log('default')}
        />
        <ButtonIcon
          outline={true}
          type="danger"
          name="home"
          size={20}
          onClick={() => console.log('danger')}
        />
      </View>
      <Text
        style={[
          styles.textBase(17),
          {textAlign: 'center', paddingVertical: 17},
        ]}>
        Button Icon Solid
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 17,
          flexWrap: 'wrap',
        }}>
        <ButtonIcon
          solid={true}
          type="primary"
          name="calendar"
          size={20}
          onClick={() => console.log('primary')}
        />
        <ButtonIcon
          solid={true}
          type="success"
          name="home"
          size={20}
          onClick={() => console.log('success')}
        />
        <ButtonIcon
          solid={true}
          type="warning"
          name="home"
          size={20}
          onClick={() => console.log('warning')}
        />
        <ButtonIcon
          solid={true}
          type="default"
          name="home"
          size={20}
          onClick={() => console.log('default')}
        />
        <ButtonIcon
          solid={true}
          type="danger"
          name="home"
          size={20}
          onClick={() => console.log('danger')}
        />
      </View>
      <Text
        style={[
          styles.textBase(17),
          {textAlign: 'center', paddingVertical: 17},
        ]}>
        Button Label
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 17,
          flexWrap: 'wrap',
        }}>
        <ButtonLabel
          outline={true}
          type="primary"
          label="Primary"
          onClick={() => console.log('primary')}
        />
        <ButtonLabel
          type="success"
          label="success"
          onClick={() => console.log('success')}
        />
        <ButtonLabel
          outline={true}
          type="warning"
          label="warning"
          onClick={() => console.log('warning')}
        />
        <ButtonLabel
          type="default"
          label="default"
          onClick={() => console.log('default')}
        />
        <ButtonLabel
          outline={true}
          type="danger"
          label="danger"
          onClick={() => console.log('danger')}
        />
      </View>
      <Text
        style={[
          styles.textBase(17),
          {textAlign: 'center', paddingVertical: 17},
        ]}>
        Button Label Solid
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 17,
          flexWrap: 'wrap',
        }}>
        <ButtonLabel
          type="primary"
          solid={true}
          label="Primary"
          onClick={() => handleMessage('primary')}
        />
        <ButtonLabel
          type="success"
          solid={true}
          label="success"
          onClick={() => handleMessage('success')}
        />
        <ButtonLabel
          type="warning"
          solid={true}
          label="warning"
          onClick={() => handleMessage('warning')}
        />
        <ButtonLabel
          type="default"
          solid={true}
          label="default"
          onClick={() => handleMessage('default')}
        />
        <ButtonLabel
          type="danger"
          solid={true}
          label="danger"
          onClick={() => handleMessage('danger')}
        />
      </View>
      <Divider height={10} mTop={10} mBot={10} bgColor={color.white2} />
    </Container>
  );
}

export default Button;
