import React, { useEffect, useMemo,memo, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Alert, FlatList,SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';  // Adjust the path as needed
import SkillList from './SkillList';
import {getColor} from '../utils/helper';


const HomeScreen = () => {
  const { authenticate } = useAuth();
  const navigation = useNavigation();
  const [groupedTracks, setGroupedTracks] = useState([]);
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState(null);
  useEffect(() => {
    const fetchDataFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        const storedTracks = await AsyncStorage.getItem('trackData');
        if (storedUser && storedTracks) {
          const parsedUser = JSON.parse(storedUser);
          const parsedTracks = JSON.parse(storedTracks);
          setUser(parsedUser);
          setTracks(parsedTracks);
          organizeTracks(parsedTracks);
        } else {
          console.log("No user or tracks found in storage, authenticating.");
          authenticate();
        }
      } catch (error) {
        console.error('Failed to load data from storage:', error);
        Alert.alert("Data Error", "Failed to load user data.");
      }
    };

    fetchDataFromStorage();
  }, []);

  const organizeTracks = (tracks) => {
    const levels = tracks.reduce((acc, track) => {
      const level = `Primary ${track.level_id - 1}`;
      if (!acc[level]) acc[level] = [];
      acc[level].push({
        ...track,
        skills: track.skills || []
      });
      return acc;
    }, {});
    setGroupedTracks(Object.entries(levels).map(([title, data]) => ({title, data})));
  };

  if (!user || !tracks) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }

 


  return (
    <SafeAreaView style={styles.container}>
    <SectionList
      sections={groupedTracks}
      initialNumToRender={1}
      keyExtractor={(item, index) => item.id + index}
      renderItem={({item,section})=><SkillList item={item} section={section} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={[styles.levelHeader, {backgroundColor: getColor(title)}]}>{title}</Text>
      )}
      stickySectionHeadersEnabled
      removeClippedSubviews={true}

    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  levelHeader: {
    fontSize: 16,
     color: '#fff',
    textAlign: 'center',
    paddingVertical: 4, 
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
