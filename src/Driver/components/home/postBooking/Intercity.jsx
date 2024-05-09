import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AuthenticatedLayout from '../../../common/layout/AuthenticatedLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlacesAutoComplete from '../../../map/PlacesAutoComplete';
import { BgColor, WHITE, WHITEBG } from '../../../../styles/colors'
import { getResponsiveValue } from '../../../../styles/responsive';
import Buttons from '../../../../adOns/atoms/Buttom';
import TwoWayPushButton from '../../../../adOns/molecules/TwoWayPushButton';
import DatePicker from '../../../../adOns/atoms/DatePicker';
import FlashMessage from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../../../context/ContextProvider';
import { booking } from '../../../../services/apiCall';
import { showNoty } from '../../../../common/flash/flashNotification';
import { GoogleDirections } from 'react-native-google-maps-directions';
import axios from 'axios';
const Intercity = () => {


    const intercityRef = useRef(null)
    const navigation = useNavigation()
    const { profileState, profileDispatch } = useProfile()

    const zIndex = 9999
    const [selectedOption, setSelectedOption] = useState('')
    const [carSpecificArray, setCarSpecificArray] = useState([])
    const [dtType, setDtType] = useState('pickUp')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [dateSelected, setDateSelected] = useState('')
    const [timeSelected, setTimeSelected] = useState('')
    const [stops, setStops] = useState([])
    const [addIndex, setaddIndex] = useState(0)
    const [isPressed, setisPressed] = useState({
        state: false,
        subState: false,
        index: -1,
        subIndex: -1
    })
    const [pickUp, setPickUp] = useState({
        description: '',
        latitude: null,
        longitude: null,
        date: {
            msec: new Date().getTime(),
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
            hour: new Date().getHours(),
            min: new Date().getMinutes()
        }
    })

    const [drop, setDrop] = useState({
        description: '',
        latitude: null,
        longitude: null,
        date: {
            msec: null,
            year: null,
            month: null,
            day: null,
            hour: null,
            min: null
        }
    })
    const [budget, setBudget] = useState(null)
    const [vehicle, selectVehicle] = useState({
        type: '',
        subType: '',
        capacity: '',
    })

    //functions

    const handleDateChange = () => {
        date = {
            msec: new Date(dateSelected).getTime(),
            year: new Date(dateSelected).getFullYear(),
            month: new Date(dateSelected).getMonth(),
            day: new Date(dateSelected).getDate(),
            hour: null,
            min: null
        }
        if (selectedOption === 'Round Trip') {
            if (dtType === 'pickUp') {
                setPickUp(prev => {
                    return {
                        ...prev,
                        date: date
                    }
                })
            } else {
                setDrop(prev => {
                    return {
                        ...prev,
                        date: date
                    }
                })
            }
        } else {
            setPickUp(prev => {
                return {
                    ...prev,
                    date: date
                }
            })
        }
    }
    const handleTimeChange = () => {
        if (selectedOption === 'Round Trip') {
            if (dtType === 'pickUp') {
                setPickUp(prev => {
                    return {
                        ...prev,
                        date: { ...prev.date, hour: new Date(timeSelected).getHours(), min: new Date(timeSelected).getMinutes() }
                    }
                })
            } else {
                setDrop(prev => {
                    return {
                        ...prev,
                        date: { ...prev.date, hour: new Date(timeSelected).getHours(), min: new Date(timeSelected).getMinutes() }
                    }
                })
            }
        } else {
            setPickUp(prev => {
                return {
                    ...prev,
                    date: { ...prev.date, hour: new Date(timeSelected).getHours(), min: new Date(timeSelected).getMinutes() }
                }
            })
        }
    }
    const VehicleArray = [
        {
            type: 'Mini',
            subType: ['Wagnor', 'Celero', 'Any Mini'],
            capacity: 3
        },
        {
            type: 'Sedan',
            subType: ['Dzire', 'Etios', 'Xcent', 'Aura'],
            capacity: 4
        },
        {
            type: 'SUV',
            subType: ['Ertiga', 'Innova', 'Innova Crista', 'Any 6+1 Seater']
            , capacity: 6
        },
        {
            type: 'SUV 10+1',
            subType: ['Tavera', 'Cruser', 'Scorpio'],
            capacity: 10
        },
        {
            type: 'Bus',
            subType: ['13 Seater', '17 Seater', '20 Seater', '26 Seater', '32 Seater'],
            capacity: undefined
        },
    ]
    const extrasArray = {
        extraDistance: 9.07,
        extraHour: 2.65
    }
    // const { extraDistance, extraHour } = extrasArray;
    const handleVehicleType = function (item, index) {
        setisPressed(prev => { return { ...prev, state: true, index: index, subState: false, subIndex: -1 } })
        selectVehicle(prev => { return { subType: '', type: item.type, capacity: item.capacity } })
        setCarSpecificArray(item.subType)
        // console.log(carSpecificArray, carSpecificArray.length)
    }
    const handleVehicleSelection = (item, index) => {
        setisPressed(prev => { return { ...prev, subState: true, subIndex: index } })
        selectVehicle(prev => { return { ...prev, subType: item } })
    }
    const handlePoints = () => {
        let temp = stops
        let obj = {
            description: '',
            latitude: null,
            longitude: null,
        }
        temp = [...temp, obj]
        // console.log('NEW ARRAY', temp)
        setStops(temp)
    }
    const handleRemoveStop = (index) => {
        console.log('DELETE STOP', index)
        // let indexToRemove = stops.findIndex(item => item.index === index);
        // console.log('Index To Remove', indexToRemove)
        let temp = stops
        temp.splice(index, 1);
        console.log('Temp', temp)
        setStops([...temp])

    }

    const [error, setError] = useState('')

    const handleSubmit = async () => {
        setError('')
        console.log("HANDLING SUBMIT")
        if (!(pickUp.description !== '' && pickUp.latitude !== null && !isNaN(pickUp.date.msec) && pickUp.date.msec !== null && !isNaN(pickUp.date.hour) && pickUp.date.hour !== null)) {
            setError("Pick Up Information Incomplete");
            return
        }
        console.log("PICK UP OK");
        if (selectedOption === ('Round Trip') && !(drop.description !== '' && drop.latitude !== null && !isNaN(drop.date.msec) && drop.date.msec !== null && !isNaN(drop.date.hour) && drop.date.hour !== null)) {
            setError("Drop Point Information Incomplete");
            return
        }
        console.log("DROP OK");
        let origin = `${pickUp.latitude},${pickUp.longitude}`
        let destination = `${drop.latitude},${drop.longitude}`
        const apiKey = 'AIzaSyAlEujvNEFTFUBtG9363FjtK-3YOLAUSfM'

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`
        );

        const distance = response.data.rows[0].elements[0].distance?.text;
        console.log("DISTANCE ", distance ,response.data.rows[0].elements[0])  
        if (!(vehicle.type !== '' && vehicle.subType !== '')) {
            setError("SELECT VEHICLE AND ITS TYPE");
            return
        }
        console.log("VEHICLE OK");
        if (budget === '' || budget === null) {
            setError("ENTER YOUR BUDGET");
            return
        }
        console.log("BUDGET OK");
        setError('')
        let data = {
            initiator: "driver",
            pickUp: pickUp,
            stops: stops,
            drop: drop,
            distance : distance ? distance.toString() : '',
            budget,
            bookingType: "intercity",
            bookingSubType: selectedOption.toLowerCase(),
            vehicle: vehicle,
            extrasIncluded: true
        }
        try {
            // showNoty("SUCCESSFULL", "success")
            let resObj = await booking(data)
            console.log(resObj)
            if (resObj.status !== 200) {
                setTimeout(() => navigation.navigate("Home"), 2000)
                showNoty(resObj.data.message, "danger")
            } else {
                setTimeout(() => navigation.navigate("Home"), 2000)
                showNoty(resObj.data.message, "success")
            }
        } catch (error) {
            console.log('ERROR IN INTERCITY BOOKING ', error)
        }
    }

    //logging
    useEffect(() => {
        console.log("ERROR CHANGED")
        if (error !== '') {
            showNoty(error, "danger")
        }
    }, [error])
    useEffect(() => {
        console.log("VEHICLE SELECTION ", vehicle)
    }, [vehicle])
    useEffect(() => {
        console.log('TIME SELECTED', timeSelected)
        handleTimeChange()
    }, [timeSelected])
    useEffect(() => {
        console.log("PICKUP ", pickUp)
    }, [pickUp])
    useEffect(() => {
        console.log("DROP ", drop)
    }, [drop])
    useEffect(() => {
        console.log('STOPS ARRAY', stops)
    }, [stops])
    useEffect(() => {
        console.log("BUDGET", budget)
    }, [budget])
    useEffect(() => {
        console.log('DATE SELECTED ', dateSelected)
        handleDateChange()
    }, [dtType, dateSelected])

    return (
        <AuthenticatedLayout
            title={'Intercity'}
            showFooter={false}
        >
            <ScrollView style={{ flex: 1, backgroundColor: WHITEBG, paddingVertical: 20 }}
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="true"
            >
                <View>
                    <View style={styles.TwoWay}>
                        <TwoWayPushButton option1="Oneway" option2="Round Trip" setter={setSelectedOption} />
                    </View>
                    {/*Pick up*/}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={styles.text}>
                                Pickup Location
                            </Text>
                        </View>
                        <View style={{ ...styles.LocationInput, zIndex: 10000 }}>
                            <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                            <PlacesAutoComplete placeholder={'Pickup Location'} width={'85%'} update={setPickUp} />
                        </View>
                    </View>
                    {/*Add Points */}
                    {(addIndex > -1 && selectedOption === 'Round Trip')
                        ?
                        <View style={styles.marginContainer}>
                            {stops.length !== 0 && stops.map((item, index) => {
                                return <View style={{ ...styles.LocationInput, zIndex: zIndex - index }} key={index}>
                                    <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                                    <PlacesAutoComplete placeholder={`Stop ${index + 1}`} width={'75%'} setStops={setStops} stops={stops} index={index} item={item} />
                                    <TouchableOpacity onPress={() => handleRemoveStop(index)} ><Icon name="close" size={30} color="black" /></TouchableOpacity>
                                </View>
                            })}
                        </View>
                        : ''}
                    {/**Add Points if Round Trip */}
                    {(selectedOption === 'Round Trip')
                        ? <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 10, marginTop: 0, zIndex: 50, gap: 5 }} onPress={handlePoints}>
                            <Text style={{ color: 'green', fontSize: 16, fontWeight: '500', letterSpacing: -0.5, textDecorationStyle: 'dashed', textDecorationLine: 'underline' }}>Add Stop</Text>
                            <View style={{ borderWidth: 1, padding: 0, borderRadius: 50, borderColor: 'green' }}><Icon name="add" size={28} color="green" style={{ ...styles.Timeicon }} /></View>
                        </TouchableOpacity>
                        : ''}
                    {/*Drop*/}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={styles.text}>
                                Drop Location
                            </Text>
                        </View>
                        <View style={{ ...styles.LocationInput, zIndex: 2 }}>
                            <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                            <PlacesAutoComplete placeholder={'Drop Location'} width={'85%'} update={setDrop} />
                        </View>
                    </View>

                    {/*Select Time*/}
                    {showDatePicker ? <DatePicker
                        initialDate={dateSelected}
                        show={showDatePicker}
                        setSelectedDate={setDateSelected}
                        setShowDatePicker={setShowDatePicker}
                        mode='date'
                    /> : ''}
                    {showTimePicker ? <DatePicker
                        initialDate={timeSelected}
                        show={showTimePicker}
                        setSelectedDate={setTimeSelected}
                        setShowDatePicker={setShowTimePicker}
                        mode='time'
                    /> : ''}
                    {(selectedOption === 'Round Trip')
                        ? <View style={styles.marginContainer}>
                            <View>
                                <Text style={styles.text}>PickUp Date</Text>
                            </View>
                            <View style={styles.TimeBottons}>
                                <TouchableOpacity style={[styles.textInput, { marginRight: 5 }]} onPress={() => { setDtType('pickUp'); setShowDatePicker(true) }}>
                                    <Icon name="date-range" size={24} color="black" style={styles.Timeicon} />
                                    <Text
                                        style={styles.Timeinput}
                                    >{pickUp.date.msec !== null && !isNaN(pickUp.date.msec) ? new Date(pickUp.date.msec).toDateString() : 'SELECT DATE'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.textInput} onPress={() => { setDtType('pickUp'); setShowTimePicker(true) }}>
                                    <Icon name="alarm" size={24} color="black" style={styles.Timeicon} />
                                    <Text
                                        style={styles.Timeinput}
                                    >{pickUp.date.hour !== null && !isNaN(pickUp.date.hour) ? `${pickUp.date.hour} : ${pickUp.date.min}` : 'SELECT TIME'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.text}>Drop Date</Text>
                                </View>
                                <View style={styles.TimeBottons}>
                                    <TouchableOpacity style={[styles.textInput, { marginRight: 5 }]} onPress={() => { setDtType('drop'); setShowDatePicker(true) }}>
                                        <Icon name="date-range" size={24} color="black" style={styles.Timeicon} />
                                        <Text
                                            style={styles.Timeinput}
                                        >{drop.date.msec !== null && !isNaN(drop.date.msec) ? new Date(drop.date.msec).toDateString() : 'SELECT DATE'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.textInput} onPress={() => { setDtType('drop'); setShowTimePicker(true) }}>
                                        <Icon name="alarm" size={24} color="black" style={styles.Timeicon} />
                                        <Text
                                            style={styles.Timeinput}
                                        >{drop.date.hour !== null && !isNaN(drop.date.hour) ? `${drop.date.hour} : ${drop.date.min}` : 'SELECT TIME'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        : <View style={styles.marginContainer}>
                            {/*Time Heading*/}
                            <View>
                                <Text style={styles.text}>Select Date</Text>
                            </View>
                            {/*Timming*/}
                            <View style={styles.TimeBottons}>
                                <TouchableOpacity style={[styles.textInput, { marginRight: 5 }]} onPress={() => setShowDatePicker(true)}>
                                    <Icon name="date-range" size={24} color="black" style={styles.Timeicon} />
                                    <Text
                                        style={styles.Timeinput}
                                    >{pickUp.date.msec !== null && !isNaN(pickUp.date.msec) ? new Date(pickUp.date.msec).toDateString() : 'SELECT DATE'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.textInput} onPress={() => setShowTimePicker(true)}>
                                    <Icon name="alarm" size={24} color="black" style={styles.Timeicon} />
                                    <Text
                                        style={styles.Timeinput}
                                    >{pickUp.date.hour !== null && !isNaN(pickUp.date.hour) ? `${pickUp.date.hour} : ${pickUp.date.min}` : 'SELECT TIME'}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>}

                    {/*Choose Vehical*/}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={styles.text}>Choose Vehicle Type</Text>
                        </View>
                        {/*Vehical*/}
                        <View>
                            <FlatList
                                style={{}}
                                keyExtractor={(item, index) => (index)}
                                data={VehicleArray}
                                horizontal
                                renderItem={({ item, index }) => {
                                    return <TouchableOpacity onPress={() => handleVehicleType(item, index)}>
                                        <View style={styles.vehicleImageContainer}>
                                            <View style={[styles.vehicleImage, (isPressed.state && isPressed.index === index) ? styles.bgcolor : '']}>
                                                <Icon name="directions-car" size={30} color="#000" />
                                            </View>
                                            <View style={styles.vehicleName}>
                                                <Text style={styles.nameText}>
                                                    {item.type}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }}
                            />
                        </View>
                        {/*Vehical Type*/}
                        <View>
                            {carSpecificArray.length != 0 ? <FlatList
                                style={{}}
                                keyExtractor={(item, index) => (index)}
                                data={carSpecificArray}
                                horizontal
                                renderItem={({ item, index }) => {
                                    return <TouchableOpacity onPress={() => { handleVehicleSelection(item, index) }}>
                                        <View style={styles.vehicleImageContainer}>
                                            <View style={[styles.vehicleImage, (isPressed.subState && isPressed.subIndex === index) ? styles.bgcolor : '']}>
                                                <Icon name="directions-car" size={30} color="#000" />
                                            </View>
                                            <View style={styles.vehicleName}>
                                                <Text style={styles.nameText}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                }}
                            /> : ''}
                        </View>
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
                                onChangeText={v => { setBudget(v) }}
                            />
                        </View>
                    </View>
                    {/**Note */}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={[styles.text, { color: 'red' }]}>
                                Note:
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.text, { fontSize: 22 }]}>Extras to be paid by you to driver</Text>
                        </View>
                        <View>
                            <Text style={[styles.text, { fontSize: 20, fontWeight: '500' }]}>Your fare does not include</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>- Parking</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>- Tolls</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>- State entry taxes</Text>
                        </View>
                    </View>
                    {/*Submit*/}
                    <View style={styles.buttons}>
                        <Buttons name="SUBMIT" style={{ width: '90%' }} onPress={() => { handleSubmit().then().catch(error => console.log("ERROR IN HANDLE SUBMIT ", error)) }} />
                    </View>
                </View>
            </ScrollView>
        </AuthenticatedLayout>
    );
}

const styles = StyleSheet.create({
    TwoWay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TimeInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
    Timeicon: {
        // marginRight: 8,
    },
    Timeinput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
        color: 'black'
    },
    text: {
        fontSize: 18,
        fontWeight: '800',
        color: 'black',
        margin: 10,
        paddingLeft: 5
    },
    sitaLocationInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 58,

    },
    LocationInput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // height: 58,

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
    vehicleName: {

    },
    nameText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black',
    },
    bgcolor: {
        backgroundColor: BgColor,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginBottom: 30
    },
    TimeBottons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 10
    },
    marginContainer: {
        margin: 10
    }
})

export default Intercity;
