import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { BgColor } from '../../styles/colors';


const CheckbocTC = (props) => {

    const [isChecked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    return (
        <View style={styles.container}>
            <CheckBox
                title={props.placeholder}
                checked={isChecked}
                onPress={handleCheckboxChange}
                containerStyle={styles.checkbox}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: `black`
      },
  });
export default CheckbocTC