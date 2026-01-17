import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity, Pressable, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { icons } from "@/constants/icons";
import { toList, parseSteps } from "@/functions/useInstructions";

type RecipeDetails = {
  rcpID: string;
  name: string;
  img?: string | null;
  accID?: string | null;
  genre?: string | null;
  description?: string | null;

  ingredients?: string[] | string | null;
  steps?: string[] | string | null;
  amount?: string[] | string | null;
};

type MeResponse = {
  accID?: string;
  username?: string;
};

const recipe = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecipeDetails | null>(null);

  const [me, setMe] = useState<MeResponse | null>(null);
  const [meLoading, setMeLoading] = useState(false);

  // ------------------ Fetch recipe ------------------
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
        if (!baseUrl || !id) {
          setData(null);
          return;
        }

        const url = `${baseUrl}/recipes/${encodeURIComponent(id)}`;
        const res = await fetch(url, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          setData(null);
          return;
        }

        const json = await res.json();
        setData(json);
        console.log("RAW STEPS:", json?.steps);
        console.log("RAW STEPS (stringified):", JSON.stringify(json?.steps));

      } catch (e) {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // ------------------ Fetch current session user (/me) ------------------
  useEffect(() => {
    const loadMe = async () => {
      try {
        const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
        if (!baseUrl) return;

        setMeLoading(true);

        const res = await fetch(`${baseUrl}/me`, {
          method: "GET",
          headers: { Accept: "application/json" },
          credentials: "include" as any,
        });

        if (!res.ok) {
          setMe(null);
          return;
        }

        const json = await res.json();
        setMe(json);
      } catch {
        setMe(null);
      } finally {
        setMeLoading(false);
      }
    };

    loadMe();
  }, []);

  // ------------------ Images ------------------
  const recipeImgSource = useMemo(() => {
    if (data?.img && typeof data.img === "string" && data.img.startsWith("http")) {
      return { uri: data.img };
    }
    return icons.Recommend1;
  }, [data?.img]);

  const displayedUserName = useMemo(() => {
    if (meLoading) return "Loading...";
    if (!data?.accID) return "Unknown User";

    if (me?.accID && me.accID === data.accID) return me.username ?? "You";

    return "Unknown User";
  }, [meLoading, me?.accID, me?.username, data?.accID]);

  const userImgSource = useMemo(() => {
    return icons.Profile2;
  }, []);

  // ------------------ Ingredients + Amount ------------------
  const ingredientsList = useMemo(() => toList(data?.ingredients, ","), [data?.ingredients]);
  const amountList = useMemo(() => toList(data?.amount, ","), [data?.amount]);

  const ingredientsWithAmount = useMemo(() => {
    if (!ingredientsList.length) return [];
    return ingredientsList.map((ing, idx) => {
      const amt = amountList[idx] ?? "";
      return { amt, ing };
    });
  }, [ingredientsList, amountList]);

  // ------------------ Steps (now reads || correctly) ------------------
  const stepsList = useMemo(() => parseSteps(data?.steps), [data?.steps]);

  const detailsText = useMemo(() => {
    if (loading) return "Loading...";
    if (!data) return "Recipe not found.";
    return (data.description ?? "").trim() || "No description available.";
  }, [loading, data]);

  return (
    <View className="flex-1 h-56">
      <View className="flex-row items-center mt-16 px-5">
        <Pressable onPress={() => router.push("/bestrecipe")}>
          <Image
            source={icons.ArrowBlue}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Pressable>

        <Text className="flex-1 text-primary text-2xl font-semibold text-center">
          Recipe
        </Text>

        <TouchableOpacity className="w-[24px] h-[24px] rounded-full overflow-hidden">
          <Image source={icons.Heart2} className="w-full h-full" resizeMode="cover" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="bg-[#F7B580] h-96 mt-10 rounded-3xl overflow-hidden">
          <Image
            source={recipeImgSource as any}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/review/[id]" as any,
              params: { id: String(id) },
            })
          }

          className="bg-primary h-10 mt-10 rounded-3xl items-center justify-center"
        >
          <Text className="text-white font-medium text-xl">Reviews</Text>
        </Pressable>

        <View className="mt-5 flex-row items-center px-5">
          <View className="bg-primary w-20 h-20 rounded-full overflow-hidden">
            <Image
              source={userImgSource as any}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <Text className="text-primary ml-4 text-lg">{displayedUserName}</Text>
        </View>

        <View className="bg-primary h-[2px] mt-3"></View>

        <Text
          className="text-tertiary text-4xl mt-6 ml-5 font-extrabold tracking-tight drop-shadow"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {loading ? "Loading..." : data?.name ?? "Recipe"}
        </Text>

        <View className="ml-5 mt-2 h-1 w-28 bg-tertiary rounded-full" />



        <Text className="text-tertiary text-3xl mt-10 ml-5 font-semibold"
          style={{
            textShadowColor: "rgba(0,0,0,0.20)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}>Details</Text>
        <Text className="text-primary text-xl mt-2 ml-5 font-normal whitespace-pre-line">
          {detailsText}
        </Text>

        <Text className="text-tertiary text-3xl mt-10 ml-5 font-semibold"
          style={{
            textShadowColor: "rgba(0,0,0,0.20)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}>Ingredients</Text>

        {loading ? (
          <Text className="text-primary text-xl mt-2 ml-5 font-normal">Loading...</Text>
        ) : !data || ingredientsWithAmount.length === 0 ? (
          <Text className="text-primary text-xl mt-2 ml-5 font-normal">—</Text>
        ) : (
          <View className="mt-2 ml-5">
            {ingredientsWithAmount.map((row, i) => (
              <View key={`${row.ing}-${i}`} className="flex-row mb-2 pr-5">
                <Text
                  className="text-primary text-xl font-normal"
                  style={{ width: 110 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {row.amt || "•"}
                </Text>

                <Text
                  className="text-primary text-xl font-normal flex-1"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {row.ing}
                </Text>
              </View>
            ))}
          </View>
        )}

        <Text className="text-tertiary text-3xl mt-10 ml-5 font-semibold"
        style={{
            textShadowColor: "rgba(0,0,0,0.20)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}>Steps</Text>

        {loading ? (
          <Text className="text-primary text-xl mt-2 ml-5 font-normal">Loading...</Text>
        ) : !data || stepsList.length === 0 ? (
          <Text className="text-primary text-xl mt-2 ml-5 font-normal">—</Text>
        ) : (
          <View className="mt-2 ml-5 pr-5">
            {stepsList.map((step, i) => (
              <Text key={`${i}-${step}`} className="text-primary text-xl font-normal mb-4">
                {i + 1}. {step}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default recipe;
