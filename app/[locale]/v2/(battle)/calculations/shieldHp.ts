import { GameState } from "../GameState";
import Big from "big.js";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { checkSpecialCondition } from "../condition";

export function shieldUltHp(
  gameState: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
  isTrigger: boolean,
  // TODO true damage shield
  isTrueDamage: boolean,
) {
  let hp = Big(0);
  let increaseDamage = Big(1);
  let enemyDamageReceivedIncrease = Big(1);
  let attributeDamage = Big(1);
  let ultBuff = Big(1);
  let shieldReceived = Big(1);
  let shieldIncrease = Big(1);
  let attacker = [] as Skill[];
  let defender = [] as Skill[];

  let res = Big(0);

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;

  switch (position) {
    case Target.ENEMY_1: {
      hp = Big(gameState.enemies[0].hp);
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[0].class;
      attackerAttribute = gameState.enemies[0].attribute;
      attackerId = gameState.enemies[0].id;
      break;
    }
    case Target.ENEMY_2: {
      hp = Big(gameState.enemies[1].hp);
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      break;
    }
    case Target.ENEMY_3: {
      hp = Big(gameState.enemies[2].hp);
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      break;
    }
    case Target.ENEMY_4: {
      hp = Big(gameState.enemies[3].hp);
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      break;
    }
    case Target.ENEMY_5: {
      hp = Big(gameState.enemies[4].hp);
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[4].class;
      attackerAttribute = gameState.enemies[4].attribute;
      attackerId = gameState.enemies[4].id;
      break;
    }
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      hp = Big(gameState.characters[position].hp);
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.characters[position].class;
      attackerAttribute = gameState.characters[position].attribute;
      attackerId = gameState.characters[position].id;
  }

  switch (target) {
    case Target.ENEMY:
      defender = checkSpecialCondition(gameState, oG, gameState.targeting + 20);
      defenderClass = gameState.characters[gameState.targeting].class;
      defenderAttribute = gameState.characters[gameState.targeting].attribute;
      defenderId = gameState.characters[gameState.targeting].id;
      defenderisGuard = gameState.characters[gameState.targeting].isGuard;
      break;
    case Target.ENEMY_1:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.enemies[0].class;
      defenderAttribute = gameState.enemies[0].attribute;
      defenderId = gameState.enemies[0].id;
      defenderisGuard = gameState.characters[0].isGuard;
      break;
    case Target.ENEMY_2:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.enemies[1].class;
      defenderAttribute = gameState.enemies[1].attribute;
      defenderId = gameState.enemies[1].id;
      defenderisGuard = gameState.characters[1].isGuard;
      break;
    case Target.ENEMY_3:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.enemies[2].class;
      defenderAttribute = gameState.enemies[2].attribute;
      defenderId = gameState.enemies[2].id;
      defenderisGuard = gameState.characters[2].isGuard;
      break;
    case Target.ENEMY_4:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.enemies[3].class;
      defenderAttribute = gameState.enemies[3].attribute;
      defenderId = gameState.enemies[3].id;
      defenderisGuard = gameState.characters[3].isGuard;
      break;
    case Target.ENEMY_5:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.enemies[4].class;
      defenderAttribute = gameState.enemies[4].attribute;
      defenderId = gameState.enemies[4].id;
      defenderisGuard = gameState.characters[4].isGuard;
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
      defenderisGuard = gameState.characters[target].isGuard;
      break;
  }

  for (const buff of attacker) {
    //護盾公式 = 攻擊力 x 招式倍率 x (1+護盾效果±%)  x (1+獲得護盾時可吸收傷害值±%) x (1+其他±%)
    //護盾效果增加/造成護盾量增加/受到護盾效果增加：黑白被動、誕矮被動...等
    //
    //其他
    //普攻傷害增加(普增)： 春忍被動、聖女隊長技、煌星被動...等
    //必殺技傷害增加(必增)： 煌星5星被動、花巴大招...等
    //造成觸發技效果增加： 夏天隊長技
    //
    //護盾效果→→造成護盾量增加
    //……可吸收……→→受到護盾量增加
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DMG
    ) {
      ultBuff = ultBuff.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DMG
    ) {
      ultBuff = ultBuff.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DMG
    ) {
      ultBuff = ultBuff.add(Big(buff._3?.value).mul(buff._3?.stack));
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DMG
    ) {
      ultBuff = ultBuff.minus(Big(buff._3?.value).mul(buff._3?.stack));
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_SHIELD_RATE_OUTPUT
    ) {
      shieldIncrease = shieldIncrease.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_SHIELD_RATE_OUTPUT
    ) {
      shieldIncrease = shieldIncrease.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_SHIELD_RATE_OUTPUT
    ) {
      shieldIncrease = shieldIncrease.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_SHIELD_RATE_OUTPUT
    ) {
      shieldIncrease = shieldIncrease.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_SHIELD_EFFECT
    ) {
      shieldIncrease = shieldIncrease.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_SHIELD_EFFECT
    ) {
      shieldIncrease = shieldIncrease.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_SHIELD_EFFECT
    ) {
      shieldIncrease = shieldIncrease.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_SHIELD_EFFECT
    ) {
      shieldIncrease = shieldIncrease.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
  }

  for (const buff of defender) {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_SHIELD_RECEIVED
    ) {
      shieldReceived = shieldReceived.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_SHIELD_RECEIVED
    ) {
      shieldReceived = shieldReceived.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_SHIELD_RECEIVED
    ) {
      shieldReceived = shieldReceived.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_SHIELD_RECEIVED
    ) {
      shieldReceived = shieldReceived.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_SHIELD_ABSORB
    ) {
      shieldReceived = shieldReceived.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_SHIELD_ABSORB
    ) {
      shieldReceived = shieldReceived.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_SHIELD_ABSORB
    ) {
      shieldReceived = shieldReceived.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_SHIELD_ABSORB
    ) {
      shieldReceived = shieldReceived.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
  }
  if (ultBuff.lt(0)) {
    ultBuff = Big(0);
  }
  if (increaseDamage.lt(0)) {
    increaseDamage = Big(0);
  }
  if (enemyDamageReceivedIncrease.lt(0)) {
    enemyDamageReceivedIncrease = Big(0);
  }
  if (attributeDamage.lt(0)) {
    attributeDamage = Big(0);
  }

  if (isTrigger) {
    for (const buff of attacker) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.minus(buff._0?.value);
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.add(Big(buff._3?.value).mul(buff._3?.stack));
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.minus(Big(buff._3?.value).mul(buff._3?.stack));
      }
    }
    for (const buff of defender) {
    }

    res = Big(0)
      .add(hp)
      .mul(ultBuff)
      .mul(shieldIncrease)
      .mul(shieldReceived)
      .mul(value);
  } else {
    res = Big(0)
      .add(hp)
      .mul(ultBuff)
      .mul(shieldIncrease)
      .mul(shieldReceived)
      .mul(value);
  }
  console.log(
    hp.toNumber(),
    ultBuff.toNumber(),
    increaseDamage.toNumber(),
    enemyDamageReceivedIncrease.toNumber(),
    attributeDamage.toNumber(),
    shieldReceived.toNumber(),
    shieldIncrease.toNumber(),
    value,
  );
  return res.round(0, Big.roundDown);
}
