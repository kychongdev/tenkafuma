import { initCharacterState } from "@/placeholder/team";
import { GameState } from "../GameState";
import { Condition } from "../../_types/Skill";
import { parseCondition } from "../parseCondition";
import { CharacterAttribute } from "../../_types/Character";

export function wood(gameState: GameState) {
  gameState.enemies = [
    {
      ...initCharacterState,
      id: "wood",
      //maxHp: 10854389981,
      //hp: 10854389981,
      maxHp: 5063653034,
      hp: 5063653034,
      //attribute: CharacterAttribute.WATER,
    },
  ];
}

export function wood_action(gameState: GameState) {
  //if (gameState.turn !== 0) {
  //parseCondition(0, [Condition.RECEIVED_ATTACK], gameState);
  //}
}
