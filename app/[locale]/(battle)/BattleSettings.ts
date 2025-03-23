import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface BattleSettings {
  halfPic: boolean;
  enemyBattleLogExpand: boolean;
  toggleHalfPic: () => void;
  expandEnemyBattleLog: () => void;
}

export const useBattleSettings = create<BattleSettings>()(
  persist(
    immer((set) => ({
      halfPic: false,
      enemyBattleLogExpand: false,
      toggleHalfPic: () => {
        set((state) => {
          state.halfPic = !state.halfPic;
        });
      },
      expandEnemyBattleLog: () => {
        set((state) => {
          state.enemyBattleLogExpand = !state.enemyBattleLogExpand;
        });
      },
    })),
    {
      name: "battle-settings",
      storage: createJSONStorage(() => localforage),
    },
  ),
);
