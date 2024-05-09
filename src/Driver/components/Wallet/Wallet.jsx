import React, { useCallback, useState } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import TransactionBox from './TransactionCard'
import PressButton from '../../../adOns/atoms/PressButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfile } from '../../../context/ContextProvider'
import server from '../../../services/server.tsx'
import LoadingScreen from '../../../adOns/organisms/LoadingScreen'

const Wallet = () => {
  const navigation = useNavigation()
  const { profileState, profileDispatch } = useProfile()
  const [comingSoon, setComingsoon] = useState(true)
  const [profileDetails, setProfileDetails] = useState({
    image: server.server + profileState.avatar,
    name: profileState?.userName,
    phoneNumber: profileState?.phone,
    email: profileState.email
  })
  useFocusEffect(
    useCallback(() => {
      setProfileDetails({
        image: server.server + profileState.avatar,
        name: profileState?.userName,
        phoneNumber: profileState?.phone,
        email: profileState?.email
      })
    }, []))
  const transactionList = [
    {
      name: 'Transaction Name',
      date: '20 January 2024',
      rupees: '500'
    },
    {
      name: 'Transaction Name',
      date: '20 January 2024',
      rupees: '500'
    },
    {
      name: 'Transaction Name',
      date: '20 January 2024',
      rupees: '500'
    },
    {
      name: 'Transaction Name',
      date: '20 January 2024',
      rupees: '500'
    },
    {
      name: 'Transaction Name',
      date: '20 January 2024',
      rupees: '500'
    },
    {
      name: 'Transaction Name',
      date: '20 January 2024',
      rupees: '500'
    }
  ]
  return (
    <AuthenticatedLayout title={'Wallet'}>

      <View style={styles.displayFlex}>
        <Image source={!profileState.avatar ? require('../../../assets/imgaes/Profile2.png') : { uri: profileDetails.image }} style={styles.imagestyle} />
        <Text style={styles.textstyle}>{!profileDetails.name ? "User Name" : profileDetails.name}</Text>
      </View>
      {!comingSoon ? <View style={{ flex: 1  , marginBottom : 20}}>
        <View style={styles.rupeeBox}>
          <Text style={{ ...styles.rupeetext, color: 'red' }}>Balance : </Text>
          <Text style={styles.rupeetext}>₹ 10,000</Text>
        </View>
        <View style={styles.col}>
          <View style={{ flex: 1}}>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.text}>Transaction History</Text>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                style={{ flex: 1, marginBottom: 10 }}
                keyExtractor={(item, index) => (index)}
                data={transactionList}
                renderItem={({ item }) => {
                  return <TouchableOpacity>
                    <View style={styles.FlatListviewStyle}>
                      <TransactionBox item={item} />
                    </View>
                  </TouchableOpacity>
                }}
              />
            </View>
          </View>
          <View>
            <PressButton
              name='Recharge Now'
              onPress={() => navigation.navigate('Recharge')}
            />
          </View>
        </View>
      </View> : <LoadingScreen cs={true} showFooter={false} showHeader={false}/>}

    </AuthenticatedLayout>
  )
}

const styles = StyleSheet.create({
  imagestyle: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginBottom: 10,
  },
  FlatListviewStyle: {
    marginVertical: 1
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  textstyle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '800',
  },
  text: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '500',
    color: 'black'
  },
  rupeeBox: {
    marginHorizontal: 10,
    backgroundColor: 'black',
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  rupeetext: {
    color: 'white',
    fontSize: 25
  },
  col: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }

})

export default Wallet