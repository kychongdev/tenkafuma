import Big from "big.js";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { GameState } from "../GameState";
import { checkSpecialCondition } from "../condition";
import { attrCounter } from "../attrCounter";

export function shieldUlt(
  gameState: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
  isTrigger: boolean,
) {
  let rawAtk = Big(0);
  let atkPercentage = Big(1);
  let ultBuff = Big(1);
  let shieldReceived = Big(1);
  let shieldIncrease = Big(1);
  let attacker = [] as Skill[];
  let defender = [] as Skill[];

  let res = Big(0);

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";
  let attackerAtk = Big(0);

  //let attackSuckHpPercentage = Big(0);

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;

  switch (position) {
    case Target.ENEMY_1: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[0].class;
      attackerAttribute = gameState.enemies[0].attribute;
      attackerId = gameState.enemies[0].id;
      attackerAtk = Big(gameState.enemies[0].atk);
      break;
    }
    case Target.ENEMY_2: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[0].class;
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      attackerAtk = Big(gameState.enemies[1].atk);
      break;
    }
    case Target.ENEMY_3: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[0].class;
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      attackerAtk = Big(gameState.enemies[2].atk);
      break;
    }
    case Target.ENEMY_4: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[0].class;
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      attackerAtk = Big(gameState.enemies[3].atk);
      break;
    }
    case Target.ENEMY_5: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[0].class;
      attackerClass = gameState.enemies[4].class;
      attackerAttribute = gameState.enemies[4].attribute;
      attackerId = gameState.enemies[4].id;
      attackerAtk = Big(gameState.enemies[4].atk);
      break;
    }
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.characters[0].class;
      attackerClass = gameState.characters[position].class;
      attackerAttribute = gameState.characters[position].attribute;
      attackerId = gameState.characters[position].id;
      attackerAtk = Big(gameState.characters[position].atk);

      break;
  }

  switch (target) {
    case Target.ENEMY:
      defender = checkSpecialCondition(gameState, oG, gameState.targeting + 20);
      defenderClass = gameState.enemies[gameState.targeting].class;
      defenderAttribute = gameState.enemies[gameState.targeting].attribute;
      defenderId = gameState.enemies[gameState.targeting].id;
      defenderisGuard = gameState.enemies[gameState.targeting].isGuard;
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

  const attributeX = attrCounter(attackerAttribute, defenderAttribute);

  for (const buff of attacker) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage = atkPercentage.add(buff._0.value);
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage = atkPercentage.minus(buff._0.value);
    }

    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage = atkPercentage.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage = atkPercentage.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }

    if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
      rawAtk = rawAtk.add(buff._0?.value);
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
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DMG_RECEIVED
    ) {
      ultBuff = ultBuff.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DMG_RECEIVED
    ) {
      ultBuff = ultBuff.minus(buff._0?.value);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DMG_RECEIVED
    ) {
      ultBuff = ultBuff.add(Big(buff._3?.value).mul(buff._3?.stack));
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DMG_RECEIVED
    ) {
      ultBuff = ultBuff.minus(Big(buff._3?.value).mul(buff._3?.stack));
    }

    //TODO: Add more stuff on class buff
    //if (
    //  buff.type === 3 &&
    //  buff._3?.affectType === AffectType.INCREASE_ATTACKER_DMG_RECEIVED &&
    //  attackerClass === CharacterClass.ATTACKER
    //) {
    //  ultBuff = ultBuff.add(Big(buff._3?.value).mul(Big(buff._3?.stack)));
    //}
    //
    //if (
    //  buff.type === 3 &&
    //  buff._3?.affectType === AffectType.INCREASE_OBSTRUCTER_DMG_RECEIVED &&
    //  attackerClass === CharacterClass.OBSTRUCTER
    //) {
    //  ultBuff = ultBuff.add(Big(buff._3?.value).mul(Big(buff._3?.stack)));
    //}
    //
    //if (
    //  buff.type === 3 &&
    //  buff._3?.affectType ===
    //    AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
    //  attackerId === buff._3?.specificCharId
    //) {
    //  ultBuff = ultBuff.add(Big(buff._3?.value).mul(Big(buff._3?.stack)));
    //}
    //if (
    //  buff.type === 0 &&
    //  buff._0?.affectType ===
    //    AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
    //  buff._0?.specificCharId === attackerId
    //) {
    //  ultBuff = ultBuff.add(buff._0?.value);
    //}
  }

  if (ultBuff.lt(0)) {
    ultBuff = Big(0);
  }

  if (isTrigger) {
    for (const buff of attacker) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_TRIGGER_DMG
      ) {
        ultBuff = ultBuff.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_TRIGGER_DMG
      ) {
        ultBuff = ultBuff.minus(buff._0?.value);
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_TRIGGER_DMG
      ) {
        ultBuff = ultBuff.add(Big(buff._3?.value).mul(buff._3?.stack));
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_DMG
      ) {
        ultBuff = ultBuff.minus(Big(buff._3?.value).mul(buff._3?.stack));
      }

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
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_TRIGGER_DMG_RECEIVED
      ) {
        ultBuff = ultBuff.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_TRIGGER_DMG_RECEIVED
      ) {
        ultBuff = ultBuff.minus(buff._0?.value);
      }
      if (
        buff.type === 3 &&
        buff._3?.value &&
        buff._3?.affectType === AffectType.INCREASE_TRIGGER_DMG_RECEIVED
      ) {
        ultBuff = ultBuff.add(Big(buff._3?.value).mul(buff._3?.stack));
      }
      if (
        buff.type === 3 &&
        buff._3?.value &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_DMG_RECEIVED
      ) {
        ultBuff = ultBuff.minus(Big(buff._3?.value).mul(buff._3?.stack));
      }
    }

    const finalAtk = Big(attackerAtk)
      .mul(atkPercentage)
      .round(0, Big.roundDown)
      .add(rawAtk)
      .round(0, Big.roundDown);

    console.log("最終攻擊力", finalAtk.toNumber());
    res = Big(0)
      .add(finalAtk)
      .mul(ultBuff)
      .mul(shieldIncrease)
      .mul(shieldReceived)
      .mul(value);
  } else {
    const finalAtk = Big(attackerAtk)
      .mul(atkPercentage)
      .round(0, Big.roundDown)
      .add(rawAtk)
      .round(0, Big.roundDown);
    console.log("最終攻擊力", finalAtk.toNumber());

    res = Big(0)
      .add(finalAtk)
      .mul(ultBuff)
      .mul(shieldIncrease)
      .mul(shieldReceived)
      .mul(value);
  }

  console.log(
    "基礎攻擊力",
    attackerAtk.toNumber(),
    "攻擊%",
    atkPercentage.toNumber(),
    "攻擊力",
    rawAtk.toNumber(),
    "必殺",
    ultBuff.toNumber(),
    "易傷",
    value,
    "剋屬性",
    attributeX,
    "最終傷害",
    res.toNumber(),
  );

  return res;
}
