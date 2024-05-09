import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import { useProfile } from '../../../context/ContextProvider'

const HistoryRequestCard = (props) => {

    const { item } = props
    const {profileState , profileDispatch} = useProfile()

    return (
            <View style={styles.activeBar}>
                <View style={{marginBottom : 10}}>
                <Text style={[styles.textColor, styles.textHeading,{fontSize : 18}]}>Posted By     : {profileState?.phone?.toString()===item.id?.phoneNo.toString() ? 'You' : item.id.phoneNo}</Text>
                <Text style={[styles.textColor, styles.textHeading]}>Accepted By : {item.acceptor?.phone?.toString()===profileState?.phone?.toString() ? 'You' : item.acceptor.phone}</Text>
                </View>
                <View style={[styles.horizontalstatus, styles.borderTop]}>
                    <View style={styles.activeBarmarginRight}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Pick Up  </Text>
                        </View>
                        <View>
                            <Text style={styles.textColor}>{item.pickUp.description}</Text>
                        </View>
                    </View>
                    <View style={styles.activeBarmarginLeft}>
                        <View>
                            <Text style={[styles.textColor, styles.textHeading]}>Destination  </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'white' }}>{item.drop.description}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.horizontalstatus, styles.borderTop]}>
                    <View>
                        <Text style={[styles.textColor]}>Accepted On : {new Date(item.updatedAt).toDateString()}</Text>
                        <Text style={[styles.textColor]}>Budget:  &#x20B9;{item.budget}</Text>
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