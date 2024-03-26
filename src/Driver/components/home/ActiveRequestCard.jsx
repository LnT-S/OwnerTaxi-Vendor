import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BgColor } from '../../../styles/colors'

const ActiveRequestCard = (props) => {

    const navigation = useNavigation()
    const { item } = props

    return (
        <TouchableOpacity onPress={() => navigation.navigate('LocalRequestHandler', { item: item })}>
            <View style={styles.activeBar}>
                {item.verifiedBy && <View style={{...styles.label , backgroundColor : item.verifiedBy.toLowerCase()==='owner taxi' ? '#8EF433' : BgColor}}>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 12 , letterSpacing : -0.5 }}>Verified By</Text>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 16, fontWeight: '500' }}>{item.verifiedBy}</Text>
                </View>}
                <View style={{ display: 'flex ', flexDirection: 'row', alignItems: 'center',marginBottom : 10 }}>
                    <Text style={{ color : 'black', ...styles.textHeading, fontSize: 18,letterSpacing : 0.5}}>Booking ID : </Text>
                    <Text style={{ color : 'red', ...styles.textHeading, fontSize: 18, fontWeight: '500' }}>{item.bookingId}</Text>
                </View>
                <View style={{ display: 'flex ', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 16 }}>Customer ID : </Text>
                    <Text style={{ ...styles.textColor, ...styles.textHeading, fontSize: 18, fontWeight: '500' }}>{item.customerID}</Text>
                </View>
                <View style={[styles.horizontalstatus, styles.borderTop]}>
                    <View style={styles.activeBarmarginRight}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Pick Up  </Text>
                        </View>
                        <View>
                            <Text style={styles.textColor}>{item.from}</Text>
                        </View>
                    </View>
                    <View style={styles.activeBarmarginLeft}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Destination  </Text>
                        </View>
                        <View>
                            <Text style={styles.textColor}>{item.to}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.borderTop]}>
                    <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View><Text style={[styles.textColor]}>{item.date} {item.time}</Text></View>
                        <View style={{}}>
                            <View><Text style={{ ...styles.textColor, color: 'red' }}>Distance : 500 km </Text></View>
                            <View><Text style={{ ...styles.textColor, color: 'green' }}>Budget : &#x20B9;{item.budget} </Text></View>
                        </View>
                    </View>
                </View>
                <View style={{height : 50,marginTop : 10 , backgroundColor : item.status==='active' ? '#8EF433': '#DA6633' ,justifyContent: 'center',alignItems: 'center',}}> 
                <Text style={{fontFamily : 'serif' , fontSize : 20}}>{item.status[0].toUpperCase() + item.status.substring(1,)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    activeBar: {
        backgroundColor: '#E7EEF6',
        marginHorizontal: 10,
        padding: 10,
        position : 'relative',
        overflow : 'hidden'
    },
    label :{
        display: 'flex ', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom : 10,
        position : 'absolute',
        right : -70,
        top  : 12,
        transform : [{rotate : '45deg'}],
        padding : 4,
        width : 200,
        zIndex  :2
    },
    horizontalstatus: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 2
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