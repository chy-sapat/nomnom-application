import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/components/Card";
import images from "@/constants/images";
import { recipes } from "@/constants/data";
import Explore from "./explore";
import SearchBar from "@/components/searchBar";

const Saved = () => {
  const isLoggedIn= false;
  return (
    <SafeAreaView className="flex p-2 bg-white w-full h-full dark:bg-black-300">
          <View>
            <Text className="font-rubik-bold text-2xl py-4 text-black-300 dark:text-white">Saved Recipe</Text>
            <SearchBar 
                placeHolderText="Search in your saved recipes"
                />
          </View>
          {isLoggedIn ? <FlatList
          data={recipes}
          renderItem = {({item}) => (
              <Card {...item}/>
            )}
            keyExtractor={(item)=>item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            bounces={true}
            contentContainerClassName="pb-32"
            ListEmptyComponent={
              <View className="flex flex-1 items-center">
                <Text className="font-rubik text-xl dark:text-black-200">Nothing is saved!</Text>
              </View>              
            }
          /> : (
            <View className="my-auto px-3">
              <View className="flex items-center gap-3 mb-10">
                <Text className="font-rubik text-lg dark:text-black-100">You are not Signed In</Text>
                <Text className="font-rubik text-lg dark:text-black-100">Sign in to view saved recipes</Text>
              </View>
              <TouchableOpacity className="flex flex-row justify-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100">
                <Text className="font-rubik-medium text-white text-lg">Sign in</Text>
              </TouchableOpacity>
            </View>
          )}
      
    </SafeAreaView>
  );
};

export default Saved;
