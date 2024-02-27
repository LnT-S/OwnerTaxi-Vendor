import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import CroppedImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PressButton from './PressButton';
import { getResponsiveValue } from '../../styles/responsive';

const InvertedPersonInfoSemicircle = (props) => {

  const { image, name, phoneNumber, email } = props.item
  const editMode = props.editMode

  const selectImage = async () => {
    let selectedImage = {
      fileName: `OwerTaxi${new Date().getTime()}`,
      fileSize: 0,
      height: 0,
      type: "image/png",
      uri: '',
      width: 0
    }
    if (editMode) {
      try {
        const response = await CroppedImagePicker.openPicker({
          mediaType: 'photo',
          cropping: true, // Enable cropping
          cropperCircleOverlay: false, // Set to true if you want a circular crop overlay
          freeStyleCropEnabled: true, // Enable free-style cropping
          aspectRatio: [1, 1], // Set the aspect ratio for cropping (1:1 in this example)
          includeBase64: true,
          multiple: false, // Set to true if you want to allow multiple selection
          cropperToolbarTitle: 'Crop Image',
        });
        //  console.log(response)
        selectedImage.fileSize = response.size,
          selectedImage.height = response.cropRect.height,
          selectedImage.width = response.cropRect.width,
          selectedImage.type = response.mime,
          selectedImage.uri = response.path
        selectedImage.data = response.data
        //  console.log(selectedImage)
        console.log("Image Selected")
      } catch (error) {
        if (error) {
          console.log('ERROR  : Error Picking Image', error)
        }
      }
    }
  };
  const handleChange = (v) => {
    console.log(v)
  }
  return (
    <View style={styles.container}>
      <View style={styles.semicircle}>
        <Pressable onPress={selectImage} style={styles.imageContainer}>
          <Image

            source={(image === '' || image === undefined) ?
              require('../../assets/imgaes/Profile.png') :
              image
            }
            style={styles.image}
          />
          {editMode ? (<Icon name="edit" size={24} color="#ffea00" style={styles.imageEditIcon} />) : ("")}
        </Pressable>

        {editMode ? (
          <TextInput
            style={styles.editableField}
            onChangeText={(v) => { handleChange(v) }}
            placeholder={name ? name : 'Enter your User Name'}
            placeholderTextColor="gray"
          />) :
          (name === "" || name === undefined) ?
            '' :
            (<Text style={styles.name}>{name}</Text>)
        }
        
        {editMode ? (
          <TextInput
          style={styles.editableField}
          onChangeText={(v) => { handleChange(v) }}
          placeholder={email ? email : 'Enter your email'}
          placeholderTextColor="gray"
          />) :
          (email === "" || email === undefined) ?
          '' :
          (<Text style={styles.name}>{email}</Text>)
        }

        {editMode ? (
          <TextInput
          style={styles.editableField}
          onChangeText={(v) => { handleChange(v) }}
          placeholder={phoneNumber ? phoneNumber : 'Enter your Number'}
          placeholderTextColor="gray"
          />) :
          (phoneNumber === "" || phoneNumber === undefined) ?
          '' :
          (<Text style={styles.phoneNumber}>{phoneNumber}</Text>)
        }

      </View>
      {editMode ? <View style={styles.saveButton}>
        <PressButton name="Save" />
      </View> : ''}
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
