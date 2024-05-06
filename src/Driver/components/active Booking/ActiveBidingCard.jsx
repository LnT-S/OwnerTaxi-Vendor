import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BgColor } from '../../../styles/colors';

const ActiveCard = (props) => {

    const activeItem = props.item
    const [shouldBlur, setShouldBlur] = useState(false)

    const handleCall = () => {
        Linking.openURL(`tel:${8175973674}`);
    };

    const handleMessage = () => {
        const messageUrl = `sms:${8175973674}`;
        Linking.openURL(messageUrl);
    };
    useEffect(() => {

        (activeItem.status === 'cancelled') ?
            setShouldBlur(true) : setShouldBlur(false)

    }, [activeItem])
    return (
        <View style={{ flex: 1, backgroundColor:BgColor, margin: 5 }}>
        
            <View style={{backgroundColor: 'black', display: 'flex', justifyContent: 'space-between' }}>
                {/**Scheduled on and type */}
                <View style={styles.schedulecontainer}>
                    <View style={styles.scheduleheading}>
                        <Text style={styles.textHeading}>Scheduled On :</Text>
                    </View>
                    <View style={styles.scheduleContent}>
                        <View style={styles.scheduleType}>
                            <Text style={styles.scheduleText}>{activeItem.type}</Text>
                            <Text style={styles.scheduleText}>{activeItem.subType}</Text>
                        </View>
                        <View style={styles.scheduleType}>
                            <Text style={styles.scheduleText}>Status</Text>
                            <Text style={styles.scheduleText}>{activeItem.status}</Text>
                        </View>
                    </View>
                </View>

                <View style={[(shouldBlur ? { opacity: 0.2 } : {}),]}>
                    {/*Address Details*/}
                    <View style={styles.container}>
                        <View style={styles.addType}>
                            <View>
                                <Text style={styles.textHeading}>Pick up</Text>
                            </View>
                            <View>
                                <Text style={styles.scheduleText}>{activeItem.pickUp.point}</Text>
                            </View>
                            <View>
                                <Text style={styles.scheduleText}>{activeItem.pickUp.time}</Text>
                            </View>
                            
                        </View>
                        <View style={styles.addType}>
                            <View>
                                <Text style={styles.textHeading}>Drop</Text>
                            </View>
                            <View>
                                <Text style={styles.scheduleText}>{activeItem.drop.point}</Text>
                            </View>
                            <View>
                                <Text style={styles.scheduleText}>{activeItem.drop.time}</Text>
                            </View>
                        </View>
                    </View>
                    {/*Payment Details*/}
                    <View>
                        <View>
                            <Text style={[styles.textHeading, { marginLeft: 20 }]}>Payment Details</Text>
                        </View>
                        <View style={[styles.container, {margin:15,padding:20}]}>
                            <View>
                                <View>
                                    <Text style={[styles.scheduleText,{}]}>Amount:</Text>
                                </View>
                                <View>
                                    {(activeItem.status === 'pending')
                                        ?
                                        <Text style={styles.scheduleText}>Budget:</Text>
                                        : ''
                                    }
                                </View>
                                <View>
                                    <Text style={styles.scheduleText}>Mode:</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.scheduleText}>{activeItem.payment.amount}</Text>
                                </View>
                                <View>
                                    {(activeItem.status === 'pending')
                                        ?
                                        <Text style={styles.scheduleText}>{activeItem.payment.budget}</Text>
                                        : ''
                                    }
                                </View>
                                <View>
                                    <Text style={styles.scheduleText}>{activeItem.payment.mode}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/**Call Msg cancel */}
                <View style={[styles.container, { }]} >
                    <TouchableOpacity style={styles.iconContainer} onPress={handleCall}>
                        <Icon name="phone" size={30} color='#31db1a' />
                        <Text style={styles.scheduleText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={handleMessage}>
                        <Icon name="message" size={30} color="blue" />
                        <Text style={styles.scheduleText}>Message</Text>
                    </TouchableOpacity>
                    <View style={styles.iconContainer}>
                        <Icon name="cancel" size={30} color="white" />
                        <Text style={styles.scheduleText}>Cancel</Text>
                    </View>
                </View>
            </View>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
        padding: 5,
        width: 365,
    },
    schedulecontainer: {
        display: 'flex',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
        padding: 15,
    },
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },
    scheduleheading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scheduleContent: {
        width: '100%'
    },
    addType: {
        borderWidth: 2,
        borderColor: 'white',
        margin: 5,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%'
    },
    scheduleType: {
        borderWidth: 2,
        borderColor: 'white',
        margin: 5,
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    schedulestatus: {

    },
    textHeading: {
        fontSize: 18,
        fontWeight: '800',
        color: 'white'
    },
    scheduleText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
        textTransform: 'capitalize'
    }
})

export default ActiveCard;
