import Big from "big.js";
import { checkSpecialCondition } from "../condition";
import { GameState } from "../GameState";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "../types/Character";
import { AffectType, DamageType, Skill, Target } from "../types/Skill";

//gameState: GameState,
//oG: GameState,
//value: number,
//position: Target,
//target: Target,
//isTrigger: boolean,
//// TODO true damage heal
//isTrueDamage: boolean,
export function healBasicDamage(
  gameState: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
) {
  let rawAtk = Big(0);
  let atkPercentage = Big(1);
  let basicBuff = Big(1);
  let attacker = [] as Skill[];
  let defender = [] as Skill[];
  let healReceived = Big(1);
  let healIncrease = Big(1);

  let res = Big(0);

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";
  let attackerAtk = 0;

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
      attackerAtk = gameState.enemies[position - 20].atk;
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
      attackerAtk = gameState.characters[position].atk;
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
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage = atkPercentage.add(buff._0.value);
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage = atkPercentage.minus(buff._0.value);
    }

    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage = atkPercentage.add(buff._3?.value * buff._3?.stack);
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage = atkPercentage.minus(buff._3?.value * buff._3?.stack);
    }

    if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
      rawAtk = rawAtk.add(buff._0?.value);
    }

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
  if (atkPercentage.lt(0)) {
    atkPercentage = Big(0);
  }

  const finalAtk = Big(attackerAtk)
    .mul(atkPercentage)
    .round(0, Big.roundDown)
    .add(rawAtk)
    .round(0, Big.roundDown);
  res = Big(0)
    .add(finalAtk)
    .mul(basicBuff)
    .mul(healIncrease)
    .mul(healReceived)
    .mul(value);

  console.log(
    "攻擊力",
    attackerAtk,
    "攻擊%",
    atkPercentage.toNumber(),
    "定值攻擊力",
    rawAtk.toNumber(),
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
