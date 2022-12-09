import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Checkout, ProductDetail} from '../containers/pages';
import TabStack from './TabStack';

const Stack = createNativeStackNavigator();

function DashboardStack() {
  const page = [
    {name: 'Home', comp: TabStack, header: false}, // if you can use tab bottom navigation
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
