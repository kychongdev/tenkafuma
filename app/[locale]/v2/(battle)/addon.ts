import { GameState } from "./GameState";
import { CharacterAction } from "./types/Character";
import {
  AffectType,
  DamageType,
  Skill,
  SpecialCondition,
  Target,
} from "./types/Skill";
import {
  basicToSpecificPos,
  basicToTargeting,
  ultToTargeting,
} from "./applyDamage";

export function addOn(
  G: GameState,
  oG: GameState,
  p: number,
  buff: Skill,
  ca: CharacterAction,
) {
  if (buff.specialCondition === SpecialCondition.SKILL_STACK_MORE_THAN) {
    if (!buff.specialConditionValue) {
      return;
    }
    if (!buff.specialConditionSkill) {
      return;
    }
    const skill = oG.characters[p].buff.find(
      (x) => x.id === buff.specialConditionSkill,
    );
    if (!skill) {
      return;
    }
    if (skill && skill._3 && skill._3?.stack < buff.specialConditionValue) {
      return;
    }
  }

  switch (buff.type) {
    case 0: {
      break;
    }
    case 101: {
      // 傷害
      if (!buff._101) {
        console.log("Wrong data");
        break;
      }

      const d = buff._101.defender;
      const dt = buff._101.damageType;
      const v = buff._101.value;

      switch (buff._101.damageType) {
        case DamageType.BASIC_ADDON: {
          if (d === Target.ENEMY) {
            basicToTargeting(G, oG, v, p, d, false, dt, ca);
          } else {
            basicToSpecificPos(G, oG, v, p, d, false, dt, ca);
          }
          break;
        }
        case DamageType.ULTIMATE: {
          if (d === Target.ENEMY) {
            ultToTargeting(G, oG, v, p, d, false, false, dt, ca);
          }
          break;
        }
        case DamageType.ULTIMATE_ADDON: {
          if (d === Target.ENEMY) {
            ultToTargeting(G, oG, v, p, d, false, false, dt, ca);
          }
          break;
        }
      }
      break;
    }
  }
}
