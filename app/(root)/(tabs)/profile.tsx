import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";
import { SignedIn, useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import icons from "@/constants/icons";
import axios from "axios";
import { useUserStore } from "@/zustand/store";
import axiosInstance from "@/utils/axios";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";

const Profile = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { isSignedIn, signOut, getToken } = useAuth();
  const { user } = useUser();
  const { userData, setUser, clearUser } = useUserStore();
  const { startSSOFlow } = useSSO();

  const onSignOut = () => {
    console.log("SIGNOUT: " + user?.fullName);
    signOut();
    clearUser();
  };
  const handlePress = () => {
    router.push("/signIn");
  };
  const googleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }, []);

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

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
          <Text className="font-rubik-medium text-white text-lg">
            Sign in with email
          </Text>
        </TouchableOpacity>
        <Text className="font-rubik text-black-100">Or</Text>
        <TouchableOpacity
          className="flex flex-row gap-2 w-full justify-center items-center border border-black-200 py-3 rounded-[12px]"
          onPress={googleSignIn}
        >
          <Image className="size-7" source={icons.googleIcon}></Image>
          <Text className="font-rubik-medium text-black-200 text-xl">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="w-full h-full bg-white dark:bg-black-300 relative">
      <View className="flex p-4 items-center gap-2">
        <View className="flex flex-row-reverse items-center justify-between w-full py-4 mb-4">
          <TouchableOpacity onPress={() => router.push("/settings")}>
            <Image
              source={icons.threeDots}
              className="size-8"
              tintColor={colorScheme == "light" ? "#666876" : "#ffffff"}
            />
          </TouchableOpacity>
          <Text className="font-rubik-medium text-left text-2xl text-black-300 dark:text-white">
            Profile
          </Text>
        </View>
        <Image
          source={{ uri: user?.imageUrl }}
          className="size-24 border border-black-200 dark:border-white rounded-full"
        />
        <Text className="font-rubik-medium text-black-300 dark:text-white text-2xl">
          {user?.fullName}
        </Text>
        <Text className="font-rubik text-black-200 dark:text-white text-lg">
          @{user?.username}
        </Text>
        <View className="w-full flex flex-row justify-evenly">
          <View className="flex-1 flex flex-row justify-center gap-2">
            <Text className="font-rubik text-lg text-black-200">
              {userData?.followers.length}
            </Text>
            <Text className="font-rubik text-lg text-black-200">Followers</Text>
          </View>
          <View className="flex-1 flex flex-row justify-center gap-2">
            <Text className="font-rubik text-lg text-black-200">
              {userData?.following.length}
            </Text>
            <Text className="font-rubik text-lg text-black-200">Following</Text>
          </View>
        </View>
      </View>
      <View className="p-4">
        <Text className="font-rubik-medium text-3xl text-black-200 dark:text-white">
          Recipes
        </Text>
        <Text className="font-rubik text-lg text-black-200 dark:text-white py-8 text-center">
          No Recipe Found
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
