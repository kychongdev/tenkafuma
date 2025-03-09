import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import localforage from "localforage";
import { CharacterState, CharacterTeam } from "./types/Select";
import { Condition, Target } from "./types/Skill";
import { initCharacterState } from "./data/placeholder";
import { generateClientId, p } from "./utils";
import { initTeam } from "./init/initTeam";
import { initHp } from "./init/initHp";
import { basic } from "./basic";
import { initLeadSkill } from "./lead";
import { initPassiveSkill } from "./passive";
import { parseInitstage, parseStageAction } from "./stages/parseStage";
import { checkEndTurn, newWaveStart, onTurnStart } from "./turn";
import { parseCondition } from "./parseCondition";
import { CharacterAction } from "./types/Character";
import { parseAddon } from "./parseAddon";

export interface GameState {
  clientId: string;
  wave: number;
  ready: boolean;
  turn: number;
  enemies: CharacterState[];
  characters: CharacterState[];
  select: CharacterTeam | null;
  targeting: number;
  damageLog1: any[];
  damageLog2: any[];
  damageLog3: any[];
  damageLog4: any[];
  damageLog5: any[];
  healLog1: any[];
  healLog2: any[];
  healLog3: any[];
  healLog4: any[];
  healLog5: any[];
  battleSettings: {
    everyTurnAttack: boolean;
    everyTurnAttackTarget: Target[];
  };
  enemyDamageLog1: any[];
  enemyDamageLog2: any[];
  enemyDamageLog3: any[];
  enemyDamageLog4: any[];
  enemyDamageLog5: any[];
  enemyHealLog1: any[];
  enemyHealLog2: any[];
  enemyHealLog3: any[];
  enemyHealLog4: any[];
  enemyHealLog5: any[];
  action: any[];
  battleLog: string[];
  undo: any[];
  stageState: any;
  stage: string;
  debug: () => void;
  basicAction: (position: number) => void;
  ultAction: (position: number) => void;
  guardAction: (position: number) => void;
  initBattle: (team: CharacterTeam) => void;
  moveLeft: () => void;
  moveRight: () => void;
  undoLastAction: () => void;
  initStage: (stage: string) => void;
  enableEveryTurnAttack: () => void;
  addEveryTurnAttackTarget: (target: Target) => void;
}

function resetBattle(state: GameState) {
  state.wave = 1;
  state.turn = 0;
  state.ready = true;
  state.damageLog1 = [];
  state.damageLog2 = [];
  state.damageLog3 = [];
  state.damageLog4 = [];
  state.damageLog4 = [];
  state.healLog1 = [];
  state.healLog2 = [];
  state.healLog3 = [];
  state.healLog4 = [];
  state.healLog5 = [];
  state.battleLog = [];
  state.action = [];
  state.undo = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
  state.enemyHealLog1 = [];
  state.enemyHealLog2 = [];
  state.enemyHealLog3 = [];
  state.enemyHealLog4 = [];
  state.enemyHealLog5 = [];
}
const initEnemyState = {
  ...initCharacterState,
  id: "wood",
  maxHp: 5063653034,
  hp: 5063653034,
  isExist: true,
};

export const useGameState = create<GameState>()(
  persist(
    immer((set) => ({
      clientId: "",
      wave: 0,
      ready: false,
      turn: 0,
      enemies: [
        { ...initEnemyState, name: "1" },
        { ...initEnemyState, name: "2" },
        { ...initEnemyState, name: "3" },
        { ...initEnemyState, name: "4" },
        { ...initEnemyState, name: "5" },
      ],
      stage: "wood",
      stageState: {} as any,
      reflectDmg: [],
      characters: [
        initCharacterState,
        initCharacterState,
        initCharacterState,
        initCharacterState,
        initCharacterState,
      ],
      battleSettings: {
        everyTurnAttack: false,
        everyTurnAttackTarget: [Target.ALL_ALLIES],
      },
      select: null,
      targeting: Target.ENEMY_1 - 20,
      undo: [],
      damageLog1: [],
      damageLog2: [],
      damageLog3: [],
      damageLog4: [],
      damageLog5: [],
      healLog1: [],
      healLog2: [],
      healLog3: [],
      healLog4: [],
      healLog5: [],
      battleLog: [],
      action: [],
      enemyDamageLog1: [],
      enemyDamageLog2: [],
      enemyDamageLog3: [],
      enemyDamageLog4: [],
      enemyDamageLog5: [],
      enemyHealLog1: [],
      enemyHealLog2: [],
      enemyHealLog3: [],
      enemyHealLog4: [],
      enemyHealLog5: [],
      initBattle: (team: CharacterTeam): void => {
        set((state) => {
          state.clientId = generateClientId(20);
          resetBattle(state);
          state.select = team;
          state.characters = initTeam(team);
          initLeadSkill(state);
          initHp(state);
          initPassiveSkill(state, 0);
          initPassiveSkill(state, 1);
          initPassiveSkill(state, 2);
          initPassiveSkill(state, 3);
          initPassiveSkill(state, 4);
          //parseInitstage(state);
          //parseStageAction(state);
          state.turn = state.turn + 1;
          newWaveStart(state, state);
          onTurnStart(state, state);
          state.enemies = [
            { ...initEnemyState, name: "1" },
            { ...initEnemyState, name: "2" },
            { ...initEnemyState, name: "3" },
            { ...initEnemyState, name: "4" },
            { ...initEnemyState, name: "5" },
          ];
        });
      },
      initStage: (stage: string) => {
        set((state) => {
          state.clientId = generateClientId(20);
          resetBattle(state);
          state.stage = stage;
          if (state.select) {
            state.characters = initTeam(state.select);
            initLeadSkill(state);
            initHp(state);
            initPassiveSkill(state, 0);
            initPassiveSkill(state, 1);
            initPassiveSkill(state, 2);
            initPassiveSkill(state, 3);
            initPassiveSkill(state, 4);
            //parseInitstage(state);
            //parseStageAction(state);
            state.turn = state.turn + 1;
            newWaveStart(state, state);
            onTurnStart(state, state);
          }
          state.enemies = [
            { ...initEnemyState, name: "1" },
            { ...initEnemyState, name: "2" },
            { ...initEnemyState, name: "3" },
            { ...initEnemyState, name: "4" },
            { ...initEnemyState, name: "5" },
          ];
        });
      },
      modifyBattle: () => {},
      endTurn: () => {},
      endEnemyTurn: () => {},
      nextWave: () => {},
      moveLeft: () => {
        set((state) => {
          if (state.targeting === 0) {
            state.targeting = 4;
          }
          state.targeting = state.targeting - 1;
        });
      },
      moveRight: () => {
        set((state) => {
          if (state.targeting === 4) {
            state.targeting = 0;
          }
          state.targeting = state.targeting + 1;
        });
      },
      debug: () => {
        set((state) => {
          console.log(p(state));
        });
      },
      basicAction: (position: number) => {
        set((state) => {
          const prevState = p(state);
          state.undo.push(prevState);
          state.characters[position].isMoved = true;
          const oG = p(state);
          basic(position, state, oG);
          //const prevState = {
          //  wave: p(state.wave),
          //  turn: p(state.turn),
          //  turn_state: p(state.turn_state),
          //  enemies: p(state.enemies),
          //  characters: p(state.characters),
          //  damage_log_1: p(state.damage_log_1),
          //  damage_log_2: p(state.damage_log_2),
          //  damage_log_3: p(state.damage_log_3),
          //  damage_log_4: p(state.damage_log_4),
          //  damage_log_5: p(state.damage_log_5),
          //  battle_log: p(state.battle_log),
          //  action: p(state.action),
          //  enemy_damage_log_1: p(state.enemy_damage_log_1),
          //  enemy_damage_log_2: p(state.enemy_damage_log_2),
          //  enemy_damage_log_3: p(state.enemy_damage_log_3),
          //  enemy_damage_log_4: p(state.enemy_damage_log_4),
          //  enemy_damage_log_5: p(state.enemy_damage_log_5),
          //  stage_state: p(state.stage_state),
          //};
          //state.undo.push(prevState);
          //state.action.push({ position, targeting: state.targeting });
          //
          parseAddon(
            state,
            oG,
            position,
            [Condition.BASIC_ATTACK, Condition.ATTACK, Condition.MOVE],
            CharacterAction.BASIC,
          );
          parseCondition(
            state,
            oG,
            position,
            [Condition.BASIC_ATTACK, Condition.ATTACK, Condition.MOVE],
            CharacterAction.BASIC,
          );
          // Trigger Reflect
          state.characters.forEach((character, index) => {
            if (character.isHeal === true) {
              parseCondition(
                state,
                oG,
                index,
                [Condition.GET_HEAL],
                CharacterAction.BASIC,
              );
              character.isHeal = false;
            }
          });
          checkEndTurn(state, oG);
        });
      },
      ultAction: (position: number) => {
        set((state) => {
          const prevState = p(state);
          state.undo.push(prevState);
          //const prevState = {
          //  wave: p(state.wave),
          //  turn: p(state.turn),
          //  turn_state: p(state.turn_state),
          //  enemies: p(state.enemies),
          //  characters: p(state.characters),
          //  damage_log_1: p(state.damage_log_1),
          //  damage_log_2: p(state.damage_log_2),
          //  damage_log_3: p(state.damage_log_3),
          //  damage_log_4: p(state.damage_log_4),
          //  damage_log_5: p(state.damage_log_5),
          //  battle_log: p(state.battle_log),
          //  action: p(state.action),
          //  enemy_damage_log_1: p(state.enemy_damage_log_1),
          //  enemy_damage_log_2: p(state.enemy_damage_log_2),
          //  enemy_damage_log_3: p(state.enemy_damage_log_3),
          //  enemy_damage_log_4: p(state.enemy_damage_log_4),
          //  enemy_damage_log_5: p(state.enemy_damage_log_5),
          //  stage_state: p(state.stage_state),
          //};
          //state.undo.push(prevState);
          //state.action.push({
          //  position: position + 5,
          //  targeting: state.targeting,
          //});
          state.characters[position].isMoved = true;
          //state.characters[position].cd = state.characters[position].maxCd;
          //
          //const oldState = p(state);
          //ultimateAttack(state, position);
          //console.log(p(state.characters[position].buff));
          //
          //parseConditionAddon(
          //  position,
          //  [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
          //  state,
          //  oldState,
          //);
          //parseCondition(
          //  position,
          //  [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
          //  state,
          //  oldState,
          //);
          //
          //state.characters.forEach((character, index) => {
          //  if (character.isHeal === true) {
          //    parseCondition(index, [Condition.GET_HEAL], state, oldState);
          //  }
          //  character.isHeal = false;
          //});
          //
          //applyExtra(state, position);
          //checkEndTurn(state);
        });
      },
      guardAction: (position: number) => {
        set((state) => {
          const prevState = p(state);
          state.undo.push(prevState);
          //const prevState = {
          //  wave: p(state.wave),
          //  turn: p(state.turn),
          //  turn_state: p(state.turn_state),
          //  enemies: p(state.enemies),
          //  characters: p(state.characters),
          //  damage_log_1: p(state.damage_log_1),
          //  damage_log_2: p(state.damage_log_2),
          //  damage_log_3: p(state.damage_log_3),
          //  damage_log_4: p(state.damage_log_4),
          //  damage_log_5: p(state.damage_log_5),
          //  battle_log: p(state.battle_log),
          //  action: p(state.action),
          //  enemy_damage_log_1: p(state.enemy_damage_log_1),
          //  enemy_damage_log_2: p(state.enemy_damage_log_2),
          //  enemy_damage_log_3: p(state.enemy_damage_log_3),
          //  enemy_damage_log_4: p(state.enemy_damage_log_4),
          //  enemy_damage_log_5: p(state.enemy_damage_log_5),
          //  stage_state: p(state.stage_state),
          //};
          //state.action.push({
          //  position: position + 10,
          //  targeting: state.targeting,
          //});
          //const oldState = p(state);
          state.characters[position].isGuard = true;
          //parseConditionAddon(
          //  position,
          //  [Condition.GUARD, Condition.MOVE],
          //  state,
          //  oldState,
          //);
          //parseCondition(
          //  position,
          //  [Condition.GUARD, Condition.MOVE],
          //  state,
          //  oldState,
          //);
          //checkEndTurn(state);
        });
      },
      healAction: () => {},
      undoLastAction: () => {
        set((state) => {
          const lastState = state.undo.pop();
          if (lastState) {
            state.turn = lastState.turn;
            state.targeting = lastState.targeting;
            state.enemies = lastState.enemies;
            state.characters = lastState.characters;
            state.damageLog1 = lastState.damageLog1;
            state.damageLog2 = lastState.damageLog2;
            state.damageLog3 = lastState.damageLog3;
            state.damageLog4 = lastState.damageLog4;
            state.damageLog5 = lastState.damageLog5;
            state.battleLog = lastState.battleLog;
            state.action = lastState.action;
            state.enemyDamageLog1 = lastState.enemyDamageLog1;
            state.enemyDamageLog2 = lastState.enemyDamageLog2;
            state.enemyDamageLog3 = lastState.enemyDamageLog3;
            state.enemyDamageLog4 = lastState.enemyDamageLog4;
            state.enemyDamageLog5 = lastState.enemyDamageLog5;
            state.stageState = lastState.stageStage;
          }
        });
      },
      enableEveryTurnAttack: () => {
        set((state) => {
          state.battleSettings.everyTurnAttack =
            !state.battleSettings.everyTurnAttack;
        });
      },
      addEveryTurnAttackTarget: (target: Target) => {
        set((state) => {
          state.battleSettings.everyTurnAttackTarget = [
            ...state.battleSettings.everyTurnAttackTarget,
            target,
          ];
        });
      },
    })),
    {
      name: "game-state",
      storage: createJSONStorage(() => localforage),
    },
  ),
);
