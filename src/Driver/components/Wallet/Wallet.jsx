import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, FlatList, StyleSheet, BackHandler, ActivityIndicator, RefreshControl } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import TransactionBox from './TransactionCard'
import PressButton from '../../../adOns/atoms/PressButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfile } from '../../../context/ContextProvider'
import server from '../../../services/server.tsx'
import LoadingScreen from '../../../adOns/organisms/LoadingScreen'
import { getTransactionInfo } from '../../../services/getDataServices.jsx'
import { showNoty } from '../../../common/flash/flashNotification.jsx'
import FlashMessage from 'react-native-flash-message'
import InfoModal from '../../../adOns/molecules/InfoModal.jsx'
import PayModal from '../../../adOns/molecules/PayModal.jsx'

const Wallet = () => {
  const navigation = useNavigation()
  const { profileState, profileDispatch } = useProfile()
  const ref = useRef()
  const [comingSoon, setComingsoon] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [transactionInfo, setTransactionInfo] = useState(null)
  const [showSs, setShowss] = useState(false)
  const [showPay, setShowPay] = useState(false)
  const [ss, setSs] = useState('')
  const [comment, setComment] = useState('')
  const [profileDetails, setProfileDetails] = useState({
    image: server.server + profileState.avatar,
    name: profileState?.userName,
    phoneNumber: profileState?.phone,
    email: profileState.email
  })
  const fetchData = () => {
    setIsRefreshing(true)
    getTransactionInfo()
      .then(data => {
        if (data.status === 200) {
          setTransactionInfo(data.data.data)
          console.log(data.data.data);
        } else {
          showNoty(data.data.message, "danger")
        }
        setIsRefreshing(false)
      })
      .catch(err => {
        console.log("ERROR IN TRANSACTION LIST ", err);
        showNoty("TRY LOGGING AGAIN ", "danger")
      })
  }
  useFocusEffect(
    useCallback(() => {
      setProfileDetails({
        image: server.server + profileState.avatar,
        name: profileState?.userName,
        phoneNumber: profileState?.phone,
        email: profileState?.email
      })
      fetchData()
    }, []))
  useEffect(() => {
    fetchData()
  }, [])
  // const transactionList = [
  //   {
  //     name: 'Transaction Name',
  //     date: '20 January 2024',
  //     rupees: '500'
  //   },
  //   {
  //     name: 'Transaction Name',
  //     date: '20 January 2024',
  //     rupees: '500'
  //   },
  //   {
  //     name: 'Transaction Name',
  //     date: '20 January 2024',
  //     rupees: '500'
  //   },
  //   {
  //     name: 'Transaction Name',
  //     date: '20 January 2024',
  //     rupees: '500'
  //   },
  //   {
  //     name: 'Transaction Name',
  //     date: '20 January 2024',
  //     rupees: '500'
  //   },
  //   {
  //     name: 'Transaction Name',
  //     date: '20 January 2024',
  //     rupees: '500'
  //   }
  // ]
  useEffect(() => {
    const backFuntion = () => {
      navigation.goBack()
      return true
    }
    console.log("BACKHANDLER SET IN HOME PAGE")
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion);
    return () => {
      console.log('BACKHANDLER REMOVED FROM HOME PAGE')
      backHandler.remove()
    };
  }, []);
  return (
    <AuthenticatedLayout title={'Wallet'}>
      <FlashMessage ref={ref} />
      <InfoModal
        show={showSs}
        setShow={setShowss}
        title={"Screen Shot"}
        extContStyle={{ width: '85%' }}
        serverImageSource={server.server + ss}
        comment={comment}
      />
      <PayModal
        show={showPay}
        setShow={setShowPay}
        title={"Pay to Administrator"}
        extContStyle={{ width: '85%' }}
        serverImageSource={server.server + ss}
        comment={comment}
      />
      <View style={styles.displayFlex}>
        <Image source={!profileState.avatar ? require('../../../assets/imgaes/Profile2.png') : { uri: profileDetails.image }} style={styles.imagestyle} />
        <Text style={styles.textstyle}>{!profileDetails.name ? "User Name" : profileDetails.name}</Text>
      </View>
      {!comingSoon ? <View style={{ flex: 1, marginBottom: 20 }}>
        <View style={styles.rupeeBox}>
          <Text style={{ ...styles.rupeetext, color: 'red' }}>Balance : </Text>
          <Text style={styles.rupeetext}>₹ {transactionInfo !== null ? transactionInfo.balance : <ActivityIndicator />}</Text>
        </View>
        <View style={styles.col}>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.text}>Transaction History</Text>
            </View>
            <View style={{ flex: 1 }}>
              {transactionInfo !== null ? <FlatList
                refreshControl={
                  <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
                }
                style={{ flex: 1, marginBottom: 10 }}
                keyExtractor={(item, index) => (index)}
                data={transactionInfo?.transactionList}
                renderItem={({ item, i }) => {
                  return <TouchableOpacity key={i} onPress={() => { setComment(item?.comment); setSs(item.ss); setShowss(true) }}>
                    <View style={styles.FlatListviewStyle}>
                      <TransactionBox item={item} />
                    </View>
                  </TouchableOpacity>
                }}
              /> : <ActivityIndicator color={"black"} />}
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 10 }}>
            <PressButton
              name='Pay'
              onPress={() => setShowPay(true)}
            />
            <PressButton
              name='Recharge Now'
              onPress={() => navigation.navigate('Recharge')}
            />
          </View>
        </View>
      </View> : <LoadingScreen cs={true} showFooter={false} showHeader={false} />}

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