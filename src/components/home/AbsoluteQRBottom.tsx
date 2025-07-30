import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { bottomTabStyles } from '../../styles/bottomTabStyle';
import { navigate } from '../../utils/NavigationUtil';
import Icon from '../global/Icon';
import QRScannerModal from '../modal/QRScannerModal';

const AbsoluteQRBottom = () => {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <>
        <View style={bottomTabStyles.container}>
        
        <TouchableOpacity
          
          onPress={() => navigate('ReceivedFilesScreen')}
        >
            <Icon
            name='apps-sharp'
            iconFamily='Ionicons'
            size={24}
            color="#333"
            />
        </TouchableOpacity>
        <TouchableOpacity
          
          style={bottomTabStyles.qrCode}
          onPress={() => setIsVisible(true)}
        >
            <Icon
            name='qrcode-scan'
            iconFamily='MaterialCommunityIcons'
            size={26}
            color="#fff"
           
            />
        </TouchableOpacity>
        <TouchableOpacity
          
          onPress={() => navigate('SettingsScreen')}
        >
            <Icon
            name='beer-sharp'
            iconFamily='Ionicons'
            size={24}
            color="#333"
            />
        </TouchableOpacity>
        </View>
        {isVisible && (<QRScannerModal visible={isVisible} onClose={()=>setIsVisible(false)} />)}
    </>
  )
}

export default AbsoluteQRBottom