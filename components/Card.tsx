import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";

const Card = (recipe: Partial<Recipe>) => {
  return (
    <View key={recipe._id} className="w-[180px]">
      <TouchableOpacity
        className="flex items-start relative bg-white rounded-[10px] mr-4 shadow-card overflow-hidden dark:bg-black-200"
        onPress={() => {
          router.push(`/recipe/${recipe._id}`);
        }}
      >
        <Image
          source={
            recipe.image !== "default" ? { uri: recipe.image } : images.noodles
          }
          className="w-full h-[8rem]"
          resizeMode="cover"
        />
        <View className="flex flex-row items-center gap-1 px-1 py-0.5 bg-white/90 rounded-full absolute top-2 right-2">
          <Image
            source={icons.star}
            className="size-5"
            tintColor="#ffDE21"
          ></Image>
          <Text className="text-lg font-rubik-medium text-black-200">
            {recipe.averageRating}
          </Text>
        </View>
        <View className="flex gap-2 p-2">
          <Text
            className="font-rubik-semibold text-lg text-black-200 mb-[5px] dark:text-white"
            numberOfLines={1}
          >
            {recipe.title}
          </Text>
          <Text className="font-rubik text-sm text-black-200 dark:text-white">
            {recipe.author?.fullname}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
