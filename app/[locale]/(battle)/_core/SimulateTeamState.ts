import localforage from 'localforage';
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { CharacterTeam } from '@/types/Select';
import { DamageLog } from '@/types/Game';

interface SimulateTeamState {
  teams: SimulateTeam[];
  saveToTeam: (
    team: CharacterTeam,
    baseAction: ActionLog[],
    baseResult: BaseSimulationResult,
    turn: number,
  ) => void;
  saveToAnalysis: (position: number, analysis: SimulationResult) => void;
  deleteTeam: (position: number) => void;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export interface SimulateTeam {
  team: CharacterTeam;
  baseAction: ActionLog[];
  turn: number;
  baseResult: BaseSimulationResult;
  analysis: SimulationResult[];
}

interface ActionLog {
  position: number;
  targeting: number;
}

interface BaseSimulationResult {
  damage_log_1: DamageLog[];
  damage_log_2: DamageLog[];
  damage_log_3: DamageLog[];
  damage_log_4: DamageLog[];
  damage_log_5: DamageLog[];
}

interface SimulationResult extends BaseSimulationResult {
  select: CharacterTeam;
}
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, 'has been retrieved');
    return (await localforage.getItem(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, 'with value', value, 'has been saved');
    await localforage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, 'has been deleted');
    await localforage.removeItem(name);
  },
};

export const useSimulateTeamState = create<SimulateTeamState>()(
  persist(
    immer((set) => ({
      teams: [],
      saveToTeam: (team, baseAction, baseResult, turn) => {
        set((state) => {
          state.teams.push({
            team,
            baseAction,
            baseResult,
            turn,
            analysis: [],
          });
        });
      },
      _hasHydrated: false,
      saveToAnalysis: (position, analysis) => {
        set((state) => {
          state.teams[position].analysis.push(analysis);
        });
      },
      deleteTeam: (position) => {
        set((state) => {
          state.teams.splice(position, 1);
        });
      },
      setHasHydrated: (value) => {
        set((state) => {
          state._hasHydrated = value;
        });
      },
    })),
    {
      name: 'simulate-team',
      storage: createJSONStorage(() => storage),
      // ...
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },

      // ...
    },
  ),
);
