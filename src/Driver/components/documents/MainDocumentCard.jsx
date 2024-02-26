import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import PressButton from '../../../adOns/atoms/PressButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MainDocumentCard = (props) => {
    const { url, status, documentId, documentName } = props.item

    const backgroundColorMapper = {
        Missing : styles.missingContainer,
        Uploaded : styles.pendingContainer,
        Reject : styles.rejectedContainer,
        Accept : styles.acceptedContainer
    }
     
    return (

        <View style={{...styles.container , ...backgroundColorMapper[status]}}>
            <View style={styles.section1}>
                <View style={styles.statusContainer}>
                    <Text style={styles.statusContainerText}>{status}</Text>
                </View>
            </View>
            <View style={styles.section2}>
                <TouchableOpacity style={styles.viewButtonContainer}>
                    <Text>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadButtonContainer}>
                    <Text>Upload</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section3}>
            <View style={styles.documentNameTextContainer}>
            <Text style={styles.documentNameText}>{documentName}</Text>
            </View>
            </View>
            <TouchableOpacity style={styles.crossButton}>
                <Icon name="close" size={24} color="red" />
            </TouchableOpacity>
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
        borderWidth: 1,
        flexDirection : 'column'
    },
    crossButton: {
        position: 'absolute',
        top: 3,
        right: 3,
        color: 'red',
        backgroundColor : 'white',
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
        color: 'black',
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
        widht : '100%',
        flexBasis: '25%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    documentNameTextContainer : {
    },
    viewButtonContainer: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    viewButtonContainerText: {

    },
    documentNameText:{
        color : 'white',
        fontSize : 16,
        letterSpacing : 1.1,
        fontWeight : '400'
    },
    uploadButtonContainer: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    uploadButtonContainerText: {
        color: 'black'
    },
    acceptedContainer : {
        backgroundColor : 'green'
    },
    missingContainer : {
        backgroundColor : 'blue'
    },
    pendingContainer: {
        backgroundColor : 'orange'
    },
    rejectedContainer : {
        backgroundColor : 'red'
    }
})

export default MainDocumentCard;

