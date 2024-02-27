import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, View, StyleSheet, ImageBackground } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import PressButton from '../../../adOns/atoms/PressButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDocumentPicker = (props) => {

    const { documentName , visible , setVisible } = props

    const [document, setDocument] = useState(null)
    const [isDocumentUploading, setIsDocumentUploading] = useState(false)

    const pickDocument = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: false
            });

            res[0] = { ...res[0], doucumentName: documentName }
            setDocument(res[0])
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the picker');
            } else {
                console.log('Error', err);
            }
        }
    };

    const uploadDocument = () => {
        // API CALL FOR DOCUMENT UPLOAD
        setIsDocumentUploading(true)
        setTimeout(() => { setIsDocumentUploading(false); setVisible(false) }, 2000)
        console.log('DOCUMENT UPLOADED SUCCESSFULLY')
        setDocument(null)
    }

    const cancelUpload = () => {
        console.log('UPLOAD CANCELLED')
        setDocument(null)
        setVisible(false)
    }

    return (
        <View style={styles.container}>
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
                        {document !== null ? <Text style={styles.modalText}>{document.name}</Text> :
                            <Text style={styles.modalText}>Choose a document</Text>}
                        {document !== null ? <PressButton name="Upload Document" onPress={uploadDocument} /> :
                            <PressButton
                                name="Pick Document"
                                onPress={() => pickDocument().then(() => { }).catch(err => { console.log('ERROR PICKING DOCUMENT') })}
                                loading={isDocumentUploading}
                                disabled={isDocumentUploading} />}
                        <PressButton name="Close" onPress={cancelUpload} disabled={isDocumentUploading} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 20,
        color: 'black',
        fontSize: 20
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
