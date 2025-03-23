import { GameState } from "../GameState";
import Big from "big.js";
import { checkSpecialCondition } from "../condition";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";

export function shieldHpBasic(
  G: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
) {
  let hp = Big(0);
  let basicBuff = Big(1);
  let shieldReceived = Big(1);
  let shieldIncrease = Big(1);

  let attacker = [] as Skill[];
  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";

  let defender = [] as Skill[];
  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;
  console.log("shieldHpBasic", position, target);

  // you need to specify the enemy position
  switch (position) {
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      attacker = checkSpecialCondition(G, oG, position);
      hp = Big(G.enemies[position - 20].hp);
      attackerClass = G.enemies[position - 20].class;
      attackerAttribute = G.enemies[position - 20].attribute;
      attackerId = G.enemies[position - 20].id;
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
      hp = Big(G.characters[position].hp);
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

  for (const buff of attacker) {
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
  }

  for (const buff of defender) {
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

    //if (
    //  buff.type === 3 &&
    //  buff._3?.affectType === AffectType.INCREASE_ATTACKER_DMG_RECEIVED &&
    //  attackerClass === CharacterClass.ATTACKER
    //) {
    //  basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    //}
    //
    //if (
    //  buff.type === 3 &&
    //  buff._3?.affectType === AffectType.INCREASE_OBSTRUCTER_DMG_RECEIVED &&
    //  attackerClass === CharacterClass.OBSTRUCTER
    //) {
    //  basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    //}
    //
    //if (
    //  buff.type === 3 &&
    //  buff._3?.affectType ===
    //    AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
    //  attackerId === buff._3?.specificCharId
    //) {
    //  basicBuff = basicBuff.add(buff._3?.value * buff._3?.stack);
    //}
    //if (
    //  buff.type === 0 &&
    //  buff._0?.affectType ===
    //    AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
    //  buff._0?.specificCharId === attackerId
    //) {
    //  basicBuff = basicBuff.add(buff._0?.value);
    //}

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

  if (basicBuff.lt(0)) {
    basicBuff = Big(0);
  }

  console.log("Hp", hp.toNumber(), "普攻", basicBuff.toNumber(), "倍率", value);

  const res = Big(0)
    .add(hp)
    .mul(basicBuff)
    .mul(shieldIncrease)
    .mul(shieldReceived)
    .mul(value);

  console.log("普攻HP 最終護盾", res.toNumber());
  return res;
}
