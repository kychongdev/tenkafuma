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
  const pos = [0, 1, 2, 3, 4].filter((pos) => pos + 20 !== position);
  console.log(pos);
  const res = recursiveEnemy(gamestate, position, pos);
  return res ? res : Target.CANT_FIND;
}

function recursiveEnemy(
  gamestate: GameState,
  position: number,
  positionList: number[],
) {
  console.log(positionList);
  const positions = positionList;
  if (positionList.length === 0) {
    return false;
  }

  const randomPosition = Math.floor(Math.random() * positionList.length);
  console.log(randomPosition);
  if (checkAvailable(gamestate.enemies[positions[randomPosition]])) {
    console.log(randomPosition + 20);
    return randomPosition + 20;
  }

  const newPos = positionList.filter(
    (pos) => pos !== positions[randomPosition],
  );
  recursive(gamestate, position, newPos);
}

function randomEnemy(
  G: GameState,
  position:
    | Target.ENEMY_1
    | Target.ENEMY_2
    | Target.ENEMY_3
    | Target.ENEMY_4
    | Target.ENEMY_5,
) {
  if (checkAvailable(G.enemies[position - 20])) {
    return position;
  }
  let pos = [0, 1, 2, 3, 4].filter((pos) => pos + 20 !== position);

  for (let i = 0; i < pos.length; i = Math.floor(Math.random() * pos.length)) {
    if (checkAvailable(G.enemies[pos[i]])) {
      return pos[i] + 20;
    }
    pos = pos.filter((p) => p !== pos[i]);
  }
  return Target.CANT_FIND;
}

export function setLock(G: GameState, p: number, target: Target) {
  switch (target) {
    case Target.ENEMY_1:
      G.characters[p].lock1 = randomEnemy(G, Target.ENEMY_1);
      break;
    case Target.ENEMY_2:
      G.characters[p].lock2 = randomEnemy(G, Target.ENEMY_2);
      break;
    case Target.ENEMY_3:
      G.characters[p].lock3 = randomEnemy(G, Target.ENEMY_3);
      break;
    case Target.ENEMY_4:
      G.characters[p].lock4 = randomEnemy(G, Target.ENEMY_4);
      break;
    case Target.ENEMY_5:
      G.characters[p].lock5 = randomEnemy(G, Target.ENEMY_5);
      break;
  }
  //G.characters[position].lock
}
