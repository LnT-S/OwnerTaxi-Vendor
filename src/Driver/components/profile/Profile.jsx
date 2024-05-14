import React, { useCallback, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import Semicircle from '../../../adOns/atoms/SemiCircle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import YesNoModal from '../../../adOns/molecules/YesNoModal';
import { useProfile } from '../../../context/ContextProvider';
import { getProfile } from '../../../services/profileServices';

const Profile = () => {

  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const { profileState, profileDispatch } = useProfile()
  const [loading, setLoading] = useState(false)
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
        email: profileState.email
      })
      // console.log('7887798 ',profileState.email)
    }, [profileState]))

  const handleRefresh = () => {
    setLoading(true)
    getProfile()
      .then(data => {
        setProfileDetails({
          image: data.data.data.avatar,
          name: data.data.data.name,
          phoneNumber: data.data.data.phoneNo,
          email: data.data.data.email
        })
        profileDispatch({
          type: 'PHONE',
          payload: data.data.data.phoneNo
        })
        profileDispatch({
          type: 'USERNAME',
          payload: data.data.data.name
        })
        profileDispatch({
          type: 'EMAIL',
          payload: data.data.data.email
        })
        profileDispatch({
          type: 'AVATAR',
          payload: data.data.data.avatar
        })
      })
      .catch(err => {
        console.log("ERROR IN RETRIVING PROFILE ", err)
      })
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  const handleShow = () => {
    setShowModal(false);
  };


  return (
    <AuthenticatedLayout title={'Profile'}>
      <View style={{ position: 'absolute', top: 5, right: 5, zIndex: 99 }}>
        {!loading ? <Icon name="refresh" size={24} color="white" style={styles.imageEditIcon} onPress={handleRefresh} /> : <ActivityIndicator />}
      </View>
      <YesNoModal
        show={showModal}
        setShow={setShowModal}
        title={'Show ?'}
        message={'Show my info to Customer'}
        handleYes={handleShow}
        yesText={'Hide'}
        noText={'Show'} />
      <Semicircle item={profileDetails} editMode={false} showEdit={false}/>
      <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <View style={styles.settingBox}>
          <TouchableOpacity style={styles.listItem1} onPress={() => setShowModal(true)}>
            <Icon name="visibility" size={30} color="#ffea00" />
            <Text style={styles.text}>Show My Name To Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem1} onPress={() => setShowModal(true)}>
            <Icon name="visibility" size={30} color="#ffea00" />
            <Text style={styles.text}>Show My Email ID To Customer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem2} onPress={() => setShowModal(true)}>
            <Icon name="visibility" size={30} color="#ffea00" />
            <Text style={styles.text}>Show My Profile Image To Customer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => { navigation.navigate('Privacy') }}>
          <Text style={styles.textStyle}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </AuthenticatedLayout>
  )
}
const styles = StyleSheet.create({
  settingBox: {
    backgroundColor: 'black',
    marginHorizontal: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  listItem1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ffea00',
    marginLeft: 0,
    padding: 5
  },
  text: {
    color: '#ffea00',
    fontSize: 18,
    marginLeft: 10
  },
  listItem2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    padding: 5
  },
  textStyle: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    padding: 15,
    textDecorationLine: 'underline'
  }
})
export default Profile