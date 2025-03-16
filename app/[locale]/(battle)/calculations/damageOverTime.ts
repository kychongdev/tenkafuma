import Big from "big.js";
import { AffectType, Condition, Skill, Target } from "../types/Skill";
import { GameState } from "../GameState";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { checkSpecialCondition } from "../condition";

export function damageOverTime(
  position: Target,
  value: number,
  G: GameState,
  oG: GameState,
  target: Target,
  duration: number,
  skillId: string,
  overlap: boolean = false,
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
      attackerAtk = Big(G.enemies[position - 20].atk);
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
    case Target.ENEMY_2:
    case Target.ENEMY_4:
    case Target.ENEMY_3:
    case Target.ENEMY_5: {
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[target - 20].class;
      defenderAttribute = G.enemies[target - 20].attribute;
      defenderId = G.enemies[target - 20].id;
      defenderisGuard = G.characters[target - 20].isGuard;
      break;
    }
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

  const res = Big(0)
    .add(finalAtk)
    .mul(dotIncrease)
    .round(0, Big.roundDown)
    .mul(value)
    .round(0, Big.roundDown);

  switch (target) {
    case Target.ENEMY: {
      if (overlap) {
        G.enemies[G.targeting].buff = G.enemies[G.targeting].buff.filter(
          (buff) => buff.id !== skillId + "-dot",
        );
      }

      G.enemies[G.targeting].buff = [
        ...G.enemies[G.targeting].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
            appliedChar: position,
          },
        },
      ];
      break;
    }
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      G.enemies[target - 20].buff = [
        ...G.enemies[target - 20].buff,
        {
          id: skillId + "-dot",
          name: "持續型傷害",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            affectType: AffectType.DOT,
            value: res.toNumber(),
            appliedChar: position,
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
