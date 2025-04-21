import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import icons from "@/constants/icons";
import React, { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

interface props {
  value: string;
  autoFocus?: boolean;
  showFilterIcon?: boolean;
  placeHolderText?: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({
  value,
  onChangeText,
  showFilterIcon = false,
  placeHolderText = "What do you want to cook today?",
}: props) => {
  const searchBarRef = useRef<TextInput | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View className="flex gap-4">
      <View className="h-fit flex flex-row gap-2 items-center bg-white rounded-xl px-2">
        <Image source={icons.search} className="size-6" tintColor={"#666876"} />
        <TextInput
          ref={searchBarRef}
          placeholder={placeHolderText}
          className="flex-1 py-3 text-xl"
          value={value}
          onChangeText={(text) => onChangeText(text)}
        />
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
