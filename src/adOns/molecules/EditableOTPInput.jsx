import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length, otpIs}) => {
  const [otp, setOTP] = useState([]);
  const myArray = Array(6).fill(null);
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    // console.log(newOTP.toString().replaceAll(',',"").length);
    otpIs(newOTP.toString().replaceAll(',',""))

    if (value !== '' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
//   useEffect(()=>{
//     console.log("OTP CHANGE IS ",otp);
//   },[otp])

  return (
    <View style={styles.container}>
    {myArray.map((_, index) => (
      <TextInput
        key={index}
        style={styles.input}
        onChangeText={(value) => handleOTPChange(index, value)}
        value={otp[index]}
        maxLength={1}
        keyboardType="numeric"
        selectTextOnFocus
        ref={(ref) => (inputRefs.current[index] = ref)}
      />
    ))}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%'
  },
  input: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 2,
  },
});

export default OTPInput;
