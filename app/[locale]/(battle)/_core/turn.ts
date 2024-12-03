import { Condition } from '@/app/[locale]/(battle)/_types/Skill';
import { GameState } from './GameState';
import { triggerSkill } from './triggerSkill';
import { p } from './utils';
import { onTurnStart as enemyOnTurnStart } from './stages/enemyTurn';
import { parseInitstage, parseStageAction } from './stages/parseStage';
import { healOverTime } from './healOverTime';

export function checkEndTurn(state: GameState) {
  const isEnd = state.characters.every((character) => {
    return (
      character.isDead ||
      character.isMoved ||
      character.isGuard ||
      character.isSleep ||
      character.isSilence ||
      character.isParalysis ||
      !character.isExist
    );
  });

  if (isEnd) {
    enemyOnTurnStart(state);
    parseStageAction(state);
    endTurn(state);
    onTurnStart(state);
  }
}

export function onTurnStart(gameState: GameState) {
  gameState.characters.forEach((character, position) => {
    for (const buff of character.buff) {
      if (
        buff.condition === Condition.EVERY_X_TURN &&
        buff.conditionTurn &&
        gameState.turn > 1
      ) {
        if ((gameState.turn - 1) % buff.conditionTurn === 0) {
          triggerSkill(buff, gameState, position);
        }
      }
      if (buff.condition === Condition.TURN) {
        if (buff.conditionTurn) {
          if (gameState.turn === buff.conditionTurn) {
            triggerSkill(buff, gameState, position);
          }
        }
      }
      if (buff.condition === Condition.ON_TURN_START && gameState.turn === 1) {
        triggerSkill(buff, gameState, position);
      }

      if (buff.id == '10088-passive-4') {
        console.log('buff', buff.conditionTurn, gameState.turn);
      }
      if (
        buff.condition === Condition.ON_SPECIFIC_TURN &&
        gameState.turn === buff.conditionTurn
      ) {
        console.log('triggerSkill', p(buff));
        triggerSkill(buff, gameState, position);
      }
    }
  });
  gameState.battle_log.push(`【第${gameState.turn}回合】`);
}

export function endTurn(state: GameState) {
  state.enemies.forEach((enemy, index) => {
    enemy.buff.forEach((buff) => {
      if (buff.duration && buff.duration !== 100) {
        buff.duration -= 1;
      }
    });
    state.enemies[index].cd =
      state.enemies[index].cd > 0 ? state.enemies[index].cd - 1 : 0;
  });

  state.characters.forEach((character, index) => {
    state.characters[index].buff.forEach((buff) => {
      if (buff.duration && buff.duration !== 100) {
        buff.duration = buff.duration - 1;
      }
    });
    character.cd = character.cd > 0 ? character.cd - 1 : 0;
  });

  state.enemies.forEach((enemy) => {
    enemy.buff = enemy.buff.filter((buff) => {
      return buff.duration !== 0 || buff.duration === undefined;
    });
  });

  state.characters.forEach((character) => {
    character.buff = character.buff.filter((buff) => {
      return buff.duration !== 0 || buff.duration === undefined;
    });
  });

  state.characters.forEach((_, index) => {
    const heal = healOverTime(state, index);
    console.log('heal', heal);
    state.characters[index].hp += heal;
    if (state.characters[index].hp > state.characters[index].maxHp) {
      state.characters[index].hp = state.characters[index].maxHp;
    }
  });

  for (const character of state.characters) {
    character.isMoved = false;
    character.isGuard = false;
  }
  for (const enemy of state.enemies) {
    enemy.isMoved = false;
    enemy.isGuard = false;
  }
  state.turn += 1;
}
