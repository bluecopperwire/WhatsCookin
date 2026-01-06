import { Text, View } from "react-native";
import {Link} from 'expo-router';

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center"> 
      <Text className="text-2xl font-bold text-blue-500">Welcome!</Text>
      <Link href="/onboarding" className="mt-4 text-lg text-blue-500">Get Started</Link>
    </View>
  );
}
