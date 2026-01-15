import { useState } from "react";

export type Instruction = { id: string; text: string };

export function useInstructions() {
  const [instructions, setInstructions] = useState<Instruction[]>([
    { id: Date.now().toString(), text: "" },
  ]);

  const addInstruction = () => {
    setInstructions((prev) => [
      ...prev,
      { id: Date.now().toString() + Math.random(), text: "" },
    ]);
  };

  const removeInstruction = (id: string) => {
    setInstructions((prev) => prev.filter((x) => x.id !== id));
  };

  const updateInstruction = (id: string, value: string) => {
    setInstructions((prev) =>
      prev.map((x) => (x.id === id ? { ...x, text: value } : x))
    );
  };

  return { instructions, addInstruction, removeInstruction, updateInstruction };
}
