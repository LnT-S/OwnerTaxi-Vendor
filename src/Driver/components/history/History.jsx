import React, { useState } from 'react'
import { Text, View,FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import AuthenticatedLayout from '../../../common/AuthenticatedLayout'
import HistoryRequestCard from './HistoryRequestCard';

const History = () => {
  const historyList = [
    {
      from: 'Aman Tiwari, Naween chowk SITAPUR',
      to: 'Shruti Mishra, Ghura mau bangla',
      date: '06-07-2019',
      time: '12:00 PM',
      customerID: 'Shruti Mishra'
    },
    {
      from: 'Aman Tiwari, Naween chowk SITAPUR',
      to: 'Shruti Mishra, Ghura mau bangla',
      date: '06-07-2019',
      time: '12:00 PM',
      customerID: 'Shruti Mishra'
    },
    {
      from: 'Aman Tiwari, Naween chowk SITAPUR',
      to: 'Shruti Mishra, Ghura mau bangla',
      date: '06-07-2019',
      time: '12:00 PM',
      customerID: 'Shruti Mishra'
    },
    {
      from: 'Aman Tiwari, Naween chowk SITAPUR',
      to: 'Shruti Mishra, Ghura mau bangla',
      date: '06-07-2019',
      time: '12:00 PM',
      customerID: 'Shruti Mishra'
    },
    {
      from: 'Aman Tiwari, Naween chowk SITAPUR',
      to: 'Shruti Mishra, Ghura mau bangla',
      date: '06-07-2019',
      time: '01:00 PM',
      customerID: 'Shruti Mishra'
    }

  ];

  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshing = async ()=>{
  }
  const fetchData = async ()=>{
      setIsRefreshing(true)
      setInterval(()=>{
          setIsRefreshing(false)
      },200)

  }

  return (
    <AuthenticatedLayout title={'History'}>
    {isRefreshing && <ActivityIndicator  size={'large'} color={'black'}/>}
      <FlatList
        style={{}}
        keyExtractor={(item, index) => (index)}
        data={historyList}
        renderItem={({ item }) => {
          return <View style={styles.FlatListviewStyle}><HistoryRequestCard item={item} /></View>
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={fetchData} />
      }
      />
    </AuthenticatedLayout>
  )
}

const styles= StyleSheet.create({
  FlatListviewStyle: {
    marginVertical: 10
}
})
export default History