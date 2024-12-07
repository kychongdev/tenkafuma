import {
  AffectType,
  DamageType,
  Skill,
  SpecialCondition,
  Target,
} from '@/types/Skill';
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from '@/types/Character';
import { GameState } from './GameState';

export function healUltDamage(
  position: Target,
  value: number,
  gameState: GameState,
  target: Target,
  damageType: DamageType,
  action: CharacterAction,
) {
  let rawAtk = 0;
  let atkPercentage = 1;
  let ultBuff = 1;
  let increaseDamage = 1;
  let enemyDamageReceivedIncrease = 1;
  let attributeDamage = 1;
  let attacker = [] as Skill[];
  let defender = [] as Skill[];

  let res = 0;

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = '';
  let attackerAtk = 0;

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = '';
  let defenderisGuard = false;

  // const attributeNum = parseAttribute(attackerAttribute, defenderAttribute);

  switch (position) {
    case Target.ENEMY_1: {
      attacker = gameState.enemies[0].buff;
      attackerClass = gameState.enemies[0].class;
      attackerAttribute = gameState.enemies[0].attribute;
      attackerId = gameState.enemies[0].id;
      attackerAtk = gameState.enemies[0].atk;
      break;
    }
    case Target.ENEMY_2: {
      attacker = gameState.enemies[1].buff;
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      attackerAtk = gameState.enemies[1].atk;
      break;
    }
    case Target.ENEMY_3: {
      attacker = gameState.enemies[2].buff;
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      attackerAtk = gameState.enemies[2].atk;
      break;
    }
    case Target.ENEMY_4: {
      attacker = gameState.enemies[3].buff;
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      attackerAtk = gameState.enemies[3].atk;
      break;
    }
    case Target.ENEMY_5: {
      attacker = gameState.enemies[4].buff;
      attackerClass = gameState.enemies[4].class;
      attackerAttribute = gameState.enemies[4].attribute;
      attackerId = gameState.enemies[4].id;
      attackerAtk = gameState.enemies[4].atk;
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
      attackerAtk = gameState.characters[position].atk;

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
      }
      default:
        break;
    }

    if (!buff.deactivated) {
      if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_ATK) {
        atkPercentage += buff._0?.value;
      }
      if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
        atkPercentage -= buff._0?.value;
      }

      if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
        atkPercentage += buff._3?.value * buff._3?.stack;
      }
      if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
        atkPercentage -= buff._3?.value * buff._3?.stack;
      }

      if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
        rawAtk += buff._0?.value;
      }

      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DMG
      ) {
        ultBuff += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DMG
      ) {
        ultBuff -= buff._0?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DMG
      ) {
        ultBuff += buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DMG
      ) {
        ultBuff -= buff._3?.value * buff._3?.stack;
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
        break;
      }
      default:
        break;
    }

    //if (
    //  buff.type === 0 &&
    //  buff._0?.affectType === AffectType.DECREASE_GUARD_EFFECT
    //) {
    //  defenderDefEffect += buff._0?.value;
    //}
    //
    //if (
    //  buff.type === 3 &&
    //  buff._3?.affectType === AffectType.DECREASE_GUARD_EFFECT
    //) {
    //  defenderDefEffect += buff._3?.value * buff._3?.stack;
    //}
  }
  if (ultBuff < 0) {
    ultBuff = 0;
  }
  if (increaseDamage < 0) {
    increaseDamage = 0;
  }
  if (enemyDamageReceivedIncrease < 0) {
    enemyDamageReceivedIncrease = 0;
  }
  if (attributeDamage < 0) {
    attributeDamage = 0;
  }

  if (damageType === DamageType.TRIGGER) {
    for (const buff of attacker) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
      ) {
        ultBuff += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
      ) {
        ultBuff -= buff._0?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
      ) {
        ultBuff += buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
      ) {
        ultBuff -= buff._3?.value * buff._3?.stack;
      }
    }
    for (const buff of defender) {
    }

    res =
      Math.floor(attackerAtk * atkPercentage + rawAtk) *
      ultBuff *
      increaseDamage *
      enemyDamageReceivedIncrease *
      attributeDamage *
      // attributeNum *
      value;
  } else {
    res =
      Math.floor(attackerAtk * atkPercentage + rawAtk) *
      ultBuff *
      increaseDamage *
      enemyDamageReceivedIncrease *
      attributeDamage *
      // attributeNum *
      value;
  }
  console.log(
    attackerAtk,
    atkPercentage,
    rawAtk,
    ultBuff,
    increaseDamage,
    enemyDamageReceivedIncrease,
    attributeDamage,
    // attributeNum,
    value,
  );

  switch (target) {
    case Target.ENEMY: {
      gameState.enemies[gameState.targeting].hp += res;
      if (
        gameState.enemies[gameState.targeting].hp >
        gameState.enemies[gameState.targeting].maxHp
      ) {
        gameState.enemies[gameState.targeting].hp =
          gameState.enemies[gameState.targeting].maxHp;
      }
      break;
    }
    case Target.ENEMY_1: {
      gameState.enemies[0].hp += res;
      if (gameState.enemies[0].hp > gameState.enemies[0].maxHp) {
        gameState.enemies[0].hp = gameState.enemies[0].maxHp;
      }
    }
    case Target.ENEMY_2: {
      gameState.enemies[1].hp += res;
      if (gameState.enemies[1].hp > gameState.enemies[1].maxHp) {
        gameState.enemies[1].hp = gameState.enemies[1].maxHp;
      }
    }
    case Target.ENEMY_3: {
      gameState.enemies[2].hp += res;
      if (gameState.enemies[2].hp > gameState.enemies[2].maxHp) {
        gameState.enemies[2].hp = gameState.enemies[2].maxHp;
      }
    }
    case Target.ENEMY_4: {
      gameState.enemies[3].hp += res;
      if (gameState.enemies[3].hp > gameState.enemies[3].maxHp) {
        gameState.enemies[3].hp = gameState.enemies[3].maxHp;
      }
    }
    case Target.ENEMY_5: {
      gameState.enemies[4].hp += res;
      if (gameState.enemies[4].hp > gameState.enemies[4].maxHp) {
        gameState.enemies[4].hp = gameState.enemies[4].maxHp;
      }
    }

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      gameState.characters[target].hp += res;
      if (
        gameState.characters[target].hp > gameState.characters[target].maxHp
      ) {
        gameState.characters[target].hp = gameState.characters[target].maxHp;
      }
      break;
  }
}
