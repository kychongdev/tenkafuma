import Big from "big.js";
import { GameState } from "./GameState";
import { AffectType, Target } from "./types/Skill";

export function checkHpLock(G: GameState, damage: Big, defender: Target) {
  switch (defender) {
    case Target.ENEMY: {
      let damageReceived = damage;
      let hpLock: number[] = [];
      G.enemies[G.targeting].buff.forEach((buff) => {
        if (buff._0?.affectType === AffectType.HP_LOCK) {
          hpLock.push(buff._0?.value);
        }
      });
      if (hpLock.length === 0) {
        return damageReceived;
      }
      hpLock = hpLock.sort((a, b) => b - a);
      if (
        Big(G.enemies[G.targeting].hp)
          .minus(damageReceived)
          .div(G.enemies[G.targeting].maxHp)
          .lt(hpLock[0])
      ) {
        const lockHp = Big(G.enemies[G.targeting].maxHp)
          .mul(hpLock[0])
          .toNumber();
        damageReceived = Big(G.enemies[G.targeting].hp).minus(lockHp);
      }
      return damageReceived;
    }
    case Target.ENEMY_1:
    case Target.ENEMY_2:
    case Target.ENEMY_3:
    case Target.ENEMY_4:
    case Target.ENEMY_5: {
      let damageReceived = damage;
      let hpLock: number[] = [];
      G.enemies[defender - 20].buff.forEach((buff) => {
        if (buff._0?.affectType === AffectType.HP_LOCK) {
          hpLock.push(buff._0?.value);
        }
      });
      if (hpLock.length === 0) {
        return damageReceived;
      }
      hpLock = hpLock.sort((a, b) => b - a);
      if (
        Big(G.enemies[defender - 20].hp)
          .minus(damageReceived)
          .div(G.enemies[defender - 20].maxHp)
          .lt(hpLock[0])
      ) {
        const lockHp = Big(G.enemies[defender - 20].maxHp)
          .mul(hpLock[0])
          .toNumber();
        damageReceived = Big(G.enemies[defender - 20].hp).minus(lockHp);
      }
      return damageReceived;
    }

    // Character cannot be hplock
    case Target.POSITION_1:
    case Target.POSITION_2:
    case Target.POSITION_3:
    case Target.POSITION_4:
    case Target.POSITION_5: {
      return damage;
    }
    default:
      console.log("Damage on Shield Error! Can't find target");
      break;
  }
  return damage;
}
