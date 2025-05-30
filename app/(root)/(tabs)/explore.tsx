import { View, Text, FlatList, TextInput, Alert } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/searchBar";
import Card from "@/components/Card";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/utils/axios";
import { router } from "expo-router";
import CardGroup from "@/components/CardGroup";
import { recipes as dummy } from "@/constants/data";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [recentSearch, setRecentSearch] = useState(["Toast", "Mango", "Pizza"]);

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
        if (!recentSearch.includes(searchQuery)) {
          setRecentSearch((prev) => [searchQuery, ...prev]);
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert("", "Something went wrong. Try again!");
    }
  }, [searchQuery]);

  useDebounce(debouncedSearch, 500, [debouncedSearch]);

  const handleClearSearch = () => {
    Alert.alert("Clear Search", "Are you sure you want to clear the search?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Clear",
        onPress: () => {
          setRecentSearch([]);
        },
      },
    ]);
  };

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
          <View className="px-4">
            <View className="flex gap-4 mb-4">
              <View className="flex flex-row items-center justify-between">
                <Text className="font-rubik-medium text-xl text-black-200 dark:text-white">
                  Recent Search
                </Text>
                <Text
                  className="font-rubik text-black-200 dark:text-white underline"
                  onPress={() => setRecentSearch([])}
                >
                  Clear
                </Text>
              </View>
              {recentSearch.length > 0 ? (
                <View className="flex flex-row items-center gap-2 mt-2">
                  {recentSearch.map((item, index) => (
                    <Text
                      key={index}
                      className="font-rubik text-lg text-black-200 dark:text-white bg-white/90 dark:bg-black-200 px-3 py-1 rounded-full"
                      onPress={() => {
                        setSearchQuery(item);
                        setRecentSearch((prev) => [item, ...prev]);
                      }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              ) : (
                <Text className="font-rubik text-lg text-black-200 text-center dark:text-white">
                  No recent searches
                </Text>
              )}
            </View>
            <CardGroup title="Popular Recipes" data={dummy.slice(0, 5)} />
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
