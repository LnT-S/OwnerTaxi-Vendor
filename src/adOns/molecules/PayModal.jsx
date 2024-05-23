import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, Modal, Text, Image,TextInput } from "react-native";
import PressButton from "../atoms/PressButton";
import { BgColor } from "../../styles/colors";
import { payToSuperAdmin } from "../../services/apiCall";

export default function PayModal(props) {

    const { show, setShow, title, message, messageJsx, imageSource, serverImageSource, comment } = props
    const [amount, setAmount] = useState(0)
    const [loading,setLoading] = useState(false)
    const [error , setError] = useState('')
    const [errorColor , setErrorColor] = useState('black')
    const handleCancel = () => {
        setShow(false);
    };
    // useEffect(() => {
    //     if(amount===0){
    //         setError("Amount Should Be greater than Zero")
    //     }
    // }, [amount]);
    const handlePay = ()=>{
        if(error!==''){
            setErrorColor("red")
            setTimeout(()=>{setErrorColor("orange")},200)
            setTimeout(()=>{setErrorColor("red")},400)
            setTimeout(()=>{setErrorColor("orange")},600)
            setTimeout(()=>{setErrorColor("red")},800)
            setTimeout(()=>{setErrorColor("orange")},1000)
            setTimeout(()=>{setErrorColor("red")},1200)
            return
        }
        console.log(amount);
        if(amount=== 0 || isNaN(amount)){
            setError("Amount Should Be greater than Zero")
            setErrorColor("red")
            setTimeout(()=>{setErrorColor("orange")},200)
            setTimeout(()=>{setErrorColor("red")},400)
            setTimeout(()=>{setErrorColor("orange")},600)
            setTimeout(()=>{setErrorColor("red")},800)
            setTimeout(()=>{setErrorColor("orange")},1000)
            setTimeout(()=>{setErrorColor("red")},1200)
            return
        }
        setLoading(true)
        payToSuperAdmin({amount})
        .then(data=>{
            setError('')
            if(data.status ===200){
                setErrorColor("green")
                setError("Payment Successfull")
                setLoading(false)
            }else{
                setErrorColor('red')
                setError(data.data.message)
                setLoading(false)
            }
        })
        .catch(err=>{
            console.log("ERROR IN PAY  ",err);
        })
        setTimeout(()=>{setLoading(false)},1500)
    }
    return (
        <Modal
            visible={show}
            animationType="fade"
            transparent={true}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>

                <View style={{ ...styles.modalContent, ...props.extContStyle }}>
                    <View style={{ width: '100%', marginBottom: 15 }}>
                        <Text style={{ fontSize: 26, color: 'black' }}>{title}</Text>
                    </View>
                    {(messageJsx === undefined && message !== undefined) ? <View style={{ marginBottom: 4 }}>
                        <Text style={styles.modalText}>{message}</Text>
                    </View> : messageJsx}
                    <View>
                        <TextInput
                            placeholder="Enter Amount"
                            placeholderTextColor={"gray"}
                            onChangeText={v => { setError(''); !isNaN(v) ? setAmount(parseInt(v)) : setError("Only Numeric Characters !!") }}
                            style={styles.textInput}
                            keyboardType="number-pad"
                        />
                    </View>
                    <Text style={{color : errorColor}}>{error}</Text>
                    <View style={styles.row}>
                        <View style={styles.r1}>
                            <PressButton name={'Close'} onPress={handleCancel} />
                        </View>
                        <View style={styles.r1}>
                            <PressButton name={'Pay'} onPress={handlePay} loading={loading} disabled={loading}/>
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
