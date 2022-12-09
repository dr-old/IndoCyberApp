import * as React from 'react';
import createBottomTabNavigator from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Checkout, History, Home} from '../containers/pages';
import {color as clr, styles} from '../utils/styles';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabStack() {
  const tabBar = [
    {name: 'HomeTab', label: 'Beranda', icon: 'home', comp: Home},
    {
      name: 'CheckoutTab',
      label: 'Keranjang',
      icon: 'shopping-cart',
      comp: Checkout,
    },
    {name: 'HistoryTab', label: 'Riwayat', icon: 'history', comp: History},
    // {name: 'NoticationTab', label: 'Notifikasi', icon: 'bell', comp: Setting},
  ];

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 70, // for android 60
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          margin: 10,
          borderRadius: 10,
        },

        tabBarActiveTintColor: clr.bluep,
        // tabBarActiveBackgroundColor: clr.blue4,
        tabBarInactiveTintColor: clr.tgrey3,
        // tabBarInactiveBackgroundColor: clr.white,
      })}>
      {tabBar.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.comp}
          options={{
            headerShown: false,
            tabBarLabel: item.label,
            tabBarShowLabel: true,
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={item.icon} color={color} size={20} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
