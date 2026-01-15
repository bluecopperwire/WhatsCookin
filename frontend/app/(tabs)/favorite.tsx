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

const favorite = () => {
  const router = useRouter();
  return (

    <View className="flex-1">
      <View className=" h-36 flex-row items-center px-10 mt-12">
        <View className="bg-primary h-28 w-28 rounded-full overflow-hidden">
          <Image
            source={icons.Profile2}
            className="w-full h-full"
            resizeMode="cover"
            />
        </View>

        <View className=" h-20 w-full mt-5 ml-3">
          <Text className="text-primary text-3xl font-semibold">Diane Russell</Text>

          <Text className="text-primary text-xl font-light">Details</Text>
        </View>
      </View>

      <View className="h-10 w-full flex-row items-center">
          <TouchableOpacity
          style={{
              flex: 1,
              height: 60,
              width: "100%",
              alignItems: "center",
              }}
              onPress={() => router.push("/scanFinish")}
          >
              <Image
              source={icons.Edit}
              style={{ width: 170, height: 60 }}
              resizeMode="contain"
              />
          </TouchableOpacity>

          <TouchableOpacity
          style={{
              flex: 1,
              height: 60,
              width: "100%",
              alignItems: "center",
              }}
              onPress={() => router.push("/scanFinish")}
          >
              <Image
              source={icons.Add}
              style={{ width: 170, height: 60 }}
              resizeMode="contain"
              />
          </TouchableOpacity>
      </View>

      <View className="h-10 flex-row items-center px-5 mt-5">
        <Pressable className= "h-10 w-28 ml-7">
          <Text className="text-primary text-2xl font-normal text-center">Recipe</Text>

        </Pressable>

        <Pressable className="h-10 w-28 ml-auto mr-9">
          <Text className="text-primary text-2xl font-normal text-center">Favorite</Text>
          <View className="bg-tertiary h-1 mt-3"></View>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="h-72 mt-7 flex-row gap-6">

          <View className="w-48 rounded-3xl relative">
          
            <View className="bg-black h-48 w-48 rounded-3xl overflow-hidden z-10">
              <Image
                source={icons.Recommend1}
                resizeMode="cover"
                className="h-full w-full"
              />
            </View>
                   
            <Pressable className="-mt-6 border border-primary rounded-b-3xl h-16 w-44 ml-2 items-center">
              <Text className="text-primary mt-6 text-lg font-medium">Chicken Burger</Text>
            </Pressable>
          </View>

          <View className="w-48 rounded-3xl relative">
          
            <View className="bg-black h-48 w-48 rounded-3xl overflow-hidden z-10">
              <Image
                source={icons.Recommend1}
                resizeMode="cover"
                className="h-full w-full"
              />
            </View>
                   
            <Pressable className="-mt-6 border border-primary rounded-b-3xl h-16 w-44 ml-2 items-center">
              <Text className="text-primary mt-6 text-lg font-medium">Chicken Burger</Text>
            </Pressable>
          </View>
        </View>

      </ScrollView>

    </View>
  )
}

export default favorite
