import { GameState } from "./GameState";
import { SpecialCondition } from "./types/Skill";

export function checkSpecialCondition(
  G: GameState,
  oG: GameState,
  position: number,
) {
  if (position >= 20 && position < 25) {
    return G.enemies[position - 20].buff
      .map((buff) => {
        switch (buff.specialCondition) {
          case SpecialCondition.HP_LOWER_THAN: {
            if (!buff.specialConditionValue) {
              return buff;
            }
            if (
              (G.enemies[position - 20].hp / G.enemies[position - 20].maxHp) *
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
              (G.enemies[position - 20].hp / G.enemies[position - 20].maxHp) *
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
            const skill = G.enemies[position - 20].buff.find(
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
  return G.characters[position].buff
    .map((buff) => {
      switch (buff.specialCondition) {
        case SpecialCondition.HP_LOWER_THAN: {
          if (!buff.specialConditionValue) {
            return buff;
          }
          if (
            (G.characters[position].hp / G.characters[position].maxHp) * 100 <
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
            (G.characters[position].hp / G.characters[position].maxHp) * 100 >
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
          const skill = G.characters[position].buff.find(
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
          const skill = G.characters[position].buff.find(
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
