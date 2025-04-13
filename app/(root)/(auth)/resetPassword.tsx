import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'


const ResetPassword = () => {
  return (
    <SafeAreaView className='w-full h-full flex p-12 gap-[5rem]'>

        {/* Heading */}
        <View className='flex flex-row justify-center'>
            <Text className='font-rubik-bold text-[2rem]'>NomNom</Text>
        </View>

        {/* Reset password */}
        <View className='flex gap-[2rem]'>
            {/* Reset password and new password */}
            <View className='flex gap-[1rem]'>
                {/* Text Reset password */}
                <View>
                    <Text className='font-rubik-semibold text-[1.2rem]'>Reset Password</Text>
                </View>
                {/* New password */}
                <View >
                    <Text>New Password</Text>
                    <TextInput className='bg-white rounded-[10px]' />
                    
                    {/* eye icon*/}
                     <Image className="size-7 absolute right-3 bottom-2 fill-[black" source={icons.ShowPassword}></Image>
                </View>
                {/* Confirm password */}
                <View>
                    <Text>Confirm Password</Text>
                    <TextInput className='bg-white rounded-[10px]'/>

                    {/* eye icon*/}
                    <Image className="size-7 absolute right-3 bottom-2 fill-[black" source={icons.ShowPassword}></Image>
                </View>
            </View>
            {/* Reset button */}
            <View className='flex gap-[0.5rem] items-center'>
                <TouchableOpacity className='bg-gray-600 px-[1rem] py-[0.5rem] w-full rounded-[25px] flex items-center'>
                    <Text className='font-rubik'>Reset Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default ResetPassword