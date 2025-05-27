import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import icons from "@/constants/icons";

const account = () => {
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
          Account Setting
        </Text>
      </View>
      <View className="py-3">
        <View>
          <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
            Account Information
          </Text>
        </View>
        <View className="flex flex-row gap-5 items-center">
          <View className="p-2">
            <Text className="font-rubik text-lg text-black-300 dark:text-white ">
              First Name
            </Text>
            <TextInput className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300" />
          </View>
          <View className="p-2">
            <Text className="font-rubik text-lg text-black-300 dark:text-white">
              Last Name
            </Text>
            <TextInput className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300" />
          </View>
        </View>
        <View className="p-2">
          <Text className="font-rubik text-lg  text-black-300 dark:text-white ">
            UserName
          </Text>
          <TextInput className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300" />
        </View>
        <View className="p-2">
          <Text className="font-rubik text-lg  text-black-300 dark:text-white ">
            Email
          </Text>
          <TextInput className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300" />
        </View>
        <TouchableOpacity className="flex items-center m-3 w-fit border border-primary-100 px-3 py-3 rounded-[10px] bg-primary-100 ">
          <Text className="font-rubik-medium text-white">Update</Text>
        </TouchableOpacity>
      </View>
      <View className="py-3">
        <TouchableOpacity
          onPress={() => router.push("/settings/changePassword")}
        >
          <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
      <View className="py-4">
        <TouchableOpacity>
          <Text className="font-rubik-medium text-2xl text-black-300 dark:text-white">
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default account;
