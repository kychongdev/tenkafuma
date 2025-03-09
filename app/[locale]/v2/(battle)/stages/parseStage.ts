import { GameState } from "../GameState.ts";
import { s21_63, s21_63_action } from "./s21_63.ts";
import { wood, wood_action } from "./wood.ts";

export function parseInitstage(gameState: GameState) {
  const stage = gameState.stage;
  switch (stage) {
    case "wood": {
      wood(gameState);
      break;
    }

    case "s21_63": {
      s21_63(gameState);
      break;
    }
  }
}

export function parseStageAction(gameState: GameState) {
  const stage = gameState.stage;
  switch (stage) {
    case "wood": {
      wood_action(gameState);
      break;
    }
    case "s21_63": {
      s21_63_action(gameState);
      break;
    }
  }
}
