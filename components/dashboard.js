
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getInstalledApps } from './InstalledAppsModule.js';
import { appsToServer } from '../store/slices/authSlice.js'
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, message: 'Logged in successfully', timestamp: '10:00 AM' },
  { id: 2, message: 'Error: Connection timed out', timestamp: '11:30 AM' },
  // Add more log items as needed
];

const DashBoard = () => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);


  useEffect(() => {
    if (user.status == 201) {
      navigation.navigate('dashboard'); // Replace 'Home' with your target route name
    }else if(user.state == 203){
      setSnackStatus(true);
    }
    let apps = getInstalledApps();
    dispatch(appsToServer({ "installedapps": apps }));


  }, [authStatus, navigation]);


  const renderItem = ({ item }) => (
    <List.Item
      title={item.message}
      description={item.timestamp}
      titleNumberOfLines={2}
      descriptionNumberOfLines={1}
      titleStyle={{ color: colors.text }}
      descriptionStyle={{ color: colors.text }}
      style={styles.item}
    />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF', // Background color for the list container
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Border color for each item
  },
});

export default DashBoard;
