import { ScrollView, Text, View } from "react-native";
import {Link} from 'expo-router';
import SearchBar from "@/components/SearchBar";
import { TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TextInput } from "react-native";
import { useIngredients } from "@/functions/useIngredients";

const recipe = () => {
    const router = useRouter();
  return (
    <View className="flex-1 h-56">
        <View className="flex-row items-center mt-16 px-5">
            <Pressable onPress={() => router.push("/home")}>
                <Image
                source={icons.ArrowBlue}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
                />
            </Pressable>

            <Text className="flex-1 text-primary text-2xl font-semibold text-center">
                Recipe
            </Text>

            <TouchableOpacity className="w-[24px] h-[24px] rounded-full overflow-hidden">
                <Image
                source={icons.Heart2}
                className="w-full h-full"
                resizeMode="cover"
                />
            </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            <View className="bg-[#F7B580] h-96 mt-10 rounded-3xl"></View>

            <Pressable onPress={() => router.push("/review")} className="bg-primary h-10 mt-10 rounded-3xl items-center justify-center">
                <Text className="text-white font-medium text-xl">Reviews</Text>
            </Pressable>
        
            <View className="mt-5 flex-row items-center px-5">
                <View className="bg-primary w-20 h-20 rounded-full overflow-hidden">
                    <Image
                    source={icons.Profile2}
                    className="w-full h-full"
                    resizeMode="cover"
                    />
                </View>

                <Text className="text-primary ml-4 text-lg">Ivan Valach</Text>
            </View>

            <View className="bg-primary h-[2px] mt-3"></View>

            <Text className="text-primary text-3xl mt-10 ml-5 font-semibold">Details</Text>

            <Text className="text-primary text-xl mt-2 ml-5 font-normal">Text</Text>

            <Text className="text-primary text-3xl mt-10 ml-5 font-semibold">Ingredients</Text>

            <Text className="text-primary text-xl mt-2 ml-5 font-normal">Text</Text>

            <Text className="text-primary text-3xl mt-10 ml-5 font-semibold">Steps</Text>

            <Text className="text-primary text-xl mt-2 ml-5 font-normal">Text</Text>

        </ScrollView>

    </View>
  )
}

export default recipe