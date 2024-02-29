import React, { useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ThreeWayPushButton from '../../../adOns/molecules/ThreeWayPushButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AuthenticatedLayoutVendor from '../../common/layout/AuthenticatedLayoutVendor';
import MessageCard from './MessageCard';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../../../adOns/organisms/LoadingScreen';

const MessageVendor = () => {

    const navigation = useNavigation()
    const [pageIsLoading , setPageIsLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(false)

    const refreshing = async () => {
    }
    const fetchData = async () => {
        setIsRefreshing(true)
        setInterval(() => {
            setIsRefreshing(false)
        }, 200)

    }

    const ChatList = [
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Person Name',
            lastMessage: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Person Name',
            lastMessage: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Person Name',
            lastMessage: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Person Name',
            lastMessage: 'Thisssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Person Name',
            lastMessage: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Person Name',
            lastMessage: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Person Name',
            lastMessage: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },
        {
            image: require('../../../assets/imgaes/Profile.png'),
            name: 'Name',
            lastMessage: 'This is just a example of Vendor Notification Click here to see more Notification related to vendor',
        },

    ]

    const handleMessageChat = (item) => {
        navigation.navigate('MessageScreenVendor',{item})
    }
    if(pageIsLoading){
        return <LoadingScreen />
    }else{
        return (
            <AuthenticatedLayoutVendor title={'Messages Vendor'} showMessageIcon={false}>
                <View style={[styles.flexDirection, styles.margin]}>
                    <View style={styles.ThreeWaywidth}>
                        <ThreeWayPushButton outerStyles={{ margin: 0, width: '100%', height : 55 }} option1={'All'} option2={'Vendor'} option3={'Customer'} setter={setSelectedOption} />
                    </View>
                    {/*<View style={styles.FilterIcon}>
                        <Icon name="filter-list" size={34} color="black" />
        </View>*/}
                </View>
    
                <View style={{ marginTop: 10, flex : 1}}>
                    {isRefreshing && <ActivityIndicator size={'large'} color={'black'} />}
                    <FlatList
                        style={{}}
                        keyExtractor={(item, index) => (index)}
                        data={ChatList}
                        renderItem={({ item }) => {
                            return <TouchableOpacity onPress={()=>handleMessageChat(item)}>
                                <View style={styles.FlatListviewStyle}>
                                    <MessageCard item={item} />
                                </View>
                            </TouchableOpacity>
                        }}
                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                        }
                    />
                </View>
            </AuthenticatedLayoutVendor>
        )
    }
}

const styles = StyleSheet.create({
    flexDirection: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position : 'relative'
    },
    FilterIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '800',
        color: 'black'
    },
    ThreeWaywidth: {
        flexBasis: '85%',
        marginRight: 10
    },
    margin: {
        marginTop: 15
    },
    FlatListviewStyle: {
        marginVertical: 1
    }
})

export default MessageVendor