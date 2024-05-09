import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from 'react-native';
import CroppedImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PressButton from './PressButton';
import { getResponsiveValue } from '../../styles/responsive';
import { imagePicker } from '../../utils/UtilityFuntions';
import server from '../../services/server.tsx'
import { useProfile } from '../../context/ContextProvider';
import { useFocusEffect } from '@react-navigation/native';
import { getProfile, editProflie } from '../../services/profileServices';

const InvertedPersonInfoSemicircle = (props) => {

  const { image, name, phoneNumber, email } = props.item
  // console.log("EMail ", email)
  const {showEdit} = props
  const [uri, setUri] = useState("")
  const { profileDispatch, profileState } = useProfile()
  const [editMode, setEditMode] = useState(props.editMode)
  const [imageSeletected, setImageSelected] = useState(false)
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    avatar: image
  })
  const handleChange = ({ name, value }) => {
    setFormData(prev => {
      return { ...prev, [name]: value }
    })
  }
  const handleAvatar = function () {
    console.log("SERVER ", server.server, !imageSeletected, image !== undefined, image !== '')
    if (imageSeletected) {
      setUri(formData.avatar?.uri)
    } else {
      if (!imageSeletected && image !== undefined && image !== '') {
        console.log("hey")
        setUri(server.server + image)
        // setImageSelected(false)
      }
      else {
        setUri("")
      }
    }
  }
  const handleUpdate = () => {
    editProflie(formData)
      .then(data => {
        console.log("DATA RECIVED", data)
        getProfile()
          .then(data => {
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
        setEditMode(false)
      })
      .catch(err => {
        console.log("ERROR UPDATING PROFILE ", err)
      })
  }
  useFocusEffect(
    useCallback(() => {
      handleAvatar()
    }, [image, imageSeletected])
  )
  return (
    <View style={styles.container}>
      <View style={styles.semicircle}>
        <View style={styles.imageContainer}>
          <Image
            source={(uri === "") ?
              require('../../assets/imgaes/Profile.png') :
              { uri: uri }
            }
            style={styles.image}
          />
          {editMode ? (<TouchableOpacity onPress={async () => {
            imagePicker('Select Profile Image', 'photo', true, false, true, true)
              .then(image => {
                image !== null ? setFormData(prev => {
                  return { ...prev, avatar: image }
                }) : ''
                image !== null ? setImageSelected(true) : ''
                handleAvatar()
              })
              .catch(err => {
                console.log('ERROR IN IMAGE PICK', err)
                setImageSelected(false)
              })
          }}>
            <Icon name="edit" size={24} color="#ffea00" style={styles.imageEditIcon} />
          </TouchableOpacity>) : ("")}
        </View>

        {editMode ? (
          <TextInput
            style={styles.editableField}
            onChangeText={(v) => { handleChange({ name: 'name', value: v }) }}
            placeholder={(name === '' || name === undefined) ? 'Enter your User Name' : name}
            placeholderTextColor="gray"
          />) :
          (name === "" || name === undefined) ?
            '' :
            (<Text style={styles.name}>{name}</Text>)
        }

        {editMode ? (
          <TextInput
            style={styles.editableField}
            onChangeText={(v) => { handleChange({ name: 'email', value: v }) }}
            placeholder={(email === '' || email === undefined) ? 'Enter your email' : email}
            placeholderTextColor="gray"
          />) :
          (email === "" || email === undefined) ?
            '' :
            (<Text style={styles.name}>{email}</Text>)
        }
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      {(showEdit===false || showEdit===undefined) && (editMode ? <PressButton name="Save" onPress={handleUpdate} /> : <PressButton name="Edit" onPress={() => { setEditMode(true) }} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30, // Adjust as needed
  },
  saveButton: {
    position: 'absolute',
    bottom: -30,
    left: '35%'
  },
  semicircle: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  phoneNumber: {
    fontSize: 16,
    color: 'white'
  },
  imageContainer: {
    position: 'relative'
  },
  imageEditIcon: {
    position: 'absolute',
    bottom: 15,
    right: 1,
  },
  editableField: {
    color: 'white',
    fontSize: getResponsiveValue(20, 16),
    // marginTop: getResponsiveValue(0, 0),
    // marginBottom: getResponsiveValue(5, 5),
    fontWeight: 'bold',
    borderBottomColor: '#ffea00',
    borderBottomWidth: 1,
    width: '70%',
    textAlign: 'center',
    position: 'relative',
    bottom: getResponsiveValue(5, 5),
  },
});

export default InvertedPersonInfoSemicircle;
