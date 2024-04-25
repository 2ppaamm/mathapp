import React, {memo } from 'react';

import { View, Text, StyleSheet,FlatList } from 'react-native';
import SkillItem from './SkillItem';
import { getColor } from '../utils/helper';

const   SkillList=( {item,section})=>{
    return (
      <View style={[styles.trackContainer, {backgroundColor: getColor(section.title)}]}>
      <Text style={styles.trackTitle}>{item.description}</Text>
      <View style={styles.skillsContainer}>
        <FlatList
          data={item.skills}
          keyExtractor={(skill) => skill.id}
          renderItem={(item,index)=><SkillItem item={item} index={index}/>}
        />
      </View>
    </View>
    )
  }

  export default memo(SkillList)

  const styles = StyleSheet.create({
    trackContainer: {
        marginBottom: 20,
        padding: 10,
        // backgroundColor set dynamically
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
      }
  });