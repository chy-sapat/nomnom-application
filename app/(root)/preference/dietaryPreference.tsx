import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import { all } from "axios";

const dietaryOption = [
  "Vegan",
  "Paleo",
  "Vegetarian",
  "Dairy-Free",
  "Gluten-Free",
  "Keto",
  "Non-Veg",
];
const cuisineOption = [
  "Nepalese",
  "Indian",
  "Thai",
  "Chinese",
  "Mexican",
  "Italian",
  "Korean",
];
const allergyOption = ["Penuts", "Milk", "Soy", "Sesame", "wheat"];

const dietaryPreference = () => {
  const [dietary, setDietary] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergiesInput, setAllergiesInput] = useState<string>("");

  const handleDietary = (option: string) => {
    if (dietary.includes(option)) {
      const newDietary = dietary.filter((opt) => opt !== option);
      setDietary(newDietary);
    } else {
      setDietary([...dietary, option]);
    }
  };

  const handleCuisine = (option: string) => {
    if (cuisine.includes(option)) {
      const newCuisine = cuisine.filter((opt) => opt !== option);
      setCuisine(newCuisine);
    } else {
      setCuisine([...cuisine, option]);
    }
  };

  const handleAllergies = (option: string) => {
    if (allergies.includes(option)) {
      const newAllergies = allergies.filter((opt) => opt !== option);
      setAllergies((prevState) => newAllergies);
    } else {
      setAllergies((prevState) => [...allergies, option]);
    }
  };

  const handlePreference = () => {
    if (allergiesInput !== "") {
      const extra = allergiesInput.split(",");
      setAllergies([...allergies, ...extra]);
    }
    console.log(dietary);
    console.log(cuisine);
    console.log(allergies);
  };
  return (
    <SafeAreaView className="w-full h-full  bg-white dark:bg-black-300">
      {/*Heading*/}
      <View className="flex flex-row justify-center w-full my-[2rem]">
        <Text className="font-rubik-bold text-[2rem] w-fit dark:text-white">
          NomNom
        </Text>
      </View>
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
            <View className="flex-wrap flex-row">
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
          </View>
          <View className="px-3 py-2 mb-5">
            <Text className="font-rubik-medium text-[1.2rem] dark:text-white ">
              Cuisine
            </Text>
            <View className="flex-wrap flex-row">
              {cuisineOption.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`flex-row  items-center justify-center border rounded-[25px] m-[5px] p-[10px] ${
                    cuisine.includes(option)
                      ? "border-white"
                      : "border-black-200"
                  } min-w-[100px] `}
                  onPress={() => handleCuisine(option)}
                >
                  <Text className="font-rubik text-[1rem] text-black-200">
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="px-3 py-2 mb-5">
            <Text className="font-rubik-medium text-[1.2rem] dark:text-white ">
              Allergies
            </Text>
            <View className="flex-wrap flex-row ">
              {allergyOption.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`flex-row  items-center justify-center border rounded-[25px] m-[5px] p-[10px] ${
                    allergies.includes(option)
                      ? "border-white"
                      : "border-black-200"
                  } min-w-[100px] `}
                  onPress={() => handleAllergies(option)}
                >
                  <Text className="font-rubik text-[1rem] text-black-200">
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View>
              <Text className="font-rubik text-black-200">Any Other</Text>
              <TextInput
                className="border border-black-200 text-black-200 p-2 m-2 rounded-xl text-lg"
                value={allergiesInput}
                onChangeText={(text) => setAllergiesInput(text)}
                placeholder="Strawberry, Walnuts"
                placeholderTextColor={"#666876"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex flex-row justify-between items-center p-5">
        <View>
          <TouchableOpacity>
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

export default dietaryPreference;
