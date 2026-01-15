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

const scan = () => {
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
            <Text className="text-primary text-2xl ml-20 font-semibold mt-16 leading-[55px]">Scan Ingredients</Text>
          </View>

      <View className="h-10 items-center justify-center">
        <View className="bg-tertiary h-5 w-3/4 rounded-lg"></View>
      </View>

      <Text className="ml-5 mt-5 text-primary text-4xl font-semibold">Upload a photo of the</Text>

      <Text className="ml-5 mt-3 text-primary text-4xl font-semibold">Ingredients</Text>

      <Text className="ml-5 mt-5 text-primary text-xl font-normal">Please group the ingredients available and</Text>

      <Text className="ml-5 mt-1 text-primary text-xl font-normal">take a photo to scan</Text>

      <View className=" h-60 mt-10 justify-center items-center">
        <Pressable className="bg-[#F7B580] h-60 w-5/6 justify-center items-center rounded-3xl">
          <Image
                  source={icons.Files}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                  className="mt-2"
              />
        </Pressable>
      </View>

      <View className="h-10 mt-5 justify-center items-center flex-row">
        <View className="bg-[#F7B580] h-[2px] w-40"></View>

        <Text className="text-[#F7B580] ml-3 mr-3 text-lg">or</Text>

        <View className="bg-[#F7B580] h-[2px] w-40"></View>
      </View>

      <TouchableOpacity
          style={{
            height: 60,
            marginTop: 5,
            width: "100%",
            alignItems: "center",
            }}
            
          >
            <Image
              source={icons.Camera}
              style={{ width: 320, height: 60 }}
              resizeMode="contain"
            />
      </TouchableOpacity>
            
      <TouchableOpacity
          style={{
            height: 60,
            marginTop: 5,
            width: "100%",
            alignItems: "center",
            }}
            onPress={() => router.push("/scanFinish")}
          >
            <Image
              source={icons.Continue}
              style={{ width: 320, height: 60 }}
              resizeMode="contain"
            />
      </TouchableOpacity>
    </View>

  )
}

export default scan