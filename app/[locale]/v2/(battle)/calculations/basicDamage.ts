import { GameState } from "../GameState";
import Big from "big.js";
import { attrCounter } from "../attrCounter";
import { checkSpecialCondition } from "../condition";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";

export function basicDamage(
  G: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
  isTrueDamage: boolean,
) {
  let rawAtk = Big(0);
  let atkPercentage = Big(1);
  let basicBuff = Big(1);
  let increaseDamage = Big(1);
  let enemyDamageReceivedIncrease = Big(1);
  let attributeDamage = Big(1);

  let attacker = [] as Skill[];
  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";
  let attackerAtk = Big(0);

  let defender = [] as Skill[];
  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;
  let defenderDefEffect = Big(0.5);

  // you need to specify the enemy position
  switch (position) {
    case Target.ENEMY_1: {
      attacker = checkSpecialCondition(G, oG, position);
      attackerClass = G.enemies[0].class;
      attackerAttribute = G.enemies[0].attribute;
      attackerId = G.enemies[0].id;
      attackerAtk = Big(G.enemies[0].atk);
      break;
    }
    case Target.ENEMY_2: {
      attacker = checkSpecialCondition(G, oG, position);
      attackerClass = G.enemies[1].class;
      attackerAttribute = G.enemies[1].attribute;
      attackerId = G.enemies[1].id;
      attackerAtk = Big(G.enemies[1].atk);
      break;
    }
    case Target.ENEMY_3: {
      attacker = checkSpecialCondition(G, oG, position);
      attackerClass = G.enemies[2].class;
      attackerAttribute = G.enemies[2].attribute;
      attackerId = G.enemies[2].id;
      attackerAtk = Big(G.enemies[2].atk);
      break;
    }
    case Target.ENEMY_4: {
      attacker = checkSpecialCondition(G, oG, position);
      attackerClass = G.enemies[3].class;
      attackerAttribute = G.enemies[3].attribute;
      attackerId = G.enemies[3].id;
      attackerAtk = Big(G.enemies[3].atk);
      break;
    }
    case Target.ENEMY_5: {
      attacker = checkSpecialCondition(G, oG, position);
      attackerClass = G.enemies[4].class;
      attackerAttribute = G.enemies[4].attribute;
      attackerId = G.enemies[4].id;
      attackerAtk = Big(G.enemies[4].atk);
      break;
    }
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      attacker = checkSpecialCondition(G, oG, position);
      attackerClass = G.characters[position].class;
      attackerAttribute = G.characters[position].attribute;
      attackerId = G.characters[position].id;
      attackerAtk = Big(G.characters[position].atk);
      break;
  }

  switch (target) {
    case Target.ENEMY:
      defender = checkSpecialCondition(G, oG, G.targeting + 20);
      defenderClass = G.enemies[G.targeting].class;
      defenderAttribute = G.enemies[G.targeting].attribute;
      defenderId = G.enemies[G.targeting].id;
      defenderisGuard = G.enemies[G.targeting].isGuard;
      break;
    case Target.ENEMY_1:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[0].class;
      defenderAttribute = G.enemies[0].attribute;
      defenderId = G.enemies[0].id;
      defenderisGuard = G.characters[0].isGuard;
      break;
    case Target.ENEMY_2:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[1].class;
      defenderAttribute = G.enemies[1].attribute;
      defenderId = G.enemies[1].id;
      defenderisGuard = G.characters[1].isGuard;
      break;
    case Target.ENEMY_3:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[2].class;
      defenderAttribute = G.enemies[2].attribute;
      defenderId = G.enemies[2].id;
      defenderisGuard = G.characters[2].isGuard;
      break;
    case Target.ENEMY_4:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[3].class;
      defenderAttribute = G.enemies[3].attribute;
      defenderId = G.enemies[3].id;
      defenderisGuard = G.characters[3].isGuard;
      break;
    case Target.ENEMY_5:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[4].class;
      defenderAttribute = G.enemies[4].attribute;
      defenderId = G.enemies[4].id;
      defenderisGuard = G.characters[4].isGuard;
      break;
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.characters[target].class;
      defenderAttribute = G.characters[target].attribute;
      defenderId = G.characters[target].id;
      defenderisGuard = G.characters[target].isGuard;
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

    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_DMG) {
      increaseDamage = increaseDamage.add(buff._0?.value);
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_DMG) {
      increaseDamage = increaseDamage.minus(buff._0?.value);
    }

    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_DMG) {
      increaseDamage = increaseDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_DMG) {
      increaseDamage = increaseDamage.minus(buff._3?.value * buff._3?.stack);
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
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
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
        buff._3?.value * buff._3?.stack,
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
      enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.minus(
        buff._3?.value * buff._3?.stack,
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
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
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
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage = attributeDamage.minus(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff = basicBuff.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff = basicBuff.minus(buff._0?.value);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff = basicBuff.minus(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ATTACKER_DMG_RECEIVED &&
      attackerClass === CharacterClass.ATTACKER
    ) {
      basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_OBSTRUCTER_DMG_RECEIVED &&
      attackerClass === CharacterClass.OBSTRUCTER
    ) {
      basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType ===
        AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
      attackerId === buff._3?.specificCharId
    ) {
      basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType ===
        AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
      buff._0?.specificCharId === attackerId
    ) {
      basicBuff = basicBuff.add(buff._0?.value);
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
        buff._3?.value * buff._3?.stack,
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
        buff._3?.value * buff._3?.stack,
      );
    }
  }

  if (basicBuff.lt(0)) {
    basicBuff = Big(0);
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

  const finalAtk = Big(attackerAtk)
    .mul(atkPercentage)
    .round(0, Big.roundDown)
    .add(rawAtk)
    .round(0, Big.roundDown);

  console.log(
    "攻擊力",
    attackerAtk.toNumber(),
    "攻擊%",
    atkPercentage.toNumber(),
    "定值攻擊力",
    rawAtk.toNumber(),
    "普攻",
    basicBuff.toNumber(),
    "造傷",
    increaseDamage.toNumber(),
    "易傷",
    enemyDamageReceivedIncrease.toNumber(),
    "屬傷",
    attributeDamage.toNumber(),
    "倍率",
    value,
    defenderDefEffect.toNumber(),
    "剋屬",
    attributeX,
  );

  const res =
    defenderisGuard && !isTrueDamage
      ? Big(0)
          .add(finalAtk)
          .mul(basicBuff)
          .mul(increaseDamage)
          .mul(enemyDamageReceivedIncrease)
          .mul(attributeDamage)
          .mul(attributeX)
          .round(0, Big.roundDown)
          .mul(value)
          .mul(defenderDefEffect)
      : Big(0)
          .add(finalAtk)
          .mul(basicBuff)
          .mul(increaseDamage)
          .mul(enemyDamageReceivedIncrease)
          .mul(attributeDamage)
          .mul(attributeX)
          .round(0, Big.roundDown)
          .mul(value);

  console.log("最終攻擊", res.toNumber());
  return res;
}
