import { GameState } from "./GameState";
import { Target } from "./types/Skill";
import { checkAvailable } from "./utils";

export function randomizePos(gamestate: GameState, position: number) {
  if (
    gamestate.characters[position].isExist &&
    !gamestate.characters[position].isDead
  ) {
    return position;
  }
  const pos = [0, 1, 2, 3, 4];

  const res = recursive(gamestate, position, pos);

  console.log(res);
  return res ? res : Target.CANT_FIND;
}

export function recursive(
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
  if (checkAvailable(gamestate.enemies[position - 20])) {
    return position;
  }
  const pos = [
    Target.ENEMY_1,
    Target.ENEMY_2,
    Target.ENEMY_3,
    Target.ENEMY_4,
    Target.ENEMY_5,
  ];
  const res = recursiveEnemy(gamestate, position, pos);
  return res ? res : Target.CANT_FIND;
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
  if (checkAvailable(gamestate.enemies[randomPosition])) {
    return randomPosition + 20;
  }

  positionList.splice(position, 1);
  recursive(gamestate, position, positionList);
}
