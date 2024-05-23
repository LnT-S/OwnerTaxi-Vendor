import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler, ScrollView, Text, View, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import SearchBox from '../../../adOns/atoms/Search'
import ESearchBox from '../../../adOns/atoms/ExternalSearch'
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
import LoadingScreen from '../../../adOns/organisms/LoadingScreen'
import { getProfile } from '../../../services/profileServices'
import { useProfile } from '../../../context/ContextProvider'
import BookingAccepted from '../active Booking/BookingAccepted'
import ActiveBooking from '../active Booking/ActiveBooking'
import { BgColor } from '../../../styles/colors'
import { showNoty } from '../../../common/flash/flashNotification'
import FlashMessage from 'react-native-flash-message'
import ONE, { OneSignal } from 'react-native-onesignal'
import { updateSubscription } from '../../../services/apiCall'
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
    const route = useRoute();
    const ref = useRef()
    const { profileState, profileDispatch } = useProfile()
    const { reload, option } = route?.params ? route.params : ''
    const [showSearchResult, setShowSearchResults] = useState(true)
    const [selectedOption, setSelectedOption] = useState('InterCity')
    // console.log('selection ', selectedOption)
    const [pageIsLoading, setPageIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showPostBookingModal, setShowPostBookingModal] = useState(false)
    const [localList, setLocalList] = useState([])
    const [intercityList, setIntercityList] = useState([])
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [searchedTerm, setSearchedTerm] = useState('')
    const [searchedData, setSearchedData] = useState([])
    const toggleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar)
    }
    useEffect(() => {
        // Filter data whenever the search query changes
        if (searchedTerm === '') {
            return setSearchedData(intercityList)
        }
        // console.log('Serched term', searchedTerm)
        const filtered = intercityList.filter(item =>
            (item.pickUp?.description && item.pickUp?.description?.toLowerCase().includes(searchedTerm?.toLowerCase() || '')) ||
            (item.vehicle.type && item.vehicle.type?.toLowerCase().includes(searchedTerm?.toLowerCase() || '')) ||
            (item.vehicle.subType && item.vehicle.subType?.toLowerCase().includes(searchedTerm?.toLowerCase() || '')) ||
            (item.bookingType && item.bookingType?.toLowerCase().includes(searchedTerm?.toLowerCase() || ''))
        );
        setSearchedData(filtered);
    }, [searchedTerm]);

    const [optionIndex, setOptionIndex] = useState(0);
    const optionList = {
        option1: {
            name: "All",
            action: () => { }
        },
        option2: {
            name: "Accepted Bookings",
            action: () => { }
        },
        option3: {
            name: "Posted Bookings",
            action: () => { }
        },
    }
    const fetchLocal = () => {
        setPageIsLoading(true)
        setSelectedOption('InterCity')
        getLocalBooking()
            .then(data => {
                console.log("**", data.data.data)
                setLocalList(data.data.data)
                setPageIsLoading(false)
            })
            .catch(err => {
                console.log("ERROR IN GETTING LOCAL DATA ", err);
            })
        getIntercityBookingFromPostVendor()
            .then(data => {
                console.log("INTERCITY DATA ", data.data.data)
                if (data.status === 200) {
                    setIntercityList(data.data.data)
                    setSearchedData(data.data.data)
                    setPageIsLoading(false)
                } else {
                    showNoty(data.data.message, "danger")
                }
            })
            .catch(err => {
                console.log("ERROR IN FETCHING INTERCITY DATA ", err)
                showNoty(err.data.message || err, "danger")
            })
    }
    useFocusEffect(
        useCallback(() => {
            fetchLocal()
            setSelectedOption(option)
        }, [])
    );

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
        setPageIsLoading(true)
        getProfile()
            .then(data => {
                profileDispatch({
                    type: 'PHONE',
                    payload: data.data.data.phoneNo
                })
                profileDispatch({
                    type: 'USERNAME',
                    payload: data.data.data.name
                })
                profileDispatch({
                    type: 'AVATAR',
                    payload: data.data.data.avatar
                })
                console.log("PROFILE UPDATED")
            })
            .catch(err => {
                console.log("ERROR IN RETRIVING PROFILE ", err)
            })
        setPageIsLoading(false)
    }, [])
    useFocusEffect(
        useCallback(()=>{
            const backFuntion = () => {
                setShowModal(true)
                return true
            }
            console.log("BACKHANDLER SET IN HOME PAGE")
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion);
        },[])
    )
    useEffect(() => {

        // OneSignal.Notifications.requestPermission(true);
        // OneSignal.initialize("6a48b3bc-d5bd-4246-9b8e-d453e8373a70")
        // OneSignal.Notifications.addEventListener('click', (event) => {
        //     console.log('OneSignal: notification clicked:', event);
        // });
        // OneSignal.Notifications.addEventListener('received', (event) => {
        //     console.log('OneSignal: notification clicked:', event);
        // });
        OneSignal.User.pushSubscription.getIdAsync()
            .then(data => {
                console.log("REQUESTEES ", data);
                updateSubscription({ sId: data })
                    .then(data => {
                        if (data.status === 200) {
                            console.log("Subscribed To Notifications");
                        } else {
                            Alert.alert("Notifications", "You have not been subscribed to notifications. Restart your application or login again")
                        }
                    })
                    .catch(err => {
                        console.log("ERROR IN UPDATING SUBSCRIPTION ", err);
                    })
            })
            .catch(err => {
                console.log("ERROR IN REQUESTEES ", err);
            })
        const backFuntion = () => {
            setShowModal(true)
            return true
        }
        console.log("BACKHANDLER SET IN HOME PAGE")
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion);
        return () => {
            console.log('BACKHANDLER REMOVED FROM HOME PAGE')
            backHandler.remove()
        };
    }, []);
    const leftCenterJsx = (<View style={{ height: 80, width: 100, position: 'relative', top: 0, marginLeft: 40, marginRight: -10 }}><Image resizeMode='contain' source={require('../../../assets/imgaes/Taxilogo.png')} style={{ height: '100%', width: '100%' }} /></View>)

    if (pageIsLoading) {
        return (
            <LoadingScreen cs={false} />)
    } else {
        return (
            <AuthenticatedLayout title={'Onwer Taxi'} showFooter={false} showBackIcon={false} showSearch={true} searchAction={toggleShowSearchBar}>
                <View style={{ position: 'relative', flex: 1 }}>
                    <FlashMessage ref={ref} />
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
                        {!showSearchBar ? <View style={styles.liststyle}>
                            <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '90%' }}>
                                <TwoWayPushButton option1={'InterCity'} option2={'Taxi'} setter={setSelectedOption} />
                            </View>
                            <TouchableOpacity onPress={fetchLocal}><RefreshButton action={fetchLocal} /></TouchableOpacity>
                        </View> :
                            <ESearchBox placeholder={'Search by Pick Up, Vehicle/Booking Type'}
                                setSearchedTerm={setSearchedTerm}
                                searchedTerm={searchedTerm} />
                        }
                        <View style={{ width: '100%', padding: 15, marginBottom: 10, marginTop: -10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', }}>
                            {
                                Object.values(optionList).map((el, i) => {
                                    return (
                                        <TouchableOpacity key={i} style={{ borderBottomWidth: 2, borderBottomColor: optionIndex === i ? "black" : 'rgba(255,255,255,0.05)', padding: 5 }} onPress={() => setOptionIndex(i)}>
                                            <Text style={{ color: "black", fontWeight: optionIndex === i ? '700' : '300', fontSize: optionIndex === i ? 18 : 16, fontFamily: 'serif' }}>{el.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        {/*<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TwoWayPushButton option1={'Local'} option2={'InterCity'} setter={setSelectedOption} />
    </View>*/}
                        {
                            (selectedOption === 'Taxi') ?
                                <LoadingScreen cs={true} showHeader={false} showFooter={false} />
                                : (optionIndex === 0) ?
                                    <View style={{ flex: 1 }}>
                                        <FlatList
                                            keyExtractor={(item, index) => (index)}
                                            data={selectedOption === 'Taxi' ? localList : searchedData}
                                            renderItem={({ item }) => {
                                                return <View style={styles.FlatListviewStyle}><LazyLoadActiveRequestCard item={selectedOption === 'Taxi' ? item.passiveBookingId : item} type={selectedOption} /></View>
                                            }}
                                        />
                                    </View> :
                                    (optionIndex === 1)
                                        ?
                                        <View style={{ flex: 1 }}>
                                            <BookingAccepted showHeader={false} showFooter={false} />
                                        </View>
                                        :
                                        <View style={{ flex: 1 }}>
                                            <ActiveBooking showHeader={false} showFooter={false} />
                                        </View>
                        }
                        <View style={{ marginTop: 0 }}>
                            <PressButton name={'            Post Booking            '}
                                onPress={() => { setShowPostBookingModal(true) }} />
                        </View>
                    </View>
                </View>
            </AuthenticatedLayout>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle: {
        zIndex: 1,
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10
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