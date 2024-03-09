import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AuthenticatedLayout from '../../../common/layout/AuthenticatedLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlacesAutoComplete from '../../../map/PlacesAutoComplete';
import { BgColor , ScreenColor , WHITEBG } from '../../../../styles/colors';
import { getResponsiveValue  } from '../../../../styles/responsive';
import Buttons from '../../../../adOns/atoms/Buttom';
import DatePicker from '../../../../adOns/atoms/DatePicker';


const Sharing = () => {

    const [isPressed, setisPressed] = useState({
        state: false,
        index: -1
    })
    const [carSpecificArray, setCarSpecificArray] = useState([])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [timeSelected, setTimeSelected] = useState(new Date())

    const SelectPackage = [1,2,3,4,5]

    const handleVehicleType = function (item, index) {
        setisPressed({ state: true, index: index })
        setCarSpecificArray(item.specific)
        console.log("vehical choosen", item.name)
    }


    return (
        <AuthenticatedLayout
            title={'Sharing'}
            showFooter={false}
        >
            <ScrollView style={{ flex: 1, backgroundColor: WHITEBG , paddingVertical: 40}}
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="true"
            >
                <View>
                    
                    {/*Pick up*/}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={styles.text}>
                                Pickup Location
                            </Text>
                        </View>
                        <View style={{...styles.LocationInput , zIndex : 3 }}>
                            <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                            <PlacesAutoComplete placeholder={'Pickup Location'} width={'85%'}/>
                        </View>
                    </View>
                    {/*Drop*/}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={styles.text}>
                                Drop Location
                            </Text>
                        </View>
                        <View style={{...styles.LocationInput , zIndex : 2 }}>
                            <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                            <PlacesAutoComplete placeholder={'Drop Location'} width={'85%'} />
                        </View>
                    </View>
                    {/*Select Time*/}
                    <View  style={styles.marginContainer}>
                        {/*Time Heading*/}
                        <View>
                            <Text style={styles.text}>Select Time</Text>
                        </View>
                        {/*Timming*/}
                        <View style={styles.TimeBottons}>
                            <TouchableOpacity style={[styles.textInput, { marginRight: 5 }]} onPress={() => setShowDatePicker(true)}>
                                <Icon name="date-range" size={24} color="black" style={styles.Timeicon} />
                                <Text
                                    style={styles.Timeinput}       
                                >{dateSelected.toDateString()}</Text>
                            </TouchableOpacity>
                            {showDatePicker && <DatePicker
                                initialDate={dateSelected}
                                setSelectedDate={setDateSelected}
                                setShowDatePicker={setShowDatePicker}
                                mode='date'
                            />}
                            <TouchableOpacity style={styles.textInput} onPress={() => setShowTimePicker(true)}>
                                <Icon name="alarm" size={24} color="black" style={styles.Timeicon} />
                                <Text
                                    style={styles.Timeinput}       
                                >{timeSelected.toLocaleTimeString()}</Text>
                            </TouchableOpacity>
                            {showTimePicker && <DatePicker
                                initialDate={timeSelected}
                                setSelectedDate={setTimeSelected}
                                setShowDatePicker={setShowTimePicker}
                                mode='time'
                            />}
                        </View>
                    </View>
                  
                    {/*Select Persons*/}
                    <View  style={styles.marginContainer}>
                        <View>
                            <Text style={styles.text}>Choose Number of Persons</Text>
                        </View>
                        <FlatList
                            style={{}}
                            keyExtractor={(item, index) => (index)}
                            data={SelectPackage}
                            horizontal
                            renderItem={({ item, index }) => {
                                return <TouchableOpacity>
                                    <View style={styles.DistanceContainer}>
                                        <View style={[styles.distanceImage, (isPressed.state && isPressed.index === index) ? styles.bgcolor : '']}>
                                            <Text style={styles.disText}>Person</Text>
                                            <Text style={styles.disText}>{item}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }}
                        />
                    </View>
                    {/*Budget*/}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={styles.text}>Budget</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Amount"
                            keyboardType="numeric"
                            placeholderTextColor={'gray'}
                        />
                    </View>
                    </View>
                    {/*Submit*/}
                    <View style={styles.buttons}>
                        <Buttons name="SUBMIT" style={{ width: '90%' }} />
                    </View>
                </View>
            </ScrollView>
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
   
    TimeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
    Timeicon: {
        marginRight: 8,
    },
    Timeinput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
        color: 'black'
    },
    text: {
        fontSize: 16,
        fontWeight: '800',
        color: 'black',
        margin: 5,
        paddingLeft: 5
    },
    LocationInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 58,
        
    },
    textInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        height: getResponsiveValue(70, 50),
        paddingHorizontal: 10,
        position: 'relative',
        flex: 1,
        fontSize: 16,
        color: 'black',
        backgroundColor: `white`,
    },
    DescriptionInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        position: 'relative',
        flex: 1,
        fontSize: 16,
        color: 'black',
        backgroundColor: `white`,
    },
    vehicleImageContainer: {
        margin: 5,
        marginHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vehicleImage: {
        borderWidth: 3,
        padding: 10,
        borderRadius: 50,
        borderColor: BgColor

    },
    disText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'black',
    },
    nameText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black',
    },
    bgcolor: {
        backgroundColor: BgColor
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    TimeBottons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 5
    },
    DistanceContainer: {
        margin: 5,
        marginHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    distanceImage: {
        borderWidth: 3,
        padding: 5,
        borderRadius: 10,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    marginContainer: {
        margin: 10
    }
})

export default Sharing;
