import React, {memo } from 'react';

import { View, Text, StyleSheet } from 'react-native';

const   SkillItem=(props)=>{
    const {item}=props;

        return (
        <View key={item.item.id} style={[
            styles.skillBox, 
            {marginLeft: (item.index % 2 === 0 ? 30 : -30) * (item.index % 3)}
          ]}>
          <Text style={styles.skillText}>
            {item.item.description}
          </Text>
        </View>
    )
  }

  export default memo(SkillItem)

  const styles = StyleSheet.create({
   
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