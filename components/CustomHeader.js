import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // You can choose any suitable icon pack

const CustomHeader = ({ backgroundColor }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.button}>
        <Icon name="account-circle" size={24} color="#FFF" />
        <Text style={styles.iconText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="treasure-chest" size={24} color="#FFF" />
        <Text style={styles.iconText}>Kudos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="calculator-variant" size={24} color="#FFF" />
        <Text style={styles.iconText}>Maxile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56, // Standard height for material design toolbars
  },
  button: {
    alignItems: 'center',
  },
  iconText: {
    color: '#FFF',
    fontSize: 10,
  },
});

export default CustomHeader;
