import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/authSlice';
// import { loginWithoutCridential } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from './axiosInstance';

// Retriving cell phone's UUID or unique number
import DeviceInfo from 'react-native-device-info';
import {sha256} from 'react-native-sha256';


const RegisterScreen = () => {
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPass] = useState('');
  const [email, setEmail] = useState('');
  const [parent_email, setParentEmail] = useState('');
  const [role_id, setRole] = useState(2);
  const [showSnack, setSnackStatus] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const authStatus = useSelector((state) => state.auth.status);
  
  const user = useSelector((state) => state.auth.user);

  const handleRegister = () => {
      dispatch(register({ name, email, parent_email, password_confirmation, password, role_id }));
  };
  const toggleSnack = () => {
    setSnackStatus(false);
  };

  useEffect(() => {
    console.log("oddessa11",user)
    if (user.status == 201) {
      navigation.navigate('dashboard'); // Replace 'Home' with your target route name
    }else if(user.status == 203){
      setSnackStatus(true);
    }

  }, [authStatus, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/aaa.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText} variant="titleLarge">Sign Up</Text>
          <TextInput
            style={styles.input}
            label="username"
            value={name}
            onChangeText={setUsername}
            keyboardType="Text"
            autoCapitalize="none"
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email"
            autoCapitalize="none"
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="parent email"
            value={parent_email}
            onChangeText={setParentEmail}
            keyboardType="email"
            autoCapitalize="none"
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="password"
            value={password}
            onChangeText={setPassword}
            keyboardType="Text"
            secureTextEntry
            autoCapitalize="none"
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="confirm password"
            value={password_confirmation}
            onChangeText={setConfirmPass}
            keyboardType="Text"
            secureTextEntry
            autoCapitalize="none"
            mode="outlined"
          />
          
          <Button
            mode="contained"
            onPress={handleRegister}
          >
            Sign Up
          </Button>
          {/* <Text variant='titleMedium'>Device Key :  {deviceId}</Text> */}
        </View>
        <Snackbar
            visible={ showSnack }
            onDismiss={ toggleSnack }
            action={{
              label: 'Dismiss',
              onPress: () => {
                // Do side magic
              },
            }}
            duration={
              Snackbar.DURATION_LONG
            }
          >
            You are not autherized!
      </Snackbar>
      </ImageBackground>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust width as needed
    alignItems: 'center',
  },
  overlayText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
  },
  button: {
    width: '100%',
    marginTop: 10,
  },
  uuid: {

  }
});

export default RegisterScreen;