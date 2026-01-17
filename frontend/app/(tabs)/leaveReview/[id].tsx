import { Text, View, TouchableOpacity, TextInput, Image, Pressable, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useMemo } from "react";
import { icons } from "@/constants/icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const leaveReview = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id?: string }>();
  const rcpID = useMemo(() => (id ? String(id) : ""), [id]);

  const [rateStar, setRateStar] = useState<string>("");
  const [rateText, setRateText] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const submitReview = async () => {
    if (!rcpID) {
      Alert.alert("Missing recipe", "Recipe ID was not provided.");
      return;
    }

    const starNum = Number(rateStar);
    if (!Number.isFinite(starNum) || starNum < 1 || starNum > 5) {
      Alert.alert("Invalid rating", "Please enter a number from 1 to 5.");
      return;
    }

    const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
    if (!baseUrl) {
      Alert.alert("Missing API URL", "EXPO_PUBLIC_API_URL is not set.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${baseUrl}/rate/${encodeURIComponent(rcpID)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include" as any,
        body: JSON.stringify({
          rateStar: starNum,
          rateText: rateText,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        Alert.alert("Failed to submit", msg || `HTTP ${res.status}`);
        return;
      }

      Alert.alert("Submitted", "Your rating was submitted!");
      router.replace({ pathname: "/review/[id]" as any, params: { id: rcpID } });
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ alignItems: "center", paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center mt-16 px-5 w-full">
        <Pressable onPress={() =>
            router.replace({
              pathname: "/review/[id]" as any,
              params: { id: String(id) },
            })
          }
          >
          <Image source={icons.ArrowBlue} style={{ width: 30, height: 30 }} resizeMode="contain" />
        </Pressable>

        <Text className="flex-1 text-primary text-2xl font-semibold text-center mr-4">
          Leave a Review
        </Text>
      </View>

      <View className="h-72 mt-5 items-center">
        <View className="bg-primary h-72 w-80 mt-5 items-center rounded-3xl">
          <View className="bg-white h-60 w-80 rounded-t-3xl overflow-hidden">
            <Image source={icons.Recommend1} className="w-full h-full" resizeMode="cover" />
          </View>

          <Text className="mt-2 text-white text-xl">Recipe</Text>
        </View>
      </View>

      <View className="h-14 mt-10 items-center flex-row justify-center">
        <TextInput
          className="text-yellow-400 text-2xl"
          placeholder="1-5"
          placeholderTextColor="rgba(250, 180, 40, 0.8)"
          keyboardType="number-pad"
          maxLength={1}
          value={rateStar}
          onChangeText={setRateStar}
          returnKeyType="done"
        />

        <Image source={icons.RateStar} style={{ width: 25, height: 25, marginLeft: 5 }} resizeMode="contain" />
      </View>

      <Text className="text-primary text-lg">Your overall rating</Text>

      <View className="bg-primary h-52 w-96 rounded-3xl p-4 mt-2">
        <TextInput
          className="text-[#FFFDF9] text-xl"
          placeholder="Leave us a review!"
          placeholderTextColor="rgba(255, 253, 249, 0.8)"
          multiline
          value={rateText}
          onChangeText={setRateText}
          textAlignVertical="top"
        />
      </View>

      <View className="h-20 w-full mt-5 flex-row">
        <TouchableOpacity
          style={{ flex: 1, height: 60, marginTop: 5, width: "100%", alignItems: "center" }}
          onPress={() => router.back()}
          disabled={submitting}
        >
          <Image source={icons.Cancel} style={{ width: 170, height: 60, opacity: submitting ? 0.6 : 1 }} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, height: 60, marginTop: 5, width: "100%", alignItems: "center" }}
          onPress={submitReview}
          disabled={submitting}
        >
          <Image source={icons.Submit} style={{ width: 170, height: 60, opacity: submitting ? 0.6 : 1 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default leaveReview;
