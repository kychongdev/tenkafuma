enum CharacterAttribute {
  FIRE = 5,
  WATER = 6,
  WIND = 7,
  LIGHT = 8,
  DARK = 9,
  NONE = 10,
}
enum CharacterClass {
  ATTACKER = 11,
  PROTECTOR = 12,
  HEALER = 13,
  OBSTRUCTER = 14,
  SUPPORT = 15,
  NONE = 16,
}

enum CharacterAction {
  BASIC,
  ULTIMATE,
  GUARD,
  ATTACK,
  SKILL,
  NONE,
}

interface CharacterList {
  id: number;
  name: string;
  attribute: CharacterAttribute;
  class: CharacterClass;
  available: boolean;
  inithp: number;
  initatk: number;
}

export { CharacterAttribute, CharacterClass, CharacterAction };
export type { CharacterList };
