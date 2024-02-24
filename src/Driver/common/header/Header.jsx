import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { BgColor } from '../../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import global from '../../../styles/global'
const Header = (props) => {

    const navigation = useNavigation()
    const {
        title,
        showNotification,
        showHMIcon,
        showMessageIcon,
        show3DotIcon,
        showBackIcon,
        leftCenterJsx,
        headerStyles,
        headerTextStyles
    } = props

    const openDrawer = () => {
        navigation.openDrawer()
    };

    return (
        <SafeAreaView>
            <View style={{ ...styles.header, ...headerStyles}}>
                <View style={styles.left}>
                    {(showBackIcon === undefined || showBackIcon === true) ? <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" style={{...global.backIcon , ...headerTextStyles}} size={30} />
                    </TouchableOpacity> : ''}
                    {leftCenterJsx}
                    <Text style={{...{ fontSize: 20, paddingLeft: 10, color: 'black', fontWeight: '600' }, ...headerTextStyles}}>{title}</Text>
                </View>
                <View style={styles.right}>
                    {(showMessageIcon === undefined || showMessageIcon === true) ? <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('message')}>
                        <Icon name="chat-bubble" size={26} color="black" style={headerTextStyles}/>
                    </TouchableOpacity> : ''}
                    {(showNotification === undefined || showNotification === true) ? <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('notification')}>
                        <Icon name="notifications" size={26} color="black" style={headerTextStyles}/>
                    </TouchableOpacity> : ''}
                    {(showHMIcon === undefined || showHMIcon === true) ? <TouchableOpacity onPress={openDrawer}>
                        <Icon name="menu" size={30} color="#000" style={headerTextStyles}/>
                    </TouchableOpacity> : ''}
                    {(show3DotIcon === true) ? <TouchableOpacity>
                        <Icon name="more-vert" size={30} color="black" style={headerTextStyles}/>
                    </TouchableOpacity> : ''}
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
        alignItems: 'center'
    },
    right: {
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems : 'center'
    }
})

export default Header