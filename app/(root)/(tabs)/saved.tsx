import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/components/Card";
import images from "@/constants/images";
import { recipes } from "@/constants/data";
import Explore from "./explore";
import SearchBar from "@/components/searchBar";
import { useUser } from "@clerk/clerk-expo";
import { useUserStore } from "@/zustand/store";
import axios from "axios";
import { Link } from "expo-router";
import axiosInstance from "@/utils/axios";

const Saved = () => {
  const { isSignedIn } = useUser();
  const [savedRecipes, setSavedRecipes] = useState<Array<Partial<Recipe>>>([]);
  const { userData } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/recipe/getUserSavedRecipes/${userData?._id}`
        );
        // const response = await axios.get(
        //   `http://192.168.1.73:3000/api/v1/recipe/getUserSavedRecipes/${userData?._id}`
        // );
        if (response.status === 200) {
          console.log(response.data);
          setSavedRecipes(response.data);
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Error",
          "Failed to fetch saved recipes. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) {
      fetchSavedRecipes();
    }
  }, []);
  return (
    <SafeAreaView className="flex bg-white w-full h-full dark:bg-black-300">
      <View className="flex gap-8 px-4 py-8 rounded-b-3xl bg-primary-100">
        <Text className="font-rubik-bold text-3xl text-white">
          Saved Recipe
        </Text>
        <SearchBar
          value=""
          placeHolderText="Search in your saved recipes"
          onChangeText={() => {}}
        />
      </View>
      {isSignedIn ? (
        loading ? (
          <ActivityIndicator size="large" color={"#e55934"} />
        ) : savedRecipes.length > 0 ? (
          <View className="flex flex-row flex-wrap justify-center px-4 py-2 gap-4">
            {savedRecipes.map((recipe) => (
              <Card key={recipe._id} recipe={recipe} />
            ))}
          </View>
        ) : (
          <View className="flex flex-1 items-center">
            <Text className="font-rubik text-xl dark:text-black-200">
              Nothing is saved
            </Text>
          </View>
        )
      ) : (
        <View className="my-auto px-3">
          <View className="flex items-center gap-3 mb-10">
            <Text className="font-rubik text-lg dark:text-black-100">
              You are not Signed In
            </Text>
            <Text className="font-rubik text-lg dark:text-black-100">
              <Link href="/signIn" className="underline">
                Sign in
              </Link>{" "}
              to view saved recipes
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Saved;
