import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AuthenticatedLayout from '../../../common/layout/AuthenticatedLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlacesAutoComplete from '../../../map/PlacesAutoComplete';
import { BgColor, ScreenColor, WHITEBG } from '../../../../styles/colors';
import { getResponsiveValue } from '../../../../styles/responsive';
import Buttons from '../../../../adOns/atoms/Buttom';
import TwoWayPushButton from '../../../../adOns/molecules/TwoWayPushButton';
import DatePicker from '../../../../adOns/atoms/DatePicker';
import FlashMessage from 'react-native-flash-message';
import { showNoty } from '../../../../common/flash/flashNotification';
import { booking } from '../../../../services/apiCall';
import { useNavigation } from '@react-navigation/native';
import { GoogleDirections } from 'react-native-google-maps-directions';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';


const Rental = () => {

    const rentalRef = useRef(null)
    const [error, setError] = useState('')
    const navigation = useNavigation()
    const [isPressed, setisPressed] = useState({
        state: false,
        subState: false,
        index: -1,
        subIndex: -1
    })
    const [isdisPressed, setisdisPressed] = useState({
        state: false,
        index: -1
    })
    const [carSpecificArray, setCarSpecificArray] = useState([])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [timeSelected, setTimeSelected] = useState(new Date())
    const [permanentCost, setPermanentCost] = useState('')
    const [extraDis, setExtraDis] = useState('')
    const [extraHr, setExtraHr] = useState('')
    const [budget, setBudget] = useState(null)
    const [tollExtra, setTollExtra] = useState('')
    const [tollExtraAmount, setTollExtraAmount] = useState('')
    const [borderExtra, setBorderExtra] = useState('')
    const [borderExtraAmount, setBorderExtraAmount] = useState('')
    const [parkingExtra, setParkingExtra] = useState('')
    const [parkingExtraAmount, setParkingExtraAmount] = useState('')
    const [distance, setDistance] = useState('')
    const [extraKm, setExtraKm] = useState('')
    const [costPerKm, setCostPerKm] = useState('')
    const [extraHours, setExtraHours] = useState('')
    const [reset, setReset] = useState(false)
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
    const [vehicle, selectVehicle] = useState({
        type: '',
        subType: '',
        capacity: '',
    })
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
            subType: ['Ertiga', 'Innova', 'Innova Crista', 'Any 6+1 Seater'],
            capacity: 6
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
    const DistanceArray = [
        {
            extraDistance: 20,
            extraHour: 2
        },
        {
            extraDistance: 40,
            extraHour: 4
        },
        {
            extraDistance: 60,
            extraHour: 6
        },
        {
            extraDistance: 80,
            extraHour: 8
        },
        {
            extraDistance: 100,
            extraHour: 10
        },
        {
            extraDistance: 120,
            extraHour: 12
        },
    ]
    const handleReset = () => {
        let origin = `${pickUp.latitude},${pickUp.longitude}`
        let destination = `${drop.latitude},${drop.longitude}`
        const apiKey = 'AIzaSyAlEujvNEFTFUBtG9363FjtK-3YOLAUSfM'
        if (!(!pickUp.latitude && !drop.latitude)) {
            axios.get(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`
            ).then(response => {
                const distances = response.data.rows[0].elements[0].distance?.text;
                setDistance(distances)
            })
                .catch(err => {
                    console.log("ERROR GETTING DISTANCE ", err);
                    setDistance('')
                })
        } else {
            setDistance('')
        }
    }
    const handleVehicleType = function (item, index) {
        setisPressed(prev => { return { ...prev, state: true, index: index, subState: false, subIndex: -1 } })
        selectVehicle(prev => { return { subType: '', type: item.type, capacity: item.capacity } })
        setCarSpecificArray(item.subType)
    }
    const handleVehicleSelection = (item, index) => {
        setisPressed(prev => { return { ...prev, subState: true, subIndex: index } })
        selectVehicle(prev => { return { ...prev, subType: item } })
    }
    const [IRPackage, setPackage] = useState({
        extraDistance: null,
        extraTime: null
    })
    const handleDistance = function (item, index) {
        // console.log(item ,index)
        setisdisPressed({ state: true, index: index })
        setPackage({
            extraDistance: item.extraDistance,
            extraTime: item.extraHour
        })
    }
    const handleSubmit = async () => {
        setError('')
        console.log("HANDLING SUBMIT")
        if (!(pickUp.description !== '' && pickUp.latitude !== null && !isNaN(pickUp.date.msec) && pickUp.date.msec !== null && !isNaN(pickUp.date.hour) && pickUp.date.hour !== null)) {
            setError("Pick Up Information Incomplete");
            return
        }
        console.log("PICK UP OK");
        if (!(drop.description !== '' && drop.latitude !== null)) {
            setError("Drop Point Information Incomplete");
            return
        }
        console.log("DROP OK");
        if (!(vehicle.type !== '' && vehicle.subType !== '')) {
            setError("SELECT VEHICLE AND ITS TYPE");
            return
        }
        console.log("VEHICLE OK");
        if (IRPackage.extraDistance === '' || IRPackage.extraDistance === null) {
            setError("ENTER YOUR BUDGET");
            return
        }
        console.log("BUDGET OK");
        if (budget === '' || budget === null) {
            setError("ENTER YOUR BUDGET");
            return
        }
        console.log("BUDGET OK");
        setError('')
        let origin = `${pickUp.latitude},${pickUp.longitude}`
        let destination = `${drop.latitude},${drop.longitude}`
        const apiKey = 'AIzaSyAlEujvNEFTFUBtG9363FjtK-3YOLAUSfM'
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`
        );
        const distances = response.data.rows[0].elements[0].distance?.text;
        if (!tollExtra || (tollExtra==='amount'&&tollExtraAmount==='')) {
            setError("Enter Toll Tax Info Correctly")
            return
        }
        setError('')
        if (!borderExtra || (borderExtra==='amount'&&borderExtraAmount==='')) {
            setError("Enter Border Tax Info Correctly")
            return
        }
        setError('')
        if (!parkingExtra || (parkingExtra==='amount'&&parkingExtraAmount==='')) {
            setError("Enter Parking Tax Info Correctly")
            return
        }
        setError('')
        if (!extraHours || !extraKm) {
            setError("Enter Toll Tax Info")
            return
        }
        setError('')
        let data = {
            initiator: "driver",
            pickUp: pickUp,
            drop: drop,
            budget,
            bookingType: "rental",
            vehicle: vehicle,
            IRPackage: IRPackage,
            distance: distance ? distance.toString() : distances ? distances.toString() : '',
            extrasIncluded: {
                tollExtra,
                tollExtraAmount,
                borderExtra,
                borderExtraAmount,
                parkingExtra,
                parkingExtraAmount,
                extraKm,
                extraHours,
                driverDA : '00'
            },
        }
        try {
            // showNoty("SUCCESSFULL", "success")
            let resObj = await booking(data)
            console.log(resObj)
            if (resObj.status !== 200) {
                showNoty("BOOKING LIMIT HAS BEEN REACHED", "danger")
                setTimeout(() => navigation.navigate("Home"), 2000)

            } else {
                showNoty("BOOKING POSTED SUCCESSFULLY", "success")
                setTimeout(() => navigation.navigate("Home"), 2000)
            }
        } catch (error) {
            console.log('ERROR IN RENTAL BOOKING ', error)
        }
    }
    const handleDateChange = () => {
        date = {
            msec: new Date(dateSelected).getTime(),
            year: new Date(dateSelected).getFullYear(),
            month: new Date(dateSelected).getMonth(),
            day: new Date(dateSelected).getDate(),
        }
        setPickUp(prev => {
            return {
                ...prev,
                date: { ...prev.date, ...date }
            }
        })
    }
    const handleTimeChange = () => {
        setPickUp(prev => {
            return {
                ...prev,
                date: { ...prev.date, hour: new Date(timeSelected).getHours(), min: new Date(timeSelected).getMinutes() }
            }
        })
    }
    useEffect(() => {
        console.log("PICKUP ", pickUp)
    }, [pickUp])
    useEffect(() => {
        let origin = `${pickUp.latitude},${pickUp.longitude}`
        let destination = `${drop.latitude},${drop.longitude}`
        const apiKey = 'AIzaSyAlEujvNEFTFUBtG9363FjtK-3YOLAUSfM'
        if (!(!pickUp.latitude && !drop.latitude)) {
            axios.get(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`
            )
                .then(response => {
                    const distances = response.data.rows[0].elements[0].distance?.text;
                    setDistance(distances)
                })
                .catch(err => {
                    console.log("ERROR GETTING DISTANCE ", err);
                    setDistance('')
                })
        } else {
            setDistance('')
        }
        console.log("DROP ", drop)
    }, [drop])
    useEffect(() => {
        console.log("BUDGET", budget)
    }, [budget])
    useEffect(() => {
        console.log("VEHICLE SELECTION ", vehicle)
    }, [vehicle])
    useEffect(() => {
        console.log("PACKAGE ", IRPackage)
    }, [IRPackage])
    useEffect(() => {
        console.log("ERROR CHANGED")
        if (error !== '') {
            showNoty(error, "danger")
        }
    }, [error])
    useEffect(() => {
        console.log('TIME SELECTED', timeSelected)
        handleTimeChange()
    }, [timeSelected])
    useEffect(() => {
        console.log('DATE SELECTED ', dateSelected)
        handleDateChange()
    }, [dateSelected])

    return (
        <AuthenticatedLayout
            title={'Rental'}
            showFooter={false}
        >
            <ScrollView style={{ flex: 1, backgroundColor: WHITEBG, paddingVertical: 20 }}
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="true"
            >
                <FlashMessage ref={rentalRef} />
                {/*Pick up*/}
                <View style={styles.pickUpContainer}>
                    <View>
                        <Text style={styles.text}>
                            Pickup Location
                        </Text>
                    </View>
                    <View style={{ ...styles.LocationInput, zIndex: 3 }}>
                        <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                        <PlacesAutoComplete placeholder={'Pickup Location'} width={'85%'} update={setPickUp} />
                    </View>
                </View>
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
                <View style={styles.marginContainer}>
                    {/*Time Heading*/}
                    <View>
                        <Text style={styles.text}>Select Time</Text>
                    </View>
                    {/*Timming*/}
                    {showDatePicker && <DatePicker
                        initialDate={dateSelected}
                        show={showDatePicker}
                        setSelectedDate={setDateSelected}
                        setShowDatePicker={setShowDatePicker}
                        mode='date'
                    />}
                    {showTimePicker && <DatePicker
                        initialDate={timeSelected}
                        show={showTimePicker}
                        setSelectedDate={setTimeSelected}
                        setShowDatePicker={setShowTimePicker}
                        mode='time'
                    />}
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
                        {showTimePicker && <DatePicker
                            initialDate={timeSelected}
                            setSelectedDate={setTimeSelected}
                            setShowDatePicker={setShowTimePicker}
                            mode='time'
                        />}
                    </View>
                </View>

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
                    <View style={styles.marginContainer}>
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
                {/* distance array */}
                <View style={styles.marginContainer}>
                    <View>
                        <Text style={styles.text}>Select Package</Text>
                    </View>
                    <FlatList
                        style={{}}
                        keyExtractor={(item, index) => (index)}
                        data={DistanceArray}
                        horizontal
                        renderItem={({ item, index }) => {
                            return <TouchableOpacity onPress={() => handleDistance(item, index)}>
                                <View style={styles.DistanceContainer}>
                                    <View style={[styles.distanceImage, (isdisPressed.state && isdisPressed.index === index) ? styles.bgcolor : '']}>
                                        <Text style={styles.disText}>{item.extraHour} hr</Text>
                                        <Text style={styles.disText}>{item.extraDistance} Km</Text>
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
                            onChangeText={v => setBudget(v)}
                        />
                    </View>
                </View>
                {/**Extra Info */}
                <View style={{ backgroundColor: 'white',marginTop : 20}}>
                    <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'red', marginLeft: 25, marginTop: 10 }}>Extra Charges</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'flex-end', marginRight: 70 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 10, }}>
                            <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Toll Tax <Text style={{ color: 'red', position: 'relative', top: -3 }}>*</Text> : </Text>
                            <Dropdown
                                style={styles.fieldDD}
                                itemTextStyle={{ color: 'black' }}
                                placeholderStyle={{ color: 'black' }}
                                activeColor={BgColor}
                                fontFamily='serif'
                                selectedTextProps={{ style: { color: 'black', fontSize: 16, fontFamily: 'serif' } }}
                                selectedTextStyle={{ color: 'white', fontSize: 16, fontFamily: 'serif' }}
                                data={[{ label: 'Included', value: 'included' }, { label: 'Extra', value: 'extra' }, { label: 'Amount', value: 'amount' }]}
                                placeholder='Select'
                                value={tollExtra}
                                labelField="label"
                                valueField="value"
                                onChange={item => {
                                    setTollExtra(item.value);
                                }}
                            />

                        </View>
                        {tollExtra === 'amount' ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: -50 }}>
                            <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Toll Tax Amount<Text style={{ color: 'red', position: 'relative', top: -3 }}> *</Text> :</Text>

                            <TextInput
                                placeholder='Enter Amount'
                                style={styles.textInputToll}
                                inputMode='numeric'
                                underlineColorAndroid={BgColor}
                                onChangeText={v => { setTollExtraAmount(v) }}
                            />
                        </View> : ''}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 10, }}>
                            <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Border Tax <Text style={{ color: 'red', position: 'relative', top: -3 }}>*</Text> : </Text>
                            <Dropdown
                                style={styles.fieldDD}
                                itemTextStyle={{ color: 'black' }}
                                placeholderStyle={{ color: 'black' }}
                                activeColor={BgColor}
                                fontFamily='serif'
                                selectedTextProps={{ style: { color: 'black', fontSize: 16, fontFamily: 'serif' } }}
                                selectedTextStyle={{ color: 'white', fontSize: 16, fontFamily: 'serif' }}
                                data={[{ label: 'Included', value: 'included' }, { label: 'Extra', value: 'extra' }, { label: 'Amount', value: 'amount' }]}
                                placeholder='Select'
                                value={borderExtra}
                                labelField="label"
                                valueField="value"
                                onChange={item => {
                                    setBorderExtra(item.value);
                                }}
                            />

                        </View>
                        {borderExtra === 'amount' ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: -50 }}>
                            <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Border Tax Amount<Text style={{ color: 'red', position: 'relative', top: -3 }}> *</Text> :</Text>

                            <TextInput
                                placeholder='Enter Amount'
                                style={styles.textInputToll}
                                inputMode='numeric'
                                underlineColorAndroid={BgColor}
                                onChangeText={v => { setBorderExtraAmount(v) }}
                            />
                        </View> : ''}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 10, }}>
                            <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Parking <Text style={{ color: 'red', position: 'relative', top: -3 }}>*</Text> : </Text>
                            <Dropdown
                                style={styles.fieldDD}
                                itemTextStyle={{ color: 'black' }}
                                placeholderStyle={{ color: 'black' }}
                                activeColor={BgColor}
                                fontFamily='serif'
                                selectedTextProps={{ style: { color: 'black', fontSize: 16, fontFamily: 'serif' } }}
                                selectedTextStyle={{ color: 'white', fontSize: 16, fontFamily: 'serif' }}
                                data={[{ label: 'Included', value: 'included' }, { label: 'Extra', value: 'extra' }, { label: 'Amount', value: 'amount' }]}
                                placeholder='Select'
                                value={parkingExtra}
                                labelField="label"
                                valueField="value"
                                onChange={item => {
                                    setParkingExtra(item.value);
                                }}
                            />

                        </View>
                        {parkingExtra === 'amount' ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: -50 }}>
                            <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Parking Amount<Text style={{ color: 'red', position: 'relative', top: -3 }}> *</Text> :</Text>

                            <TextInput
                                placeholder='Enter Amount'
                                style={styles.textInputToll}
                                inputMode='numeric'
                                underlineColorAndroid={BgColor}
                                onChangeText={v => { setParkingExtraAmount(v) }}
                            />
                        </View> : ''}
                    </View>

                    <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'red', marginLeft: 25, marginTop: 10 }}>Extra's Info</Text>
                        <View style={{ alignItems: 'flex-end', display: 'flex', gap: 10, justifyContent: 'center', marginRight: 100 }}>
                            {/*<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25, marginTop: 10 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Total Km :</Text>
                                <TextInput
                                    placeholder='Enter Km'
                                    style={styles.textInputToll}
                                    inputMode='numeric'
                                    value={distance}
                                    onChangeText={v => { setReset(true); v.trim().endsWith('k') ? setDistance(v + 'm') : v.trim().endsWith('km') ? setDistance(v) : setDistance(v + 'km') }}
                                />{reset && <TouchableOpacity style={{ position: 'absolute', right: -30 }} onPress={() => handleReset(false)}><Icon name="reset-tv" size={24} color="#000" /></TouchableOpacity>}
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Extra Km <Text style={{ color: 'red', position: 'relative', top: -3 }}>*</Text> :</Text>
                                <TextInput
                                    placeholder='Enter Km'
                                    style={styles.textInputToll}
                                    inputMode='numeric'
                                    onChangeText={v => { setExtraKm(v) }}
                                />
                            </View>*/}
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Per Extra Km  Cost<Text style={{ color: 'red', position: 'relative', top: -3 }}>*</Text> :</Text>
                                <TextInput
                                    placeholder='Enter Km'
                                    style={styles.textInputToll}
                                    inputMode='numeric'
                                    onChangeText={v => { setExtraKm(v) }}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'serif', color: 'black' }}>Extra Hours<Text style={{ color: 'red', position: 'relative', top: -3 }}>*</Text> :</Text>
                                <TextInput
                                    placeholder='Enter Km'
                                    style={styles.textInputToll}
                                    inputMode='numeric'
                                    onChangeText={v => { setExtraHours(v) }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {/*Submit*/}
                <View style={styles.buttons}>
                    <Buttons name="SUBMIT" style={{ width: '90%' }} onPress={handleSubmit} />
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
    Packagetext: {
        fontSize: 20,
        fontWeight: '800',
        color: 'green',
        paddingLeft: 5,
        margin: 5
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
    fieldDD: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        width: '30%',
        color: 'black',
        borderWidth: 1,
        borderColor: BgColor,
        width: 150
        // backgroundColor : BgColor
    },
    textInputToll: {
        padding: 5,
        marginLeft: 10,
        color: 'black',
        width: '40%',
        color: 'black',
        fontFamily: 'serif',
        // borderBottomWidth: 1,
        // borderColor: 'green',
        backgroundColor: 'white'
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
    DistanceContainer: {
        margin: 5,
        marginHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    distanceImage: {
        borderWidth: 3,
        padding: 10,
        borderRadius: 10,
        borderColor: BgColor

    },
    vehicleName: {

    },
    nameText: {
        fontSize: 12,
        fontWeight: '500',
        color: 'black',
    },
    disText: {
        fontSize: 14,
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
        marginVertical: 10,
        marginBottom: 30
    },
    TimeBottons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 5
    },
    marginContainer: {
        margin: 10
    }
})

export default Rental;
