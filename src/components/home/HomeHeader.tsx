import { View, Text, TouchableOpacity, Image, StatusBar, Platform } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Import this
import { homeHeaderStyles } from '../../styles/homeHeaderStyles';
import { commonStyles } from '../../styles/commonStyles';
import Icon from '../global/Icon';
import Svg , {Path,Defs,LinearGradient, Stop} from 'react-native-svg';
import { screenHeight, screenWidth, svgPath } from '../../utils/Constants';
import QRGenerateModal from '../modal/QRGenerateModal';

const HomeHeader = () => {
  const insets = useSafeAreaInsets(); // Get the safe area insets
  const [isVisible, setIsVisible] = useState(false);

  // For Android, StatusBar.currentHeight gives the actual height.
  // For iOS, insets.top will include notch/dynamic island.
  // It's usually best to let insets.top handle both for padding.
  // However, if the SVG background needs to extend *behind* the status bar,
  // we might need to adjust its 'top' explicitly.

  return (
    <View style={[
      homeHeaderStyles.mainContainer,
      { paddingTop: insets.top, position: 'relative' } // Add position: 'relative' to mainContainer
    ]}>
      {/* This View contains the icons and text, which now correctly respect paddingTop from mainContainer */}
      <View style={[commonStyles.flexRowBetween , homeHeaderStyles.container]}>
        <TouchableOpacity>
          {/* <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
            SwiftShare
          </Text> */}
          <Icon iconFamily='MaterialIcons' name='menu' size={22} color='#fff' />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/logo_t.png')}
          style={homeHeaderStyles.logo}
        />
      <TouchableOpacity
        onPress={() => 
          setIsVisible(true)}
  // Add a high zIndex to ensure it's on top
      >


          <Image
            source={require('../../assets/images/profile.jpg')}
            style={homeHeaderStyles.profile}
          />
        </TouchableOpacity>
      </View>

      {/* The SVG curve */}
      <Svg
        height={screenHeight * 0.25 + insets.top} // Increase SVG height to compensate for status bar area
        width={screenWidth}
        viewBox='0 0 1440 220'
        style={[
          homeHeaderStyles.curve,
          {
            // Now, we adjust the SVG's top to start from the absolute top of the screen
            // or from the top of the *padded* mainContainer.
            // If you want the curve to start *above* your content but still be affected by the safe area:
            // This places its top just at the content's top.
            top: 0, // Relative to the mainContainer's top, which now starts below the status bar
            // If you want the curve to extend *behind* the status bar (more common for backgrounds):
            // You would place this SVG outside the mainContainer or give mainContainer a negative top
            // and then give its children appropriate padding.
            // For now, let's assume you want it to be *within* the visual header area.
          }
        ]}
      >
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset='0%' stopColor='#007AFF' stopOpacity='1'/>
            <Stop offset='100%' stopColor='#80BFFF' stopOpacity='1'/>
          </LinearGradient>
        </Defs>
        {/* You might need to adjust the Path's d property if the SVG itself is drawn assuming 0,0 is the top-left of the screen */}
        <Path fill="#80BFFF" d={svgPath} />
        <Path fill="url(#grad)" d={svgPath} />
      </Svg>
      {isVisible && <QRGenerateModal visible={isVisible} onClose={()=>setIsVisible(false)} />}
    </View>
  );
};

export default HomeHeader;