import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import icons from "@/constants/icons";
import { colorScheme, useColorScheme } from "nativewind";
import { useUser } from "@clerk/clerk-expo";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}) => {
  const { user, isSignedIn } = useUser();
  return (
    <View>
      {isSignedIn && title == "profile" ? (
        <Image
          source={{ uri: user.imageUrl }}
          className="size-9 rounded-full"
        />
      ) : (
        <Image
          source={icon}
          tintColor={`${focused ? "#E55934" : "#d9d9d9"}`}
          className="size-7"
        />
      )}
    </View>
  );
};

const TabsLayout = () => {
  const { colorScheme } = useColorScheme();
  const { user, isSignedIn } = useUser();
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
          height: 48,
          backgroundColor: colorScheme === "light" ? "#ffffff" : "#191d31",
          paddingBlock: 32,
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
            <TabIcon title="home" focused={focused} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="explore" focused={focused} icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="save" focused={focused} icon={icons.save} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="profile" focused={focused} icon={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
