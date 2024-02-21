import React from 'react'
import { Text, View } from 'react-native'
import AuthenticatedLayout from '../../screens/layout/AuthenticatedLayout'

const Documents = () => {
  return (
    <AuthenticatedLayout title={'Document'}>
      <View>
        <Text>
          Document
        </Text>
      </View>
    </AuthenticatedLayout>
  )
}

export default Documents