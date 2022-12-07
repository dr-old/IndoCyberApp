import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createNavigationContainerRef} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import {LoginPage, SplashPage} from '../containers/page';
import MyLinking from './MyLinking';
import DashboardStack from './DashboardStack';

const Stack = createNativeStackNavigator();

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

function Router() {
  //   const login = useSelector(state => state.loginReducer.data);

  return (
    <NavigationContainer linking={MyLinking} ref={navigationRef}>
      {/* {!login?.access_token ? (
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Splash"
            component={SplashPage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : ( */}
      <DashboardStack />
      {/* )} */}
    </NavigationContainer>
  );
}

export default Router;
