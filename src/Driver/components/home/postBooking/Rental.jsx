import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import AuthenticatedLayout from '../../../common/layout/AuthenticatedLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlacesAutoComplete from '../../../map/PlacesAutoComplete';
import { BgColor , ScreenColor ,WHITEBG } from '../../../../styles/colors';
import { getResponsiveValue } from '../../../../styles/responsive';
import Buttons from '../../../../adOns/atoms/Buttom';
import TwoWayPushButton from '../../../../adOns/molecules/TwoWayPushButton';
import DatePicker from '../../../../adOns/atoms/DatePicker';


const Rental = () => {

    const [isPressed, setisPressed] = useState({
        state: false,
        index: -1
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

    const DistanceArray = [
        {
            time: 14,
            timeFormat: 'hr',
            distance: 140,
            permanentCost: 1500,
            extraDistance: 12,
            extraHour: 4
        },
        {
            time: 16,
            timeFormat: 'hr',
            distance: 160,
            permanentCost: 2500,
            extraDistance: 16,
            extraHour: 6
        },
    ]
    const handleVehicleType = function (item, index) {
        setisPressed({ state: true, index: index })
        setCarSpecificArray(item.specific)
        console.log("lovehical choosen", item.name)
    }
    const handleDistance = function (item, index) {
        setisdisPressed({ state: true, index: index })
        setPermanentCost(item.permanentCost)
        setExtraDis(item.extraDistance)
        setExtraHr(item.extraHour)
    }

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

                {/*Pick up*/}
                <View style={styles.pickUpContainer}>
                    <View>
                        <Text style={styles.text}>
                            Pickup Location
                        </Text>
                    </View>
                    <View style={{ ...styles.LocationInput, zIndex: 3 }}>
                        <Icon name="location-on" size={24} color="black" style={styles.Timeicon} />
                        <PlacesAutoComplete placeholder={'Pickup Location'} width={'85%'} />
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
                        <PlacesAutoComplete placeholder={'Drop Location'} width={'85%'} />
                    </View>
                </View>
                {/*Select Time*/}
                <View style={styles.marginContainer}>
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
                                        <Text style={styles.disText}>{item.time} {item.timeFormat}</Text>
                                        <Text style={styles.disText}>{item.distance} Km</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }}
                    />
                    {(permanentCost !== '') ?
                        <View>
                            <View>
                                <Text style={styles.Packagetext}>Permanent Cost: {permanentCost}</Text>
                            </View>
                            <View>
                                <Text style={styles.Packagetext}>Extra Distance: {extraDis}</Text>
                            </View>
                            <View>
                                <Text style={styles.Packagetext}>Extra Hour: {extraHr}</Text>
                            </View>
                        </View> : ''
                    }

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
        margin:5
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
