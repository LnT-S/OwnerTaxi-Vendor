import React, { useCallback, useState } from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import HistoryRequestCard from './HistoryRequestCard';
import { useFocusEffect } from '@react-navigation/native';
import { getDriverHistory } from '../../../services/getDataServices';
import { showNoty } from '../../../common/flash/flashNotification';

const History = () => {
  const [historyList, setHistoryList] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchData = async () => {
    setIsRefreshing(true)
    getDriverHistory()
      .then(data => {
        console.log("HISTORY DATA",data.data.data)
        setHistoryList(data.data.data)
      })
      .catch(err => {
        showNoty("Error Occured ! Try after some time")
      })
    setIsRefreshing(false)

  }
  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  return (
    <AuthenticatedLayout title={'History'}>
      {isRefreshing && <ActivityIndicator size={'large'} color={'black'} />}
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

const styles = StyleSheet.create({
  FlatListviewStyle: {
    marginVertical: 10
  }
})
export default History