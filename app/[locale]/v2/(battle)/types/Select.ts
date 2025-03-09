import { Skill } from "./Skill";
import { CharacterAttribute, CharacterClass } from "./Character";

interface CharacterSelect {
  id: string;
  position: number;
  level: number;
  hpPot: number;
  atkPot: number;
  discipline: number;
  stars: number;
  bond: number;
  isPot6: boolean;
  lib: number;
}

interface CharacterTeam {
  "0": CharacterSelect;
  "1": CharacterSelect;
  "2": CharacterSelect;
  "3": CharacterSelect;
  "4": CharacterSelect;
}

interface CharacterState {
  id: string;
  name: string;
  isExist: boolean;
  baseAtk: number;
  baseHp: number;
  maxAtk: number;
  maxHp: number;
  atk: number;
  hp: number;
  stars: number;
  bond: number;
  passive4: boolean;
  lib: number;
  class: CharacterClass;
  attribute: CharacterAttribute;
  position: number;
  isMoved: boolean;
  isGuard: boolean;
  isBroken: boolean;
  isTaunt: boolean;
  isParalysis: boolean;
  isSleep: boolean;
  isSilence: boolean;
  isDead: boolean;
  isHeal: boolean;
  attackedBy: any[];
  buff: Skill[];
  cd: number;
  maxCd: number;
  ultName: string;
}

export type { CharacterSelect, CharacterState, CharacterTeam };
