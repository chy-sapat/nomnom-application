import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import icons from "@/constants/icons";

const DarkModeSetting = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const darkModeOptions = ["Light", "Dark"];
  const handleOptionPress = (option: string) => {
    switch (option) {
      case "Light":
        toggleColorScheme();
        break;
      case "Dark":
        toggleColorScheme();
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView className="w-full h-full px-4 py-8 bg-white dark:bg-black-300">
      <View className="flex flex-row items-center gap-8 mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.backArrow}
            tintColor={colorScheme == "light" ? "#666876" : "#ffffff"}
            className="size-10"
          />
        </TouchableOpacity>
        <Text className="font-rubik-medium text-black-300 dark:text-white text-4xl">
          Theme
        </Text>
      </View>
      <View>
        {darkModeOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`flex flex-row items-center gap-4 p-4 ${
              colorScheme === option.toLowerCase() && "bg-black-100"
            } rounded-lg`}
            onPress={() => {
              handleOptionPress(option);
            }}
            disabled={colorScheme === option.toLowerCase()}
          >
            <Text className="font-rubik text-lg text-black-300 dark:text-white">
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default DarkModeSetting;
