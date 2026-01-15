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


const filter = () => {
    const router = useRouter();
    const { ingredients, addIngredient, removeIngredient, updateIngredient } = useIngredients();
  return (
    <View className="flex-1 bg-primary">
        <View className="flex-row h-32 mt-16">
            <Pressable onPress={() => router.push("/home")} className="mt-[64px] ml-5">
                <Image
                    source={icons.ArrowBack}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                    />
            </Pressable>
            <Text className="text-white text-5xl ml-2 font-semibold mt-14 leading-[55px]">Filter</Text>
        </View>
        <View className= "flex-1 bg-white w-full mt-5 rounded-[33px] overflow-hidden">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

            <Text className="text-primary ml-10 mt-10 font-semibold text-xl">Categories</Text>

            
            <View className="flex-row h-24 mt-5 px-12 pt-3">
                <Pressable className="bg-primary w-[50px] h-[70px] ml-3 rounded-[30px] justify-center items-center">
                    <Image
                        source={icons.Snacks}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                    </Pressable>
                <Pressable  className="bg-primary w-[50px] h-[70px] ml-3 rounded-[30px] justify-center items-center">
                    <Image
                        source={icons.Meals}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                </Pressable>

                <Pressable  className="bg-primary w-[50px] h-[70px] ml-3 rounded-[30px] justify-center items-center">
                    <Image
                        source={icons.Vegan}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                </Pressable>

                <Pressable  className="bg-primary w-[50px] h-[70px] ml-3 rounded-[30px] justify-center items-center">
                    <Image
                        source={icons.Desserts}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                    </Pressable>

                <Pressable  className="bg-primary w-[50px] h-[70px] ml-3 rounded-[30px] justify-center items-center">
                    <Image
                        source={icons.Drinks}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                </Pressable>
            </View>

            <View className="flex-row ml-12 mt-1">
                <Text className="text-primary text-base mt-auto ml-3">Snacks</Text>
                <Text className="text-primary text-base mt-auto ml-5">Savory</Text>
                <Text className="text-primary text-base ml-5 mt-auto">Vegan</Text>
                <Text className="text-primary text-base ml-7 mt-auto">Sweet</Text>
                <Text className="text-primary text-base ml-6 mt-auto">Drinks</Text>
            </View>

            <Text className="text-primary ml-10 mt-10 font-semibold text-xl">Ingredients</Text>

            {ingredients.map((item) => (
            <View key={item.id} className="flex-row h-20 pl-7 items-center">
                <Image
                source={icons.Dots}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                />

                <TextInput
                className="ml-3 w-20 h-12 bg-primary rounded-full text-center text-white"
                placeholder="Amt"
                placeholderTextColor="rgba(255, 255, 255, 0.60)"
                value={item.amt}
                onChangeText={(v) => updateIngredient(item.id, "amt", v)}
                />

                <TextInput
                className="ml-3 w-56 h-12 bg-primary rounded-full pl-4 text-white"
                placeholder="Ingredient..."
                placeholderTextColor="rgba(255, 255, 255, 0.60)"
                value={item.name}
                onChangeText={(v) => updateIngredient(item.id, "name", v)}
                />

                <Pressable
                onPress={() => removeIngredient(item.id)}
                className="w-12 h-12 bg-primary rounded-full items-center justify-center ml-2"
                >
                <Image
                    source={icons.Trash}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                />
                </Pressable>
            </View>
            ))}

            <View className="h-16 items-center justify-center">
                <TouchableOpacity onPress={() => addIngredient()} className="bg-tertiary rounded-full h-12 w-64 justify-center  items-center">
                    <Text className="font-medium text-white text-lg">+ Add Ingredient</Text>
                </TouchableOpacity>
            </View>

            <View className="h-16 items-center justify-center">
                <TouchableOpacity className="bg-tertiary rounded-full h-12 w-64 justify-center  items-center">
                    <Text className="font-medium text-white text-lg">Apply</Text>
                </TouchableOpacity>
            </View>

            </ScrollView>
           

        </View>
      
    </View>
  )
}

export default filter