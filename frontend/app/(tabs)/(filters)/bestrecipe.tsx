import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { icons } from "@/constants/icons";

type Recipe = {
  rcpID: string;
  name: string;
  img?: string | null;
  accID?: string | null;
  genre?: string | null;
  description?: string | null;
};

const bestrecipe = () => {
  const router = useRouter();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const rawQuery = "salt, oil, water, Chicken, garlic, onion, Chicken, flour, milk";

  const ingredients = rawQuery
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
        if (!baseUrl) {
          setRecipes([]);
          return;
        }

        const requests = ingredients.map(async (ing) => {
          const url = `${baseUrl}/recipes?ingredients=${encodeURIComponent(ing)}`;

          const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" },
          });

          if (!res.ok) return [] as Recipe[];

          const data = await res.json();
          return Array.isArray(data) ? (data as Recipe[]) : ([] as Recipe[]);
        });

        const results = await Promise.all(requests);
        const merged = results.flat();

        const map = new Map<string, Recipe>();
        for (const r of merged) {
          if (r?.rcpID && !map.has(r.rcpID)) map.set(r.rcpID, r);
        }

        setRecipes(Array.from(map.values()).slice(0, 10));
      } catch (e) {
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

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

                  {/* ✅ fixed height card + hide overflow */}
                  <View className="h-32 w-52 border border-primary rounded-r-2xl overflow-hidden">
                    {/* ✅ controlled vertical layout so it never grows */}
                    <View className="flex-1 px-2 py-3 justify-between">
                      {/* ✅ NAME: force 1 line so it never pushes content down */}
                      <Text
                        className="text-primary text-xl font-semibold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {r.name}
                      </Text>

                      {/* ✅ GENRE: also keep to 1 line */}
                      <Text
                        className="text-primary text-lg"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {r.genre ? r.genre : "Recipe"}
                      </Text>

                      {/* ✅ DESCRIPTION: keep to 1 line (or set to 2 if you want) */}
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

export default bestrecipe;
