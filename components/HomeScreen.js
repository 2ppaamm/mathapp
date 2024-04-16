import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthContext';

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const { isAuthenticated, authenticate } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        if (!parsedUser.diagnostic) {
          navigation.navigate('Dashboard');
        }
      } else if (!isAuthenticated) {
        // Prompt user to login if not authenticated or userData not found
        Alert.alert('Authentication Required', 'Please log in to continue.', [
          { text: 'OK', onPress: authenticate }
        ]);
      }
    };

    fetchData();
  }, [navigation, isAuthenticated]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user data or please log in...</Text>
        <Button title="Log In" onPress={authenticate} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/welcome.png')} style={styles.logo} />
      <Text style={styles.greeting}>Welcome back, <Text style={styles.boldText}>{user.firstname || user.email || 'User'}</Text></Text>
      {user.diagnostic ? (
        <View>
          <Button title="Go to Diagnostic Test" onPress={() => navigation.navigate('Diagnostic')} />
          <Button title="Continue to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
        </View>
      ) : (
        <Button title="Continue to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  }
});

export default HomeScreen;
