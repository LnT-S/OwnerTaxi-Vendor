import axios from "axios";
import server from './server.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalBooking = async () => {
    const URL = `${server.server}/driver/get-local-bookings`
    console.log('URL ', URL);
    let auth_token = await AsyncStorage.getItem('token')

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    try {
        let res = await fetch(URL, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            }
        })
        let data = await res.json()
        console.log('DATA RECIVED ', data)
        return { status: res.status, data: data }
    } catch (error) {
        console.log('GET_OTP ERROR', error)
    }
}
export const getIntercityBookingFromPostVendor = async () => {
    const URL = `${server.server}/driver/get-intercity-bookings-post-vendor`
    console.log('URL ', URL, phoneNo);
    let auth_token = await AsyncStorage.getItem('token')

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    try {
        let res = await fetch(URL, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            }
        })
        let data = await res.json()
        console.log('DATA RECIVED ', data)
        return { status: res.status, data: data }
    } catch (error) {
        console.log('GET_OTP ERROR', error)
    }
}
export const getIntercityBookingFromCustomer = async () => {
    const URL = `${server.server}/vendor/get-intercity-bookings-post-customer`
    console.log('URL ', URL, phoneNo);
    let auth_token = await AsyncStorage.getItem('token')

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    try {
        let res = await fetch(URL, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            }
        })
        let data = await res.json()
        console.log('DATA RECIVED ', data)
        return { status: res.status, data: data }
    } catch (error) {
        console.log('GET_OTP ERROR', error)
    }
}