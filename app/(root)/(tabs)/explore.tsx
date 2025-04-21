import { View, Text, FlatList, TextInput, Alert } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/searchBar";
import Card from "@/components/Card";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import axiosInstance from "@/utils/axios";

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
      <View className="px-4 py-8 bg-primary-100 rounded-b-3xl">
        <SearchBar
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <View className="w-full mt-2 pb-32">
        <FlatList
          data={recipes}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={(item) => item._id!}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerClassName="flex items-center"
          contentContainerStyle={{
            rowGap: 16,
            columnGap: 16,
          }}
          ListEmptyComponent={
            <View className="flex flex-1 items-center">
              {
                <Text className="font-rubik text-xl dark:text-black-200">
                  Search for something
                </Text>
              }
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;
