import React from 'react'
import { Text, View } from 'react-native'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout'

const Wallet = () => {
  return (
    <AuthenticatedLayout title={'Wallet'}>
      <View>
        <Text>
          Wallet
        </Text>
      </View>
    </AuthenticatedLayout>
  )
}

export default Wallet