import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TransactionBox = (props) => {

    const {name, date, rupees} = props.item

    return (
        <View style={[styles.boxStyle,styles.displayflex]}>
            <View>
                <Text style={styles.typeStyle}>{name}</Text>
                <Text style={styles.timeStyle}>{date}</Text>
            </View>
            <View>
                <Text style={styles.contentStyle}>{rupees}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: 'black',
        padding: 8,
        marginHorizontal: 10
    },
    displayflex: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    typeStyle: {
        fontSize: 18,
        fontWeight: '800',
        color: 'white'
    },
    contentStyle: {
        fontSize: 18,
        color: 'white'
    },
    timeStyle: {
        fontSize: 13,
        fontWeight: '400',
        color: '#f0e6e6'
    }
})

export default TransactionBox;
