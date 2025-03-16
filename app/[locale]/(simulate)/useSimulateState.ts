import localforage from "localforage";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CharacterTeam } from "@/types/Select";
import { DamageLog } from "../(battle)/types/GameState";

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
  deleteAnalysis: (position: number, index: number) => void;
  // _hasHydrated: boolean;
  // setHasHydrated: (value: boolean) => void;
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
  damageLog1: DamageLog[];
  damageLog2: DamageLog[];
  damageLog3: DamageLog[];
  damageLog4: DamageLog[];
  damageLog5: DamageLog[];
}

interface SimulationResult extends BaseSimulationResult {
  select: CharacterTeam;
}

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
      deleteAnalysis: (position, index) => {
        set((state) => {
          state.teams[position].analysis.splice(index, 1);
        });
      },
    })),
    {
      name: "simulate-team",
      storage: createJSONStorage(() => localforage),
    },
  ),
);
