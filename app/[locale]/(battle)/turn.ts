import Big from "big.js";
import { checkSpecialCondition } from "./condition";
import { GameState } from "./GameState";
import { AffectType, Condition, DamageType } from "./types/Skill";
import { parseStageAction } from "./stages/parseStage";
import { CharacterAction } from "./types/Character";
import { trigger } from "./trigger";
import { healOverTime } from "./calculations/healOverTime";
import { checkAvailable, formatNumber } from "./utils";
import { writeDamageLog } from "./applyDamage";
import { checkHpLock } from "./checkHpLock";
import { damageOnShield } from "./damageOnShield";

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
    checkHoT(state, oldState);
    calculateDot(state, oldState);
    //enemyOnTurnStart(state);
    parseStageAction(state, oldState);
    enemyCalculateDot(state, oldState);
    enemyEndTurn(state, oldState);
    endTurn(state, oldState);
    state.turn += 1;
    onTurnStart(state, oldState);
  }
}

export function newWaveStart(gameState: GameState, oldState: GameState) {
  gameState.characters.forEach((_, position) => {
    const charBuff = checkSpecialCondition(gameState, oldState, position);
    for (const buff of charBuff) {
      if (buff.condition === Condition.ON_WAVE_FIRST_TURN) {
        console.log("trigger wave first turn");
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

function checkHoT(state: GameState, oG: GameState) {
  state.characters.forEach((_, index) => {
    if (checkAvailable(state.characters[index])) {
      const heal = healOverTime(state, oG, index);
      if (heal.gt(0)) {
        state.characters[index].hp =
          state.characters[index].hp + heal.toNumber();
        const defender = state.characters[index].name;
        state.healLog.push(
          `${defender}受到 ${formatNumber(heal.toNumber())} 持續型治療`,
        );

        if (state.characters[index].hp > state.characters[index].maxHp) {
          state.characters[index].hp = state.characters[index].maxHp;
        }
      }
    }
  });
}

export function enemyEndTurn(state: GameState, oG: GameState) {
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

  state.enemies.forEach((enemy) => {
    enemy.buff = enemy.buff.filter((buff) => {
      return buff.duration !== 0 || buff.duration === undefined;
    });
  });

  for (const character of state.characters) {
    character.isMoved = false;
    character.isGuard = false;
  }
  for (const enemy of state.enemies) {
    enemy.isMoved = false;
    enemy.isGuard = false;
  }
}

export function endTurn(state: GameState, oG: GameState) {
  state.characters.forEach((character, index) => {
    state.characters[index].buff = state.characters[index].buff.map((buff) => {
      if (buff.duration && buff.duration !== 100) {
        return { ...buff, duration: buff.duration - 1 };
      }
      return buff;
    });

    character.cd = character.cd > 0 ? character.cd - 1 : 0;
  });

  state.characters.forEach((character) => {
    character.buff = character.buff.filter((buff) => {
      return buff.duration !== 0 || buff.duration === undefined;
    });
  });
}

export function calculateDot(G: GameState, oG: GameState) {
  G.characters.forEach((_, position) => {
    let charBuff = [];
    charBuff = checkSpecialCondition(G, oG, position);
    let selfDamageReceivedIncrease = Big(1);

    for (const buff of charBuff) {
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

    const res = Big(1).mul(selfDamageReceivedIncrease);

    charBuff.forEach((buff) => {
      if (buff._0?.affectType === AffectType.DOT) {
        const damageAfterShield = damageOnShield(G, res, position);
        G.characters[position].hp =
          G.characters[position].hp -
          Big(buff._0.value)
            .mul(damageAfterShield)
            .round(0, Big.roundDown)
            .toNumber();
      }
    });
  });
}

export function enemyCalculateDot(G: GameState, oG: GameState) {
  G.enemies.forEach((_, position) => {
    let charBuff = [];
    charBuff = checkSpecialCondition(G, oG, position + 20);
    let selfDamageReceivedIncrease = Big(1);

    //const dotValue = charBuff.reduce((acc, buff) => {
    //  if (buff._0?.affectType === AffectType.DOT) {
    //    return acc.add(buff._0.value);
    //  } else {
    //    return acc;
    //  }
    //}, Big(0));
    for (const buff of charBuff) {
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

    //const dmg = dotValue
    //  .mul(selfDamageReceivedIncrease)
    //  .round(0, Big.roundUp)
    //  .toNumber();

    // this is fixed
    charBuff.forEach((buff) => {
      if (buff._0?.affectType === AffectType.DOT) {
        const dmg = Big(buff._0.value)
          .mul(selfDamageReceivedIncrease)
          .round(0, Big.roundDown);

        const damageAfterShield = damageOnShield(G, dmg, position + 20);
        const finalDmg = checkHpLock(G, damageAfterShield, position + 20);

        G.enemies[position].hp = Big(G.enemies[position].hp)
          .minus(finalDmg)
          .round(0, Big.roundDown)
          .toNumber();
        if (G.enemies[position].hp < 0) {
          G.enemies[position].hp = 0;
          G.enemies[position].isDead = true;
        }

        G.battleLog.push(
          // hasownproperty cannot check type
          //@ts-ignore
          `[DOT] ${G.enemies[position].name} 受到 ${formatNumber(finalDmg.toNumber())} 持續型傷害 (${buff._0 && buff._0.hasOwnProperty("appliedChar") ? G.characters[buff._0?.appliedChar].name : "無法讀取"})`,
        );
        writeDamageLog(G, buff._0.appliedChar ?? 6, {
          damage: finalDmg.toNumber(),
          type: DamageType.DOT,
          turn: G.turn,
          defender: position + 20,
        });
      }
    });
  });
}
