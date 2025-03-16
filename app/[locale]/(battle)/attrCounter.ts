import { CharacterAttribute } from "./types/Character";

export function attrCounter(
  active: CharacterAttribute,
  passive: CharacterAttribute,
) {
  switch (active) {
    case CharacterAttribute.DARK:
      if (passive === CharacterAttribute.LIGHT) return 1.5;
      if (passive === CharacterAttribute.NONE) return 1;
      break;
    case CharacterAttribute.LIGHT:
      if (passive === CharacterAttribute.DARK) return 1.5;
      if (passive === CharacterAttribute.NONE) return 1;
      break;
    case CharacterAttribute.FIRE:
      if (passive === CharacterAttribute.WIND) return 1.5;
      if (passive === CharacterAttribute.WATER) return 0.5;
      if (passive === CharacterAttribute.NONE) return 1;
      break;
    case CharacterAttribute.WATER:
      if (passive === CharacterAttribute.FIRE) return 1.5;
      if (passive === CharacterAttribute.WIND) return 0.5;
      if (passive === CharacterAttribute.NONE) return 1;
      break;
    case CharacterAttribute.WIND:
      if (passive === CharacterAttribute.WATER) return 1.5;
      if (passive === CharacterAttribute.FIRE) return 0.5;
      if (passive === CharacterAttribute.NONE) return 1;
      break;
    case CharacterAttribute.NONE:
      return 1;
    default:
      return 1;
  }
  return 1;
}
