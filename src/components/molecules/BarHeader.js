import React from 'react';
import {Platform, SafeAreaView, StatusBar, View} from 'react-native';
import {color} from '../../utils/styles';

function BarHeader({bgcolor = color.white, barStyle = 'dark-content'}) {
  const StatusBarIos = ({backgroundColor, ...props}) => (
    <View style={{backgroundColor, height: StatusBar.currentHeight}}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
  if (Platform.OS === 'ios') {
    return <StatusBarIos backgroundColor={bgcolor} barStyle={barStyle} />;
  } else {
    return <StatusBar backgroundColor={bgcolor} barStyle={barStyle} />;
  }
}

export default BarHeader;
