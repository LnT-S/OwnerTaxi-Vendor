import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { BgColor } from '../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import global from '../../styles/global'
const Header = (props) => {

    const navigation = useNavigation()
    const { title } = props

    const openDrawer = () => {
        navigation.openDrawer()
    };

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <View style={styles.left}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" style={global.backIcon} size={30} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, paddingLeft: 10, color: 'black', fontWeight: '600' }}>{title}</Text>
                </View>
                <View style={styles.right}>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Icon name="chat-bubble" size={26} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Icon name="notifications" size={26} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openDrawer}>
                        <Icon name="menu" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: BgColor
    },
    left: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
    },
    right: {
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default Header