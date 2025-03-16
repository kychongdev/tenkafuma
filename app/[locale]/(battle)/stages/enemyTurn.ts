//import { Condition } from "@/types/Skill";
//import { GameState } from "../GameState";
//
//export function onTurnStart(gameState: GameState) {
//  gameState.enemies.forEach((enemy, position) => {
//    for (const buff of enemy.buff) {
//      if (
//        buff.condition === Condition.EVERY_X_TURN &&
//        buff.conditionTurn &&
//        gameState.turn > 1
//      ) {
//        if ((gameState.turn - 1) % buff.conditionTurn === 0) {
//          triggerSkill(buff, gameState, position);
//        }
//      }
//      if (buff.condition === Condition.TURN) {
//        if (buff.conditionTurn) {
//          if (gameState.turn === buff.conditionTurn) {
//            triggerSkill(buff, gameState, position);
//          }
//        }
//      }
//      if (buff.condition === Condition.ON_TURN_START && gameState.turn === 1) {
//        triggerSkill(buff, gameState, position);
//      }
//
//      if (
//        buff.condition === Condition.ON_SPECIFIC_TURN &&
//        gameState.turn === buff.conditionTurn
//      ) {
//        triggerSkill(buff, gameState, position);
//      }
//    }
//  });
//}
