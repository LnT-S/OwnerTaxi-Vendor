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
import YesNoModal from '../../../adOns/molecules/YesNoModal'
import { getIntercityBookingFromPostVendor, getLocalBooking } from '../../../services/getDataServices'
const HomePageDriver = () => {
    const activeList = [
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId: 1234567890,
            verifiedBy: 'Owner Taxi',
            status: 'active',
            subtype: 'Oneway',
            car: 'Auto'
        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId: 1234567890,
            verifiedBy: 'Vendor',
            status: 'active',
            subtype: 'Oneway',
            car: 'Auto'
        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId: 1234567890,
            verifiedBy: false,
            status: 'closed',
            subtype: 'Oneway',
            car: 'Sedan'
        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '12:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId: 1234567890,
            verifiedBy: 'Owner Taxi',
            status: 'active',
            subtype: 'Round Trip',
            car: 'Mini'
        },
        {
            from: 'Aman Tiwari, Naween chowk SITAPUR',
            to: 'Shruti Mishra, Ghura mau bangla',
            date: '06-07-2019',
            time: '01:00 PM',
            customerID: 'Shruti Mishra',
            budget: 550,
            bookingId: 1234567890,
            verifiedBy: 'Owner Taxi',
            status: 'active',
            subtype: 'Oneway',
            car: 'Alto'
        }

    ];
    const navigation = useNavigation()
    const [showSearchResult, setShowSearchResults] = useState(true)
    const [selectedOption, setSelectedOption] = useState('Local')
    const [showModal, setShowModal] = useState(false)
    const [showPostBookingModal, setShowPostBookingModal] = useState(false)

    const [localList, setLocalList] = useState([])
    const [intercityList, setIntercityList] = useState([])

    const fetchLocal = () => {
        getLocalBooking()
            .then(data => {
                console.log("**", data.data.data)
                setLocalList(data.data.data)
            })
            .catch(err => {
                console.log("ERROR IN GETTING LOCAL DATA ", err);
            })
        getIntercityBookingFromPostVendor()
            .then(data => {
                console.log("INTERCITY DATA ", data.data.data)
                setIntercityList(data.data.data)
            })
            .catch(err => {
                console.log("ERROR IN FETCHING INTERCITY DATA ", err)
            })
    }
    const postBookingFunctionalObject = {
        function1: {
            name: 'Intercity',
            action: () => {
                navigation.navigate('Intercity')
            }
        },
        function2: {
            name: 'Rental',
            action: () => {
                navigation.navigate('Rental')
            }
        },
    }

    const handleYes = async () => {
        setShowModal(false);
        BackHandler.exitApp();
    };

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
        <AuthenticatedLayout title={'Home'} showFooter={false}>
            <View style={{ position: 'relative', flex: 1 }}>
                <FunctionalModal
                    show={showPostBookingModal}
                    setShow={setShowPostBookingModal}
                    title={'Choose Booking Type'}
                    functionalObject={postBookingFunctionalObject}
                />
                <YesNoModal
                    show={showModal}
                    setShow={setShowModal}
                    title={'EXIT ?'}
                    message={'Are You Sure Want To Exit ?'}
                    handleYes={handleYes}
                    yesText={'Exit'}
                    noText={'Cancel'} />
                <View style={styles.viewStyle}>
                    <View style={styles.liststyle}>
                        <Text style={styles.textStyle}>LIVE FEED REQUESTS</Text>
                        <TouchableOpacity onPress={fetchLocal}><RefreshButton action={fetchLocal} /></TouchableOpacity>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TwoWayPushButton option1={'Local'} option2={'InterCity'} setter={setSelectedOption} />
                    </View>
                    <View style={{ height: '75%' }}>
                        <FlatList
                            keyExtractor={(item, index) => (index)}
                            data={selectedOption==='Local' ? localList : intercityList}
                            renderItem={({ item }) => {
                                return <View style={styles.FlatListviewStyle}><LazyLoadActiveRequestCard item={selectedOption==='Local' ? item.passiveBookingId : item} type={selectedOption} /></View>
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 8 }}>
                        <PressButton name={'            Post Booking            '}
                            onPress={() => { setShowPostBookingModal(true) }} />
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