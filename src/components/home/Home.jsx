import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import SearchBox from '../../adOns/atoms/Search'

const HomePage = () => {
    const navigation = useNavigation()
    const profilePage = () => {
        navigation.navigate('ProfileScreen')
    }

    const [searchText, setSearchText] = useState('');

    const handleSearch = (text) => {
        setSearchText(text);
        // Perform your search logic here using the 'text' variable
    };


    return (
        <View>
            <SearchBox onSearch={handleSearch} />
            <Text>
                HomePage
            </Text>
            <Text onPress={profilePage}>
                Profile
            </Text>
        </View>
    )
}

export default HomePage