import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, TouchableOpacity, Pressable, TextInput, Alert } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { signupRequest } from "@/functions/useFetch";

const Register = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      if (!username.trim() || !email.trim() || !password || !confirmPassword) {
        Alert.alert("Missing info", "Username, email, and password are required.");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Password mismatch", "Passwords do not match.");
        return;
      }

      // accLink = email as you said
      const msg = await signupRequest({
        accName: "",
        accUserName: username.trim(),
        accPass: password,
        accPresentation: "",
        accLink: email.trim(),
        imgID: "",
      });

      Alert.alert("Success", msg);
      router.replace("/loginpage");
    } catch (e: any) {
      Alert.alert("Signup failed", e?.message ?? "Signup failed");
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
          marginTop: 80,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: "500",
            letterSpacing: 2,
          }}
        >
          Welcome
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "300",
            letterSpacing: 2,
          }}
        >
          Create your account!
        </Text>

        {/* Username */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.30)",
            marginTop: 30,
            width: 300,
            height: 60,
            borderRadius: 13,
            paddingLeft: 10,
            paddingRight: 10,
            overflow: "hidden",
          }}
        >
          <Image
            source={icons.Username}
            style={{ width: 25, height: 25, marginRight: 10 }}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Username"
            placeholderTextColor="#EE6D06"
            value={username}
            onChangeText={setUsername}
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
            multiline={false}
            textAlignVertical="center"
          />
        </View>

        {/* Email */}
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
          <Image
            source={icons.Email}
            style={{ width: 25, height: 25, marginRight: 10 }}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#EE6D06"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
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
            multiline={false}
            textAlignVertical="center"
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
          <Image
            source={icons.Password}
            style={{ width: 25, height: 25, marginRight: 10 }}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#EE6D06"
            value={password}
            onChangeText={setPassword}
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
            multiline={false}
            textAlignVertical="center"
          />
        </View>

        {/* Confirm Password */}
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
          <Image
            source={icons.Password}
            style={{ width: 25, height: 25, marginRight: 10 }}
            resizeMode="contain"
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#EE6D06"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
            multiline={false}
            textAlignVertical="center"
          />
        </View>

        {/* Signup button */}
        <TouchableOpacity
          style={{
            height: 60,
            width: "100%",
            marginTop: 90,
            alignItems: "center",
            opacity: loading ? 0.6 : 1,
          }}
          onPress={onSignup}
          disabled={loading}
        >
          <Image source={icons.Signup} style={{ width: 300, height: 60 }} resizeMode="contain" />
        </TouchableOpacity>

        <Pressable
          style={{
            marginTop: 10,
            width: "80%",
            height: 30,
            alignItems: "center",
          }}
          onPress={() => router.push("/loginpage")}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginTop: 10,
              fontWeight: "300",
              letterSpacing: 2,
            }}
          >
            Have an account? Login!
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default Register;
