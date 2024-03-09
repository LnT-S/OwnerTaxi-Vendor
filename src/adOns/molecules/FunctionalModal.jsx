import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, Image, TouchableOpacity } from "react-native";
import PressButton from "../atoms/PressButton";
import { BgColor, WHITEBG } from "../../styles/colors";

export default function FunctionalModal(props) {

    const { show, setShow, title, functionalObject } = props
    const handleFunction = (action)=>{
        action();
        setShow(false)
    }
    const handleCancel = () => {
        setShow(false);
    };
    return (
        <Modal
            visible={show}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                <View style={{ ...styles.modalContent, ...props.extContStyle }}>
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={{ fontSize: 26, color: 'black' }}>{title.toUpperCase()}</Text>
                    </View>
                    <View style={styles.modalContentScreen}>
                        {Object.values(functionalObject).map((item, index) => {
                            return <TouchableOpacity key={index} style={{width : '95%',marginVertical : 5 , backgroundColor : BgColor , paddingVertical : 8 ,paddingHorizontal : 6}}
                            onPress={()=>handleFunction(item.action)}
                            >
                                <Text style={{color : 'black' , fontSize  : 22 , fontWeight: '500',textAlign : 'center'}}>{item.name}</Text>
                            </TouchableOpacity>
                        })}
                    </View>

                    <View style={styles.row}>
                        <View >
                            <PressButton name={'Close'} onPress={handleCancel} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        // borderWidth : 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: WHITEBG,
        padding: 15,
        // elevation: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalContentScreen : {
        shadowColor : BgColor,
        backgroundColor: 'white',
        padding: 15,
        elevation: 40,
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    row: {
        marginTop : 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    // r1: {
    //     right: 10,
    // },
    // r2: {
    //     left: 10,
    // },
});
