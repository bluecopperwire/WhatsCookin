import { Text, View, TouchableOpacity, TextInput, Image, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { icons } from "@/constants/icons";

const edit = () => {
  const router = useRouter();
  const API_BASE = process.env.EXPO_PUBLIC_API_URL;

  const [name, setName] = useState("");
  const [presentation, setPresentation] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAccount = async () => {
    if (!API_BASE) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/account`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        Alert.alert("Failed to load profile", text || `HTTP ${res.status}`);
        return;
      }

      const data = await res.json();

      // ✅ This will replace placeholder values with actual saved values
      setName(data?.accUserName ?? "");
      setPresentation(data?.accPresentation ?? "");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const handleSave = async () => {
    if (!API_BASE) {
      Alert.alert("Missing API URL", "EXPO_PUBLIC_API_URL is not set.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(`${API_BASE}/account`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          imgID: null,
          accUserName: name,
          accPresentation: presentation,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        Alert.alert("Update failed", text || `HTTP ${res.status}`);
        return;
      }

      Alert.alert("Saved", "Account updated successfully");
      router.push("/profile");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (!API_BASE) {
      Alert.alert("Missing API URL", "EXPO_PUBLIC_API_URL is not set.");
      return;
    }

    try {
      setLoggingOut(true);

      const res = await fetch(`${API_BASE}/logout`, {
        method: "POST",
        credentials: "include",
      });

      const text = await res.text();

      if (!res.ok) {
        Alert.alert("Logout failed", text || `HTTP ${res.status}`);
        return;
      }

      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <View className="flex-1 h-56">
      <View className="flex-row">
        <Pressable onPress={() => router.push("/profile")} className="mt-[64px] ml-5">
          <Image
            source={icons.ArrowBlue}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
            className="mt-2"
          />
        </Pressable>
        <Text className="text-primary text-2xl ml-28 font-semibold mt-16 leading-[55px]">
          Edit Profile
        </Text>
      </View>

      <View className="h-40 items-center justify-center mt-5">
        <Pressable className="bg-primary h-28 w-28 rounded-full overflow-hidden">
          <Image source={icons.Profile2} className="w-full h-full" resizeMode="cover" />
        </Pressable>

        <Text className="text-tertiary mt-1">{loading ? "Loading..." : "Edit Photo"}</Text>
      </View>

      <Text className="text-primary font-semibold text-2xl ml-7 mt-3">Name</Text>

      <View className="bg-primary h-14 w-96 rounded-3xl pl-4 ml-7 mt-3">
        <TextInput
          className="text-[#FFFDF9] text-xl"
          placeholder="Name"
          placeholderTextColor="rgba(255, 253, 249, 0.8)"
          value={name}
          onChangeText={setName}
        />
      </View>

      <Text className="text-primary font-semibold text-2xl ml-7 mt-3">Presentation</Text>

      <View className="bg-primary h-32 w-96 rounded-3xl pl-4 ml-7 mt-3">
        <TextInput
          className="text-[#FFFDF9] text-xl"
          placeholder="Details"
          placeholderTextColor="rgba(255, 253, 249, 0.8)"
          multiline
          value={presentation}
          onChangeText={setPresentation}
        />
      </View>

      <TouchableOpacity
        style={{
          height: 60,
          marginTop: 20,
          width: "100%",
          alignItems: "center",
          opacity: saving ? 0.6 : 1,
        }}
        disabled={saving}
        onPress={handleSave}
      >
        <Image source={icons.Save} style={{ width: 170, height: 60 }} resizeMode="contain" />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          height: 50,
          marginTop: 10,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          opacity: loggingOut ? 0.6 : 1,
        }}
        disabled={loggingOut}
        onPress={handleLogout}
      >
        <Text className="text-primary text-lg font-semibold">
          {loggingOut ? "Logging out..." : "Log Out"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default edit;
