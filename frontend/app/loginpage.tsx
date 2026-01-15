import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, View } from "react-native";
import {Link} from 'expo-router';
import { TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { TextInput } from 'react-native';

const loginpage = () => {
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
      height: 400,
      marginTop: 200,
      width: "100%",
      alignItems: "center",
      }}
    >
    <Text style={{
        color: "white",
        fontSize: 64,
        fontWeight: 500,
        letterSpacing: 2

    }}>Welcome</Text>
    <Text style={{
        color: "white",
        fontSize: 20,
        fontWeight: 300,
        letterSpacing: 2
    }}>Login to your account</Text>

    <View
    style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.30)",
        marginTop: 50,
        width: 300, 
        height: 60,
        borderRadius: 13,
        paddingLeft: 10
    }}  >
        <Image
                source={icons.Username}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
        <TextInput
        style={{
            color: "white", 
            fontSize: 20,
            fontWeight: 300,
            letterSpacing: 2
        }}
        placeholder="Username"
        placeholderTextColor="#EE6D06">

        </TextInput>
    </View>
    <View
    style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.40)",
        marginTop: 20,
        width: 300, 
        height: 60,
        borderRadius: 13,
        paddingLeft: 10
    }}  >
        <Image
                source={icons.Password}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
        <TextInput
        style={{
            color: "white", 
            fontSize: 20,
            fontWeight: 300,
            letterSpacing: 2
        }}
        placeholder="Password"
        placeholderTextColor="#EE6D06">
        </TextInput>
    </View>

     <TouchableOpacity
         style={{
          height: 60,
          width: "100%",
          marginTop: 160,
          alignItems: "center",
          }}
          onPress={() => router.push("/home")}  
        >
          <Image
            source={icons.Login}
            style={{ width: 300, height: 60 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Pressable style={{
            marginTop: 10,
            width: "80%",
            height: 30,
            alignItems: "center"
        }} onPress={() => router.push("/register")} >
            <Text style={{
            color: "white",
            fontSize: 16,
            marginTop: 10,
            fontWeight: 300,
            letterSpacing: 2
            }}>Don't have an account? Register!</Text>
        </Pressable>
    </View>
    </LinearGradient>   
  )
}

export default loginpage