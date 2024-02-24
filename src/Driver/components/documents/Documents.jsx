import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthenticatedLayout from '../../../common/AuthenticatedLayout'
import ThreeWayPushButton from '../../../adOns/molecules/ThreeWayPushButton'

const Documents = () => {
  const [selectedOption, setSelectedOption] = useState()
  return (
    <AuthenticatedLayout title={'Document'}>
      <View>
        <ThreeWayPushButton
          option1="Upload"
          option2="View"
          option3="Pending"
          setter={setSelectedOption}
          outerStyles={styles.pushButtonOuterStyles}
        />
      </View>
      {}
    </AuthenticatedLayout>
  )
}
const styles = StyleSheet.create({
  pushButtonOuterStyles: {
  }
})
export default Documents