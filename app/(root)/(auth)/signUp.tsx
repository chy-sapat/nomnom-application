import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import icons from "@/constants/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import axiosInstance from "@/utils/axios";
import { useColorScheme } from "nativewind";

interface UserData {
  fullName: string;
  username: string;
  email: string;
}
type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { getToken } = useAuth();
  const { colorScheme } = useColorScheme();
  const [userData, setUserData] = useState<UserData | null>(null);

  const firstNameRef = useRef<TextInput | null>(null);
  const lastNameRef = useRef<TextInput | null>(null);
  const usernameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [retypedPassword, setRetypedPassword] = useState("");
  const [retypedPasswordError, setRetypedPasswordError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const screenHeight = Dimensions.get("screen").height;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== retypedPassword) {
      setRetypedPasswordError(true);
      return;
    }
    setIsLoading(true);
    if (!isLoaded) return;
    try {
      await signUp.create({
        firstName: data.firstname,
        lastName: data.lastname,
        emailAddress: data.email,
        password: data.password,
        username: data.username,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setUserData({
        fullName: `${data.firstname} ${data.lastname}`,
        username: `${data.firstname}${data.lastname}`.toLowerCase(),
        email: data.email,
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

  const onVerifyPress = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        const token = await getToken();
        const response = await axiosInstance.post(
          "/user/create",
          {
            fullname: userData?.fullName,
            userName: userData?.username,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 201) {
          setIsLoading(false);
          router.replace("/");
        }
      }
    } catch (error: any) {
      console.log(error.errors?.[0]);
      Alert.alert(
        "Verification Error",
        error.errors?.[0]?.longMessage || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="w-full h-full bg-white dark:bg-black-300">
        <View className="w-full h-full px-8 py-8 flex gap-4">
          <TouchableOpacity
            className="mb-8"
            onPress={() => setPendingVerification(false)}
          >
            <Image
              source={icons.backArrow}
              tintColor={colorScheme === "light" ? "#191d31" : "#fff"}
              className="size-8"
            />
          </TouchableOpacity>
          <Text className="font-rubik-bold text-3xl text-black-300 dark:text-white">
            Email Verification
          </Text>
          <Text className="font-rubik text-lg text-black-200">
            We have sent verification code to {userData?.email}
          </Text>
          <TextInput
            value={code}
            placeholder="code"
            placeholderTextColor="#8C8E98"
            onChangeText={(code) => setCode(code)}
            className="w-full border border-black-200 rounded-xl text-lg text-black-200 p-3"
            inputMode="numeric"
            maxLength={6}
          />
          <TouchableOpacity
            onPress={onVerifyPress}
            className="flex items-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="font-rubik-medium text-white text-lg">
                Verify
              </Text>
            )}
          </TouchableOpacity>
          <Text className="font-rubik text-lg text-black-200 text-center">
            Didn’t receive the code?{" "}
            <TouchableOpacity onPress={() => setPendingVerification(false)}>
              <Text className="font-rubik-semibold text-primary-100 underline">
                Resend
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="relative">
      {/*Heading*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-full flex gap-[2rem] dark:bg-black-300"
        bounces={false}
      >
        <View className="flex items-center gap-4 p-8">
          <View className="w-full flex items-center gap-8">
            <TouchableOpacity className="mr-auto" onPress={() => router.back()}>
              <Image
                source={icons.backArrow}
                tintColor={colorScheme === "light" ? "#191d31" : "#fff"}
                className="size-8"
              />
            </TouchableOpacity>
            <Text className="font-rubik-semibold mb-4 text-center text-black-300 text-3xl dark:text-white">
              Sign Up
            </Text>
          </View>
          <View className="flex flex-row gap-4">
            <View className="flex-1">
              <Text className="font-rubik text-lg text-black-100 ml-2">
                First Name
              </Text>
              <Controller
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={firstNameRef}
                    className={`p-3 text-lg text-black-100 border ${
                      errors.firstname?.message
                        ? "border-red-500"
                        : "border-black-100"
                    } rounded-[10px]`}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    onSubmitEditing={() => lastNameRef.current?.focus()}
                    returnKeyType="next"
                    submitBehavior="submit"
                  />
                )}
                name="firstname"
              />
              {errors.firstname?.message && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.firstname.message}
                </Text>
              )}
            </View>
            <View className="flex-1">
              <Text className="font-rubik text-lg text-black-100 ml-2">
                Last Name
              </Text>
              <Controller
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={lastNameRef}
                    className={`p-3 text-lg text-black-100 border ${
                      errors.lastname?.message
                        ? "border-red-500"
                        : "border-black-100"
                    } rounded-[10px]`}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    returnKeyType="next"
                    onSubmitEditing={() => usernameRef.current?.focus()}
                    submitBehavior="submit"
                  />
                )}
                name="lastname"
              />
              {errors.lastname?.message && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.lastname.message}
                </Text>
              )}
            </View>
          </View>

          <View className="w-full">
            <Text className="font-rubik text-lg text-black-100 ml-2">
              Username
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Username is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={usernameRef}
                  className={`p-3 text-lg text-black-100 border ${
                    errors.username?.message
                      ? "border-red-500"
                      : "border-black-100"
                  } rounded-[10px]`}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  submitBehavior="submit"
                />
              )}
              name="username"
            />
            {errors.username?.message && (
              <Text className="font-rubik text-red-500 mt-1">
                {errors.username.message}
              </Text>
            )}
          </View>

          <View className="w-full">
            <Text className="font-rubik text-lg text-black-100 ml-2">
              Email
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={emailRef}
                  className={`p-3 text-lg text-black-100 border ${
                    errors.email?.message
                      ? "border-red-500"
                      : "border-black-100"
                  } rounded-[10px]`}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  submitBehavior="submit"
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email?.message && (
              <Text className="font-rubik text-red-500 mt-1">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View className="w-full">
            <Text className="font-rubik text-lg text-black-100 ml-2">
              Password
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
                  source={
                    showPassword ? icons.HidePassword : icons.ShowPassword
                  }
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
          <View className="w-full relative">
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
                  source={
                    showPassword ? icons.HidePassword : icons.ShowPassword
                  }
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
          <TouchableOpacity
            className="flex items-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100 "
            onPress={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="font-rubik-medium text-white">Sign up</Text>
            )}
          </TouchableOpacity>
          <Text className="font-rubik text-xl text-black-100 mt-4">
            Already have an acccout?{" "}
            <Link href="/signIn" className="underline">
              Sign In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
