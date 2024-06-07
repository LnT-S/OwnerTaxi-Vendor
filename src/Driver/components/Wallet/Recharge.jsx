import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout';
import PressButton from '../../../adOns/atoms/PressButton';
import InfoModal from '../../../adOns/molecules/InfoModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { copyToClipboard, documentPicker, imagePicker } from '../../../utils/UtilityFuntions';
import image from '../../../assets/imgaes/qrScanner.jpg'
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { showNoty } from '../../../common/flash/flashNotification';
import { uprollTransaction } from '../../../services/apiCall';
import FlashMessage from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

const Recharge = () => {

    const [showModal, setShowModal] = useState(true)
    const [showQr, setShowQr] = useState(false)
    const [showCopied, setShowCopied] = useState(false)
    const [screenShot, setScreenShot] = useState(null)
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const ref = useRef()

    const showCopiedHandler = () => {
        setShowCopied(true);
        setTimeout(() => { setShowCopied(false) }, 800)
    }
    const request = () => {
        setLoading(true)
        if (screenShot === null) {
            showNoty("Screen Not Selected", "danger")
            return
        }
        if (amount === '' || isNaN(amount)) {
            showNoty("Enter Amount you have payed", "danger")
            return
        }
        try {
            uprollTransaction({ ss: screenShot, amount: parseInt(amount), reason: 'Recharge'})
                .then(data => {
                    if (data.status === 200) {
                        showNoty(data.data.message, "success")
                        setTimeout(() => {
                            setLoading(false)
                            navigation.goBack()
                        }, 1500)
                    } else {
                        showNoty(data.data.message, "danger")
                    }
                })
                .catch(err => {
                    console.log("ERROR UPLOADING SCREENSHOT ", err);
                })
        } catch (error) {
            showNoty("SOME ERROR OCCURED !! Try after some time")
        }
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }

    useState(() => {
        console.log("SCREEN SHOT ", screenShot);
    }, [screenShot])

    const jsx = <Image source={image} style={{ height: 200, width: '200' }} />

    return (
        <AuthenticatedLayout title={'Payments'}>
            <View style={{ height: '100%' }}>
                <FlashMessage ref={ref} />
                <ScrollView
                    style={{ flex: 1 }}
                >
                    <InfoModal
                        show={showModal}
                        setShow={setShowModal}
                        title={'Payments Procedure'}
                        extContStyle={{ width: '85%' }}
                        message={<>
                            <Text style={{ textAlign: 'right' }}>1. Copy the corresponding Payment Merchant Info     {'\n'}</Text>
                            <Text>2. Open the corresponding Payment Mode and Pay due amaount to the copied Phone Number{'\n'}</Text>
                            <Text>3. Upload the screenshot of the payment and press Request For Confimation{'\n'}{'\n'}</Text>
                            <Text>Your recharge will be confirmed within 24 Hours{'\n'}{'\n'}</Text>
                            <Text style={{ color: 'red', fontSize: 16, fontWeight: '400', textAlign: 'center' }}>Contact administrator for instant billing</Text>
                        </>}
                    />
                    <InfoModal
                        show={showQr}
                        setShow={setShowQr}
                        title={'Scan to pay'}
                        extContStyle={{ width: '85%' }}
                        imageSource={image}
                    />
                    <View style={{ position: 'relative' }}>
                        {showCopied ? <View style={{
                            position: 'absolute',
                            bottom: 150,
                            left: '40%',
                            backgroundColor: 'white',
                            zIndex: 5,
                            width: '20%',
                            height: 25,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{ textAlign: 'center', color: 'red', fontWeight: '500' }}>COPIED</Text>
                        </View> : ''}

                        <View style={styles.knowButtonConatiner}>
                            <PressButton name={'Know The Procedure'} textStyle={{ color: 'red' }} onPress={() => setShowModal(true)} />
                        </View>
                        <View style={styles.copyOptionConatiner}>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontSize: 28, color: 'black', fontWeight: '800' }}>Available Options</Text>
                            </View>
                            <View style={{ marginTop: 7 }}>
                                <View style={styles.optionRow}>
                                    <View><Text style={styles.optionText}>Google Pay</Text></View>
                                    <TouchableOpacity onPress={() => { copyToClipboard('9850506679'); showCopiedHandler() }}><Icon name='content-copy' size={30} color={'black'} /></TouchableOpacity>
                                </View>
                                <View style={styles.optionRow}>
                                    <View><Text style={styles.optionText}>Phone Pay</Text></View>
                                    <TouchableOpacity onPress={() => { copyToClipboard('9850506679'); showCopiedHandler() }}><Icon name='content-copy' size={30} color={'black'} /></TouchableOpacity>
                                </View>
                                <View style={styles.optionRow}>
                                    <View><Text style={styles.optionText}>PayTM</Text></View>
                                    <TouchableOpacity onPress={() => { copyToClipboard('9850506679'); showCopiedHandler() }}><Icon name='content-copy' size={30} color={'black'} /></TouchableOpacity>
                                </View>
                                <View style={styles.optionRow}>
                                    <View><Text style={styles.optionText}>QR Code to Scan</Text></View>
                                    <TouchableOpacity onPress={() => setShowQr(true)}><Icon name='visibility' size={30} color={'black'} /></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.confirmationContainer}>
                            <View style={{ marginTop: 15 }}>
                                <Text style={{ fontSize: 24, color: 'black', fontWeight: '800' }}>Verify Your Payment</Text>
                            </View>
                            <View style={{ ...styles.optionRow, paddingHorizontal: 16 }}>
                                <View><Text style={styles.verifyText}>Upload Screenshot</Text></View>
                                {screenShot === null ? <TouchableOpacity onPress={() => { imagePicker().then(data => { setScreenShot(data) }).catch(err => { console.log('ERRON IN UPLOAD SS', err) }) }}><Icon name='document-scanner' size={30} color={'black'} /></TouchableOpacity> : <View style={styles.docNameConatainer}><Text style={{ fontSize: 16 }}>{screenShot?.name?.substring(0, 10)}...</Text><TouchableOpacity onPress={() => setScreenShot(null)}><Icon name='cancel' size={18} color={'black'} /></TouchableOpacity></View>}
                            </View>
                            <View style={{ ...styles.optionRow, paddingHorizontal: 16 }}>
                                <View>
                                    <Text style={styles.verifyText}>Recharge Amount (in Rs)</Text>
                                </View>
                                <View>
                                    <TextInput
                                        placeholder='Enter Amount'
                                        keyboardType='number-pad'
                                        style={{ fontSize: 16, color: 'red' }}
                                        placeholderTextColor={"red"}
                                        onChangeText={v => setAmount(v)}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <PressButton name={'Request For Confirmation'} onPress={request} loading={loading} disabled={loading} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </AuthenticatedLayout>
    );
}



const styles = StyleSheet.create({
    knowButtonConatiner: {
        marginTop: 15
    },
    copyOptionConatiner: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        margin: 15,
    },
    optionRow: {
        height: 50,
        paddingHorizontal: 20,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionText: {
        fontSize: 22,
        color: 'black'
    },
    copyContainer: {

    },
    confirmationContainer: {
        marginHorizontal: 15,
    },
    verifyText: {
        fontSize: 20,
        color: 'black'
    },
    docNameConatainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    }
})

export default Recharge;
