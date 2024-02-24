/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ContextProvider } from './src/context/ContextProvider';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import HomePage from './src/Vendor/home/Home';
import ProfilePage from './src/components/profile/Profile';
import SplashScreen from './src/screens/static/SplashScreen';
import LoginPage from './src/components/Login/Login';
import SignupScreen from './src/components/Login/SignUp';
import Forget from './src/components/Login/Forget';
import { BgColor } from './src/styles/colors';
import OtpScreen from './src/components/Login/OTP';
import NewPassword from './src/components/Login/NewPassword';
import HomePageDriver from './src/Driver/components/home/HomepageDriver';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settting from './src/Driver/components/setting/Settting';
import Wallet from './src/Driver/components/Wallet/Wallet';
import CustomDrawerContent from './src/Driver/common/drawer/CustomDrawerContent';
import Documents from './src/Driver/components/documents/Documents';
import History from './src/Driver/components/history/History';
import Message from './src/Driver/components/Message/Message';
import Notification from './src/Driver/components/Notification/Notification';
import MessageScreen from './src/Driver/components/Message/MessageScreen';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  return (
    <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => <CustomDrawerContent {...props} />} backBehavior="history">
      <Drawer.Screen name="Home" component={HomePageDriver} options={{ headerShown: false }} />
      <Drawer.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
      <Drawer.Screen name="Setting" component={Settting} options={{ headerShown: false }} />
      <Drawer.Screen name="Document" component={Documents} options={{ headerShown: false }} />
      <Drawer.Screen name="History" component={History} options={{ headerShown: false }} />
      <Drawer.Screen name='message' component={Message} options={{ headerShown: false }} />
      <Drawer.Screen name='notification' component={Notification} options={{ headerShown: false }} />
      <Drawer.Screen name='messageScreen' component={MessageScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

function App() {


  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('LoginScreen')

  const userIs = async function () {
    let temp = await AsyncStorage.getItem('userIs')
    return temp
  }

  useEffect(() => {
    // userIs().then(data => {
    //   console.log('USER TYPE IS ', data)
    //   if (data === 'Vendor') {
    //     setInitialRoute('HomeSceen')
    //   }
    //   if (data === 'Driver') {
    //     setInitialRoute('HomeSceenDriver')
    //   }
    // }).catch(err => {
    //   console.log('ERROR IN RESOLVING USER TYPEs')
    // })
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
            initialRouteName={initialRoute || "LoginScreen"}
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
              name='HomeSceenDriver'
              component={DrawerNavigator}
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
