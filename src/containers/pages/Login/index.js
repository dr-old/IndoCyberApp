import React from 'react';
import {View, Image, Text, Platform} from 'react-native';
import {color, styles} from '../../../utils/styles';
import {FormInput} from '../../../components/molecules';
import {ButtonLabel, Divider} from '../../../components/atoms';
import stylesCust from './stylesCust';
import useAction from './useAction';
import {Container} from '../../organism';

const Login = () => {
  const {
    isToogle,
    setToogle,
    onChangeText,
    form,
    signIn,
    signInValidate,
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
        title: 'Welcome Back',
        subtitle: 'Log in to continue your journey',
      }}>
      <View style={stylesCust.contentImage}>
        <Image
          source={require('../../../assets/illustration/Login.png')}
          style={{resizeMode: 'contain'}}
        />
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
        <Text
          onPress={() => console.log('ForgotPassword')}
          style={styles.h7(color.bluep5, 'right')}>
          Forgot Password ?{' '}
        </Text>
        <Divider height={Platform.OS === 'ios' ? 10 : 20} />
        <ButtonLabel
          type="primary"
          solid={true}
          label="Log In!"
          size="large"
          disabled={!signInValidate()}
          onClick={() => signIn()}
        />
        <OptionLabel
          title="Dont have account ? "
          subtitle="Sign Up"
          onClick={() => navigation.push('Register')}
        />
      </View>
    </Container>
  );
};

export default Login;
