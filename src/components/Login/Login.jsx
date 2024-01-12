import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, Text, Pressable, KeyboardAvoidingView, BackHandler } from 'react-native'
import { getResponsiveValue } from '../../styles/responsive';
import { BgColor } from '../../styles/colors';
import TwoWayPushButton from '../../adOns/molecules/TwoWayPushButton';
import PressButton from '../../adOns/atoms/PressButton';
import { useNavigation } from '@react-navigation/native';
import UserInput from '../../adOns/atoms/UserInput';
import PassInput from '../../adOns/atoms/PassInput';
import YesNoModal from '../../adOns/molecules/YesNoModal';

const LoginPage = () => {

    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState('')
    const [showModal , setShowModal ] = useState(false)

    const handleYes = async () => {
        setShowModal(false);
        BackHandler.exitApp();
      };
    const SignUpPage = () => {
        navigation.navigate('SignupScreen')
    }
    const ForgetPage = () => {
        navigation.navigate('ForgetScreen')
    }
    const handleLogin = () => {
        navigation.navigate('HomeSceen')
    }
    useEffect(() => {
        console.log('Option is Changing', selectedOption)
    }, [selectedOption])

    useEffect(()=>{
        const backFuntion = ()=>{
            if(showModal){
                setShowModal(false)
            }else{
                setShowModal(true)
                return true
            }
        }

        console.log('BACKHANDLER ATTACHED')
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backFuntion)
        return ()=>{
            console.log('BACKHANDLER REMOVED')
            backHandler.remove()
        }
    },[])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <View style={styles.loginpage}>
            <YesNoModal 
            show = {showModal}
            setShow = {setShowModal}
            title = {'EXIT ?'}
            message = {'Are You Sure Want To Exit ?'}
            handleYes = {handleYes} 
            yesText = {'Exit'} 
            noText = {'Cancel'}/>
                <View style={styles.logoPart}>
                    <Image
                        source={require('../../assets/imgaes/DriverAppLogo.png')}
                        style={{ width: 300, height: 100 }}
                    />
                    <Text style={styles.title}>LogIn</Text>
                </View>

                <TwoWayPushButton option1={'Traveller'} option2={'Driver'} setter={setSelectedOption} />

                <View style={styles.formpart}>
                    <UserInput
                        style={[styles.input]}
                        placeholder='UserName or Phone No.'
                        icon={'person'}
                    />

                    <PassInput
                        placeholder='Password'
                    />
                    <View>
                        <Pressable onPress={ForgetPage}>
                            <Text style={styles.link}>Forgot Password?</Text>
                        </Pressable>
                    </View>
                    <PressButton
                        name='Log In'
                        onPress = {handleLogin}
                    />
                    <View style={styles.content}>
                        <View style={styles.signupContainer}>
                            <Text style={styles.createAccount}>Don't have an account?</Text>
                            <Pressable onPress={SignUpPage}>
                                <Text style={styles.link}>Sign Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    loginpage: {
        flex: 1,
        justifyContent: `center`,
        alignItems: 'center',
        backgroundColor: BgColor

    },
    logoPart: {
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
export default LoginPage
