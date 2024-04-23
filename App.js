import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import SubscriberScreen from './components/SubscriberScreen';
import Dashboard from './components/Dashboard';
import AuthButton from './components/AuthButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './components/AuthContext';

const Stack = createNativeStackNavigator();

const App = () => {                                                                    
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ 
              title:"",
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Subscriber"
            component={SubscriberScreen}
            options={{ headerShown: true }}
          />
          {/* You can add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
