/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ContextProvider } from './src/context/ContextProvider';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/static/SplashScreen';
import LoginPage from './src/components/Login/Login';
import SignupScreen from './src/components/Login/SignUp';
import Forget from './src/components/Login/Forget';
import { BgColor } from './src/styles/colors';
import OtpScreen from './src/components/Login/OTP';
import NewPassword from './src/components/Login/NewPassword';
import HomePageDriver from './src/Driver/components/home/HomepageDriver';
import Settting from './src/Driver/components/setting/Settting';
import Wallet from './src/Driver/components/Wallet/Wallet';
import CustomDrawerContent from './src/Driver/common/drawer/CustomDrawerContent';
import Documents from './src/Driver/components/documents/Documents';
import History from './src/Driver/components/history/History';
import Message from './src/Driver/components/Message/Message';
import Notification from './src/Driver/components/Notification/Notification';
import MessageScreen from './src/Driver/components/Message/MessageScreen';
import NotificationFullPage from './src/Driver/components/Notification/NotificationFullPage';
import Profile from './src/Driver/components/profile/Profile';

import CustomDrawerContentVendor from './src/Vendor/common/drawer/CustomDrawerContentVendor';
import HomePageVendor from './src/Vendor/components/home/HomepageVendor';
import SettingVendor from './src/Vendor/components/setting/Settting';
import ProfileVendor from './src/Vendor/components/profile/Profile';
import MessageVendor from './src/Vendor/components/message/Message';
import MessageScreenVendor from './src/Vendor/components/message/MessageScreen';
import NotificationVendor from './src/Vendor/components/notification/Notification';
import NotificationFullPageVendor from './src/Vendor/components/notification/NotificationFullPage';
import Recharge from './src/Driver/components/Wallet/Recharge';
import LocalRequestHandler from './src/Driver/components/home/LocalRequestHandler';
import Intercity from './src/Driver/components/home/postBooking/Intercity';
import LocalForm from './src/Driver/components/home/postBooking/LocalForm';
import Rental from './src/Driver/components/home/postBooking/Rental';
import Sharing from './src/Driver/components/home/postBooking/Sharing';
import IntercityRequestHandler from './src/Driver/components/home/IntercityRequestHandler';
import IntercityRequestHandlerVendor from './src/Vendor/components/home/IntercityRequestHandlerVendor';
import Privacy from './src/Driver/common/Privacy/Privacy';
import Terms from './src/Driver/common/Terms&Condition/terms';
import PrivacyVendor from './src/Vendor/common/Privacy/PrivacyVendor';
import TermsVendor from './src/Vendor/common/Terms&Condition/termsVendor';
import FlashMessage from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActiveBooking from './src/Driver/components/active Booking/ActiveBooking';
import BidingPage from './src/Driver/components/active Booking/BidingPage';
import BookingAccepted from './src/Driver/components/active Booking/BookingAccepted';
import CloseBooking from './src/Driver/components/active Booking/CloseBooking';
import { OneSignal } from 'react-native-onesignal';
import NewLoginPage from './src/components/Login/NewLogin';
import EditableOTPInput from './src/adOns/molecules/EditableOTPInput';
import NewOtpScreen from './src/components/Login/NewOTP';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

function DrawerNavigatorDriver() {

  return (
    <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => <CustomDrawerContent {...props} />} backBehavior="history">
      <Drawer.Screen name="Home" component={HomePageDriver} options={{ headerShown: false }} />
      <Drawer.Screen name="Intercity" component={Intercity} options={{ headerShown: false }} />
      <Drawer.Screen name="Local" component={LocalForm} options={{ headerShown: false }} />
      <Drawer.Screen name="Sharing" component={Sharing} options={{ headerShown: false }} />
      <Drawer.Screen name='Bidding' component={BidingPage} options={{ headerShown: false }} />
      <Drawer.Screen name="Rental" component={Rental} options={{ headerShown: false }} />
      <Drawer.Screen name="Recharge" component={Recharge} options={{ headerShown: false }} />
      <Drawer.Screen name="ActiveBooking" component={ActiveBooking} options={{ headerShown: false }} />
      <Drawer.Screen name="BookingAccepted" component={BookingAccepted} options={{ headerShown: false }} />
      <Drawer.Screen name="LocalRequestHandler" component={LocalRequestHandler} options={{ headerShown: false }} />
      <Drawer.Screen name="IntercityRequestHandler" component={IntercityRequestHandler} options={{ headerShown: false }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Drawer.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
      <Drawer.Screen name="Setting" component={Settting} options={{ headerShown: false }} />
      <Drawer.Screen name="Document" component={Documents} options={{ headerShown: false }} />
      <Drawer.Screen name="History" component={History} options={{ headerShown: false }} />
      <Drawer.Screen name='message' component={Message} options={{ headerShown: false }} />
      <Drawer.Screen name='notification' component={Notification} options={{ headerShown: false }} />
      <Drawer.Screen name='notificationScreen' component={NotificationFullPage} options={{ headerShown: false }} />
      <Drawer.Screen name='messageScreen' component={MessageScreen} options={{ headerShown: false }} />
      <Drawer.Screen name='Privacy' component={Privacy} options={{ headerShown: false }} />
      <Drawer.Screen name='Terms' component={Terms} options={{ headerShown: false }} />
      <Drawer.Screen name='CloseBooking' component={CloseBooking} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

function DrawerNavigatorVendor() {

  return (
    <Drawer.Navigator initialRouteName='HomeVendor' drawerContent={(props) => <CustomDrawerContentVendor {...props} />} backBehavior="history">
      <Drawer.Screen name="HomeVendor" component={HomePageVendor} options={{ headerShown: false }} />
      <Drawer.Screen name="ProfileVendor" component={ProfileVendor} options={{ headerShown: false }} />
      <Drawer.Screen name="MessageVendor" component={MessageVendor} options={{ headerShown: false }} />
      <Drawer.Screen name="MessageScreenVendor" component={MessageScreenVendor} options={{ headerShown: false }} />
      <Drawer.Screen name="NotificationVendor" component={NotificationVendor} options={{ headerShown: false }} />
      <Drawer.Screen name="NotificationFullPageVendor" component={NotificationFullPageVendor} options={{ headerShown: false }} />
      <Drawer.Screen name="SettingVendor" component={SettingVendor} options={{ headerShown: false }} />
      <Drawer.Screen name="IntercityRequestHandlerVendor" component={IntercityRequestHandlerVendor} options={{ headerShown: false }} />
      <Drawer.Screen name='Privacy' component={PrivacyVendor} options={{ headerShown: false }} />
      <Drawer.Screen name='Terms' component={TermsVendor} options={{ headerShown: false }} />
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

  const isTokenAvailable = async () => {
    let token = await AsyncStorage.getItem('token')
    console.log("TOKEN ", token)
    if (token !== null && token !== undefined) {
      return true
    }
    return false
  }
  const getPermission = () => {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'This app needs access to send you notifications',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Allow',
        },
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //   Alert.alert('Permission Granted', 'You can now receive notifications');
          OneSignal.initialize("6a48b3bc-d5bd-4246-9b8e-d453e8373a70")
          OneSignal.Notifications.addEventListener('click', (event) => {
            console.log('OneSignal: notification clicked:', event);
          });
          OneSignal.Notifications.addEventListener('received', (event) => {
            console.log('OneSignal: notification clicked:', event);
          });
          setIsLoading(false); 
          // OneSignal.initialize('6a48b3bc-d5bd-4246-9b8e-d453e8373a70')
        } else {
          if (Platform.OS === 'android' && Platform.Version < 33) {
            OneSignal.initialize("6a48b3bc-d5bd-4246-9b8e-d453e8373a70")
            OneSignal.Notifications.addEventListener('click', (event) => {
              console.log('OneSignal: notification clicked:', event);
            });
            OneSignal.Notifications.addEventListener('received', (event) => {
              console.log('OneSignal: notification clicked:', event);
            });
            setIsLoading(false); 
          } else {
            Alert.alert('Permission Denied', 'You cannot receive notifications');
            setIsLoading(false); 
          }
        }
      })
        .catch(err => {
          console.log("PERMISSION ERROR ", err);
        })
    } catch (error) {
      console.log("ERROR IN PERMISSIONS ", error)
    }
  }

  useEffect(() => {
    isTokenAvailable().then(async is => {
      if (is) {
        userIs().then(data => {
          console.log('USER TYPE IS ', data)
          if (data === 'Vendor') {
            setInitialRoute('HomeSceen')
          }
          if (data === 'Driver') {
            setInitialRoute('HomeSceenDriver')
          }
        }).catch(err => {
          console.log('ERROR IN RESOLVING USER TYPEs')
        })
      } else {

      }
    })


    setTimeout(() => {
      getPermission()
      // Set isLoading to false when the loading task is complete
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
              component={NewLoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ForgetScreen'
              component={Forget}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='OTPScreen'
              component={NewOtpScreen}
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
              name='HomeSceenVendor'
              component={DrawerNavigatorVendor}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='HomeSceenDriver'
              component={DrawerNavigatorDriver}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>)}

        </NavigationContainer>
      </ContextProvider>
      <FlashMessage />
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
