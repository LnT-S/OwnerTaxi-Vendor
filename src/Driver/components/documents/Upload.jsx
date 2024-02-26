import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CustomDocumentPicker from './CustomDocumentPicker';

const Upload = () => {

    const DriverDoc = ['Adhar Card', 'Driving Licence', 'Police Verification']
    return (
        <View>
            <View>
                <View>
                    <Text>Driver Document</Text>
                </View>
                <View style={styles.docBoxes}>
                    {DriverDoc.map((item, index) => {
                        return <View key={index} style={styles.DocBox}>
                            <View style={styles.docpicker}><CustomDocumentPicker item={item} /></View>
                            <View style={styles.docName}><Text>Upload Your {item}</Text></View>
                        </View>
                    })}
                </View>
            </View>
            <View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    docBoxes: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    DocBox: {
        height: '40%',
        width: '45%',
        borderWidth: 1,
        borderColor: 'black',
        margin:5,
        display: 'flex',
        justifyContent: 'center'
    },
    docpicker: {
        height: '80%'
    },
    docName: {
        height: '20%'
    }

})

export default Upload;
