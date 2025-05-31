import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import { useUser } from "@clerk/clerk-expo";
import axiosInstance from "@/utils/axios";
import { useUserStore } from "@/zustand/store";
import { router } from "expo-router";

const dietaryOption = [
  "Vegan",
  "Paleo",
  "Vegetarian",
  "Dairy-Free",
  "Gluten-Free",
  "Keto",
  "Non-Veg",
];

const DietaryPreference = () => {
  const [dietary, setDietary] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [additionalDietary, setAdditionalDietary] = useState<string>("");
  const [allergiesInput, setAllergiesInput] = useState<string>("");
  const { user } = useUser();
  const { setUserPreference } = useUserStore();

  const handleDietary = (option: string) => {
    if (dietary.includes(option)) {
      const newDietary = dietary.filter((opt) => opt !== option);
      setDietary(newDietary);
    } else {
      setDietary([...dietary, option]);
    }
  };

  const handlePreference = async () => {
    if (additionalDietary.trim() !== "") {
      const rest = additionalDietary.split(", ").map((item) => item.trim());
      setDietary([...dietary, ...rest]);
    }
    if (allergiesInput.trim() !== "") {
      setAllergies(allergiesInput.split(",").map((item) => item.trim()));
    }
    try {
      const response = await axiosInstance.post("/preference", {
        clerkId: user?.id,
        dietaryPreference: dietary,
        allergies,
      });
      setUserPreference(response.data);
      router.replace("/");
    } catch (error) {
      alert(
        "An error occurred while saving your preferences. Please try again."
      );
    }
  };

  const skipPreference = async () => {
    try {
      const response = await axiosInstance.post("/preference", {
        clerkId: user?.id,
        dietaryPreference: [],
        allergies: [],
      });
      setUserPreference(response.data);
      router.replace("/");
    } catch (error) {
      alert("An error occurred while skipping preferences. Please try again.");
    }
  };
  return (
    <SafeAreaView className="w-full h-full  bg-white dark:bg-black-300">
      <View className="p-3">
        <Text className="font-rubik text-black-200">
          Personalize your recipes by telling us about yourself
        </Text>
      </View>

      {/* Preference */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* about preference  */}

          <View className="px-3 py-2 mb-5">
            <Text className="font-rubik-medium text-[1.2rem] dark:text-white ">
              Dietary Preference
            </Text>
            <View className="flex flex-wrap flex-row">
              {dietaryOption.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`flex-row  items-center justify-center border rounded-[25px] m-[5px] p-[10px] ${
                    dietary.includes(option)
                      ? "border-white"
                      : "border-black-200"
                  } min-w-[100px] `}
                  onPress={() => handleDietary(option)}
                >
                  <Text className="font-rubik text-[1rem] text-black-200 ">
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <Text className="font-rubik text-black-200">Any Others?</Text>
              <TextInput className="border border-black-200 text-black-200 p-2 m-2 rounded-xl text-lg" />
            </View>
          </View>
          <View className="px-3 py-2 mb-5">
            <Text className="font-rubik-medium text-[1.2rem] dark:text-white ">
              Allergies
            </Text>
            <TextInput
              className="border border-black-200 text-black-200 p-2 m-2 rounded-xl text-lg"
              value={allergiesInput}
              onChangeText={(text) => setAllergiesInput(text)}
              placeholder="Strawberry, peanuts"
              placeholderTextColor={"#666876"}
            />
          </View>
        </View>
      </ScrollView>
      <View className="flex flex-row justify-between items-center p-5">
        <View>
          <TouchableOpacity onPress={skipPreference}>
            <Text className="font-rubik text-black-300 dark:text-white underline">
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            className=" bg-primary-100 px-6 py-1 rounded-[10px]"
            onPress={handlePreference}
          >
            <Text className="font-rubik-medium text-white ">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DietaryPreference;
