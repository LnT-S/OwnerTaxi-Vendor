import React, { createContext, useReducer, Dispatch, useContext, useState } from 'react'
export const ProfileContext = createContext()

export const ContextProvider = ({ children }) => {

    const profileData = {
        refresh:false,
        userName: '',
        token: '',
        countryCode: 10,
        phone: 1000000000,
        email: '',
        avatar : '',
        bookingForm: {
            pickUp: {
                description: '',
                latitute: 10,
                longitude: 10,
                date: {
                    msec: 643546,
                    year: 54,
                    month: 10,
                    day: 21,
                    hour: 2,
                    min: 55
                }
            },
            drop: {
                description: '',
                latitute: 10,
                longitude: 10,
                date: {
                    msec: 643546,
                    year: 54,
                    month: 10,
                    day: 21,
                    hour: 2,
                    min: 55
                }
            },
            
            budget: 100,
            bookingType: 'local',
            vehicle: {
                type: 'mini',
                subType: '',
                capacity: 4
            },
            extrasIncluded: false,
            package: {
                costPerKm: 10,
                costPerHour: 10,
                distance: 10,
                hours: 10,
                extra: {
                    costPerKm: 10,
                    costPerHour: 10,
                    distance: 10,
                    hours: 10,
                }
            }
        }
    } 
    const profileReducer = (state = profileData, action) => {
        switch (action.type) {
            case 'REFRESH':
                return { ...state, refresh: action.payload }
            case 'USERNAME':
                return { ...state, userName: action.payload }
            case 'TOKEN':
                return { ...state, token: action.payload }
            case 'CC':
                return { ...state, countryCode: action.payload }
            case 'PHONE':
                return { ...state, phone: action.payload }
            case 'EMAIL':
                return { ...state, email: action.payload }
            case 'AVATAR':
                return { ...state, avatar: action.payload }
            case 'BOOKINGFORM':
                return { ...state, bookingForm : action.payload }
            default:
                return state
        }
    }
    const [profileState, profileDispatch] = useReducer(profileReducer, profileData)

    return (
        <ProfileContext.Provider value={{ profileState, profileDispatch }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if(context===undefined){
        throw new Error("OUT OF BOUNDS FOR CONTEXT")
    }
    return context
}
