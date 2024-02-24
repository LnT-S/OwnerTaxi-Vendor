import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RefreshButton = () => {
    const rotation = useRef(new Animated.Value(0)).current;

    const startRotation = () => {
        Animated.timing(rotation, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            rotation.setValue(0);
        });
    };

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <TouchableOpacity onPress={startRotation}>
            <Animated.View style={[styles.refreshButton, { transform: [{ rotate }] }]}>
                <Icon name="refresh" size={30} color="#000" />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    refreshButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default RefreshButton;
