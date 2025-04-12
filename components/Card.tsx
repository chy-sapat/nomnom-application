import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { router } from "expo-router";

interface props {
  id: number;
  title: string;
  author: string;
  image?: string;
  avgRating: number;
}

const Card = ({ id, title, author, image, avgRating }: props) => {
  return (
    <View key={id} className="w-[180px] mt-4">
      <TouchableOpacity
        className="flex items-start relative bg-white rounded-[10px] mr-4 shadow-card overflow-hidden"
        onPress={() => {
          router.push(`/recipe/${id}`);
        }}
      >
        <Image
          source={images.noodles}
          className="w-full h-[8rem]"
          resizeMode="cover"
        />
        <View className="flex flex-row items-center gap-1 px-1 py-0.5 bg-white/90 rounded-full absolute top-2 right-2">
          <Image source={icons.star} className="size-5"></Image>
          <Text className="text-lg font-rubik-medium text-black-200">
            {avgRating}
          </Text>
        </View>
        <View className="p-[8px]">
          <Text
            className="font-rubik-semibold text-lg text-black-200 mb-[5px]"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text className="font-rubik text-sm text-black-200">{author}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
