import { ScrollView, Text, View, TouchableOpacity, TextInput, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { icons } from "@/constants/icons";
import { useIngredients } from "@/functions/useIngredients";

const scanFinish = () => {
  const router = useRouter();

  const params = useLocalSearchParams<{ ingredients?: string }>();

  const {
    ingredients,
    removeIngredient,
    updateIngredient,
    setIngredientsFromScan,
  } = useIngredients();

  useEffect(() => {
    if (!params.ingredients) return;

    try {
      const scanned = JSON.parse(params.ingredients); // [{ name: "carrot" }, ...]
      setIngredientsFromScan(scanned);
    } catch (err) {
      console.log("Invalid ingredients param:", err);
    }
  }, [params.ingredients]);

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row">
          <Pressable onPress={() => router.push("/scan")} className="mt-[64px] ml-5">
            <Image
              source={icons.ArrowBlue}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
              className="mt-2"
            />
          </Pressable>
          <Text className="text-primary text-2xl ml-20 font-semibold mt-16 leading-[55px]">
            Scan Ingredients
          </Text>
        </View>

        <View className="h-10 items-center justify-center">
          <View className="bg-tertiary h-5 w-3/4 rounded-lg"></View>
        </View>

        <Text className="ml-5 mt-5 text-primary text-4xl font-semibold">Scan Completed!</Text>

        <Text className="ml-5 mt-5 text-primary text-xl font-normal">
          Please check and finalize the ingredients
        </Text>
        <Text className="ml-5 mt-1 text-primary text-xl font-normal">
          detected below before proceeding to the
        </Text>
        <Text className="ml-5 mt-1 text-primary text-xl font-normal">recipes</Text>

        {ingredients.map((item) => (
          <View key={item.id} className="flex-row h-20 pl-5 items-center">
            <Image source={icons.Dots} style={{ width: 20, height: 20 }} resizeMode="contain" />

            <TextInput
              className="ml-3 w-72 h-12 bg-primary rounded-full pl-4 text-white"
              placeholder="Ingredient..."
              placeholderTextColor="rgba(255, 255, 255, 0.60)"
              value={item.name}
              onChangeText={(v) => updateIngredient(item.id, "name", v)}
            />

            <Pressable
              onPress={() => removeIngredient(item.id)}
              className="w-12 h-12 bg-primary rounded-full items-center justify-center ml-2"
            >
              <Image source={icons.Trash} style={{ width: 20, height: 20 }} resizeMode="contain" />
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
          onPress={() => router.push("/bestrecipe")} // change if your next page is different
        >
          <Image source={icons.Finish} style={{ width: 320, height: 60 }} resizeMode="contain" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default scanFinish;
