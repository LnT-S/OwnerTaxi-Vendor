import React, { useState, useEffect, useRef, useCallback } from 'react'
import { KeyboardAvoidingView, TouchableOpacity, View, Image, StyleSheet, Text, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from '../../styles/colors';
import global from '../../styles/global'
import { getResponsiveValue } from '../../styles/responsive';
import OTPInput from '../../adOns/molecules/OTPInput';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import PressButton from '../../adOns/atoms/PressButton';
import SmsListener from 'react-native-android-sms-listener'
// import SmsRetriever from 'react-native-sms-retriever';
import { request, PERMISSIONS } from 'react-native-permissions';
import { useProfile } from '../../context/ContextProvider';
import { getOtp, verifyOtp } from '../../services/apiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditableOTPInput from '../../adOns/molecules/EditableOTPInput';

const NewOtpScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const { profileState, profileDispatch } = useProfile()
    const [otp, setOTP] = useState('')
    const [sended, setSended] = useState(false)
    const [showVerify, setShowVerify] = useState(true)


    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [timer, setTimer] = useState(50)

    const decreementTimer = () => {
        setTimeout(() => {
            console.log("TIMER ....");
            setTimer(timer - 1)
        }, 1000)
    }
    useEffect(() => {
        if (timer > 0 && sended === true) {
            decreementTimer()
        } else {
            setSended(false)
            setShowVerify(true)
        }
    }, [timer])
    const handleResend = async () => {
        if (!sended) {
            setTimer(50);
            getOtp(profileState.phone, "Driver")
                .then(data => {
                    console.log(data.data.message);
                    setSended(true)
                    setShowVerify(true)
                    decreementTimer()
                })
                .catch(err => {
                    console.log(err);
                })
        } else {

        }
    }
    const handleVerifyOtp = () => {
        setError('')
        console.log(otp);
        if (otp.length !== 6) {
            setError("Fill OTP properly please")
            return
        }
        verifyOtp(profileState.phone, otp)
            .then(async data => {
                if (data.status === 200) {
                    setTimer(0)
                    console.log(data.data.data)
                    if (data.data.token !== null) {
                        profileDispatch({
                            type: 'TOKEN',
                            payload: data.data.token
                        })
                        await AsyncStorage.setItem('token', data.data.token)
                    }
                    navigation.navigate("HomeSceenDriver")
                } else {
                    setError(data.data.message)
                    setShowVerify(false)
                    setTimer(50)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: BgColor }}
        >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={global.backIcon} size={30} />
            </TouchableOpacity>


            <View style={styles.signupcontainer}>
                <Image
                    source={require('../../assets/imgaes/OTP.png')}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.title}>Verification</Text>
            </View>

            <View style={styles.otpcontainer}>
                <EditableOTPInput length={6} otpIs={setOTP} />
                {error !== '' ? <View style={{ marginTop: 20, marginBottom: -25 }}><Text style={{ color: 'red', fontSize: 14 }}>{error}</Text></View> : ''}


                {(!showVerify) ? <PressButton
                    style={{ marginTop: 60 }}
                    name='Resend OTP'
                    loading={false}
                    disabled={sended}
                    onPress={handleResend}
                /> : <PressButton
                    style={{ marginTop: 60 }}
                    name='Verify OTP'
                    loading={false}
                    disabled={false}
                    onPress={handleVerifyOtp} />
                }

                <View style={styles.resendtext}>
                    <Text style={{ fontSize: 15, color: 'black' }}>
                        Resend OTP in {timer} seconds
                    </Text>
                </View>
            </View>

        </KeyboardAvoidingView>

    )
}
const styles = StyleSheet.create({
    image: {
        width: getResponsiveValue(200, 100),
        height: getResponsiveValue(200, 100),
        left: getResponsiveValue("4%", "4%"),
    },
    title: {
        color: `black`,
        fontSize: 35,
        fontWeight: `500`,
    },
    signupcontainer: {
        marginTop: 40,
        justifyContent: `center`,
        alignItems: `center`

    },
    otpcontainer: {
        marginTop: 40,
        justifyContent: `center`,
        alignItems: `center`
    },
    resendtext: {
        marginTop: 20
    }
})
export default NewOtpScreen