import { Tab } from "@/types/editor";
import { clsx, type ClassValue } from "clsx";
import { nanoid } from "nanoid";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEmptyTab = (opts?: { name?: string; title?: string; index?: number }): Tab => {
  const { title, name, index } = opts || {};
  const suffix = index !== undefined ? `-${index}` : "";
  return {
    id: nanoid(),
    title: title || `untitled${suffix}`,
    file: { name: name || `file${suffix}` },
    editor: null,
  };
};
