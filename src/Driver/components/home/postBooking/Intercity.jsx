import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AuthenticatedLayout from '../../../common/layout/AuthenticatedLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlacesAutoComplete from '../../../map/PlacesAutoComplete';
import { BgColor, WHITE , WHITEBG } from '../../../../styles/colors'
import { getResponsiveValue } from '../../../../styles/responsive';
import Buttons from '../../../../adOns/atoms/Buttom';
import TwoWayPushButton from '../../../../adOns/molecules/TwoWayPushButton';
import DatePicker from '../../../../adOns/atoms/DatePicker';


const Intercity = () => {

    const [selectedOption, setSelectedOption] = useState('')
    const [isPressed, setisPressed] = useState({
        state: false,
        index: -1
    })
    const [addIndex, setaddIndex] = useState(0)
    const [carSpecificArray, setCarSpecificArray] = useState([])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [timeSelected, setTimeSelected] = useState(new Date())
    const [stops, setStops] = useState([])
    const [stopInfo, setStopInfo] = useState({})
    const zIndex = 9999
    const VehicleArray = [
        {
            type: 'sedan',
            specific: ['city', 'verna', 'swift', 'mercedes']
        },
        {
            type: 'xuv',
            specific: ['wagonr', 'xuv500', 'defender', 'thar']
        },
        {
            type: 'abc',
            specific: ['ab', 'bc', 'cd', 'ef']
        }
    ]

    const handleVehicleType = function (item, index) {
        setisPressed({ state: true, index: index })
        setCarSpecificArray(item.specific)
        console.log(carSpecificArray, carSpecificArray.length)
    }

    const handlePoints = () => {
        let temp = stops
        let obj = {
            to: '',
            from: ''
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

    useEffect(() => {
        console.log('Array', stops)
    }, [stops, stopInfo])
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
                        <View style={{ ...styles.LocationInput, zIndex: 10000  }}>
                            <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                            <PlacesAutoComplete placeholder={'Pickup Location'} width={'85%'} />
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
                        ? <TouchableOpacity style={{display : 'flex', flexDirection : 'row', justifyContent: 'flex-end', alignItems: 'center', margin: 10, marginTop : 0 , zIndex : 50 , gap : 5}} onPress={handlePoints}>
                            <Text style={{ color: 'green', fontSize: 16, fontWeight: '500',letterSpacing : -0.5 , textDecorationStyle : 'dashed' , textDecorationLine : 'underline' }}>Add Stop</Text>
                            <View style={{ borderWidth : 1 , padding : 0 , borderRadius :50 , borderColor : 'green'}}><Icon name="add" size={28} color="green" style={{...styles.Timeicon}} /></View>
                        </TouchableOpacity>
                        : ''}
                    {/*Drop*/}
                    <View style={{...styles.marginContainer ,marginTop : (selectedOption === 'Round Trip')?-45:0}}>
                        <View>
                            <Text style={styles.text}>
                                Drop Location
                            </Text>
                        </View>
                        <View style={{ ...styles.LocationInput, zIndex: 2 }}>
                            <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                            <PlacesAutoComplete placeholder={'Drop Location'} width={'85%'} />
                        </View>
                    </View>

                    {/*Select Time*/}
                    {(selectedOption === 'Round Trip')
                        ? <View style={styles.marginContainer}>
                            <View>
                                <Text style={styles.text}>PickUp Date</Text>
                            </View>
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
                            <View>
                                <View>
                                    <Text style={styles.text}>Drop Date</Text>
                                </View>
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
                                renderItem={({ item }) => {
                                    return <TouchableOpacity>
                                        <View style={styles.vehicleImageContainer}>
                                            <View style={[styles.vehicleImage]}>
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
                            />
                        </View>
                    </View>
                    {/**Note */}
                    <View style={styles.marginContainer}>
                        <View>
                            <Text style={[styles.text,{color:'red'}]}>
                                Note:
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.text,{fontSize: 22}]}>Extras to be paid by you to driver</Text>
                        </View>
                        <View>
                            <Text style={[styles.text,{fontSize: 20,fontWeight:'500'}]}>Your fare does not include</Text>
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
                        <Buttons name="SUBMIT" style={{ width: '90%' }} />
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
    LocationInput : {
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
