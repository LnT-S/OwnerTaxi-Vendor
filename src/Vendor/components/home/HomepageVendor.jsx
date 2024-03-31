import React, { useEffect, useState } from 'react'
import { BackHandler, ScrollView, Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchBox from '../../../adOns/atoms/Search'
import Icon from 'react-native-vector-icons/MaterialIcons';
// const LazyLoadActiveRequestCard = React.lazy(() => import('../Driver/components/ActiveRequestCard.js'))
import LazyLoadActiveRequestCard from './ActiveRequestCard'
import TwoWayPushButton from '../../../adOns/molecules/TwoWayPushButton'
import RefreshButton from '../../../adOns/molecules/RefreshButton'
import AuthenticatedLayoutVendor from '../../common/layout/AuthenticatedLayoutVendor';
const HomePageVendor = () => {

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
            subtype : 'Oneway',
            car : 'Auto'
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
            subtype : 'Oneway',
            car : 'Auto'
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
            subtype : 'Oneway',
            car : 'Sedan'
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
            subtype : 'Round Trip',
            car : 'Mini'
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
            subtype : 'Oneway',
            car : 'Alto'
        }

    ];
    const navigation = useNavigation()
    const [showSearchResult, setShowSearchResults] = useState(true)
    const [selectedOption, setSelectedOption] = useState('')
    const [searchArray, setSearchArray] = useState(['item1', 'ghantu', 'kalyaanimaam', 'shrutimaam', 'herapheri', 'kgf'])

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
        <AuthenticatedLayoutVendor title={'Home Vendor'}>
            <View style={{ position: 'relative', flex: 1 }}>
                <View style={{ zIndex: 2 }}>
                    <SearchBox searchArray={searchArray} />
                </View>

                <View style={styles.viewStyle}>
                    <View style={styles.liststyle}>
                        <Text style={styles.textStyle}>LIVE INTERCITY FEED REQUESTS</Text>
                        <RefreshButton/>
                    </View>
                    {/*<View style={{display: 'flex',justifyContent:'center',alignItems:'center'}}>
                        <TwoWayPushButton option1={'Local'} option2={'InterCity'} setter={setSelectedOption} />
    </View>*/}

                    <FlatList
                        style={{}}
                        keyExtractor={(item, index) => (index)}
                        data={activeList}
                        renderItem={({ item }) => {
                            return <View style={styles.FlatListviewStyle}><LazyLoadActiveRequestCard item={item} /></View>
                        }}

                    />
                </View>
            </View>
        </AuthenticatedLayoutVendor>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        zIndex: 1,
        height: '88%'
    },
    liststyle: {
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        letterSpacing : 1.3,
        color: 'red',
        fontSize: 20,
        fontWeight: "900"

    },
    FlatListviewStyle: {
        marginVertical: 10
    }
})

export default HomePageVendor