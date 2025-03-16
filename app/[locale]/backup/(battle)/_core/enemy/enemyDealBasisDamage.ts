import { AffectType, DamageType, Skill, Target } from '@/types/Skill';
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
} from '../utils';
import { GameState } from '../GameState';
import { DamageLog } from '@/types/Game';

export function enemyDealBasicDamage(
  position: Target,
  value: number,
  gameState: GameState,
  target: Target,
  damageType: DamageType,
  action: CharacterAction,
) {
  const atk = gameState.enemies[position].atk;
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

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = '';

  // you need to specify the enemy position
  switch (position) {
    case Target.ENEMY_1: {
      attacker = gameState.enemies[0].buff;
      attackerClass = gameState.enemies[0].class;
      attackerAttribute = gameState.enemies[0].attribute;
      attackerId = gameState.enemies[0].id;
      break;
    }
    case Target.ENEMY_2: {
      attacker = gameState.enemies[1].buff;
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      break;
    }
    case Target.ENEMY_3: {
      attacker = gameState.enemies[2].buff;
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      break;
    }
    case Target.ENEMY_4: {
      attacker = gameState.enemies[3].buff;
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      break;
    }
    case Target.ENEMY_5: {
      attacker = gameState.enemies[4].buff;
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
      attacker = gameState.characters[position].buff;
      attackerClass = gameState.characters[position].class;
      attackerAttribute = gameState.characters[position].attribute;
      attackerId = gameState.characters[position].id;
      break;
  }

  switch (target) {
    case Target.ENEMY:
      defender = gameState.characters[gameState.targeting].buff;
      defenderClass = gameState.characters[gameState.targeting].class;
      defenderAttribute = gameState.characters[gameState.targeting].attribute;
      defenderId = gameState.characters[gameState.targeting].id;
      break;
    case Target.ENEMY_1:
      defender = gameState.enemies[0].buff;
      defenderClass = gameState.enemies[0].class;
      defenderAttribute = gameState.enemies[0].attribute;
      defenderId = gameState.enemies[0].id;
      break;
    case Target.ENEMY_2:
      defender = gameState.enemies[1].buff;
      defenderClass = gameState.enemies[1].class;
      defenderAttribute = gameState.enemies[1].attribute;
      defenderId = gameState.enemies[1].id;
      break;
    case Target.ENEMY_3:
      defender = gameState.enemies[2].buff;
      defenderClass = gameState.enemies[2].class;
      defenderAttribute = gameState.enemies[2].attribute;
      defenderId = gameState.enemies[2].id;
      break;
    case Target.ENEMY_4:
      defender = gameState.enemies[3].buff;
      defenderClass = gameState.enemies[3].class;
      defenderAttribute = gameState.enemies[3].attribute;
      defenderId = gameState.enemies[3].id;
      break;
    case Target.ENEMY_5:
      defender = gameState.enemies[4].buff;
      defenderClass = gameState.enemies[4].class;
      defenderAttribute = gameState.enemies[4].attribute;
      defenderId = gameState.enemies[4].id;
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
      break;
  }

  //TODO: reduce attribute effect
  const attributeNum = parseAttribute(attackerAttribute, defenderAttribute);

  for (const buff of attacker) {
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

      if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_DMG) {
        increaseDamage += buff._0?.value;
      }
      if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_DMG) {
        increaseDamage -= buff._0?.value;
      }

      if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_DMG) {
        increaseDamage += buff._3?.value * buff._3?.stack;
      }
      if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_DMG) {
        increaseDamage -= buff._3?.value * buff._3?.stack;
      }

      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_FIRE_DMG &&
        attackerAttribute === CharacterAttribute.FIRE
      ) {
        attributeDamage += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_WATER_DMG &&
        attackerAttribute === CharacterAttribute.WATER
      ) {
        attributeDamage += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_WIND_DMG &&
        attackerAttribute === CharacterAttribute.WIND
      ) {
        attributeDamage += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG &&
        attackerAttribute === CharacterAttribute.LIGHT
      ) {
        attributeDamage += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_DARK_DMG &&
        attackerAttribute === CharacterAttribute.DARK
      ) {
        attributeDamage += buff._0?.value;
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_DARK_DMG &&
        attackerAttribute === CharacterAttribute.DARK
      ) {
        attributeDamage += buff._3?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_FIRE_DMG &&
        attackerAttribute === CharacterAttribute.FIRE
      ) {
        attributeDamage += buff._3?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_WATER_DMG &&
        attackerAttribute === CharacterAttribute.WATER
      ) {
        attributeDamage += buff._3?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_WIND_DMG &&
        attackerAttribute === CharacterAttribute.WIND
      ) {
        attributeDamage += buff._3?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG &&
        attackerAttribute === CharacterAttribute.LIGHT
      ) {
        attributeDamage += buff._3?.value;
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_DARK_DMG &&
        attackerAttribute === CharacterAttribute.DARK
      ) {
        attributeDamage -= buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_FIRE_DMG &&
        attackerAttribute === CharacterAttribute.FIRE
      ) {
        attributeDamage -= buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_WATER_DMG &&
        attackerAttribute === CharacterAttribute.WATER
      ) {
        attributeDamage -= buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_WIND_DMG &&
        attackerAttribute === CharacterAttribute.WIND
      ) {
        attributeDamage -= buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG &&
        attackerAttribute === CharacterAttribute.LIGHT
      ) {
        attributeDamage -= buff._3?.value * buff._3?.stack;
      }

      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG &&
        attackerAttribute === CharacterAttribute.LIGHT
      ) {
        attributeDamage -= buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_DARK_DMG &&
        attackerAttribute === CharacterAttribute.DARK
      ) {
        attributeDamage -= buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_FIRE_DMG &&
        attackerAttribute === CharacterAttribute.FIRE
      ) {
        attributeDamage -= buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_WATER_DMG &&
        attackerAttribute === CharacterAttribute.WATER
      ) {
        attributeDamage -= buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_WIND_DMG &&
        attackerAttribute === CharacterAttribute.WIND
      ) {
        attributeDamage -= buff._0?.value;
      }
    }
  }

  for (const buff of defender) {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.value &&
      buff._3?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.value &&
      buff._3?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      enemyDamageReceivedIncrease += buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage -= buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WIND
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.LIGHT
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.DARK
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.FIRE
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG_RECEIVED &&
      attackerAttribute === CharacterAttribute.WATER
    ) {
      attributeDamage -= buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff -= buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DMG_RECEIVED
    ) {
      basicBuff -= buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ATTACKER_DMG_RECEIVED &&
      attackerClass === CharacterClass.ATTACKER
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_OBSTRUCTER_DMG_RECEIVED &&
      attackerClass === CharacterClass.OBSTRUCTER
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType ===
        AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
      attackerId === buff._3?.specificCharId
    ) {
      basicBuff += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType ===
        AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED &&
      buff._0?.specificCharId === attackerId
    ) {
      basicBuff += buff._0?.value;
    }
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
    atk,
    atkPercentage,
    rawAtk,
    basicBuff,
    increaseDamage,
    enemyDamageReceivedIncrease,
    attributeDamage,
  );
  const res = Math.floor(
    (atk * atkPercentage + rawAtk) *
      basicBuff *
      increaseDamage *
      enemyDamageReceivedIncrease *
      attributeDamage *
      attributeNum *
      value,
  );

  switch (target) {
    case Target.ENEMY: {
      gameState.characters[gameState.targeting].hp -= res;
      break;
    }
    case Target.ENEMY_1: {
      gameState.enemies[0].hp -= res;
    }
    case Target.ENEMY_2: {
      gameState.enemies[1].hp -= res;
    }
    case Target.ENEMY_3: {
      gameState.enemies[2].hp -= res;
    }
    case Target.ENEMY_4: {
      gameState.enemies[3].hp -= res;
    }
    case Target.ENEMY_5: {
      gameState.enemies[4].hp -= res;
    }

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      gameState.characters[target].hp -= res;
      break;
  }

  writeDamageLog(gameState, position, {
    damage: res,
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
        }造成${formatNumber(res)}(${parseDamageTypeName(damageType)})`,
      );
    } else {
      const character = gameState.characters[position];
      gameState.battle_log.push(
        `[${parseActionName(action)}]${character.name}對敵${target - 19}造成${formatNumber(
          res,
        )}(${parseDamageTypeName(damageType)})`,
      );
    }
  } else if (position >= 20 && position < 25) {
    const enemy = gameState.enemies[position - 20];
    gameState.battle_log.push(
      `[${parseActionName(action)}]敵${position - 19}${enemy.name}對敵${target - 19}造成${formatNumber(res)}(${parseDamageTypeName(damageType)})`,
    );
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
