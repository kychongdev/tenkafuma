import { initCharacterState } from "../placeholder.ts";
import { GameState } from "../GameState.ts";
import { parseCondition } from "../parseCondition.ts";
import { CharacterAction } from "../types/Character.ts";
import { Condition, Target } from "../types/Skill.ts";

export function dummy(gameState: GameState) {
  gameState.enemies = [
    {
      ...initCharacterState,
      id: "dummy-1",
      name: "1",
      isExist: true,
      maxHp: 20000000000,
      hp: 20000000000,
      //maxHp: 10854389981,
      //hp: 10854389981,
      //maxHp: 5063653034,
      //hp: 5063653034,
      //attribute: CharacterAttribute.WATER,
    },
    {
      ...initCharacterState,
      id: "dummy-2",
      name: "2",
      isExist: false,
      //maxHp: 10854389981,
      //hp: 10854389981,
      maxHp: 5063653034,
      hp: 5063653034,
    },
    {
      ...initCharacterState,
      id: "dummy-3",
      name: "3",
      isExist: false,
      //maxHp: 10854389981,
      //hp: 10854389981,
      maxHp: 5063653034,
      hp: 5063653034,
    },
    {
      ...initCharacterState,
      id: "dummy-4",
      name: "4",
      isExist: false,
      //maxHp: 10854389981,
      //hp: 10854389981,
      maxHp: 5063653034,
      hp: 5063653034,
    },
    {
      ...initCharacterState,
      id: "dummy-5",
      name: "5",
      isExist: false,
      //maxHp: 10854389981,
      //hp: 10854389981,
      maxHp: 5063653034,
      hp: 5063653034,
    },
  ];
}

export function dummy_action(gameState: GameState, oG: GameState) {
  if (gameState.battleSettings.everyTurnAttack && gameState.turn !== 0) {
    gameState.battleSettings.everyTurnAttackTarget.forEach((target) => {
      switch (target) {
        case Target.POSITION_1:
        case Target.POSITION_2:
        case Target.POSITION_3:
        case Target.POSITION_4:
        case Target.POSITION_5:
          gameState.characters[target].hp =
            gameState.characters[target].hp - 100000;
          parseCondition(
            gameState,
            oG,
            target,
            [Condition.RECEIVED_ATTACK],
            CharacterAction.ATTACKED,
          );
          break;
        case Target.ALL_ALLIES:
          gameState.characters[0].hp = gameState.characters[0].hp - 100000;
          gameState.characters[1].hp = gameState.characters[1].hp - 100000;
          gameState.characters[2].hp = gameState.characters[2].hp - 100000;
          gameState.characters[3].hp = gameState.characters[3].hp - 100000;
          gameState.characters[4].hp = gameState.characters[4].hp - 100000;
          parseCondition(
            gameState,
            oG,
            0,
            [Condition.RECEIVED_ATTACK],
            CharacterAction.ATTACKED,
          );
          parseCondition(
            gameState,
            oG,
            1,
            [Condition.RECEIVED_ATTACK],
            CharacterAction.ATTACKED,
          );
          parseCondition(
            gameState,
            oG,
            2,
            [Condition.RECEIVED_ATTACK],
            CharacterAction.ATTACKED,
          );
          parseCondition(
            gameState,
            oG,
            3,
            [Condition.RECEIVED_ATTACK],
            CharacterAction.ATTACKED,
          );
          parseCondition(
            gameState,
            oG,
            4,
            [Condition.RECEIVED_ATTACK],
            CharacterAction.ATTACKED,
          );

          break;
        default:
          break;
      }
    });
  }

  //if (gameState.turn !== 0) {
  //parseCondition(0, [Condition.RECEIVED_ATTACK], gameState);
  //}
}
