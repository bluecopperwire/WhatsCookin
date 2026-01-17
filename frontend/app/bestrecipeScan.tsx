import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { icons } from "@/constants/icons";

type Recipe = {
  rcpID: string;
  name: string;
  img?: string | null;
  accID?: string | null;
  genre?: string | null;
  description?: string | null;
};

const bestrecipeScan = () => {
  const router = useRouter();
  const { ingredients: ingredientsParam } = useLocalSearchParams<{ ingredients?: string }>();
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse ingredients from the URL parameter
  const ingredients = ingredientsParam
    ? JSON.parse(decodeURIComponent(ingredientsParam))
    : [];

  // Use useRef to store the previous ingredients value and compare
  const prevIngredientsRef = useRef<[]>([]);

  useEffect(() => {
    console.log("Ingredients:", ingredients); // Debugging: Check the ingredients value
    
    // Skip the effect if ingredients haven't changed
    if (JSON.stringify(ingredients) === JSON.stringify(prevIngredientsRef.current)) {
      setLoading(false);
      return; // Skip if the ingredients are the same
    }

    // Update the ref with current ingredients value
    prevIngredientsRef.current = ingredients;

    if (ingredients.length === 0) {
      setLoading(false);
      setRecipes([]);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);

        const baseUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
        if (!baseUrl) {
          setRecipes([]);
          return;
        }

        // Convert the ingredients array to a query string for the API
        const query = ingredients.map((item: { name: string }) => item.name).join(",");
        const url = `${baseUrl}/recipes?ingredients=${encodeURIComponent(query)}`;

        console.log("Request URL:", url); // Debugging: Check the request URL

        const res = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          setRecipes([]);
          return;
        }

        const data = await res.json();
        console.log("Backend Response:", data); // Debugging: Check the backend response

        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      } catch (e) {
        console.error("Error fetching recipes:", e); // Debugging: Log any errors
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [ingredients]); // Re-run when ingredients change

  return (
    <View className="flex-1 h-56">
      <View className="flex-row">
        <Pressable onPress={() => router.push("/scanFinish")} className="mt-[64px] ml-5">
          <Image
            source={icons.ArrowBlue}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
            className="mt-2"
          />
        </Pressable>
        <Text className="text-primary text-2xl ml-28 font-semibold mt-16 leading-[55px]">
          Best Recipes
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {loading ? (
          <Text className="text-primary text-lg mt-6 ml-10">Loading...</Text>
        ) : recipes.length === 0 ? (
          <Text className="text-primary text-lg mt-6 ml-10">No recipes found.</Text>
        ) : (
          recipes.map((r) => {
            const imgSource =
              r.img && r.img.startsWith("http") ? { uri: r.img } : icons.Recommend1;

            const desc = (r.description ?? "").trim() || "No description available.";

            return (
              <Pressable
                key={r.rcpID}
                onPress={() =>
                  router.push({
                    pathname: "/recipe/[id]" as any,
                    params: { id: r.rcpID },
                  })
                }
              >
                <View className="flex-row h-60 items-center pl-10">
                  <View className="h-44 w-44 rounded-3xl overflow-hidden">
                    <Image
                      source={imgSource as any}
                      resizeMode="cover"
                      className="h-full w-full"
                    />
                  </View>

                  <View className="h-32 w-52 border border-primary rounded-r-2xl overflow-hidden">
                    <View className="flex-1 px-2 py-3 justify-between">
                      <Text
                        className="text-primary text-xl font-semibold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {r.name}
                      </Text>

                      <Text
                        className="text-primary text-lg"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {r.genre ? r.genre : "Recipe"}
                      </Text>

                      <Text
                        className="text-primary text-sm pr-1"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {desc}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default bestrecipeScan;
