import { ScrollView, Text, View, Image, Pressable, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { icons } from "@/constants/icons";

type UserRecipe = {
  rcpID: string;
  name: string;
  img?: string; // can be imgID or full url depending on your backend
};

const profile = () => {
  const router = useRouter();
  const API_BASE = process.env.EXPO_PUBLIC_API_URL;

  const [recipes, setRecipes] = useState<UserRecipe[]>([]);

  // ✅ Load user recipes
  useEffect(() => {
    const load = async () => {
      if (!API_BASE) return;

      try {
        // get session user
        const meRes = await fetch(`${API_BASE}/me`, { credentials: "include" });
        if (!meRes.ok) return;

        const me = await meRes.json();
        const accID = me?.accID;
        if (!accID) return;

        // ⛔ You need an endpoint like: GET /recipes/user/{accID}
        // Update this URL to match your backend once added.
        const rRes = await fetch(`${API_BASE}/recipes/user/${accID}`, {
          method: "GET",
          credentials: "include",
        });

        if (!rRes.ok) {
          const t = await rRes.text();
          console.log("Failed to load recipes:", t);
          return;
        }

        const data = await rRes.json();
        setRecipes(data ?? []);
      } catch (e: any) {
        console.log(e?.message);
      }
    };

    load();
  }, [API_BASE]);

  const openRecipe = (id: string) => {
    // ✅ change this path if your details screen route is different
    router.push(`/recipe/${id}`);
    // or router.push({ pathname: "/recipeDetails", params: { id } })
  };

  const resolveRecipeImage = (img?: string) => {
    // If your API returns an imgID, display it via /images/{imgID}
    if (!img) return icons.Recommend1;
    if (img.startsWith("http")) return { uri: img };
    if (API_BASE) return { uri: `${API_BASE}/images/${img}` };
    return icons.Recommend1;
  };

  return (
    <View className="flex-1">
      <View className="h-36 flex-row items-center px-10 mt-12">
        <View className="bg-primary h-28 w-28 rounded-full overflow-hidden">
          <Image source={icons.Profile2} className="w-full h-full" resizeMode="cover" />
        </View>

        <View className="h-20 w-full mt-5 ml-3">
          <Text className="text-primary text-3xl font-semibold">Diane Russell</Text>
          <Text className="text-primary text-xl font-light">Details</Text>
        </View>
      </View>

      <View className="h-10 w-full flex-row items-center">
        <TouchableOpacity
          style={{ flex: 1, height: 60, width: "100%", alignItems: "center" }}
          onPress={() => router.push("/edit")}
        >
          <Image source={icons.Edit} style={{ width: 170, height: 60 }} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, height: 60, width: "100%", alignItems: "center" }}
          onPress={() => router.push("/addRecipe")}
        >
          <Image source={icons.Add} style={{ width: 170, height: 60 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <View className="px-5 mt-5">
        <Text className="text-primary text-2xl font-normal text-center">Recipe</Text>
        <View className="bg-tertiary h-1 mt-3 w-full" />
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-row flex-wrap gap-6 mt-7 justify-start">
          {recipes.length === 0 ? (
            <>
              <Pressable onPress={() => Alert.alert("No recipes yet", "Create a recipe first.")} className="w-48 rounded-3xl relative">
                <View className="bg-black h-48 w-48 rounded-3xl overflow-hidden z-10">
                  <Image source={icons.Recommend1} resizeMode="cover" className="h-full w-full" />
                </View>
                <View className="-mt-6 border border-primary rounded-b-3xl h-16 w-44 ml-2 items-center">
                  <Text className="text-primary mt-6 text-lg font-medium">Your Recipe</Text>
                </View>
              </Pressable>
            </>
          ) : (
            recipes.map((r) => (
              <Pressable key={r.rcpID} onPress={() => openRecipe(r.rcpID)} className="w-48 rounded-3xl relative">
                <View className="bg-black h-48 w-48 rounded-3xl overflow-hidden z-10">
                  <Image source={resolveRecipeImage(r.img)} resizeMode="cover" className="h-full w-full" />
                </View>

                <View className="-mt-6 border border-primary rounded-b-3xl h-16 w-44 ml-2 items-center">
                  <Text className="text-primary mt-6 text-lg font-medium" numberOfLines={1}>
                    {r.name}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
