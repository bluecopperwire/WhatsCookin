import { ScrollView, Text, View } from "react-native";
import {Link} from 'expo-router';
import SearchBar from "@/components/SearchBar";
import { TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";
import { Image } from "react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

const drinks = () => {
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
    <View className="w-full flex-1 mt-5 bg-secondary rounded-[33px]">
        <View className="flex-row px-5 mt-9">
            <Pressable onPress={() => router.push("/snacks")} className="bg-primary w-[50px] h-[70px] ml-5 rounded-[30px] justify-center items-center">
            <Image
                source={icons.Snacks}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Pressable>

            <Pressable onPress={() => router.push("/meal")} className=" bg-primary w-[50px] h-[70px] rounded-[30px] justify-center items-center ml-5">
            <Image
                source={icons.Meals}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
            />
            </Pressable>

            <Pressable onPress={() => router.push("/vegan")} className="relative bg-primary w-[50px] h-[70px] rounded-[30px] justify-center items-center ml-5">
              <Image
                source={icons.Vegan}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Pressable>
            
            <Pressable onPress={() => router.push("/dessert")} className="bg-primary w-[50px] h-[70px] rounded-[30px] justify-center items-center ml-5">
            <Image
                source={icons.Desserts}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
            />
            </Pressable>
            
            <View className="absolute bg-white w-[65px] h-[140px] top-[-8px] left-[300px] rounded-[30px] pt-[8px] pl-2">
            <Pressable onPress={() => router.push("/drinks")} className="relative bg-primary w-[50px] h-[70px] rounded-[30px] justify-center items-center">
            <Image
            source={icons.Drinks}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
            className="mr-[3px]"
            /></Pressable>
            </View>

        </View>
        <View className="flex-row ml-5">
            <Text className="text-white text-base mt-auto ml-6">Snacks</Text>
            <Text className="text-white text-base mt-auto ml-[28px]">Meal</Text>
            <Text className="text-white text-base ml-[32px] mt-auto">Vegan</Text>
            <Text className="text-white text-base ml-7 mt-auto">Dessert</Text>
            <Text className="text-primary text-base ml-6 mt-auto">Drinks</Text>
          </View>
        <View className= "bg-white w-full flex-1 overflow-hidden rounded-xl">
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                <View className="h-10 mt-5 justify-end pl-2">
                    <Text className="font-light text-primary">Sorted by Popularity</Text>
                </View>
                <View className="bg-primary w-full h-48 rounded-[36px] mt-5 overflow-hidden">
                    <Image
                    source={icons.Snacks1}
                    className="w-full h-full"
                    resizeMode="cover"
                    />  
                </View>
                <View className="flex-row h-10 mt-5">
                        <Text className="font-bold text-2xl ml-3 text-colorfont">Mexican Place</Text>
                        <View className="flex-row bg-primary w-[56px] h-[24px] rounded-full ml-auto">
                        <Text className="text-lg ml-2 font-medium">5.0</Text>
                        <Image
                            source={icons.RateStar}
                            className="w-[15px] h-[15px] mt-1 ml-1"
                            resizeMode="cover"
                            />
                        </View>
                </View>
                <Text className="text-colorfont ml-3">Tortilla Chips with Toppins</Text>
                <View className="bg-[#FFD8C7] h-[2px] mt-7"></View>
                <View className="bg-primary w-full h-48 rounded-[36px] mt-5 overflow-hidden">
                    <Image
                    source={icons.Snacks1}
                    className="w-full h-full"
                    resizeMode="cover"
                    />  
                </View>
                <View className="flex-row h-10 mt-5">
                        <Text className="font-bold text-2xl ml-3 text-colorfont">Mexican Place</Text>
                        <View className="flex-row bg-primary w-[56px] h-[24px] rounded-full ml-auto">
                        <Text className="text-lg ml-2 font-medium">5.0</Text>
                        <Image
                            source={icons.RateStar}
                            className="w-[15px] h-[15px] mt-1 ml-1"
                            resizeMode="cover"
                            />
                        </View>
                </View>
                <Text className="text-colorfont ml-3">Tortilla Chips with Toppins</Text>
                <View className="bg-[#FFD8C7] h-[2px] mt-7"></View>
                <View className="bg-primary w-full h-48 rounded-[36px] mt-5 overflow-hidden">
                    <Image
                    source={icons.Snacks2}
                    className="w-full h-full"
                    resizeMode="cover"
                    />  
                </View>
                <View className="flex-row h-10 mt-5">
                        <Text className="font-bold text-2xl ml-3 text-colorfont">Mexican Place</Text>
                        <View className="flex-row bg-primary w-[56px] h-[24px] rounded-full ml-auto">
                        <Text className="text-lg ml-2 font-medium">5.0</Text>
                        <Image
                            source={icons.RateStar}
                            className="w-[15px] h-[15px] mt-1 ml-1"
                            resizeMode="cover"
                            />
                        </View>
                </View>
                <Text className="text-colorfont ml-3">Tortilla Chips with Toppins</Text>
                <View className="bg-[#FFD8C7] h-[2px] mt-7"></View>
            </ScrollView>
        </View>
    </View>
    
    </View>
     
  )
}

export default drinks