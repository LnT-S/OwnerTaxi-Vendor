import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = (props) => {

    const { initialDate, setSelectedDate, setShowDatePicker,mode } = props
    const [date, setDate] = useState((initialDate !== '') ? initialDate : new Date());

    const onChange = (event, selectedDate) => {
        setSelectedDate(new Date(selectedDate))
        console.log('selected date',selectedDate)
        setShowDatePicker(false)
    };

    return (
        <DateTimePicker
            value={new Date(date)}
            mode={mode}
            display="default"
            onChange={onChange}
        />
    );
};

export default DatePicker;