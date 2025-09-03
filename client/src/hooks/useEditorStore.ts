import { getEmptyTab } from "@/lib/utils";
import { Tab } from "@/types/editor";
import { create } from "zustand";

type EditorStore = {
  currentTab: Tab;
  setCurrentTab: (tab: Tab | ((prev: Tab) => Tab)) => void;

  tabs: Tab[];
  setTabs: (tabs: Tab[] | ((prev: Tab[]) => Tab[])) => void;

  newTabsCount: number;
  setNewTabsCount: (n: number | ((p: number) => number)) => void;
};

export const useEditorStore = create<EditorStore>((set) => {
  const initTab = getEmptyTab();
  return {
    currentTab: initTab,
    setCurrentTab: (t) => {
      if (typeof t === "function") set((prev) => ({ ...prev, currentTab: t(prev.currentTab) }));
      else set((prev) => ({ ...prev, currentTab: t }));
    },

    tabs: [initTab],
    setTabs: (t) => {
      if (typeof t === "function") set((prev) => ({ ...prev, tabs: t(prev.tabs) }));
      else set((prev) => ({ ...prev, tabs: t }));
    },

    newTabsCount: 1,
    setNewTabsCount: (n) => {
      if (typeof n === "function") set((prev) => ({ ...prev, newTabsCount: n(prev.newTabsCount) }));
      else set((prev) => ({ ...prev, newTabsCount: n }));
    },
  };
});
