import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../utils/NavigationUtil';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import RecieveScreen from '../screens/RecieveScreen';

const Stack = createNativeStackNavigator();
const Navigation:FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
      initialRouteName='SplashScreen'
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SendScreen" component={SendScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecieveScreen" component={RecieveScreen} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation