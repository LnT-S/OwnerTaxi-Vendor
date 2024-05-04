import React from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout';
import { useRoute } from '@react-navigation/native';

const BidingPage = (props) => {
    const route = useRoute()
    const { item } = route.params
    const driverArray = item.driver
    return (
        <AuthenticatedLayout title={'Bidding Cofirmation'}>
            <FlatList
                keyExtractor={(item, index) => (index)}
                data={driverArray}
                renderItem={({ item, index }) => {
                    return <View>
                        <View style={styles.FlatListviewStyle}>
                            <View style={styles.flexrow}>
                                <View style={styles.flexrow}>
                                    <Image
                                        source={item.image}
                                        style={styles.image}
                                    />
                                    <View>
                                        <View>
                                            <Text style={{ ...styles.text, color:'black',textTransform:'capitalize' }}>{item.name}</Text>
                                        </View>
                                        <View>
                                            <View>
                                                <Text style={{ ...styles.text, color:'black' }}>
                                                    &#9733; {item.rating}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ ...styles.text, color:'gray' }}>
                                                    ({item.satisfiedCustomer})
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View>
                                        <Text style={{ ...styles.text, color:'green',fontSize: 22 }}>
                                            ₹{item.cost}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ ...styles.text, color:'black' }}>
                                            {item.time}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ ...styles.text, color:'black' }}>
                                            {item.kilometer}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{...styles.flexrow, margin: 5}}>
                                <TouchableOpacity style={styles.btn}>
                                    <Text style={{ ...styles.text, color:'red' }}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.btn, backgroundColor: 'green' }}>
                                    <Text style={{ ...styles.text, color:'white' }}>Accept</Text>
                                </TouchableOpacity>
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
        marginRight: 10
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
