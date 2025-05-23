import { View, Text, FlatList, TextInput, Alert } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/searchBar";
import Card from "@/components/Card";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/utils/axios";
import { router } from "expo-router";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);

  const debouncedSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setRecipes([]);
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/recipe/search?q=${searchQuery}`
      );
      if (response.status == 200) {
        setRecipes(response.data);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("", "Something went wrong. Try again!");
    }
  }, [searchQuery]);

  useDebounce(debouncedSearch, 500, [debouncedSearch]);

  return (
    <SafeAreaView className="w-full h-full bg-white dark:bg-black-300">
      <View className="flex gap-8 px-4 py-8 bg-primary-100 rounded-b-3xl">
        <Text className="font-rubik-bold text-3xl text-white">
          Search Recipes
        </Text>
        <SearchBar
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <View className="w-full mt-2 pb-32">
        {recipes.length == 0 && searchQuery.length == 0 ? (
          <View className="flex items-center justify-center h-full">
            <Text className="font-rubik text-black-100 text-lg">
              Search for recipes
            </Text>
          </View>
        ) : (
          <View className="flex gap-4 px-4 py-2">
            <Text className="font-rubik-medium text-lg text-black-200 dark:text-white">
              Search Results for: {searchQuery}
            </Text>
            <View>
              {recipes.map((recipe) => (
                <Card key={recipe._id} recipe={recipe} />
              ))}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Explore;
