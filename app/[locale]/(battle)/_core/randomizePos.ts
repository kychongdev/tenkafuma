import { GameState } from "./GameState";

export function randomizePos(gamestate: GameState, position: number) {
  if (
    gamestate.characters[position].isExist &&
    !gamestate.characters[position].isDead
  ) {
    return position;
  }
  const pos = [0, 1, 2, 3, 4];

  const res = recursive(gamestate, position, pos);
  return res ? res : -1;
}

function recursive(
  gamestate: GameState,
  position: number,
  positionList: number[],
) {
  if (positionList.length === 0) {
    return -1;
  }

  const randomPosition = Math.floor(Math.random() * positionList.length);
  if (
    gamestate.characters[randomPosition].isExist &&
    !gamestate.characters[randomPosition].isDead
  ) {
    return randomPosition;
  }

  positionList.splice(position, 1);
  recursive(gamestate, position, positionList);
}

export function randomizeEnemyPos(gamestate: GameState, position: number) {
  if (
    gamestate.enemies[position].isExist &&
    !gamestate.enemies[position].isDead
  ) {
    return position;
  }
  const enemyAmount = gamestate.enemies.length;
  const pos = [];
  for (let i = 0; i < enemyAmount; i++) {
    pos.push(i);
  }
  if (pos.length === 1) {
    return pos[0];
  }
  const res = recursiveEnemy(gamestate, position, pos);
  return res ? res : -1;
}

function recursiveEnemy(
  gamestate: GameState,
  position: number,
  positionList: number[],
) {
  if (positionList.length === 0) {
    return -1;
  }

  const randomPosition = Math.floor(Math.random() * positionList.length);
  if (
    gamestate.enemies[randomPosition].isExist &&
    !gamestate.enemies[randomPosition].isDead
  ) {
    return randomPosition;
  }

  positionList.splice(position, 1);
  recursive(gamestate, position, positionList);
}
