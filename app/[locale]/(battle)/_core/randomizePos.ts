import { GameState } from './GameState';

export function randomizePos(gamestate: GameState, position: number) {
  const pos = [0, 1, 2, 3, 4];

  const res = recursive(gamestate, position, pos);
  return res;
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
