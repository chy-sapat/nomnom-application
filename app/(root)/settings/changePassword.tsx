import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import icons from "@/constants/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import axiosInstance from "@/utils/axios";
import { useColorScheme } from "nativewind";

type FormData = {
  password: string;
};

const changePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [retypedPassword, setRetypedPassword] = useState("");
  const [retypedPasswordError, setRetypedPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== retypedPassword) {
      setRetypedPasswordError(true);
      return;
    }
    setIsLoading(true);
    if (!isLoaded) return;
    try {
      await signUp.create({
        password: data.password,
      });
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.errors?.[0]?.longMessage ||
          "Something went wrong. Please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="w-full h-full px-4 py-8 bg-white dark:bg-black-300">
      <View className="flex flex-row items-center gap-8 mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.backArrow}
            tintColor={colorScheme == "light" ? "#666876" : "#ffffff"}
            className="size-10"
          />
        </TouchableOpacity>
        <Text className="font-rubik-medium text-black-300 dark:text-white text-3xl">
          Change Password
        </Text>
      </View>
      <View>
        {/* current password  */}
        <View className="py-3">
          <Text className="font-rubik text-lg text-black-100 ml-2">
            Current Password
          </Text>
          <View className="relative">
            <TextInput
              className={`p-3 text-lg text-black-100 border ${
                retypedPasswordError ? "border-red-500" : "border-black-100"
              } rounded-[10px]`}
            />
            <TouchableOpacity
              className="flex justify-center items-center h-full absolute top-0 right-2 p-2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                className="size-7"
                source={showPassword ? icons.HidePassword : icons.ShowPassword}
                tintColor={"#8C8E98"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* New password */}
        <View className="w-full py-3">
          <Text className="font-rubik text-lg text-black-100 ml-2">
            New Password
          </Text>
          <View className="relative">
            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={passwordRef}
                  className={`p-3 pr-12 text-lg text-black-100 border ${
                    errors.password?.message
                      ? "border-red-500"
                      : "border-black-100"
                  } rounded-[10px]`}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  returnKeyType="next"
                  submitBehavior="submit"
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                />
              )}
              name="password"
            />
            <TouchableOpacity
              className="flex justify-center items-center h-full absolute top-0 right-2 p-2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                className="size-7"
                source={showPassword ? icons.HidePassword : icons.ShowPassword}
                tintColor={"#8C8E98"}
              />
            </TouchableOpacity>
          </View>
          {errors.password?.message && (
            <Text className="font-rubik text-red-500 mt-1">
              {errors.password.message}
            </Text>
          )}
        </View>
        {/* confirm Password */}
        <View className="w-full relative py-3">
          <Text className="font-rubik text-lg text-black-100 ml-2">
            Confirm Password
          </Text>
          <View>
            <TextInput
              ref={confirmPasswordRef}
              value={retypedPassword}
              onChangeText={(e) => {
                retypedPasswordError && setRetypedPasswordError(false);
                setRetypedPassword(e);
              }}
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
              submitBehavior="submit"
              className={`p-3 text-lg text-black-100 border ${
                retypedPasswordError ? "border-red-500" : "border-black-100"
              } rounded-[10px]`}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              className="flex justify-center items-center h-full absolute top-0 right-2 p-2"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                className="size-7"
                source={showPassword ? icons.HidePassword : icons.ShowPassword}
                tintColor={"#8C8E98"}
              />
            </TouchableOpacity>
          </View>
          {retypedPasswordError && (
            <Text className="font-rubik text-red-500 mt-1">
              Password does not match
            </Text>
          )}
        </View>
      </View>
      {/* sumbit */}
      <TouchableOpacity
        className="flex items-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100 "
        onPress={handleSubmit(onSubmit)}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text className="font-rubik-medium text-white">Submit</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default changePassword;
