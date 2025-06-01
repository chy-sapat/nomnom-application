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
import {
  InteractiveStarRating,
  StaticStarRating,
} from "@/components/starRating";
import { SignedIn, useAuth, useUser } from "@clerk/clerk-expo";
import axios from "axios";

const Recipe = () => {
  const [loading, setLoading] = useState(true);
  const [reviewSubmitLoading, setReviewSubmitLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [similarRecipe, setSimilarRecipe] = useState<Recipe[]>([]);
  const { userData } = useUserStore();
  const { user, isSignedIn } = useUser();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [myReview, setMyReview] = useState<Rating | null>(null);
  const [rating, setRating] = useState(0);
  const [myComment, setMyComment] = useState("");
  const [editReview, setEditReview] = useState(false);
  const timeDisplay =
    recipe?.cookTime! / 60 > 1
      ? `${Math.floor(recipe?.cookTime! / 60)} hr ${recipe?.cookTime! % 60} min`
      : `${recipe?.cookTime} min`;

  const deleteRecipe = async () => {
    setLoading(true);
    try {
      Alert.alert(
        "Delete Recipe",
        "Are you sure you want to delete this recipe?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              const response = await axiosInstance.delete(`/recipe/${id}`);
              ToastAndroid.show(response.data.message, ToastAndroid.LONG);
              router.back();
            },
          },
        ]
      );
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

  const handleReviewSubmit = async () => {
    setMyReview({ userId: userData?._id!, rating, comments: myComment });
    setReviewSubmitLoading(true);
    try {
      const response = await axiosInstance.post(
        `/ratings/${recipe?._id}/rate`,
        {
          userId: userData?._id,
          rating,
          comments: myComment,
        }
      );
      if (response.status === 200) {
        ToastAndroid.show("Review submitted successfully", ToastAndroid.LONG);
        setRecipe(response.data.recipe);
      }
    } catch (error: any) {
      console.log(error);
      const message =
        error.response?.data?.message || "Something went wrong...";
      Alert.alert("Error", message);
    } finally {
      setEditReview(false);
      setReviewSubmitLoading(false);
    }
  };

  const handleReviewDelete = () => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete your review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const response = await axiosInstance.delete(
                `/ratings/${recipe?._id}/rate/${userData?._id}`
              );
              if (response.status === 200) {
                ToastAndroid.show(
                  "Review deleted successfully",
                  ToastAndroid.LONG
                );
                setRecipe(response.data.recipe);
                setMyReview(null);
                setRating(0);
                setMyComment("");
              }
            } catch (error: any) {
              console.log(error);
              const message =
                error.response?.data?.message || "Something went wrong...";
              Alert.alert("Error", message);
            } finally {
              setEditReview(false);
              setReviewSubmitLoading(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/recipe/${id}`);
        setRecipe(response.data.recipe);
        setSimilarRecipe(response.data.similar);

        const existingReview = response.data.recipe.ratings.find(
          (review: Rating) => review.userId === userData?._id
        );
        if (existingReview) {
          setMyReview(existingReview);
          setRating(existingReview.rating);
          setMyComment(existingReview.comments);
        }
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

  if (loading)
    return (
      <SafeAreaView className="w-full h-full flex justify-center bg-white dark:bg-black-300">
        <ActivityIndicator size="large" color={"#e55934"} />
      </SafeAreaView>
    );

  return (
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
            className="w-full aspect-[16/9]"
            resizeMode="contain"
          />
        )}
        <View className="flex gap-8 px-6 py-4">
          <View className="flex flex-row justify-between items-center">
            <View>
              <Text className="font-rubik-bold text-3xl text-black-300 dark:text-white">
                {recipe?.title}
              </Text>
              <Text
                className="font-rubik text-lg text-black-200 dark:text-white"
                onPress={() => router.push(`/user/${recipe?.author._id}`)}
              >
                {recipe?.author.fullname}
              </Text>
            </View>
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
              <Text className="font-rubik text-lg text-black-200">
                {`${recipe?.servings} serving`}
              </Text>
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
                  <View key={index} className="flex flex-row gap-4 items-start">
                    <View className="size-10 flex justify-center items-center bg-black-100 rounded-full">
                      <Text className="font-rubik-medium text-lg text-white">
                        {`${index + 1}`}
                      </Text>
                    </View>
                    <Text className="font-rubik flex-1 text-xl text-black-200 dark:text-white">
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Text className="font-rubik-medium text-2xl text-black-100 dark:text-white">
                Reviews
              </Text>
              <View className="py-4 flex gap-2 items-center">
                <Text className="font-rubik text-lg mb-4 text-black-200">
                  Overall Rating
                </Text>
                <View className="flex flex-row items-center gap-2">
                  <Text className="font-rubik-medium text-7xl text-center text-black-200 dark:text-white">
                    {recipe?.averageRating?.toFixed(1)}
                  </Text>
                  <Text className="font-rubik text-sm text-black-200 dark:text-white">
                    / 5
                  </Text>
                </View>
                <StaticStarRating
                  rating={recipe?.averageRating!}
                  size={"large"}
                />
                <Text className="font-rubik text-sm text-center text-black-200 dark:text-white">
                  {`(${recipe?.ratings?.length} reviews)`}
                </Text>
              </View>
              <SignedIn>
                {userData?._id !== recipe?.author._id && (
                  <View className="flex gap-4 border border-black-200 rounded-xl px-4 py-6">
                    <Text className="font-rubik text-xl text-black-200 dark:text-white">
                      Your Feedback
                    </Text>
                    {myReview && !editReview ? (
                      <View>
                        <View className="w-full flex gap-4 p-4 items-start">
                          <View className="flex flex-row items-center gap-4">
                            <Image
                              source={{ uri: user?.imageUrl || icons.profile }}
                              className="size-12 rounded-full border border-black-200 dark:border-white"
                            />
                            <View className="flex-1 flex gap-2">
                              <View className="flex flex-row items-center gap-2">
                                <Text className="font-rubik-medium text-lg text-black-200 dark:text-white">
                                  {user?.fullName}
                                </Text>
                                <Text className="font-rubik text-sm text-black-200">{`1 min ago`}</Text>
                                <View className="flex-1 flex-row justify-end gap-4">
                                  <TouchableOpacity
                                    onPress={() => setEditReview(true)}
                                  >
                                    <Image
                                      source={icons.edit}
                                      className="size-4"
                                      tintColor={
                                        colorScheme === "light"
                                          ? "#191831"
                                          : "#ffffff"
                                      }
                                    />
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={handleReviewDelete}
                                  >
                                    <Image
                                      source={icons.deleteIcon}
                                      className="size-4"
                                      tintColor={
                                        colorScheme === "light"
                                          ? "#191831"
                                          : "#ffffff"
                                      }
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <StaticStarRating
                                rating={myReview.rating}
                                size="small"
                              />
                            </View>
                          </View>
                          {myReview?.comments!.trim() !== "" && (
                            <Text className="font-rubik text-lg text-black-200 text-wrap text-justify dark:text-white">
                              {myReview.comments}
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : (
                      <View className="flex gap-4">
                        <InteractiveStarRating
                          rating={rating}
                          setRating={setRating}
                        />
                        <TextInput
                          className="min-h-[100px] border rounded-2xl border-black-100 px-3 py-3 align-top text-black-200 font-rubik dark:text-white"
                          placeholder="What do you think about this recipe?"
                          placeholderTextColor={"#666876"}
                          value={myComment}
                          onChangeText={(text) => setMyComment(text)}
                        />
                        <TouchableOpacity
                          className="flex items-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100"
                          onPress={handleReviewSubmit}
                        >
                          {reviewSubmitLoading ? (
                            <>
                              <ActivityIndicator size="small" color="#ffffff" />
                              <Text className="font-rubik-medium text-white ml-2">
                                Submitting...
                              </Text>
                            </>
                          ) : (
                            <Text className="font-rubik-medium text-white">
                              Submit Review
                            </Text>
                          )}
                        </TouchableOpacity>
                        {myReview && editReview && (
                          <Text
                            className="font-rubik text-lg text-black-200 dark:text-white text-center mt-2"
                            onPress={() => setEditReview(false)}
                          >
                            Cancel
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                )}
              </SignedIn>
            </View>
            <View className="my-4 flex gap-4">
              <Text className="font-rubik-medium text-2xl text-black-200 dark:text-white">
                Others Reviews
              </Text>
              {recipe?.ratingCount === 0 ? (
                <Text className="font-rubik text-lg text-black-200 text-center">
                  {isSignedIn
                    ? "Be the first one to review"
                    : "No Reviews to show"}
                </Text>
              ) : (
                <View className="w-full flex gap-4 border border-black-200 rounded-xl p-4 items-start">
                  <View className="flex flex-row items-center gap-4">
                    <Image
                      source={icons.profile}
                      className="size-12"
                      tintColor="#666876"
                    />
                    <View className="flex gap-2">
                      <View className="flex flex-row items-center gap-2">
                        <Text className="font-rubik-medium text-lg text-black-200 dark:text-white">
                          {`Author`}
                        </Text>
                        <Text className="font-rubik text-sm text-black-200">{`1 min ago`}</Text>
                      </View>
                      <StaticStarRating rating={3} size="small" />
                    </View>
                  </View>
                  <Text className="font-rubik text-lg text-black-200 text-wrap text-justify dark:text-white">
                    {
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Consectetur, optio?"
                    }
                  </Text>
                </View>
              )}
            </View>
            <CardGroup title="Similar Recipes" data={similarRecipe} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recipe;
