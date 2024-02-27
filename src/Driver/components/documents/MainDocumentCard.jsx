import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import PressButton from '../../../adOns/atoms/PressButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDocumentPicker from './CustomDocumentPicker';
import InfoModal from '../../../adOns/molecules/InfoModal';

const MainDocumentCard = (props) => {
    const { url, status, documentId, documentName } = props.item

    const [modalVisible, setModalVisible] = useState(false);
    const [infoModalVisible , setInfoModalVisible ] = useState(false)

    const backgroundColorMapper = {
        Missing: styles.missingContainer,
        Uploaded: styles.pendingContainer,
        Reject: styles.rejectedContainer,
        Accept: styles.acceptedContainer
    }
    const infoMessage = {
        Missing: 'You have not yet uploaded the required document',
        Uploaded: 'You have uploaded the document.It is under the review.You will get response soon',
        Reject: 'Your uploaded document have been rejected. Please contact Super Administrator',
        Accept: 'Your document have been successfully uploaded and accepted by the administrator'
    }

    return (

        <View style={{ ...styles.container }}>
            <CustomDocumentPicker 
            document={props.item}
            documentName={documentName}
            visible = {modalVisible}
            setVisible = {setModalVisible}
             />
             <InfoModal 
             show = {infoModalVisible} 
             setShow = {setInfoModalVisible}
             title= {status} 
             message = {infoMessage[status]}
             />
            <View style={styles.section1}>
                <TouchableOpacity 
                style={{ ...styles.statusContainer, ...backgroundColorMapper[status] }}
                onPress={()=>setInfoModalVisible(true)}
                >
                    <Text style={styles.statusContainerText}>{status}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section2}>
                {(status==='Uploaded' || status==='Accept' || status==='Reject')?<TouchableOpacity style={styles.viewButtonContainer}>
                    <Text style={styles.viewButtonContainerText}> View </Text>
                </TouchableOpacity>:''}
                {(status==='Missing' || status==='Reject')?
                <TouchableOpacity 
                style={styles.uploadButtonContainer}
                onPress={()=>setModalVisible(true)}
                >
                    <Text style={styles.uploadButtonContainerText}> Upload </Text>
                </TouchableOpacity>:''}
            </View>
            <View style={styles.section3}>
                <View style={styles.documentNameTextContainer}>
                    <Text style={styles.documentNameText}>{documentName}</Text>
                </View>
            </View>
            {/*<TouchableOpacity style={styles.crossButton}>
                <Icon name="close" size={18} color="red" />
    </TouchableOpacity>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        width: '45%',
        height: 170, //adjust,
        flexWrap: 'wrap',
        borderWidth: 5,
        flexDirection: 'column'
    },
    crossButton: {
        position: 'absolute',
        top: 3,
        right: 3,
        color: 'red',
        backgroundColor: 'white',
        borderRadius: 50,
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section1: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '40%',
        marginTop: 10,

    },
    statusContainer: {
        width: '60%',

    },
    statusContainerText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center'
    },
    section2: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexBasis: 'auto',
        flexDirection: 'row',

    },
    section3: {
        widht: '100%',
        flexBasis: '25%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    documentNameTextContainer: {
    },
    viewButtonContainer: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 5
    },
    viewButtonContainerText: {
        fontSize: 16,
        color: 'white'
    },
    documentNameText: {
        color: 'white',
        fontSize: 16,
        letterSpacing: 1.1,
        fontWeight: '400'
    },
    uploadButtonContainer: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'black',

    },
    uploadButtonContainerText: {
        color: 'white',
        fontSize: 16
    },
    acceptedContainer: {
        backgroundColor: 'green'
    },
    missingContainer: {
        backgroundColor: 'blue'
    },
    pendingContainer: {
        backgroundColor: 'orange'
    },
    rejectedContainer: {
        backgroundColor: 'red'
    }
})

export default MainDocumentCard;

