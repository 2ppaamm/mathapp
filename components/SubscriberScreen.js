import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationButtons from './NavigationButtons';

const SubscriberScreen = () => {
  const [user, setUser] = useState(null);
  const [groupedTracks, setGroupedTracks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem('user');
      const tracksData = await AsyncStorage.getItem('tracks');
      if (userData) setUser(JSON.parse(userData));
      if (tracksData) organizeTracks(JSON.parse(tracksData));
      console.log(tracksData);
    };

    fetchData();
  }, []);

  const organizeTracks = (tracks) => {
    const grouped = tracks.reduce((acc, track) => {
      const levelKey = `Primary ${track.level_id}` || 'Kindy';
      if (!acc[levelKey]) {
        acc[levelKey] = [];
      }
      acc[levelKey].push(track);
      return acc;
    }, {});

    setGroupedTracks(grouped);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../assets/start.gif')} style={styles.logo} />
      <Text style={styles.greeting}>Welcome back to your subscription, <Text style={styles.boldText}>{user ? (user.firstname || user.email) : 'User'}</Text></Text>
      <View style={styles.container}>
        <NavigationButtons />
      </View>
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
  },
  levelContainer: {
    marginTop: 20,
  },
  levelHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trackItem: {
    fontSize: 14,
    color: '#666',
  }
});

export default SubscriberScreen;
