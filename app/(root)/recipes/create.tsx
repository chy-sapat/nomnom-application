import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
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
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "nativewind";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import axiosInstance from "@/utils/axios";
import { Redirect, router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useUserStore } from "@/zustand/store";
import { TimerPickerModal } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import { getMimeType } from "@/utils/mimeType";

type RecipeCreateData = {
  title: string;
  description: string;
};

const Create = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeCreateData>();

  const { colorScheme, toggleColorScheme } = useColorScheme();
  const darkColor = colorScheme === "dark" ? "#ffffff" : "#666876";

  const styles = StyleSheet.create({
    dropDownOptions: {
      color: "#666876",
    },
  });

  const { isSignedIn } = useAuth();
  const { userData } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  const titleRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [ingredients, setIngredients] = useState<Array<string>>([""]);
  const [directions, setDirections] = useState<Array<string>>([""]);
  const [difficulty, setDifficulty] = useState("Beginner");
  const [servings, setServings] = useState(1);
  const [labelText, setLabelText] = useState("");
  const [labels, setLabels] = useState<Array<string>>([]);
  const [cookTime, setCookTime] = useState(0);

  const addIngredientsBelow = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index + 1, 0, "");
    setIngredients(newIngredients);
  };

  const addDirectionBelow = (index: number) => {
    const newDirections = [...directions];
    newDirections.splice(index + 1, 0, "");
    setDirections(newDirections);
  };

  const updateIngredients = (ingredient: string, index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = ingredient;
    setIngredients(newIngredients);
  };

  const updateDirections = (direction: string, index: number) => {
    const newDirections = [...directions];
    newDirections[index] = direction;
    setDirections(newDirections);
  };

  const removeIngredients = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const removeDirection = (index: number) => {
    if (directions.length > 1) {
      const newDirections = directions.filter((_, i) => i !== index);
      setDirections(newDirections);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      aspect: [16, 9],
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleAddLabel = () => {
    if (labelText.trim() !== "") {
      setLabels([...labels, labelText.trim()]);
      setLabelText("");
    }
  };

  const handleRemoveLabel = (index: number) => {
    const newLabels = labels.filter((_, i) => i !== index);
    setLabels(newLabels);
  };

  const formatTime = ({
    hours,
    minutes,
  }: {
    hours?: number;
    minutes?: number;
  }) => {
    return hours! * 60 + minutes!;
  };

  const onSubmit: SubmitHandler<RecipeCreateData> = async (data) => {
    setLoading((prevState) => !prevState);
    try {
      let finalImageUrl = imageUrl;
      if (imageUrl) {
        const mimeType = getMimeType(imageUrl);
        const formData = new FormData();
        formData.append("file", {
          uri: imageUrl,
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
        ingredients: ingredients,
        directions: directions,
        servings: servings,
        labels: labels,
        author: userData?._id,
        cookTime: cookTime,
        image: imageUrl ? finalImageUrl : "default_recipe_image.jpeg",
        difficulty,
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
      setLoading((prevState) => !prevState);
    }
  };

  if (!isSignedIn) return <Redirect href={"/profile"} />;
  return (
    <SafeAreaView className="w-full h-full bg-white dark:bg-black-300 relative">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-primary-100 pt-8 pb-4">
          <TouchableOpacity
            className="w-fit absolute top-4 left-4 p-2 rounded-full z-50 "
            onPress={() => router.back()}
          >
            <Image
              source={icons.backArrow}
              tintColor="#ffffff"
              className="size-10"
            />
          </TouchableOpacity>
          <Text className="font-rubik-bold text-center text-black-200 text-3xl dark:text-white">
            Create a new recipe
          </Text>
        </View>
        {/* Upload Image Section */}
        <TouchableOpacity
          onPress={pickImageAsync}
          className="w-full min-h-60 flex justify-center items-center gap-2 bg-black-100 dark:bg-white relative overflow-hidden"
        >
          {imageUrl ? (
            <>
              <Image
                source={{ uri: imageUrl }}
                className="w-full aspect-[16/9]"
                resizeMode="cover"
              />
              <View className="absolute bottom-2 right-4">
                <TouchableOpacity
                  className="p-2 bg-black border border-black-200 rounded-full"
                  onPress={() => {
                    Alert.alert(
                      "",
                      "Are you sure you want to remove this image?",
                      [
                        { text: "Cancel" },
                        {
                          text: "Remove",
                          onPress: () => setImageUrl(""),
                        },
                      ]
                    );
                  }}
                >
                  <Image
                    source={icons.deleteIcon}
                    className="size-4"
                    tintColor="#666876"
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Image
                source={icons.uploadImg}
                className="size-10"
                tintColor="#666876"
              />
              <Text className="font-rubik text-black-200 text-xl">
                Add Image
              </Text>
            </>
          )}
        </TouchableOpacity>
        <View className="flex gap-12 px-6 pb-12 mt-6">
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
                  className="border rounded-2xl border-black-100 px-3 py-3 text-black-200 dark:text-white"
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
            <Text className="ml-2 font-rubik-medium text-black-200 text-xl dark:text-white">
              DESCRIPTION
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <TextInput
                    ref={descriptionRef}
                    className="min-h-[100px] border rounded-2xl border-black-100 px-3 py-3 align-top text-black-200 font-rubik dark:text-white"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    defaultValue=""
                    placeholder="Write something about the recipe..."
                    placeholderTextColor={darkColor}
                    numberOfLines={4}
                    multiline
                  />
                  <Text className="px-4 text-right text-sm text-black-200 dark:text-white">
                    {value?.length || 0}/200
                  </Text>
                </View>
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
            <Text className="ml-2 font-rubik-medium text-black-200 text-xl dark:text-white">
              INGREDIENTS
            </Text>
            <View className="flex gap-4">
              {ingredients.map((ingredient, index) => (
                <View key={index} className="flex flex-row gap-2 items-center">
                  <View className="flex-1 flex gap-2">
                    <TextInput
                      className="border rounded-2xl border-black-100 px-3 py-3 text-black-200 font-rubik dark:text-white"
                      value={ingredient}
                      onChangeText={(text) => updateIngredients(text, index)}
                    />
                  </View>
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
                        disabled={ingredients.length == 1}
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
              <TouchableOpacity
                className="p-2 flex flex-row gap-2 items-center"
                onPress={() => setIngredients([...ingredients, ""])}
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
            <Text className="ml-2 font-rubik-medium text-black-200 text-xl dark:text-white">
              DIRECTIONS
            </Text>
            <View className="flex gap-4">
              {directions.map((direction, index) => (
                <View key={index} className="flex flex-row gap-2 items-center">
                  <Text className="size-12 text-center align-middle font-rubik-medium text-[1rem] bg-black-100 text-white rounded-full">
                    {index + 1}
                  </Text>
                  <TextInput
                    className="min-h-[80px] flex-1 border rounded-2xl border-black-100 px-3 py-3 text-black-200 font-rubik align-top dark:text-white"
                    onChangeText={(text) => updateDirections(text, index)}
                    numberOfLines={4}
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
                        onSelect={() => addDirectionBelow(index)}
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
                        onSelect={() => removeDirection(index)}
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
              <TouchableOpacity
                className="p-2 flex flex-row gap-2 items-center"
                onPress={() => setDirections([...directions, ""])}
              >
                <Image
                  source={icons.plus}
                  className="size-5"
                  tintColor={darkColor}
                />
                <Text className="font-rubik text-black-200 text-xl dark:text-white">
                  Steps
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Cooking Time Section */}
          <View className="flex flex-row justify-between items-center">
            <Text className="ml-2 font-rubik-medium  text-black-200 text-xl dark:text-white">
              COOKING TIME
            </Text>
            <TouchableOpacity
              className="border border-black-100 rounded-[12px] px-10 py-2"
              onPress={() => setShowTimer((prevState) => !prevState)}
            >
              <Text className="font-rubik text-black-200 dark:text-white">
                {cookTime ? cookTime : "Set Cooking Time"}
              </Text>
            </TouchableOpacity>
            <TimerPickerModal
              visible={showTimer}
              setIsVisible={setShowTimer}
              hideSeconds
              hourLabel="hr"
              minuteLabel="min"
              onConfirm={(pickedDuration) => {
                setCookTime(formatTime(pickedDuration));
                setShowTimer(false);
              }}
              onCancel={() => {
                setShowTimer(false);
              }}
              LinearGradient={LinearGradient}
              padHoursWithZero
              secondsPickerIsDisabled
              styles={{
                theme: colorScheme,
                pickerItem: {
                  fontFamily: "Rubik",
                },
                pickerLabel: {
                  right: -10,
                },
              }}
            />
          </View>
          {/* Serving Section */}
          <View className="flex flex-row gap-2 items-center">
            <Text className="ml-2 font-rubik-medium text-black-200 text-xl dark:text-white">
              SERVINGS
            </Text>
            <View className="flex flex-row items-center gap-2 ml-auto bg-black-100 p-1 rounded-full">
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
                className="font-rubik text-lg text-black-300 align-middle px-3 py-1"
                inputMode="numeric"
                maxLength={2}
                editable={false}
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
          {/* Difficulty Section */}
          <View>
            <Text className="ml-2 font-rubik-medium text-black-200 text-xl dark:text-white">
              DIFFICULTY
            </Text>
            <Picker
              selectedValue={difficulty}
              onValueChange={(item, index) => setDifficulty(item)}
              dropdownIconColor={"#666876"}
            >
              <Picker.Item
                style={styles.dropDownOptions}
                label="Beginner"
                value="Beginner"
              />
              <Picker.Item
                style={styles.dropDownOptions}
                label="Intermediate"
                value="Intermediate"
              />
              <Picker.Item
                style={styles.dropDownOptions}
                label="Professional"
                value="Professional"
              />
            </Picker>
          </View>
          {/* Labels Section */}
          <View className="flex gap-4">
            <Text className="ml-2 font-rubik-medium text-black-200 text-xl dark:text-white">
              LABELS
            </Text>
            <TextInput
              className="border rounded-2xl border-black-100 px-3 py-3 text-black-200 font-rubik dark:text-white"
              value={labelText}
              onChangeText={(text) => setLabelText(text)}
              onSubmitEditing={handleAddLabel}
              returnKeyType="done"
              submitBehavior="submit"
            />
            <View className="w-full flex-row flex-wrap gap-4">
              {labels.map((label, index) => (
                <View
                  key={index}
                  className="flex flex-row items-center gap-4 border border-black-200 rounded-full self-start p-2.5"
                >
                  <Text className="font-rubik text-lg text-black-200">
                    {label}
                  </Text>
                  <TouchableOpacity onPress={() => handleRemoveLabel(index)}>
                    <Image
                      source={icons.close}
                      className="size-4"
                      tintColor="#666876"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            className={`flex items-center justify-center ${
              loading ? "bg-primary-100/80" : "bg-primary-100"
            } py-4 rounded-2xl`}
            onPress={handleSubmit(onSubmit)}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="#ffffff" />
              </>
            ) : (
              <Text className="font-rubik-medium text-white text-xl">
                Save & Publish
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
