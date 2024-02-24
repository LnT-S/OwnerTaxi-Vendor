import React from 'react'
import { Text, View } from 'react-native'
import AuthenticatedLayout from '../../../common/AuthenticatedLayout'

const History = () => {
  return (
    <AuthenticatedLayout title={'History'}>
      <View>
        <Text>
          History
        </Text>
      </View>
    </AuthenticatedLayout>
  )
}

export default History