import { View, Text, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import { requestPhotoPermission } from './src/utils/Constants'
import { checkFilePermissions } from './src/utils/libraryHelpers'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  useEffect(()=>{
    requestPhotoPermission();
    checkFilePermissions(Platform.OS)
  },[])
  return (
    // <View>
    //   <Text>App</Text>
    //   <Text>App</Text>
    //   <Text>App</Text>
      
    // </View>
<SafeAreaProvider>

  <Navigation/>
</SafeAreaProvider>
  )
}

export default App