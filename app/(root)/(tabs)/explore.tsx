import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/searchBar";
import Card from "@/components/Card";
import { recipes } from "@/constants/data";

const Explore = () => {
  return (
    <SafeAreaView className="w-full h-full px-2 py-4 bg-white dark:bg-black-300">
      <SearchBar showFilterIcon={true} onClick={() => {}} />
      <FlatList
        data={recipes}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerClassName="w-full flex items-center mt-4"
      />
    </SafeAreaView>
  );
};

export default Explore;
