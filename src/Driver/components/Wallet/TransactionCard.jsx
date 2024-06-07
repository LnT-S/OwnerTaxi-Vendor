import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const TransactionBox = (props) => {

    const { amount, date, status,reason } = props.item


    return (
        <View style={[styles.boxStyle]}>
            <View>
                <Text style={styles.typeStyle}>{reason}</Text>
            </View>
            <View style={[styles.boxStyle, styles.displayflex]}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={styles.typeStyle}>Id : {date}</Text>
                    <Text style={styles.timeStyle}>{new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                    <Text style={styles.contentStyle}>₹ {amount}</Text>
                    <Text style={{ ...styles.contentStyle, color: 'red' }}>Status  : {status.toUpperCase()}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxStyle: {
        backgroundColor: 'black',
        padding: 10,
        marginHorizontal: 10
    },
    displayflex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
