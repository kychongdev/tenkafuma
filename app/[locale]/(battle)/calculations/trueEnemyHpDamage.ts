import Big from "big.js";
import { GameState } from "../GameState";
import { AffectType, Skill, Target } from "../types/Skill";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { checkSpecialCondition } from "../condition";

export function trueEnemyHpDamage(
  G: GameState,
  oG: GameState,
  value: number,
  position: Target,
  target: Target,
) {
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
  let defenderMaxHp = Big(0);

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
      defenderMaxHp = Big(G.enemies[G.targeting].maxHp);
      break;
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5:
      defender = checkSpecialCondition(G, oG, target);
      defenderClass = G.enemies[target - 20].class;
      defenderAttribute = G.enemies[target - 20].attribute;
      defenderId = G.enemies[target - 20].id;
      defenderisGuard = G.enemies[target - 20].isGuard;
      defenderMaxHp = Big(G.enemies[target - 20].maxHp);
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
      defenderMaxHp = Big(G.characters[target].maxHp);
      break;
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

  console.log(
    "攻擊力",
    attackerAtk.toNumber(),
    "倍率",
    value,
    "防禦效果",
    defenderDefEffect.toNumber(),
    "防禦",
    defenderisGuard,
  );

  const res = defenderisGuard
    ? Big(0).add(defenderMaxHp).mul(value).mul(defenderDefEffect)
    : Big(0).add(defenderMaxHp).mul(value);

  console.log("真實最終攻擊", res.toNumber());
  return res;
}
