import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SectionList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';  // Adjust the path as needed
import NetInfo from "@react-native-community/netinfo";

const HomeScreen = () => {
  const { user, tracks, authenticate } = useAuth();
  const navigation = useNavigation();
  const [groupedTracks, setGroupedTracks] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert("No Internet Connection", "Please check your internet connection.");
      }
    });

    if (tracks) {
      const levels = Object.entries(tracks.reduce((acc, track) => {
        const level = `Primary ${track.level_id - 1}`;  // Adjust level display here
        if (!acc[level]) acc[level] = [];
        acc[level].push({
          ...track,
          skills: track.skills || []
        });
        return acc;
      }, {})).map(([title, data]) => ({title, data}));

      setGroupedTracks(levels);
    }

    if (!user) {
      Alert.alert("Authentication Required", "You need to log in to access this page.", [
        { text: "Log In", onPress: authenticate }
      ]);
    }

    return () => unsubscribe();
  }, [user, tracks, authenticate]);

  if (!user || !tracks) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <SectionList
      sections={groupedTracks}
      keyExtractor={(item, index) => item.id + index}
      renderItem={({ item }) => (
        <View style={styles.trackContainer}>
          <Text style={styles.trackTitle}>{item.description}</Text>
          {item.skills.map((skill, index) => (
            <Text key={skill.id} style={styles.skillText}>
              {index + 1}. {skill.description}
            </Text>
          ))}
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.levelHeader}>{title}</Text>
      )}
      stickySectionHeadersEnabled
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  levelHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FF0000',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  trackContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  skillText: {
    fontSize: 12,
    paddingLeft: 10,
    marginBottom: 2,
  },
});

export default HomeScreen;
