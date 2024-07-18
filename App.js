//import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import store from './store/store.js';
import { Provider as ReduxProvider } from 'react-redux';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axiosInstance from './components/axiosInstance.js';

//componets
import LoginScreen from './components/material.js';
import HomeScreen from './components/homeScreen.js';
import LiveTV from './components/livetv.js';
import Movies from './components/movies.js';
import Series from './components/series.js';
import Others from './components/others.js';
import Settings from './components/settings.js';
import Register from './components/register.js';
// import AppList from './components/displayInstalledAppList.js';
import DashBoard from './components/dashboard.js';
import Test from './components/testCom.js';

const Stack = createNativeStackNavigator();

export default function App() {

  
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" style={styles.container}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="signup" component={Register} />
            <Stack.Screen name="dashboard" component={DashBoard} />
            <Stack.Screen name="test" component={Test} />
          </Stack.Navigator>  
         
      </NavigationContainer>
    </ReduxProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});

