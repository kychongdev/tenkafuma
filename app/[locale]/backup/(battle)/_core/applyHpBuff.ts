import { AffectType } from '@/app/[locale]/(battle)/_types/Skill';
import { GameState } from './GameState';

// Only initiate once
export function applyHpBuff(gameState: GameState) {
  gameState.characters.forEach((character, index) => {
    let hpBuff = 1;
    for (const buff of character.buff) {
      if (buff.type === 0 && buff._0?.affectType === AffectType.MAX_HP) {
        hpBuff += buff._0?.value;
      }
    }
    gameState.characters[index].hp = Math.floor(character.hp * hpBuff);
    gameState.characters[index].maxHp = Math.floor(character.maxHp * hpBuff);
  });
}
