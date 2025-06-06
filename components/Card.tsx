import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";

interface Props {
  recipe: Partial<Recipe>;
}

const Card = ({ recipe }: Props) => {
  return (
    <View key={recipe._id} className="size-[180px]">
      <TouchableOpacity
        className="flex items-start relative bg-white rounded-[10px] shadow-card overflow-hidden dark:bg-black-200"
        onPress={() => {
          router.push(`/recipe/${recipe._id}`);
        }}
      >
        <Image
          source={
            recipe.image === "default" ||
            recipe.image === "default_recipe_image.jpeg"
              ? images.noodles
              : { uri: recipe.image }
          }
          className="w-full h-[8rem]"
          resizeMode="cover"
        />
        {recipe.averageRating! > 0 && (
          <View className="flex flex-row items-center gap-1 px-2 py-1 bg-white/90 rounded-full absolute top-2 right-2">
            <Image
              source={icons.star}
              className="size-5"
              tintColor="#ffDE21"
            ></Image>
            <Text className="text-lg font-rubik-medium text-black-200">
              {recipe.averageRating?.toFixed(1)}
            </Text>
          </View>
        )}
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
