import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AuthenticatedLayout from '../../../common/AuthenticatedLayout'
import ThreeWayPushButton from '../../../adOns/molecules/ThreeWayPushButton'
import DocumentCard from './DocumentCard'
import MainDocumentCard from './MainDocumentCard'

const Documents = () => {
  const DocumentPendingName = [
    {
      documentName: 'Adhar Card',
      documentId: 0,
      status: 'Missing',
      url: 'undefined'
    },
    {
      documentName: 'Driving License',
      documentId: 1,
      status: 'Uploaded',
      url: 'undefined'
    },
    {
      documentName: 'Police Certtificate',
      documentId: 2,
      status: 'Reject',
      url: 'undefined'
    },
    {
      documentName: 'RC',
      documentId: 3,
      status: 'Accept',
      url: 'undefined'
    },
    {
      documentName: 'RC',
      documentId: 4,
      status: 'Missing',
      url: 'undefined'
    },
  ]


  return (
    <AuthenticatedLayout title={'Document'}>
    <ScrollView>
      <View style={styles.document}>
        {DocumentPendingName.map((item, index) => {
          return <MainDocumentCard item={item} key={index}/>
        })}
      </View>
      </ScrollView>
    </AuthenticatedLayout>
  )
}
const styles = StyleSheet.create({
  document: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal : 18,
    width : '100%',
    gap : 15
  }
})
export default Documents