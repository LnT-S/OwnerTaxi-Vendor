import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TwoWayPushButton = (props) => {

    const {option1 , option2 ,  setter}  = props
    const [isOption1, setOption1] = useState(true)

    const handlePressed = (v) => {
        if (v === option1) {
            setOption1(true)
        } else {
            setOption1(false)
        }
        setter(v)
    }

    useEffect(()=>{
        setTimeout(()=>setter(option1) , 1000)
    },[])

    return (
        
        <SafeAreaView>
            <View style={styles.pushbtn}>
                <TouchableOpacity
                    onPress={() => handlePressed(option1)}
                >
                    <Text style={isOption1 ? styles.pushstyle : styles.defaultpushstyle}>{option1}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handlePressed(option2)}
                >
                    <Text style={!isOption1 ? styles.pushstyle : styles.defaultpushstyle}>{option2}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    pushbtn: {
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `center`,
        backgroundColor: `black`,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7,
        paddingRight: 7,
        borderRadius: 20,
        margin: 20,
        width: '50%'
    },
    defaultpushstyle: {
        fontSize: 20,
        fontWeight: `700`,
        color: `white`,
        justifyContent: `center`,
        alignItems: `center`,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    pushstyle: {
        backgroundColor: `white`,
        fontSize: 20,
        color: `black`,
        fontWeight: `500`,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 12,
    }
})

export default TwoWayPushButton