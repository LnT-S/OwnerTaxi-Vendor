import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { BgColor } from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Footer = () => {

    const [userIs , setUserIs] = useState(null)

    const userIS = async function () {
        let temp = await AsyncStorage.getItem('userIs')
        return temp
    }

    useEffect(()=>{
        userIS().then(data=>{
            setUserIs(data)
        }).catch(err=>{
            console.log('UNABLE TO GET USER TYPE IN FOOTER')
        })
    },[])

    return (
        <SafeAreaView>
            <View style={styles.footer}>
                <View style={styles.icons}>
                    <Icon name="home" size={40} color="#000" />
                </View>
                <View style={styles.icons}>
                    <Icon name="description" size={40} color="#000" />
                </View>
                <View style={styles.icons}>
                    <Icon name="account-balance-wallet" size={40} color="#000" />
                </View>
                <View style={styles.icons}>
                    <Icon name="person" size={40} color="#000" />
                </View>
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
        height: 50,
        backgroundColor: BgColor,
        zIndex: 2
    },
    icons: {
        margin: 5
    }
})

export default Footer