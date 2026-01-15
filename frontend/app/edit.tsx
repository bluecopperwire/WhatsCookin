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

const edit = () => {
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
            <Text className="text-primary text-2xl ml-28 font-semibold mt-16 leading-[55px]">Edit Profile</Text>
          </View>

        <View className= "h-40 items-center justify-center mt-5">
            <Pressable className="bg-primary h-28 w-28 rounded-full overflow-hidden">
                <Image
                    source={icons.Profile2}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </Pressable>

            <Text className="text-tertiary mt-1">Edit Photo</Text>
        </View>

        <Text className="text-primary font-semibold text-2xl ml-7 mt-3">Name</Text>

        <View className="bg-primary h-14 w-96 rounded-3xl pl-4 ml-7 mt-3">
            <TextInput
            className="text-[#FFFDF9] text-xl" placeholder="Name" placeholderTextColor="rgba(255, 253, 249, 0.8)"
            ></TextInput>
        </View>

        <Text className="text-primary font-semibold text-2xl ml-7 mt-3">Presentation</Text>

        <View className="bg-primary h-32 w-96 rounded-3xl pl-4 ml-7 mt-3">
            <TextInput
            className="text-[#FFFDF9] text-xl" placeholder="Details" placeholderTextColor="rgba(255, 253, 249, 0.8)"
            multiline
            ></TextInput>
        </View>

        <TouchableOpacity
             style={{
              height: 60,
              marginTop: 20,
              width: "100%",
              alignItems: "center",
              }}
              onPress={() => router.push("/profile")}
            >
              <Image
                source={icons.Save}
                style={{ width: 170, height: 60 }}
                resizeMode="contain"
              />
        </TouchableOpacity>

    </View>
  )
}

export default edit