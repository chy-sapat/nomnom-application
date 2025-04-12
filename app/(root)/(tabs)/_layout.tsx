import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import icons from "@/constants/icons";
import { colorScheme, useColorScheme } from "nativewind";

const TabIcon = ({ focused, icon }: { focused: boolean; icon: any }) => {
  return (
    <View>
      <Image
        source={icon}
        tintColor={`${focused ? "#E55934" : "#d9d9d9"}`}
        className="size-6"
      />
    </View>
  );
};

const TabsLayout = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: colorScheme === "light" ? "#ffffff" : "#191d31",
          paddingBlock: 16,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.plus} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
