import { customAlphabet } from "nanoid";
import { CharacterState } from "./types/Select";
import { AffectType, DamageType, Skill, Target } from "./types/Skill";
import { CharacterAction } from "./types/Character";
import { GameState } from "./GameState";
import characterJson from "../_data/characters.json";
import { recursive } from "./target";
import Big, { roundDown } from "big.js";

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
    case DamageType.TRUE_DMG:
      return "真實傷害";
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

export function highestHp(G: GameState) {
  const hpList = G.characters.map((char) => char.hp / char.maxHp);
  const result = Array.from(hpList.keys()).sort(
    (a, b) => hpList[b] - hpList[a],
  );
  let checkIfSameExist = [0];
  result.forEach((index) => {
    if (
      index !== 0 &&
      G.characters[index].hp / G.characters[index].maxHp ===
        G.characters[0].hp / G.characters[0].maxHp &&
      G.characters[index].isExist &&
      !G.characters[index].isDead
    ) {
      checkIfSameExist.push(index);
    }
  });
  if (checkIfSameExist.length > 1) {
    const random = Math.floor(Math.random() * checkIfSameExist.length);
    return result[random];
  } else {
    return result[0];
  }
}

export function lowestHp(G: GameState, chars: CharacterState[]) {
  const hpList = chars.map((char) => char.hp / char.maxHp);
  const result = Array.from(hpList.keys()).sort(
    (a, b) => hpList[a] - hpList[b],
  );

  // I have no idea whether this has bug or not
  if (chars[result[0]].hp / chars[result[0]].maxHp === 1) {
    const pos = [0, 1, 2, 3, 4];
    const firstRandom = Math.floor(Math.random() * pos.length);
    console.log("random", firstRandom);
    return recursive(G, firstRandom, pos) ?? -1;
  }

  result.forEach((index) => {
    if (!chars[index].isDead && chars[index].isExist) {
      return result[index];
    }
  });
  return -1;
}

export function randomTarget(G: GameState, position: number) {
  if (G.characters[position].isExist && !G.characters[position].isDead) {
    return position;
  }
  let pos = [0, 1, 2, 3, 4].filter((value) => {
    return value !== position;
  });

  for (let i = 0; i < pos.length; i++) {
    const rand = Math.floor(Math.random() * pos.length);
    if (G.characters[pos[rand]].isExist && !G.characters[pos[rand]].isDead) {
      return pos[i];
    }
    pos = pos.filter((value) => {
      return value !== pos[rand];
    });
  }
  return -1;
}

export function hpSort(arr: CharacterState[]) {
  const hpList = arr.map((char) => char.hp / char.maxHp);
  const result = Array.from(hpList.keys()).sort(
    (a, b) => hpList[a] - hpList[b],
  );
  return result;
}

export function maxHpSort(arr: CharacterState[]) {
  const hpList = arr.map((char) => char.maxHp);
  const result = Array.from(hpList.keys()).sort(
    (a, b) => hpList[a] - hpList[b],
  );

  return result;
}

export function parseSkillName(buff: Skill) {
  let active = "";
  const first5 = buff.name.slice(0, 5);
  if (first5 === "[發動中]") {
    active = "[發動中]";
  }
  if (buff.type === 0) {
    switch (buff._0?.affectType) {
      case AffectType.RAW_ATK:
        return `攻擊增加${formatNumber(buff._0.value)}`;
      case AffectType.RAW_SHIELD:
        return `護盾${formatNumber(buff._0.value)}`;
      case AffectType.RAW_HEAL_OVER_TIME:
        return `每回合治療${formatNumber(buff._0.value)}`;
      case AffectType.INCREASE_FIRE_DMG_RECEIVED:
        return `受到火屬性攻擊增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_WATER_DMG_RECEIVED:
        return `受到水屬性攻擊增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_WIND_DMG_RECEIVED:
        return `受到風屬性攻擊增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_LIGHT_DMG_RECEIVED:
        return `受到光屬性攻擊增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_DARK_DMG_RECEIVED:
        return `受到暗屬性攻擊增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_ATK:
        return `攻擊增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.MAX_HP:
        return `最大HP增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_DMG:
        return `造成傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_BASIC_DMG:
        return `${active}普攻傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_ULTIMATE_DMG:
        return `必殺技傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_DMG_RECEIVED:
        return `受到傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.DECREASE_DMG_RECEIVED:
        return `受到傷害減少${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_ULTIMATE_DMG_RECEIVED:
        return `受到必殺技傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.REDUCE_ATTRIBUTE_EFFECT:
        return `屬性相剋傷害減少${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_BASIC_DMG_RECEIVED:
        return `受到普攻傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.DECREASE_BASIC_DMG_RECEIVED:
        return `受到普攻傷害減少${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_TRIGGER_DMG:
        return `觸發傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_TRIGGER_DMG_RECEIVED:
        return `受到觸發傷害增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_TRIGGER_EFFECT:
        return `觸發效果增加${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.DECREASE_TRIGGER_EFFECT:
        return `觸發效果減少${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.DECREASE_TRIGGER_DMG:
        return `觸發傷害減少${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.DECREASE_TRIGGER_DMG_RECEIVED:
        return `受到觸發傷害減少${Big(buff._0.value).mul(100).round(0, Big.roundDown).toNumber()}%`;
      case AffectType.INCREASE_HEAL_RATE_OVER_TIME:
        return `受到持續回復增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_HEAL_RATE:
        return `被治療時回復量增加${buff._0.value * 100}%`;
      case AffectType.DECREASE_HEAL_RATE:
        return `被治療時回復量減少${buff._0.value * 100}%`;
      case AffectType.INCREASE_HEAL_RECEIVED:
        return `被治療時獲得回復量增加${buff._0.value * 100}%`;
      case AffectType.DECREASE_HEAL_RATE_OVER_TIME:
        return `受到持續回復減少${buff._0.value * 100}%`;
      case AffectType.INCREASE_GUARD_EFFECT:
        return `防禦減傷效果增加${buff._0.value * 100}%`;
      case AffectType.DECREASE_GUARD_EFFECT:
        return `防禦減傷效果減少${buff._0.value * 100}%`;
      case AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED:
        const char = buff._0.specificCharId;
        if (char) {
          //@ts-ignore
          const charName = characterJson[char];
          return `受到${charName.name}傷害增加${buff._0.value * 100}%`;
        } else {
          return "受到特定角色傷害增加";
        }
      case AffectType.DOT:
        return `每回合受到${formatNumber(buff._0.value)}傷害`;
      case AffectType.DECREASE_DMG_OVER_TIME_RECEIVED:
        return `受到持續型傷害減少${buff._0.value * 100}%`;
      case AffectType.INCREASE_DMG_OVER_TIME_RECEIVED:
        return `受到持續型傷害增加${buff._0.value * 100}%`;
      case AffectType.INCREASE_DMG_OVER_TIME:
        return `造成持續型傷害增加${buff._0.value * 100}%`;
      case AffectType.DECREASE_DMG_OVER_TIME:
        return `造成持續型傷害減少${buff._0.value * 100}%`;
      case AffectType.IMMUNE_SLEEP:
        return "免疫睡眠";
      case AffectType.IMMUNE_PARALYSIS:
        return "免疫麻痺";
      case AffectType.IMMUNE_SILENCE:
        return "免疫沉默";
      case AffectType.IMMUNE_CD_CHANGE:
        return "免疫技能CD變動";
      case AffectType.IMMUNE_ATTRIBUTE_EFFECT:
        return `屬性相剋減傷效果減少${buff._0.value * 100}%`;
      case AffectType.SUCK_HP_ON_DMG:
        return `造成傷害時會以傷害值${buff._0.value * 100}%回復自身HP`;
      case AffectType.IMMUNE_DECREASE_HEAL_RECEIVED:
        return buff.name;
    }

    return buff.name;
  }
  if (buff.type === 3 && buff._3) {
    switch (buff._3.affectType) {
      case AffectType.INCREASE_FIRE_DMG_RECEIVED:
        return `受到火屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_WATER_DMG_RECEIVED:
        return `受到水屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_WIND_DMG_RECEIVED:
        return `受到風屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_LIGHT_DMG_RECEIVED:
        return `受到光屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_DARK_DMG_RECEIVED:
        return `受到暗屬性攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_ATK:
        return `攻擊增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.MAX_HP:
        return `最大HP增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_DMG:
        return `造成傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_BASIC_DMG:
        return `普攻傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_ULTIMATE_DMG:
        return `必殺技傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_DMG_RECEIVED:
        return `受到傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.DECREASE_DMG_RECEIVED:
        return `受到傷害減少${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_ATTACKER_DMG_RECEIVED:
        return `受到攻擊者傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_TRIGGER_DMG_RECEIVED:
        return `受到觸發傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_TRIGGER_EFFECT:
        return `觸發效果增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.DECREASE_TRIGGER_EFFECT:
        return `觸發效果減少${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_ULTIMATE_DMG_RECEIVED:
        return `受到必殺技傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_BASIC_DMG_RECEIVED:
        return `受到普攻傷害增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.DECREASE_BASIC_DMG_RECEIVED:
        return `受到普攻傷害減少${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_HEAL_RATE_OVER_TIME:
        return `受到持續回復增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_HEAL_RATE:
        return `被治療時回復量增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.DECREASE_HEAL_RATE:
        return `被治療時回復量減少${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.DECREASE_HEAL_RATE_OVER_TIME:
        return `受到持續回復減少${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.DECREASE_HEAL_RECEIVED:
        return `受到治療量減少${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_HEAL_RECEIVED:
        return `受到治療量增加${formatToTwoDecimal(
          buff._3.value * buff._3.stack * 100,
        )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_GUARD_EFFECT:
        return `防禦減傷效果增加${
          buff._3.value * buff._3.stack * 100
        }% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.DECREASE_GUARD_EFFECT:
        return `防禦減傷效果減少${
          buff._3.value * buff._3.stack * 100
        }% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
      case AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED:
        const char = buff._3.specificCharId;
        if (char) {
          //@ts-ignore
          const charName = characterJson[char];
          return `受到「${charName.name}」傷害增加${
            buff._3.value * buff._3.stack * 100
          }%`;
        } else {
          return "受到特定角色傷害增加";
        }
      case AffectType.DECREASE_DMG_OVER_TIME_RECEIVED:
        return `受到持續型傷害減少${buff._3.value * buff._3.stack * 100}%`;
      case AffectType.INCREASE_DMG_OVER_TIME_RECEIVED:
        return `受到持續型傷害增加${buff._3.value * buff._3.stack * 100}%`;
      case AffectType.INCREASE_DMG_OVER_TIME:
        return `造成持續型傷害增加${buff._3.value * buff._3.stack * 100}%`;
      case AffectType.DECREASE_DMG_OVER_TIME:
        return `造成持續型傷害減少${buff._3.value * buff._3.stack * 100}%`;
      case AffectType.NONE:
        return `${buff.name} ${buff._3.stack}層 (最多${buff._3.maxStack}層)`;
    }
    return buff.name;
  }
  return buff.name;
}

export function formatToTwoDecimal(num: number) {
  return Math.round(num * 100) / 100;
}

export function parseMoveSet(move: number) {
  switch (move) {
    case 0:
      return "1普攻";
    case 1:
      return "2普攻";
    case 2:
      return "3普攻";
    case 3:
      return "4普攻";
    case 4:
      return "5普攻";
    case 5:
      return "1必殺";
    case 6:
      return "2必殺";
    case 7:
      return "3必殺";
    case 8:
      return "4必殺";
    case 9:
      return "5必殺";
    case 10:
      return "1防禦";
    case 11:
      return "2防禦";
    case 12:
      return "3防禦";
    case 13:
      return "4防禦";
    case 14:
      return "5防禦";
    default:
      return "無法讀取";
  }
}

export function calculateDamageDifference(base: number, current: number) {
  if (base === 0 && current === 0) return 0;
  const diff = (current / base) * 100;

  return +(diff - 100).toFixed(2);
}
