import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, TextInput,TouchableOpacity, Linking } from "react-native";
import PressButton from "../atoms/PressButton";
import { BgColor } from "../../styles/colors";
import { addVehicle } from "../../services/apiCall";
import { showNoty } from "../../common/flash/flashNotification";
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function CheckLeadsModal(props) {

    const { show, setShow, driversArray } = props
    const handleCancel = () => {
        setShow(false);
    };
    const handleCall = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };
    return (
        <Modal
            visible={show}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Drivers interseted in this booking</Text>
                    <View style={{ width: '90%', marginBottom: 15 }}>
                        {driversArray?.map((el, i) => {
                            return <View style={styles.array}>
                                <Text>{el.driverPhone}</Text>
                                <Text>{el.rating}</Text>
                                <TouchableOpacity onPress={()=>handleCall(el.driverPhone)}><Icon name="call" size={30} color={BgColor} /></TouchableOpacity>
                            </View>
                        })}
                    </View>
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={"OK"} onPress={handleCancel} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    array: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textI: {
        marginVertical: 10,
        padding: 10,
        fontSize: 14,
        fontFamily: 'serif'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    r1: {
        right: 10,
    },
    r2: {
        left: 10,
    },
});
