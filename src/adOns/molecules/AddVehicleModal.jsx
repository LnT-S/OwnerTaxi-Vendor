import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, TextInput } from "react-native";
import PressButton from "../atoms/PressButton";
import { BgColor } from "../../styles/colors";
import { addVehicle } from "../../services/apiCall";
import { showNoty } from "../../common/flash/flashNotification";

export default function AddVehicleModal(props) {

    const { show, setShow } = props
    const [error, setError] = useState('')
    const [type, setType] = useState('')
    const [subType, setSubType] = useState('')
    const [capacity, setCapacity] = useState('')
    const [vehicleNo, setVehicleNo] = useState('')
    const handleCancel = () => {
        setShow(false);
    };
    const handleAdd = () => {
        let obj = {
            type,
            subType,
            capacity,
            vehicleNo,
            documents: []
        }
        if(type===''||subType===''||capacity===''||vehicleNo===''){
            setError("Enter All Details");
            return 
        }
        addVehicle(obj)
            .then(data => {
                console.log(data.data.message);
                if (data.status === 200) {
                    showNoty(data.data.message, "success")
                } else {
                    showNoty(data.data.message, "danger")
                }
            })
            .catch(err => {
                console.log("ERROR ADDING VEHICLE", err)
            })
    }
    return (
        <Modal
            visible={show}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>ENTER VEHICLE INFO</Text>
                    <View style={{ width: '90%' }}>
                        <TextInput
                            placeholder="Enter Vehicle Type {Sedan Mini etc)"
                            onChangeText={v => { setType(v) }}
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Enter Specific Name (Verna Wagonr etc)"
                            onChangeText={v => setSubType(v)}
                            style={styles.textInput}

                        />
                        <TextInput
                            placeholder="Enter Capacity"
                            value={!isNaN(capacity) ? capacity.toString() : ''}
                            onChangeText={v => { setError(''); !isNaN(v) ? setCapacity(parseInt(v)) : setError("Only Numeric Characters !!") }}
                            style={styles.textInput}

                        />
                        <TextInput onChangeText={v => setVehicleNo(v)}
                            placeholder="Enter Vehicle No"
                            style={styles.textInput}

                        />
                    </View>
                    <Text style={{ color: 'red', fontSize: 12, marginBottom: 10 }}>{error}</Text>
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={"Cancel"} onPress={handleCancel} />
                        </View>
                        <View style={styles.r2}>
                            <PressButton name={"ADD"} onPress={handleAdd} />
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
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    textInput: {
        borderWidth: 1,
        marginVertical: 10,
        borderColor: BgColor,
        padding: 10
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
