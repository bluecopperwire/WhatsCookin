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
    setIngredients((prev) => {
      const next = prev.filter((x) => x.id !== id);
      // optional: keep at least 1 row always
      return next.length ? next : [{ id: Date.now().toString(), amt: "", name: "" }];
    });
  };

  const updateIngredient = (id: string, field: "amt" | "name", value: string) => {
    setIngredients((prev) =>
      prev.map((x) => (x.id === id ? { ...x, [field]: value } : x))
    );
  };

  // ✅ NEW: initialize from scan output: [{name:"carrot"}, ...] or {ingredients:[...]}
  const setIngredientsFromScan = (
    scan: Array<{ name?: string }> | { ingredients?: Array<{ name?: string }> }
  ) => {
    const list = Array.isArray(scan) ? scan : scan.ingredients ?? [];

    setIngredients(
      list.length
        ? list.map((x, idx) => ({
            id: `${Date.now()}-${idx}`,
            amt: "",
            name: x.name ?? "",
          }))
        : [{ id: Date.now().toString(), amt: "", name: "" }]
    );
  };

  // ✅ Optional helper for filtering later
  const getIngredientNames = () =>
    ingredients.map((x) => x.name.trim()).filter(Boolean);

  return {
    ingredients,
    addIngredient,
    removeIngredient,
    updateIngredient,
    setIngredientsFromScan,
    getIngredientNames,
  };
}
