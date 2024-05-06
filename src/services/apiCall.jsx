import axios from "axios";
import server from './server.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getOtp = async (phoneNo , type) => {
    const URL = `${server.server}/authentication/get-otp`
    console.log('URL ', URL, phoneNo)

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    try {
        let res = await fetch(URL, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone: phoneNo, type : type })

        })
        let data = await res.json()
        console.log('DATA RECIVED ', data)
        return { status: res.status, data: data }
    } catch (error) {
        console.log('GET_OTP ERROR', error)
    }
}
export const verifyOtp = async (phone, otp) => {
    const URL = `${server.server}/authentication/verify-otp`
    console.log('URL ', URL, otp)

    // Authorization: auth_token ? `Bearer ${auth_token}` : ''
    let res = await fetch(URL, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNo: phone, otp: otp })

    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const deleteAccount = async () => {
    const URL = `${server.server}/authentication/delete-account`
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
export const activeBookingInfo = async () => {
    const URL = `${server.server}/customer/active-booking-info`
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
export const booking = async (formData) => {
    const URL = `${server.server}/driver/booking`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)

    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const addVehicle = async (formData) => {
    const URL = `${server.server}/driver/add-vehicle`
    console.log('URL ', URL)
    let auth_token = await AsyncStorage.getItem('token')

    let res = await fetch(URL, {
        method: 'post',
        mode: 'cors',
        headers: {
            'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)

    })
    let data = await res.json()
    console.log('DATA RECIVED ', data)
    return { status: res.status, data: data }
}
export const uploadDocumentDriver = async (rawFormData)=>{
    try {
        const URL = `${server.server}/driver/upload-document`
        console.log('URL ', URL)
        let auth_token = await AsyncStorage.getItem('token')
        let formData = new FormData();
        formData.append('documentNo',rawFormData.documentNo)
        formData.append('documentName',rawFormData.documentName)
        {rawFormData.vehicleNo ? formData.append('vehicleNo',rawFormData.vehicleNo) : ''}
        formData.append('documentFor',rawFormData.documentFor)
        formData.append('document',{
            name: rawFormData.document.name,
            type: rawFormData.document.type ,
            uri:
                Platform.OS === "android"
                    ? rawFormData.document.uri
                    : rawFormData.document.uri.replace("file://", "")
        })
        console.log("FORM DATA" , rawFormData)
        let res = await fetch(URL, {
            method: 'post',
            mode: 'cors',
            headers: {
                'Authorization': auth_token ? `Bearer ${auth_token}` : '',
            },
            body : formData
        })
        let data = await res.json()
        console.log('DATA RECIVED ', data)
        return { status: res.status, data: data } 
    } catch (error) {
        console.log("ERROR IN UPDATING PROFILE ", error)
    }
}