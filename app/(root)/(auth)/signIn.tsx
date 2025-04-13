import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import icons from "@/constants/icons";
import axiosInstance from "@/utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useColorScheme } from "nativewind";
import { useSignIn } from "@clerk/clerk-expo";

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
        identifier: data.emailUsername,
        password: data.password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      }
    } catch (error: any) {
      Alert.alert(`${error.message}. Please try again later!`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="w-full h-full px-12 py-16 flex gap-[5rem] bg-white dark:bg-black-300 relative">
      {/* back-button */}
      <TouchableOpacity
        className="w-fit bg-black-100/20 absolute top-4 left-4 p-2 rounded-full dark:bg-white/20"
        onPress={() => router.back()}
      >
        <Image
          source={icons.backArrow}
          tintColor={colorScheme === "light" ? "#666876" : "#ffffff"}
          className="size-8"
        />
      </TouchableOpacity>
      {/*Heading*/}
      <View className="flex flex-row justify-center w-full">
        <Text className="font-rubik-bold text-[2rem] w-fit text-black-300 dark:text-white">
          NomNom
        </Text>
      </View>
      <View className="flex gap-[2rem]">
        {/* Sign in form input */}
        <View className="flex gap-[1.5rem]">
          {/* Username*/}
          <View>
            <Text className="font-rubik text-lg text-black-100 ml-2">
              Username/Email
            </Text>
            <Controller
              control={control}
              rules={{ required: "username is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={usernameRef}
                  className="px-3 text-lg text-black-100 border border-black-100 rounded-[10px] dark:bg-black-300"
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
                    className="px-3 pr-12 text-lg text-black-100 border border-black-100 rounded-[10px]"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
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
          <TouchableOpacity className="flex flex-row gap-2 w-full justify-center items-center border border-black-200 py-3 rounded-[12px]">
            <Image className="size-6" source={icons.googleIcon}></Image>
            <Text className="font-rubik-medium text-black-200 text-lg">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign up link*/}
      <View className="flex flex-row justify-center gap-[5px] mt-auto ">
        <Text className="font-rubik text-black-200">
          Don't Have An Account?
        </Text>
        <Link href="/signUp">
          <Text className="font-rubik text-black-200">Sign Up</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
