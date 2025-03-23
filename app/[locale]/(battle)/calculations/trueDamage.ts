import Big from "big.js";
import { GameState } from "../GameState";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { checkSpecialCondition } from "../condition";

export function trueDamage(
  G: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
) {
  let rawAtk = Big(0);
  let atkPercentage = Big(1);

  let attacker = [] as Skill[];
  let attackerClass = CharacterClass.NONE;
  let attackerAttribute = CharacterAttribute.NONE;
  let attackerId = "";
  let attackerAtk = Big(0);

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
  }

  for (const buff of defender) {
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

  if (atkPercentage.lt(0)) {
    atkPercentage = Big(0);
  }

  const finalAtk = Big(attackerAtk)
    .mul(atkPercentage)
    .round(0, Big.roundDown)
    .add(rawAtk)
    .round(0, Big.roundDown);

  console.log(
    "攻擊力",
    attackerAtk.toNumber(),
    "攻擊%",
    atkPercentage.toNumber(),
    "定值攻擊力",
    rawAtk.toNumber(),
    "倍率",
    value,
    defenderDefEffect.toNumber(),
  );

  const res = defenderisGuard
    ? Big(0).add(finalAtk).mul(value).mul(defenderDefEffect)
    : Big(0).add(finalAtk).mul(value);

  console.log("真實最終攻擊", res.toNumber());
  return res;
}
