import characters from "@/data/characters.json";
import _ from "lodash";
import { CharacterAttribute, CharacterClass } from "./types/Character";
import { CharacterSelect, CharacterState, CharacterTeam } from "./types/Select";
import { calculateStats } from "./calculateStats";

interface CharacterList {
  [key: string]: {
    id: number;
    name: string;
    initHp: number;
    initAtk: number;
    class: CharacterClass;
    attribute: CharacterAttribute;
    cd: number;
  };
}

export function initTeam(value: CharacterTeam) {
  const charList = _.pickBy(characters, (value) => {
    return value.available;
  });
  return [
    parseTeam(value[0], charList),
    parseTeam(value[1], charList),
    parseTeam(value[2], charList),
    parseTeam(value[3], charList),
    parseTeam(value[4], charList),
  ];
}

function parseTeam(
  character: CharacterSelect,
  charList: CharacterList,
): CharacterState {
  if (character.id !== "") {
    const characterDetail = charList[character.id];

    const maxHp = calculateStats(
      characterDetail ? characterDetail.initHp : 0,
      character.level,
      character.stars,
      character.discipline,
      character.hpPot,
      character.lib,
    );
    const maxAtk = calculateStats(
      characterDetail ? characterDetail.initAtk : 0,
      character.level,
      character.stars,
      character.discipline,
      character.atkPot,
      character.lib,
    );
    return {
      id: character.id,
      name: characterDetail.name,
      isExist: true,
      baseAtk: characterDetail ? characterDetail.initAtk : 0,
      baseHp: characterDetail ? characterDetail.initHp : 0,
      maxAtk: maxAtk,
      maxHp: maxHp,
      stars: character.stars,
      passive4: character.isPot6,
      atk: maxAtk,
      hp: maxHp,
      //@ts-ignore
      bond: parseInt(character.bond),
      class: characterDetail ? characterDetail.class : CharacterClass.NONE,
      attribute: characterDetail
        ? characterDetail.attribute
        : CharacterAttribute.NONE,
      position: character.position,
      cd: characterDetail?.cd ?? 0,
      maxCd: characterDetail?.cd ?? 0,
      ultName: "",
      isMoved: false,
      isGuard: false,
      isBroken: false,
      isTaunt: false,
      isParalysis: false,
      isSleep: false,
      isHeal: false,
      isSilence: false,
      isDead: false,
      buff: [],
      attackedBy: [],
      //@ts-ignore
      lib: parseInt(character?.lib) ?? 0,
    };
  }
  return {
    id: character.id,
    name: "",
    isExist: false,
    baseAtk: 0,
    baseHp: 0,
    maxHp: 0,
    maxAtk: 0,
    atk: 0,
    hp: 0,
    bond: 1,
    stars: 3,
    passive4: false,
    attribute: CharacterAttribute.NONE,
    position: character.position,
    class: CharacterClass.NONE,
    cd: 0,
    maxCd: 0,
    ultName: "",
    isMoved: false,
    isGuard: false,
    isBroken: false,
    isTaunt: false,
    isParalysis: false,
    isSleep: false,
    isHeal: false,
    isSilence: false,
    isDead: false,
    buff: [],
    attackedBy: [],
    lib: 0,
  };
}
