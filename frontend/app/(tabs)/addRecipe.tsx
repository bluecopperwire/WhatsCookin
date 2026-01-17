import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { icons } from "@/constants/icons";
import { useIngredients } from "@/functions/useIngredients";
import { useInstructions } from "@/functions/useInstructions";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const addRecipe = () => {
  const router = useRouter();
  const API_BASE = process.env.EXPO_PUBLIC_API_URL;

  const { instructions, addInstruction, removeInstruction, updateInstruction } = useInstructions();
  const { ingredients, addIngredient, removeIngredient, updateIngredient } = useIngredients();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const [publishing, setPublishing] = useState(false);

  // image picking + uploaded imgID
  const [localImageUri, setLocalImageUri] = useState<string>("");
  const [imgID, setImgID] = useState<string>("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow photo access to upload an image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.85,
    });

    if (result.canceled) return;

    const uri = result.assets?.[0]?.uri;
    if (!uri) return;

    setLocalImageUri(uri);
    setImgID(""); // reset because new image selected
  };

  const uploadImageIfNeeded = async () => {
    if (!API_BASE) throw new Error("EXPO_PUBLIC_API_URL is not set.");
    if (!localImageUri) return ""; // no image selected

    // already uploaded
    if (imgID) return imgID;

    const form = new FormData();
    form.append("file", {
      uri: localImageUri,
      name: "recipe.jpg",
      type: "image/jpeg",
    } as any);

    const res = await fetch(`${API_BASE}/upload-image`, {
      method: "POST",
      body: form,
      // NOTE: do NOT set Content-Type manually for FormData (fetch will set boundary)
      credentials: "include", // ok if your server uses cookies; if not needed you can remove
    });

    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || `Upload failed (HTTP ${res.status})`);
    }

    const data = JSON.parse(text);
    const newImgID = data?.imgID;
    if (!newImgID) throw new Error("Upload succeeded but no imgID returned.");

    setImgID(newImgID);
    return newImgID;
  };

  const handlePublish = async () => {
    if (!API_BASE) {
      Alert.alert("Missing API URL", "EXPO_PUBLIC_API_URL is not set.");
      return;
    }

    // Pair ingredient + amount so lengths match
    const paired = ingredients
      .map((i) => ({
        name: (i.name ?? "").trim(),
        amt: (i.amt ?? "").trim(),
      }))
      .filter((x) => x.name.length > 0 && x.amt.length > 0);

    const ingredientNames = paired.map((x) => x.name);
    const ingredientAmts = paired.map((x) => x.amt);

    const steps = instructions
      .map((s) => (s.text ?? "").trim())
      .filter((s) => s.length > 0);

    if (!title.trim()) return Alert.alert("Missing title", "Please enter a recipe title.");
    if (!genre.trim()) return Alert.alert("Missing genre", "Please enter a genre.");
    if (ingredientNames.length === 0) return Alert.alert("Missing ingredients", "Please add at least 1 ingredient (with amount).");
    if (steps.length === 0) return Alert.alert("Missing instructions", "Please add at least 1 instruction.");

    try {
      setPublishing(true);

      // 1) get accID (session)
      const meRes = await fetch(`${API_BASE}/me`, {
        method: "GET",
        credentials: "include",
      });

      if (!meRes.ok) {
        const t = await meRes.text();
        Alert.alert("Not logged in", t || "Please login again.");
        return;
      }

      const me = await meRes.json();
      const accID = me?.accID;
      if (!accID) {
        Alert.alert("Error", "Could not read accID from /me.");
        return;
      }

      // 2) upload image (if selected)
      const uploadedImgID = await uploadImageIfNeeded();

      // 3) create recipe
      const res = await fetch(`${API_BASE}/recipes/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: title.trim(),
          accID: accID, // if backend expects Int, use: Number(accID)
          ingredients: ingredientNames,
          amount: ingredientAmts,
          steps: steps, // backend joins with "||"
          img: uploadedImgID || "", // ✅ send imgID (or empty)
          genre: genre.trim(),
          description: (description ?? "").trim(),
        }),
      });

      const text = await res.text();
      if (!res.ok) {
        Alert.alert("Publish failed", text || `HTTP ${res.status}`);
        return;
      }

      Alert.alert("Success", "Recipe added successfully!");
      router.push("/profile");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Something went wrong");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 h-56">
          <View className="flex-row items-center mt-16 px-5">
            <Pressable onPress={() => router.push("/profile")}>
              <Image
                source={icons.ArrowBlue}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            </Pressable>

            <Text className="flex-1 text-primary text-2xl font-semibold text-center">
              Create Recipe
            </Text>
          </View>

          <View className="h-10 w-full flex-row items-center mt-10">
            <TouchableOpacity
              style={{
                flex: 1,
                height: 60,
                width: "100%",
                alignItems: "center",
                opacity: publishing ? 0.6 : 1,
              }}
              disabled={publishing}
              onPress={handlePublish} // ✅ publish now
            >
              <Image
                source={icons.Publish}
                style={{ width: 170, height: 60 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                height: 60,
                width: "100%",
                alignItems: "center",
              }}
              onPress={() => router.push("/addRecipe")}
            >
              <Image
                source={icons.Delete}
                style={{ width: 170, height: 60 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 180 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* IMAGE PICKER BOX */}
            <View className="h-60 mt-10 justify-center items-center">
              <Pressable
                onPress={pickImage} // ✅ pick image
                className="bg-[#F7B580] h-60 w-5/6 justify-center items-center rounded-3xl overflow-hidden"
              >
                {localImageUri ? (
                  <Image
                    source={{ uri: localImageUri }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={icons.Files}
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                    className="mt-2"
                  />
                )}
              </Pressable>
              <Text className="text-tertiary mt-2">
                {localImageUri ? "Tap to change photo" : "Tap to upload photo"}
              </Text>
            </View>

            <Text className="text-primary font-semibold text-2xl ml-7 mt-3">Title</Text>
            <View className="bg-primary h-14 w-96 rounded-3xl pl-4 ml-7 mt-3">
              <TextInput
                className="text-[#FFFDF9] text-xl"
                placeholder="Name"
                placeholderTextColor="rgba(255, 253, 249, 0.8)"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <Text className="text-primary text-2xl ml-7 mt-5 font-semibold">Genre</Text>
            <View className="bg-primary h-14 w-96 rounded-3xl ml-7 mt-3 justify-center px-4">
              <Picker
                selectedValue={genre}
                onValueChange={setGenre}
                dropdownIconColor="#FFFDF9"
                style={{ color: "#FFFDF9" }}
              >
                <Picker.Item label="Select Genre..." value="" />
                <Picker.Item label="Meal" value="Meal" />
                <Picker.Item label="Snacks" value="Snacks" />
                <Picker.Item label="Vegan" value="Vegan" />
                <Picker.Item label="Dessert" value="Dessert" />
                <Picker.Item label="Drinks" value="Drinks" />
              </Picker>
            </View>

            <Text className="text-primary font-semibold text-2xl ml-7 mt-5">Description</Text>
            <View className="bg-primary h-32 w-96 rounded-3xl pl-4 ml-7 mt-3">
              <TextInput
                className="text-[#FFFDF9] text-xl"
                placeholder="Details"
                placeholderTextColor="rgba(255, 253, 249, 0.8)"
                multiline
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <Text className="text-primary font-semibold text-2xl ml-7 mt-5 mb-2">Ingredients</Text>

            {ingredients.map((item) => (
              <View key={item.id} className="flex-row h-20 pl-7 items-center">
                <Image source={icons.Dots} style={{ width: 20, height: 20 }} resizeMode="contain" />

                <TextInput
                  className="ml-3 w-20 h-12 bg-primary rounded-full text-center text-white"
                  placeholder="Amt"
                  placeholderTextColor="rgba(255, 255, 255, 0.60)"
                  value={item.amt}
                  onChangeText={(v) => updateIngredient(item.id, "amt", v)}
                />

                <TextInput
                  className="ml-3 w-56 h-12 bg-primary rounded-full pl-4 text-white"
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

            <View className="h-16 items-center justify-center">
              <TouchableOpacity
                onPress={() => addIngredient()}
                className="bg-tertiary rounded-full h-12 w-64 justify-center items-center"
              >
                <Text className="font-medium text-white text-lg">+ Add Ingredient</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-primary font-semibold text-2xl ml-7 mt-5 mb-2">Instructions</Text>

            {instructions.map((item, index) => (
              <View key={item.id} className="flex-row h-20 pl-7 items-center">
                <Image source={icons.Dots} style={{ width: 20, height: 20 }} resizeMode="contain" />

                <TextInput
                  className="ml-3 w-80 h-12 bg-primary rounded-full pl-4 text-white"
                  placeholder={`Instruction ${index + 1}`}
                  placeholderTextColor="rgba(255, 255, 255, 0.60)"
                  value={item.text}
                  onChangeText={(v) => updateInstruction(item.id, v)}
                />

                <Pressable
                  onPress={() => removeInstruction(item.id)}
                  className="w-12 h-12 bg-primary rounded-full items-center justify-center ml-2"
                >
                  <Image source={icons.Trash} style={{ width: 20, height: 20 }} resizeMode="contain" />
                </Pressable>
              </View>
            ))}

            <View className="h-16 items-center justify-center">
              <TouchableOpacity
                onPress={addInstruction}
                className="bg-tertiary rounded-full h-12 w-64 justify-center items-center"
              >
                <Text className="font-medium text-white text-lg">+ Instruction</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default addRecipe;
