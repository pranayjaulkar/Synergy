import { create } from "zustand";
import { ExplorerState } from "@/types/editor";

type ExplorerStore = {
  explorer: ExplorerState | null;
  setExplorer: (
    explorerState: ExplorerState | ((explorer: ExplorerState) => ExplorerState)
  ) => void;
};

export const useExplorerStore = create<ExplorerStore>((set) => {
  return {
    explorer: {
      files: [
        {
          children: [],
          isFile: true,
          isDir: false,
        },
        {
          children: [
            {
              children: [],
              isFile: true,
              isDir: false,
            },
          ],
          isFile: false,
          isDir: true,
        },
      ],
    },
    setExplorer: set,
  };
});
