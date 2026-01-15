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

const scanFinish = () => {
  const router = useRouter();
  const { ingredients, removeIngredient, updateIngredient } = useIngredients();
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

      <Text className="ml-5 mt-5 text-primary text-4xl font-semibold">Scan Completed!</Text>

      <Text className="ml-5 mt-5 text-primary text-xl font-normal">Please check and finalize the ingredients</Text>

      <Text className="ml-5 mt-1 text-primary text-xl font-normal">detected below before proceeding to the</Text>

      <Text className="ml-5 mt-1 text-primary text-xl font-normal">recipes</Text>
      
      {ingredients.map((item) => (
        <View key={item.id} className="flex-row h-20 pl-5 items-center">
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

      {ingredients.map((item) => (
        <View key={item.id} className="flex-row h-20 pl-5 items-center">
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

      {ingredients.map((item) => (
        <View key={item.id} className="flex-row h-20 pl-5 items-center">
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

      {ingredients.map((item) => (
        <View key={item.id} className="flex-row h-20 pl-5 items-center">
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

      {ingredients.map((item) => (
        <View key={item.id} className="flex-row h-20 pl-5 items-center">
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

      <TouchableOpacity
        style={{
          height: 60,
          marginTop: 20,
          width: "100%",
          alignItems: "center",
          }}
          onPress={() => router.push("/scanFinish")}
        >
          <Image
            source={icons.Finish}
            style={{ width: 320, height: 60 }}
            resizeMode="contain"
          />
      </TouchableOpacity>

    </View>

  )
}

export default scanFinish