import React from "react";
import { View, TextInput, Platform } from "react-native";

const SearchBar = () => {
  return (
    <View className="flex-row items-center">
      <TextInput
        placeholder= "Search..."
        placeholderTextColor="#D2D2D2"
      />
    </View>
  );
};

export default SearchBar;
