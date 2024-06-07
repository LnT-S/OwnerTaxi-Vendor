import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { BgColor } from '../../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import global from '../../../styles/global'
import { manageNotifications } from '../../../services/apiCall';
import { useProfile } from '../../../context/ContextProvider';
const Header = (props) => {

    const navigation = useNavigation()
    const {profileState, profileDispatch} = useProfile()
    const [notificationState , setNotificationState] = useState(profileState.notification)
    useEffect(()=>{
        setNotificationState(profileState.notification)
    },[profileState.notification])
    const {
        title,
        showNotification,
        showHMIcon,
        showMessageIcon,
        show3DotIcon,
        threeDotOptionObject,
        showBackIcon,
        leftCenterJsx,
        headerStyles,
        headerTextStyles,
        showSearch,
        searchAction
    } = props

    const openDrawer = () => {
        navigation.openDrawer()
    };
    const manageNotification = () => {
        manageNotifications({ state: !profileState.notification })
          .then(data => {
            console.log('8888***888',!profileState.notification);
            profileDispatch({
              type: 'NOTIFICATION',
              payload: !profileState.notification
            })
          })
          .catch(err => {
            console.log("ERROR IN SETIING NOTIFICATION ", err);
          })
      }

    const [showOptions, setShowOptions] = useState(false)

    return (
        <SafeAreaView>
            <View style={{ ...styles.header, ...headerStyles }}>
                <View style={styles.left}>
                    {(showBackIcon === undefined || showBackIcon === true) ? <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" style={{ ...global.backIcon, ...headerTextStyles }} size={30} />
                    </TouchableOpacity> : ''}
                    {leftCenterJsx}
                    <Text style={{ ...{ fontSize: 20, paddingLeft: 10, color: 'black', fontWeight: '600' }, ...headerTextStyles }}>{title}</Text>
                </View>
                <View style={styles.right}>
                    {(showSearch === true) ? <TouchableOpacity style={{ marginRight: 10 }} onPress={searchAction}>
                        <Icon name="search" size={26} color="black" style={headerTextStyles} />
                    </TouchableOpacity> : ''}
                    {(showMessageIcon === undefined || showMessageIcon === true) ? <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('message')}>
                        <Icon name="chat-bubble" size={26} color="black" style={headerTextStyles} />
                    </TouchableOpacity> : ''}
                    {(showNotification === undefined || showNotification === true) ? <TouchableOpacity style={{ marginRight: 10 }} onPress={manageNotification}>
                        {notificationState ? <Icon name="notifications-on" size={26} color="black" style={headerTextStyles} /> : <Icon name="notifications-off" size={26} color="black" style={headerTextStyles} />}
                    </TouchableOpacity> : ''}
                    {(showHMIcon === undefined || showHMIcon === true) ? <TouchableOpacity onPress={openDrawer}>
                        <Icon name="menu" size={30} color="#000" style={headerTextStyles} />
                    </TouchableOpacity> : ''}
                    {(show3DotIcon === true) ? <TouchableOpacity style={styles.threeDotIcon} onPress={() => { setShowOptions(!showOptions) }}>
                        <Icon name="more-vert" size={30} color="black" style={headerTextStyles} />
                    </TouchableOpacity> : ''}
                </View>
                {(threeDotOptionObject && showOptions) ? <View style={styles.optionContainer}>
                    {Object.values(threeDotOptionObject).map((item, index) => {
                        return <TouchableOpacity style={styles.optionList} onPress={() => { item.action(); setShowOptions(false) }}>
                            <Text style={styles.optionText} key={index}>{item.name}</Text>
                        </TouchableOpacity>
                    })}
                </View> : ''}
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
        backgroundColor: BgColor,
        position: 'relative'
    },
    left: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    threeDotIcon: {
        position: 'relative'
    },
    optionContainer: {
        position: 'absolute',
        top: 64,
        right: 0,
        width: 180,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10
    },
    optionList: {
        width: '100%'
    },
    optionText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 10
    }
})

export default Header




// let z=a

// let obj = {
//     a : 1,
//     b : 2
// }
// obj.a
// obj[z]