import { View, Text, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import { navigate } from '../utils/NavigationUtil';
import { commonStyles } from '../styles/commonStyles';

const SplashScreen: FC = () => {
  const navigateToHome = () => {
    navigate('HomeScreen');
  };
  useEffect(() => {
    const timeoutId = setTimeout(navigateToHome, 1500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <View style={commonStyles.container}>
      <Image
        style={commonStyles.img}
        source={require('../assets/images/SwiftShare.png')}
      />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 30,
          color: '#000',
          // marginTop: 10,
          textAlign: 'center',
        }}
      >
        SwiftShare
      </Text>
    </View>
  );
};

export default SplashScreen;
