import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
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

const Saved = () => {
  const { isSignedIn } = useUser();
  const [savedRecipes, setSavedRecipes] = useState(recipes);
  const { userData } = useUserStore();

  useEffect(() => {
    const FetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http:192.168.1.71:3000/api/v1/recipe/fetchSaved/${userData?._id}`
        );
        if (response.status == 200) setSavedRecipes(response.data);
      } catch (error) {}
    };
  }, []);
  return (
    <SafeAreaView className="flex bg-white w-full h-full dark:bg-black-300">
      <View className="flex gap-8 px-4 py-12 rounded-b-3xl bg-primary-100">
        <Text className="font-rubik-bold text-3xl text-white">
          Saved Recipe
        </Text>
        <SearchBar placeHolderText="Search in your saved recipes" />
      </View>
      {isSignedIn ? (
        <FlatList
          data={[]}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerClassName="w-full flex items-center px-6 py-8"
          contentContainerStyle={{
            rowGap: 16,
            columnGap: 16,
          }}
          ListEmptyComponent={
            <View className="flex flex-1 items-center">
              <Text className="font-rubik text-xl dark:text-black-200">
                Nothing is saved
              </Text>
            </View>
          }
        />
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
