import { DamageType } from "./Skill";
import { CharacterAction } from "./Character";

export interface DamageLog {
  damage: number;
  type: DamageType;
  turn: number;
  attacker?: number;
  defender: number;
  action?: CharacterAction;
}
