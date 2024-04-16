// CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ children, style, ...props }) => (
  <Text style={[styles.default, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Montserrat_300Regular',
    fontSize: 16,
  },
});

export default CustomText;
