import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View , TouchableOpacity, ScrollView} from 'react-native'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import Semicircle from '../../../adOns/atoms/SemiCircle'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../../context/ContextProvider';
import { deleteAccount } from '../../../services/apiCall';
import { showNoty } from '../../../common/flash/flashNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage from 'react-native-flash-message';
import YesNoModal from '../../../adOns/molecules/YesNoModal';

const Setting = () => {

  const navigation = useNavigation()
  const {profileState, profileDispatch} = useProfile()
  const [showModal, setShowModal] = useState(false)
  const delRef = useRef(null)

  const profileDetails = {
    image : '',
    name: 'Shruti',
    phoneNumber: '1234567891',
    email: ''
  }
  const handleDelete = () => {
    console.log("DELETE PRESSED")
    deleteAccount()
      .then(async data => {
        console.log(data.data.message , data.status)
        setShowModal(false)
        // profileDispatch({type:'REFRESH', payload:!profileState.refresh})
        if(data.status!==200){
          showNoty(data.data.message,"danger")
        }else{
          showNoty("Account deleted successfully","success")
        }
        await AsyncStorage.clear()
        setTimeout(()=>{
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        },2500)
      }).catch(error => {
        console.log("ERROR DELETING ACCOUNCT", error)
        setShowModal(false)
      })
  }

  return (
    <AuthenticatedLayout title={'Setting'}>
    <Semicircle item = {profileDetails} editMode={false}/>
      <View style={{flex : 1 ,display : 'flex', flexDirection : 'column',justifyContent : 'space-between' , width : '100%'}}>
        <View style={styles.settingBox}>
        <FlashMessage ref={delRef} />
          <TouchableOpacity style={styles.listItem1} onPress = {() => navigation.navigate('profileScreen')}>
            <Icon name="edit" size={30} color="#ffea00" />
            <Text style={styles.text}>Edit Profile</Text>
          </TouchableOpacity>
          <YesNoModal
            show={showModal}
            setShow={setShowModal}
            title={'EXIT ?'}
            message={'Are You Sure Want To DELETE your account ?'}
            handleYes={handleDelete}
            yesText={'Delete'}
            noText={'Cancel'} />
          <TouchableOpacity style={styles.listItem1} onPress={() => { setShowModal(true) }}>
            <Icon name="delete" size={30} color="#ffea00" />
            <Text style={styles.text}>Delete My Account</Text>
          </TouchableOpacity>
          <View style={styles.listItem2}>
            <Icon name="exit-to-app" size={30} color="#ffea00" />
            <Text style={styles.text}>Log Out</Text>
          </View>
        </View>
        <TouchableOpacity style={{width : '100%'}} onPress={() => {navigation.navigate('Terms')}}>
          <Text style={styles.textStyle}>Terms and Conditions</Text>
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
  textStyle:{
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    padding:15,
    textDecorationLine: 'underline'
  }
})
export default Setting