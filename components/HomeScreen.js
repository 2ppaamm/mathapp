import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, SectionList, Alert, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';  // Adjust the path as needed

const colors = ['#960000', '#d0acac', '#FFC0AC', '#E64646', '#FFD700'];  // Add more colors as needed

const getColor = (title) => {
  const index = parseInt(title.split(" ")[1]) % colors.length;
  return colors[index];
};

const  SkillList=(props)=>{
  const {item,section}=props;
  return (
    <View style={[styles.trackContainer, {backgroundColor: getColor(section.title)}]}>
    <Text style={styles.trackTitle}>{item.description}</Text>
    <View style={styles.skillsContainer}>

      <FlatList
        data={item.skills}
        keyExtractor={(skill, skillIndex) => skill.id}
        renderItem={({ item,index }) => (
          <View key={item.id} style={[
            styles.skillBox, 
            {marginLeft: (index % 2 === 0 ? 30 : -30) * (index % 3)}
          ]}>
          <Text style={styles.skillText}>
            {item.description}
          </Text>
        </View>
        )}
      />
    </View>
  </View>
  )
}


const HomeScreen = () => {
  const { authenticate } = useAuth();
  const navigation = useNavigation();
  const [groupedTracks, setGroupedTracks] = useState([]);
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState(null);
  useEffect(() => {
    console.log("section llist ---")
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
  }, [authenticate]);

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
    <SectionList
      sections={groupedTracks}
      keyExtractor={(item, index) => item.id + index}
      renderItem={({item,section})=><SkillList item={item} section={section} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={[styles.levelHeader, {backgroundColor: getColor(title)}]}>{title}</Text>
      )}
      stickySectionHeadersEnabled
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    marginBottom: 20,
    padding: 10,
    // backgroundColor set dynamically
  },
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
  trackContainer: {
    marginBottom: 20,
    padding: 0,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
    color: 'white',
  },
  skillsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff', // White background for skills container
  },
  skillBox: {
    width: 100, // Set width for the circle
    height: 100, // Set height to the same as width to form a circle
    borderRadius: 50, // Half of width/height to fully round the corners into a circle
    backgroundColor: '#eee', // Background color of the circle
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    marginHorizontal: 10, // Provide horizontal spacing between circles
    marginBottom: 10, // Provide bottom margin
  },

  skillText: {
    fontSize: 12,
  },
});

export default HomeScreen;
