import { View, Text, FlatList, TextInput } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/searchBar";
import Card from "@/components/Card";
import { recipes } from "@/constants/data";
import { useLocalSearchParams } from "expo-router";

const Explore = () => {
  const searchRef = useRef<TextInput | null>(null);
  const { from } = useLocalSearchParams();

  return (
    <SafeAreaView className="w-full h-full bg-white dark:bg-black-300">
      <View className="px-4 py-8 bg-primary-100 rounded-b-3xl">
        <SearchBar
          autoFocus={from === "index"}
          showFilterIcon={true}
          onClick={() => {}}
        />
      </View>
      <View className="w-full mt-2 pb-32">
        <FlatList
          data={recipes}
          renderItem={({ item }) => <Card {...item} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerClassName="flex items-center"
          contentContainerStyle={{
            rowGap: 16,
            columnGap: 16,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Explore;
