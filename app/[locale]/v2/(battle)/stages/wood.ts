import { initCharacterState } from "../placeholder.ts";
import { GameState } from "../GameState";
import { Condition, Target } from "../../_types/Skill";
import { parseCondition } from "../parseCondition";
import { CharacterAttribute } from "../../_types/Character";
import { defaults } from "lodash";

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
  if (gameState.battleSettings.everyTurnAttack) {
    switch (gameState.battleSettings.everyTurnAttackTarget) {
      case Target.POSITION_1:
        gameState.characters[0].hp = gameState.characters[0].hp - 100000;
        parseCondition(0, [Condition.RECEIVED_ATTACK], gameState, gameState);
        break;
      case Target.POSITION_2:
        gameState.characters[1].hp = gameState.characters[1].hp - 100000;
        parseCondition(1, [Condition.RECEIVED_ATTACK], gameState, gameState);
        break;
      case Target.POSITION_3:
        gameState.characters[2].hp = gameState.characters[2].hp - 100000;
        parseCondition(2, [Condition.RECEIVED_ATTACK], gameState, gameState);
        break;
      case Target.POSITION_4:
        gameState.characters[3].hp = gameState.characters[3].hp - 100000;
        parseCondition(3, [Condition.RECEIVED_ATTACK], gameState, gameState);
        break;
      case Target.POSITION_5:
        gameState.characters[4].hp = gameState.characters[4].hp - 100000;
        parseCondition(4, [Condition.RECEIVED_ATTACK], gameState, gameState);
        break;
      case Target.ALL_ALLIES:
        gameState.characters[0].hp = gameState.characters[0].hp - 100000;
        gameState.characters[1].hp = gameState.characters[1].hp - 100000;
        gameState.characters[2].hp = gameState.characters[2].hp - 100000;
        gameState.characters[3].hp = gameState.characters[3].hp - 100000;
        gameState.characters[4].hp = gameState.characters[4].hp - 100000;
        parseCondition(0, [Condition.RECEIVED_ATTACK], gameState, gameState);
        parseCondition(1, [Condition.RECEIVED_ATTACK], gameState, gameState);
        parseCondition(2, [Condition.RECEIVED_ATTACK], gameState, gameState);
        parseCondition(3, [Condition.RECEIVED_ATTACK], gameState, gameState);
        parseCondition(4, [Condition.RECEIVED_ATTACK], gameState, gameState);
        break;
      default:
        break;
    }
  }

  //if (gameState.turn !== 0) {
  //parseCondition(0, [Condition.RECEIVED_ATTACK], gameState);
  //}
}
