import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BgColor } from '../../../styles/colors'
import StatusButton from '../../../adOns/atoms/StatusButton'

const ActiveRequestCard = (props) => {

    const navigation = useNavigation()
    const { item, type } = props;

    const handlePressOverCard = () => {
        console.log('TYPE ', type)
        if (type === 'Local')
            navigation.navigate('LocalRequestHandler', { item: item });
        else
            navigation.navigate('IntercityRequestHandler', { item: item })
    }

    return (
        <TouchableOpacity onPress={handlePressOverCard} style={{ position: 'relative' }}>
            {type !== 'Local' && item.status === "accepted" && <View style={styles.bookedLabel}>
                <Image
                    source={require('../../../assets/imgaes/Booked4WOBG.png')}
                    style={{ width: '100%', height: '100%', opacity: 1 }}
                />
            </View>}
            <View style={{ ...styles.activeBar, backgroundColor: '#E7EEF6', opacity: item.status === "accepted" ? 0.9 : 1 }}>
                {type !== 'Local' && item.verifiedBy && <View style={{ ...styles.label, backgroundColor: item?.verifiedBy?.toLowerCase() === 'owner taxi' ? '#8EF433' : BgColor }}>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 12, letterSpacing: -0.5 }}>Verified By</Text>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 16, fontWeight: '500' }}>{item.verifiedBy}</Text>
                </View>}
                <View style={{ display: 'flex ', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ color: 'black', ...styles.textHeading, fontSize: 18, letterSpacing: 0.5 }}>Booking No : </Text>
                    <Text style={{ color: 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500' }}>{item.bookingNo}</Text>
                </View>
                {type !== 'Local' && <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 15, paddingVertical: 10 }}>
                    <StatusButton
                        text={[item.bookingType !== 'rental' ? item.bookingSubType?.toUpperCase() : "Rental"]}
                        textStyle={[{ color: 'white', fontSize: 16 }]}
                        containerStyle={{ borderRadius: 15, padding: 3, backgroundColor: '#4B2021', minWidth: 90 }}
                    />
                    <StatusButton
                        text={[item.vehicle.type]}
                        textStyle={[{ color: 'white', fontSize: 16 }]}
                        containerStyle={{ borderRadius: 15, padding: 3, backgroundColor: '#8B558F' }}
                    />
                    {item.vehicle.subType !== '' ? <StatusButton
                        text={[item.vehicle.subType]}
                        textStyle={[{ color: 'white', fontSize: 16 }]}
                        containerStyle={{ borderRadius: 15, padding: 3, backgroundColor: '#8B1F81' }}
                    /> : ''}
                </View>}
                {/*<View style={{ display: 'flex ', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 16 }}>Customer ID : </Text>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 18, fontWeight: '500' }}>{item.id}</Text>
    </View>*/}
                <View style={[styles.horizontalstatus,  {backgroundColor : 'rgba(0,0,0,0.07)'}]}>
                    <View style={styles.activeBarmarginRight}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Pick Up  </Text>
                        </View>
                        <View>
                            <Text style={styles.textColor}>{item.pickUp?.description}</Text>
                        </View>
                    </View>
                    <View style={styles.activeBarmarginLeft}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Destination  </Text>
                        </View>
                        <View>
                            <Text style={styles.textColor}>{item.drop?.description}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View><Text style={[styles.textColor]}>{`${item.pickUp.date.day}-${item.pickUp.date.month + 1}-${item.pickUp.date.year}`} {`${item.pickUp.date.hour}:${item.pickUp.date.min}`}</Text></View>
                        <View style={{}}>
                            <View><Text style={{ ...styles.textColor, color: 'red' }}>Distance : {item.distance}</Text></View>
                            <View><Text style={{ ...styles.textColor, color: 'green' }}>Budget : &#x20B9;{item.budget} </Text></View>
                        </View>
                    </View>
                </View>
                <View style={{ height: 50, marginTop: 10, backgroundColor: item.status === 'accepted' ? '#3AA000' : item.status === 'bidstarted' ? BgColor : '#FF5511', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontFamily: 'serif', fontSize: 20 }}>{item.status[0].toUpperCase() + item.status.substring(1,)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    activeBar: {
        marginHorizontal: 10,
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 10
    },
    label: {
        display: 'flex ',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        position: 'absolute',
        right: -65,
        top: 22,
        transform: [{ rotate: '45deg' }],
        padding: 4,
        width: 200,
        zIndex: 2
    },
    bookedLabel: {
        marginBottom: 10,
        position: 'absolute',
        right: 35,
        top: 30,
        padding: 4,
        width: 90,
        height: 90,
        zIndex: 2,
        zIndex: 3
    },
    horizontalstatus: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 2,
        padding : 2
    },
    borderTop: {
        borderTopColor: 'gray',
        borderTopWidth: 0.7
    },
    activeBarmarginRight: {
        marginRight: 4,
        width: '50%',
    },
    activeBarmarginLeft: {
        marginLeft: 4,
        width: '50%'
    },
    textColor: {
        color: 'black'
    },
    textHeading: {
        fontSize: 18
    }
})
export default ActiveRequestCard