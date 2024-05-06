import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout';
import { useRoute } from '@react-navigation/native';
import StatusButton from '../../../adOns/atoms/StatusButton';
import { BgColor, WHITEBG } from '../../../styles/colors';
import MapComponent from '../../map/MapComponent';
import { height } from '../../../styles/responsive';
import PressButton from '../../../adOns/atoms/PressButton';

const IntercityRequestHandler = () => {

    const route = useRoute()
    const { item } = route.params

    const [callButton, showCallButton] = useState(false)

    return (
        <AuthenticatedLayout
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
                            <Text style={{ color: 'red', ...styles.textHeading, fontSize: 20, fontWeight: '500' }}>{item._id}</Text>
                        </View>
                        <View style={styles.idContainer.rightSection}>
                            <StatusButton
                                text={[item.status[0]?.toUpperCase() + item.status.substring(1,)]}
                                containerStyle={{ backgroundColor: item.status.toLowerCase() === 'active' ? 'green' : 'red', borderRadius: 20, width: 80 }}
                                textStyle={[{ fontFamily: 'serif', color: 'white', fontSize: 18 }]}
                            />
                            {item.verifiedBy && <StatusButton
                                text={['Verified By', item.verifiedBy]}
                                containerStyle={{ backgroundColor: item.verifiedBy?.toLowerCase() === 'owner taxi' ? '#8EF433' : BgColor, borderRadius: 20, width: 120 }}
                                textStyle={[{ fontFamily: 'serif', fontSize: 12 }, { fontFamily: 'serif', fontSize: 16 }]}
                            />}
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#4B2021', width: '75%', padding: 5, borderRadius: 10, marginVertical: 5 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>{item.bookingType!=="rental" ? item.bookingSubType[0]?.toUpperCase() + item.bookingSubType.substring(1,) : "Rental"}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8B558F', width: '75%', padding: 5, borderRadius: 10, marginVertical: 5 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>{item.vehicle.type[0]?.toUpperCase() + item.vehicle.type.substring(1,)}</Text>
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#8B558F', width: '75%', padding: 5, borderRadius: 10, marginVertical: 5 }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 22 }}>{item.vehicle.subType[0]?.toUpperCase() + item.vehicle.subType.substring(1,)}</Text>
                        </View>

                    </View>
                    <View style={{ ...styles.optionContainer, opacity: item.status === 'closed' ? 0.2 : 1 }}>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={{ width: '100%', marginBottom: 15, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ color: 'black', ...styles.textHeading, fontSize: 16, letterSpacing: 0.5, textAlign: 'left' }}>Pickup</Text>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{item.pickUp.description}</Text>
                            </View>
                        </View>



                        {item.stops?.length !== 0 ? <View style={{ flexDirection: 'column', flex: 1 }}>
                            {item.stops.map((items, index) => {
                                return <View key={index} style={{ width: '100%', marginBottom: 15, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ color: 'black', ...styles.textHeading, fontSize: 16, letterSpacing: 0.5 }}>Stop {index + 1}</Text>
                                    <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 18, fontWeight: '500' }}>{items.description}</Text>
                                </View>
                            })}
                        </View> : ''}
                        {item.bookingSubType?.toLowerCase() !== 'oneway' && item.bookingType!== " rental" ? <View style={{ flexDirection: 'column', flex: 1 }}>
                            <View style={{ width: '100%', marginBottom: 15, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ color: 'black', ...styles.textHeading, fontSize: 16, letterSpacing: 0.5, textAlign: 'left' }}>Drop</Text>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{item.drop.description}</Text>
                            </View>
                        </View> : ''}
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
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{new Date(item.pickUp.date.msec).toDateString()}</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{item.pickUp.date.hour} : {item.pickUp.date.min} {item.pickUp.date.hour > 12 ? 'pm' : 'am'}</Text>
                            </View>
                            {item.bookingSubType?.toLowerCase()!== 'oneway' && item.bookingType!=="rental"  && <View style={styles.optionContainer.section.rightSection}>
                                <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 22, letterSpacing: 0.5, textAlign: 'left' }}>Drop Date</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{new Date(item.drop.date.msec).toDateString()}</Text>
                                <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'right' }}>{item.drop.date.hour} : {item.drop.date.min} {item.drop.date.hour > 12 ? 'pm' : 'am'}</Text>
                            </View>}
                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: 5 }}>
                            <Text style={{ fontFamily: 'serif', fontSize: 20, paddingHorizontal: 15 }}>Extras Information</Text>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', padding: 5, borderRadius: 10, marginVertical: 5 }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                        Extra Distance : <Text style={{ color: 'red' }}>&#x20B9; 500 per km</Text>
                                    </Text>
                                    <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                        Extra Hour        : <Text style={{ color: 'red' }}>&#x20B9; 80 per hour</Text>
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {/* <View style={{ ...styles.optionContainer.section, flexDirection: 'row', justifyContent: 'flex-start', paddingLeft: 15 , borderBottomWidth : 0}}>
                            <Text style={{ color: 'gray', ...styles.textHeading, fontSize: 22, letterSpacing: 0.5, textAlign: 'left'}}>Enter your budget :    </Text>
                            <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'center'  }}>&#x20B9;</Text><TextInput style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500', textAlign: 'left', borderBottomWidth: 0.5, borderBottomColor: 'gray', width: 120 }}> </TextInput>
                            </View>*/}
                    </View>
                    <View style={{ ...styles.buttonContainer, opacity: item.status === 'closed' ? 0.5 : 1, marginTop: 15 }}>
                        {!callButton ? <PressButton name="Accept" disabled={item.status !== 'closed' ? false : true} onPress={() => showCallButton(true)} /> :
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}><PressButton name="Call Vendor" disabled={item.status !== 'closed' ? false : true} onPress={() => null} /><PressButton name="Un-Accept" disabled={item.status !== 'closed' ? false : true} onPress={() => showCallButton(false)} /></View>}
                    </View>
                </View>
            </ScrollView>
        </AuthenticatedLayout>
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

export default IntercityRequestHandler;
