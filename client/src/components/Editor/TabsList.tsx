import { EDITOR_BG_COLOR } from "@/utils/constants";
import { Plus, X } from "lucide-react";
import { Tab } from "@/types/editor";
import { useEditorStore } from "@/hooks/useEditorStore";
import { getEmptyTab } from "@/lib/utils";

export default function TabsList() {
  const { tabs, setTabs, setCurrentTab, setNewTabsCount, newTabsCount } = useEditorStore();

  const handleTabClose = (tab: Tab) => {
    setTabs((prev) => prev.filter((t) => t.id !== tab.id));
  };

  const incNewTabCount = () => {
    setNewTabsCount((prev) => prev + 1);
  };

  const handleNewTab = () => {
    const newTab = getEmptyTab({ index: newTabsCount + 1 });
    setTabs((prev) => [...prev, newTab]);
    setCurrentTab(newTab);
    incNewTabCount();
  };

  return (
    <div className="w-full flex items-center p-1 space-x-1.5">
      {tabs.map((tab, idx) => (
        <div
          key={idx}
          style={{ backgroundColor: EDITOR_BG_COLOR }}
          className="flex items-center px-2 py-0.5 border rounded-sm cursor-pointer space-x-2"
        >
          <span className="text-sm">{tab.file.name || tab.title}</span>
          <button onClick={() => handleTabClose(tab)} className="h-full w-3.5">
            <X className="size-3.5" />
          </button>
        </div>
      ))}
      <button onClick={handleNewTab} className="ml-1 size-4.5 flex items-center justify-center">
        <Plus />
      </button>
    </div>
  );
}
