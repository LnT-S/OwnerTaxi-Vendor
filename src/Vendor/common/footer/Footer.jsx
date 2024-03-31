import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BgColor } from '../../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = () => {

    const navigation = useNavigation()
    const [userIs, setUserIs] = useState(null)

    const userIS = async function () {
        let temp = await AsyncStorage.getItem('userIs')
        return temp
    }

    useEffect(() => {
        userIS().then(data => {
            setUserIs(data)
        }).catch(err => {
            console.log('UNABLE TO GET USER TYPE IN FOOTER')
        })
    }, [])

    return (
        <SafeAreaView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeVendor')}>
                    <View style={styles.icons}>
                        <Icon name="home" size={40} color="#000" />
                        <Text style={styles.text}>Home</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('ProfileVendor')}>
                    <View style={styles.icons}>
                        <Icon name="person" size={40} color="#000" />
                        <Text style={styles.text}>Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        backgroundColor: BgColor,
        zIndex: 2,
        padding:5
    },
    icons: {
        margin: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 14,
        fontWeight: '500',
    }
})

export default Footer