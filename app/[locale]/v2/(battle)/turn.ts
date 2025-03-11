import Big from "big.js";
import { checkSpecialCondition } from "./condition";
import { GameState } from "./GameState";
import { AffectType, Condition, DamageType } from "./types/Skill";
import { parseStageAction } from "./stages/parseStage";
import { CharacterAction } from "./types/Character";
import { trigger } from "./trigger";
import { healOverTime } from "./calculations/healOverTime";

export function checkEndTurn(state: GameState, oldState: GameState) {
  //checkGameEnd
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
    calculateDot(state, oldState);
    //enemyOnTurnStart(state);
    //parseStageAction(state);
    //enemyCalculateDot(state);
    endTurn(state, oldState);
    onTurnStart(state, oldState);
  }
}

export function newWaveStart(gameState: GameState, oldState: GameState) {
  gameState.characters.forEach((_, position) => {
    const charBuff = checkSpecialCondition(gameState, oldState, position);
    for (const buff of charBuff) {
      if (buff.condition === Condition.ON_WAVE_FIRST_TURN) {
        trigger(gameState, oldState, position, buff, CharacterAction.NONE);
      }
    }
  });
}

export function onTurnStart(gameState: GameState, oldState: GameState) {
  gameState.characters.forEach((_, position) => {
    const charBuff = checkSpecialCondition(gameState, oldState, position);
    for (const buff of charBuff) {
      if (
        buff.condition === Condition.EVERY_X_TURN &&
        buff.conditionTurn &&
        gameState.turn > 1
      ) {
        if ((gameState.turn - 1) % buff.conditionTurn === 0) {
          trigger(gameState, oldState, position, buff, CharacterAction.NONE);
        }
      }
      if (buff.condition === Condition.TURN) {
        if (buff.conditionTurn) {
          if (gameState.turn === buff.conditionTurn) {
            trigger(gameState, oldState, position, buff, CharacterAction.NONE);
          }
        }
      }
      if (buff.condition === Condition.ON_TURN_START && gameState.turn === 1) {
        trigger(gameState, oldState, position, buff, CharacterAction.NONE);
      }
      if (
        buff.condition === Condition.ON_SPECIFIC_TURN &&
        gameState.turn === buff.conditionTurn
      ) {
        trigger(gameState, oldState, position, buff, CharacterAction.NONE);
      }
    }
  });
  gameState.battleLog.push(`【第${gameState.turn}回合】`);
  gameState.healLog.push(`【第${gameState.turn}回合】`);
}

export function endTurn(state: GameState, oG: GameState) {
  state.enemies.forEach((_, index) => {
    state.enemies[index].buff = state.enemies[index].buff.map((buff) => {
      if (buff.duration && buff.duration !== 100) {
        return { ...buff, duration: buff.duration - 1 };
      }
      return buff;
    });

    state.enemies[index].cd =
      state.enemies[index].cd > 0 ? state.enemies[index].cd - 1 : 0;
  });

  state.characters.forEach((character, index) => {
    state.characters[index].buff = state.characters[index].buff.map((buff) => {
      if (buff.duration && buff.duration !== 100) {
        return { ...buff, duration: buff.duration - 1 };
      }
      return buff;
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
    const heal = healOverTime(state, oG, index);
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

export function calculateDot(gameState: GameState, oldState: GameState) {
  gameState.characters.forEach((_, position) => {
    let charBuff = [];
    charBuff = checkSpecialCondition(gameState, oldState, position);
    let selfDamageReceivedIncrease = Big(1);

    for (const buff of charBuff) {
      if (!buff.deactivated) {
        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.INCREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._0?.value,
          );
        }
        if (
          buff.type === 3 &&
          buff._3?.value &&
          buff._3?.affectType === AffectType.INCREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._3?.value * buff._3?.stack,
          );
        }
        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.DECREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._0?.value,
          );
        }
        if (
          buff.type === 3 &&
          buff._3?.value &&
          buff._3?.affectType === AffectType.DECREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._3?.value * buff._3?.stack,
          );
        }

        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.INCREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._0?.value,
          );
        }
        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.DECREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._0?.value,
          );
        }

        if (
          buff.type === 3 &&
          buff._3?.affectType === AffectType.INCREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._3?.value * buff._3?.stack,
          );
        }

        if (
          buff.type === 3 &&
          buff._3?.affectType === AffectType.DECREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._3?.value * buff._3?.stack,
          );
        }
      }
    }

    const res = Big(1).mul(selfDamageReceivedIncrease);

    charBuff.forEach((buff) => {
      if (buff._0?.affectType === AffectType.DOT) {
        gameState.characters[position].hp =
          gameState.characters[position].hp -
          Big(buff._0.value).mul(res).round(0, Big.roundDown).toNumber();
      }
    });
  });
}

export function enemyCalculateDot(gameState: GameState, oldState: GameState) {
  gameState.enemies.forEach((_, position) => {
    let charBuff = [];
    charBuff = checkSpecialCondition(gameState, oldState, position + 20);
    let selfDamageReceivedIncrease = Big(1);

    for (const buff of charBuff) {
      if (!buff.deactivated) {
        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.INCREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._0?.value,
          );
        }
        if (
          buff.type === 3 &&
          buff._3?.value &&
          buff._3?.affectType === AffectType.INCREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._3?.value * buff._3?.stack,
          );
        }
        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.DECREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._0?.value,
          );
        }
        if (
          buff.type === 3 &&
          buff._3?.value &&
          buff._3?.affectType === AffectType.DECREASE_DMG_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._3?.value * buff._3?.stack,
          );
        }

        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.INCREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._0?.value,
          );
        }
        if (
          buff.type === 0 &&
          buff._0?.affectType === AffectType.DECREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._0?.value,
          );
        }

        if (
          buff.type === 3 &&
          buff._3?.affectType === AffectType.INCREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.add(
            buff._3?.value * buff._3?.stack,
          );
        }

        if (
          buff.type === 3 &&
          buff._3?.affectType === AffectType.DECREASE_DMG_OVER_TIME_RECEIVED
        ) {
          selfDamageReceivedIncrease = selfDamageReceivedIncrease.minus(
            buff._3?.value * buff._3?.stack,
          );
        }
      }
    }

    const res = Big(1).mul(selfDamageReceivedIncrease);

    charBuff.forEach((buff) => {
      if (buff._0?.affectType === AffectType.DOT) {
        const dmg = Big(buff._0.value)
          .mul(res)
          .round(0, Big.roundDown)
          .toNumber();
        gameState.enemies[position].hp = gameState.enemies[position].hp - dmg;
        //writeDamageLog(gameState, buff._0.appliedChar ?? 6, {
        //  damage: dmg,
        //  type: DamageType.DOT,
        //  turn: gameState.turn,
        //  defender: position + 20,
        //});
      }
    });
  });
}

//function writeDamageLog(
//  gameState: GameState,
//  position: number,
//  content: DamageLog,
//) {
//  switch (position) {
//    case 0:
//      gameState.damage_log_1.push(content);
//      break;
//    case 1:
//      gameState.damage_log_2.push(content);
//      break;
//    case 2:
//      gameState.damage_log_3.push(content);
//      break;
//    case 3:
//      gameState.damage_log_4.push(content);
//      break;
//    case 4:
//      gameState.damage_log_5.push(content);
//      break;
//    case Target.ENEMY_1:
//      gameState.enemy_damage_log_1.push(content);
//      break;
//    case Target.ENEMY_2:
//      gameState.enemy_damage_log_2.push(content);
//      break;
//    case Target.ENEMY_3:
//      gameState.enemy_damage_log_3.push(content);
//      break;
//    case Target.ENEMY_4:
//      gameState.enemy_damage_log_4.push(content);
//      break;
//    case Target.ENEMY_5:
//      gameState.enemy_damage_log_5.push(content);
//      break;
//  }
//}
