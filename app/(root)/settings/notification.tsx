import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import icons from "@/constants/icons";
import Checkbox from "expo-checkbox";

const notification = () => {
  const [isChecked, setChecked] = useState(false);
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
          Notification
        </Text>
      </View>
      <View className="pt-2">
        <View className="flex flex-row justify-between items-center py-3">
          <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
            Allow Notification
          </Text>
          <Checkbox
            className="m-2"
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#e55934" : undefined}
          />
        </View>
        <View className="py-3">
          <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
            Push Notification
          </Text>
          <View className="p-2">
            <View className="flex flex-row justify-between">
              <Text className="font-rubik text-lg text-black-300 dark:text-white pb-2">
                New Follower
              </Text>
              <Checkbox
                className="m-2"
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#e55934" : undefined}
              />
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-rubik text-lg text-black-300 dark:text-white pb-2">
                Like and Comments
              </Text>
              <Checkbox
                className="m-2"
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#e55934" : undefined}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default notification;
