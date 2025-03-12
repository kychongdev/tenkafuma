import Big from "big.js";
import { checkSpecialCondition } from "../condition";
import { GameState } from "../GameState";
import { AffectType } from "../types/Skill";

export function healOverTime(
  gameState: GameState,
  oG: GameState,
  position: number,
) {
  let healReceived = Big(1);
  let totalHeal = Big(0);

  for (const buff of checkSpecialCondition(gameState, oG, position)) {
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.RAW_HEAL_OVER_TIME
    ) {
      totalHeal = totalHeal.add(buff._0?.value);
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_HEAL_RATE_OVER_TIME
    ) {
      healReceived = healReceived.add(buff._0?.value);
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_HEAL_RATE_OVER_TIME
    ) {
      healReceived = healReceived.minus(buff._0?.value);
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_HEAL_RATE_OVER_TIME
    ) {
      healReceived = healReceived.add(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_HEAL_RATE_OVER_TIME
    ) {
      healReceived = healReceived.minus(buff._3?.value * buff._3?.stack);
    }
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
      healReceived = healReceived.add(buff._3?.value * buff._3?.stack);
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_HEAL_RECEIVED
    ) {
      healReceived = healReceived.minus(buff._3?.value * buff._3?.stack);
    }
  }

  //console.log('totalHeal', healReceived, totalHeal);
  return totalHeal.mul(healReceived).round(0, Big.roundDown);
}
