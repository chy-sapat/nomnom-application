import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";
import icons from "@/constants/icons";
import React, { useState } from "react";
import { router } from "expo-router";

interface props {
  showFilterIcon?: boolean;
  placeHolderText?: string;
  onClick?: () => void;
}

const SearchBar = ({
  showFilterIcon = false,
  placeHolderText = "What do you want to cook today?",
  onClick,
}: props) => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <View className="flex gap-4">
      <View className="h-fit flex flex-row gap-2 items-center border border-black-200 bg-white rounded-xl px-2">
        <Image source={icons.search} className="size-6" tintColor={"#666876"} />
        <TextInput placeholder={placeHolderText} className="flex-1 text-xl" />
        {showFilterIcon && (
          <TouchableOpacity className="p-2">
            <Image
              source={icons.filter}
              className="size-6"
              tintColor="#666876"
            />
          </TouchableOpacity>
        )}
      </View>
      {/* Filter List */}
      {showFilters && (
        <View className="pd-2 bg-white">
          <Text>This is a filters</Text>
        </View>
      )}
    </View>
  );
};

export default SearchBar;
