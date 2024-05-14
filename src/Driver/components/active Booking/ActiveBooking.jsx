import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View, FlatList, ScrollView, StyleSheet, StatusBar, ActivityIndicator, RefreshControl, Alert, BackHandler } from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import ActiveBookingCard from './ActiveBookingCard'

import { BgColor, ScreenColor } from '../../../styles/colors'
import { height, width } from '../../../styles/responsive'
import { activeBookingInfo } from '../../../services/apiCall'
import { showNoty } from '../../../common/flash/flashNotification'
import FlashMessage from 'react-native-flash-message'
import { getBookingsDriverHasPosted, getIntercityBookingFromPostVendor } from '../../../services/getDataServices'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

const ActiveBooking = (props) => {
    const {showHeader , showFooter} = props
    const [isRefreshing, setIsRefreshing] = useState(false)
    const navigation=  useNavigation()
    const [activeBookingArray, setActiveBookingArray] = useState([])
    const [refresh, setRefresh] = useState(true)
    const ref = useRef(null)
    const fetchData = async () => {
        setIsRefreshing(true)
        getBookingsDriverHasPosted().then(data => {
            console.log(data.data.data)
            setActiveBookingArray(data.data.data)
            // showNoty("Active Booking Refreshed", "info")
        })
            .catch(error => {
                console.log('ERROR CALLING ACTIVE BOOKING SCHEMA')
            })
        setInterval(() => {
            setIsRefreshing(false)
        }, 200)

    }
    useFocusEffect(
        useCallback(()=>{
            fetchData()
        },[])
    )
    useEffect(() => {
        getBookingsDriverHasPosted()
            .then(data => {
                console.log(data.data.data)
                if(data.data.data?.length===0){
                    Alert.alert("No Active Booking")
                }
                setActiveBookingArray(data.data.data)
            })
            .catch(error => {
                console.log('ERROR CALLING ACTIVE BOOKING SCHEMA')
            })
    }, [refresh])
    useEffect(() => {
        const backFuntion = () => {
            navigation.goBack()
            return true
        }
        console.log("BACKHANDLER SET IN HOME PAGE")
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion);
        return () => {
            console.log('BACKHANDLER REMOVED FROM HOME PAGE')
            backHandler.remove()
        };
    }, []);
    return (
        <AuthenticatedLayout title={'Active Booking'} showHeader={showHeader}  showFooter={showFooter}>
            {isRefreshing && <ActivityIndicator size={'large'} color={'black'} />}
           
                <FlashMessage ref={ref} />
                {activeBookingArray.length > 0 ? <FlatList
                    style={{ flex: 1, backgroundColor: BgColor, height: height, marginBottom: 35 }}
                    keyExtractor={(item, index) => (index)}
                    data={activeBookingArray}
                    refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                }
                    renderItem={({ item, index }) => {
                        return <View key={index}>
                            <View key={index} style={styles.FlatListviewStyle}><ActiveBookingCard item={item} load={fetchData}/></View>
                        </View>
                    }}
                /> : <View><Text style={{marginLeft : 15 , color : 'red' , fontFamily:  "serif"}}>None Active Booking</Text></View>}
          
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