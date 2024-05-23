import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'react-native';
import CheckLeadsModal from '../../../adOns/molecules/CheckLeadsModal';
import { showNoty } from '../../../common/flash/flashNotification';
import { useProfile } from '../../../context/ContextProvider';

const BookingAcceptedCard = (props) => {

    let {profileState, profileDispatch } = useProfile()
    const activeItem = props.item?.passiveBookingId
    console.log("ACTIVE ORP 456 ",activeItem)
    console.log("ACTIVE ORP ", props.item)
    const navigation = useNavigation()
    const [showLeads, setShowLeads] = useState(false)

    const handleCall = () => {
        Linking.openURL(`tel:${props.item.authenticationId.phoneNo}`);
    };

    const handleMessage = () => {
        const messageUrl = `sms:${props.item.authenticationId.phoneNo}`;
        Linking.openURL(messageUrl);
    };
    const handlenavigation = () => {
        if (activeItem.status === 'accepted' && activeItem?.acceptor?.phone===profileState.phone) {
            navigation.navigate('CloseBooking', { item: props.item })
        } else {
            if (activeItem.status === 'closed') {
                showNoty("This booking is now closed !! You will see it in history now", "danger")
            }else{
                showNoty("Booking Not yet assigned to you", "danger")
            }
        }
    }
    const checkLeads = () => {
        setShowLeads(true)
    }

    return (
        <View >
            <CheckLeadsModal
                show={showLeads}
                setShow={setShowLeads}
                driversArray={props.item.driverResponse}
            />
            <View style={styles.activeBar}>
                <TouchableOpacity onPress={handlenavigation}>
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
                </TouchableOpacity>

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
                    <TouchableOpacity style={styles.iconContainer} onPress={checkLeads}>
                        <Icon name="format-list-bulleted" size={30} color="black" />
                        <Text style={styles.scheduleText}>Leads</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
export default BookingAcceptedCard