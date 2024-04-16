import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = await AsyncStorage.getItem('userToken');
            token ? navigation.navigate('Home') : navigation.navigate('Auth');
        };

        checkAuthentication();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/splash.gif')} style={styles.logo} />
            <ActivityIndicator size="large" color="#0000FF" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    logo: {
        width: 200,
        height: 200,
    }
});

export default Dashboard;
