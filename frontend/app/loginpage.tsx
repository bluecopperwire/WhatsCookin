import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, TouchableOpacity, Pressable, TextInput, Alert } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { loginRequest } from "@/functions/useFetch"; // adjust path if different

const LoginPage = () => {
  const router = useRouter();

  const [accUserName, setAccUserName] = useState<string>("");
  const [accPass, setAccPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      if (!accUserName.trim() || !accPass) {
        Alert.alert("Missing info", "Please enter your username and password.");
        return;
      }

      const msg = await loginRequest(accUserName.trim(), accPass);

      router.replace("/home");
    } catch (e: any) {
      Alert.alert("Login failed", e?.message ?? "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={{ color: "white", fontSize: 64, fontWeight: "500", letterSpacing: 2 }}>
          Welcome
        </Text>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "300", letterSpacing: 2 }}>
          Login to your account
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.30)",
            marginTop: 50,
            width: 300,
            height: 60,
            borderRadius: 13,
            paddingLeft: 10,
            paddingRight: 10,
            overflow: "hidden",
          }}
        >
          <Image source={icons.Username} style={{ width: 25, height: 25, marginRight: 10 }} resizeMode="contain" />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#EE6D06"
            value={accUserName}
            onChangeText={setAccUserName}
            autoCapitalize="none"
            autoCorrect={false}
            style={{
              flex: 1,
              minWidth: 0,
              color: "white",
              fontSize: 20,
              fontWeight: "300",
              letterSpacing: 1,
              paddingVertical: 0,
            }}
            numberOfLines={1}
          />
        </View>

        {/* Password */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.30)",
            marginTop: 20,
            width: 300,
            height: 60,
            borderRadius: 13,
            paddingLeft: 10,
            paddingRight: 10,
            overflow: "hidden",
          }}
        >
          <Image source={icons.Password} style={{ width: 25, height: 25, marginRight: 10 }} resizeMode="contain" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#EE6D06"
            value={accPass}
            onChangeText={setAccPass}
            secureTextEntry
            style={{
              flex: 1,
              minWidth: 0,
              color: "white",
              fontSize: 20,
              fontWeight: "300",
              letterSpacing: 1,
              paddingVertical: 0,
            }}
            numberOfLines={1}
          />
        </View>

        {/* Login button */}
        <TouchableOpacity
          style={{ height: 60, width: "100%", marginTop: 160, alignItems: "center", opacity: loading ? 0.6 : 1 }}
          onPress={onLogin}
          disabled={loading}
        >
          <Image source={icons.Login} style={{ width: 300, height: 60 }} resizeMode="contain" />
        </TouchableOpacity>

        <Pressable
          style={{ marginTop: 10, width: "80%", height: 30, alignItems: "center" }}
          onPress={() => router.push("/register")}
        >
          <Text style={{ color: "white", fontSize: 16, marginTop: 10, fontWeight: "300", letterSpacing: 2 }}>
            Don't have an account? Register!
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default LoginPage;
