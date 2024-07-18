import React, { useEffect } from 'react';
import { NativeModules, PermissionsAndroid, Platform, Linking, Alert,View, Text } from 'react-native';
// import blockApp from './bridges/blockApp';
const { DeviceAdmin } = NativeModules;
import IntentLauncher from 'react-native-intent-launcher';

async function requestUsageStatsPermission() {
  if (Platform.OS === 'android') {
    try {
      const isGranted = await DeviceAdmin.checkUsageStatsPermission();
      if (!isGranted) {
        IntentLauncher.startActivity({
          action: 'android.settings.USAGE_ACCESS_SETTINGS',
        });
      } else {
        console.log("Usage stats permission already granted");
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

async function activateDeviceAdmin() {
  if (Platform.OS === 'android') {
    DeviceAdmin.enableDeviceAdmin();
  }
}

async function checkDeviceAdmin() {
  if (Platform.OS === 'android') {
    try {
      const isActive = await DeviceAdmin.isDeviceAdminActive();
      console.log(`Device Admin Active: ${isActive}`); // This will print the actual value
    } catch (err) {
      console.error("Error checking device admin:", err);
    }
  }
}



const checkUsageAccess = () => {
  Alert.alert(
    "Enable Usage Access",
    "To block apps, please enable usage access in your phone's settings.",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Open Settings", onPress: () => Linking.openSettings() }
    ]
  );
};

const Test = () => {
  useEffect(() => {
    requestUsageStatsPermission();
    activateDeviceAdmin();
    checkDeviceAdmin();

    // blockApp('com.android.egg');
  }, []);

  return (
  <View>
    <Text>
      This is text component
    </Text>
  </View>)
};

export default Test;
