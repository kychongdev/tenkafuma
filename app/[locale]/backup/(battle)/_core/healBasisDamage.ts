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
import {
  formatNumber,
  parseActionName,
  parseAttribute,
  parseDamageTypeName,
} from './utils';
import { GameState } from './GameState';
import { DamageLog } from '@/types/Game';

export function healBasicDamage(
  position: Target,
  value: number,
  gameState: GameState,
  target: Target,
  damageType: DamageType,
  action: CharacterAction,
) {
  let rawAtk = 0;
  let atkPercentage = 1;
  let basicBuff = 1;
  let increaseDamage = 1;
  let enemyDamageReceivedIncrease = 1;
  let attributeDamage = 1;
  let attacker = [] as Skill[];
  let defender = [] as Skill[];

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = '';
  let attackerAtk = 0;

  let attackSuckHpPercentage = 0;

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = '';
  let defenderisGuard = false;
  let defenderDefEffect = 0.5;

  // you need to specify the enemy position
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
        buff._0?.affectType === AffectType.INCREASE_BASIC_DMG
      ) {
        basicBuff += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_BASIC_DMG
      ) {
        basicBuff -= buff._0?.value;
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_BASIC_DMG
      ) {
        basicBuff += buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_BASIC_DMG
      ) {
        basicBuff -= buff._3?.value * buff._3?.stack;
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

    // if (
    //   buff.type === 0 &&
    //   buff._0?.affectType === AffectType.INCREASE_BASIC_DMG_RECEIVED
    // ) {
    //   basicBuff += buff._0?.value;
    // }
    // if (
    //   buff.type === 0 &&
    //   buff._0?.affectType === AffectType.DECREASE_BASIC_DMG_RECEIVED
    // ) {
    //   basicBuff -= buff._0?.value;
    // }

    // if (
    //   buff.type === 3 &&
    //   buff._3?.affectType === AffectType.INCREASE_BASIC_DMG_RECEIVED
    // ) {
    //   basicBuff += buff._3?.value * buff._3?.stack;
    // }
    //
    // if (
    //   buff.type === 3 &&
    //   buff._3?.affectType === AffectType.DECREASE_BASIC_DMG_RECEIVED
    // ) {
    //   basicBuff -= buff._3?.value * buff._3?.stack;
    // }

    // if (
    //   buff.type === 3 &&
    //   buff._3?.affectType === AffectType.INCREASE_ATTACKER_DMG_RECEIVED &&
    //   attackerClass === CharacterClass.ATTACKER
    // ) {
    //   basicBuff += buff._3?.value * buff._3?.stack;
    // }
    //
    // if (
    //   buff.type === 3 &&
    //   buff._3?.affectType === AffectType.INCREASE_OBSTRUCTER_DMG_RECEIVED &&
    //   attackerClass === CharacterClass.OBSTRUCTER
    // ) {
    //   basicBuff += buff._3?.value * buff._3?.stack;
    // }
    //
    // if (
    //   buff.type === 3 &&
    //   buff._3?.affectType ===
    //     AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
    //   attackerId === buff._3?.specificCharId
    // ) {
    //   basicBuff += buff._3?.value * buff._3?.stack;
    // }
    // if (
    //   buff.type === 0 &&
    //   buff._0?.affectType ===
    //     AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
    //   buff._0?.specificCharId === attackerId
    // ) {
    //   basicBuff += buff._0?.value;
    // }
  }
  if (basicBuff < 0) {
    basicBuff = 0;
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

  console.log(
    attackerAtk,
    atkPercentage,
    rawAtk,
    basicBuff,
    increaseDamage,
    enemyDamageReceivedIncrease,
    attributeDamage,
    value,
    defenderDefEffect,
  );

  const res = Math.floor(
    (attackerAtk * atkPercentage + rawAtk) *
      basicBuff *
      increaseDamage *
      enemyDamageReceivedIncrease *
      attributeDamage *
      // attributeNum *
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

  // writeDamageLog(gameState, position, {
  //   damage: res,
  //   type: damageType,
  //   turn: gameState.turn,
  //   attacker: position,
  //   defender: target,
  //   action,
  // });

  // if (position < 5 && position >= 0) {
  //   if (target === Target.ENEMY) {
  //     const character = gameState.characters[position];
  //     gameState.battle_log.push(
  //       `[${parseActionName(action)}]${character.name}對敵${
  //         gameState.targeting + 1
  //       }造成${formatNumber(res)}(${parseDamageTypeName(damageType)})`,
  //     );
  //   } else {
  //     const character = gameState.characters[position];
  //     gameState.battle_log.push(
  //       `[${parseActionName(action)}]${character.name}對敵${target - 19}造成${formatNumber(
  //         res,
  //       )}(${parseDamageTypeName(damageType)})`,
  //     );
  //   }
  // } else if (position >= 20 && position < 25) {
  //   if (target < 5 && target >= 0) {
  //     const enemy = gameState.enemies[position - 20];
  //     const character = gameState.characters[target];
  //     gameState.battle_log.push(
  //       `[${parseActionName(action)}]敵${position - 19}${enemy.name}對${character.name}造成${formatNumber(res)}(${parseDamageTypeName(damageType)})`,
  //     );
  //   } else {
  //     const enemy = gameState.enemies[position - 20];
  //     gameState.battle_log.push(
  //       `[${parseActionName(action)}]敵${position - 19}${enemy.name}對敵${target - 19}造成${formatNumber(res)}(${parseDamageTypeName(damageType)})`,
  //     );
  //   }
  // }
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
