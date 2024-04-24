import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import AuthButton from './AuthButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext';

const AuthScreen = () => {
    const [showButton, setShowButton] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const checkRepeatUser = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            userToken ? navigation.navigate('Home') : setShowButton(true);
        };

        checkRepeatUser();
    }, []);

    return (
        <View style={styles.container}>
                        <Image source={require('../assets/welcome.png')} style={styles.logo} />
            {showButton && <AuthButton />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,  // Add spacing between the logo and buttons
    },
});

export default AuthScreen;
