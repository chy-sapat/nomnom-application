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
      <View className="px-6 py-16 bg-primary-100 rounded-b-3xl">
        <SearchBar
          autoFocus={from === "index"}
          showFilterIcon={true}
          onClick={() => {}}
        />
      </View>
      <FlatList
        data={recipes}
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
      />
    </SafeAreaView>
  );
};

export default Explore;
