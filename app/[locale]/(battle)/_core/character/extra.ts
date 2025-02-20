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
      break;
    case "10134":
      break;
    case "10044": {
      break;
    }
    case "10153": {
      //this suck ass TODO
      break;
    }

    case "10157": {
    }
    default:
      break;
  }
}
