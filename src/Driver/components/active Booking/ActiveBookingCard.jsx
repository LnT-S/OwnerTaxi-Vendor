import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'react-native';

const ActiveBookingCard = (props) => {

    const activeItem = props.item?.passiveBookingId
    const navigation = useNavigation()

    const handleCall = () => {
        Linking.openURL(`tel:${8175973674}`);
    };

    const handleMessage = () => {
        const messageUrl = `sms:${8175973674}`;
        Linking.openURL(messageUrl);
    };
    const handlenavigation = () => {
        if (activeItem.status === 'Budget Confirmation Pending From your Side') {
            navigation.navigate('Bidding', { item: activeItem })
        }
    }

    return (
        <TouchableOpacity onPress={handlenavigation}>
            <View style={styles.activeBar}>
                <View style={{ display: 'flex ', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 18, textTransform: 'capitalize' }}>{activeItem.bookingType} </Text>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 18, fontWeight: '500', textTransform: 'capitalize', color: 'red' }}>{activeItem.bookingSubType}</Text>
                </View>
                <View style={{
                    display: 'flex ', flexDirection: 'row', alignItems: 'center',
                    width: ' 85%'
                }}>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 18 }}>Status : </Text>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 18, fontWeight: '500', textTransform: 'capitalize', color: 'green' }}>{activeItem.status}</Text>
                </View>
                <View style={[styles.horizontalstatus, styles.borderTop]}>
                    <View style={styles.activeBarmarginRight}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Pick Up  </Text>
                        </View>
                        <View>
                            <Text style={{ ...styles.textColor, textTransform: 'capitalize' }}>{activeItem.pickUp.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.textColor}>{new Date(activeItem.pickUp.date.msec).toDateString()}</Text>
                            <Text style={styles.textColor}>{new Date(activeItem.pickUp.date.msec).toLocaleTimeString()}</Text>
                        </View>
                    </View>
                    <View style={styles.activeBarmarginLeft}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Destination  </Text>
                        </View>
                        <View>
                            <Text style={{ ...styles.textColor, textTransform: 'capitalize' }}>{activeItem.drop.description}</Text>
                        </View>
                        {activeItem.drop.date.msec !== null ? <View>
                            <Text style={styles.textColor}>{new Date(activeItem.drop.date.msec).toDateString()}</Text>
                            <Text style={styles.textColor}>{new Date(activeItem.drop.date.msec).toLocaleTimeString()}</Text>
                        </View> : ''}
                    </View>
                </View>

                {/**Call Msg cancel */}
                <View style={[styles.container, styles.borderTop, {}]} >
                    <TouchableOpacity style={styles.iconContainer} onPress={handleCall}>
                        <Icon name="phone" size={30} color='#31db1a' />
                        <Text style={styles.scheduleText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={handleMessage}>
                        <Icon name="message" size={30} color="blue" />
                        <Text style={styles.scheduleText}>Message</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Icon name="cancel" size={30} color="black" />
                        <Text style={styles.scheduleText}>Cancel</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    activeBar: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        padding: 10
    },
    horizontalstatus: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 2
    },
    borderTop: {
        borderTopColor: 'gray',
        borderTopWidth: 0.7
    },
    activeBarmarginRight: {
        marginRight: 4,
        width: '50%',
    },
    activeBarmarginLeft: {
        marginLeft: 4,
        width: '50%'
    },
    textColor: {
        color: 'black'
    },
    textHeading: {
        fontSize: 18
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scheduleText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        textTransform: 'capitalize'
    }
})
export default ActiveBookingCard