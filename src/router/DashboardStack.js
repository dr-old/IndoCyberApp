import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Authenticate,
  ChatDetail,
  Checkout,
  Form,
  Login,
  MapsDirection,
  MapsLocation,
  MapsSearch,
  Notification,
  ProductDetail,
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
    {name: 'MapsSearch', comp: MapsSearch, header: false},
    {name: 'MapsDirection', comp: MapsDirection, header: false},
    {name: 'MapsLocation', comp: MapsLocation, header: false},
    {name: 'ProductDetail', comp: ProductDetail, header: false},
    {name: 'Checkout', comp: Checkout, header: false},
  ];

  return (
    <Stack.Navigator initialRouteName="Home">
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
