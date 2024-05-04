import React, { useEffect, useRef, useState } from 'react'
import { Text, View, FlatList, ScrollView, StyleSheet, StatusBar, ActivityIndicator, RefreshControl } from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import ActiveBookingCard from './ActiveBookingCard'

import { BgColor, ScreenColor } from '../../../styles/colors'
import { height, width } from '../../../styles/responsive'
import { activeBookingInfo } from '../../../services/apiCall'
import { showNoty } from '../../../common/flash/flashNotification'
import FlashMessage from 'react-native-flash-message'

const ActiveBooking = () => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [activeBookingArray, setActiveBookingArray] = useState([])
    const [refresh, setRefresh] = useState(true)
    const ref = useRef(null)
    const fetchData = async () => {
        setIsRefreshing(true)
        activeBookingInfo().then(data => {
            console.log(data.data.data)
            setActiveBookingArray(data.data.data)
            showNoty("Active Booking Refreshed", "info")
        })
            .catch(error => {
                console.log('ERROR CALLING ACTIVE BOOKING SCHEMA')
            })
        setInterval(() => {
            setIsRefreshing(false)
        }, 200)

    }
    useEffect(() => {
        activeBookingInfo().then(data => {
            console.log(data.data.data)
            setActiveBookingArray(data.data.data)
        })
            .catch(error => {
                console.log('ERROR CALLING ACTIVE BOOKING SCHEMA')
            })
    }, [refresh])

    // const activeBookingArray = [
    //     {
    //         type: 'intercity',
    //         subType: 'round-trip',
    //         status: 'pending',
    //         pickUp: {
    //             point: 'naveen chowk',
    //             time: '02:00'
    //         },
    //         drop: {
    //             point: 'GIC',
    //             time: '17:00'
    //         },
    //         payment: {
    //             amount: 3000,
    //             budget: 2000,
    //             mode: 'cash'
    //         }
    //     },
    //     {
    //         type: 'Local',
    //         subType: '',
    //         status: 'confirmed',
    //         pickUp: {
    //             point: 'naveen chowk',
    //             time: '02:00'
    //         },
    //         drop: {
    //             point: 'GIC',
    //             time: '17:00'
    //         },
    //         payment: {
    //             amount: 3000,
    //             mode: 'cash'
    //         }
    //     },
    //     {
    //         type: 'Local',
    //         subType: '',
    //         status: 'Budget Confirmation Pending From your Side',
    //         pickUp: {
    //             point: 'naveen chowk naveen chowknaveen chowkvvv naveen chowk naveen chowk naveen chowk',
    //             time: '02:00'
    //         },
    //         drop: {
    //             point: 'GIC',
    //             time: '17:00'
    //         },
    //         payment: {
    //             amount: 3000,
    //             mode: 'cash'
    //         },
    //         driver: [
    //             {
    //                 image:require('../../assets/imgaes/Profile2.png'),
    //                 name: "Nadim",
    //                 rating: 4.9,
    //                 satisfiedCustomer: 134,
    //                 cost: 228,
    //                 time: '6 min',
    //                 kilometer: '2.8 Km'
    //             },
    //             {
    //                 image:require('../../assets/imgaes/Profile2.png'),
    //                 name: "Gajanan",
    //                 rating: 5.0,
    //                 satisfiedCustomer: 45,
    //                 cost: 225,
    //                 time: '7 min',
    //                 kilometer: '2.7 Km'
    //             },
    //             {
    //                 image:require('../../assets/imgaes/Profile2.png'),
    //                 name: "Nadim",
    //                 rating: 4.9,
    //                 satisfiedCustomer: 134,
    //                 cost: 228,
    //                 time: '6 min',
    //                 kilometer: '2.8 Km'
    //             },
    //             {
    //                 image:require('../../assets/imgaes/Profile2.png'),
    //                 name: "Nadim",
    //                 rating: 4.9,
    //                 satisfiedCustomer: 134,
    //                 cost: 228,
    //                 time: '6 min',
    //                 kilometer: '2.8 Km'
    //             },
    //             {
    //                 image:require('../../assets/imgaes/Profile2.png'),
    //                 name: "Nadim",
    //                 rating: 4.9,
    //                 satisfiedCustomer: 134,
    //                 cost: 228,
    //                 time: '6 min',
    //                 kilometer: '2.8 Km'
    //             },
    //             {
    //                 image:require('../../assets/imgaes/Profile2.png'),
    //                 name: "Nadim",
    //                 rating: 4.9,
    //                 satisfiedCustomer: 134,
    //                 cost: 228,
    //                 time: '6 min',
    //                 kilometer: '2.8 Km'
    //             },
    //             {
    //                 image:require('../../assets/imgaes/Profile2.png'),
    //                 name: "Nadim",
    //                 rating: 4.9,
    //                 satisfiedCustomer: 134,
    //                 cost: 228,
    //                 time: '6 min',
    //                 kilometer: '2.8 Km'
    //             },

    //         ]
    //     },
    //     {
    //         type: 'Rental',
    //         subType: '',
    //         status: 'cancelled',
    //         pickUp: {
    //             point: 'naveen chowk',
    //             time: '02:00'
    //         },
    //         drop: {
    //             point: 'GIC',
    //             time: '17:00'
    //         },
    //         payment: {
    //             amount: 3000,
    //             mode: 'cash'
    //         }
    //     },
    //     {
    //         type: 'Rental',
    //         subType: '',
    //         status: 'cancelled',
    //         pickUp: {
    //             point: 'naveen chowk',
    //             time: '02:00'
    //         },
    //         drop: {
    //             point: 'GIC',
    //             time: '17:00'
    //         },
    //         payment: {
    //             amount: 3000,
    //             mode: 'cash'
    //         }
    //     },
    //     {
    //         type: 'Rental',
    //         subType: '',
    //         status: 'cancelled',
    //         pickUp: {
    //             point: 'naveen chowk',
    //             time: '02:00'
    //         },
    //         drop: {
    //             point: 'GIC',
    //             time: '17:00'
    //         },
    //         payment: {
    //             amount: 3000,
    //             mode: 'cash'
    //         }
    //     }
    //     , {
    //         type: 'Rental',
    //         subType: '',
    //         status: 'cancelled',
    //         pickUp: {
    //             point: 'naveen chowk',
    //             time: '02:00'
    //         },
    //         drop: {
    //             point: 'GIC',
    //             time: '17:00'
    //         },
    //         payment: {
    //             amount: 3000,
    //             mode: 'cash'
    //         }
    //     }
    // ]
    return (
        <AuthenticatedLayout title={'Active Booking'}>
            {isRefreshing && <ActivityIndicator size={'large'} color={'black'} />}
            <ScrollView style={{ flex: 1, backgroundColor: BgColor, height: height, marginBottom: 35 }}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                }
            >
                <FlashMessage ref={ref}/>
                {activeBookingArray.length > 0 ? <FlatList
                    keyExtractor={(item, index) => (index)}
                    data={activeBookingArray}
                    renderItem={({ item, index }) => {
                        return <View>
                            <View style={styles.FlatListviewStyle}><ActiveBookingCard item={item} /></View>
                        </View>
                    }}
                /> : <View><Text>No Active Booking</Text></View>}
            </ScrollView>
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
export default ActiveBooking