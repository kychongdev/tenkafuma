import { AffectType } from "@/app/[locale]/(battle)/_types/Skill";
import { GameState } from "./GameState";
import { checkSpecialCondition } from "./condition";
import Big from "big.js";

//傳功
export function applyRawAttBuff(gameState: GameState, position: number) {
  const atk = Big(gameState.characters[position].atk);
  let tempAtk = Big(0);
  let atkPercentage = Big(1);

  for (const buff of checkSpecialCondition(gameState, gameState, position)) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage = atkPercentage.add(buff._0?.value);
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
      tempAtk = tempAtk.add(buff._0?.value);
    }

    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage = atkPercentage.minus(buff._0?.value);
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage = atkPercentage.add(buff._3?.value * buff._3?.stack);
    }

    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage = atkPercentage.minus(buff._3?.value * buff._3?.stack);
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.RAW_ATK) {
      tempAtk = tempAtk.add(buff._3?.value);
    }
  }

  return atk.mul(atkPercentage).add(tempAtk).toNumber();
}
