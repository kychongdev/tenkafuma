import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { initCharacterState } from '@/placeholder/team';
import localforage from 'localforage';
import { CharacterState, CharacterTeam } from '@/types/Select';
import { initTeam } from './init';
import { initHp } from './initHp';
import { triggerLead } from './character/lead';
import { DamageLog } from '@/types/Game';
import { basicAttack } from './character/basic';
import { parseConditionAddon } from './triggerAddon';
import { parseCondition } from './parseCondition';
import { Condition } from '@/app/[locale]/(battle)/_types/Skill';
import { p } from './utils';
import { checkEndTurn, onTurnStart } from './turn';
import { initPassiveSkill } from './character/passive';
import { applyExtra } from './character/extra';
import { ultimateAttack } from './character/ultimate';
import { parseInitstage, parseStageAction } from './stages/parseStage';
import { useSimulateTeamState } from './SimulateTeamState';

export enum TurnState {
  ENEMY_TURN,
  PLAYER_TURN,
}
enum CharacterPosition {
  POSITION_1,
  POSITION_2,
  POSITION_3,
  POSITION_4,
  POSITION_5,
}

export interface GameState {
  wave: number;
  ready: boolean;
  turn: number;
  turn_state: TurnState;
  enemies: CharacterState[];
  characters: CharacterState[];
  select: CharacterTeam | null;
  targeting: CharacterPosition;
  damage_log_1: DamageLog[];
  damage_log_2: DamageLog[];
  damage_log_3: DamageLog[];
  damage_log_4: DamageLog[];
  damage_log_5: DamageLog[];
  enemy_damage_log_1: DamageLog[];
  enemy_damage_log_2: DamageLog[];
  enemy_damage_log_3: DamageLog[];
  enemy_damage_log_4: DamageLog[];
  enemy_damage_log_5: DamageLog[];
  action: ActionLog[];
  battle_log: string[];
  undo: UndoLog[];
  stage_state: any;
  stage: string;
  basicAction: (position: number) => void;
  ultAction: (position: number) => void;
  guardAction: (position: number) => void;
  initBattle: (team: CharacterTeam) => void;
  setTargeting: (position: number) => void;
  undoLastAction: () => void;
  analysis: (position: number) => void;
  initStage: (stage: string) => void;
  debug: () => void;
}

interface UndoLog {
  turn: number;
  turn_state: TurnState;
  enemies: CharacterState[];
  characters: CharacterState[];
  damage_log_1: DamageLog[];
  damage_log_2: DamageLog[];
  damage_log_3: DamageLog[];
  damage_log_4: DamageLog[];
  damage_log_5: DamageLog[];
  battle_log: string[];
  action: ActionLog[];
  enemy_damage_log_1: DamageLog[];
  enemy_damage_log_2: DamageLog[];
  enemy_damage_log_3: DamageLog[];
  enemy_damage_log_4: DamageLog[];
  enemy_damage_log_5: DamageLog[];
  stage_state: any;
}

export interface ActionLog {
  position: number;
  targeting: number;
}

const saveToAnalysis = useSimulateTeamState.getState().saveToAnalysis;
function resetBattle(state: GameState) {
  state.wave = 1;
  state.turn = 0;
  state.ready = true;
  state.select = null;
  state.turn_state = TurnState.PLAYER_TURN;
  state.damage_log_1 = [];
  state.damage_log_2 = [];
  state.damage_log_3 = [];
  state.damage_log_4 = [];
  state.damage_log_5 = [];
  state.enemy_damage_log_1 = [];
  state.enemy_damage_log_2 = [];
  state.enemy_damage_log_3 = [];
  state.enemy_damage_log_4 = [];
  state.enemy_damage_log_5 = [];
  state.battle_log = [];
  state.action = [];
  state.undo = [];
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

export const useAnalysisState = create<GameState>()(
  persist(
    immer((set) => ({
      wave: 0,
      ready: false,
      turn: 0,
      turn_state: TurnState.PLAYER_TURN,
      enemies: [initCharacterState],
      stage: 'wood',
      stage_state: {} as any,
      characters: [
        initCharacterState,
        initCharacterState,
        initCharacterState,
        initCharacterState,
        initCharacterState,
      ],
      select: null,
      targeting: CharacterPosition.POSITION_1,
      undo: [],
      damage_log_1: [],
      damage_log_2: [],
      damage_log_3: [],
      damage_log_4: [],
      damage_log_5: [],
      enemy_damage_log_1: [],
      enemy_damage_log_2: [],
      enemy_damage_log_3: [],
      enemy_damage_log_4: [],
      enemy_damage_log_5: [],
      battle_log: [],
      action: [],
      initBattle: (team: CharacterTeam): void => {
        set((state) => {
          resetBattle(state);
          state.select = team;
          state.characters = initTeam(team);
          triggerLead(state);
          initHp(state);
          initPassiveSkill(0, state);
          initPassiveSkill(1, state);
          initPassiveSkill(2, state);
          initPassiveSkill(3, state);
          initPassiveSkill(4, state);
          parseInitstage(state);
          parseStageAction(state);
          state.turn = state.turn + 1;
          onTurnStart(state);
        });
      },
      initStage: (stage: string) => {
        set((state) => {
          resetBattle(state);
          state.stage = stage;
          if (state.select) {
            state.characters = initTeam(state.select);
            triggerLead(state);
            initHp(state);
            initPassiveSkill(0, state);
            initPassiveSkill(1, state);
            initPassiveSkill(2, state);
            initPassiveSkill(3, state);
            initPassiveSkill(4, state);
            parseInitstage(state);
            parseStageAction(state);
            state.turn = state.turn + 1;
            onTurnStart(state);
          }
        });
      },
      modifyBattle: () => {},
      endTurn: () => {},
      endEnemyTurn: () => {},
      nextWave: () => {},
      setTargeting: (position: number) => {
        set((state) => {
          state.targeting = position;
        });
      },
      basicAction: (position: number) => {
        set((state) => {
          state.action.push({ position, targeting: state.targeting });
          state.characters[position].isMoved = true;
          basicAttack(state, position);
          parseConditionAddon(
            position,
            [Condition.BASIC_ATTACK, Condition.ATTACK, Condition.MOVE],
            state,
          );
          parseCondition(
            position,
            [Condition.BASIC_ATTACK, Condition.ATTACK, Condition.MOVE],
            state,
          );
          state.characters.forEach((character, index) => {
            if (character.isHeal === true) {
              parseCondition(index, [Condition.GET_HEAL], state);
              character.isHeal = false;
            }
          });
          checkEndTurn(state);
        });
      },
      ultAction: (position: number) => {
        set((state) => {
          state.action.push({ position, targeting: state.targeting });
          state.characters[position].isMoved = true;
          state.characters[position].cd = state.characters[position].maxCd;

          ultimateAttack(state, position);
          parseConditionAddon(
            position,
            [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
            state,
          );
          parseCondition(
            position,
            [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
            state,
          );

          state.characters.forEach((character, index) => {
            if (character.isHeal === true) {
              parseCondition(index, [Condition.GET_HEAL], state);
            }
            character.isHeal = false;
          });

          applyExtra(state, position);
          checkEndTurn(state);
        });
      },
      guardAction: (position: number) => {
        set((state) => {
          state.action.push({ position, targeting: state.targeting });
          state.characters[position].isGuard = true;
          parseConditionAddon(
            position,
            [Condition.GUARD, Condition.MOVE],
            state,
          );
          parseCondition(position, [Condition.GUARD, Condition.MOVE], state);
          checkEndTurn(state);
        });
      },
      healAction: () => {},
      undoLastAction: () => {
        set((state) => {});
      },
      customAction: () => {},
      analysis: (position) => {
        set((state) => {
          if (state.select)
            saveToAnalysis(
              position,
              p({
                select: state.select,
                damage_log_1: state.damage_log_1,
                damage_log_2: state.damage_log_2,
                damage_log_3: state.damage_log_3,
                damage_log_4: state.damage_log_4,
                damage_log_5: state.damage_log_5,
              }),
            );
        });
      },
      debug: () => {
        set((state) => {
          console.log(p(state));
        });
      },
    })),
    {
      name: 'simulation',
      storage: createJSONStorage(() => storage),
    },
  ),
);
