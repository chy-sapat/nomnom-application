import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { SignedIn, useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import icons from "@/constants/icons";
import axios from "axios";
import { useUserStore } from "@/zustand/store";
import axiosInstance from "@/utils/axios";

const Profile = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { isSignedIn, signOut, getToken } = useAuth();
  const { user } = useUser();
  const { userData, setUser, clearUser } = useUserStore();

  const onSignOut = () => {
    console.log("SIGNOUT: " + user?.fullName);
    signOut();
    clearUser();
  };
  const handlePress = () => {
    router.push("/signIn");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const response = await axiosInstance.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        isSignedIn && setUser(response.data.user);
      } catch (error: any) {
        Alert.alert("Error", "An error occured while fetching user data");
        signOut();
      }
    };
    isSignedIn && userData == null && fetchUserData();
  }, []);

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
          onPress={onSignOut}
        >
          <Text className="font-rubik text-lg text-red-500">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
