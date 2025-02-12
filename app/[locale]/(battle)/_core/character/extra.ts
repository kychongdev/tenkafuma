import {
  AffectType,
  Condition,
  DamageType,
  Skill,
  Target,
} from "@/types/Skill";
import { CharacterAction, CharacterClass } from "@/types/Character";
import { GameState } from "../GameState";
import { triggerSkill } from "../triggerSkill";

export function applyExtra(gameState: GameState, position: number) {
  const bond = gameState.characters[position].bond;
  switch (gameState.characters[position].id) {
    case "10123":
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10123-ult-2",
              name: "攻擊時，觸發『以自身攻擊力59%對目標造成傷害』(3回合)",
              type: 1,
              condition: Condition.ATTACK,
              duration: 3,
              _1: {
                value: bond === 1
                  ? 0.33
                  : bond === 2
                  ? 0.39
                  : bond === 3
                  ? 0.46
                  : bond === 4
                  ? 0.52
                  : 0.59,
                target: Target.ENEMY,
                damageType: DamageType.TRIGGER,
                action: CharacterAction.ATTACK,
              },
            },
          ];
        }
      });
      break;
    case "10134":
      // 使自身獲得『攻擊時，觸發「以自身攻擊力0/0/10/12.5/15使自身以外我方全體攻擊力增加(1回合)」』(5回合)
      if (gameState.characters[position].bond > 2) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10134-ult-1",
            name:
              "攻擊時，觸發『以自身攻擊力使自身以外我方全體攻擊力增加』(1回合)",
            type: 6,
            condition: Condition.ATTACK,
            duration: 5,
            _6: {
              value: bond === 3 ? 0.1 : bond === 4 ? 0.125 : 0.15,
              target: Target.ALL_EXCEPT_SELF,
              base: false,
              affectType: AffectType.RAW_ATK,
              duration: 1,
            },
          },
        ];
      }
      break;
    case "10044": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10044-ult-1",
            name: `必殺時，觸發『使自身必殺技傷害增加${
              bond === 1
                ? 20
                : bond === 2
                ? 22.5
                : bond === 3
                ? 25
                : bond === 4
                ? 27.5
                : 30
            }%(最多2層)』`,
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 1,
            _4: {
              increaseStack: 1,
              targetSkill: "10044-ult-1-1",
              target: Target.SELF,
              applySkill: {
                id: "10044-ult-1-1",
                name: "受到風屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10044-ult-1-1",
                  name: "必殺技傷害增加",
                  value: bond === 1
                    ? 0.2
                    : bond === 2
                    ? 0.225
                    : bond === 3
                    ? 0.25
                    : bond === 4
                    ? 0.275
                    : 0.3,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            },
          },
          {
            id: "10044-ult-2",
            name: `普攻時，觸發『使自身普攻傷害增加${
              bond === 1
                ? 20
                : bond === 2
                ? 25
                : bond === 3
                ? 30
                : bond === 4
                ? 35
                : 40
            }%(最多2層)』`,
            type: 4,
            condition: Condition.BASIC_ATTACK,
            duration: 2,
            _4: {
              increaseStack: 1,
              targetSkill: "10044-ult-2-1",
              target: Target.SELF,
              applySkill: {
                id: "10044-ult-2-1",
                name: "普攻傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10044-ult-2-1",
                  name: "普攻傷害增加",
                  value: bond === 1
                    ? 0.2
                    : bond === 2
                    ? 0.25
                    : bond === 3
                    ? 0.3
                    : bond === 4
                    ? 0.35
                    : 0.4,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_BASIC_DMG,
                },
              },
            },
          },
        ];
      });
      break;
    }
    case "10153": {
      //this suck ass TODO
      const skill: Skill = {
        id: "10153-ult-1",
        name: "《向聖杯祈願》",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        disabledOnSkill: "10153-passive-1-1",
        _4: {
          increaseStack: 1,
          targetSkill: "10153-ult-1-1",
          target: Target.SELF,
          applySkill: {
            id: "10153-ult-1-1",
            name: "《向聖杯祈願》",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10153-ult-1-1",
              name: "《向聖杯祈願》",
              stack: bond === 1
                ? 6
                : bond === 2
                ? 7
                : bond === 3
                ? 8
                : bond === 4
                ? 9
                : 10,
              maxStack: 10,
              value: 0,
              affectType: AffectType.NONE,
            },
          },
        },
      };
      triggerSkill(skill, gameState, position);
      break;
    }

    case "10157": {
      const skill: Skill = {
        id: "10157-ult-1",
        name: "《純真祈願》",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        disabledOnSkill: "10157-passive-1-1",
        _4: {
          increaseStack: 1,
          targetSkill: "10157-ult-1-1",
          target: Target.SELF,
          applySkill: {
            id: "10157-ult-1-1",
            name: "《向聖杯祈願》",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10153-ult-1-1",
              name: "《向聖杯祈願》",
              stack: bond === 1
                ? 6
                : bond === 2
                ? 7
                : bond === 3
                ? 8
                : bond === 4
                ? 9
                : 10,
              maxStack: 10,
              value: 0,
              affectType: AffectType.NONE,
            },
          },
        },
      };
      triggerSkill(skill, gameState, position);
    }
    default:
      break;
  }
}
