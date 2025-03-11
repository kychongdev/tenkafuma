import Big from "big.js";
import { GameState } from "./GameState";
import { CharacterAction } from "./types/Character";
import { DamageType, Target } from "./types/Skill";
import {
  formatNumber,
  parseActionName,
  parseCharacterName,
  parseDamageTypeName,
} from "./utils";
import { healUltDamage } from "./calculations/healUltDamage";

export function ultHealAllAllies(
  G: GameState,
  oG: GameState,
  value: number,
  attacker: Target,
  isTrigger: boolean,
  isTrueDamage: boolean,
) {
  for (let i = 0; i < 5; i++) {
    const dmg = healUltDamage(
      G,
      oG,
      value,
      attacker,
      i,
      isTrigger,
      isTrueDamage,
    );
    healTarget(G, dmg, i);
  }
}

function healTarget(gameState: GameState, res: Big, target: Target) {
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

export function writeToHealLog(
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
  gameState.healLog.push(
    `[${parseActionName(action)}] ${attackerName} 對 ${defenderName} 治療 ${formatNumber(res1)} (${parseDamageTypeName(damageType)})`,
  );
}
