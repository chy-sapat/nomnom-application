import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { recipe } from "@/constants/data";

const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(1);
  const { id } = useLocalSearchParams<{ id?: string }>();
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {loading ? (
        <SafeAreaView className="w-full h-full flex justify-center bg-white dark:bg-black-300">
          <ActivityIndicator size="large" color={"#e55934"} />
        </SafeAreaView>
      ) : (
        <SafeAreaView className="w-full h-full relative bg-white dark:bg-black-300">
          {/* back arrow */}
          <TouchableOpacity
            className="absolute top-4 left-4 z-50 bg-white/50 rounded-full p-2"
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className="size-8" />
          </TouchableOpacity>
          {/* Recipe Options */}
          <View className="absolute top-4 right-4 z-50 flex flex-row gap-2">
            <TouchableOpacity>
              <Image
                source={icons.save}
                className="size-8"
                tintColor="#ffffff"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icons.threeDots}
                className="size-8"
                tintColor="#ffffff"
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              source={images.noodles}
              style={{ height: windowHeight / 2 }}
              className="w-full"
              resizeMode="cover"
            />
            <View className="flex gap-8 px-6 py-4">
              {/* Title & Rating */}
              <View className="flex flex-row justify-between items-center">
                <Text className="font-rubik-bold text-2xl text-black-300 dark:text-white">
                  {recipe.title}
                </Text>
                <View className="flex flex-row items-center gap-2 bg-black-100/80 px-2 rounded-full py-2">
                  <Image
                    source={icons.star}
                    className="size-6"
                    tintColor={"#FFDE21"}
                  />
                  <Text className="font-rubik text-xl">{4.5}</Text>
                </View>
              </View>
              {recipe.description && (
                <Text className="font-rubik text-lg text-black-200">
                  {recipe.description}
                </Text>
              )}
              <View className="flex flex-row justify-between">
                <View>
                  <Text className="font-rubik text-lg text-black-200">
                    Beginner
                  </Text>
                </View>
                <View className="flex flex-row gap-2 items-center">
                  <Image
                    source={icons.clock}
                    className="size-5"
                    tintColor="#666876"
                  />
                  <Text className="font-rubik text-lg text-black-200">
                    1 hr 30 min
                  </Text>
                </View>
                <View>
                  <Text className="font-rubik text-lg text-black-200">
                    176 cal
                  </Text>
                </View>
              </View>
              {/* Servings */}
              <View className="flex flex-row items-center gap-8">
                <View className="flex flex-row gap-2 items-center">
                  <Image
                    source={icons.people}
                    className="size-5"
                    tintColor="#666876"
                  />
                  <Text className="font-rubik text-xl text-black-200">
                    Servings
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-2 bg-black-100 p-1 rounded-full">
                  <TouchableOpacity
                    className="size-8 flex justify-center items-center bg-white rounded-full"
                    onPress={() => {
                      if (servings > 1) {
                        setServings(servings - 1);
                      }
                    }}
                  >
                    <Image
                      source={icons.minus}
                      className="size-4"
                      tintColor={"#666876"}
                    />
                  </TouchableOpacity>
                  <TextInput
                    value={servings.toString()}
                    onChangeText={(e) => setServings(Number(e))}
                    className="font-rubik text-lg text-black-300 align-middle px-3 py-1"
                    inputMode="numeric"
                    maxLength={2}
                  />
                  <TouchableOpacity
                    className="size-8 flex justify-center items-center bg-white rounded-full"
                    onPress={() => {
                      if (servings < 99) {
                        setServings(servings + 1);
                      }
                    }}
                  >
                    <Image
                      source={icons.plus}
                      className="size-4"
                      tintColor={"#666876"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex gap-8">
                <Text className="font-rubik-medium text-2xl text-black-100">
                  Ingredients
                </Text>
                <View className="flex gap-4">
                  {recipe.ingredients.map((item, index) => (
                    <View key={index} className="flex flex-row gap-2">
                      <Text className="font-rubik text-lg text-black-200">
                        {item.quantity}
                      </Text>
                      <Text className="font-rubik text-lg text-black-200">
                        {item.ingredient}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Recipe;
