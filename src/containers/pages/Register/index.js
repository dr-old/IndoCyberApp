import React from 'react';
import {View, Image, Text, Platform} from 'react-native';
import {color, styles} from '../../../utils/styles';
import {FormInput} from '../../../components/molecules';
import {ButtonLabel, Divider} from '../../../components/atoms';
import stylesCust from './stylesCust';
import useAction from './useAction';
import {Container} from '../../organism';

const Register = () => {
  const {
    isToogle,
    setToogle,
    onChangeText,
    form,
    signUp,
    signUpValidate,
    navigation,
  } = useAction();

  const OptionLabel = ({title, subtitle, onClick}) => {
    return (
      <>
        <Divider height={Platform.OS === 'ios' ? 10 : 20} />
        <Text style={[styles.h8(color.tgrey3, 'center')]}>
          {title}
          <Text onPress={onClick} style={[styles.h8(color.bluep5)]}>
            {subtitle}
          </Text>
        </Text>
      </>
    );
  };

  return (
    <Container
      navbar={{
        type: 'nofixed',
        title: 'Create Your Account',
        subtitle: 'Create your account to start your journey',
      }}>
      <View style={stylesCust.contentImage}>
        <Image
          source={require('../../../assets/illustration/Sign-Up.png')}
          style={{resizeMode: 'contain'}}
        />
      </View>
      <View style={stylesCust.groupInput}>
        <View style={stylesCust.groupItem}>
          <FormInput
            label="Nama"
            placeholder="Nama depan"
            type="outline"
            value={form.firstName}
            onChangeText={value => onChangeText('firstName', value)}
          />
        </View>
        <View style={stylesCust.groupItem}>
          <FormInput
            label={' '}
            placeholder="Nama belakang"
            type="outline"
            value={form.lastName}
            onChangeText={value => onChangeText('lastName', value)}
          />
        </View>
      </View>
      <View style={stylesCust.contentBody}>
        <FormInput
          label="Email"
          placeholder="Masukin email mu"
          type="outline"
          value={form.email}
          onChangeText={value => onChangeText('email', value)}
        />
        <FormInput
          label={'Password'}
          placeholder="Tulis password mu"
          type="outline"
          secureTextEntry={isToogle}
          value={form.password}
          onChangeText={value => onChangeText('password', value)}
          icon={{
            name: !isToogle ? 'eye' : 'eye-slash',
            color: color.grey2,
            onClick: () => setToogle(!isToogle),
          }}
        />
        <Divider height={Platform.OS === 'ios' ? 10 : 20} />
        <ButtonLabel
          type="primary"
          solid={true}
          label="Daftar!"
          size="large"
          disabled={!signUpValidate()}
          onClick={() => signUp()}
        />
        <OptionLabel
          title="Already have account ? "
          subtitle="Sign In"
          onClick={() => navigation.push('Login')}
        />
      </View>
    </Container>
  );
};

export default Register;
