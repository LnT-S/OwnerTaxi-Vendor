import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { BgColor } from '../../styles/colors';

const StatusButton = (props) => {
    const {text , containerStyle , textStyle} = props
    return (
        <View style={{...styles.container ,...containerStyle}}>
            {(text!==undefined && text.length>0)&&text.map((text , index)=>{
                return <Text key={index} style=  {{...styles.textStyle ,...(textStyle[index])}}>{text || 'DUMMY TEXT'}</Text>
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width : 70,
        height : 50,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection  : 'column',
        backgroundColor  : BgColor
    },
    textStyle :{
        fontSize : 14,
        color : 'black'
    }
})

export default StatusButton;
