import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const { isAuthenticated, user, isSubscriber, checkToken } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log("not authenticated");
            checkToken(); // Trigger token check
        } else if (isAuthenticated && user) {
            if (!isSubscriber) {
                navigation.navigate('Home');
            } // No else needed, as Auth buttons will be shown by default if isSubscriber is true
        }
    }, [isAuthenticated, user, isSubscriber, navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/welcome.png')} style={styles.logo} />
            <ActivityIndicator size="large" color="#0000FF" />
            {isAuthenticated && user && isSubscriber && (
                <View style={styles.buttonContainer}>
                    <Button title="Navigate Home" onPress={() => navigation.navigate('Home')} />
                    <Button title="Log Out" onPress={() => {/* Handle log out */}} />
                </View>
            )}
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
        marginBottom: 20,  // Add spacing between the logo and buttons
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});

export default SplashScreen;