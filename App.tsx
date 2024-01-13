/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ContextProvider } from './src/context/ContextProvider';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomePage from './src/components/home/Home';
import ProfilePage from './src/components/profile/Profile';
import SplashScreen from './src/screens/static/SplashScreen';
import LoginPage from './src/components/Login/Login';
import SignupScreen from './src/components/Login/SignUp';
import Forget from './src/components/Login/Forget';
import { BgColor } from './src/styles/colors';
import OtpScreen from './src/components/Login/OTP';
import NewPassword from './src/components/Login/NewPassword';
import AuthenticatedLayout from './src/screens/layout/AuthenticatedLayout';

const Stack = createNativeStackNavigator()

function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when the loading task is complete
    }, 2500); // Simulate loading for 2 seconds, replace this with your actual loading logic
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ContextProvider>
        <NavigationContainer >
          <StatusBar barStyle="dark-content" backgroundColor="#ffea00" />
          {isLoading ? (
            <SplashScreen />
          ) : (<Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',

            }}
          >
            <Stack.Screen
              name='LoginScreen'
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ForgetScreen'
              component={Forget}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='OTPScreen'
              component={OtpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='NewPassScreen'
              component={NewPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SignupScreen'
              component={SignupScreen}
              options={{ headerShown: false }}
            />
              <Stack.Screen
                name='HomeSceen'
                component={HomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name='ProfileScreen'
                component={ProfilePage}
                options={{ headerShown: false }}
              />
          </Stack.Navigator>)}
        </NavigationContainer>
      </ContextProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BgColor
  }
})

export default App;
