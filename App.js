
import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

// import CaptureScreen
import { captureScreen } from 'react-native-view-shot';
import GestureRecognizer from 'react-native-swipe-detect';
LogBox.ignoreAllLogs()
const App = () => {
  const [imageURI, setImageURI] = useState("");
  const [savedImagePath, setSavedImagePath] = useState('');
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const takeScreenShot = async () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      (uri) => {
        setSavedImagePath(uri);
        setImageURI(uri);
        const r = MediaLibrary.saveToLibraryAsync(uri);
        if (uri) {
          alert("Screenshot Saved!");
        }
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipeUp={takeScreenShot}
      onSwipeDown={takeScreenShot}
      onSwipeLeft={takeScreenShot}
      onSwipeRight={takeScreenShot}
      config={config}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>

          <Image
            source={{ uri: imageURI }}
            style={{
              width: 200,
              height: 300,
              resizeMode: 'contain',
              marginTop: 5
            }}
          />
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={takeScreenShot}>
            <Text style={{ color: 'white' }}>
              Take Screenshot
            </Text>
          </TouchableOpacity>
          <Text >
            {
              savedImagePath ?
                `Saved Image Path\n ${savedImagePath}` : ''
            }
          </Text>
        </View>
      </SafeAreaView>
    </GestureRecognizer>

  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    marginTop: 50
  },
  buttonStyle: {
    backgroundColor: 'black',
    padding: 5,
  }
});