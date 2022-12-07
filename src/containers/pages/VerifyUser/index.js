import React from 'react';
import {View, Image, Text, Platform} from 'react-native';
import {color, styles} from '../../../utils/styles';
import {FormInput, NavHeader} from '../../../components/molecules';
import {ButtonIcon, ButtonLabel, Divider} from '../../../components/atoms';
import stylesCust from './stylesCust';
import useAction from './useAction';
import {Container} from '../../organism';

const VerifyUser = () => {
  const {onChangeText, form, verify, verifyValidate, navigation} = useAction();

  return (
    <Container
      navbar={{
        type: 'fixed',
        title: 'Enter Your OTP Code',
        subtitle: 'Insert Your OTP Code',
        onClick: () => navigation.goBack(),
      }}>
      <View style={stylesCust.contentBody}>
        <FormInput
          placeholder="Masukin kode OTP mu"
          type="outline"
          value={form.otp}
          onChangeText={value => onChangeText('otp', value)}
        />
        <Divider height={Platform.OS === 'ios' ? 10 : 20} />
        <ButtonLabel
          type="primary"
          solid={true}
          label="Verifikasi!"
          size="large"
          disabled={!verifyValidate()}
          onClick={() => verify()}
        />
      </View>
    </Container>
  );
};

export default VerifyUser;
