import { GameState } from "../GameState.ts";
import { s21_63, s21_63_action } from "./s21_63.ts";
import { dummy, dummy_action } from "./dummy.ts";
import { r21_sp, r21_sp_action } from "./r21_sp.ts";
import { r17_sp, r17_sp_action } from "./r17_sp.ts";

export function parseInitstage(gameState: GameState) {
  const stage = gameState.stage;
  switch (stage) {
    case "dummy": {
      dummy(gameState);
      break;
    }
    case "s21_63": {
      s21_63(gameState);
      break;
    }
    case "r21_sp": {
      r21_sp(gameState);
      break;
    }
    case "r17_sp": {
      r17_sp(gameState);
      break;
    }
  }
}

export function parseStageAction(gameState: GameState, oG: GameState) {
  const stage = gameState.stage;
  switch (stage) {
    case "dummy": {
      dummy_action(gameState, oG);
      break;
    }
    case "s21_63": {
      s21_63_action(gameState, oG);
      break;
    }
    case "r21_sp": {
      r21_sp_action(gameState, oG);
      break;
    }
    case "r17_sp": {
      r17_sp_action(gameState, oG);
      break;
    }
  }
}
