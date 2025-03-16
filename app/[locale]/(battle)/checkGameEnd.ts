import { GameState } from "./GameState";

export function checkGameEnd(gameState: GameState) {
  return {
    enemy: gameState.enemies.every((enemy) => enemy.isDead),
    character: gameState.characters.every((character) => character.isDead),
  };
}
