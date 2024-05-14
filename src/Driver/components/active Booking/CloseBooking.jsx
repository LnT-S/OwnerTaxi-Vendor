import React, { useState } from 'react'
import AuthenticatedLayout from '../../common/layout/AuthenticatedLayout'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { BgColor, WHITEBG } from '../../../styles/colors'
import Icon from 'react-native-vector-icons/MaterialIcons';
import PressButton from '../../../adOns/atoms/PressButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showNoty } from '../../../common/flash/flashNotification';
import { closeBooking } from '../../../services/apiCall';

const CloseBooking = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const {item} = route.params
    console.log("CLOSE BOOKIHNG PROPS",props?.route,'\n' ,item.passiveBookingId)

    const [rating, setRating] = useState(0);

    const handleRating = (selectedRating) => {
        setRating(selectedRating);
    };
    const handleClose=()=>{
        let rat = parseInt(rating)
        if(!isNaN(rat)&& rat!==0){
            let bookingId = item.passiveBookingId._id
            closeBooking({bookingId , rating : rat})
            .then(data=>{
                if(data.status===200){
                    showNoty(data.data.message , "success")
                    navigation.goBack()
                }else{
                    showNoty(data.data.message,"danger")
                }
            })
            .catch(err=>{
                console.log("ERROR IN CLOSING BOOKING ",err)
                showNoty("Some error occured !! Try reopening the app or login again")
            })
        }else{
            showNoty("Rating the user is compulsory !! It is the only way to improove ourself","danger")
        }
    }

    return (
        <AuthenticatedLayout title="Close Booking">
            <View style={{ flex: 1, backgroundColor: WHITEBG, alignItems: 'center', justifyContent: 'center', }}>
                <View style={{ width: '80%', height: 400, gap: 20, alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{ width: '95%', height: 300,backgroundColor : 'rgba(0,0,0,0.05)',alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.title}>RATE THIS BOOKING POSTER</Text>
                        <View style={styles.starContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleRating(star)}
                                    style={styles.starButton}
                                >
                                    <Icon
                                        name={rating >= star ? 'star' : 'star-border'}
                                        size={40}
                                        color="#FFD700"
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={styles.ratingText}>Your Rating: {rating}/5</Text>
                    </View>
                    <View style={{ width: '95%', height: 70,justifyContent: 'center',alignItems: 'center',}}>
                            <PressButton name="Close Booking" onPress={handleClose}/>
                    </View>
                </View>
            </View>
        </AuthenticatedLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily : 'cursive'
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    starButton: {
        padding: 10,
    },
    ratingText: {
        fontSize: 16,
        fontFamily : 'serif'
    },
});

export default CloseBooking