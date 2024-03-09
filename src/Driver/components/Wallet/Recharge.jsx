import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout';
import PressButton from '../../../adOns/atoms/PressButton';
import InfoModal from '../../../adOns/molecules/InfoModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { copyToClipboard, documentPicker } from '../../../utils/UtilityFuntions';
import image from '../../../assets/imgaes/qrScanner.jpg'

const Recharge = () => {

    const [showModal, setShowModal] = useState(true)
    const [showQr, setShowQr] = useState(false)
    const [showCopied, setShowCopied] = useState(false)
    const [screenShot, setScreenShot] = useState(null)

    const showCopiedHandler = () => {
        setShowCopied(true);
        setTimeout(() => { setShowCopied(false) }, 800)
    }

    const jsx = <Image source={image} style = {{height : 200 , width : '200'}}/>

    return (
        <AuthenticatedLayout title={'Payments'}>
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
                            <TouchableOpacity onPress={()=>{copyToClipboard('9850506679');showCopiedHandler()}}><Icon name='content-copy' size={30} color={'black'} /></TouchableOpacity>
                        </View>
                        <View style={styles.optionRow}>
                            <View><Text style={styles.optionText}>Phone Pay</Text></View>
                            <TouchableOpacity onPress={()=>{copyToClipboard('9850506679');showCopiedHandler()}}><Icon name='content-copy' size={30} color={'black'} /></TouchableOpacity>
                        </View>
                        <View style={styles.optionRow}>
                            <View><Text style={styles.optionText}>PayTM</Text></View>
                            <TouchableOpacity onPress={()=>{copyToClipboard('9850506679');showCopiedHandler()}}><Icon name='content-copy' size={30} color={'black'} /></TouchableOpacity>
                        </View>
                        <View style={styles.optionRow}>
                            <View><Text style={styles.optionText}>QR Code to Scan</Text></View>
                            <TouchableOpacity onPress={()=>setShowQr(true)}><Icon name='visibility' size={30} color={'black'} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.confirmationContainer}>
                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 24, color: 'black', fontWeight: '800' }}>Verify Your Payment</Text>
                    </View>
                    <View style={{ ...styles.optionRow, paddingHorizontal: 16 }}>
                        <View><Text style={styles.verifyText}>Upload Screenshot</Text></View>
                        {screenShot === null ? <TouchableOpacity onPress={() => { documentPicker().then(data => { setScreenShot(data) }).catch(err => { console.log(err) }) }}><Icon name='document-scanner' size={30} color={'black'} /></TouchableOpacity> : <View style={styles.docNameConatainer}><Text style={{ fontSize: 16 }}>{screenShot?.name?.substring(0, 10)}...</Text><TouchableOpacity onPress={() => setScreenShot(null)}><Icon name='cancel' size={18} color={'black'} /></TouchableOpacity></View>}
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <PressButton name={'Request For Confirmation'} />
                    </View>
                </View>
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
