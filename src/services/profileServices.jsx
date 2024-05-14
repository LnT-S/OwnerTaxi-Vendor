import { Platform } from 'react-native';
import server from './server.tsx'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getProfile = async () => {
    const URL = `${server.server}/driver/get-profile-info`
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
    console.log('DATA RECIVED ', data , data.data.phoneNo)
    return { status: res.status, data: data }
}
export const editProflie = async (rawFormData)=>{
    try {
        const URL = `${server.server}/customer/edit-profile-info`
        console.log('URL ', URL)
        let auth_token = await AsyncStorage.getItem('token')
        let formData = new FormData();
        rawFormData.name ? formData.append('name',rawFormData.name) : ''
        rawFormData.email ? formData.append('email',rawFormData.email) : ''
        rawFormData.avatar ? formData.append('avatar',{
            name: rawFormData.avatar.fileName,
            type: rawFormData.avatar.type ,
            uri:
                Platform.OS === "android"
                    ? rawFormData.avatar.uri
                    : rawFormData.avatar.uri.replace("file://", "")
        }) : ''
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
        console.log('DATA RECIVED ', data , data.data.phoneNo)
        return { status: res.status, data: data } 
    } catch (error) {
        console.log("ERROR IN UPDATING PROFILE ", error)
    }
}