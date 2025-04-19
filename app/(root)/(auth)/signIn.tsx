import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import icons from "@/constants/icons";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useColorScheme } from "nativewind";
import { useSignIn, useAuth } from "@clerk/clerk-expo";
import { useSSO } from "@clerk/clerk-expo";

type FormData = {
  emailUsername: string;
  password: string;
};
const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { startSSOFlow } = useSSO();

  const screenHeight = Dimensions.get("screen").height;

  const { getToken } = useAuth();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { colorScheme } = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    Keyboard.dismiss();
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: data.emailUsername.trim(),
        password: data.password.trim(),
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        ToastAndroid.show("Signed In Succefully", ToastAndroid.SHORT);
        router.replace("/profile");
      }
    } catch (error: any) {
      Alert.alert(`${error.message}. Please try again later!`);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }, []);

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
  return (
    <SafeAreaView className="w-full h-full flex gap-6 bg-white dark:bg-black-300 relative">
      {/* back-button */}
      <TouchableOpacity
        className="w-fit bg-white/50 absolute top-4 left-4 p-2 rounded-full z-50 "
        onPress={() => router.back()}
      >
        <Image
          source={icons.backArrow}
          tintColor="#191d31"
          className="size-8"
        />
      </TouchableOpacity>
      {/*Heading*/}
      <View
        className="flex justify-center items-center bg-primary-100 rounded-b-3xl"
        style={{ height: screenHeight / 6 }}
      >
        <Text className="font-rubik-bold text-5xl text-center w-fit text-white">
          NomNom
        </Text>
      </View>
      <ScrollView>
        <View className="flex gap-[2rem] px-8">
          <Text className="font-rubik-semibold mb-4 text-black-300 text-3xl text-center dark:text-white">
            Sign In
          </Text>
          {/* Sign in form input */}
          <View className="flex gap-[1.5rem]">
            {/* Username*/}
            <View>
              <Text className="font-rubik text-lg text-black-100 ml-2">
                Email/Username
              </Text>
              <Controller
                control={control}
                rules={{ required: "username is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={usernameRef}
                    className="px-3 py-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    submitBehavior="submit"
                    autoCapitalize="none"
                  />
                )}
                name="emailUsername"
              />

              {errors.emailUsername?.message && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.emailUsername.message as string}
                </Text>
              )}
            </View>

            {/* Password */}
            <View>
              <Text className="font-rubik text-lg text-black-100 ml-2">
                Password
              </Text>
              <View className="relative">
                <Controller
                  control={control}
                  rules={{ required: "password is required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      ref={passwordRef}
                      className="px-3 py-3 pr-12 text-lg text-black-100 border border-black-100 rounded-[10px]"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                      secureTextEntry={!showPassword}
                      returnKeyLabel="sign in"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      submitBehavior="submit"
                    />
                  )}
                  name="password"
                />
                {/* eye icon*/}
                <TouchableOpacity
                  className="flex justify-center items-center h-full absolute top-0 right-0 p-2"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Image
                    className="size-7"
                    source={
                      showPassword ? icons.HidePassword : icons.ShowPassword
                    }
                    tintColor={"#8C8E98"}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.password.message as string}
                </Text>
              )}
            </View>
          </View>

          {/* Sign in Button*/}
          <View className="flex gap-4 items-center">
            <TouchableOpacity
              className="flex items-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100"
              onPress={handleSubmit(onSubmit)}
            >
              {!loading ? (
                <Text className="font-rubik-medium text-white text-lg">
                  Sign In
                </Text>
              ) : (
                <ActivityIndicator size="small" color="#ffffff" />
              )}
            </TouchableOpacity>
            {/* Forget Password*/}
            <Link href="/forgotPassword">
              <Text className="font-rubik text-black-100 text-lg">
                Forgot Password?
              </Text>
            </Link>
          </View>

          {/* Sign in With*/}
          <View className="flex items-center gap-8">
            <Text className="font-rubik-light text-black-100 text-lg">Or</Text>

            {/*google link*/}
            <TouchableOpacity
              className="flex flex-row gap-2 w-full justify-center items-center border border-black-200 py-3 rounded-[12px]"
              onPress={googleSignIn}
            >
              <Image className="size-7" source={icons.googleIcon}></Image>
              <Text className="font-rubik-medium text-black-200 text-xl">
                Continue with Google
              </Text>
            </TouchableOpacity>
            {/* Sign up link*/}
            <Text className="font-rubik text-black-200 text-lg">
              Don't Have An Account? <Link href="/signUp">Sign Up</Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
