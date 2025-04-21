import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import RecipeForm from "@/components/recipeForm";
import { useUserStore } from "@/zustand/store";
import axiosInstance from "@/utils/axios";
import { router, useLocalSearchParams } from "expo-router";
import { getMimeType } from "@/utils/mimeType";
import axios from "axios";

const Edit = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const { userData } = useUserStore();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const Update = async (data: Partial<Recipe>) => {
    setLoading(true);
    try {
      let finalImageUrl = data.image;
      if (
        data.image !== recipe?.image &&
        data.image !== "default_recipe_image.jpeg" &&
        data.image !== ""
      ) {
        const mimeType = getMimeType(finalImageUrl!);
        const formData = new FormData();
        formData.append("file", {
          uri: finalImageUrl,
          type: mimeType,
          name: "upload.jpg",
        } as any);
        formData.append("upload_preset", "nomnom_preset");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dlisangy4/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        finalImageUrl = res.data.secure_url;
      }
      const response = await axiosInstance.patch(`/recipe/${recipe?._id}`, {
        title: data.title,
        description: data.description,
        ingredients: data.ingredients,
        directions: data.directions,
        servings: data.servings,
        labels: data.labels,
        author: userData?._id,
        cookTime: data.cookTime,
        image:
          finalImageUrl !== "" ? finalImageUrl : "default_recipe_image.jpeg",
        difficulty: data.difficulty,
      });
      if (response.status == 200) {
        ToastAndroid.show("Recipe updated successfully", ToastAndroid.LONG);
        router.back();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("", "Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/recipe/${id}`);
        setRecipe(response.data);
        console.log(response.data);
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
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <RecipeForm
      mode="edit"
      formTitle="Edit"
      onButtonClick={Update}
      loading={loading}
      recipeData={recipe}
    />
  );
};

export default Edit;
