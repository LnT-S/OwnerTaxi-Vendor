import React, { useEffect, useRef, useState } from 'react'
import { Text, View, FlatList, ScrollView, StyleSheet, StatusBar, ActivityIndicator, RefreshControl, Alert } from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import { BgColor, ScreenColor } from '../../../styles/colors'
import { height, width } from '../../../styles/responsive'
import { activeBookingInfo } from '../../../services/apiCall'
import { showNoty } from '../../../common/flash/flashNotification'
import FlashMessage from 'react-native-flash-message'
import { getBookingsDriverHasAccepted, getIntercityBookingFromPostVendor } from '../../../services/getDataServices'
import BookingAcceptedCard from './BookingAcceptedCard'

const BookingAccepted = () => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [activeBookingArray, setActiveBookingArray] = useState([])
    const [refresh, setRefresh] = useState(true)
    const ref = useRef(null)
    const fetchData = async () => {
        setIsRefreshing(true)
        getBookingsDriverHasAccepted().then(data => {
            console.log(data.data.data)
            setActiveBookingArray(data.data.data)
            // showNoty("Refreshed", "info")
        })
            .catch(error => {
                console.log('ERROR CALLING ACTIVE BOOKING SCHEMA')
            })
        setInterval(() => {
            setIsRefreshing(false)
        }, 200)

    }
    useEffect(() => {
        getBookingsDriverHasAccepted()
            .then(data => {
                // console.log(data.data.data)
                if(data.data.data?.length===0){
                    Alert.alert("No Accepted Bookings")
                    // showNoty("You have not accepted any booking","info")
                }
                setActiveBookingArray(data.data.data)
            })
            .catch(error => {
                // console.log('ERROR CALLING ACTIVE BOOKING SCHEMA')
            })
    }, [refresh])
    return (
        <AuthenticatedLayout title={'Booking Accepted'}>
            {isRefreshing && <ActivityIndicator size={'large'} color={'black'} />}
           
                <FlashMessage ref={ref} />
                <FlatList
                    style={{ flex: 1, backgroundColor: BgColor, height: height, marginBottom: 35 }}
                    keyExtractor={(item, index) => (index)}
                    data={activeBookingArray}
                    refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                }
                    renderItem={({ item, index }) => {
                        return <View>
                            <View key={index} style={styles.FlatListviewStyle}><BookingAcceptedCard item={item} /></View>
                        </View>
                    }}
                />
          
        </AuthenticatedLayout>
    )
}
const styles = StyleSheet.create({
    FlatListviewStyle: {
        marginVertical: 5
    },
    numberText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'black',
        textTransform: 'capitalize'
    }
})
export default BookingAccepted