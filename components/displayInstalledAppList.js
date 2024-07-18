import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getInstalledApps } from './InstalledAppsModule';

const AppList = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const installedApps = await getInstalledApps();
      setApps(installedApps);
    };
    fetchApps();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={apps}
        keyExtractor={(item) => item.packageName}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.appName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default AppList;
