import { CharacterAttribute, CharacterClass } from "../types/Character";
import { CharacterSelect, CharacterState } from "../types/Select";

const initCharacterState: CharacterState = {
  name: "",
  id: "char_nr",
  isExist: false,
  maxHp: 100,
  maxAtk: 0,
  baseHp: 0,
  baseAtk: 0,
  class: CharacterClass.NONE,
  stars: 3,
  atk: 0,
  hp: 100,
  bond: 1,
  cd: 0,
  passive4: false,
  lib: 0,
  maxCd: 0,
  ultName: "",
  attribute: CharacterAttribute.NONE,
  position: 0,
  isMoved: false,
  isGuard: false,
  isBroken: false,
  isTaunt: false,
  isParalysis: false,
  isSleep: false,
  isSilence: false,
  isHeal: false,
  isDead: false,
  lock1: 0,
  lock2: 1,
  lock3: 2,
  lock4: 3,
  lock5: 4,
  attackedBy: [],
  buff: [],
};

const initCharacterSelection = (position: number): CharacterSelect => {
  return {
    id: "",
    position: position,
    level: 60,
    hpPot: 100,
    atkPot: 100,
    stars: 5,
    bond: 5,
    discipline: 3,
    isPot6: true,
    lib: 0,
  };
};

export { initCharacterState, initCharacterSelection };
