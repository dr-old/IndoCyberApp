import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChatDetail,
  Form,
  Home,
  Login,
  Maps,
  MapsDirection,
  MapsLocation,
  MapsSearch,
  Notification,
  Register,
  Splash,
  Typography,
  VerifyUser,
} from '../containers/pages';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();

function DashboardStack() {
  const page = [
    {name: 'Home', comp: TabStack, header: false}, // if you can use tab bottom navigation
    // {name: 'Home', comp: Home, header: false}, // if you cannot use tab bottom navigation
    {name: 'Typography', comp: Typography, header: true},
    {name: 'Form', comp: Form, header: true},
    {name: 'Notification', comp: Notification, header: true},
    {name: 'ChatDetail', comp: ChatDetail, header: true},
    {name: 'Splash', comp: Splash, header: false},
    {name: 'Register', comp: Register, header: false},
    {name: 'Login', comp: Login, header: false},
    {name: 'VerifyUser', comp: VerifyUser, header: false},
    {name: 'Maps', comp: Maps, header: false},
    {name: 'MapsSearch', comp: MapsSearch, header: false},
    {name: 'MapsDirection', comp: MapsDirection, header: false},
    {name: 'MapsLocation', comp: MapsLocation, header: false},
  ];

  return (
    <Stack.Navigator initialRouteName="Splash">
      {page.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.comp}
            options={{headerShown: item.header}}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default DashboardStack;
