import { Condition } from "@/app/[locale]/(battle)/_types/Skill";
import { GameState } from "./GameState";
import { triggerSkill } from "./triggerSkill";
import { p } from "./utils";

// When activate condition
export function parseCondition(
  position: number,
  condition: Condition[],
  state: GameState,
  oldState: GameState,
) {
  const b = state.characters[position].buff;
  condition.forEach((c) => {
    if (position >= 0 && position < 5 && !state.characters[position].isDead) {
      for (const char of b) {
        if (char.deactivated || char.OffOnAction) continue;
        if (c === char.condition) {
          triggerSkill(char, state, position, oldState);
        }
      }
    }

    for (const enemy of state.enemies) {
      if (enemy.isDead) continue;
      for (const char of enemy.buff) {
        if (char.deactivated || char.OffOnAction) continue;
        if (c === char.condition) {
          console.log(char.id);
          triggerSkill(char, state, position, oldState);
        }
      }
    }
  });
}
