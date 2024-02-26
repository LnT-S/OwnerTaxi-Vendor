import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, ImageBackground } from 'react-native';
import CustomDocumentPicker from './CustomDocumentPicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { documentPicker } from '../../../utils/UtilityFuntions';

const DocumentCard = (props) => {

    const { documentName, documentId, status, url } = props.item
    const [document , setDocument] = useState(null)

    return (
        <View style={styles.DocBox}>
            <View style={styles.DocType}>
                {(status == 'Missing') ?
                        <CustomDocumentPicker documentName={documentName} />
                    : (status == 'Uploaded') ?
                        <View style={styles.uploadbox}>
                            <View>
                                <Text style={styles.text}>
                                    {documentName}
                                </Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name="close" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        : (status == 'Accept') ?
                            <View style={styles.acceptbox}>
                                <View>
                                    <Text style={styles.text}>
                                        {documentName}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.text}>
                                        Accepted
                                    </Text>
                                </View>
                            </View>
                            : <View style={styles.Rejectbox}>
                                <View>
                                    <Text style={styles.text}>
                                        {documentName}
                                    </Text>
                                </View>
                                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.text}>
                                        {status}
                                    </Text>
                                    <TouchableOpacity>
                                    <Button title="Update" onPress={()=>setDocument(documentPicker(documentName))}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                }
            </View>
            <View style={styles.docName}>
                <Text style={styles.text}>{documentName}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    DocBox: {
        width: 160,
        height: 130,
        borderWidth: 4,
        borderRadius: 24,
        borderColor: 'black',
        margin: 10,
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    DocType: {
        height: '80%',
        display: 'flex',
        justifyContent: 'center'
    },
    docName: {
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    text: {
        color: 'white'
    },
    uploadbox: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    acceptbox: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    Rejectbox: {
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    }
})

export default DocumentCard;
