import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import ThreeWayPushButton from '../../../adOns/molecules/ThreeWayPushButton'
import DocumentCard from './DocumentCard'
import MainDocumentCard from './MainDocumentCard'
import InvertedPersonInfoSemicircle from '../../../adOns/atoms/SemiCircle'

const Documents = () => {
  const DocumentPendingName = [
    {
      documentFor: 'driver',
      documentName: 'Adhar Card',
      documentId: 0,
      status: 'Missing',
      url: 'undefined'
    },
    {
      documentFor: 'driver',
      documentName: 'Driving License',
      documentId: 1,
      status: 'Uploaded',
      url: 'undefined'
    },
    {
      documentFor: 'driver',
      documentName: 'Police Certtificate ',
      documentId: 2,
      status: 'Reject',
      url: 'undefined'
    },
    {
      documentFor: 'driver',
      documentName: 'RC',
      documentId: 3,
      status: 'Accept',
      url: 'undefined'
    },
    {
      documentFor: 'car',
      documentName: 'RC',
      documentId: 4,
      status: 'Missing',
      url: 'undefined'
    },
    {
      documentFor: 'car',
      documentName: 'RC',
      documentId: 4,
      status: 'Missing',
      url: 'undefined'
    },
    {
      documentFor: 'car',
      documentName: 'RC',
      documentId: 4,
      status: 'Missing',
      url: 'undefined'
    },
    {
      documentFor: 'car',
      documentName: 'RC',
      documentId: 4,
      status: 'Missing',
      url: 'undefined'
    },
  ]

  const carArray = DocumentPendingName.filter((item, index) => {
    if (item.documentFor === 'car') {
      return item
    }
  })
  const driverArray = DocumentPendingName.filter((item, index) => {
    if (item.documentFor === 'driver') {
      return item
    }
  })


  return (
    <AuthenticatedLayout title={'Document'}>
      <ScrollView>
        <InvertedPersonInfoSemicircle item={{ name: 'Person', phoneNumber: '1234567890' }} editMode={false} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Driver Documents</Text>
        </View>
        <View style={styles.document}>
          {driverArray.map((item, index) => {
            return <MainDocumentCard item={item} key={index} />
          })}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Car Documents</Text>
        </View>
        <View style={styles.document}>
          {carArray.map((item, index) => {
            return <MainDocumentCard item={item} key={index} />
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
    paddingHorizontal: 18,
    width: '100%',
    gap: 15,
    marginBottom: 25
  },
  textContainer: {
    height: 50,
    width: '100%',
    margin: 5,
    padding: 4
  },
  text: {
    fontSize: 26,
    fontWeight: '600',
    color: 'black'
  }
})
export default Documents