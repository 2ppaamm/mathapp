import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext'; // Update the path to where your AuthContext is defined

function AuthButton() {
  const { authenticate } = useContext(AuthContext);

  const handlePress = () => {
    authenticate();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Login or Register</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    margin: 10,
    padding: 10,
    backgroundColor: '#960000',
    borderRadius: 8,
    width: '90%',
    bottom: '5%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default AuthButton;