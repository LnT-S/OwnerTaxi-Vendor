import React from 'react'
import { SafeAreaView, StyleSheet, View  , Text} from 'react-native'
import { BgColor } from '../../styles/colors'

const Header = (props) => {

    const {title} = props

  return (
    <SafeAreaView>
        <View style={styles.header}>
            <View style={styles.left}>
                <Text>BB</Text>
                <Text>{title}</Text>
            </View>
            <View style={styles.right}>
                <Text>HM</Text>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header : {
        height : 50,
        display : 'flex',
        flexDirection : 'row',
        justifyContent :'space-between',
        alignItems : 'center',
        padding : 2,
        backgroundColor : BgColor
    },
    left : {
        marginLeft : 10,
        width : '20%',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    right : {
        marginRight : 10
    }
})

export default Header