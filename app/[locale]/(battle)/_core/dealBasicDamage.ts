import {
  AffectType,
  DamageType,
  Skill,
  SpecialCondition,
  Target,
} from "@/types/Skill";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "@/types/Character";
import {
  formatNumber,
  parseActionName,
  parseAttribute,
  parseDamageTypeName,
} from "./utils";
import { GameState } from "./GameState";
import { DamageLog } from "@/types/Game";
import Big from "big.js";
import { randomizeEnemyPos, randomizePos } from "./randomizePos";

export function dealBasicDamage(
  position: Target,
  value: number,
  gameState: GameState,
  target: Target,
  damageType: DamageType,
  action: CharacterAction,
  isTrueDamage?: boolean,
) {
  if (target > 0 && target < 5) {
    target = randomizePos(gameState, target);
  } else if (target >= 20 && target < 25) {
    target = randomizeEnemyPos(gameState, target);
  }

  let rawAtk = Big(0);
  let atkPercentage = Big(1);
  let basicBuff = Big(1);
  let increaseDamage = Big(1);
  let enemyDamageReceivedIncrease = Big(1);
  let attributeDamage = Big(1);
  let attacker = [] as Skill[];
  let defender = [] as Skill[];

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";
  let attackerAtk = Big(0);

  let attackSuckHpPercentage = Big(0);

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;
  let defenderDefEffect = Big(0.5);

  const test = Big(1.5);

  // you need to specify the enemy position
  switch (position) {
    case Target.ENEMY_1: {
      attacker = gameState.enemies[0].buff;
      attackerClass = gameState.enemies[0].class;
      attackerAttribute = gameState.enemies[0].attribute;
      attackerId = gameState.enemies[0].id;
      attackerAtk = Big(gameState.enemies[0].atk);
      break;
    }
    case Target.ENEMY_2: {
      attacker = gameState.enemies[1].buff;
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      attackerAtk = Big(gameState.enemies[1].atk);
      break;
    }
    case Target.ENEMY_3: {
      attacker = gameState.enemies[2].buff;
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      attackerAtk = Big(gameState.enemies[2].atk);
      break;
    }
    case Target.ENEMY_4: {
      attacker = gameState.enemies[3].buff;
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      attackerAtk = Big(gameState.enemies[3].atk);
      break;
    }
    case Target.ENEMY_5: {
      attacker = gameState.enemies[4].buff;
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
      attacker = gameState.characters[position].buff;
      attackerClass = gameState.characters[position].class;
      attackerAttribute = gameState.characters[position].attribute;
      attackerId = gameState.characters[position].id;
      attackerAtk = Big(gameState.characters[position].atk);

      break;
  }

  switch (target) {
    case Target.ENEMY:
      defender = gameState.enemies[gameState.targeting].buff;
      defenderClass = gameState.characters[gameState.targeting].class;
      defenderAttribute = gameState.characters[gameState.targeting].attribute;
      defenderId = gameState.characters[gameState.targeting].id;
      defenderisGuard = gameState.characters[gameState.targeting].isGuard;
      break;
    case Target.ENEMY_1:
      defender = gameState.enemies[0].buff;
      defenderClass = gameState.enemies[0].class;
      defenderAttribute = gameState.enemies[0].attribute;
      defenderId = gameState.enemies[0].id;
      defenderisGuard = gameState.characters[0].isGuard;
      break;
    case Target.ENEMY_2:
      defender = gameState.enemies[1].buff;
      defenderClass = gameState.enemies[1].class;
      defenderAttribute = gameState.enemies[1].attribute;
      defenderId = gameState.enemies[1].id;
      defenderisGuard = gameState.characters[1].isGuard;
      break;
    case Target.ENEMY_3:
      defender = gameState.enemies[2].buff;
      defenderClass = gameState.enemies[2].class;
      defenderAttribute = gameState.enemies[2].attribute;
      defenderId = gameState.enemies[2].id;
      defenderisGuard = gameState.characters[2].isGuard;
      break;
    case Target.ENEMY_4:
      defender = gameState.enemies[3].buff;
      defenderClass = gameState.enemies[3].class;
      defenderAttribute = gameState.enemies[3].attribute;
      defenderId = gameState.enemies[3].id;
      defenderisGuard = gameState.characters[3].isGuard;
      break;
    case Target.ENEMY_5:
      defender = gameState.enemies[4].buff;
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
      defender = gameState.characters[target].buff;
      defenderClass = gameState.characters[target].class;
      defenderAttribute = gameState.characters[target].attribute;
      defenderId = gameState.characters[target].id;
      defenderisGuard = gameState.characters[target].isGuard;
      break;
  }

  //TODO: reduce attribute effect
  // const attributeNum = parseAttribute(attackerAttribute, defenderAttribute);

  for (const buff of attacker) {
    switch (buff.specialCondition) {
      case SpecialCondition.HP_LOWER_THAN: {
        if (!buff.specialConditionValue) {
          break;
        }
        if (position >= 20 && position < 25) {
          if (
            (gameState.enemies[position - 20].hp /
              gameState.enemies[position - 20].maxHp) *
              100 <
            buff.specialConditionValue
          ) {
            continue;
          }
        } else {
          if (
            (gameState.characters[position].hp /
              gameState.characters[position].maxHp) *
              100 <
            buff.specialConditionValue
          ) {
            continue;
          }
        }
        break;
      }
      case SpecialCondition.HP_HIGHER_THAN: {
        if (!buff.specialConditionValue) {
          break;
        }
        if (position >= 20 && position < 25) {
          if (
            (gameState.enemies[position - 20].hp /
              gameState.enemies[position - 20].maxHp) *
              100 >
            buff.specialConditionValue
          ) {
            continue;
          }
        } else {
          if (
            (gameState.characters[position].hp /
              gameState.characters[position].maxHp) *
              100 <
            buff.specialConditionValue
          ) {
            continue;
          }
        }
        break;
      }
      default:
        break;
    }
    if (!buff.deactivated) {
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
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_FIRE_DMG &&
        attackerAttribute === CharacterAttribute.FIRE
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_WATER_DMG &&
        attackerAttribute === CharacterAttribute.WATER
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_WIND_DMG &&
        attackerAttribute === CharacterAttribute.WIND
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG &&
        attackerAttribute === CharacterAttribute.LIGHT
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
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

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.SUCK_HP_ON_DMG
      ) {
        attackSuckHpPercentage = attackSuckHpPercentage.add(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.SUCK_HP_ON_DMG
      ) {
        attackSuckHpPercentage = attackSuckHpPercentage.add(buff._0?.value);
      }
    }
  }

  for (const buff of defender) {
    switch (buff.specialCondition) {
      case SpecialCondition.HP_LOWER_THAN: {
        if (!buff.specialConditionValue) {
          break;
        }
        if (position >= 20 && position < 25) {
          if (
            (gameState.enemies[position - 20].hp /
              gameState.enemies[position - 20].maxHp) *
              100 <
            buff.specialConditionValue
          ) {
            continue;
          }
        } else {
          if (
            (gameState.characters[position].hp /
              gameState.characters[position].maxHp) *
              100 <
            buff.specialConditionValue
          ) {
            continue;
          }
        }
      }
      default:
        break;
    }

    if (!buff.deactivated) {
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
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
        attackerAttribute === CharacterAttribute.LIGHT
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
        attackerAttribute === CharacterAttribute.DARK
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
        attackerAttribute === CharacterAttribute.FIRE
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
        attackerAttribute === CharacterAttribute.WATER
      ) {
        attributeDamage = attributeDamage.minus(
          buff._3?.value * buff._3?.stack,
        );
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
    attackerAtk.toNumber(),
    atkPercentage.toNumber(),
    rawAtk.toNumber(),
    basicBuff.toNumber(),
    increaseDamage.toNumber(),
    enemyDamageReceivedIncrease.toNumber(),
    attributeDamage.toNumber(),
    value,
    defenderDefEffect.toNumber(),
  );
  const res =
    defenderisGuard && !isTrueDamage
      ? Big(0)
          .add(finalAtk)
          .mul(basicBuff)
          .mul(increaseDamage)
          .mul(enemyDamageReceivedIncrease)
          .mul(attributeDamage)
          .mul(value)
          .mul(defenderDefEffect)
      : Big(0)
          .add(finalAtk)
          .mul(basicBuff)
          .mul(increaseDamage)
          .mul(enemyDamageReceivedIncrease)
          .mul(attributeDamage)
          .mul(value);

  switch (target) {
    case Target.ENEMY: {
      gameState.enemies[gameState.targeting].hp = Math.floor(
        Big(gameState.enemies[gameState.targeting].hp)
          .minus(res.round(0, Big.roundDown))
          .toNumber(),
      );
      break;
    }
    case Target.ENEMY_1: {
      gameState.enemies[0].hp = Math.floor(
        Big(gameState.enemies[0].hp).minus(res).toNumber(),
      );
    }
    case Target.ENEMY_2: {
      gameState.enemies[1].hp = Math.floor(
        Big(gameState.enemies[1].hp).minus(res).toNumber(),
      );
    }
    case Target.ENEMY_3: {
      gameState.enemies[2].hp = Math.floor(
        Big(gameState.enemies[2].hp).minus(res).toNumber(),
      );
    }
    case Target.ENEMY_4: {
      gameState.enemies[3].hp = Math.floor(
        Big(gameState.enemies[3].hp).minus(res).toNumber(),
      );
    }
    case Target.ENEMY_5: {
      gameState.enemies[4].hp = Math.floor(
        Big(gameState.enemies[4].hp).minus(res).toNumber(),
      );
    }

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      gameState.characters[target].hp = Math.floor(
        Big(gameState.characters[target].hp).minus(res).toNumber(),
      );
      break;
  }

  const res1 = Math.floor(res.toNumber());
  writeDamageLog(gameState, position, {
    damage: res1,
    type: damageType,
    turn: gameState.turn,
    attacker: position,
    defender: target,
    action,
  });

  if (position < 5 && position >= 0) {
    if (target === Target.ENEMY) {
      const character = gameState.characters[position];
      gameState.battle_log.push(
        `[${parseActionName(action)}]${character.name}對敵${
          gameState.targeting + 1
        }造成${formatNumber(res1)}(${parseDamageTypeName(damageType)})`,
      );
    } else {
      const character = gameState.characters[position];
      gameState.battle_log.push(
        `[${parseActionName(action)}]${character.name}對敵${target - 19}造成${formatNumber(
          res1,
        )}(${parseDamageTypeName(damageType)})`,
      );
    }
  } else if (position >= 20 && position < 25) {
    if (target < 5 && target >= 0) {
      const enemy = gameState.enemies[position - 20];
      const character = gameState.characters[target];
      gameState.battle_log.push(
        `[${parseActionName(action)}]敵${position - 19}${enemy.name}對${character.name}造成${formatNumber(res1)}(${parseDamageTypeName(damageType)})`,
      );
    } else {
      const enemy = gameState.enemies[position - 20];
      gameState.battle_log.push(
        `[${parseActionName(action)}]敵${position - 19}${enemy.name}對敵${target - 19}造成${formatNumber(res1)}(${parseDamageTypeName(damageType)})`,
      );
    }
  }
  if (attackSuckHpPercentage.gt(0)) {
    //const suckHp = Math.floor(res * attackSuckHpPercentage);
    //TODO 攻擊回血 = 傷害公式 x (1+進行治療時回復量±%) x (1+被治療時獲得回復量±%)
    const suckHp = res.mul(attackSuckHpPercentage);
    const suckHp1 = suckHp.toNumber();
    switch (position) {
      case Target.ENEMY: {
        console.log("You must specify the enemy position");
        break;
      }
      case Target.ENEMY_1: {
        gameState.enemies[0].hp += Math.floor(
          Big(gameState.enemies[0].hp).add(suckHp).toNumber(),
        );
        gameState.battle_log.push(
          `[吸血]${gameState.enemies[0].name}回復${formatNumber(suckHp1)}點生命`,
        );
        break;
      }
      case Target.ENEMY_2: {
        gameState.enemies[1].hp += Math.floor(
          Big(gameState.enemies[1].hp).add(suckHp).toNumber(),
        );
        gameState.battle_log.push(
          `[吸血]${gameState.enemies[1].name}回復${formatNumber(suckHp1)}點生命`,
        );
        break;
      }
      case Target.ENEMY_3: {
        gameState.enemies[2].hp += Math.floor(
          Big(gameState.enemies[2].hp).add(suckHp).toNumber(),
        );
        gameState.battle_log.push(
          `[吸血]${gameState.enemies[2].name}回復${formatNumber(suckHp1)}點生命`,
        );
        break;
      }
      case Target.ENEMY_4: {
        gameState.enemies[3].hp += Math.floor(
          Big(gameState.enemies[3].hp).add(suckHp).toNumber(),
        );
        gameState.battle_log.push(
          `[吸血]${gameState.enemies[3].name}回復${formatNumber(suckHp1)}點生命`,
        );
        break;
      }
      case Target.ENEMY_5: {
        gameState.enemies[4].hp += Math.floor(
          Big(gameState.enemies[4].hp).add(suckHp).toNumber(),
        );
        gameState.battle_log.push(
          `[吸血]${gameState.enemies[4].name}回復${formatNumber(suckHp1)}點生命`,
        );
        break;
      }

      case Target.POSITION_1:
      case Target.POSITION_2:
      case Target.POSITION_3:
      case Target.POSITION_4:
      case Target.POSITION_5:
        gameState.characters[target].hp = Math.floor(
          Big(gameState.characters[target].hp)
            .add(attackSuckHpPercentage)
            .toNumber(),
        );
        gameState.battle_log.push(
          `[吸血]${gameState.characters[position].name}回復${formatNumber(suckHp1)}點生命`,
        );
        break;
    }
  }
}

function writeDamageLog(
  gameState: GameState,
  position: number,
  content: DamageLog,
) {
  switch (position) {
    case 0:
      gameState.damage_log_1.push(content);
      break;
    case 1:
      gameState.damage_log_2.push(content);
      break;
    case 2:
      gameState.damage_log_3.push(content);
      break;
    case 3:
      gameState.damage_log_4.push(content);
      break;
    case 4:
      gameState.damage_log_5.push(content);
      break;
    case Target.ENEMY_1:
      gameState.enemy_damage_log_1.push(content);
      break;
    case Target.ENEMY_2:
      gameState.enemy_damage_log_2.push(content);
      break;
    case Target.ENEMY_3:
      gameState.enemy_damage_log_3.push(content);
      break;
    case Target.ENEMY_4:
      gameState.enemy_damage_log_4.push(content);
      break;
    case Target.ENEMY_5:
      gameState.enemy_damage_log_5.push(content);
      break;
  }
}

//function randomEnemy(
//  gameState: GameState;
//) {
//
//}
