import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./global.css";
import { StatusBar } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { useEffect } from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return (
    <>
      <MenuProvider>
        <ClerkProvider tokenCache={tokenCache}>
          <Stack screenOptions={{ headerShown: false }} />
        </ClerkProvider>
      </MenuProvider>
    </>
  );
}
