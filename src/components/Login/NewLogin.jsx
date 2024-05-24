import React, { useEffect, useState, useRef } from 'react'
import { Image, StyleSheet, View, Text, Pressable, KeyboardAvoidingView, BackHandler, ScrollView, StatusBar, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import { getResponsiveValue, height } from '../../styles/responsive';
import { BgColor } from '../../styles/colors';
import TwoWayPushButton from '../../adOns/molecules/TwoWayPushButton';
import PressButton from '../../adOns/atoms/PressButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import UserInput from '../../adOns/atoms/UserInput';
import PassInput from '../../adOns/atoms/PassInput';
import YesNoModal from '../../adOns/molecules/YesNoModal';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useProfile } from '../../context/ContextProvider';
import { getOtp } from '../../services/apiCall';
import FlashMessage from 'react-native-flash-message';
import { showNoty } from '../../common/flash/flashNotification';
import SmsRetriever from 'react-native-sms-retriever';
import SimCardsManagerModule from 'react-native-sim-cards-manager';
import PhoneNumberModal from '../../adOns/molecules/PhoneNumberModal';
import { OneSignal } from 'react-native-onesignal';
const NewLoginPage = () => {

    const navigation = useNavigation()
    const route = useRoute()
    let errOnRoute = route.params?.error
    const { profileState, profileDispatch } = useProfile()
    const [showModal, setShowModal] = useState(false)
    const [showPModal, setShowPModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState('Vendor')
    const flashRef = useRef(null)
    const [phone, setPhone] = useState('')
    const [phoneArray, setPhoneArray] = useState([])
    const [error, setError] = useState(errOnRoute || '')
    useEffect(() => {
        setError(errOnRoute)
    }, [errOnRoute])
    const [loading, setLoading] = useState(false)
    const [seconds, setSeconds] = useState(120)
    const [timer, setTimer] = useState(false)

    const handleYes = async () => {
        setShowModal(false);
        BackHandler.exitApp();
    };
    const startTimer = () => {
        setSeconds(10);
        setLoading(true)
        console.log('**')
        let interval = setInterval(() => {
            console.log('*')
            if (seconds <= 0) {
                clearInterval(interval);
            }
            setSeconds(prev => { return prev - 1 });

        }, 1000);
        setTimer(interval)
    }
    useEffect(() => {
        setError('')
        console.log('selected Option ', selectedOption)
        if (selectedOption === 'Vendor') {
            setError("Coming Soon ...")
        }
    }, [selectedOption])
    useEffect(() => {
        if (seconds <= 0) {
            setSeconds(120)
            setTimer(false)
            setLoading(false)
            setError('')
            clearInterval(timer)
        }
    }, [seconds])
    const SignUpPage = () => {
        navigation.navigate('SignupScreen')
    }
    const ForgetPage = () => {
        navigation.navigate('ForgetScreen')
    }
    const handleLogin = async () => {
        setLoading(true)

        try {
            if (selectedOption === 'Vendor') {
                setError("Coming Soon ...")
                showNoty("Vendor Module will soon be available", "info")
                setLoading(false)
                return
            }
            let phoneNo = phone
            console.log(phoneNo, phone);
            if (phone.startsWith("+91")) {
                phoneNo = phone.replace("+91","")
            }
            if (phone.startsWith("+1")) {
                phoneNo = phone.replace("+1","")
            }
            console.log(phoneNo, phone);
            if (phoneNo.length === 10) {
                let otpSent = await AsyncStorage.getItem('otpSent')
                otpSent = parseInt(otpSent)
                console.log('otp', otpSent)
                if (isNaN(otpSent) || (new Date().getTime() - new Date(otpSent).getTime()) >= 0.2 * 60 * 1000) {
                    console.log('OTPSENT ', otpSent, new Date(otpSent).getTime())
                    profileDispatch({
                        type: 'PHONE',
                        payload: phoneNo
                    })
                    let resObj = await getOtp(phoneNo, selectedOption)
                    await AsyncStorage.setItem('userIs', selectedOption)
                    await AsyncStorage.setItem('otpSent', new Date().getTime().toString())
                    if (resObj.status === 200) {
                        setLoading(false)
                        navigation.navigate('OTPScreen', { preOtp: undefined })
                    } else {
                        if (resObj.status === 202) {
                            showNoty(resObj.data.message, "info")
                            setTimeout(() => navigation.navigate('OTPScreen', { preOtp: resObj.data.otp }), 2000)
                            setLoading(false)
                        } else {
                            showNoty(resObj.data.message, "danger")
                            setLoading(false)
                        }
                    }
                } else {
                    setLoading(false)
                    startTimer()
                    setError(`OTP is triggered wait ...`)
                }
            } else {
                setError('Invalid Phone')
                setLoading(false)
            }
        } catch (error) {
            console.log('ERRROR CALLING PHONE OTP', error)

            setLoading(false)
        }
    }
    const _onPhoneNumberPressed = async () => {
        try {
            // const phoneNumber = await SmsRetriever.requestPhoneNumber();
            const phoneNumber = await SimCardsManagerModule.getSimCards({
                title: 'App Permission',
                message: 'Custom message',
                buttonNeutral: 'Not now',
                buttonNegative: 'Not OK',
                buttonPositive: 'OK',
            })
            // console.log(phoneNumber);
            setPhoneArray(phoneNumber)
            setShowPModal(true)
            return phoneNumber
        } catch (error) {
            console.log(JSON.stringify(error));
            return error
        }
    };
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
    
              } else {
                Alert.alert('Permission Denied', 'You cannot receive notifications');
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
        console.log("QWERTY");
        _onPhoneNumberPressed().then(data => { console.log(data);getPermission() }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const backFuntion = () => {
            if (showModal) {
                setShowModal(false)
            } else {
                setShowModal(true)
                return true
            }
        }

        console.log('BACKHANDLER ATTACHED')
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion)
        return () => {
            console.log('BACKHANDLER REMOVED')
            backHandler.remove()
        }
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlashMessage ref={flashRef} />
                    <View style={styles.loginpage}>
                        <YesNoModal
                            show={showModal}
                            setShow={setShowModal}
                            title={'EXIT ?'}
                            message={'Are You Sure Want To Exit ?'}
                            handleYes={handleYes}
                            yesText={'Exit'}
                            noText={'Cancel'} />

                        <PhoneNumberModal
                            show={showPModal}
                            setShow={setShowPModal}
                            title={"Choose Phone Number"}
                            phoneArray={phoneArray}
                            setPhone={setPhone}
                        />
                        <View style={styles.logoPart}>
                            <Image
                                source={require('../../assets/imgaes/DriverAppLogo.png')}
                                style={{ width: 300, height: 155 }}
                            />
                            <Text style={styles.title}>LogIn</Text>
                        </View>

                        <TwoWayPushButton option1={'Driver'} option2={'Vendor'} setter={setSelectedOption} />

                        <View style={styles.formpart}>
                        <TouchableOpacity onPress={()=>setShowPModal(true)}>
                            <UserInput
                                placeholder='Phone Number'
                                icon={'person'}
                                editable={false}
                                value={phone}
                                
                            /></TouchableOpacity>
                            {error !== '' ? <Text style={{ textAlign: 'center', marginTop: -15, marginBottom: 15, fontSize: 14, color: "red" }}>{error}</Text> : ''}
                            {/*<PassInput
                            placeholder='Password'
                        />
                        <View>
                            <Pressable onPress={ForgetPage}>
                                <Text style={styles.link}>Forgot Password?</Text>
                            </Pressable>
    </View>*/}
                            <PressButton
                                name='Log In'
                                onPress={handleLogin}
                                disabled={loading}
                                loading={loading}
                            />
                            {timer && <Text style={{ fontSize: 14, fontFamily: 'serif', color: 'red' }}>You can retry after {seconds} seconds</Text>}
                            {/*} <View style={styles.content}>
                            <View style={styles.signupContainer}>
                                <Text style={styles.createAccount}>Don't have an account?</Text>
                                <Pressable onPress={SignUpPage}>
                                    <Text style={styles.link}>Sign Up</Text>
                                </Pressable>
                            </View>
</View>*/}
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    loginpage: {
        display: 'flex',
        justifyContent: `center`,
        alignItems: 'center',
        backgroundColor: BgColor,
        height: height + StatusBar.currentHeight,
        gap: 25

    },
    logoPart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    title: {
        color: `black`,
        fontSize: 35,
        fontWeight: `500`,
    },
    formpart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        top: getResponsiveValue("4%", "4%"),
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: `black`,
        textDecorationLine: 'underline',
        fontSize: getResponsiveValue(18, 16),
        marginTop: getResponsiveValue("2%", "2%"),
        marginBottom: getResponsiveValue("2%", "2%"),
        fontWeight: `400`
        // marginBottom: 10,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    createAccount: {
        color: '#121212',
        fontSize: getResponsiveValue(18, 16),
        marginRight: 5,
    }
})
export default NewLoginPage
