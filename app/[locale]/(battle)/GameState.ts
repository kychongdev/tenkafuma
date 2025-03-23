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
import { useSimulateTeamState } from "../(simulate)/useSimulateState";
import _ from "lodash";

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
    halfPic: boolean;
    expandEnemyBattleLog: boolean;
  };
  enemyBattleLog: any[];
  action: any[];
  battleLog: string[];
  undo: any[];
  stageState: any;
  stage: string;
  receivedAttack: {
    attacker: number;
    defender: number;
  }[];
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
  clearAllTarget: () => void;
  analysis: (index: number) => void;
  toggleHalfPic: () => void;
}

function resetBattle(state: GameState) {
  state.wave = 1;
  state.turn = 0;
  state.ready = true;
  state.damageLog1 = [];
  state.damageLog2 = [];
  state.damageLog3 = [];
  state.damageLog4 = [];
  state.damageLog5 = [];
  state.healLog = [];
  state.battleLog = [];
  state.action = [];
  state.undo = [];
  state.receivedAttack = [];
  state.enemyBattleLog = [];
}

function resetLock(state: GameState, p: number) {
  state.characters[p].lock1 = 0;
  state.characters[p].lock2 = 1;
  state.characters[p].lock3 = 2;
  state.characters[p].lock4 = 3;
  state.characters[p].lock5 = 4;
}
const initEnemyState = {
  ...initCharacterState,
  id: "dummy",
  maxHp: 5063653034,
  hp: 5063653034,
  isExist: true,
};

const saveToAnalysis = useSimulateTeamState.getState().saveToAnalysis;

export const useGameState = create<GameState>()(
  persist(
    immer((set) => ({
      clientId: "",
      wave: 0,
      ready: false,
      turn: 0,
      receivedAttack: [],
      enemies: [
        { ...initEnemyState, name: "1" },
        { ...initEnemyState, name: "2" },
        { ...initEnemyState, name: "3" },
        { ...initEnemyState, name: "4" },
        { ...initEnemyState, name: "5" },
      ],
      stage: "dummy",
      stageState: {},
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
        everyTurnAttackTarget: [],
        halfPic: false,
        expandEnemyBattleLog: false,
      },
      select: null,
      targeting: 0,
      undo: [],
      damageLog1: [],
      damageLog2: [],
      damageLog3: [],
      damageLog4: [],
      damageLog5: [],
      healLog: [],
      battleLog: [],
      action: [],
      enemyBattleLog: [],
      analysis: (position) => {
        set((state) => {
          if (state.select) {
            saveToAnalysis(
              position,
              p({
                select: state.select,
                damageLog1: state.damageLog1,
                damageLog2: state.damageLog2,
                damageLog3: state.damageLog3,
                damageLog4: state.damageLog4,
                damageLog5: state.damageLog5,
              }),
            );
          }
        });
      },
      initBattle: (team: CharacterTeam): void => {
        set((state) => {
          state.clientId = generateClientId(20);
          resetBattle(state);
          state.select = team;
          state.characters = initTeam(team);
          parseInitstage(state);
          initLeadSkill(state);
          initHp(state);
          initPassiveSkill(state, 0);
          initPassiveSkill(state, 1);
          initPassiveSkill(state, 2);
          initPassiveSkill(state, 3);
          initPassiveSkill(state, 4);
          parseStageAction(state, state);
          state.turn = state.turn + 1;
          state.targeting = 0;
          newWaveStart(state, state);
          onTurnStart(state, state);
        });
      },
      initStage: (stage: string) => {
        set((state) => {
          state.clientId = generateClientId(20);
          resetBattle(state);
          state.stage = stage;
          if (state.select) {
            state.characters = initTeam(state.select);
            parseInitstage(state);
            initLeadSkill(state);
            initHp(state);
            initPassiveSkill(state, 0);
            initPassiveSkill(state, 1);
            initPassiveSkill(state, 2);
            initPassiveSkill(state, 3);
            initPassiveSkill(state, 4);
            parseStageAction(state, state);
            state.targeting = 0;
            state.turn = state.turn + 1;
            newWaveStart(state, state);
            onTurnStart(state, state);
          }
          //state.enemies = [
          //  { ...initEnemyState, name: "1" },
          //  { ...initEnemyState, name: "2" },
          //  { ...initEnemyState, name: "3" },
          //  { ...initEnemyState, name: "4" },
          //  { ...initEnemyState, name: "5" },
          //];
        });
      },
      modifyBattle: () => {},
      endTurn: () => {},
      endEnemyTurn: () => {},
      nextWave: () => {},
      moveLeft: () => {
        set((state) => {
          for (let i = 0; i < 5; i++) {
            if (state.targeting === 0) {
              state.targeting = 4;
            } else {
              state.targeting = state.targeting - 1;
            }
            if (
              state.enemies[state.targeting].isExist &&
              !state.enemies[state.targeting].isDead
            ) {
              break;
            }
          }
        });
      },
      moveRight: () => {
        set((state) => {
          for (let i = 0; i < 5; i++) {
            if (state.targeting === 4) {
              state.targeting = 0;
            } else {
              state.targeting = state.targeting + 1;
            }
            if (
              state.enemies[state.targeting].isExist &&
              !state.enemies[state.targeting].isDead
            ) {
              break;
            }
          }
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
            enemyBattleLog: p(state.enemyBattleLog),
            stageState: state.stageState,
          };
          state.undo.push(prevState);
          state.characters[position].isMoved = true;
          state.action.push({ position, targeting: state.targeting });

          basic(position, state, oG);
          parseAddon(
            state,
            oG,
            position,
            [Condition.BASIC_ATTACK, Condition.ATTACK, Condition.MOVE],
            CharacterAction.BASIC,
          );

          // This is wrong ! Need change
          const allyRA = state.receivedAttack.filter(
            (x) => x.defender >= 0 && x.defender <= 4,
          );

          // TODO Enemy Received Attack
          //const enemyRA = state.receivedAttack.filter(
          //  (x) => x.defender >= 20 && x.defender <= 24,
          //);
          //
          //const enemyParseRA = _.uniqBy(enemyRA, "defender");
          //const enemySortedRA = _.sortBy(enemyParseRA, "defender");
          //enemySortedRA.forEach((x) => {
          //  parseCondition(
          //    state,
          //    oG,
          //    x.defender,
          //    [Condition.RECEIVED_ATTACK],
          //    CharacterAction.BASIC,
          //  );
          //});

          const allyParseRA = _.uniqBy(allyRA, "defender");
          const allSortedRA = _.sortBy(allyParseRA, "defender");

          allSortedRA.forEach((x) => {
            parseCondition(
              state,
              oG,
              x.defender,
              [Condition.RECEIVED_ATTACK],
              CharacterAction.BASIC,
            );
          });
          state.receivedAttack = [];
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
          resetLock(state, position);
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
            enemyBattleLog: p(state.enemyBattleLog),
            stageState: p(state.stageState),
          };
          state.undo.push(prevState);
          state.characters[position].isMoved = true;
          state.action.push({
            position: position + 5,
            targeting: state.targeting,
          });
          state.characters[position].cd = state.characters[position].maxCd;
          ultimate(state, oG, position);

          parseAddon(
            state,
            oG,
            position,
            [Condition.ULTIMATE, Condition.ATTACK, Condition.MOVE],
            CharacterAction.ULTIMATE,
          );

          const allyRA = state.receivedAttack.filter(
            (x) => x.defender >= 0 && x.defender <= 4,
          );

          // TODO Enemy Received Attack
          //const enemyRA = state.receivedAttack.filter(
          //  (x) => x.defender >= 20 && x.defender <= 24,
          //);
          //
          //const enemyParseRA = _.uniqBy(enemyRA, "defender");
          //const enemySortedRA = _.sortBy(enemyParseRA, "defender");
          //enemySortedRA.forEach((x) => {
          //  parseCondition(
          //    state,
          //    oG,
          //    x.defender,
          //    [Condition.RECEIVED_ATTACK],
          //    CharacterAction.BASIC,
          //  );
          //});

          const allyParseRA = _.uniqBy(allyRA, "defender");
          const allSortedRA = _.sortBy(allyParseRA, "defender");
          allSortedRA.forEach((x) => {
            parseCondition(
              state,
              oG,
              x.defender,
              [Condition.RECEIVED_ATTACK],
              CharacterAction.BASIC,
            );
          });

          state.receivedAttack = [];
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
          resetLock(state, position);
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
            enemyBattleLog: p(state.enemyBattleLog),
            stageState: p(state.stageState),
          };
          state.undo.push(prevState);
          state.characters[position].isMoved = true;
          state.action.push({
            position: position + 10,
            targeting: state.targeting,
          });
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
          resetLock(state, position);
        });
      },
      healAction: () => {},
      undoLastAction: () => {
        set((state) => {
          const lastState1 = state.undo.pop();
          if (lastState1) {
            const lastState = p(lastState1);
            state.turn = lastState.turn;
            state.enemies = lastState.enemies;
            state.targeting = lastState.targeting;
            state.characters = lastState.characters;
            state.damageLog1 = lastState.damageLog1;
            state.damageLog2 = lastState.damageLog2;
            state.damageLog3 = lastState.damageLog3;
            state.damageLog4 = lastState.damageLog4;
            state.damageLog5 = lastState.damageLog5;
            state.battleLog = lastState.battleLog;
            state.healLog = lastState.healLog;
            state.action = lastState.action;
            state.enemyBattleLog = lastState.enemyBattleLog;
            state.stageState = lastState.stageState;
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
      toggleHalfPic: () => {
        set((state) => {
          state.battleSettings.halfPic = !state.battleSettings.halfPic;
        });
      },
      expandEnemyBattleLog: () => {
        set((state) => {
          state.battleSettings.expandEnemyBattleLog =
            !state.battleSettings.expandEnemyBattleLog;
        });
      },
      clearAllTarget: () => {
        set((state) => {
          state.battleSettings.everyTurnAttackTarget = [];
        });
      },
    })),
    {
      name: "game-state",
      storage: createJSONStorage(() => localforage),
    },
  ),
);
