import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from './auth';
import App from './app';
import Provider from './provider'
import AuthContext from '../context/auth/AuthState'

const AppStack = createStackNavigator();



const Apps = () => {
  return (
    <NavigationContainer>
      <AuthContext>
        <AppStack.Navigator
          screenOptions={{ headerShown: false, animationEnabled: false }}
          initialRouteName={'Auth'}>
          <AppStack.Screen name="Auth" component={Auth} />
          <AppStack.Screen name="App" component={App} />
          <AppStack.Screen name="Provider" component={Provider} />
        </AppStack.Navigator>
      </AuthContext>
    </NavigationContainer>
  );
};

export default Apps;
