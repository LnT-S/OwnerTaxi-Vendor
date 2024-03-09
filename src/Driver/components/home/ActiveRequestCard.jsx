import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ActiveRequestCard = (props) => {

    const navigation = useNavigation()
    const { item } = props

    return (
        <TouchableOpacity onPress={() => navigation.navigate('LocalRequestHandler', { data: item })}>
            <View style={styles.activeBar}>
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
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    activeBar: {
        backgroundColor: '#E7EEF6',
        marginHorizontal: 10,
        padding: 10
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