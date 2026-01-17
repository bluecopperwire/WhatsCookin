import { ScrollView, Text, View } from "react-native";
import { TouchableOpacity, Pressable, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { icons } from "@/constants/icons";

type AvgRating = {
  rcpID: string;
  averageStar: number;
  totalRatings: number;
};

type RatingItem = {
  ratingID?: string;
  rcpID?: string;
  accID?: string;
  rateStar?: number;
  rateText?: string | null;
  // if your backend returns these:
  accName?: string | null;
  accImg?: string | null;
  createdAt?: string;
};

const review = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>(); // ✅ this is rcpID

  const [loading, setLoading] = useState(true);
  const [avg, setAvg] = useState<AvgRating | null>(null);
  const [ratings, setRatings] = useState<RatingItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
        if (!baseUrl || !id) {
          setAvg(null);
          setRatings([]);
          return;
        }

        // ✅ fetch average + count
        const avgRes = await fetch(`${baseUrl}/get-rating/${encodeURIComponent(String(id))}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (avgRes.ok) {
          const avgJson = await avgRes.json();
          setAvg(avgJson);
        } else {
          setAvg(null);
        }

        // ✅ fetch all ratings/comments
        const allRes = await fetch(`${baseUrl}/get-all/${encodeURIComponent(String(id))}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (allRes.ok) {
          const allJson = await allRes.json();
          setRatings(Array.isArray(allJson) ? allJson : []);
        } else {
          setRatings([]);
        }
      } catch (e) {
        setAvg(null);
        setRatings([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // UI-friendly values
  const avgStarText = useMemo(() => {
    if (!avg) return "0";
    // show 1 decimal if needed
    const n = Number(avg.averageStar ?? 0);
    return Number.isFinite(n) ? (Math.round(n * 10) / 10).toString() : "0";
  }, [avg]);

  const headerStar = useMemo(() => {
    // you currently show just "5" and a star
    return loading ? "—" : avgStarText;
  }, [loading, avgStarText]);

  return (
    <View className="flex-1 h-56">
      <View className="flex-row items-center mt-16 px-5">
        <Pressable onPress={() =>
            router.push({
              pathname: "/recipe/[id]" as any,
              params: { id: String(id) },
            })
          }>
          <Image
            source={icons.ArrowBlue}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Pressable>

        <Text className="flex-1 text-primary text-2xl font-semibold text-center">
          Reviews
        </Text>
      </View>

      <View className="bg-primary h-64 mt-5 ml-3 mr-3 rounded-3xl items-center justify-center">
        <View className="flex-row h-64 w-96 items-center px-5">
          <View className="bg-black h-44 w-44 rounded-3xl overflow-hidden">
            <Image
              source={icons.Recommend1}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="h-44 w-48">
            {/* keep your title style; you can replace this later with fetched recipe name if you want */}
            <Text className="text-white text-2xl font-semibold mt-10 ml-3">
              {loading ? "Loading..." : "Recipe"}
            </Text>

            <View className="flex-row mt-2 h-10">
              <Text className="text-white text-xl font-medium ml-3">{headerStar}</Text>

              <Image
                source={icons.RateStar}
                style={{ width: 20, height: 20, marginLeft: 5 }}
                resizeMode="contain"
              />
            </View>

            <TouchableOpacity
              style={{
                height: 60,
                width: "100%",
                alignItems: "center",
              }}
              onPress={() =>
                router.push({
                  pathname: "/leaveReview/[id]" as any,
                  params: { id: String(id) }, // ✅ pass rcpID to leaveReview too
                })
              }
            >
              <Image
                source={icons.Review}
                style={{ width: 150, height: 60 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-tertiary mt-10 ml-5 text-xl">
          Comments{avg?.totalRatings ? ` (${avg.totalRatings})` : ""}
        </Text>

        {loading ? (
          <Text className="text-primary text-lg mt-4 ml-5">Loading...</Text>
        ) : ratings.length === 0 ? (
          <Text className="text-primary text-lg mt-4 ml-5">No reviews yet.</Text>
        ) : (
          ratings.map((r, idx) => {
            const star = typeof r.rateStar === "number" ? r.rateStar : 0;
            const text = (r.rateText ?? "").trim() || "—";

            const name = (r.accName ?? "").trim() || "User";
            const imgSource =
              r.accImg && r.accImg.startsWith("http") ? { uri: r.accImg } : icons.Profile2;

            return (
              <View key={r.ratingID ?? `${idx}`} className="h-44 mt-1 pt-5">
                <View className=" flex-row h-16 items-center pl-5">
                  <View className=" w-14 h-14 rounded-full overflow-hidden">
                    <Image source={imgSource as any} className="w-full h-full" resizeMode="cover" />
                  </View>

                  <Text className="text-primary ml-4 text-xl">{name}</Text>
                </View>

                <Text
                  className="text-primary text-lg mt-2 ml-5 font-normal"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {text}
                </Text>

                <View className="flex-row h-10 mt-2 items-center">
                  <Text className="text-yellow-400 text-xl font-medium ml-5 mt-1">
                    {star}
                  </Text>

                  <Image
                    source={icons.RateStar}
                    style={{ width: 17, height: 17, marginLeft: 5 }}
                    resizeMode="contain"
                  />
                </View>

                <View className="bg-tertiary w-[323px] h-[2px] ml-4 mt-4"></View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default review;
