import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, TextInput } from "react-native";
import PressButton from "../atoms/PressButton";
import { BgColor } from "../../styles/colors";
import { addVehicle } from "../../services/apiCall";
import { showNoty } from "../../common/flash/flashNotification";
import { Dropdown } from 'react-native-element-dropdown';
import { spacedText } from "../../utils/UtilityFuntions";

export default function AddVehicleModal(props) {

    const { show, setShow, reload } = props
    const [error, setError] = useState('')
    const [type, setType] = useState('')
    const [subType, setSubType] = useState('')
    const [locality , setLocality] = useState('')
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
            locality,
            documents: []
        }
        if (type === '' || subType === '' || capacity === '' || vehicleNo === '' || locality==="") {
            setError("Enter All Details");
            return
        }
        addVehicle(obj)
            .then(data => {
                console.log(data.data.message);
                reload()
                if (data.status === 200) {
                    setTimeout(() => showNoty(data.data.message, "success"), 100)
                    setShow(false)
                } else {
                    setTimeout(() => showNoty(data.data.message, "danger"), 100)
                    setShow(false)
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
                        {/*<TextInput
                            placeholder="Enter Vehicle Type {Sedan Mini etc)"
                            placeholderTextColor={"gray"}
                            onChangeText={v => { setType(v) }}
                            style={styles.textInput}
    />*/}
                        <Dropdown
                            style={styles.textInput}
                            data={[{ label: 'Auto 3+1', value: 'Auto', capacity: 3 }, { label: 'Mini 4+1', value: 'Mini', capacity: 4 }, { label: 'Sedan 4+1', value: 'Sedan', capacity: 4 }, { label: 'SUV 6+1', value: 'SUV', capacity: 6 }, { label: 'SUV 10+1', value: 'SUV ', capacity: 10 }]}
                            placeholder='Select Document For'
                            placeholderStyle={{ color: 'black' }}
                            value={type}
                            labelField="label"
                            valueField="value"
                            onChange={item => {
                                setType(item.value);
                                setCapacity(item.capacity)
                            }}
                        />
                        <Dropdown
                            style={styles.textInput}
                            data={[{ label: 'Permit', value: 'Permit', capacity: 3 }, { label: 'Private', value: 'Private', capacity: 4 }]}
                            placeholder='Select Vehicle Type'
                            placeholderStyle={{ color: 'black' }}
                            value={locality}
                            labelField="label"
                            valueField="value"
                            onChange={item => {
                                setLocality(item.value);
                            }}
                        />
                        <TextInput
                            placeholder="Enter Specific Name (Verna Wagonr etc)"
                            placeholderTextColor={"gray"}
                            onChangeText={v => setSubType(v)}
                            style={styles.textInput}

                        />
                        {/*<TextInput
                            placeholder="Enter Capacity"
                            placeholderTextColor={"gray"}
                            value={!isNaN(capacity) ? capacity.toString() : ''}
                            onChangeText={v => { setError(''); !isNaN(v) ? setCapacity(parseInt(v)) : setError("Only Numeric Characters !!") }}
                            style={styles.textInput}

    />*/}
                        <TextInput onChangeText={v =>setVehicleNo(v.toUpperCase().replaceAll(" ",""))} 
                            placeholder="Enter Vehicle No"
                            placeholderTextColor={"gray"}
                            style={styles.textInput}  
                            value={vehicleNo}

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
        padding: 10, color: 'black'
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
