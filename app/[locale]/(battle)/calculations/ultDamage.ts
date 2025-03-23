import Big from "big.js";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { GameState } from "../GameState";
import { checkSpecialCondition } from "../condition";
import { attrCounter } from "../attrCounter";

export function ultDamage(
  gameState: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
  isTrigger: boolean,
  isTrueDamage: boolean,
) {
  let rawAtk = Big(0);
  let atkPercentage = Big(1);
  let increaseDamage = Big(1);
  let enemyDamageReceivedIncrease = Big(1);
  let attributeDamage = Big(1);
  let ultBuff = Big(1);
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
  let defenderDefEffect = Big(0.5);

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
      attackerAtk = Big(gameState.enemies[position - 20].atk);
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
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5:
      defender = checkSpecialCondition(gameState, oG, target);
      defenderClass = gameState.enemies[target - 20].class;
      defenderAttribute = gameState.enemies[target - 20].attribute;
      defenderId = gameState.enemies[target - 20].id;
      defenderisGuard = gameState.enemies[target - 20].isGuard;
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

    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_DMG) {
      increaseDamage = increaseDamage.add(buff._0?.value);
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_DMG) {
      increaseDamage = increaseDamage.minus(buff._0?.value);
    }

    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_DMG) {
      increaseDamage = increaseDamage.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_DMG) {
      increaseDamage = increaseDamage.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_FIRE_DMG &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WATER_DMG &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WIND_DMG &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DARK_DMG &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(buff._3?.stack),
      );
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DARK_DMG &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_FIRE_DMG &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WATER_DMG &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }

    //if (buff.type === 3 && buff._3?.affectType === AffectType.SUCK_HP_ON_DMG) {
    //  attackSuckHpPercentage = attackSuckHpPercentage.add(
    //    Big(buff._3?.value).mul(buff._3?.stack),
    //  );
    //}
    //if (buff.type === 0 && buff._0?.affectType === AffectType.SUCK_HP_ON_DMG) {
    //  attackSuckHpPercentage = attackSuckHpPercentage.add(buff._0?.value);
    //}
  }

  for (const buff of defender) {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.add(
        buff._0?.value,
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.value &&
      buff._3?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.minus(
        buff._0?.value,
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.value &&
      buff._3?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
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

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.minus(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.minus(buff._0?.value);
    }

    //TODO: Add more stuff on class buff
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ATTACKER_DMG_RECEIVED &&
      attackerClass === CharacterClass.ATTACKER
    ) {
      ultBuff = ultBuff.add(Big(buff._3?.value).mul(Big(buff._3?.stack)));
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_OBSTRUCTER_DMG_RECEIVED &&
      attackerClass === CharacterClass.OBSTRUCTER
    ) {
      ultBuff = ultBuff.add(Big(buff._3?.value).mul(Big(buff._3?.stack)));
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType ===
        AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
      attackerId === buff._3?.specificCharId
    ) {
      ultBuff = ultBuff.add(Big(buff._3?.value).mul(Big(buff._3?.stack)));
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType ===
        AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
      buff._0?.specificCharId === attackerId
    ) {
      ultBuff = ultBuff.add(buff._0?.value);
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_GUARD_EFFECT
    ) {
      defenderDefEffect = defenderDefEffect.add(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_GUARD_EFFECT
    ) {
      defenderDefEffect = defenderDefEffect.add(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
      );
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_GUARD_EFFECT
    ) {
      defenderDefEffect = defenderDefEffect.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_GUARD_EFFECT
    ) {
      defenderDefEffect = defenderDefEffect.minus(
        Big(buff._3?.value).mul(Big(buff._3?.stack)),
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
    res =
      defenderisGuard && !isTrueDamage
        ? Big(0)
            .add(finalAtk)
            .mul(ultBuff)
            .mul(increaseDamage)
            .mul(enemyDamageReceivedIncrease)
            .mul(attributeDamage)
            .mul(value)
            .mul(defenderDefEffect)
        : Big(0)
            .add(finalAtk)
            .mul(ultBuff)
            .mul(increaseDamage)
            .mul(enemyDamageReceivedIncrease)
            .mul(attributeDamage)
            .mul(attributeX)
            .mul(value);
  } else {
    const finalAtk = Big(attackerAtk)
      .mul(atkPercentage)
      .round(0, Big.roundDown)
      .add(rawAtk)
      .round(0, Big.roundDown);
    console.log("最終攻擊力", finalAtk.toNumber());

    res =
      defenderisGuard && !isTrueDamage
        ? Big(0)
            .add(finalAtk)
            .mul(ultBuff)
            .mul(increaseDamage)
            .mul(enemyDamageReceivedIncrease)
            .mul(attributeDamage)
            .mul(attributeX)
            .mul(value)
            .mul(defenderDefEffect)
        : Big(0)
            .add(finalAtk)
            .mul(ultBuff)
            .mul(increaseDamage)
            .mul(enemyDamageReceivedIncrease)
            .mul(attributeDamage)
            .mul(attributeX)
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
    "造傷",
    increaseDamage.toNumber(),
    "易傷",
    enemyDamageReceivedIncrease.toNumber(),
    "屬性傷",
    attributeDamage.toNumber(),
    "倍率",
    value,
    "剋屬性",
    attributeX,
    "最終傷害",
    res.toNumber(),
  );

  return res;
}
