import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import icons from "@/constants/icons";

const about = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
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
          About
        </Text>
      </View>
      <View className="py-3">
        <View className="py-3">
          <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
            About App
          </Text>
          <Text className="p-2 font-rubik text-lg text-black-300 dark:text-white">
            A community-driven platform for sharing and discovering delicious
            recipes from around the world.
          </Text>
        </View>
        <View className="py-3">
          <TouchableOpacity>
            <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        <View className="py-3">
          <TouchableOpacity>
            <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
              Send feedback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default about;
