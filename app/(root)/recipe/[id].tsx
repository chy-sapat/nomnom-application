import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { recipes } from "@/constants/data";
import CardGroup from "@/components/CardGroup";
import axiosInstance from "@/utils/axios";
import { useUserStore } from "@/zustand/store";
import { useColorScheme } from "nativewind";
import axios from "axios";
import { Rating, AirbnbRating } from "@rneui/themed";

const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [similarRecipe, setSimilarRecipe] = useState<Recipe[]>([]);
  const { userData } = useUserStore();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [rating, setRating] = useState(0);
  const timeDisplay =
    recipe?.cookTime! / 60 > 1
      ? `${Math.floor(recipe?.cookTime! / 60)} hr ${recipe?.cookTime! % 60} min`
      : `${recipe?.cookTime} min`;

  const deleteRecipe = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/recipe/${id}`);
      ToastAndroid.show(response.data.message, ToastAndroid.LONG);
      router.back();
    } catch (error) {
      Alert.alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const editRecipe = () => {
    router.push(`/edit/${id}`);
  };
  const saveRecipe = async () => {
    try {
      const response = await axiosInstance.post("/recipe/save-recipe", {
        userId: userData?._id,
        recipeId: recipe?._id,
      });
      if (response.status == 200) {
        ToastAndroid.show("Recipe saved successfully", ToastAndroid.LONG);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/recipe/${id}`);
        setRecipe(response.data.recipe);
        setSimilarRecipe(response.data.similar);
      } catch (error) {
        Alert.alert(
          "",
          "Something went wrong while fetching the recipe. Please try again later!",
          [
            {
              text: "OK",
              onPress: () => router.back(),
            },
          ]
        );
      } finally {
        setLoading(false);
      }
    };
    if (!recipe) fetchRecipe();
  }, []);

  return (
    <>
      {loading ? (
        <SafeAreaView className="w-full h-full flex justify-center bg-white dark:bg-black-300">
          <ActivityIndicator size="large" color={"#e55934"} />
        </SafeAreaView>
      ) : (
        <SafeAreaView className="w-full h-full relative bg-white dark:bg-black-300">
          <TouchableOpacity
            className="absolute top-4 left-4 z-50 bg-white/50 rounded-full p-2"
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className="size-8" />
          </TouchableOpacity>
          <View className="absolute top-4 right-4 z-50 flex flex-row gap-4">
            {recipe?.author._id !== userData?._id ? (
              <TouchableOpacity onPress={saveRecipe}>
                <Image
                  source={icons.save}
                  className="size-6"
                  tintColor={colorScheme === "light" ? "#191831" : "#ffffff"}
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={editRecipe}>
                  <Image
                    source={icons.edit}
                    className="size-6"
                    tintColor={colorScheme === "light" ? "#191831" : "#ffffff"}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={deleteRecipe}>
                  <Image
                    source={icons.deleteIcon}
                    className="size-6"
                    tintColor={colorScheme === "light" ? "#191831" : "#ffffff"}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {recipe?.image !== "default_recipe_image.jpeg" ? (
              <Image
                source={{ uri: recipe?.image }}
                className="w-full aspect-[16/9]"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={images.noodles}
                className="w-full aspect=[16/9]"
                resizeMode="contain"
              />
            )}
            <View className="flex gap-8 px-6 py-4">
              <View className="flex flex-row justify-between items-center">
                <View>
                  <Text className="font-rubik-bold text-3xl text-black-300 dark:text-white">
                    {recipe?.title}
                  </Text>
                  <Text className="font-rubik text-lg text-black-200">{`By ${recipe?.author.fullname}`}</Text>
                </View>
                {recipe?.averageRating && (
                  <View className="flex flex-row items-center gap-2 bg-black-100/80 px-2 rounded-full py-2">
                    <Image
                      source={icons.star}
                      className="size-6"
                      tintColor={"#FFDE21"}
                    />
                    <Text className="font-rubik text-xl">
                      {recipe?.averageRating}
                    </Text>
                  </View>
                )}
              </View>
              {recipe?.description && (
                <Text className="py-4 font-rubik text-xl text-black-200">
                  {recipe.description}
                </Text>
              )}
              <View className="flex flex-row justify-between">
                <View>
                  <Text className="font-rubik text-lg text-black-200">
                    {recipe?.difficulty}
                  </Text>
                </View>
                <View className="flex flex-row gap-2 items-center">
                  <Image
                    source={icons.clock}
                    className="size-5"
                    tintColor="#666876"
                  />
                  <Text className="font-rubik text-lg text-black-200">
                    {timeDisplay}
                  </Text>
                </View>
                <View>
                  <Text className="font-rubik text-lg text-black-200">{`${recipe?.servings} serving`}</Text>
                </View>
              </View>
              <View className="flex gap-8">
                <Text className="font-rubik-medium text-2xl text-black-100 dark:text-white">
                  Ingredients
                </Text>
                <View className="flex gap-4">
                  {recipe?.ingredients.map((item, index) => (
                    <View key={index} className="flex flex-row gap-2">
                      <Text className="font-rubik text-xl text-black-200">
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
                <View className="flex gap-8">
                  <Text className="font-rubik-medium text-2xl text-black-100 dark:text-white">
                    Instructions
                  </Text>
                  <View className="flex gap-8">
                    {recipe?.directions.map((item, index) => (
                      <View key={index} className="flex gap-4 items-start">
                        <Text className="px-6 py-2 text-center font-rubik-medium text-lg bg-black-100 text-white rounded-full">
                          {`Step ${index + 1}`}
                        </Text>
                        <Text className="font-rubik text-xl text-black-200">
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text className="font-rubik-medium text-2xl text-black-100 dark:text-white">
                    Ratings
                  </Text>
                  <View className="flex gap-4">
                    <Rating
                      showRating
                      imageSize={20}
                      startingValue={rating}
                      onFinishRating={(rating: number) => setRating(rating)}
                      style={{
                        paddingVertical: 10,
                        backgroundColor: "#191d31",
                      }}
                    />
                    <TextInput
                      className="min-h-[100px] border rounded-2xl border-black-100 px-3 py-3 align-top text-black-200 font-rubik dark:text-white"
                      placeholder="What do you think about this recipe?"
                      placeholderTextColor={"#666876"}
                    />
                  </View>
                  <View className="mt-4">
                    <Text className="font-rubik text-lg text-black-200 text-center">
                      No Ratings to show
                    </Text>
                  </View>
                </View>
                <View className="h-[2px] bg-black-200"></View>
                <CardGroup title="Similar Recipes" data={similarRecipe} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default Recipe;
