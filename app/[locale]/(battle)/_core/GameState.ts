import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { initCharacterState } from "@/placeholder/team";
import localforage from "localforage";
import { CharacterState, CharacterTeam } from "@/types/Select";
import { initTeam } from "./init";
import { initHp } from "./initHp";
import { triggerLead } from "./character/lead";
import { DamageLog } from "@/types/Game";
import { basicAttack } from "./character/basic";
import { parseConditionAddon } from "./triggerAddon";
import { parseCondition } from "./parseCondition";
import { Condition } from "@/app/[locale]/(battle)/_types/Skill";
import { p } from "./utils";
import { checkEndTurn, enemyCalculateDot, onTurnStart } from "./turn";
import { initPassiveSkill } from "./character/passive";
import { applyExtra } from "./character/extra";
import { ultimateAttack } from "./character/ultimate";
import { parseInitstage, parseStageAction } from "./stages/parseStage";
import { customAlphabet } from "nanoid";

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
  client_id: string;
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
  //heal_log_1: DamageLog[];
  //heal_log_2: DamageLog[];
  //heal_log_3: DamageLog[];
  //heal_log_4: DamageLog[];
  //heal_log_5: DamageLog[];
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
  initStage: (stage: string) => void;
  debug: () => void;
  attackAll: () => void;
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

interface ActionLog {
  position: number;
  targeting: number;
}

function resetBattle(state: GameState) {
  state.wave = 1;
  state.turn = 0;
  state.ready = true;
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

export const useGameState = create<GameState>()(
  persist(
    immer((set) => ({
      wave: 0,
      ready: false,
      turn: 0,
      turn_state: TurnState.PLAYER_TURN,
      client_id: "",
      enemies: [initCharacterState],
      stage: "wood",
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
          const alphabet =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          const nid = customAlphabet(alphabet, 20);
          state.client_id = nid();
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
          const alphabet =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          const nid = customAlphabet(alphabet, 20);
          state.client_id = nid();
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
          // state.enemies = [initCharacterState];
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
          const prevState = {
            wave: p(state.wave),
            turn: p(state.turn),
            turn_state: p(state.turn_state),
            enemies: p(state.enemies),
            characters: p(state.characters),
            damage_log_1: p(state.damage_log_1),
            damage_log_2: p(state.damage_log_2),
            damage_log_3: p(state.damage_log_3),
            damage_log_4: p(state.damage_log_4),
            damage_log_5: p(state.damage_log_5),
            battle_log: p(state.battle_log),
            action: p(state.action),
            enemy_damage_log_1: p(state.enemy_damage_log_1),
            enemy_damage_log_2: p(state.enemy_damage_log_2),
            enemy_damage_log_3: p(state.enemy_damage_log_3),
            enemy_damage_log_4: p(state.enemy_damage_log_4),
            enemy_damage_log_5: p(state.enemy_damage_log_5),
            stage_state: p(state.stage_state),
          };
          state.undo.push(prevState);
          state.action.push({ position, targeting: state.targeting });
          state.characters[position].isMoved = true;

          const oldState = state;
          basicAttack(state, position);
          parseConditionAddon(
            position,
            [Condition.BASIC_ATTACK, Condition.ATTACK, Condition.MOVE],
            state,
            oldState,
          );
          parseCondition(
            position,
            [Condition.BASIC_ATTACK, Condition.ATTACK, Condition.MOVE],
            state,
            oldState,
          );
          state.characters.forEach((character, index) => {
            if (character.isHeal === true) {
              parseCondition(index, [Condition.GET_HEAL], state, oldState);
              character.isHeal = false;
            }
          });
          checkEndTurn(state);
        });
      },
      ultAction: (position: number) => {
        set((state) => {
          const prevState = {
            wave: p(state.wave),
            turn: p(state.turn),
            turn_state: p(state.turn_state),
            enemies: p(state.enemies),
            characters: p(state.characters),
            damage_log_1: p(state.damage_log_1),
            damage_log_2: p(state.damage_log_2),
            damage_log_3: p(state.damage_log_3),
            damage_log_4: p(state.damage_log_4),
            damage_log_5: p(state.damage_log_5),
            battle_log: p(state.battle_log),
            action: p(state.action),
            enemy_damage_log_1: p(state.enemy_damage_log_1),
            enemy_damage_log_2: p(state.enemy_damage_log_2),
            enemy_damage_log_3: p(state.enemy_damage_log_3),
            enemy_damage_log_4: p(state.enemy_damage_log_4),
            enemy_damage_log_5: p(state.enemy_damage_log_5),
            stage_state: p(state.stage_state),
          };
          state.undo.push(prevState);
          state.action.push({
            position: position + 5,
            targeting: state.targeting,
          });
          state.characters[position].isMoved = true;
          state.characters[position].cd = state.characters[position].maxCd;

          const oldState = p(state);
          ultimateAttack(state, position);
          console.log(p(state.characters[position].buff));

          parseConditionAddon(
            position,
            [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
            state,
            oldState,
          );
          parseCondition(
            position,
            [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
            state,
            oldState,
          );

          state.characters.forEach((character, index) => {
            if (character.isHeal === true) {
              parseCondition(index, [Condition.GET_HEAL], state, oldState);
            }
            character.isHeal = false;
          });

          applyExtra(state, position);
          checkEndTurn(state);
        });
      },
      guardAction: (position: number) => {
        set((state) => {
          const prevState = {
            wave: p(state.wave),
            turn: p(state.turn),
            turn_state: p(state.turn_state),
            enemies: p(state.enemies),
            characters: p(state.characters),
            damage_log_1: p(state.damage_log_1),
            damage_log_2: p(state.damage_log_2),
            damage_log_3: p(state.damage_log_3),
            damage_log_4: p(state.damage_log_4),
            damage_log_5: p(state.damage_log_5),
            battle_log: p(state.battle_log),
            action: p(state.action),
            enemy_damage_log_1: p(state.enemy_damage_log_1),
            enemy_damage_log_2: p(state.enemy_damage_log_2),
            enemy_damage_log_3: p(state.enemy_damage_log_3),
            enemy_damage_log_4: p(state.enemy_damage_log_4),
            enemy_damage_log_5: p(state.enemy_damage_log_5),
            stage_state: p(state.stage_state),
          };
          state.undo.push(prevState);
          state.action.push({
            position: position + 10,
            targeting: state.targeting,
          });
          const oldState = state;
          state.characters[position].isGuard = true;
          parseConditionAddon(
            position,
            [Condition.GUARD, Condition.MOVE],
            state,
            oldState,
          );
          parseCondition(
            position,
            [Condition.GUARD, Condition.MOVE],
            state,
            oldState,
          );
          checkEndTurn(state);
        });
      },
      healAction: () => {},
      undoLastAction: () => {
        set((state) => {
          const lastState = state.undo.pop();
          if (lastState) {
            state.turn = lastState.turn;
            state.enemies = lastState.enemies;
            state.characters = lastState.characters;
            state.damage_log_1 = lastState.damage_log_1;
            state.damage_log_2 = lastState.damage_log_2;
            state.damage_log_3 = lastState.damage_log_3;
            state.damage_log_4 = lastState.damage_log_4;
            state.damage_log_5 = lastState.damage_log_5;
            state.battle_log = lastState.battle_log;
            state.action = lastState.action;
            state.enemy_damage_log_1 = lastState.enemy_damage_log_1;
            state.enemy_damage_log_2 = lastState.enemy_damage_log_2;
            state.enemy_damage_log_3 = lastState.enemy_damage_log_3;
            state.enemy_damage_log_4 = lastState.enemy_damage_log_4;
            state.enemy_damage_log_5 = lastState.enemy_damage_log_5;
            state.stage_state = lastState.stage_state;
          }
        });
      },
      customAction: () => {},
      analysis: () => {},
      debug: () => {
        set((state) => {
          console.log(p(state));
        });
      },
      attackAll: () => {
        set((state) => {
          state.characters[1].hp = state.characters[1].hp - 500000;
          parseCondition(1, [Condition.RECEIVED_ATTACK], state, state);
          //state.characters.forEach((_, index) => {
          //  state.characters[index].hp = state.characters[index].hp - 10;
          //  parseCondition(index, [Condition.RECEIVED_ATTACK], state);
          //});
        });
      },
    })),
    {
      name: "game-state",
      storage: createJSONStorage(() => localforage),
    },
  ),
);
