import { SpecialCondition } from '../_types/Skill';
import { GameState } from './GameState';

export function checkSpecialCondition(gameState: GameState, position: number) {
  if (position >= 20 && position < 25) {
    return gameState.characters[position].buff
      .map((buff) => {
        switch (buff.specialCondition) {
          case SpecialCondition.HP_LOWER_THAN: {
            if (!buff.specialConditionValue) {
              return buff;
            }
            if (
              (gameState.enemies[position - 20].hp /
                gameState.enemies[position - 20].maxHp) *
                100 <
              buff.specialConditionValue
            ) {
              return buff;
            }
            return;
          }
          default:
            return buff;
        }
      })
      .filter((item) => item !== undefined);
  }
  return gameState.characters[position].buff
    .map((buff) => {
      switch (buff.specialCondition) {
        case SpecialCondition.HP_LOWER_THAN: {
          if (!buff.specialConditionValue) {
            return buff;
          }
          if (
            (gameState.characters[position].hp /
              gameState.characters[position].maxHp) *
              100 <
            buff.specialConditionValue
          ) {
            return buff;
          }
          return;
        }
        default:
          return buff;
      }
    })
    .filter((item) => item !== undefined);
}
