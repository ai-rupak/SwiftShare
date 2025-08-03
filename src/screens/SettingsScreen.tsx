import { View, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { sendStyles } from '../styles/sendStyles'
import { goBack } from '../utils/NavigationUtil'
import Icon from '../components/global/Icon'

const SettingsScreen = () => {
  return (
    <LinearGradient
          colors={['#FFFFFF','#CDDAEE','#8DBAFF']}
          style={sendStyles.container}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
    <SafeAreaView/>
    {/* <View>
      <Text>SettingsScreen</Text>
    </View> */}
     <TouchableOpacity
            onPress={goBack}
            // Overriding sendStyles.backButton's fixed top: 10
            // This button's position should be handled carefully if mainContainer also has padding.
            // Consider if it should be inside mainContainer or absolutely positioned relative to SafeAreaView
            style={[sendStyles.backButton, { top: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10 }]}
          >
            <Icon
              name="arrow-back"
              size={16}
              iconFamily='Ionicons'
              color="#000"
            />
          </TouchableOpacity>
    </LinearGradient>
  )
}

export default SettingsScreen