import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './auth';
import App from './app';
import Provider from './provider'
const AppStack = createStackNavigator();

const Apps = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{headerShown: false, animationEnabled: false}}
        initialRouteName={'Auth'}>
        <AppStack.Screen name="Auth" component={Auth} />
        <AppStack.Screen name="App" component={App} />
        <AppStack.Screen name="Provider" component={Provider} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Apps;
