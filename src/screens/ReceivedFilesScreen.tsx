import { View, Text, Platform, ActivityIndicator, TouchableOpacity, FlatList, StatusBar } from 'react-native' // Import StatusBar
import React, { FC, useEffect } from 'react' // Removed 'use' import
import RNFS from 'react-native-fs';
import Icon from '../components/global/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { sendStyles } from '../styles/sendStyles';
import { SafeAreaView } from 'react-native';
import CustomText from '../components/global/CustomText';
import { Colors } from '../utils/Constants';
import { connectionStyles } from '../styles/connectionStyles';
import { formatFileSize } from '../utils/libraryHelpers';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { goBack } from '../utils/NavigationUtil';
import { PermissionsAndroid } from 'react-native'; // Import PermissionsAndroid

const ReceivedFilesScreen :FC= () => {
  const [recievedFiles , setReceivedFiles] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  // Request storage permissions on Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('You can use the storage');
          return true;
        } else {
          console.log('Storage permission denied');
          // Handle denied permission (e.g., show a message, disable functionality)
          return false;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS doesn't need this explicit runtime request for app sandbox
  };


  const getFilesFromDirectory = async () => {
    setIsLoading(true); // Ensures loading indicator is shown during fetch

    // Request permissions before trying to read directory (Android specific)
    if (Platform.OS === 'android') {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        console.log("App does not have storage permissions, cannot read files.");
        setReceivedFiles([]);
        setIsLoading(false);
        return; // Exit if permissions are not granted
      }
    }

    let platformPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/`
        : `${RNFS.DocumentDirectoryPath}/`;

    try {
      const exists = await RNFS.exists(platformPath);
      if (!exists) {
        setReceivedFiles([]);
        setIsLoading(false);
        return;
      }
      const files = await RNFS.readDir(platformPath);

      const formattedFiles = files.map(file => ({
        id:file.name,
        name: file.name,
        size: file.size,
        uri: file.path,
        mimeType: file.name.split('.').pop() || 'unknown',
      }));
      setReceivedFiles(formattedFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
      setReceivedFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getFilesFromDirectory(); // Initial fetch
  },[]);

  // ... (renderThumbnail remains the same)

  const renderThumbnail = (mimeType: string) => {
    switch (mimeType) {
      case 'mp3':
        return <Icon name="musical-notes" size={16} color='blue' iconFamily='Ionicons'  />
      case 'mp4':
        return <Icon name="videocam" size={16} color='green' iconFamily='MaterialCommunityIcons' />
      case 'jpg':
        return <Icon name="image" size={16} color='orange' iconFamily='MaterialCommunityIcons' />
      case 'png':
        return <Icon name="image" size={16} color='red' iconFamily='MaterialCommunityIcons' />
      case 'pdf':
        return <Icon name="document" size={16} color='red' iconFamily='MaterialIcons' />
      default:
        return <Icon name="folder" size={16} color='blue' iconFamily='MaterialCommunityIcons' />
    }
  }

  const renderItem = ({ item }: any) => {
    return (
      <View style={connectionStyles.fileItem}>
        <View style={connectionStyles.fileInfoContainer}>
          {renderThumbnail(item.mimeType)}
          <View style={connectionStyles.fileDetails}>
            <CustomText numberOfLines={1} fontFamily="Okra-Bold" fontSize={10}>
              {item.name}
            </CustomText>
            <CustomText numberOfLines={1} fontFamily="Okra-Medium" fontSize={8}>
              {item.mimeType} • {formatFileSize(item.size)}
            </CustomText>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            const normalizedPath = Platform.OS === 'ios' ? `file://${item.uri}` : item.uri;

            if (Platform.OS === 'ios') {
              // CORRECTED: Changed ReactNativeBlobUtil.ios.openDocument to ReactNativeBlobUtil.openDocument
              ReactNativeBlobUtil.ios.openDocument(normalizedPath)
                .then(() => console.log('File opened successfully'))
                .catch(err => console.error('Error opening file:', err));
            } else {
              ReactNativeBlobUtil.android
                .actionViewIntent(normalizedPath, '*/*')
                .then(() => console.log('File opened successfully'))
                .catch(err => console.error('Error opening file:', err));
            }
          }}
          style={connectionStyles.openButton}
        >
          <CustomText
            numberOfLines={1}
            color="#fff"
            fontFamily="Okra-Bold"
            fontSize={9}
          >
            Open
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#FFFFFF','#CDDAEE','#8DBAFF']}
      style={sendStyles.container}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Adjusted mainContainer style for better top spacing */}
        <View style={[sendStyles.mainContainer, { flex: 1, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10 }]}>
          <CustomText
            fontFamily='Okra-Bold'
            fontSize={15}
            color='#000' // Changed color to black for better visibility on white/light gradient
            style={{textAlign: 'center', marginBottom: 20}} // Increased bottom margin for spacing
          >
            All Received Files
          </CustomText>
          {
            isLoading ? (
              <ActivityIndicator
                size='small'
                color={Colors.primary}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} // Center activity indicator
              />
            ):(
              recievedFiles.length > 0 ? (
                <View style={{flex:1}}>
                  <FlatList
                    data={recievedFiles}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={connectionStyles.fileList}
                  />
                </View>
              ):(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <CustomText
                    fontFamily='Okra-Bold'
                    numberOfLines={1}
                    fontSize={15}
                    color='#000' // Changed color to black
                  >
                    No files received yet.
                  </CustomText>
                </View>
              )
            )
          }

          {/* Position the back button relative to the SafeAreaView's top edge */}
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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ReceivedFilesScreen;