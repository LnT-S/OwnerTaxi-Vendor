import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const InvertedPersonInfoSemicircle = ({ imageSource, name, phoneNumber }) => {
  return (
    <View style={styles.container}>
      <View style={styles.semicircle}>
        <Image source={imageSource} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30, // Adjust as needed
  },
  semicircle: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 250,
    borderBottomRightRadius: 250,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 20, // Adjust as needed
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
    color:'white'
  },
  phoneNumber: {
    fontSize: 16,
    color:'white'
  },
});

export default InvertedPersonInfoSemicircle;
