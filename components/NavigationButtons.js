// NavigationButtons.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const buttonStyles = StyleSheet.create({
  continue: { backgroundColor: "#960000", padding: 20, alignItems: 'center', marginBottom: 10 },
  testSkills: { backgroundColor: "#E64646", padding: 20, alignItems: 'center', marginBottom: 10 },
  subjectSelect: { backgroundColor: "#FFC0AC", padding: 20, alignItems: 'center', marginBottom: 10 }
});

const NavigationButtons = () => {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View>
      <TouchableOpacity style={buttonStyles.continue} onPress={() => handleNavigate('ContinueScreen')}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continue</Text>
        <Text style={{ color: '#fff' }}>Start where you left off</Text>
      </TouchableOpacity>

      <TouchableOpacity style={buttonStyles.testSkills} onPress={() => handleNavigate('TestSkillsScreen')}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Test your skills</Text>
        <Text style={{ color: '#fff' }}>Random Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={buttonStyles.subjectSelect} onPress={() => handleNavigate('SubjectSelectScreen')}>
        <Text style={{ color: '#000', fontWeight: 'bold' }}>Subject Select</Text>
        <Text style={{ color: '#000' }}>Practice any subject</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationButtons;
