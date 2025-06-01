import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { useColorScheme } from "nativewind";
import { router } from "expo-router";

const Notification = () => {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="w-full h-full flex bg-white dark:bg-black-300">
      <View className="flex p-4 items-center gap-2">
        <View className="flex flex-row items-center gap-2 w-full mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.backArrow}
              className="size-8"
              tintColor={colorScheme == "light" ? "#666876" : "#ffffff"}
            />
          </TouchableOpacity>
          <Text className="font-rubik-medium text-left text-2xl text-black-300 dark:text-white">
            Notification
          </Text>
        </View>
        <View>
          <Text className="font-rubik text-lg text-black-100 dark:text-white">
            No Notification
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notification;
