import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import RecipeForm from "@/components/recipeForm";
import axios from "axios";
import axiosInstance from "@/utils/axios";
import { router } from "expo-router";
import { getMimeType } from "@/utils/mimeType";
import { useUserStore } from "@/zustand/store";

const CreateRecipe = () => {
  const [loading, setLoading] = useState(false);
  const { userData } = useUserStore();

  const create = async (data: Partial<Recipe>) => {
    setLoading(true);
    try {
      let finalImageUrl = data.image;
      if (finalImageUrl !== "") {
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
      const response = await axiosInstance.post("/recipe/", {
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
      if (response.status == 201) {
        ToastAndroid.show(
          "Recipe saved and published successfully",
          ToastAndroid.LONG
        );
        router.replace("/");
      }
    } catch (error: any) {
      console.log(error);
      Alert.alert("", "Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };
  return (
    <RecipeForm
      mode="create"
      formTitle="Create New Recipe"
      onButtonClick={create}
      loading={loading}
    />
  );
};

export default CreateRecipe;
