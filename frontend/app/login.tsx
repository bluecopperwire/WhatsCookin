import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import {Link} from 'expo-router';
import { TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";



const login = () => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#FAB428", "#F49017", "#EE6D06"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <View
      style={{
      height: 470,
      marginTop: 20,
      width: "100%",
      alignItems: "center",
      }}>
      <Image
        source={icons.Logo}
        style={{ width: 600, height: 600 }}
        resizeMode="contain"
      />
    </View>

    <TouchableOpacity
     style={{
      height: 60,
      width: "100%",
      marginTop: 30,
      alignItems: "center",
      }}
      onPress={() => router.push("/loginpage")}  
    >
      <Image
        source={icons.Login}
        style={{ width: 300, height: 60 }}
        resizeMode="contain"
      />
    </TouchableOpacity>

    <TouchableOpacity
     style={{
      height: 60,
      marginTop: 20,
      width: "100%",
      alignItems: "center",
      }}
      onPress={() => router.push("/register")}
    >
      <Image
        source={icons.Signup}
        style={{ width: 300, height: 60 }}
        resizeMode="contain"
      />
    </TouchableOpacity>

    </LinearGradient>
  ) 
}

export default login