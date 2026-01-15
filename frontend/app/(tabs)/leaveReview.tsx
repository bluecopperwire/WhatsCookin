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

const leaveReview = () => {
    const router = useRouter();
  return (
    <View className="flex-1 items-center">
        <View className="flex-row items-center mt-16 px-5">
            <Pressable onPress={() => router.push("/home")}>
                <Image
                source={icons.ArrowBlue}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
                />
            </Pressable>

            <Text className="flex-1 text-primary text-2xl font-semibold text-center mr-4">
                Leave a Review
            </Text>
        </View>

        <View className=" h-72 mt-5 items-center">
            <View className="bg-primary h-72 w-80 mt-5 items-center rounded-3xl">

            <View className="bg-white h-60 w-80 rounded-t-3xl overflow-hidden">
                <Image
                source={icons.Recommend1}
                className="w-full h-full"
                resizeMode="cover"
                />
            </View>

            <Text className="mt-2 text-white text-xl">Chicken Burger</Text>
            </View>
        </View>

        <View className= "h-14 mt-10 items-center flex-row justify-center">
            <TextInput className="text-yellow-400 text-2xl" placeholder="1-5" placeholderTextColor="rgba(250, 180, 40, 0.8)"
                keyboardType="number-pad" maxLength={1}

            ></TextInput>

            <Image
                    source={icons.RateStar}
                    style={{ width: 25, height: 25, marginLeft: 5}}
                    resizeMode="contain"
            />
        </View>

        <Text className=" text-primary text-lg">Your overall rating</Text>

        <View className="bg-primary h-52 w-96 rounded-3xl p-4 mt-2">
            <TextInput
            className="text-[#FFFDF9] text-xl" placeholder="Leave us a review!" placeholderTextColor="rgba(255, 253, 249, 0.8)"
            multiline
            ></TextInput>
        </View>

        <View className="h-20 w-full mt-5 flex-row">
            <TouchableOpacity
            style={{
                flex: 1,
                height: 60,
                marginTop: 5,
                width: "100%",
                alignItems: "center",
                }}
                onPress={() => router.push("/scanFinish")}
            >
                <Image
                source={icons.Cancel}
                style={{ width: 170, height: 60 }}
                resizeMode="contain"
                />
            </TouchableOpacity>

            <TouchableOpacity
            style={{
                flex: 1,
                height: 60,
                marginTop: 5,
                width: "100%",
                alignItems: "center",
                }}
                onPress={() => router.push("/scanFinish")}
            >
                <Image
                source={icons.Submit}
                style={{ width: 170, height: 60 }}
                resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
        

    </View>
  )
}

export default leaveReview

