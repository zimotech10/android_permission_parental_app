// components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {logout} from '../store/slices/authSlice';


const Header = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    

    const gologout =() => {
        logout();
        navigation.navigate('Login');
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={gologout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 60,
        backgroundColor: '#320281', // Example background color
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#cc0000', // Example button color
    },
    logoutButtonText: {
        fontSize: 16,
        color: 'white',
    },
});

export default Header;
