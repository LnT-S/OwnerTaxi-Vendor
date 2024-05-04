import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import StatusButton from '../../../adOns/atoms/StatusButton';
import { BgColor, WHITEBG } from '../../../styles/colors';
import PressButton from '../../../adOns/atoms/PressButton';
import AuthenticatedLayoutVendor from '../../common/layout/AuthenticatedLayoutVendor';
import Input from '../../../adOns/atoms/Input';

const IntercityRequestHandlerVendor = () => {

    const route = useRoute()
    const { item } = route.params

    const [callButton, showCallButton] = useState(false)
    const [text, setText] = useState('500')

    return (
        <AuthenticatedLayoutVendor
            showFooter={false}
            showBackIcon={false}
            title={item.customerID}
        >
            <ScrollView style={{ flex: 1, backgroundColor: WHITEBG }}
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="true">
                <View style={{ ...styles.mainConatiner }}>
                    <View style={styles.idContainer}>
                        <View style={styles.idContainer.leftSection}>
                            <Text style={{ color: 'black', ...styles.textHeading, fontSize: 16, letterSpacing: 0.5 }}>Booking ID</Text>
                            <Text style={{ color: 'red', ...styles.textHeading, fontSize: 20, fontWeight: '500' }}>{item.bookingId}</Text>
                        </View>
                        <View style={styles.idContainer.rightSection}>
                            <StatusButton
                                text={[item.status[0].toUpperCase() + item.status.substring(1,)]}
                                containerStyle={{ backgroundColor: item.status.toLowerCase() === 'active' ? 'green' : 'red', borderRadius: 20, width: 80 }}
                                textStyle={[{ fontFamily: 'serif', color: 'white', fontSize: 18 }]}
                            />
                            {false && item.verifiedBy && <StatusButton
                                text={['Verified By', item.verifiedBy]}
                                containerStyle={{ backgroundColor: item.verifiedBy.toLowerCase() === 'owner taxi' ? '#8EF433' : BgColor, borderRadius: 20, width: 120 }}
                                textStyle={[{ fontFamily: 'serif', fontSize: 12 }, { fontFamily: 'serif', fontSize: 16 }]}
                            />}
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4B2021', width: '75%', padding: 5, borderRadius: 10, marginVertical: 5 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>{item.subtype}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8B558F', width: '75%', padding: 5, borderRadius: 10, marginVertical: 5 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>{item.car}</Text>
                        </View>

                    </View>
                    <View style={{ ...styles.optionContainer, opacity: item.status === 'closed' ? 0.2 : 1 }}>
                        <View style={styles.optionContainer.section}>
                            <View style={styles.optionContainer.section.leftSection}>
                                <Text style={{ color: 'black', ...styles.textHeading, fontSize: 16, letterSpacing: 0.5, textAlign: 'left' }}>Pickup</Text>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{item.from}</Text>
                            </View>
                            <View style={styles.optionContainer.section.rightSection}>
                                <Text style={{ color: 'black', ...styles.textHeading, fontSize: 16, letterSpacing: 0.5, textAlign: 'left' }}>Drop</Text>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{item.to}</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.optionContainer.section, height: 100, backgroundColor: 'rgba(0,0,0,0.03)' }}>
                            <View style={styles.optionContainer.section.leftSection}>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 20, letterSpacing: 0.5, textAlign: 'left' }}>Distance</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>500 km</Text>
                            </View>
                            <View style={styles.optionContainer.section.rightSection}>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 22, letterSpacing: 0.5, textAlign: 'left' }}>Budget</Text>
                                <Text style={{ color: 'green', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>&#x20B9; {item.budget}</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.optionContainer.section, height: 100 }}>
                            <View style={styles.optionContainer.section.leftSection}>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 20, letterSpacing: 0.5, textAlign: 'left' }}>PickUp Date</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{new Date().toDateString()}</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{new Date().getHours()} : {new Date().getMinutes()} am</Text>
                            </View>
                            {item.subtype.toLowerCase() !== 'oneway' && <View style={styles.optionContainer.section.rightSection}>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 22, letterSpacing: 0.5, textAlign: 'left' }}>Drop Date</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{new Date().toDateString()}</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{new Date().getHours()} : {new Date().getMinutes()}am</Text>
                            </View>}
                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: 5 }}>
                            <Text style={{ fontFamily: 'serif', fontSize: 20, paddingHorizontal: 15 }}>Extras Information</Text>
                            <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '90%', padding: 5, borderRadius: 10, marginVertical: 5 }}>
                                <View style={{display : 'flex' , justifyContent: 'flex-start', alignItems: 'flex-start',}}>
                                    <View style={{ display: 'flex ', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                            Total Distance         : </Text><Text style={{ color: 'red' }}>&#x20B9; </Text>
                                        <TextInput
                                            placeholder='500' style={{ width: 60, color: 'red', fontSize: 16, paddingVertical: 0, borderBottomWidth: 0.5, borderBottomColor: 'red' }}
                                            onChangeText={(v) => { console.log(v); setText(v) }}
                                            value={text}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'red' }}>per km</Text>
                                    </View>
                                    <View style={{ display: 'flex ', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                            Enter Your Budget  : </Text><Text style={{ color: 'red' }}>&#x20B9; </Text>
                                        <TextInput
                                            placeholder='500' style={{ width: 60, color: 'red', fontSize: 16, paddingVertical: 0, borderBottomWidth: 0.5, borderBottomColor: 'red' }}
                                            onChangeText={(v) => { console.log(v); setText(v) }}
                                            value={text}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'red' }}>per km</Text>
                                    </View>
                                    <View style={{ display: 'flex ', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                            Extra Distance        : </Text><Text style={{ color: 'red' }}>&#x20B9; </Text>
                                        <TextInput
                                            placeholder='500' style={{ width: 60, color: 'red', fontSize: 16, paddingVertical: 0, borderBottomWidth: 0.5, borderBottomColor: 'red' }}
                                            onChangeText={(v) => { console.log(v); setText(v) }}
                                            value={text}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'red' }}>per km</Text>
                                    </View>
                                    
                                    <View style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                            Extra Hour               : </Text><Text style={{ color: 'red' }}>&#x20B9; </Text>
                                        <TextInput
                                            placeholder='500' style={{ width: 60, color: 'red', fontSize: 16, paddingVertical: 0, borderBottomWidth: 0.5, borderBottomColor: 'red' }}
                                            onChangeText={(v) => { console.log(v); setText(v) }}
                                            value={text}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'red' }}>per hour</Text>
                                    </View>
                                    <View style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                            Night Charges        : </Text><Text style={{ color: 'red' }}>&#x20B9; </Text>
                                        <TextInput
                                            placeholder='500' style={{ width: 60, color: 'red', fontSize: 16, paddingVertical: 0, borderBottomWidth: 0.5, borderBottomColor: 'red' }}
                                            onChangeText={(v) => { console.log(v); setText(v) }}
                                            value={text}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'red' }}>per hour</Text>
                                    </View>
                                    <View style={{ display: 'flex ', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                            Driver Allowance   : </Text><Text style={{ color: 'red' }}>&#x20B9; </Text>
                                        <TextInput
                                            placeholder='500' style={{ width: 60, color: 'red', fontSize: 16, paddingVertical: 0, borderBottomWidth: 0.5, borderBottomColor: 'red' }}
                                            onChangeText={(v) => { console.log(v); setText(v) }}
                                            value={text}
                                        />
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'red' }}>per hour</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        {/* <View style={{ ...styles.optionContainer.section, flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 , borderBottomWidth : 0}}>
                            <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 22, letterSpacing: 0.5, textAlign: 'left'}}>Enter your budget :    </Text>
                            <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'center'  }}>&#x20B9;</Text><TextInput style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'left', borderBottomWidth: 0.5, borderBottomColor: 'gray', width: 120 }}> </TextInput>
                            </View>*/}
                    </View>
                    <View style={{ ...styles.buttonContainer, opacity: item.status === 'closed' ? 0.5 : 1, marginTop: 15 }}>
                        <PressButton name="BID TO CUSTOMER" disabled={item.status !== 'closed' ? false : true} />
                        <PressButton name="   POST BOOKING   " disabled={item.status !== 'closed' ? false : true} />
                    </View>
                </View>
            </ScrollView>
        </AuthenticatedLayoutVendor>
    );
}

const styles = StyleSheet.create({
    mainConatiner: {
        height: '100%',
        // borderWidth: 2,
        backgroundColor: '#E7EEF6',
    },
    idContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 120,
        // backgroundColor : 'rgba(0,0,0,0.03)',
        // borderBottomColor: 'gray',
        // borderBottomWidth: 0.3,

        // marginVertical : 20,
        leftSection: {
            width: '30%',
            height: '100%',
            display: 'flex ',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10
        },
        rightSection: {
            paddingRight: 10,
            width: '70%',
            height: '100%',
            display: 'flex ',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 10,
            gap: 15
        }
    },
    mapContainer: {
    },
    optionContainer: {
        // height: '50%',
        section: {
            height: 110,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: 'green',
            borderBottomColor: 'gray',
            // borderBottomWidth: 0.3,
            leftSection: {
                width: '50%',
                height: '100%',
                display: 'flex ',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                justifyContent: 'center',
                marginBottom: 10
            },
            rightSection: {
                padding: 2,
                width: '50%',
                height: '100%',
                display: 'flex ',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                // gap: 15
            }
        }
    },
    optionContainerText: {

    },
    buttonContainer: {

    }

})

export default IntercityRequestHandlerVendor;
