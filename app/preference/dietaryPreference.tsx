import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'


const dietaryOption=[
    'None',
    'Vegan',
    'Paleo',
    'Vegetarian',
    'Dairy-Free',
    'Gluten-Free',
    'Keto']

const dietaryPreference = () => {
    const[selected, setSelected]=useState('None');
    return (
        <SafeAreaView className="w-full h-full p-12 flex gap-[4rem]">
            {/*Heading*/}
            <View className="flex flex-row justify-center w-full">
                <Text className="font-rubik-bold text-[2rem] w-fit">NomNom</Text>
            </View>

            {/* Preference */}
            <View>
                {/* about preference  */}
                <View >
                    <Text className='font-rubik-medium'>Personalize your recipes by telling us about yourself</Text>
                </View>
                <View>
                    <View className='mt-[2rem] mb-[0.5rem]'>
                        <Text className='font-rubik-medium text-[1.5rem]'>Dietary Preferences</Text>
                    </View>
                    <View className='flex-wrap flex-row '>
                        {dietaryOption.map((option) => 
                        (
                            <TouchableOpacity key={option} className={`flex-row items-center bg-white rounded-[25px] my-[1rem] mx-[5px] p-[10px] 
                                ${selected === option ? "bg-gray-300 border-gray-600" : "border-gray-300"}`}
                                onPress={() => setSelected(option)}>
                                <Text className="text-[1rem]">{option}</Text>
                                {/* <Image source={images.nophoto}></Image> */}
                            </TouchableOpacity>
                        ))
                    }
                    </View>
                </View>
            </View>
        </SafeAreaView>
  )
}

export default dietaryPreference