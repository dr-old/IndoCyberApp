import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createNavigationContainerRef} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import MyLinking from './MyLinking';
import DashboardStack from './DashboardStack';
import {useSelector} from 'react-redux';
import {Login, Register} from '../containers/pages';

const Stack = createNativeStackNavigator();

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function Router() {
  const login = useSelector(state => state.authReducer);

  return (
    <NavigationContainer linking={MyLinking} ref={navigationRef}>
      {!login?.token ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <DashboardStack />
      )}
    </NavigationContainer>
  );
}

export default Router;
