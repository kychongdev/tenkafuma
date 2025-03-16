import { GameState } from "../GameState";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { CharacterState } from "../types/Select";
import { AffectType, Condition, SpecialCondition } from "../types/Skill";

export function r21_sp(gameState: GameState) {
  const enemy1: CharacterState = {
    id: "15114",
    name: "死灵女王　艾莉莎白",
    isExist: true,
    baseAtk: 500,
    baseHp: 500000,
    maxAtk: 868721,
    maxHp: 6515412293,
    atk: 868721,
    hp: 6515412293,
    bond: 1,
    stars: 3,
    passive4: false,
    attribute: CharacterAttribute.DARK,
    position: 0,
    class: CharacterClass.NONE,
    cd: 3,
    maxCd: 3,
    ultName: "尸爆术",
    isMoved: false,
    isGuard: false,
    isBroken: false,
    isTaunt: false,
    isParalysis: false,
    isSleep: false,
    isHeal: false,
    isSilence: false,
    isDead: false,
    attackedBy: [],
    buff: [
      {
        id: "15114-passive-1",
        name: "《藏於屍林》的層次≧1时，開啟「受到傷害减少500%」",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
        specialConditionValue: 0,
        specialConditionSkill: "15114-passive-2",
        _0: {
          affectType: AffectType.INCREASE_DMG_RECEIVED,
          value: 5,
        },
      },
      {
        id: "15114-passive-2-1",
        name: "《藏于尸林》",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _3: {
          id: "15114-passive-2-1",
          name: "《藏于尸林》",
          stack: 10,
          affectType: AffectType.NONE,
          value: 0,
          maxStack: 10,
        },
      },
      {
        id: "15114-passive-3",
        name: "艾莉莎白隐身于死灵大军中，导致无法伤害到她",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.NONE,
          value: 0,
        },
      },
      {
        id: "15114-passive-4",
        name: "或许可以尝试减少她面前的死灵数量，迫使她现身",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.NONE,
          value: 0,
        },
      },
      {
        id: "15114-passive-5",
        name: "普攻时，触发「使敌方全体获得2层『受到伤害增加1%(最多100%)』」",
        type: 1,
        condition: Condition.BASIC_ATTACK,
        duration: 100,
      },
      {
        id: "15114-passive-6",
        name: "HP不会低于0.01%",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.HP_LOCK_PERCENTAGE,
          value: 0.1,
        },
      },
      {
        id: "15114-passive-7",
        name: "每经过1回合，发动「使自身攻击力增加5%(最多50层)」效果;",
        type: 4,
        condition: Condition.EVERY_X_TURN,
        duration: 100,
      },
    ],
    lib: 0,
  };

  gameState.enemies = [enemy1, enemy1, enemy1, enemy1, enemy1];
}
export function r21_sp_action(gameState: GameState, oG: GameState) {}
