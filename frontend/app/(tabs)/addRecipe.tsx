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
import { useInstructions } from "@/functions/useInstructions";

const addRecipe = () => {
  const router = useRouter();
  const { instructions, addInstruction, removeInstruction, updateInstruction } = useInstructions();
  const { ingredients, addIngredient, removeIngredient, updateIngredient } = useIngredients();
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
                Create Recipe
            </Text>
        </View>
      
        <View className="h-10 w-full flex-row items-center mt-10">
          <TouchableOpacity
          style={{
              flex: 1,
              height: 60,
              width: "100%",
              alignItems: "center",
              }}
              onPress={() => router.push("/edit")}
          >
              <Image
              source={icons.Publish}
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
              onPress={() => router.push("/addRecipe")}
          >
              <Image
              source={icons.Delete}
              style={{ width: 170, height: 60 }}
              resizeMode="contain"
              />
          </TouchableOpacity>
      </View>
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
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

        <Text className="text-primary font-semibold text-2xl ml-7 mt-3">Title</Text>

        <View className="bg-primary h-14 w-96 rounded-3xl pl-4 ml-7 mt-3">
              <TextInput
              className="text-[#FFFDF9] text-xl" placeholder="Name" placeholderTextColor="rgba(255, 253, 249, 0.8)"
              ></TextInput>
          </View>

          <Text className="text-primary font-semibold text-2xl ml-7 mt-5">Description</Text>

          <View className="bg-primary h-32 w-96 rounded-3xl pl-4 ml-7 mt-3">
              <TextInput
              className="text-[#FFFDF9] text-xl" placeholder="Details" placeholderTextColor="rgba(255, 253, 249, 0.8)"
              multiline
              ></TextInput>
        </View>

        <Text className="text-primary font-semibold text-2xl ml-7 mt-5 mb-2">Ingredients</Text>

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
          
          <Text className="text-primary font-semibold text-2xl ml-7 mt-5 mb-2">Instructions</Text>

          {instructions.map((item, index) => (
            <View key={item.id} className="flex-row h-20 pl-7 items-center">
              <Image source={icons.Dots} style={{ width: 20, height: 20 }} resizeMode="contain" />

              <TextInput
                className="ml-3 w-80 h-12 bg-primary rounded-full pl-4 text-white"
                placeholder={`Instruction ${index + 1}`}
                placeholderTextColor="rgba(255, 255, 255, 0.60)"
                value={item.text}
                onChangeText={(v) => updateInstruction(item.id, v)}
              />

              <Pressable
                onPress={() => removeInstruction(item.id)}
                className="w-12 h-12 bg-primary rounded-full items-center justify-center ml-2"
              >
                <Image source={icons.Trash} style={{ width: 20, height: 20 }} resizeMode="contain" />
              </Pressable>
            </View>
          ))}

          <View className="h-16 items-center justify-center">
            <TouchableOpacity
              onPress={addInstruction}
              className="bg-tertiary rounded-full h-12 w-64 justify-center items-center"
            >
              <Text className="font-medium text-white text-lg">+ Instruction</Text>
            </TouchableOpacity>
          </View>

      </ScrollView>

    </View>


  )
}

export default addRecipe