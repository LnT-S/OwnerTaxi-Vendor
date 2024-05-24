import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, View, StyleSheet, ImageBackground, PermissionsAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import PressButton from '../../../adOns/atoms/PressButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../../adOns/atoms/Input';
import { uploadDocumentDriver } from '../../../services/apiCall';
import CroppedImagePicker from 'react-native-image-crop-picker';
import { BgColor } from '../../../styles/colors';
import { showNoty } from '../../../common/flash/flashNotification';

const CustomDocumentPicker = (props) => {

    const { documentName, visible, setVisible, documentDetails, vehicleNo, reload, autoGenerateNo } = props
    const [input, setInput] = useState(autoGenerateNo ? new Date().getTime().toString() : '')
    const [error, setError] = useState('')
    const [document, setDocument] = useState(null)
    const [isDocumentUploading, setIsDocumentUploading] = useState(false)

    console.log("DOCUMENT DETAILS ", documentDetails, vehicleNo)

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: false
            });
            console.log("RESPONSE OF DOCUMENT PICKER ", res[0]);
            res[0] = { ...res[0], documentName: documentName }
            setDocument(res[0])
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Error', err);
            }
        }
    };
    const openCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Allow',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const response = await CroppedImagePicker.openCamera({
                    cropperChooseColor: BgColor,
                    cropperCircleOverlay: true,
                    cropping: true,
                    mediaType: "photo",
                    multiple: false,
                    useFrontCamera: true,
                    freeStyleCropEnabled: true
                })
                let selectedImage = {
                    fileName: `OwerTaxi${new Date().getTime()}`,
                    name: `OwerTaxi${new Date().getTime()}`,
                    fileSize: 0,
                    height: 0,
                    type: "image/png",
                    uri: '',
                    width: 0,
                    data: ''
                }

                selectedImage.fileSize = response.size,
                    selectedImage.height = response.height,
                    selectedImage.width = response.width,
                    selectedImage.type = response.mime,
                    selectedImage.uri = response.path
                console.log('Image Picked', selectedImage)
                setDocument(selectedImage)
            } else {
                showNoty("CANNOT PICK DOCUMENT", "danger")
            }
        } catch (err) {
            console.log(err);
        }
    }


    const uploadDocument = () => {
        // API CALL FOR DOCUMENT UPLOAD
        if (input === '' ) {
            setError('Required')
            return
        }
        let documentFor = ''
        if (documentDetails.documentFor === '' || documentDetails.documentFor === "Driver" || documentDetails.documentFor === undefined) {
            documentFor = "Driver"
        } else {
            if (documentDetails.documentFor === 'Vehicle') {
                documentFor = "Vehicle"
            }
        }
        let data = {
            vehicleNo: vehicleNo,
            document,
            documentName,
            documentFor,
            documentNo: input,
        }
        uploadDocumentDriver(data)
            .then(data => {
                console.log(data.data.message)
                reload()
                // showMessage(data.data.message , data.status)
                if (data.status === 200) {
                    setTimeout(() => { showNoty(data.data.message, "success") }, 1000)
                } else {
                    setTimeout(() => { showNoty(data.data.message, "danger") }, 1000)
                }
                setVisible(false)
            })
            .catch(err => {
                console.log("ERROR IS ", err)
            })
        setIsDocumentUploading(true)
        setTimeout(() => { setIsDocumentUploading(false); setVisible(false) }, 2000)
        setDocument(null)
    }

    const cancelUpload = () => {
        console.log('UPLOAD CANCELLED')
        setError('')
        setDocument(null)
        setVisible(false)
    }

    useEffect(() => {
        console.log("DOCUMENT SELECTED ", document)
    }, [document])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {document !== null ? <Text style={styles.modalText}>{document.name.substring(0, 20)}...</Text> :
                        <Text style={styles.modalText}>Choose {documentName}</Text>}
                    <View style={{ maxWidth: '80%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexWrap: 'wrap', marginVertical: 10 }}>
                        <Text style={{ fontSize: 22, color: 'black', marginBottom: 7, letterSpacing: -0.5 }}>{documentName} No</Text>
                        <Input
                            containerStyles={{ width: 230 }}
                            textInputProps={{
                                onChangeText: (v) => { setInput(v) },
                                value:input,
                                editable : !autoGenerateNo
                            
                            }}
                        />
                        {error !== '' ? <Text style={{ color: 'red', textAlign: 'center', fontSize: 12, fontWeight: '300' }}>* {error}</Text> : ''}
                    </View>
                    {document !== null ? <PressButton name="Upload Document" onPress={uploadDocument} /> :
                        <PressButton
                            name="Pick Document"
                            onPress={() => openCamera().then((data) => { console.log(data); }).catch(err => { console.log('ERROR PICKING DOCUMENT', err) })}
                            loading={isDocumentUploading}
                            disabled={isDocumentUploading} />}
                    <PressButton name="Close" onPress={cancelUpload} disabled={isDocumentUploading} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 10,
        color: 'black',
        fontSize: 22
    },
    circle: {
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
});

export default CustomDocumentPicker;
