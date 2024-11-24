import { AffectType } from '@/app/[locale]/(battle)/_types/Skill';
import { GameState } from './GameState';

//傳功
export function applyRawAttBuff(gameState: GameState, position: number) {
  const atk = gameState.characters[position].atk;
  let tempAtk = 0;
  let atkPercentage = 1;

  for (const buff of gameState.characters[position].buff) {
    if (!buff.deactivated) {
      if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_ATK) {
        atkPercentage += buff._0?.value;
      }
      if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
        tempAtk += buff._0?.value;
      }

      if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
        atkPercentage -= buff._0?.value;
      }
      if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
        atkPercentage += buff._3?.value * buff._3?.stack;
      }

      if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
        atkPercentage -= buff._3?.value * buff._3?.stack;
      }
      if (buff.type === 3 && buff._3?.affectType === AffectType.RAW_ATK) {
        tempAtk += buff._3?.value;
      }
    }
  }

  return Math.floor(atk * atkPercentage) + tempAtk;
}
