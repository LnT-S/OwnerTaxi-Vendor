import React, { useEffect, useState } from 'react'
import { BackHandler, ScrollView, Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchBox from '../../../adOns/atoms/Search'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import Icon from 'react-native-vector-icons/MaterialIcons';
// const LazyLoadActiveRequestCard = React.lazy(() => import('../Driver/components/ActiveRequestCard.js'))
import LazyLoadActiveRequestCard from './ActiveRequestCard'
import TwoWayPushButton from '../../../adOns/molecules/TwoWayPushButton'
import RefreshButton from '../../../adOns/molecules/RefreshButton'
import PressButton from '../../../adOns/atoms/PressButton'
import FunctionalModal from '../../../adOns/molecules/FunctionalModal'
const HomePageDriver = () => {
    const activeList = [
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId : 1234567890,
            verifiedBy : 'Owner Taxi',
            status : 'active',
        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId : 1234567890,
            verifiedBy : 'Vendor',
            status : 'active'

        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId : 1234567890,
            verifiedBy : false,
            status : 'closed'

        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId : 1234567890,
            verifiedBy : 'Owner Taxi',
            status : 'active'

        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '01:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId : 1234567890,
            verifiedBy : 'Owner Taxi',
            status : 'active'
        }

    ];
    const navigation = useNavigation()
    const [showSearchResult, setShowSearchResults] = useState(true)
    const [selectedOption, setSelectedOption] = useState('')
    const [showPostBookingModal , setShowPostBookingModal] = useState(false)
    const postBookingFunctionalObject = {
        function1 : {
            name:  'Intercity',
            action : ()=>{
                navigation.navigate('Intercity')
            }
        },
        function2 : {
            name:  'Rental',
            action : ()=>{
                navigation.navigate('Rental')
            }
        },
    }

    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }
        console.log("BACKHANDLER SET IN HOME PAGE")
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            console.log('BACKHANDLER REMOVED FROM HOME PAGE')
            backHandler.remove()
        };
    }, []);

    return (
        <AuthenticatedLayout title={'Home'} showFooter={false}>
            <View style={{ position: 'relative', flex: 1 }}>
            <FunctionalModal 
            show={showPostBookingModal} 
            setShow={setShowPostBookingModal} 
            title={'Choose Booking Type'} 
            functionalObject={postBookingFunctionalObject}
            />
                <View style={styles.viewStyle}>
                    <View style={styles.liststyle}>
                        <Text style={styles.textStyle}>LIVE FEED REQUESTS</Text>
                        <RefreshButton />
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TwoWayPushButton option1={'Local'} option2={'InterCity'} setter={setSelectedOption} />
                    </View>
                    <View style={{ height: '75%' }}>
                        <FlatList
                            keyExtractor={(item, index) => (index)}
                            data={activeList}
                            renderItem={({ item }) => {
                                return <View style={styles.FlatListviewStyle}><LazyLoadActiveRequestCard item={item} /></View>
                            }}
                        />
                    </View>
                    <View style={{marginTop : 8}}>
                        <PressButton name={'            Post Booking            '} 
                        onPress={()=>{setShowPostBookingModal(true)}}/>
                    </View>
                </View>
            </View>
        </AuthenticatedLayout>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        zIndex: 1,
        height: '100%'
    },
    liststyle: {
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        letterSpacing: 1.3,
        color: 'red',
        fontSize: 20,
        fontWeight: "900"

    },
    FlatListviewStyle: {
        marginVertical: 10
    }
})

export default HomePageDriver