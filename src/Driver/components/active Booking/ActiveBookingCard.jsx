import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'react-native';
import { showNoty } from '../../../common/flash/flashNotification';
import FlashMessage from 'react-native-flash-message';
import YesNoModal from '../../../adOns/molecules/YesNoModal';
import { deleteBooking } from '../../../services/apiCall';

const ActiveBookingCard = (props) => {

    const activeItem = props.item?.passiveBookingId
    const navigation = useNavigation()
    const ref = useRef(null)
    const [showModal, setShowModal] = useState(false)

    const handleView = () => {
        navigation.navigate("IntercityRequestHandler", { item: activeItem })
    }
    const handleYes =()=>{
        setShowModal(false)
        deleteBooking({bookingId : props?.item?.passiveBookingId?._id})
        .then(data=>{
            if(data.status===200){
                showNoty(data.data.message , "success")
                props?.load()
            }else{
                showNoty(data.data.message , "danger")
            }
        })
        .catch(err=>{
            console.log("ERROR DELETING ACCOUNT ",err);
            showNoty("Some Error Occured ! Try After Some Time")
        })
    }

    const handlenavigation = () => {
        if (activeItem.status === 'bidstarted' || activeItem.status === 'accepted') {
            console.log("Active RERRRRRR ", props.item)
            navigation.navigate('Bidding', { item: props.item })
        } else {
            if (activeItem.status === 'pending') {
                showNoty("No Driver has yet accepted your booking ", "info")
            }else{
                showNoty("You will now see this in history ", "info")
            }
        }
    }
    return (
        <View>
            <FlashMessage ref={ref} />

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
                <YesNoModal
                    show={showModal}
                    setShow={setShowModal}
                    title={'EXIT ?'}
                    message={'Are You Sure Want To Delete this Booking ?'}
                    handleYes={handleYes}
                    yesText={'Delete'}
                    noText={'Cancel'} />
                {<View style={[styles.container, styles.borderTop, {}]} >
                    <TouchableOpacity style={styles.iconContainer} onPress={handleView}>
                        <Icon name="preview" size={30} color='#31db1a' />
                        <Text style={styles.scheduleText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={handlenavigation}>
                        <Icon name="view-list" size={30} color="blue" />
                        <Text style={styles.scheduleText}>Driver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={()=>setShowModal(true)}>
                        <Icon name="cancel" size={30} color="red" />
                        <Text style={styles.scheduleText}>Delete</Text>
                    </TouchableOpacity>
                </View>}
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
export default ActiveBookingCard