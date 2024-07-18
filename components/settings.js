import React, {useEffect} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Text, Divider } from 'react-native-paper';
import axiosInstance from './axiosInstance';
import { useSelector } from 'react-redux';

import Header from './header';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  
    const user = useSelector((state)=>state.auth.user);
    const parseDeviceStatus = (deviceStatus)=>{
        console.log(typeof deviceStatus, deviceStatus)
        switch(deviceStatus){
            case 1:
                return 'trial';
            case 2:
                return 'active';
            case 3:
                return 'deactive';
            default:
                return '-';
        }
         
    }
     
    return (
        <View style={styles.outerContainer}>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <Text variant='titleMedium' style={styles.categories}>Device Info</Text>
                <Divider style={styles.divider} />
                <TextInput
                    label='Brand name'
                    style={styles.input}
                    value={user.brand_name}
                    underlineColor='white'
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label='Email'
                    style={styles.input}
                    value={user.email}
                    underlineColor='white'
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label='Username'
                    style={styles.input}
                    value={user.username}
                    underlineColor='white'
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label='Status'
                    style={styles.input}
                    value={parseDeviceStatus(user.device_status)}
                    underlineColor='white'
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label='Password'
                    style={styles.input}
                    value={user.password}
                    underlineColor='white'
                    activeUnderlineColor='blue'
                />
                <TextInput
                    label='Device expiration date'
                    style={styles.input}
                    value={user.expire_date}
                    underlineColor='white'
                    activeUnderlineColor='blue'
                />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Ensures a contrasting background
    },
    container: {
        padding: 20,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
    },
    categories: {
        color: 'gray',
        marginBottom: 10,
    },
    divider: {
        marginBottom: 20,
        backgroundColor: 'blue', // Ensure it contrasts with the background
        height: 1, // Ensure it has a height
    },
});

export default Settings;
