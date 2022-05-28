import { StyleSheet, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import React from 'react';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import ForgotPassword from '../screens/auth/forgotPassword';
import Home from '../screens/auth/home';
import { useSelector } from 'react-redux';
import TabNavigator from './tabNavigator';
// 
// https://data.gov.in/user/myaccount 579b464db66ec23bdd0000017ff1eeedbf784c764c00093b957334c6
// 

const Stack = createNativeStackNavigator();

export default function Main() {
  const { isLogin } = useSelector(state=>state.state);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          stackAnimation: 'flip',
          headerShown: false, //Platform.OS === 'ios',
        }}
      >

        {!isLogin?
        <Stack.Group>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Signup" component={Signup}/>
        </Stack.Group>
        :
        <Stack.Group>
          <Stack.Screen name="TabNavigator" options={{ title: 'Home' }} component={TabNavigator}/>
        </Stack.Group>
        }

        <Stack.Screen name="ForgotPassword" options={{ title: 'Reset Password' }} component={ForgotPassword}/>
        
        {/* <Stack.Screen 
          name="Settings" 
          options={{ 
            headerLargeTitle: true,
          }}
          component={Settings}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
