import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { BgColor } from '../../styles/colors'

const Footer = () => {
    return (
        <SafeAreaView>
            <View style={styles.footer}>
                <View style={styles.icons}>
                    <Text>ICON1</Text>
                </View>
                <View style={styles.icons}>
                    <Text>ICON2</Text>
                </View>
                <View style={styles.icons}>
                    <Text>ICON3</Text>
                </View>
                <View style={styles.icons}>
                    <Text>ICON4</Text>
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
        backgroundColor: BgColor
    },
    icons: {
        margin: 10,
        padding: 2,
        borderWidth : 1,
        borderColor : 'black'
    }
})

export default Footer