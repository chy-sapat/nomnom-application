import { Link, router } from "expo-router";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import icons from "@/constants/icons";
import { recipes } from "@/constants/data";
import CardGroup from "@/components/CardGroup";
import { useColorScheme } from "nativewind";
import { useCallback, useState } from "react";

export default function Index() {
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView className="w-full h-full bg-white dark:bg-black-300 relative">
      <TouchableOpacity
        className="bg-primary-100 z-50 absolute bottom-3 right-3 p-4 rounded-full"
        onPress={() => router.push("/recipes/create")}
      >
        <Image source={icons.plus} className="size-8" tintColor="#ffffff" />
      </TouchableOpacity>
      <View className="w-full h-full">
        <View className="flex gap-9 px-4 py-8 rounded-b-3xl bg-primary-100">
          <View className="flex flex-row items-center justify-between">
            <View className="flex gap-1 items-start justify-center">
              <Text className="font-rubik-bold text-3xl text-white">
                Good Morning
              </Text>
              <Text className="font-rubik  text-white">Sapat Chaudhary</Text>
            </View>
            <TouchableOpacity>
              <Image
                source={icons.notification}
                className="size-8"
                tintColor="#ffffff"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="w-full px-2 py-3  rounded-xl flex flex-row justify-start items-center gap-2 bg-white"
            onPress={() =>
              router.push({ pathname: "/explore", params: { from: "index" } })
            }
          >
            <Image
              source={icons.search}
              className="size-6"
              tintColor="#666876"
            />
            <Text numberOfLines={1} className="flex-1 text-xl text-black-200">
              What do you want to cook?
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          className="w-full px-4 mt-2"
          contentContainerStyle={{
            rowGap: 8,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          <CardGroup title="Top Breakfast Recipes" data={recipes} />
          <CardGroup title="Popular Recipes" data={recipes} />
          <CardGroup title="Recommended For You" data={recipes} />
          <CardGroup title="Latest Recipes" data={recipes} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
