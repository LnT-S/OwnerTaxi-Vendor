import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { getResponsiveValue, screenWidth } from '../../styles/responsive'
import { BgColor, ScreenColor } from '../../styles/colors';


const Buttons = (props) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer]} {...props}>
            <View style={[styles.button]} >
                <Text style={styles.text}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Buttons;

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: BgColor
    },
    iconWrapper: {
        paddingHorizontal: 10,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: getResponsiveValue("5%", "8%"),
        letterSpacing: 1,
        fontWeight: `500`
    },
    button: {

        height: getResponsiveValue(60, screenWidth * 0.12),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BgColor
    },
});