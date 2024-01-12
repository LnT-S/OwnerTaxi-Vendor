import React from 'react';
import { View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { BgColor } from '../../styles/colors';

const SearchBox = ({ onSearch }) => {
  return (
    <View>
      <Input
        placeholder="Search..."
        leftIcon={<Icon name="search" size={24} color="black" />}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default SearchBox;
