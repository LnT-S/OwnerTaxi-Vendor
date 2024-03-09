import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout';
import { useRoute } from '@react-navigation/native';

const LocalRequestHandler = () => {

    const route = useRoute()
    const { customerID ,date, from , time , to} = route.params.data

    return (
        <AuthenticatedLayout>
            <View style={styles.mainConatiner}>
                <View style={styles.idContainer}>
                    <Text></Text>
                </View>
                <View style={styles.mapContainer}>
                </View>
                <View style={styles.optionContainer}>
                </View>
                <View style={styles.buttonContainer}>
                </View>
            </View>
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    mainConatiner: {
        height: '100%',
        borderWidth: 2,
        backgroundColor: '#E7EEF6',
    },
    idContainer: {

    },
    idContainerText: {

    },
    mapContainer: {

    },
    optionContainer: {

    },
    optionContainerText: {

    },
    buttonContainer: {

    }

})

export default LocalRequestHandler;
