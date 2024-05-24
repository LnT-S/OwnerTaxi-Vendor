import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Linking, BackHandler } from 'react-native';
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout';
import { useNavigation, useRoute } from '@react-navigation/native';
import server from '../../../services/server.tsx'
import { assignBooking, unAssignBooking } from '../../../services/apiCall.jsx';
import FlashMessage from 'react-native-flash-message';
import { showNoty } from '../../../common/flash/flashNotification.jsx';

const BidingPage = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const { item } = route.params
    const ref = useRef(null)
    console.log("ITEM IN BIIDING PAGE", item)
    const handleCall = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };
    const handleUnAssign = (phoneNo) => {
        unAssignBooking({
            bookingId: item?.passiveBookingId?._id,
            phoneNo
        })
            .then(data => {
                if (data.status === 200) {
                    showNoty(data.data.message, "info");
                    navigation.goBack()
                } else {
                    showNoty(data.data.message, "danger")
                }
            })
            .catch(err => {
                console.log("ERROR ASSIGN BOOKING", err)
                showNoty("BOOKING COULD NOT BE ASSIGNED ", "danger")
            })
    }
    const handleAssign = (phoneNo) => {
        assignBooking({
            bookingId: item?.passiveBookingId?._id,
            phoneNo
        })
            .then(data => {
                if (data.status === 200) {
                    showNoty(data.data.message, "info")
                    navigation.goBack()
                } else {
                    showNoty(data.data.message, "danger")
                }
            })
            .catch(err => {
                console.log("ERROR ASSIGN BOOKING", err)
                showNoty("BOOKING COULD NOT BE ASSIGNED ", "danger")
            })
    }
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
        <AuthenticatedLayout title={'Bidding Cofirmation'}>
            <FlashMessage ref={ref} />
            <FlatList
                keyExtractor={(item, index) => (index)}
                data={item.driverResponse}
                renderItem={({ item, index }) => {
                    return <View>
                        <View style={styles.FlatListviewStyle}>
                            <View style={styles.flexrow}>
                                <View style={styles.flexrow}>
                                    <Image
                                        source={!item.image ? require('../../../assets/imgaes/Profile.png') : { uri: server.server + item.image }}
                                        style={styles.image}
                                    />
                                    <View>
                                        <View>
                                            <Text style={{ ...styles.text, color: 'black', textTransform: 'capitalize' }}>{item.name}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ ...styles.text, color: 'black', textTransform: 'capitalize' }}>{item.driverPhone}</Text>
                                        </View>
                                        <View>
                                            <View>
                                                <Text style={{ ...styles.text, color: 'black' }}>
                                                    &#9733; {item.rating}
                                                </Text>
                                            </View>
                                            {item?.verifiedBy&&<View>
                                                <Text style={{ ...styles.text, color: 'gray' }}>
                                                    ({item?.verifiedBy})
                                                </Text>
                                            </View>}
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View>
                                        <Text style={{ ...styles.text, color: 'green', fontSize: 22 }}>
                                            ₹{route.params.item.passiveBookingId.budget}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.flexrow, margin: 5 }}>
                                <TouchableOpacity style={styles.btn} onPress={() => { handleCall(item.driverPhone) }}>
                                    <Text style={{ ...styles.text, color: 'red' }}>Call</Text>
                                </TouchableOpacity>
                                {route.params.item?.passiveBookingId?.acceptor?.phone?.toString() !== item.driverPhone ? <TouchableOpacity style={{ ...styles.btn, backgroundColor: 'green' }} onPress={() => { handleAssign(item.driverPhone) }}>
                                    <Text style={{ ...styles.text, color: 'white' }}>Assign</Text>
                                </TouchableOpacity> : <TouchableOpacity style={{ ...styles.btn, backgroundColor: 'green' }} onPress={() => { handleUnAssign(item.driverPhone) }}>
                                    <Text style={{ ...styles.text, color: 'white' }}>Un Assign</Text>
                                </TouchableOpacity>}
                            </View>
                        </View>
                    </View>
                }}
            />
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    FlatListviewStyle: {
        margin: 7,
        marginVertical: 6,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 10,
        marginRight: 10,
        backgroundColor: 'black'
    },
    flexrow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: 'lightgray',
        padding: 7,
        borderRadius: 5,
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    }
})

export default BidingPage;
