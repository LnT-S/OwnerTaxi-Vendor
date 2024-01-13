import React from 'react'
import { 
    SafeAreaView, 
    StyleSheet, 
    View,
    KeyboardAvoidingView
 } from 'react-native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Text } from 'react-native-elements';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import { height } from '../../styles/responsive';
import { BgColor } from '../../styles/colors';

const Stack = createNativeStackNavigator()

const AuthenticatedLayout = (props) => {
    const { children } = props
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: BgColor }}>
            <SafeAreaView>
                <View style={styles.layout}>
                    {/*NAVIGATION */}
                    <View>
                        <Header title={props.title} />
                    </View>
                    {/*BODY*/}
                    <View style={styles.body}>
                        {children}
                    </View>
                    {/*FOOTER*/}
                    <View style={styles.footer}>
                        <Footer />
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    layout: {
        position: 'relative',
        height: '100%'
    },
    body: {
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    }
})

export default AuthenticatedLayout