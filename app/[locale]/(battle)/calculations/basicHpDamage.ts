import { GameState } from "../GameState";
import Big from "big.js";
import { attrCounter } from "../attrCounter";
import { checkSpecialCondition } from "../condition";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";

export function basicHpDamage(
  G: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
  isTrueDamage: boolean,
) {
  let hp = Big(0);
  let basicBuff = Big(1);
  let increaseDamage = Big(1);
  let enemyDamageReceivedIncrease = Big(1);
  let attributeDamage = Big(1);

  let attacker = [] as Skill[];
  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";

  let defender = [] as Skill[];
  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;
  let defenderDefEffect = Big(0.5);

  // you need to specify the enemy position
  switch (position) {
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      attacker = checkSpecialCondition(G, oG, position);
      attackerClass = G.enemies[position - 20].class;
      attackerAttribute = G.enemies[position - 20].attribute;
      attackerId = G.enemies[position - 20].id;
      hp = Big(G.enemies[position - 20].maxHp);
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
      hp = Big(G.characters[position].maxHp);
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
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[target - 20].class;
      defenderAttribute = G.enemies[target - 20].attribute;
      defenderId = G.enemies[target - 20].id;
      defenderisGuard = G.enemies[target - 20].isGuard;
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

  if (isTrueDamage) {
    if (defenderisGuard) {
      return Big(0).add(hp).mul(value).mul(defenderDefEffect);
    }
    return Big(0).add(hp).mul(value);
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

  console.log(
    "HP",
    hp.toNumber(),
    "定值攻擊力",
    hp.toNumber(),
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
          .add(hp)
          .mul(basicBuff)
          .mul(increaseDamage)
          .mul(enemyDamageReceivedIncrease)
          .mul(attributeDamage)
          .mul(attributeX)
          .mul(value)
          .mul(defenderDefEffect)
      : Big(0)
          .add(hp)
          .mul(basicBuff)
          .mul(increaseDamage)
          .mul(enemyDamageReceivedIncrease)
          .mul(attributeDamage)
          .mul(attributeX)
          .mul(value);

  console.log("最終攻擊", res.toNumber());
  return res;
}
