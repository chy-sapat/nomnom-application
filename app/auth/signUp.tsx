import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRef, useState } from "react";
import { Link } from "expo-router";
import icons from "@/constants/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-expo";

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

  const firstNameRef = useRef<TextInput | null>(null);
  const lastNameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };
  return (
    <SafeAreaView>
      {/*Heading*/}
      <KeyboardAvoidingView
        behavior="padding"
        className="w-full h-full p-12 flex gap-[2rem] dark:bg-black-300"
      >
        <Text className="font-rubik-bold text-[2rem] text-center w-fit text-black-300  dark:text-white">
          NomNom
        </Text>
        <View className="flex gap-4">
          <Text className="font-rubik-medium text-black-300 text-3xl dark:text-white">
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
                    className="px-3 text-lg text-black-100 border border-black-100 rounded-[10px]"
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
                    className="px-3 text-lg text-black-100 border border-black-100 rounded-[10px]"
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
                  className="px-3 text-lg text-black-100 border border-black-100 rounded-[10px]"
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
            <Controller
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={passwordRef}
                  className="px-3 text-lg text-black-100 border border-black-100 rounded-[10px]"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                  returnKeyType="next"
                  submitBehavior="submit"
                  autoCapitalize="none"
                />
              )}
              name="password"
            />
            {errors.password?.message && (
              <Text className="font-rubik text-red-500 mt-1">
                {errors.password.message}
              </Text>
            )}
          </View>
          <View>
            <Text className="font-rubik text-lg text-black-100 ml-2">
              Confirm Password
            </Text>
            <TextInput
              ref={confirmPasswordRef}
              className="px-3 text-lg text-black-100 border border-black-100 rounded-[10px]"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            className="flex items-center w-full border border-primary-100 px-10 py-3 rounded-[10px] bg-primary-100 "
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="font-rubik-medium dark:text-white">Sign up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex items-center gap-4">
          <Text className="font-rubik-light text-black-100 text-lg">Or</Text>
          <TouchableOpacity className="flex flex-row gap-2 w-full justify-center items-center border border-black-200 py-3 rounded-[12px]">
            <Image className="size-6" source={icons.googleIcon} />
            <Text className="font-rubik-medium text-black-200 text-lg">
              Continue with Google
            </Text>
          </TouchableOpacity>
          <Text className="font-rubik text-lg text-black-100 mt-4">
            Already have an acccoutn?{" "}
            <Link href="/auth/signIn" className="underline">
              Sign In
            </Link>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
