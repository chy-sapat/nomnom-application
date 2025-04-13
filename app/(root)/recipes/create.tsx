import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { Picker } from "@react-native-picker/picker";
import { colorScheme } from "nativewind";
import { DarkTheme } from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import axiosInstance from "@/utils/axios";


type RecipeCreateData = {
  title: string;
  description: string;
  label: string;
};

const Create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeCreateData>();

  const colorScheme = useColorScheme();
  const darkColor = colorScheme === 'dark' ? '#ffffff' : '#666876';


  const titleRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);
  const [ingredients, setIngredients] = useState<Array<string>>(["", "", ""]);
  const [directions, setDirections] = useState<Array<string>>(["", "", ""]);
  const [difficulty, setDifficulty] = useState();

  const addIngredients = () => {
    setIngredients([...ingredients, ""]);
  };

  const addIngredientsBelow = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index + 1, 0, "");
    setIngredients(newIngredients);
  };

  const updateIngredients = (ingredient: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = ingredient;
    setIngredients(newIngredients);
  };

  const removeIngredients = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const onSubmit:SubmitHandler<RecipeCreateData> = (data) => {
      console.log(data);
  };
  return (
    <SafeAreaView className="w-full h-full px-6 py-8 bg-white dark:bg-black-300">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="font-rubik-bold text-black-200 text-3xl dark:text-white">
          Create a new recipe
        </Text>
        <View className="flex gap-12 mt-6">
          {/* Upload Image Section */}
          <TouchableOpacity className="w-full h-60 flex justify-center items-center bg-black-100 rounded-2xl dark:bg-white">
            <Image
              source={icons.uploadImg}
              className="size-10"
              tintColor="#666876"
            />
            <Text className="font-rubik text-black-200">Add images</Text>
          </TouchableOpacity>
          <View className="flex gap-2">
            <Text className="ml-2 font-rubik-medium text-black-200 text-xl dark:text-white">
              TITLE
            </Text>
            <Controller
              control={control}
              rules={{ required: "title is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={titleRef}
                className="border rounded-2xl border-black-100 px-4 text-black-200 dark:text-white"
                placeholder="My best ever pea soup"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={darkColor}
                returnKeyType="next"
                onSubmitEditing={() => descriptionRef.current?.focus()}
                submitBehavior="submit"
              />
              )}
              name="title" 
            />
            {errors.title?.message && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.title.message as string}
                </Text>
              )}
          </View>
          <View className="flex gap-2">
            <Text className="ml-2 font-rubik-medium text-black-200 text-2xl dark:text-white">
              DESCRIPTION
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={descriptionRef}
                className="min-h-[100px] border rounded-2xl border-black-100 px-4 align-top text-black-200 font-rubik dark:text-white"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Write something about the recipe..."
                placeholderTextColor={darkColor}
                numberOfLines={4}
                multiline
              />
              )}
              name="description"  
            />
            {errors.description?.message && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.description.message as string}
                </Text>
              )}
            
          </View>
          {/* Ingredient Seciton */}
          <View className="flex gap-8">
            <Text className="ml-2 font-rubik-medium text-black-200 text-2xl dark:text-white">
              INGREDIENTS
            </Text>
            <View className="flex gap-2">
              {ingredients.map((ingredient, index) => (
                <View key={index} className="flex flex-row gap-2 items-center">
                  <TextInput
                    className="flex-1 border rounded-2xl border-black-100 px-4 text-black-200 font-rubik dark:text-white"
                    value={ingredient}
                    onChangeText={(text) => updateIngredients(text, index)}
                  />
                  <Menu>
                    <MenuTrigger>
                      <Image
                        source={icons.threeDots}
                        className="size-6"
                        tintColor={darkColor}
                      />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsWrapper: {
                          position: "absolute",
                          top: 25,
                          left: 50,
                          backgroundColor: "#ffffff",
                          borderRadius: 8,
                          padding: 8,
                          width: 150,
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 5,
                        },
                      }}
                    >
                      <MenuOption
                        customStyles={{
                          optionWrapper: {
                            padding: 8,
                          },
                        }}
                        onSelect={() => addIngredientsBelow(index)}
                      >
                        <Text className="font-rubik text-black-200 text-lg">
                          Add Ingredient
                        </Text>
                      </MenuOption>
                      <View className="h-[1px] bg-[#7f8487] rounded-full"></View>
                      <MenuOption
                        customStyles={{
                          optionWrapper: {
                            padding: 8,
                          },
                        }}
                        onSelect={() => removeIngredients(index)}
                        disabled={ingredient.length == 1}
                      >
                        <Text className="font-rubik text-black-200 text-lg">
                          Remove Ingredient
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              ))}
            </View>

            <View className="flex flex-row gap-4 justify-center items-center">
              <TouchableOpacity className="p-2 flex flex-row gap-2 items-center">
                <Image
                  source={icons.plus}
                  className="size-5"
                  tintColor={darkColor}
                />
                <Text className="font-rubik text-black-200 text-xl dark:text-white">
                  Section
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2 flex flex-row gap-2 items-center"
                onPress={addIngredients}
              >
                <Image
                  source={icons.plus}
                  className="size-5 "
                  tintColor={darkColor}
                />
                <Text className="font-rubik text-black-200 text-xl dark:text-white">
                  Ingredient
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Directions section */}
          <View className="flex gap-8">
            <Text className="ml-2 font-rubik-medium text-black-200 text-2xl dark:text-white">
              DIRECTIONS
            </Text>
            <View className="flex gap-4">
              {directions.map((direction, index) => (
                <View key={index} className="flex flex-row gap-2 items-center">
                  <Text className="size-12 text-center align-middle font-rubik-medium text-[1rem] bg-black-100 text-white rounded-full">
                    {index + 1}
                  </Text>
                  <TextInput
                    className="min-h-[100px] flex-1 border rounded-2xl border-black-100 px-4 text-black-200 font-rubik align-top dark:text-white"
                    numberOfLines={3}
                    multiline
                  />
                  <Menu>
                    <MenuTrigger>
                      <Image
                        source={icons.threeDots}
                        className="size-6"
                        tintColor={darkColor}
                      />
                    </MenuTrigger>
                    <MenuOptions
                      customStyles={{
                        optionsWrapper: {
                          position: "absolute",
                          top: 25,
                          left: 50,
                          backgroundColor: "#ffffff",
                          borderRadius: 8,
                          padding: 8,
                          width: 150,
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 5,
                        },
                      }}
                    >
                      <MenuOption
                        customStyles={{
                          optionWrapper: {
                            padding: 8,
                          },
                        }}
                        onSelect={() => {}}
                      >
                        <Text className="font-rubik text-black-200 text-lg">
                          Add Step
                        </Text>
                      </MenuOption>
                      <View className="h-[1px] bg-[#7f8487] rounded-full"></View>
                      <MenuOption
                        customStyles={{
                          optionWrapper: {
                            padding: 8,
                          },
                        }}
                        onSelect={() => {}}
                        disabled={direction.length == 1}
                      >
                        <Text className="font-rubik text-black-200 text-lg">
                          Remove Step
                        </Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              ))}
            </View>
            <View className="flex flex-row justify-center items-center">
              <TouchableOpacity className="p-2 flex flex-row gap-2 items-center">
                <Image
                  source={icons.plus}
                  className="size-5"
                  tintColor={darkColor}
                />
                <Text className="font-rubik text-black-200 text-xl dark:text-white">Steps</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Cooking Time Section */}
          <View className="flex flex-row justify-between items-center">
            <Text className="ml-2 font-rubik-medium  text-black-200 text-2xl dark:text-white">
              COOKING TIME
            </Text>
            <TouchableOpacity className="border border-black-100 rounded-[12px] px-10 py-2">
              <Text className="font-rubik text-black-200 dark:text-white">
                Set Cooking Time
              </Text>
            </TouchableOpacity>
          </View>
          {/* Serving Section */}
          <View className="flex flex-row gap-2 items-center">
            <Text className="ml-2 font-rubik-medium text-black-200 text-2xl dark:text-white">
              SERVINGS
            </Text>
            <TextInput
              className="min-w-12 ml-auto border rounded-2xl border-black-100 px-4 text-black-200 font-rubik dark:text-white"
              inputMode="numeric"
            />
            <Text className="font-rubik text-black-200 text-lg dark:text-white">person</Text>
          </View>
          {/* Difficulty Section */}
          <View>
            <Text className="ml-2 font-rubik-medium text-black-200 text-2xl dark:text-white">
              DIFFICULTY
            </Text>
            <Picker
              selectedValue={difficulty}
              onValueChange={(item, index) => setDifficulty(item)}
              style={{color:darkColor}}
            >
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Professional" value="Professional" />
            </Picker>
          </View>
          {/* Labels Section */}
          <View className="flex gap-4">
            <Text className="ml-2 font-rubik-medium text-black-200 text-2xl dark:text-white">
              LABELS
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                  className="border rounded-2xl border-black-100 px-4 text-black-200 font-rubik dark:text-white "
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                
              )}
              name="label" 
            />
            {errors.label?.message && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.label.message as string}
                </Text>
              )}
            <View></View>
          </View>
          <TouchableOpacity
            className="flex items-center justify-center bg-primary-100 py-4 rounded-2xl"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="font-rubik-medium text-white text-xl">
              Save & Publish
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
