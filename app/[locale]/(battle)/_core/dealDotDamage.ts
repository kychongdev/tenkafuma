import Big from "big.js";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "../_types/Character";
import {
  AffectType,
  Condition,
  DamageType,
  Skill,
  Target,
} from "../_types/Skill";
import { GameState } from "./GameState";
import { checkSpecialCondition } from "./checkSpecialCondition";

export function dealDotDamage(
  position: Target,
  value: number,
  gameState: GameState,
  target: Target,
  duration: number,
  skillId: string,
) {
  let rawAtk = Big(0);
  let atkPercentage = Big(1);
  let basicBuff = Big(1);
  let increaseDamage = Big(1);
  let enemyDamageReceivedIncrease = Big(1);
  let attributeDamage = Big(1);
  let attacker = [] as Skill[];
  let defender = [] as Skill[];
  let dotIncrease = Big(1);

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";
  let attackerAtk = Big(0);

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;
  let defenderDefEffect = Big(0.5);

  // you need to specify the enemy position
  switch (position) {
    case Target.ENEMY_1: {
      attacker = checkSpecialCondition(gameState, position);
      attackerClass = gameState.enemies[0].class;
      attackerAttribute = gameState.enemies[0].attribute;
      attackerId = gameState.enemies[0].id;
      attackerAtk = Big(gameState.enemies[0].atk);
      break;
    }
    case Target.ENEMY_2: {
      attacker = checkSpecialCondition(gameState, position);
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      attackerAtk = Big(gameState.enemies[1].atk);
      break;
    }
    case Target.ENEMY_3: {
      attacker = checkSpecialCondition(gameState, position);
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      attackerAtk = Big(gameState.enemies[2].atk);
      break;
    }
    case Target.ENEMY_4: {
      attacker = checkSpecialCondition(gameState, position);
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      attackerAtk = Big(gameState.enemies[3].atk);
      break;
    }
    case Target.ENEMY_5: {
      attacker = checkSpecialCondition(gameState, position);
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
      attacker = checkSpecialCondition(gameState, position);
      attackerClass = gameState.characters[position].class;
      attackerAttribute = gameState.characters[position].attribute;
      attackerId = gameState.characters[position].id;
      attackerAtk = Big(gameState.characters[position].atk);
      break;
  }

  switch (target) {
    case Target.ENEMY:
      defender = checkSpecialCondition(gameState, gameState.targeting + 20);
      defenderClass = gameState.enemies[gameState.targeting].class;
      defenderAttribute = gameState.enemies[gameState.targeting].attribute;
      defenderId = gameState.enemies[gameState.targeting].id;
      defenderisGuard = gameState.enemies[gameState.targeting].isGuard;
      break;
    case Target.ENEMY_1:
      defender = checkSpecialCondition(gameState, target);
      defenderClass = gameState.enemies[0].class;
      defenderAttribute = gameState.enemies[0].attribute;
      defenderId = gameState.enemies[0].id;
      defenderisGuard = gameState.characters[0].isGuard;
      break;
    case Target.ENEMY_2:
      defender = checkSpecialCondition(gameState, target);
      defenderClass = gameState.enemies[1].class;
      defenderAttribute = gameState.enemies[1].attribute;
      defenderId = gameState.enemies[1].id;
      defenderisGuard = gameState.characters[1].isGuard;
      break;
    case Target.ENEMY_3:
      defender = checkSpecialCondition(gameState, target);
      defenderClass = gameState.enemies[2].class;
      defenderAttribute = gameState.enemies[2].attribute;
      defenderId = gameState.enemies[2].id;
      defenderisGuard = gameState.characters[2].isGuard;
      break;
    case Target.ENEMY_4:
      defender = checkSpecialCondition(gameState, target);
      defenderClass = gameState.enemies[3].class;
      defenderAttribute = gameState.enemies[3].attribute;
      defenderId = gameState.enemies[3].id;
      defenderisGuard = gameState.characters[3].isGuard;
      break;
    case Target.ENEMY_5:
      defender = checkSpecialCondition(gameState, target);
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
      defender = checkSpecialCondition(gameState, target);
      defenderClass = gameState.characters[target].class;
      defenderAttribute = gameState.characters[target].attribute;
      defenderId = gameState.characters[target].id;
      defenderisGuard = gameState.characters[target].isGuard;
      break;
  }

  for (const buff of attacker) {
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
        buff._0?.affectType === AffectType.INCREASE_DMG_OVER_TIME
      ) {
        dotIncrease = dotIncrease.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_DMG_OVER_TIME
      ) {
        dotIncrease = dotIncrease.minus(buff._0?.value);
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_DMG_OVER_TIME
      ) {
        dotIncrease = dotIncrease.add(buff._3?.value * buff._3?.stack);
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_DMG_OVER_TIME
      ) {
        dotIncrease = dotIncrease.minus(buff._3?.value * buff._3?.stack);
      }
    }
  }

  for (const buff of defender) {
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
        buff._0?.affectType === AffectType.INCREASE_DMG_OVER_TIME_RECEIVED
      ) {
        enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.add(
          buff._0?.value,
        );
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_DMG_OVER_TIME_RECEIVED
      ) {
        enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.minus(
          buff._0?.value,
        );
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_DMG_OVER_TIME_RECEIVED
      ) {
        enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.add(
          buff._3?.value * buff._3?.stack,
        );
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_DMG_OVER_TIME_RECEIVED
      ) {
        enemyDamageReceivedIncrease = enemyDamageReceivedIncrease.minus(
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

  const res = Big(0)
    .add(finalAtk)
    .mul(enemyDamageReceivedIncrease)
    .mul(dotIncrease)
    .round(0, Big.roundDown)
    .mul(value);

  switch (target) {
    case Target.ENEMY: {
      console.log("dot", res.toNumber());
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
          },
        },
      ];
      break;
    }
    case Target.ENEMY_1: {
      gameState.enemies[0].buff = [
        ...gameState.enemies[0].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
          },
        },
      ];
      break;
    }
    case Target.ENEMY_2: {
      gameState.enemies[1].buff = [
        ...gameState.enemies[1].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
          },
        },
      ];
      break;
    }
    case Target.ENEMY_3: {
      gameState.enemies[2].buff = [
        ...gameState.enemies[2].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
          },
        },
      ];
      break;
    }
    case Target.ENEMY_4: {
      gameState.enemies[3].buff = [
        ...gameState.enemies[3].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
          },
        },
      ];
      break;
    }
    case Target.ENEMY_5: {
      gameState.enemies[4].buff = [
        ...gameState.enemies[4].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
          },
        },
      ];
      break;
    }

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      break;
  }
}
