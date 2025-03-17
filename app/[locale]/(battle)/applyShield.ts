import Big from "big.js";
import { shieldUltHp } from "./calculations/shieldHp";
import { GameState } from "./GameState";
import { CharacterAction } from "./types/Character";
import { AffectType, Condition, DamageType, Target } from "./types/Skill";
import { checkAvailable } from "./utils";
import { shieldBasic } from "./calculations/shieldBasic";
import { shieldUlt } from "./calculations/shieldUlt";

export function ultHpShieldAllAllies(
  G: GameState,
  oG: GameState,
  value: number,
  attacker: Target,
  isTrigger: boolean,
  isTrueDamage: boolean,
  ca: CharacterAction,
  duration: number,
) {
  for (let i = 0; i < 5; i++) {
    const dmg = shieldUltHp(G, oG, value, attacker, i, isTrigger, isTrueDamage);
    if (!checkAvailable(G.characters[i])) {
      return;
    }
    shieldTarget(G, dmg, attacker, i, duration);
  }
}

export function basicShieldAllAllies(
  G: GameState,
  oG: GameState,
  value: number,
  attacker: Target,
  duration: number,
) {
  for (let i = 0; i < 5; i++) {
    const dmg = shieldBasic(G, oG, value, attacker, i);
    if (!checkAvailable(G.characters[i])) {
      return;
    }

    console.log("dmg", duration);
    shieldTarget(G, dmg, attacker, i, duration);
  }
}

export function ultShieldAllAllies(
  G: GameState,
  oG: GameState,
  value: number,
  attacker: Target,
  duration: number,
) {
  for (let i = 0; i < 5; i++) {
    const dmg = shieldUlt(G, oG, value, attacker, i, false);
    if (!checkAvailable(G.characters[i])) {
      return;
    }
    shieldTarget(G, dmg, attacker, i, duration);
  }
}

function shieldTarget(
  gameState: GameState,
  value: Big,
  attacker: Target,
  target: Target,
  duration: number,
) {
  const res = value.round(0, Big.roundDown);

  let char = "";
  if (attacker >= 0 && attacker < 5) {
    char = gameState.characters[attacker].id;
  } else if (attacker >= 20 && attacker < 25) {
    char = gameState.enemies[attacker - 20].id;
  }
  switch (target) {
    case Target.ENEMY: {
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: `${char}-shield`,
          name: "Shield",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            value: res.toNumber(),
            affectType: AffectType.RAW_SHIELD,
          },
        },
      ];
      break;
    }
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5:
      gameState.enemies[target - 20].buff = [
        ...gameState.enemies[target - 20].buff,
        {
          id: `${char}-shield`,
          name: "Shield",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            value: res.toNumber(),
            affectType: AffectType.RAW_SHIELD,
          },
        },
      ];

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5:
      gameState.characters[target].buff = [
        ...gameState.characters[target].buff,
        {
          id: `${char}-shield`,
          name: "Shield",
          type: 0,
          condition: Condition.NONE,
          duration,
          _0: {
            value: res.toNumber(),
            affectType: AffectType.RAW_SHIELD,
          },
        },
      ];

      break;
  }
}
