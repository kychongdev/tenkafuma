import { customAlphabet } from "nanoid";
import { CharacterState } from "./types/Select";
import { DamageType, Target } from "./types/Skill";
import { CharacterAction } from "./types/Character";
import { GameState } from "./GameState";

export function generateClientId(size: number) {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nid = customAlphabet(alphabet, size);
  return nid();
}

export function f(number: number) {
  if (!number) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function p(obj: unknown) {
  return JSON.parse(JSON.stringify(obj));
}

export function checkAvailable(character: CharacterState) {
  return !character.isDead && character.isExist;
}

export function checkTargetAlive(G: GameState, target: Target) {
  switch (target) {
    case Target.POSITION_1:
      return !G.characters[0].isDead && G.characters[0].isExist;
    case Target.POSITION_2:
      return !G.characters[1].isDead && G.characters[1].isExist;
    case Target.POSITION_3:
      return !G.characters[2].isDead && G.characters[2].isExist;
    case Target.POSITION_4:
      return !G.characters[3].isDead && G.characters[3].isExist;
    case Target.POSITION_5:
      return !G.characters[4].isDead && G.characters[4].isExist;
    case Target.ENEMY_1:
      return !G.enemies[0].isDead && G.enemies[0].isExist;
    case Target.ENEMY_2:
      return !G.enemies[1].isDead && G.enemies[1].isExist;
    case Target.ENEMY_3:
      return !G.enemies[2].isDead && G.enemies[2].isExist;
    case Target.ENEMY_4:
      return !G.enemies[3].isDead && G.enemies[3].isExist;
    case Target.ENEMY_5:
      return !G.enemies[4].isDead && G.enemies[4].isExist;
    case Target.ENEMY:
      return !G.enemies[G.targeting].isDead && G.enemies[G.targeting].isExist;
    default:
      return false;
  }
}

export function parseCharacterLocation(position: number) {
  switch (position) {
    case 0:
      return Target.POSITION_1;
    case 1:
      return Target.POSITION_2;
    case 2:
      return Target.POSITION_3;
    case 3:
      return Target.POSITION_4;
    case 4:
      return Target.POSITION_5;
    case 20:
      return Target.ENEMY_1;
    case 21:
      return Target.ENEMY_2;
    case 22:
      return Target.ENEMY_3;
    case 23:
      return Target.ENEMY_4;
    case 24:
      return Target.ENEMY_5;
    default:
      console.error("Can't parse position");
      return Target.CANT_FIND;
  }
}

export function formatNumber(number: number) {
  if (!number) return "0";

  //format number to have commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseActionName(action: CharacterAction) {
  switch (action) {
    case CharacterAction.BASIC:
      return "普攻";
    case CharacterAction.ULTIMATE:
      return "必殺";
    case CharacterAction.GUARD:
      return "防禦";
    case CharacterAction.ATTACK:
      return "攻擊";
    case CharacterAction.SKILL:
      return "技能";
    case CharacterAction.NONE:
      return "無";
    default:
      return "";
  }
}
export function parseDamageTypeName(type: DamageType) {
  switch (type) {
    case DamageType.BASIC:
      return "普攻";
    case DamageType.BASIC_HP:
      return "普攻(HP)";
    case DamageType.ULTIMATE:
      return "必殺";
    case DamageType.TRIGGER:
      return "觸發";
    case DamageType.TRIGGER_HP:
      return "觸發(HP)";
    case DamageType.BASIC_ADDON:
      return "普攻(追加)";
    case DamageType.ULTIMATE_ADDON:
      return "必殺(追加)";
    case DamageType.DOT:
      return "持續傷害";
    case DamageType.ULTIMATE_HP:
      return "必殺(HP)";
    default:
      return "不明";
  }
}

export function parseCharacterName(G: GameState, target: Target) {
  switch (target) {
    case Target.POSITION_1:
      return G.characters[0].name;
    case Target.POSITION_2:
      return G.characters[1].name;
    case Target.POSITION_3:
      return G.characters[2].name;
    case Target.POSITION_4:
      return G.characters[3].name;
    case Target.POSITION_5:
      return G.characters[4].name;
    case Target.ENEMY:
      return G.enemies[G.targeting].name;
    case Target.ENEMY_1:
      return G.enemies[0].name;
    case Target.ENEMY_2:
      return G.enemies[1].name;
    case Target.ENEMY_3:
      return G.enemies[2].name;
    case Target.ENEMY_4:
      return G.enemies[3].name;
    case Target.ENEMY_5:
      return G.enemies[4].name;
    default:
      return "無法讀取[BUG]";
  }
}
