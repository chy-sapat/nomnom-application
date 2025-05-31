import {
  View,
  Text,
  Image,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRecipeStore, useUserStore } from "@/zustand/store";
import icons from "@/constants/icons";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";

const Settings = () => {
  const { colorScheme } = useColorScheme();
  const { isSignedIn, signOut, getToken } = useAuth();
  const { user } = useUser();
  const { userData, setUser, clearUserAll } = useUserStore();
  const { userRecipes, setUserRecipes } = useRecipeStore();
  const settingsOptions = [
    "Account",
    "Notifications",
    "Theme",
    "About",
    "Logout",
  ];

  const handleOptionPress = (optionIndex: number) => {
    switch (optionIndex) {
      case 0:
        router.push("/settings/account");
        break;
      case 1:
        router.push("/settings/notification");
        break;
      case 2:
        router.push("/settings/darkModeSetting");
        break;
      case 3:
        router.push("/settings/about");
        break;
      case 4:
        Alert.alert("Logout", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: () => {
              console.log("SIGNOUT: " + user?.fullName);
              signOut();
              clearUserAll();
              setUserRecipes([]);
              router.replace("/signIn");
            },
          },
        ]);
        break;
      default:
        alert(`You pressed ${settingsOptions[optionIndex]}`);
        break;
    }
  };
  return (
    <SafeAreaView className="w-full h-full px-4 py-8 bg-white dark:bg-black-300">
      <View className="flex flex-row items-center gap-4 mb-4">
        <TouchableOpacity onPress={() => router.replace("/profile")}>
          <Image
            source={icons.backArrow}
            tintColor={colorScheme === "light" ? "#666876" : "#ffffff"}
            className="size-10"
          />
        </TouchableOpacity>
        <Text className="font-rubik-medium text-black-200 text-4xl dark:text-white">
          Settings
        </Text>
      </View>
      <View className="flex flex-col gap-4 mt-4">
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={option}
            className="flex flex-row items-center justify-between p-4 rounded-lg"
            onPress={() => handleOptionPress(index)}
          >
            <Text className="font-rubik text-xl text-black-300 dark:text-white">
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Settings;
