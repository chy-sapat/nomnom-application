import { Link, router } from "expo-router";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import icons from "@/constants/icons";
import { recipes } from "@/constants/data";
import CardGroup from "@/components/CardGroup";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useRecipeStore, useUserStore } from "@/zustand/store";
import axios from "axios";
import axiosInstance from "@/utils/axios";
import Card from "@/components/Card";

export default function Index() {
  const { colorScheme } = useColorScheme();
  const { user } = useUser();
  const { userData } = useUserStore();
  const {
    latestRecipe,
    recommendedRecipes,
    topBreakfastRecipes,
    setLatestRecipe,
    setRecommendedRecipes,
    setTopBreakfastRecipes,
  } = useRecipeStore();
  const timeHour = new Date().getHours();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Fetch latest recipes
      const latestResponse = await axiosInstance.get(
        `/recipe/?latest=true&clerkId=${user?.id}`
      );

      // Fetch recommended recipes
      const recommendedResponse = await axiosInstance.get(
        `/recipe/recommendations/?clerkId=${user?.id}`
      );

      // Fetch top breakfast recipes
      // const breakfastResponse = await axios.get(
      //   `http://191.168.1.73:3000/api/v1/recipe/top?label=breakfast`
      // );

      // Handle latest recipes
      if (latestResponse.status === 200) {
        setLatestRecipe(latestResponse.data);
      }

      // Handle recommended recipes
      if (recommendedResponse.status === 200) {
        setRecommendedRecipes(recommendedResponse.data);
        console.log(recommendedResponse.data);
      }

      // Handle top breakfast recipes
      // if (breakfastResponse.status === 200) {
      //   setTopBreakfastRecipes(breakfastResponse.data);
      // }
    } catch (error) {
      console.log("Error fetching recipe data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      setLoading(true);
      try {
        // Fetch latest recipes
        const latestResponse = await axiosInstance.get(
          `/recipe/?latest=true&clerkId=${user?.id}`
        );

        // Fetch recommended recipes
        // const recommendedResponse = await axios.get(
        //   `http://192.168.1.73:3000/api/v1/recipe/recommendations/?clerkId=${user?.id}`
        // );

        // Fetch top breakfast recipes
        // const breakfastResponse = await axios.get(
        //   `http://191.168.1.73:3000/api/v1/recipe/top?label=breakfast`
        // );

        // Handle latest recipes
        if (latestResponse.status === 200) {
          setLatestRecipe(latestResponse.data);
        }

        // Handle recommended recipes
        // if (recommendedResponse.status === 200) {
        //   setRecommendedRecipes(recommendedResponse.data);
        //   console.log(recommendedResponse.data);
        // }

        // Handle top breakfast recipes
        // if (breakfastResponse.status === 200) {
        //   setTopBreakfastRecipes(breakfastResponse.data);
        // }
      } catch (error) {
        console.log("Error fetching recipe data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (latestRecipe.length === 0) fetchAllRecipes();
  }, []);
  return (
    <SafeAreaView className="w-full h-full bg-white dark:bg-black-300 relative">
      <SignedIn>
        <TouchableOpacity
          className="bg-primary-100 z-50 absolute bottom-3 right-4 p-4 rounded-full"
          onPress={() => router.push("/create/create")}
        >
          <Image source={icons.plus} className="size-8" tintColor="#ffffff" />
        </TouchableOpacity>
      </SignedIn>
      <View className="w-full h-full">
        <View className="flex gap-9 px-4 py-8 rounded-b-3xl bg-primary-100">
          <View className="flex flex-row items-center justify-between">
            <View className="flex gap-1 items-start justify-center">
              <Text className="font-rubik-bold text-3xl text-white">
                Good{" "}
                {timeHour >= 6 && timeHour <= 12
                  ? "Morning"
                  : timeHour > 12 && timeHour <= 18
                  ? "Afternoon"
                  : "Evening"}
              </Text>
              <SignedIn>
                <Text className="font-rubik  text-white">{user?.fullName}</Text>
              </SignedIn>
              <SignedOut>
                <Text className="font-rubik text-white">Chef</Text>
              </SignedOut>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/notification/notification")}
            >
              <Image
                source={icons.notification}
                className="size-8"
                tintColor="#ffffff"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="w-full px-2 py-3  rounded-xl flex flex-row justify-start items-center gap-2 bg-white"
            onPress={() =>
              router.push({ pathname: "/explore", params: { from: "index" } })
            }
          >
            <Image
              source={icons.search}
              className="size-6"
              tintColor="#666876"
            />
            <Text numberOfLines={1} className="flex-1 text-xl text-black-200">
              What do you want to cook?
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="w-full px-4 mt-2"
          contentContainerStyle={{
            rowGap: 8,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          scrollsToTop={true}
        >
          {loading ? (
            <View className="flex justify-center items-center gap-2">
              <ActivityIndicator size="large" color="#e55934" />
              <Text className="font-rubik text-lg text-black-200 dark:text-white">
                Loading Recipes
              </Text>
            </View>
          ) : (
            <>
              {/* <CardGroup
                title="Top Breakfast Recipes"
                data={latestRecipe.slice(9, 5)}
              />
              <SignedIn>
                <CardGroup
                  title="Recommended For You"
                  data={latestRecipe.slice(5, 5)}
                />
              </SignedIn> */}
              <View className="py-2">
                <View className="flex flex-row items-center justify-between mb-4">
                  <Text className="font-rubik-semibold text-xl text-black-200 dark:text-white">
                    Latest Recipes
                  </Text>
                </View>
                <View className="flex flex-row flex-wrap justify-center gap-4">
                  {latestRecipe.map((recipe) => (
                    <Card key={recipe._id} recipe={recipe} />
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
