import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import images from "@/constants/images";
import icons from "@/constants/icons";
import React from "react";
import { router } from "expo-router";
import Card from "./Card";

interface cardGroup {
  title: string;
  data: Array<Partial<Recipe>>;
}

const CardGroup = ({ title, data }: cardGroup) => {
  return (
    <View className="py-2">
      <View className="flex flex-row items-center justify-between">
        <Text className="font-rubik-semibold text-xl text-black-200 dark:text-white">
          {title}
        </Text>
        <TouchableOpacity>
          <Text className="font-rubik text-black-200 dark:text-white">
            See More
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item._id!.toString()}
        bounces={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="py-2"
        horizontal
      />
    </View>
  );
};

export default CardGroup;
