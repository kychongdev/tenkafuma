import { initCharacterState } from "@/placeholder/team";
import { GameState } from "../GameState";
import { Condition } from "../../_types/Skill";
import { parseCondition } from "../parseCondition";

export function wood(gameState: GameState) {
  gameState.enemies = [
    { ...initCharacterState, id: "wood", maxHp: 5063653034, hp: 5063653034 },
  ];
}

export function wood_action(gameState: GameState) {
  //if (gameState.turn !== 0) {
  //parseCondition(0, [Condition.RECEIVED_ATTACK], gameState);
  //}
}
