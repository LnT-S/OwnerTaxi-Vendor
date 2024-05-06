import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import ThreeWayPushButton from '../../../adOns/molecules/ThreeWayPushButton'
import DocumentCard from './DocumentCard'
import MainDocumentCard from './MainDocumentCard'
import InvertedPersonInfoSemicircle from '../../../adOns/atoms/SemiCircle'
import { documentPicker } from '../../../utils/UtilityFuntions'
import VehicleCard from './VehicleCard'
import AddVehicleModal from '../../../adOns/molecules/AddVehicleModal'
import { getDocumentInfo } from '../../../services/getDataServices'
import { showNoty } from '../../../common/flash/flashNotification'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Documents = () => {
  const [carSubArray, setCarSubArray] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [driverArray, setDriverArray] = useState(null)
  const [carArray, setCarArray] = useState([])
  const [vehicleNo , setVehicleNo] = useState('')

  const fetchDocumentDetails = () => {
    setLoading(true)
    getDocumentInfo()
      .then(data => {
        setDriverArray(data.data.data.driverDocuments)
        console.log(data.data.data.driverDocuments)
        setCarArray(data.data.data.vehicleDocument)
        console.log(data.data.data.vehicleDocument)
      })
      .catch(err => {
        console.log('ERROR IN GET DOCUMENT INFO ', err);
        showNoty("Log In Again or Try After Some Time", "danger")
      })
    setLoading(false)
  }

  const setArray = (item, index) => {
    console.log(item, index)
    setVehicleNo(item.vehicleNo)
    setCarSubArray(item.document)
  }

  useEffect(()=>{
    console.log("DRIVER ARRAY ",driverArray)
  },[driverArray])

  useEffect(() => {
    setLoading(true)
    getDocumentInfo()
      .then(data => {
        setDriverArray(data.data.data.driverDocuments)
        setCarArray(data.data.data.vehicleDocument)
      })
      .catch(err => {
        console.log('ERROR IN GET DOCUMENT INFO ', err);
        showNoty("Log In Again or Try After Some Time", "danger")
      })
    setLoading(false)
  }, [])

  return (
    <AuthenticatedLayout title={'Document'}>
      <ScrollView>
        <InvertedPersonInfoSemicircle item={{ name: 'Person', phoneNumber: '1234567890' }} editMode={false} />
        <AddVehicleModal
          show={showAddModal}
          setShow={setShowAddModal}
        />
        <View style={{ ...styles.textContainer, flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={styles.text}>Driver Documents</Text>
          {!loading ? <TouchableOpacity onPress={fetchDocumentDetails}><Icon name="refresh" size={30} color="#000" /></TouchableOpacity> : <ActivityIndicator />}
        </View>
        <View style={styles.document}>
          {!loading && driverArray?.map((item, index) => {
            return <MainDocumentCard item={item} key={index} />
          })}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Vehicle Documents</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {carSubArray.length > 0 && <TouchableOpacity onPress={() => setCarSubArray([])} style={{ ...styles.textContainer, borderWidth: 1, width: '28%', justifyContent: 'center', alignItems: 'center', marginLeft: 25, marginBottom: 15 }}><Text style={{ ...styles.text, fontWeight: 500, fontSize: 18 }}>Vehicle Info</Text></TouchableOpacity>}

          {<TouchableOpacity onPress={() => { setShowAddModal(true) }} style={{ ...styles.textContainer, borderWidth: 1, width: '30%', justifyContent: 'center', alignItems: 'center', marginLeft: 25, marginBottom: 15 }}><Text style={{ ...styles.text, fontWeight: 500, fontSize: 18 }}>ADD VEHICLE</Text></TouchableOpacity>}

        </View>
        <View style={styles.document}>
          {carSubArray.length === 0 && carArray !== undefined && (carArray.length > 0) && carArray.map((item, index) => {
            return <TouchableOpacity style={{ width: '100%' }} key={index} onPress={() => { setArray(item, index) }}><VehicleCard item={item} index={index + 1} /></TouchableOpacity>
          })}
          {
            (carSubArray.length >= 0) && carSubArray.map((item, index) => {
              return <MainDocumentCard item={item} key={index} vehicleNo={vehicleNo}/>
            })
          }
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
export default React.memo(Documents)