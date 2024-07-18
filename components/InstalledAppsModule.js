import { NativeModules } from 'react-native';
const { InstalledApps } = NativeModules;

export const getInstalledApps = async () => {
  try {
    const apps = await InstalledApps.getInstalledApps();
    return apps;
  } catch (e) {
    console.error(e);
    return [];
  }
};
