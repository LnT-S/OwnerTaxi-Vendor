import React from 'react'
import { Text, View } from 'react-native'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout'

const Activity = () => {
  return (
    <AuthenticatedLayout title={'Activity'}>
      <View>
        <Text>
          Activity
        </Text>
      </View>
    </AuthenticatedLayout>
  )
}

export default Activity