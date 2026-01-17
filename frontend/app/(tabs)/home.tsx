import { ScrollView, Text, View } from "react-native";
import {Link} from 'expo-router';
import SearchBar from "@/components/SearchBar";
import { TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function home() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary"> 
    <View className="flex-row mt-24">
      <View  className="w-[260px] h-[49px] bg-white rounded-[30px] ml-5 pt-[4px] pl-5">
        <SearchBar/>
      </View>
        <TouchableOpacity onPress={() => router.push("/filter")} className="bg-white rounded-lg w-[40px] h-[40px] items-center justify-center ml-[10px] mt-1">
          <Image source={icons.Filter} style={{ width: 20, height: 20 }} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-lg w-[40px] h-[40px] items-center justify-center ml-[10px] mt-1">
          <Image source={icons.Star} style={{ width: 20, height: 20 }} resizeMode="contain" />
        </TouchableOpacity>
    </View>
    <Text className="text-white text-5xl ml-7 font-semibold mt-6 leading-[55px]">Home Page</Text>
      <View className= "flex-1 bg-white w-full mt-5 rounded-[33px] overflow-hidden">
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <View className="flex-row mt-9">
            <Pressable onPress={() => router.push("/snacks")} className="bg-primary w-[50px] h-[70px] ml-5 rounded-[30px] justify-center items-center">
              <Image
                source={icons.Snacks}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={() => router.push("/meal")} className="bg-primary w-[50px] h-[70px] ml-5 rounded-[30px] justify-center items-center">
              <Image
                source={icons.Meals}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={() => router.push("/vegan")} className="bg-primary w-[50px] h-[70px] ml-5 rounded-[30px] justify-center items-center">
              <Image
                source={icons.Vegan}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={() => router.push("/dessert")} className="bg-primary w-[50px] h-[70px] ml-5 rounded-[30px] justify-center items-center">
              <Image
                source={icons.Desserts}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable onPress={() => router.push("/drinks")} className="bg-primary w-[50px] h-[70px] ml-5 rounded-[30px] justify-center items-center">
              <Image
                source={icons.Drinks}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
                className="mr-[3px]"
              /></Pressable> 
          </View>
          <View className="flex-row">
            <Text className="text-primary text-base mt-auto ml-6">Snacks</Text>
            <Text className="text-primary text-base mt-auto ml-[28px]">Meal</Text>
            <Text className="text-primary text-base ml-[32px] mt-auto">Vegan</Text>
            <Text className="text-primary text-base ml-7 mt-auto">Dessert</Text>
            <Text className="text-primary text-base ml-6 mt-auto">Drinks</Text>
          </View>
        <View className="bg-primary w-[323px] h-[2px] ml-4 mt-2"></View>
        <View className="flex-row w-[323px] h-10 ml-4 mt-5 items-center justify-between">
          <Text className="text-primary font-medium text-2xl">Best Recipes</Text>
          <Pressable onPress={() => router.push("/bestrecipe")}>
            <Text className="text-primary font-medium text-lg pr-1 mb-1">View All 
              <Image
              source={icons.Arrow}
              style={{ width: 15, height: 15 }}
              resizeMode="contain"
              className="pl-6"
            />
            </Text>
          </Pressable>
        </View>

        <View className="flex-row w-[323px] h-28 ml-4 mt-7" >
          <Pressable onPress={() => router.push("/login")} className="w-[73px] h-[108px] mr-3 rounded-3xl">
            <Image
            source={icons.Food1}
            className="absolute inset-0 w-full h-full"
            resizeMode="contain"
            />
          </Pressable>
          <Pressable onPress={() => router.push("/review")} className="w-[73px] h-[108px] mr-3 rounded-3xl">
            <Image
            source={icons.Food4}
            className="absolute inset-0 w-full h-full"
            resizeMode="contain"
            />
          </Pressable>
          <Pressable className="w-[73px] h-[108px] mr-3 rounded-3xl">
            <Image
            source={icons.Food2}
            className="absolute inset-0 w-full h-full"
            resizeMode="contain"
            />
          </Pressable>
          <Pressable className="w-[73px] h-[108px] mr-3 rounded-3xl">
            <Image
            source={icons.Food3}
            className="absolute inset-0 w-full h-full"
            resizeMode="contain"
            />
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled className="bg-primary 
        w-[323px] h-[128px] ml-4 mt-10 rounded-3xl">
          <Pressable>
            <Image
            source={icons.RecipesWeek}
            className=" w-[323px] h-[128px]"
            resizeMode="cover"
            />
          </Pressable>
          <Pressable>
          <Image
            source={icons.Food2}
            className=" w-[323px] h-[128px]"
            resizeMode="cover"
            />
          </Pressable>
          <Pressable>
          <Image
            source={icons.Food1}
            className=" w-[323px] h-[128px]"
            resizeMode="cover"
            />
          </Pressable>
        </ScrollView>
        <View className="w-[323px] h-10 ml-4 mt-5">
          <Text className="text-primary text-2xl font-medium">RECOMMENDATIONS</Text>
        </View>
        <View className="flex-row  w-[323px] h-[140px] ml-4 mt-5 mb-3">
          <Pressable className="relative flex-row w-[150px] h-[140px]">
            <Image
            source={icons.Recommend1}
            className=" w-[150px] h-[140px] rounded-3xl"
            resizeMode="cover"
            />
            <View className="flex-row absolute bg-white w-[56px] h-[24px] top-2 left-2 rounded-full">
              <Text className="text-lg ml-2 font-medium">5.0</Text>
              <Image
                source={icons.RateStar}
                className="w-[15px] h-[15px] mt-1 ml-1"
                resizeMode="cover"
                />
            </View>
            <TouchableOpacity className="absolute bg-primary w-[24px] h-[24px] top-2 left-[65px] rounded-full">
              <Image
              source={icons.Heart}
              className="w-[24px] h-[24px] rounded-full"
              resizeMode="cover"
              />
            </TouchableOpacity>
          </Pressable>
          <Pressable className=" w-[150px] h-[140px] ml-auto">
            <Image
            source={icons.Recommend2}
            className=" w-[150px] h-[140px] rounded-3xl"
            resizeMode="contain"
            />
            <View className="flex-row absolute bg-white w-[56px] h-[24px] top-2 left-2 rounded-full">
              <Text className="text-lg ml-2 font-medium">5.0</Text>
              <Image
                source={icons.RateStar}
                className="w-[15px] h-[15px] mt-1 ml-1"
                resizeMode="cover"
                />
            </View>
            <TouchableOpacity className="absolute bg-primary w-[24px] h-[24px] top-2 left-[65px] rounded-full">
              <Image
              source={icons.Heart}
              className="w-[24px] h-[24px] rounded-full"
              resizeMode="cover"
              />
            </TouchableOpacity>
          </Pressable>
        </View>
        <View className="flex-row  w-[323px] h-[140px] ml-4 mt-5 mb-3">
          <Pressable className="relative flex-row w-[150px] h-[140px]">
            <Image
            source={icons.Recommend1}
            className=" w-[150px] h-[140px] rounded-3xl"
            resizeMode="cover"
            />
            <View className="flex-row absolute bg-white w-[56px] h-[24px] top-2 left-2 rounded-full">
              <Text className="text-lg ml-2 font-medium">5.0</Text>
              <Image
                source={icons.RateStar}
                className="w-[15px] h-[15px] mt-1 ml-1"
                resizeMode="cover"
                />
            </View>
            <TouchableOpacity className="absolute bg-primary w-[24px] h-[24px] top-2 left-[65px] rounded-full">
              <Image
              source={icons.Heart}
              className="w-[24px] h-[24px] rounded-full"
              resizeMode="cover"
              />
            </TouchableOpacity>
          </Pressable>
          <Pressable className=" w-[150px] h-[140px] ml-auto">
            <Image
            source={icons.Recommend2}
            className=" w-[150px] h-[140px] rounded-3xl"
            resizeMode="contain"
            />
            <View className="flex-row absolute bg-white w-[56px] h-[24px] top-2 left-2 rounded-full">
              <Text className="text-lg ml-2 font-medium">5.0</Text>
              <Image
                source={icons.RateStar}
                className="w-[15px] h-[15px] mt-1 ml-1"
                resizeMode="cover"
                />
            </View>
            <TouchableOpacity className="absolute bg-primary w-[24px] h-[24px] top-2 left-[65px] rounded-full">
              <Image
              source={icons.Heart}
              className="w-[24px] h-[24px] rounded-full"
              resizeMode="cover"
              />
            </TouchableOpacity>
          </Pressable>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}
