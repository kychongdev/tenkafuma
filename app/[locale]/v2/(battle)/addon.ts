import { applyDamage, applyDamageTrigger, checkOpponent } from "./applyDamage";
import { basicDamage } from "./calculations/basicDamage";
import { ultDamage } from "./calculations/ultDamage";
import { checkSpecialCondition } from "./condition";
import { GameState } from "./GameState";
import { CharacterAction } from "./types/Character";
import { AffectType, DamageType, Skill, Target } from "./types/Skill";
import { checkAvailable } from "./utils";

export function addOn(
  G: GameState,
  oG: GameState,
  p: number,
  buff: Skill,
  ca: CharacterAction,
) {
  switch (buff.type) {
    case 0: {
      break;
    }
  }
}
