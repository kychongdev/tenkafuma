import { addOn } from "./addon";
import { GameState } from "./GameState";
import { CharacterAction } from "./types/Character";
import { Condition } from "./types/Skill";

// When activate condition
export function parseAddon(
  state: GameState,
  oldState: GameState,
  position: number,
  condition: Condition[],
  ca: CharacterAction,
) {
  condition.forEach((c) => {
    if (position >= 0 && position < 5 && !state.characters[position].isDead) {
      for (const buff of oldState.characters[position].buff) {
        if (c === buff.condition) {
          addOn(state, oldState, position, buff, ca);
        }
      }
    }

    for (const enemy of state.enemies) {
      if (enemy.isDead) continue;
      for (const buff of enemy.buff) {
        if (c === buff.condition) {
          addOn(state, oldState, position, buff, ca);
        }
      }
    }
  });
}
