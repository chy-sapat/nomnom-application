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
import { useUserStore } from "@/zustand/store";
import { useUser } from "@clerk/clerk-expo";

const account = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { userData } = useUserStore();
  const { user } = useUser();
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
          <Text className="font-rubik-medium text-lg text-black-300 dark:text-white">
            Account Information
          </Text>
        </View>
        <View className="w-full flex flex-row gap-2 items-center">
          <View className="flex-1 p-2">
            <Text className="font-rubik text-lg text-black-300 dark:text-white ">
              First Name
            </Text>
            <TextInput
              defaultValue={userData?.fullname.split(" ")[0]}
              className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300"
            />
          </View>
          <View className="flex-1 p-2">
            <Text className="font-rubik text-lg text-black-300 dark:text-white">
              Last Name
            </Text>
            <TextInput
              defaultValue={userData?.fullname.split(" ")[1]}
              className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300"
            />
          </View>
        </View>
        <View className="p-2">
          <Text className="font-rubik text-lg  text-black-300 dark:text-white ">
            UserName
          </Text>
          <TextInput
            defaultValue={userData?.username}
            className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300"
          />
        </View>
        <View className="p-2">
          <Text className="font-rubik text-lg  text-black-300 dark:text-white ">
            Email
          </Text>
          <TextInput
            defaultValue={user?.emailAddresses[0]?.emailAddress}
            className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300"
          />
        </View>
        <TouchableOpacity className="flex items-center m-3 w-fit border border-primary-100 px-3 py-3 rounded-[10px] bg-primary-100 ">
          <Text className="font-rubik-medium text-white">Update</Text>
        </TouchableOpacity>
      </View>
      <View className="py-3">
        <TouchableOpacity
          onPress={() => router.push("/settings/changePassword")}
        >
          <Text className="font-rubik-medium text-lg text-black-300 dark:text-white">
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
      <View className="py-4">
        <TouchableOpacity>
          <Text className="font-rubik-medium text-lg text-red-500 dark:text-red-400">
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default account;
