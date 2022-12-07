import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {color} from '../../../utils/styles';
import {Container, SettingList} from '../../organism';
import packageJson from '../../../../package.json';
import stylesCust from './stylesCust';

function Setting() {
  return (
    <Container>
      <View style={stylesCust.container}>
        <SettingList
          title="General"
          data={[
            {
              icon: 'code-branch',
              label: 'Version',
              subtitle: packageJson.version,
            },
            {
              icon: 'sign-out-alt',
              label: 'Logout',
              onClick: () => console.log(),
            },
          ]}
        />
      </View>
    </Container>
  );
}

export default Setting;
