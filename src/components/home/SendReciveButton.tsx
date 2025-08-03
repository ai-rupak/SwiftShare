import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { screenHeight } from '../../utils/Constants'
import { navigate } from '../../utils/NavigationUtil'

const SendReciveButton:FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.button}
      onPress={() => {
        console.log('Send button pressed');
        navigate("SendScreen");
      }}
        >
        <Image
        source={require('../../assets/icons/send.jpg')}
         style={styles.img}/>
       
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate('RecieveScreen')}
      >
        <Image
        source={require('../../assets/icons/receive.jpg')}
         style={styles.img}/>
       
    </TouchableOpacity>
    </View>
  )
}

export default SendReciveButton

const styles = StyleSheet.create({
container: {
  marginTop: screenHeight * 0.06,
  flexDirection: 'row',
  justifyContent: 'space-evenly'
},
img: {
  height: '100%',
    width: '100%',
    resizeMode: 'cover',
},
button: {
  width: 140,
  height: 100,
  borderRadius: 10,
  overflow: "hidden"
}
})