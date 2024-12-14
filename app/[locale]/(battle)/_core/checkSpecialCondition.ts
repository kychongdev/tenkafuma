import { SpecialCondition } from "../_types/Skill";
import { GameState } from "./GameState";
import { p } from "./utils";

export function checkSpecialCondition(gameState: GameState, position: number) {
  if (position >= 20 && position < 25) {
    return gameState.enemies[position - 20].buff
      .map((buff) => {
        switch (buff.specialCondition) {
          case SpecialCondition.HP_LOWER_THAN: {
            if (!buff.specialConditionValue) {
              return buff;
            }
            if (
              (gameState.enemies[position - 20].hp /
                gameState.enemies[position - 20].maxHp) *
                100 <
              buff.specialConditionValue
            ) {
              return buff;
            }
            return;
          }

          case SpecialCondition.HP_HIGHER_THAN: {
            if (!buff.specialConditionValue) {
              return buff;
            }
            if (
              (gameState.enemies[position - 20].hp /
                gameState.enemies[position - 20].maxHp) *
                100 >
              buff.specialConditionValue
            ) {
              return buff;
            } else {
              return;
            }
          }

          case SpecialCondition.SKILL_STACK_MORE_THAN: {
            if (!buff.specialConditionValue) {
              return;
            }
            if (!buff.specialConditionSkill) {
              return;
            }
            const skill = gameState.enemies[position - 20].buff.find(
              (x) => x.id === buff.specialConditionSkill,
            );
            if (
              skill &&
              skill._3 &&
              skill._3?.stack > buff.specialConditionValue
            ) {
              return buff;
            } else {
              return;
            }
          }
          default:
            return buff;
        }
      })
      .filter((item) => item !== undefined);
  }

  // Characters
  return gameState.characters[position].buff
    .map((buff) => {
      switch (buff.specialCondition) {
        case SpecialCondition.HP_LOWER_THAN: {
          if (!buff.specialConditionValue) {
            return buff;
          }
          if (
            (gameState.characters[position].hp /
              gameState.characters[position].maxHp) *
              100 <
            buff.specialConditionValue
          ) {
            return buff;
          }
          return;
        }

        case SpecialCondition.HP_HIGHER_THAN: {
          if (!buff.specialConditionValue) {
            return buff;
          }
          if (
            (gameState.characters[position].hp /
              gameState.characters[position].maxHp) *
              100 >
            buff.specialConditionValue
          ) {
            return buff;
          } else {
            return;
          }
        }

        case SpecialCondition.SKILL_STACK_MORE_THAN: {
          if (!buff.specialConditionValue && buff.specialConditionValue !== 0) {
            return;
          }
          if (!buff.specialConditionSkill) {
            return;
          }
          const skill = gameState.characters[position].buff.find(
            (x) => x.id === buff.specialConditionSkill,
          );
          if (
            skill &&
            skill._3 &&
            skill._3?.stack > buff.specialConditionValue
          ) {
            return buff;
          } else {
            return;
          }
        }

        case SpecialCondition.SKILL_STACK_LESS_THAN: {
          if (!buff.specialConditionValue) {
            return;
          }
          if (!buff.specialConditionSkill) {
            return;
          }
          const skill = gameState.characters[position].buff.find(
            (x) => x.id === buff.specialConditionSkill,
          );
          if (
            skill &&
            skill._3 &&
            skill._3?.stack < buff.specialConditionValue
          ) {
            return buff;
          } else {
            return;
          }
        }
        default:
          return buff;
      }
    })
    .filter((item) => item !== undefined);
}
