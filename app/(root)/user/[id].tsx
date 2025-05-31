import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { useColorScheme } from "nativewind";
import { useUser } from "@clerk/clerk-expo";
import { useRecipeStore, useUserStore } from "@/zustand/store";
import Card from "@/components/Card";

const UserProfile = () => {
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userData } = useUserStore();
  const { userRecipes } = useRecipeStore();
  return (
    <SafeAreaView className="w-full h-full flex bg-white dark:bg-black-300 relative">
      <ScrollView>
        <View className="flex p-4 items-center gap-2">
          <View className="flex flex-row-reverse items-center justify-between w-full mb-4">
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
              <Text className="font-rubik text-lg text-black-200">
                Followers
              </Text>
            </View>
            <View className="flex-1 flex flex-row justify-center gap-2">
              <Text className="font-rubik text-lg text-black-200">
                {userData?.following.length}
              </Text>
              <Text className="font-rubik text-lg text-black-200">
                Following
              </Text>
            </View>
          </View>
          <TouchableOpacity className="w-full border border-black-200 dark:border-white rounded-full py-2 px-4 flex flex-row items-center justify-center my-2">
            <Text className="font-rubik-medium text-black-200 dark:text-white text-lg">
              Follow
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full flex-1 px-4">
          <Text className="font-rubik-medium text-3xl text-black-200 dark:text-white mb-4">
            Recipes
          </Text>
          {loading ? (
            <View className="flex gap-4 items-center">
              <ActivityIndicator
                size="large"
                color="#e55934"
                className="mt-8"
              />
              <Text className="font-rubik text-lg text-black-200 dark:text-white">
                Loading Recipes
              </Text>
            </View>
          ) : userRecipes?.length > 0 ? (
            <View className="flex flex-row flex-wrap justify-between">
              {userRecipes.map((recipe) => (
                <Card key={recipe._id} recipe={recipe} />
              ))}
              {userRecipes.length !== 0 && userRecipes.length % 2 !== 0 && (
                <View className="size-[180px]"></View>
              )}
            </View>
          ) : (
            <Text className="font-rubik text-lg text-black-200 dark:text-white py-8 text-center">
              No Recipes Found
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
