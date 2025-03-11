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
import { ultimate } from "./ultimate";

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
  healLog: any[];
  battleSettings: {
    everyTurnAttack: boolean;
    everyTurnAttackTarget: Target[];
  };
  enemyDamageLog1: any[];
  enemyDamageLog2: any[];
  enemyDamageLog3: any[];
  enemyDamageLog4: any[];
  enemyDamageLog5: any[];
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
  state.healLog = [];
  state.battleLog = [];
  state.action = [];
  state.undo = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
  state.enemyDamageLog1 = [];
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
      healLog: [],
      battleLog: [],
      action: [],
      enemyDamageLog1: [],
      enemyDamageLog2: [],
      enemyDamageLog3: [],
      enemyDamageLog4: [],
      enemyDamageLog5: [],
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
            parseInitstage(state);
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
          const oG = p(state);
          const prevState = {
            wave: p(state.wave),
            turn: p(state.turn),
            targeting: p(state.targeting),
            enemies: p(state.enemies),
            characters: p(state.characters),
            damageLog1: p(state.damageLog1),
            damageLog2: p(state.damageLog2),
            damageLog3: p(state.damageLog3),
            damageLog4: p(state.damageLog4),
            damageLog5: p(state.damageLog5),
            battleLog: p(state.battleLog),
            healLog: p(state.healLog),
            action: p(state.action),
            enemyDamageLog1: p(state.enemyDamageLog1),
            enemyDamageLog2: p(state.enemyDamageLog2),
            enemyDamageLog3: p(state.enemyDamageLog3),
            enemyDamageLog4: p(state.enemyDamageLog4),
            enemyDamageLog5: p(state.enemyDamageLog5),
            stageState: p(state.stageState),
          };
          state.undo.push(prevState);
          state.characters[position].isMoved = true;
          //state.action.push({ position, targeting: state.targeting });

          basic(position, state, oG);
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
          const oG = p(state);
          const prevState = {
            wave: p(state.wave),
            turn: p(state.turn),
            targeting: p(state.targeting),
            enemies: p(state.enemies),
            characters: p(state.characters),
            damageLog1: p(state.damageLog1),
            damageLog2: p(state.damageLog2),
            damageLog3: p(state.damageLog3),
            damageLog4: p(state.damageLog4),
            damageLog5: p(state.damageLog5),
            battleLog: p(state.battleLog),
            healLog: p(state.healLog),
            action: p(state.action),
            enemyDamageLog1: p(state.enemyDamageLog1),
            enemyDamageLog2: p(state.enemyDamageLog2),
            enemyDamageLog3: p(state.enemyDamageLog3),
            enemyDamageLog4: p(state.enemyDamageLog4),
            enemyDamageLog5: p(state.enemyDamageLog5),
            //stageState: p(state.stageState),
          };
          state.undo.push(prevState);
          state.characters[position].isMoved = true;
          //state.action.push({
          //  position: position + 5,
          //  targeting: state.targeting,
          //});
          state.characters[position].cd = state.characters[position].maxCd;
          ultimate(state, oG, position);

          parseAddon(
            state,
            oG,
            position,
            [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
            CharacterAction.ULTIMATE,
          );
          parseCondition(
            state,
            oG,
            position,
            [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
            CharacterAction.ULTIMATE,
          );
          //
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
      guardAction: (position: number) => {
        set((state) => {
          const oG = p(state);
          const prevState = {
            wave: p(state.wave),
            turn: p(state.turn),
            enemies: p(state.enemies),
            targeting: p(state.targeting),
            characters: p(state.characters),
            damageLog1: p(state.damageLog1),
            damageLog2: p(state.damageLog2),
            damageLog3: p(state.damageLog3),
            damageLog4: p(state.damageLog4),
            damageLog5: p(state.damageLog5),
            battleLog: p(state.battleLog),
            healLog: p(state.healLog),
            action: p(state.action),
            enemyDamageLog1: p(state.enemyDamageLog1),
            enemyDamageLog2: p(state.enemyDamageLog2),
            enemyDamageLog3: p(state.enemyDamageLog3),
            enemyDamageLog4: p(state.enemyDamageLog4),
            enemyDamageLog5: p(state.enemyDamageLog5),
            //stageState: p(state.stageState),
          };
          state.undo.push(prevState);
          state.characters[position].isMoved = true;
          //state.action.push({
          //  position: position + 10,
          //  targeting: state.targeting,
          //});
          state.characters[position].isGuard = true;

          parseAddon(
            state,
            oG,
            position,
            [Condition.GUARD, Condition.MOVE],
            CharacterAction.GUARD,
          );
          parseCondition(
            state,
            oG,
            position,
            [Condition.GUARD, Condition.MOVE],
            CharacterAction.GUARD,
          );
          //
          state.characters.forEach((character, index) => {
            if (character.isHeal === true) {
              parseCondition(
                state,
                oG,
                index,
                [Condition.GET_HEAL],
                CharacterAction.GUARD,
              );
              character.isHeal = false;
            }
          });
          checkEndTurn(state, oG);
        });
      },
      healAction: () => {},
      undoLastAction: () => {
        set((state) => {
          const lastState = state.undo.pop();
          if (lastState) {
            state.turn = lastState.turn;
            state.enemies = lastState.enemies;
            console.log(p(state.enemies));
            console.log(lastState.targeting);
            state.targeting = lastState.targeting;
            console.log(state.targeting);
            state.characters = lastState.characters;
            state.damageLog1 = lastState.damageLog1;
            state.damageLog2 = lastState.damageLog2;
            state.damageLog3 = lastState.damageLog3;
            state.damageLog4 = lastState.damageLog4;
            state.damageLog5 = lastState.damageLog5;
            state.battleLog = lastState.battleLog;
            state.healLog = lastState.healLog;
            state.action = lastState.action;
            state.enemyDamageLog1 = lastState.enemyDamageLog1;
            state.enemyDamageLog2 = lastState.enemyDamageLog2;
            state.enemyDamageLog3 = lastState.enemyDamageLog3;
            state.enemyDamageLog4 = lastState.enemyDamageLog4;
            state.enemyDamageLog5 = lastState.enemyDamageLog5;
            //state.stageState = lastState.stageStage;
          }
          console.log(p(state.enemies));
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
