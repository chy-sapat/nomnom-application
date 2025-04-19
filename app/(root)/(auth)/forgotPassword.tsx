import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const ForgotPassword = () => {
  return (
    <SafeAreaView className="w-full h-full p-12 flex gap-[5rem]">
      {/* Heading */}
      <View className="flex flex-row justify-center w-full">
        <Text className="font-rubik-bold text-[2rem] w-fit">NomNom</Text>
      </View>

      {/* Forgot Password */}
      <View className="flex gap-[2rem]">
        {/* text & Email */}
        <View className="flex gap-[1rem]">
          {/* Text Forgot password */}
          <View>
            <Text className="text-[1.2rem] font-rubik-semibold">
              Forgot Password
            </Text>
          </View>
          {/* Email */}
          <View className="my-[1rem]">
            <Text className="font-rubik">Email</Text>
            <TextInput className="bg-white rounded-[10px]" />
          </View>
        </View>
        {/* Next Button */}
        <View className="flex gap-[0.5rem] items-center">
          <TouchableOpacity className="bg-gray-600 px-[1rem] py-[0.5rem] w-full rounded-[25px] flex items-center">
            <Text className="font-rubik">Next</Text>
          </TouchableOpacity>
          <Link href={"/resetPassword"}>
            <Text>Reset password</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
