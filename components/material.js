import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Text, TextInput, Button, Snackbar, blue900 } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSnack, setSnackStatus] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);

  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
  };
  const cancel = () => {
    setSnackStatus(false);
  };

  useEffect(() => {
    if (user.status == 201) {
      navigation.navigate('test'); // Replace 'Home' with your target route name
    }else if(user.state == 203){
      setSnackStatus(true);
    }

  }, [authStatus, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/aaa.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText} variant="titleLarge">Login</Text>

          <TextInput
            style={styles.input}
            label="Please input username or email"
            value={username}
            onChangeText={setUsername}
            keyboardType="Text"
            autoCapitalize="none"
            mode="outlined"
          />
          <TextInput
            style={styles.input}
            label="Please input password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={handleLogin}
       
          >
            Login
          </Button>
          <Text variant='titleMedium'>If you haven't account, go to  <Text style={styles.signUp} onPress={() => navigation.navigate('signup')}>Sign Up!</Text></Text>
        </View>
        <Snackbar
            visible={ showSnack }
            onDismiss={ cancel }
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
            You are unatherized!
      </Snackbar>
      </ImageBackground>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signUp: {
    textDecorationLine: "underline",
    color: blue900
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

export default LoginScreen;