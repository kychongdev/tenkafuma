import Big from "big.js";
import { checkSpecialCondition } from "../condition";
import { GameState } from "../GameState";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "../types/Character";
import { AffectType, DamageType, Skill, Target } from "../types/Skill";

export function healHpBasicDamage(
  gameState: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
) {
  let hp = Big(0);
  let basicBuff = Big(1);
  let attacker = [] as Skill[];
  let defender = [] as Skill[];
  let healReceived = Big(1);
  let healIncrease = Big(1);

  let res = Big(0);

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";

  // you need to specify the enemy position
  switch (position) {
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[position - 20].class;
      attackerAttribute = gameState.enemies[position - 20].attribute;
      attackerId = gameState.enemies[position - 20].id;
      hp = Big(gameState.enemies[position - 20].hp);
      break;
    }
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.characters[position].class;
      attackerAttribute = gameState.characters[position].attribute;
      attackerId = gameState.characters[position].id;
      hp = Big(gameState.characters[position].hp);
      break;
  }

  switch (target) {
    case Target.ENEMY:
      defender = checkSpecialCondition(gameState, oG, gameState.targeting + 20);
      defender = gameState.enemies[gameState.targeting].buff;
      defenderClass = gameState.characters[gameState.targeting].class;
      defenderAttribute = gameState.characters[gameState.targeting].attribute;
      defenderId = gameState.characters[gameState.targeting].id;
      break;
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.enemies[target - 20].class;
      defenderAttribute = gameState.enemies[target - 20].attribute;
      defenderId = gameState.enemies[target - 20].id;
      break;
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.characters[target].class;
      defenderAttribute = gameState.characters[target].attribute;
      defenderId = gameState.characters[target].id;
      break;
  }

  for (const buff of attacker) {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_BASIC_DMG
    ) {
      basicBuff = basicBuff.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_BASIC_DMG
    ) {
      basicBuff = basicBuff.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DMG
    ) {
      basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DMG
    ) {
      basicBuff = basicBuff.minus(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_HEAL_RATE
    ) {
      healIncrease = healIncrease.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_HEAL_RATE
    ) {
      healIncrease = healIncrease.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_HEAL_RATE
    ) {
      healIncrease = healIncrease.add(Big(buff._3?.value).mul(buff._3?.stack));
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_HEAL_RATE
    ) {
      healIncrease = healIncrease.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
  }

  for (const buff of defender) {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_HEAL_RECEIVED
    ) {
      healReceived = healReceived.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_HEAL_RECEIVED
    ) {
      healReceived = healReceived.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_HEAL_RECEIVED
    ) {
      healReceived = healReceived.add(Big(buff._3?.value).mul(buff._3?.stack));
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_HEAL_RECEIVED
    ) {
      healReceived = healReceived.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
  }
  if (basicBuff.lt(0)) {
    basicBuff = Big(0);
  }
  if (healIncrease.lt(0)) {
    healIncrease = Big(0);
  }
  if (healReceived.lt(0)) {
    healReceived = Big(0);
  }

  res = Big(0)
    .add(hp)
    .mul(basicBuff)
    .mul(healIncrease)
    .mul(healReceived)
    .mul(value);

  console.log(
    "Hp",
    hp,
    "普攻",
    basicBuff.toNumber(),
    "進行治療時回復量",
    healIncrease.toNumber(),
    "被治療時獲得回復量",
    healReceived.toNumber(),
    "倍率",
    value,
  );
  return res;
}
