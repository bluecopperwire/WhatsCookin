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

const review = () => {
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
                Reviews
            </Text>
        </View>

        <View className="bg-primary h-64 mt-5 ml-3 mr-3 rounded-3xl items-center justify-center">
            <View className="flex-row h-64 w-96 items-center px-5">
                <View className="bg-black h-44 w-44 rounded-3xl overflow-hidden">
                    <Image
                    source={icons.Recommend1}
                    className="w-full h-full"
                    resizeMode="cover"
                    />
                </View>

                <View className="h-44 w-48">
                    <Text className="text-white text-2xl font-semibold mt-10 ml-3">Chicken Burger</Text>

                    <View className="flex-row mt-2 h-10">
                        
                        <Text className="text-white text-xl font-medium ml-3">5</Text>

                        <Image
                        source={icons.RateStar}
                        style={{ width: 20, height: 20, marginLeft: 5}}
                        resizeMode="contain"
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            height: 60,
                            width: "100%",
                            alignItems: "center",
                            }}
                            onPress={() => router.push("/leaveReview")}
                        >
                        <Image
                        source={icons.Review}
                        style={{ width: 150, height: 60 }}
                        resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

            </View>

        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
            <Text className="text-tertiary mt-10 ml-5 text-xl">Comments</Text>

            <View className="h-44 mt-1 pt-5">
                <View className=" flex-row h-16 items-center pl-5">
                    <View className=" w-14 h-14 rounded-full overflow-hidden">
                    <Image
                    source={icons.Profile2}
                    className="w-full h-full"
                    resizeMode="cover"
                    />
                </View>

                <Text className="text-primary ml-4 text-xl">Ivan Valach</Text>
                </View>

                <Text className="text-primary text-lg mt-2 ml-5 font-normal">Review</Text>

                <View className="flex-row h-10 mt-2 items-center">
                    <Text className="text-yellow-400 text-xl font-medium ml-5 mt-1">5</Text>

                    <Image
                    source={icons.RateStar}
                    style={{ width: 17, height: 17, marginLeft: 5}}
                    resizeMode="contain"
                    />
                </View>

                <View className="bg-tertiary w-[323px] h-[2px] ml-4 mt-4"></View>
            </View>
            


        </ScrollView>

    </View>
  )
}

export default review