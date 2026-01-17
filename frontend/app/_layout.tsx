import { Stack } from "expo-router";
import'./globals.css';
import { useFonts, LeagueSpartan_400Regular } from "@expo-google-fonts/league-spartan";

export default function RootLayout() {
  const [loaded] = useFonts({ LeagueSpartan_400Regular });
  if (!loaded) return null;
  return(
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="loginpage"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="edit"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="bestrecipeScan"
        options={{ headerShown: false }}
      />
      
    </Stack>
  )
}
