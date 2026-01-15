import { useState } from "react";

export type Ingredient = { id: string; amt: string; name: string };

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: Date.now().toString(), amt: "", name: "" },
  ]);

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: Date.now().toString() + Math.random(), amt: "", name: "" },
    ]);
  };

  const removeIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((x) => x.id !== id));
  };

  const updateIngredient = (id: string, field: "amt" | "name", value: string) => {
    setIngredients((prev) =>
      prev.map((x) => (x.id === id ? { ...x, [field]: value } : x))
    );
  };

  return { ingredients, addIngredient, removeIngredient, updateIngredient };
}
