import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Keyboard,
  Dimensions,
} from "react-native";
import { useRef, useState } from "react";
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
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [retypedPassword, setRetypedPassword] = useState("");
  const [retypedPasswordError, setRetypedPasswordError] = useState(false);

  const screenHeight = Dimensions.get("screen").height;

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.password !== retypedPassword) {
      setRetypedPasswordError(true);
      return;
    }
    if (!isLoaded) return;
    try {
      await signUp.create({
        firstName: data.firstname,
        lastName: data.lastname,
        emailAddress: data.email,
        password: data.password,
        username: `${data.firstname}${data.lastname}`.toLowerCase(),
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
    }
  };

  const onVerifyPress = async () => {
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
        if (response.status == 201) router.replace("/");
      }
    } catch (error: any) {
      console.log(error.errors?.[0]);
      Alert.alert(
        "Verification Error",
        error.errors?.[0]?.longMessage || "Something went wrong"
      );
    }
  };

  if (pendingVerification) {
    return (
      <SafeAreaView className="w-full h-full bg-white dark:bg-black-300 relative">
        <TouchableOpacity
          className="w-fit bg-black-100/20 absolute top-4 left-4 p-2 rounded-full dark:bg-white/20"
          onPress={() => setPendingVerification(false)}
        >
          <Image
            source={icons.backArrow}
            tintColor={colorScheme === "light" ? "#666876" : "#ffffff"}
            className="size-8"
          />
        </TouchableOpacity>
        <View className="w-full h-full px-12 py-24 flex gap-4">
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
            className="w-full border border-black-200 rounded-xl text-lg text-black-200 px-4"
            inputMode="numeric"
            maxLength={6}
          />

          <TouchableOpacity
            onPress={onVerifyPress}
            className="flex items-center w-full border border-primary-100 px-10 py-3 mt-8 rounded-[10px] bg-primary-100"
          >
            <Text className="font-rubik-medium text-white text-lg">Verify</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="relative">
      <TouchableOpacity
        className="w-fit absolute top-4 left-4 p-2 z-50 rounded-full bg-white/20"
        onPress={() => router.back()}
      >
        <Image
          source={icons.backArrow}
          tintColor={colorScheme === "light" ? "#666876" : "#ffffff"}
          className="size-8"
        />
      </TouchableOpacity>
      {/*Heading*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-full flex gap-[2rem] dark:bg-black-300"
        bounces={false}
      >
        <View
          className="flex justify-center items-center bg-primary-100 rounded-b-3xl"
          style={{ height: screenHeight / 6 }}
        >
          <Text className="font-rubik-bold text-5xl text-center w-fit text-white">
            NomNom
          </Text>
        </View>
        <View className="flex gap-4 p-8">
          <Text className="font-rubik-semibold mb-4 text-black-300 text-2xl dark:text-white">
            Sign Up
          </Text>
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
                    className={`px-3 text-lg text-black-100 border ${
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
                    className={`px-3 text-lg text-black-100 border ${
                      errors.lastname?.message
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
                name="lastname"
              />
              {errors.lastname?.message && (
                <Text className="font-rubik text-red-500 mt-1">
                  {errors.lastname.message}
                </Text>
              )}
            </View>
          </View>

          <View>
            <Text className="font-rubik text-lg text-black-100 ml-2">
              Email
            </Text>
            <Controller
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={emailRef}
                  className={`px-3 text-lg text-black-100 border ${
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
          <View>
            <Text className="font-rubik text-lg text-black-100 ml-2">
              Password
            </Text>
            <View className="relative">
              <Controller
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    ref={passwordRef}
                    className={`px-3 pr-12 text-lg text-black-100 border ${
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
            {errors.password?.message && (
              <Text className="font-rubik text-red-500 mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>
          <View className="relative">
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
                className={`px-3 text-lg text-black-100 border ${
                  retypedPasswordError ? "border-red-500" : "border-black-100"
                } rounded-[10px]`}
                autoCapitalize="none"
                secureTextEntry={!showPassword}
              />
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
            <Text className="font-rubik-medium text-white">Sign up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center gap-4 px-12">
          <Text className="font-rubik-light text-black-100 text-lg">Or</Text>
          <TouchableOpacity className="flex flex-row gap-2 w-full justify-center items-center border border-black-200 py-3 rounded-[12px]">
            <Image className="size-6" source={icons.googleIcon} />
            <Text className="font-rubik-medium text-black-200 text-lg">
              Continue with Google
            </Text>
          </TouchableOpacity>
          <Text className="font-rubik text-lg text-black-100 mt-4">
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
