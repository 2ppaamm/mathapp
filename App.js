import React, { useEffect,useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import SubscriberScreen from './components/SubscriberScreen';
import Dashboard from './components/Dashboard';
import AuthButton from './components/AuthButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';
const Stack = createNativeStackNavigator();


const NavigationStack =()=>{
  const { isAuthenticated, user, isSubscriber, checkToken,isoAuthCancle} = useAuth();

  useEffect(()=>{
    console.log("move to auth stack",isoAuthCancle)
  },[isoAuthCancle])
  
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      {
        isoAuthCancle ? (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />):(      <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ 
            title:"",
            headerShown: false
          }}
        />)
      }


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
  )
}

const App = () => {          
                                                          
  return (
    <AuthProvider>
   <NavigationStack
   
   />
    </AuthProvider>
  );
};

export default App;
