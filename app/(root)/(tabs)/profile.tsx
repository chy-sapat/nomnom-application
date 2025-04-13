import { View, Text, TouchableOpacity, Image, Switch } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { SignedIn, useClerk } from "@clerk/clerk-expo";

const Profile = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { signOut } = useClerk();

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
  return (
    <SafeAreaView className="w-full h-full px-[3rem] py-[2rem] flex items-center bg-white justify-center gap-2 dark:bg-black-300">
      <View>
        <Text>Dark Mode</Text>
        <Switch
          value={colorScheme == "dark"}
          onChange={() => {
            toggleColorScheme();
          }}
        />
        <SignedIn>
          <TouchableOpacity onPress={signOutPressed}>
            <Text className="font-rubik text-lg text-black-200">Sign Out</Text>
          </TouchableOpacity>
        </SignedIn>
      </View>
      <Image source={images.background1} className="w-full h-[500px]" />
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
      <Link href="/(auth)/signUp" className="font-rubik text-black-200 text-lg">
        Create New Account
      </Link>
    </SafeAreaView>
  );
};

export default Profile;
