import { AffectType } from "@/app/[locale]/(battle)/_types/Skill";
import { GameState } from "./GameState";

//傳功
export function healOverTime(gameState: GameState, position: number) {
  const char =
    position < 5
      ? gameState.characters[position]
      : gameState.enemies[position - 20];
  let healReceived = 1;
  let totalHeal = 0;

  for (const buff of char.buff) {
    if (!buff.deactivated) {
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.RAW_HEAL_OVER_TIME
      ) {
        totalHeal += buff._0?.value;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_HEAL_RATE_OVER_TIME
      ) {
        healReceived += buff._0?.value;
      }

      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_HEAL_RATE_OVER_TIME
      ) {
        healReceived -= buff._0?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_HEAL_RATE_OVER_TIME
      ) {
        healReceived += buff._3?.value * buff._3?.stack;
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_HEAL_RATE_OVER_TIME
      ) {
        healReceived -= buff._3?.value * buff._3?.stack;
      }
      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.INCREASE_HEAL_RECEIVED
      ) {
        healReceived += buff._0?.value;
      }

      if (
        buff.type === 0 &&
        buff._0?.affectType === AffectType.DECREASE_HEAL_RECEIVED
      ) {
        healReceived -= buff._0?.value;
      }
      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.INCREASE_HEAL_RECEIVED
      ) {
        healReceived += buff._3?.value * buff._3?.stack;
      }

      if (
        buff.type === 3 &&
        buff._3?.affectType === AffectType.DECREASE_HEAL_RECEIVED
      ) {
        healReceived -= buff._3?.value * buff._3?.stack;
      }
    }
  }

  //console.log('totalHeal', healReceived, totalHeal);
  return Math.floor(totalHeal * healReceived);
}
