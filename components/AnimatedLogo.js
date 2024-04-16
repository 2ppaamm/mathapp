import React, { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

const AnimatedLogo = ({ onAnimationComplete, showButton }) => {
  const logoScale = useRef(new Animated.Value(1)).current;
  const [showFinalGif, setShowFinalGif] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(logoScale, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true
      }).start(() => {
        setShowFinalGif(true);
        setTimeout(() => {
          onAnimationComplete();  // Call to show the button after 1 second
        }, 1000);
      });
    }, 500);
  }, [onAnimationComplete]);

  return (
    <Animated.Image
      source={showFinalGif ? require('../assets/welcome.png') : require('../assets/start.gif')}
      style={[styles.logo, { transform: [{ scale: logoScale }] }]}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
});

export default AnimatedLogo;
