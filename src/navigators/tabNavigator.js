import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Experts from '../screens/experts';
import AuthHome from '../screens/authHome';
import Account from '../screens/account';
import Message from '../screens/messages';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = focused ? 'home-lightbulb' : 'home-lightbulb';
            } else if (route.name === 'Experts') {
                iconName = focused ? 'account-tie' : 'account-tie';
            }else if (route.name === 'Messages') {
                iconName = focused ? 'chat' : 'chat';
            }else if (route.name === 'Account') {
                iconName = focused ? 'account-cog' : 'account-cog';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={AuthHome}/>
        <Tab.Screen name="Experts" component={Experts}/>
        <Tab.Screen name="Messages" component={Message}/>
        <Tab.Screen name="Account" component={Account}/>
      </Tab.Navigator>
  );
}  
