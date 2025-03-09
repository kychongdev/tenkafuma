import Big from "big.js";
import { GameState } from "./GameState";
import { AffectType, Target } from "./types/Skill";

export function damageOnShield(
  gameState: GameState,
  damage: Big,
  defender: Target,
) {
  switch (defender) {
    case Target.ENEMY: {
      let damageReceived = damage;
      gameState.enemies[gameState.targeting].buff = gameState.enemies[
        gameState.targeting
      ].buff
        .map((buff) => {
          if (damageReceived.toNumber() === 0) {
            return buff;
          }
          if (buff._0?.affectType === AffectType.RAW_SHIELD) {
            if (Big(buff._0?.value).gt(damageReceived)) {
              return {
                ...buff,
                _0: {
                  affectType: AffectType.RAW_SHIELD,
                  value: Big(buff._0?.value).minus(damageReceived).toNumber(),
                },
              };
            } else if (Big(buff._0?.value).eq(damageReceived)) {
              damageReceived = Big(0);
              return;
            } else if (Big(buff._0?.value).lt(damageReceived)) {
              damageReceived = damageReceived.minus(Big(buff._0?.value));
              return;
            }
            console.log("Something went wrong,Shield did not detected!");
          }
          return buff;
        })
        .filter((buff) => buff !== undefined);

      return damageReceived;
    }
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      let damageReceived = damage;
      gameState.enemies[defender - 20].buff = gameState.enemies[
        defender - 20
      ].buff
        .map((buff) => {
          if (damageReceived.toNumber() === 0) {
            return buff;
          }
          if (buff._0?.affectType === AffectType.RAW_SHIELD) {
            if (Big(buff._0?.value).gt(damageReceived)) {
              return {
                ...buff,
                _0: {
                  affectType: AffectType.RAW_SHIELD,
                  value: Big(buff._0?.value).minus(damageReceived).toNumber(),
                },
              };
            } else if (Big(buff._0?.value).eq(damageReceived)) {
              damageReceived = Big(0);
              return;
            } else if (Big(buff._0?.value).lt(damageReceived)) {
              damageReceived = damageReceived.minus(Big(buff._0?.value));
              return;
            }
            console.log("Something went wrong,Shield did not detected!");
          }
          return buff;
        })
        .filter((buff) => buff !== undefined);

      return damageReceived;
    }

    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5: {
      let damageReceived = damage;
      gameState.characters[defender].buff = gameState.characters[defender].buff
        .map((buff) => {
          if (damageReceived.toNumber() === 0) {
            return buff;
          }
          if (buff._0?.affectType === AffectType.RAW_SHIELD) {
            if (Big(buff._0?.value).gt(damageReceived)) {
              return {
                ...buff,
                _0: {
                  affectType: AffectType.RAW_SHIELD,
                  value: Big(buff._0?.value).minus(damageReceived).toNumber(),
                },
              };
            } else if (Big(buff._0?.value).eq(damageReceived)) {
              damageReceived = Big(0);
              return;
            } else if (Big(buff._0?.value).lt(damageReceived)) {
              damageReceived = damageReceived.minus(Big(buff._0?.value));
              return;
            }
            console.log("Something went wrong,Shield did not detected!");
          }
          return buff;
        })
        .filter((buff) => buff !== undefined);

      return damageReceived;
    }
    default:
      console.log("Damage on Shield Error! Can't find target");
      break;
  }
  return damage;
}
