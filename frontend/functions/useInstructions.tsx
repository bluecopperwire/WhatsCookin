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

// functions/useInstructions.ts

export function toList(v?: string[] | string | null, splitBy: string = ","): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean);

  const raw = String(v).trim();

  // ✅ If your DB uses the clean delimiter, prioritize it
  if (raw.includes("||")) {
    return raw
      .split("||")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // fallback (comma, etc.)
  return raw
    .split(splitBy)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseSteps(v?: string[] | string | null): string[] {
  if (!v) return [];

  // ✅ If array, split each item by "||" and flatten
  if (Array.isArray(v)) {
    return v
      .flatMap((item) =>
        String(item)
          .replace(/^\s*(steps?|instructions?)\s*/i, "")
          .replace(/\\\|\\\|/g, "||")
          .replace(/\|\s+\|/g, "||")
          .split("||")
      )
      .map((s) => s.trim())
      .filter(Boolean);
  }

  let raw = String(v).trim();

  raw = raw.replace(/^\s*(steps?|instructions?)\s*/i, "");
  raw = raw.replace(/\\\|\\\|/g, "||");
  raw = raw.replace(/\|\s+\|/g, "||");
  raw = raw.replace(/\.\.+/g, ". ");

  // ✅ Preferred split
  if (raw.includes("||")) {
    return raw
      .split("||")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (raw.includes("\n")) {
    return raw
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  const byWordStep = raw.match(/Step\s*\d+\.\s*[\s\S]*?(?=Step\s*\d+\.|$)/gi);
  if (byWordStep?.length) return byWordStep.map((m) => m.trim());

  const byNumber = raw.match(/\b\d+\.\s*[\s\S]*?(?=\b\d+\.\s*|$)/g);
  if (byNumber?.length) return byNumber.map((m) => m.trim());

  return raw ? [raw] : [];
}




