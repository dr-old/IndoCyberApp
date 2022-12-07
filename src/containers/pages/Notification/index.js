import * as React from 'react';
import {Platform} from 'react-native';
import {Container} from '../../organism';
import NotifyAndroid from './NotifyAndroid';
import NotifyIos from './NotifyIos';

const Notification = () => {
  return (
    <Container>
      {Platform.OS === 'ios' ? <NotifyIos /> : <NotifyAndroid />}
    </Container>
  );
};

export default Notification;
