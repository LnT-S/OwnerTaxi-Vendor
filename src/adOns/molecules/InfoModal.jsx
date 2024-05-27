import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, Image } from "react-native";
import PressButton from "../atoms/PressButton";

const InfoModal =  function (props) {

    const { show, setShow, title, message, messageJsx, imageSource , serverImageSource, comment, documentNo} = props
// console.log("sssss",documentNo);
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
                <View style={{width : '100%' , marginBottom : 15}}>
                    <Text style={{fontSize : 26 , color : 'black'}}>{title}</Text>
                </View>
                    {<Text style={{marginVertical : 10,fontSize : 16,fontFamily : "serif",letterSpacing : 2}}>{documentNo}</Text>}
                    {(messageJsx === undefined && message!==undefined) ? <View style={{ marginBottom: 4 }}>
                        <Text style={styles.modalText}>{message}</Text>
                    </View> : messageJsx}
                    {imageSource ? <Image source={imageSource} style={{ height: 350, width: '90%', marginBottom: 15 }} /> : ''}
                    {serverImageSource ? <Image source={{uri : serverImageSource}} style={{ height: 350, width: '90%', marginBottom: 15 }} /> : ''}
                    {!comment ? '' : <View style={{width : '90%',marginVertical : 10}}><Text style={{color : "red"}}>{comment}</Text></View>}
                    <View style={styles.row}>
                        <View style={styles.r1}>
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
        width: '70%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'black',
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
export default React.memo(InfoModal);