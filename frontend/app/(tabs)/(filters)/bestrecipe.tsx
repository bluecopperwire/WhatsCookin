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

const bestrecipe = () => {
  const router = useRouter();
  return (
    
    <View className="flex-1 h-56">
      <View className="flex-row">
        <Pressable onPress={() => router.push("/home")} className="mt-[64px] ml-5">
        <Image
            source={icons.ArrowBlue}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
            className="mt-2"
        />
        </Pressable>
        <Text className="text-primary text-2xl ml-28 font-semibold mt-16 leading-[55px]">Best Recipes</Text>
      </View>


    <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
      <View className="flex-row h-60 items-center pl-10">
        <View className="h-44 w-44 rounded-3xl overflow-hidden">
          <Image
            source={icons.Recommend1}
            resizeMode="cover"
            className="h-full w-full"
          />
        </View>

        <View className="h-32 w-52 border border-primary rounded-r-2xl">
          <Text className="text-primary text-xl mt-5 ml-2 font-semibold">Chicken Curry</Text>

          <Text className="text-primary text-lg mt-2 ml-2">By Chef Josh Ryan</Text>

          <Pressable className="flex-row h-10 items-center mt-auto pb-5 pl-2">
            <Image
            source={icons.Gold}
            style={{ width: 13, height: 13 }}
            resizeMode="contain"
            className="mt-2"
            />

            <Text className="text-[#FAB428] ml-2 mt-[2px]">Time</Text>

            <Text className="text-[#FAB428] ml-16 mt-[2px]">Rate</Text>

            <Image
            source={icons.GoldStar}
            style={{ width: 13, height: 13 }}
            resizeMode="contain"
            className="mt-2 ml-2"
            />
          </Pressable>

        </View>
      </View>
    </ScrollView>

    </View>

  )
}

export default bestrecipe