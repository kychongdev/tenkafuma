import Big from "big.js";
import { GameState } from "./GameState";
import { AffectType, DamageType, Skill, Target } from "./types/Skill";
import { damageOnShield } from "./damageOnShield";
import {
  checkAvailable,
  checkAvailablePosition,
  formatNumber,
  p,
  parseActionName,
  parseCharacterName,
  parseDamageTypeName,
} from "./utils";
import { randomizeEnemyPos, randomizePos } from "./target";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "./types/Character";
import { checkSpecialCondition } from "./condition";
import { basicDamage } from "./calculations/basicDamage";
import { ultDamage } from "./calculations/ultDamage";

export function applyDamage(
  G: GameState,
  oG: GameState,
  damage: Big,
  attacker: Target,
  defender: Target,
  isTrueDamage: boolean,
  damageType: DamageType,
  action: CharacterAction,
) {
  if (attacker === Target.CANT_FIND) {
    console.log("Can't find! Something is wrong");
    return;
  }
  const target = checkOpponent(G, defender);
  if (target === Target.CANT_FIND) {
    return;
  }
  dealDamage(G, damage, target, isTrueDamage);
  writeBattleLog(G, attacker, defender, damage, damageType, action);
}

// Basic Damage to G.targeting
export function basicToTargeting(
  G: GameState,
  oG: GameState,
  value: number,
  attacker: Target,
  defender: Target,
  isTrueDamage: boolean,
  damageType: DamageType,
  action: CharacterAction,
) {
  if (!checkAvailable(G.characters[G.targeting])) {
    return;
  }
  const dmg = basicDamage(G, oG, value, attacker, Target.ENEMY, false);
  dealDamage(G, dmg, defender, isTrueDamage);
  writeBattleLog(G, attacker, defender, dmg, damageType, action);
}

export function ultToTargeting(
  G: GameState,
  oG: GameState,
  value: number,
  attacker: Target,
  defender: Target,
  isTrueDamage: boolean,
  isTrigger: boolean,
  action: CharacterAction,
) {
  if (!checkAvailable(G.characters[G.targeting])) {
    return;
  }
  const dmg = ultDamage(
    G,
    oG,
    value,
    attacker,
    Target.ENEMY,
    isTrigger,
    isTrueDamage,
  );
  dealDamage(G, dmg, defender, isTrueDamage);
  writeBattleLog(
    G,
    attacker,
    defender,
    dmg,
    isTrigger ? DamageType.TRIGGER : DamageType.ULTIMATE,
    action,
  );
}

export function applyDamageTrigger(
  G: GameState,
  oG: GameState,
  damage: Big,
  attacker: Target,
  defender: Target,
  isTrueDamage: boolean,
  damageType: DamageType,
  action: CharacterAction,
) {
  dealDamage(G, damage, defender, isTrueDamage);
  writeBattleLog(G, attacker, defender, damage, damageType, action);
}

export function checkOpponent(gameState: GameState, defender: Target) {
  switch (defender) {
    case Target.ENEMY: {
      return defender;
    }
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      if (!checkAvailable(gameState.enemies[defender - 20])) {
        return randomizeEnemyPos(gameState, defender);
      }
      return defender;
    }
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5: {
      if (!checkAvailable(gameState.characters[defender])) {
        return randomizePos(gameState, defender);
      }
      return defender;
    }
    case Target.ALL_ALLIES: {
      return defender;
    }
    case Target.ALL_ENEMIES: {
      return defender;
    }
    default:
      console.log("Apply Damage Invalid Target");
      return Target.CANT_FIND;
  }
}

function dealDamage(
  gameState: GameState,
  damage: Big,
  defender: Target,
  isTrueDamage: boolean,
) {
  const dmg = damage.round(0, Big.roundDown);

  switch (defender) {
    case Target.ENEMY: {
      if (!isTrueDamage) {
        const damageAfterShield = damageOnShield(gameState, dmg, defender);
        gameState.enemies[gameState.targeting].hp = Math.floor(
          Big(gameState.enemies[gameState.targeting].hp)
            .minus(damageAfterShield)
            .toNumber(),
        );
      } else {
        gameState.enemies[gameState.targeting].hp = Math.floor(
          Big(gameState.enemies[gameState.targeting].hp).minus(dmg).toNumber(),
        );
      }
      if (gameState.enemies[gameState.targeting].hp < 0) {
        gameState.enemies[gameState.targeting].hp = 0;
        gameState.enemies[gameState.targeting].isDead = true;
      }
      break;
    }
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      if (!isTrueDamage) {
        const damageAfterShield = damageOnShield(gameState, dmg, defender);
        gameState.enemies[defender - 20].hp = Math.floor(
          Big(gameState.enemies[defender - 20].hp)
            .minus(damageAfterShield)
            .toNumber(),
        );
      } else {
        gameState.enemies[defender - 20].hp = Math.floor(
          Big(gameState.enemies[defender - 20].hp)
            .minus(dmg)
            .toNumber(),
        );
      }
      if (gameState.enemies[defender - 20].hp < 0) {
        gameState.enemies[defender - 20].hp = 0;
        gameState.enemies[defender - 20].isDead = true;
      }
      break;
    }

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5: {
      const damageAfterShield = damageOnShield(gameState, dmg, defender);
      gameState.characters[defender].hp = Math.floor(
        Big(gameState.characters[defender].hp)
          .minus(damageAfterShield)
          .toNumber(),
      );
      if (gameState.characters[defender].hp < 0) {
        gameState.characters[defender].hp = 0;
        gameState.characters[defender].isDead = true;
      }
      break;
    }
    case Target.ALL_ALLIES: {
      gameState.characters.forEach((_, index) => {
        const damageAfterShield = damageOnShield(gameState, dmg, defender);
        if (checkAvailable(gameState.characters[index])) {
          gameState.characters[index].hp = Math.floor(
            Big(gameState.characters[index].hp)
              .minus(damageAfterShield)
              .toNumber(),
          );
          if (gameState.characters[index].hp < 0) {
            gameState.characters[index].hp = 0;
            gameState.characters[index].isDead = true;
          }
        }
      });

      break;
    }
    case Target.ALL_ENEMIES: {
      gameState.enemies.forEach((_, index) => {
        const damageAfterShield = damageOnShield(gameState, dmg, defender);
        if (checkAvailable(gameState.enemies[index])) {
          gameState.enemies[index].hp = Math.floor(
            Big(gameState.enemies[index].hp)
              .minus(damageAfterShield)
              .toNumber(),
          );
          if (gameState.enemies[index].hp < 0) {
            gameState.enemies[index].hp = 0;
            gameState.enemies[index].isDead = true;
          }
        }
      });
      break;
    }
    default:
      console.log("Apply Damage Invalid Target");
      break;
  }
}

function suckDmgToHp(
  gameState: GameState,
  oG: GameState,
  position: Target,
  target: Target,
) {
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

  // you need to specify the enemy position
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
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      attackerAtk = Big(gameState.enemies[1].atk);
      break;
    }
    case Target.ENEMY_3: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      attackerAtk = Big(gameState.enemies[2].atk);
      break;
    }
    case Target.ENEMY_4: {
      attacker = checkSpecialCondition(gameState, oG, position);
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      attackerAtk = Big(gameState.enemies[3].atk);
      break;
    }
    case Target.ENEMY_5: {
      attacker = checkSpecialCondition(gameState, oG, position);
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

  for (const buff of attacker) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.SUCK_HP_ON_DMG) {
      attackSuckHpPercentage = attackSuckHpPercentage.add(buff._0?.value);
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.SUCK_HP_ON_DMG) {
      attackSuckHpPercentage = attackSuckHpPercentage.add(
        buff._3?.value * buff._3?.stack,
      );
    }
  }

  for (const buff of defender) {
    // TODO
  }
}

function writeBattleLog(
  gameState: GameState,
  attacker: Target,
  defender: Target,
  damage: Big,
  damageType: DamageType,
  action: CharacterAction,
) {
  const res1 = damage.round(0, Big.roundDown).toNumber();
  const attackerName = parseCharacterName(gameState, attacker);
  const defenderName = parseCharacterName(gameState, defender);
  gameState.battleLog.push(
    `[${parseActionName(action)}] ${attackerName} 對 ${defenderName} 造成 ${formatNumber(res1)} (${parseDamageTypeName(damageType)})`,
  );
}

function writeDamageLog() {}
