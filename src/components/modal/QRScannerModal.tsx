import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { modalStyles } from '../../styles/modalStyles';
import Animated, {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import QRCode from 'react-native-qrcode-svg';
import { multiColor } from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../global/CustomText';
import Icon from '../global/Icon';
import { Camera, CodeScanner,useCameraDevice } from 'react-native-vision-camera';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
}

const QRScannerModal: FC<ModalProps> = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [codeFound, setCodeFound] = useState('Rupak');
  const shimmerTranslateX = useSharedValue(-300);
  const device = useCameraDevice('back') as any
  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerTranslateX.value }],
  }));

  useEffect(() => {
    shimmerTranslateX.value = withRepeat(
      withTiming(300, { duration: 1500, easing: Easing.linear }),
      -1,
      false,
    );

    if(visible) {
      setLoading(false);
      const timer = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="formSheet"
      onRequestClose={onClose}
      onDismiss={onClose}
      // transparent={true} // Optional: Set to true if you want a transparent background
    >
    <View style={modalStyles.modalContainer}>
        <View style={modalStyles.qrContainer}>
          {loading  ? (
            <View style={modalStyles.skeleton}>
              <Animated.View style={[modalStyles.shimmerOverlay, shimmerStyle]}>
                <LinearGradient
                  colors={['#f3f3f3', '#fff', '#f3f3f3']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={modalStyles.shimmerGradient}
                />
              </Animated.View>
            </View>
          ) : (
            <QRCode
              value={qrValue}
              size={250}
              logoSize={60}
              logoBackgroundColor="#fff"
              logoMargin={2}
              logoBorderRadius={10}
              logo={require('../../assets/images/profile2.jpg')}
              linearGradient={multiColor}
              enableLinearGradient
            />
          )}
        </View>
        <View style={modalStyles.info}>
          <CustomText style={modalStyles.infoText1}>
            Ensure you're on the same Wi-Fi network.
          </CustomText>
          <CustomText style={modalStyles.infoText2}>
            Ask the sender to scan this QR code to connect and transfer files.
          </CustomText>
        </View>

        <ActivityIndicator
          size="small"
          color="#000"
          style={{ alignSelf: 'center' }}
        />

        <TouchableOpacity
          onPress={() => onClose()}
          style={modalStyles.closeButton}
        >
          <Icon name="close" iconFamily="Ionicons" size={24} color="#000" />
        </TouchableOpacity>
    </View>
    </Modal>
  );
};

export default QRScannerModal;
