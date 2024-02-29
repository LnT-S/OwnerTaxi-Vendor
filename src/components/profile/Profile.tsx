import React from 'react'
import { Text, View } from 'react-native'
import AuthenticatedLayout from '../../Driver/common/layout/AuthenticatedLayout'

const ProfilePage = () => {
  return (
    <AuthenticatedLayout>
      <View>
        <Text>
          ProfilePage
        </Text>
      </View>
    </AuthenticatedLayout>
  )
}

export default ProfilePage