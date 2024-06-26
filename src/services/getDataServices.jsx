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
    console.log('URL ', URL);
    let auth_token = await AsyncStorage.getItem('token')

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    try {
        const timeOut = 7000
        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject({data : {message : "Server Unreachable"},status : 400});
            }, timeOut);
        });
        let fetchPromise = fetch(URL, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            }
        })
        const res = await Promise.race([fetchPromise, timeoutPromise]);
        let data = await res.json()
        console.log('DATA RECIVED ', data)
        return { status: res.status, data: data }
    } catch (error) {
        console.log('GET_OTP ERROR', error)
            return error
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
export const getDocumentInfo = async () => {
    const URL = `${server.server}/driver/get-document-info`
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
        console.log('GET_DOCUMENT_INFO ERROR', error)
    }
}
export const getBookingsDriverHasPosted = async () => {
    const URL = `${server.server}/driver/get-bookings-i-have-posted`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        }
    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const getDriverHistory = async () => {
    const URL = `${server.server}/driver/get-history`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        }
    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const getBookingsDriverHasAccepted = async () => {
    const URL = `${server.server}/driver/get-bookings-i-have-accepted`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        }
    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const getTransactionInfo = async ()=>{
    const URL = `${server.server}/driver/get-transaction-info`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'get',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        }
    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}