import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { SignedIn, useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import icons from "@/constants/icons";

const Profile = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  const signOutPressed = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handlePress = () => {
    router.push("/signIn");
  };
  if (!isSignedIn) {
    return (
      <SafeAreaView className="w-full h-full px-[3rem] py-[2rem] flex items-center bg-white justify-center gap-2 dark:bg-black-300">
        <Text className="font-rubik-medium text-black-100 text-lg text-center">
          Join us to discover amazing new recipes.
        </Text>
        <TouchableOpacity
          className="flex flex-row justify-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100"
          onPress={handlePress}
        >
          <Text className="font-rubik-medium text-white text-lg">Sign in</Text>
        </TouchableOpacity>
        <Text className="font-rubik text-black-100">Or</Text>
        <Link href="/signUp" className="font-rubik text-black-200 text-lg">
          Create New Account
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="w-full h-full flex flex-row justify-center items-center bg-white dark:bg-black-300 relative">
      <TouchableOpacity
        className="absolute top-3 right-3"
        onPress={() => toggleColorScheme()}
      >
        <Image
          source={icons.darkModeToggle}
          className="size-12"
          tintColor={colorScheme == "light" ? "#666876" : "#ffffff"}
        />
      </TouchableOpacity>
      <View className="flex items-center gap-4">
        <Text className="font-rubik text-2xl text-black-200">
          Signed In as {user?.fullName}{" "}
        </Text>
        <TouchableOpacity
          className="w-full py-2 flex items-center border border-red-500 rounded-[10px]"
          onPress={() => signOut()}
        >
          <Text className="font-rubik text-lg text-red-500">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
