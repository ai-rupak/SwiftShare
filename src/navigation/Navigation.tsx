import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../utils/NavigationUtil';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import RecieveScreen from '../screens/RecieveScreen';
import ReceivedFilesScreen from '../screens/ReceivedFilesScreen';
import { TCPProvider } from '../service/TCPProvider';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Navigation:FC = () => {
  return (
    <TCPProvider>
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
      initialRouteName='SplashScreen'
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen}  />
        <Stack.Screen name="ConnectionScreen" component={ConnectionScreen}  />
        <Stack.Screen name="SendScreen" component={SendScreen}  />
        <Stack.Screen name="RecieveScreen" component={RecieveScreen}  />
        <Stack.Screen name="ReceivedFilesScreen" component={ReceivedFilesScreen}  />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen}  />


      </Stack.Navigator>
    </NavigationContainer>
    </TCPProvider>
  )
}

export default Navigation