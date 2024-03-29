import React from 'react'
import {View, Text, StyleSheet } from 'react-native'

const HistoryRequestCard = (props) => {

    const { item } = props

    return (
            <View style={styles.activeBar}>
                <View><Text style={[styles.textColor, styles.textHeading]}>Customer ID : {item.customerID}</Text></View>
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
                            <Text style={{ color: 'white' }}>{item.to}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.horizontalstatus, styles.borderTop]}>
                    <View>
                        <Text style={[styles.textColor]}>Accepted On : {item.time}  {item.date}</Text>
                    </View>

                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    activeBar: {
        backgroundColor: 'black',
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
        borderTopColor: 'white',
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
        color: 'white'
    },
    textHeading: {
        fontSize: 18
    }
})
export default HistoryRequestCard