import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {color} from '../../../utils/styles';

export default function WatchPosition() {
  const watchPosition = () => {
    try {
      const watchID = Geolocation.watchPosition(
        position => {
          console.log(position);
          setPosition(JSON.stringify(position));
        },
        error => Alert.alert('WatchPosition Error', JSON.stringify(error)),
      );
      setSubscriptionId(watchID);
    } catch (error) {
      Alert.alert('WatchPosition Error', JSON.stringify(error));
    }
  };

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
    setSubscriptionId(null);
    setPosition(null);
  };

  const [position, setPosition] = useState(null);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [isWatch, setWatch] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      watchPosition();
    }, 1000 * 1); // in milliseconds
    return () => {
      clearWatch();
      clearInterval(intervalId);
    };
  });

  return (
    <View style={{backgroundColor: color.green, flex: 1, height: 100}}>
      <Text>
        <Text style={stylesCust.title}>Last position: </Text>
        {position || 'unknown'}
      </Text>
      {/* {subscriptionId !== null ? (
        <Button title="Clear Watch" onPress={clearWatch} />
      ) : ( */}
      <Button title="Watch Position" onPress={() => setWatch(!isWatch)} />
      {/* )} */}
    </View>
  );
}

const stylesCust = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
