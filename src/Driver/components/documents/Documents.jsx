import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { BgColor, WHITEBG } from '../../../styles/colors'
import { useProfile } from '../../../context/ContextProvider'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import YesNoModal from '../../../adOns/molecules/YesNoModal'
import { deleteVehicle } from '../../../services/apiCall'

const Documents = () => {
  const [carSubArray, setCarSubArray] = useState([])
  const ref = useRef()
  const navigation = useNavigation()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [driverArray, setDriverArray] = useState(null)
  const [carArray, setCarArray] = useState([])
  const [vehicleNo, setVehicleNo] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [vehicleNoToDelete, setNoOfVehicleToDelete] = useState('')
  const { profileState, profileDispatch } = useProfile()
  const [profileDetails, setProfileDetails] = useState({
    image: profileState.avatar,
    name: profileState?.userName,
    phoneNumber: profileState?.phone,
    email: profileState.email
  })
  useFocusEffect(
    useCallback(() => {
      setProfileDetails({
        image: profileState.avatar,
        name: profileState?.userName,
        phoneNumber: profileState?.phone,
        email: profileState?.email
      })
    }, []))

  const fetchDocumentDetails = () => {
    setLoading(true)
    getDocumentInfo()
      .then(data => {
        setDriverArray(data.data.data.driverDocuments)
        // console.log(data.data.data.driverDocuments)
        setCarArray(data.data.data.vehicleDocument)
        // console.log(data.data.data.vehicleDocument)
        setCarSubArray([])
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
  const handleYes = () => {
    console.log("DELETE VEHICLE ", vehicleNoToDelete)
    deleteVehicle({ vehicleNo: vehicleNoToDelete })
      .then(data => {
        console.log(data.data.message);
        if (data.status === 200) {
          showNoty(data.data.message, "success")
          fetchDocumentDetails()
          setShowModal(false)
        } else {
          showNoty(data.data.message, "danger")
        }
      })
      .catch(err=>{
        console.log("ERROR DELETING VEHICLE ");
        showNoty(err,"danger")
      })
  }
  // useEffect(() => {
  //   console.log("DRIVER ARRAY ", driverArray)
  // }, [driverArray])
  useEffect(() => {
    console.log("CAR ARRAY ", driverArray)
  }, [carArray])

  useEffect(() => {
    setLoading(true)
    console.log("RELOADING ...")
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
  }, [refresh])
  useEffect(() => {
    const backFuntion = () => {
      navigation.goBack()
      return true
    }
    console.log("BACKHANDLER SET IN HOME PAGE")
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backFuntion);
    return () => {
      console.log('BACKHANDLER REMOVED FROM HOME PAGE')
      backHandler.remove()
    };
  }, []);

  return (
    <AuthenticatedLayout title={'Document'}>
      <ScrollView>
        <InvertedPersonInfoSemicircle item={profileDetails} editMode={false} showEdit={false} />
        <AddVehicleModal
          show={showAddModal}
          setShow={setShowAddModal}
          reload={fetchDocumentDetails}
        />
        <YesNoModal
          show={showModal}
          setShow={setShowModal}
          title={'EXIT ?'}
          message={'Are You Sure Want To Delete the vehicle ?'}
          handleYes={handleYes}
          yesText={'Delete'}
          noText={'Cancel'} />
        <FlashMessage ref={ref} />
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ backgroundColor: WHITEBG, width: '97%', borderRadius: 15 }}>
            <View style={{ ...styles.textContainer, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
              <Text style={styles.text}>Driver Documents</Text>
              {!loading ? <TouchableOpacity onPress={fetchDocumentDetails} style={{ position: 'relative', right: 20 }}><Icon name="refresh" size={30} color="#000" /></TouchableOpacity> : <ActivityIndicator />}
            </View>
            <View style={styles.document}>
              {!loading && driverArray?.map((item, index) => {
                return <View style={{ position: "relative", width: "45%" }} key={index}>
                  {item.required && <View style={{ position: "absolute", top: 5, right: 10, zIndex: 10 }}>
                    <Text style={{ fontSize: 24, color: "red" }}>*</Text>
                  </View>}
                  <View style={{ width: '100%' }}>
                    <MainDocumentCard item={item} reload={fetchDocumentDetails} />
                  </View>
                </View>
              })}
            </View>
          </View>
          <View style={{ backgroundColor: WHITEBG, marginTop: 10, width: '97%', borderRadius: 15 }}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Vehicle Documents</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.007)', alignItems: 'center', padding: 10 }}>
              {carSubArray.length > 0 && <TouchableOpacity onPress={() => setCarSubArray([])} style={{ ...styles.textContainer, borderWidth: 1, width: "40%", justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 0, backgroundColor: 'black', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}><Text style={{ ...styles.text, fontWeight: 500, fontSize: 18, color: 'white' }}>Vehicle Info</Text></TouchableOpacity>}

              {<TouchableOpacity onPress={() => { setShowAddModal(true) }} style={{ ...styles.textContainer, borderWidth: 1, width: "40%", justifyContent: 'center', alignItems: 'center', marginLeft: 25, marginBottom: 0, backgroundColor: 'black', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}><Text style={{ ...styles.text, fontWeight: 500, fontSize: 18, color: 'white' }}>ADD VEHICLE</Text></TouchableOpacity>}

            </View>
            <View style={styles.document}>
              {carSubArray.length === 0 && carArray !== undefined && (carArray.length > 0) && carArray.map((item, index) => {
                return <TouchableOpacity style={{ width: '100%', position: "relative" }} key={index} onPress={() => { setArray(item, index) }}>
                  <TouchableOpacity style={{ position: "absolute", top: 5, right: 5, zIndex: 5 }} onPress={() => { setNoOfVehicleToDelete(item.vehicleNo); setShowModal(true) }}>
                    <Icon name='delete' size={24} />
                  </TouchableOpacity>
                  <VehicleCard item={item} index={index + 1} />
                </TouchableOpacity>
              })}
              {
                (carSubArray.length >= 0) && carSubArray.map((item, index) => {
                  return <View style={{ position: "relative", width: "45%" }} key={index}>
                    {item.required && <View style={{ position: "absolute", top: 5, right: 10, zIndex: 10 }}>
                      <Text style={{ fontSize: 24, color: "red" }}>*</Text>
                    </View>}
                    <View style={{ width: '100%' }}>
                      <MainDocumentCard item={item} key={index} vehicleNo={vehicleNo} reload={fetchDocumentDetails} />
                    </View>
                  </View>
                })
              }
            </View>
          </View>
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
    marginBottom: 25,

  },
  textContainer: {
    height: 50,
    width: '100%',
    // margin: 5,
    marginBottom: 10,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black'
  }
})
export default React.memo(Documents)