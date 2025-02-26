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
import { GameState } from "./GameState";
import Big from "big.js";

export function healUltHpDamage(
  position: Target,
  value: number,
  gameState: GameState,
  target: Target,
  damageType: DamageType,
  action: CharacterAction,
) {
  let rawAtk = Big(0);
  let atkPercentage = Big(1);
  let increaseDamage = Big(1);
  let enemyDamageReceivedIncrease = Big(1);
  let attributeDamage = Big(1);
  let ultBuff = Big(1);
  let healReceived = Big(1);
  let healIncrease = Big(1);
  let attacker = [] as Skill[];
  let defender = [] as Skill[];

  let res = Big(0);

  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";
  let attackerAtk = Big(0);
  let attackerHp = Big(0);

  let defenderClass = CharacterClass.NONE;
  let defenderAttribute = CharacterAttribute.NONE;
  let defenderId = "";
  let defenderisGuard = false;
  let defenderDefEffect = Big(0.5);

  // const attributeNum = parseAttribute(attackerAttribute, defenderAttribute);

  switch (position) {
    case Target.ENEMY_1: {
      attacker = gameState.enemies[0].buff;
      attackerClass = gameState.enemies[0].class;
      attackerAttribute = gameState.enemies[0].attribute;
      attackerId = gameState.enemies[0].id;
      attackerAtk = Big(gameState.enemies[0].atk);
      attackerHp = Big(gameState.enemies[0].hp);
      break;
    }
    case Target.ENEMY_2: {
      attacker = gameState.enemies[1].buff;
      attackerClass = gameState.enemies[1].class;
      attackerAttribute = gameState.enemies[1].attribute;
      attackerId = gameState.enemies[1].id;
      attackerAtk = Big(gameState.enemies[1].atk);
      attackerHp = Big(gameState.enemies[1].hp);
      break;
    }
    case Target.ENEMY_3: {
      attacker = gameState.enemies[2].buff;
      attackerClass = gameState.enemies[2].class;
      attackerAttribute = gameState.enemies[2].attribute;
      attackerId = gameState.enemies[2].id;
      attackerAtk = Big(gameState.enemies[2].atk);
      attackerHp = Big(gameState.enemies[2].hp);
      break;
    }
    case Target.ENEMY_4: {
      attacker = gameState.enemies[3].buff;
      attackerClass = gameState.enemies[3].class;
      attackerAttribute = gameState.enemies[3].attribute;
      attackerId = gameState.enemies[3].id;
      attackerAtk = Big(gameState.enemies[3].atk);
      attackerHp = Big(gameState.enemies[3].hp);
      break;
    }
    case Target.ENEMY_5: {
      attacker = gameState.enemies[4].buff;
      attackerClass = gameState.enemies[4].class;
      attackerAttribute = gameState.enemies[4].attribute;
      attackerId = gameState.enemies[4].id;
      attackerAtk = Big(gameState.enemies[4].atk);
      attackerHp = Big(gameState.enemies[4].hp);
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
      attackerHp = Big(gameState.characters[position].hp);
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
        atkPercentage = atkPercentage.add(buff._0.value);
      }
      if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
        atkPercentage = atkPercentage.minus(buff._0.value);
      }

      if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
        atkPercentage = atkPercentage.add(
          Big(buff._3?.value).mul(buff._3?.stack),
        );
      }
      if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
        atkPercentage = atkPercentage.minus(
          Big(buff._3?.value).mul(buff._3?.stack),
        );
      }

      if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
        rawAtk = rawAtk.add(buff._0?.value);
      }

      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DMG
      ) {
        ultBuff = ultBuff.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DMG
      ) {
        ultBuff = ultBuff.minus(buff._0?.value);
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DMG
      ) {
        ultBuff = ultBuff.add(Big(buff._3?.value).mul(buff._3?.stack));
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DMG
      ) {
        ultBuff = ultBuff.minus(Big(buff._3?.value).mul(buff._3?.stack));
      }

      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_HEAL_RATE
      ) {
        healIncrease = healIncrease.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_HEAL_RATE
      ) {
        healIncrease = healIncrease.minus(buff._0?.value);
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_HEAL_RATE
      ) {
        healIncrease = healIncrease.add(
          Big(buff._3?.value).mul(buff._3?.stack),
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_HEAL_RATE
      ) {
        healIncrease = healIncrease.minus(
          Big(buff._3?.value).mul(buff._3?.stack),
        );
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
    //治癒公式 = 攻擊力 x 招式倍率 x (1+進行治療時回復量±%) x (1+被治療時獲得回復量±%+受到持續型治療±%) x (1+造成持續型治療±%) x (1+其他±%)
    if (!buff.deactivated) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_HEAL_RECEIVED
      ) {
        healReceived = healReceived.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_HEAL_RECEIVED
      ) {
        healReceived = healReceived.minus(buff._0?.value);
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_HEAL_RECEIVED
      ) {
        healReceived = healReceived.add(
          Big(buff._3?.value).mul(buff._3?.stack),
        );
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_HEAL_RECEIVED
      ) {
        healReceived = healReceived.minus(
          Big(buff._3?.value).mul(buff._3?.stack),
        );
      }
    }
  }
  if (ultBuff.lt(0)) {
    ultBuff = Big(0);
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

  if (damageType === DamageType.TRIGGER) {
    for (const buff of attacker) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.add(buff._0?.value);
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.minus(buff._0?.value);
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.add(Big(buff._3?.value).mul(buff._3?.stack));
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
      ) {
        ultBuff = ultBuff.minus(Big(buff._3?.value).mul(buff._3?.stack));
      }
    }
    for (const buff of defender) {
    }

    res = Big(0)
      .add(attackerHp)
      .mul(ultBuff)
      .mul(healIncrease)
      .mul(healReceived)
      .mul(value);
  } else {
    res = Big(0)
      .add(attackerHp)
      .mul(ultBuff)
      .mul(healIncrease)
      .mul(healReceived)
      .mul(value);
  }
  console.log(
    attackerAtk.toNumber(),
    atkPercentage.toNumber(),
    rawAtk.toNumber(),
    ultBuff.toNumber(),
    increaseDamage.toNumber(),
    enemyDamageReceivedIncrease.toNumber(),
    attributeDamage.toNumber(),
    healReceived.toNumber(),
    healIncrease.toNumber(),
    value,
  );

  console.log("heal with HP", res.round(0, Big.roundDown).toNumber());
  switch (target) {
    case Target.ENEMY: {
      gameState.enemies[gameState.targeting].hp = Math.floor(
        Big(gameState.enemies[gameState.targeting].hp)
          .add(res.round(0, Big.roundDown))
          .toNumber(),
      );
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
      gameState.enemies[0].hp = Math.floor(
        Big(gameState.enemies[0].hp)
          .add(res.round(0, Big.roundDown))
          .toNumber(),
      );

      if (gameState.enemies[0].hp > gameState.enemies[0].maxHp) {
        gameState.enemies[0].hp = gameState.enemies[0].maxHp;
      }
      break;
    }
    case Target.ENEMY_2: {
      gameState.enemies[1].hp = Math.floor(
        Big(gameState.enemies[1].hp)
          .add(res.round(0, Big.roundDown))
          .toNumber(),
      );
      if (gameState.enemies[1].hp > gameState.enemies[1].maxHp) {
        gameState.enemies[1].hp = gameState.enemies[1].maxHp;
      }
      break;
    }
    case Target.ENEMY_3: {
      gameState.enemies[2].hp = Math.floor(
        Big(gameState.enemies[2].hp)
          .add(res.round(0, Big.roundDown))
          .toNumber(),
      );
      if (gameState.enemies[2].hp > gameState.enemies[2].maxHp) {
        gameState.enemies[2].hp = gameState.enemies[2].maxHp;
      }
      break;
    }
    case Target.ENEMY_4: {
      gameState.enemies[3].hp = Math.floor(
        Big(gameState.enemies[3].hp)
          .add(res.round(0, Big.roundDown))
          .toNumber(),
      );
      if (gameState.enemies[3].hp > gameState.enemies[3].maxHp) {
        gameState.enemies[3].hp = gameState.enemies[3].maxHp;
      }
      break;
    }
    case Target.ENEMY_5: {
      gameState.enemies[4].hp = Math.floor(
        Big(gameState.enemies[4].hp)
          .add(res.round(0, Big.roundDown))
          .toNumber(),
      );
      if (gameState.enemies[4].hp > gameState.enemies[4].maxHp) {
        gameState.enemies[4].hp = gameState.enemies[4].maxHp;
      }
      break;
    }

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      gameState.characters[target].hp = Math.floor(
        Big(gameState.characters[target].hp)
          .add(res.round(0, Big.roundDown))
          .toNumber(),
      );

      if (
        gameState.characters[target].hp > gameState.characters[target].maxHp
      ) {
        gameState.characters[target].hp = gameState.characters[target].maxHp;
      }

      break;
  }
}
