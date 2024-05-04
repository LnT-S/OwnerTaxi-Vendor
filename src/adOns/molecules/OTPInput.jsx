import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length, OTP }) => {
  const [otp, setOTP] = useState([...OTP]);
  const inputRefs = useRef([]);
  console.log('in otp view',OTP)

  // const handleOTPChange = (index, value) => {
  //   const newOTP = [...otp];
  //   newOTP[index] = value;
  //   setOTP(newOTP);
  //   onOTPChange(newOTP.join(''));

  //   if (value !== '' && index < length - 1) {
  //     inputRefs.current[index + 1].focus();
  //   } else if (value === '' && index > 0) {
  //     inputRefs.current[index - 1].focus();
  //   }
  // };
  useEffect(()=>{
    setOTP([...OTP])
  },[OTP])

  return (
    <View style={styles.container}>
    {otp.map((_, index) => (
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
