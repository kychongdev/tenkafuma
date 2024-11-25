import { AffectType, DamageType, Target, type Skill } from '@/types/Skill';
import { CharacterAction, CharacterAttribute } from '@/types/Character';
import characterJson from '@/data/characters.json';
import { CharacterState } from '../_types/Select';

export function formatNumber(number: number) {
  if (!number) return '0';

  //format number to have commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function f(number: number) {
  if (!number) return '0';

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function parseActionName(action: CharacterAction) {
  switch (action) {
    case CharacterAction.BASIC:
      return '普攻';
    case CharacterAction.ULTIMATE:
      return '必殺';
    case CharacterAction.GUARD:
      return '防禦';
    case CharacterAction.ATTACK:
      return '攻擊';
    case CharacterAction.SKILL:
      return '技能';
    case CharacterAction.NONE:
      return '無';
    default:
      return '';
  }
}
export function parseDamageTypeName(type: DamageType) {
  switch (type) {
    case DamageType.BASIC:
      return '普攻';
    case DamageType.BASIC_HP:
      return '普攻(HP)';
    case DamageType.ULTIMATE:
      return '必殺';
    case DamageType.TRIGGER:
      return '觸發';
    case DamageType.TRIGGER_HP:
      return '觸發(HP)';
    case DamageType.BASIC_ADDON:
      return '普攻(追加)';
    case DamageType.ULTIMATE_ADDON:
      return '必殺(追加)';
    case DamageType.DOT:
      return '持續傷害';
    case DamageType.ULTIMATE_HP:
      return '必殺(HP)';
    default:
      return '不明';
  }
}

export function parseSkillName(buff: Skill) {
  if (buff.type === 0) {
    if (!buff.deactivated) {
      switch (buff._0?.affectType) {
        case AffectType.RAW_ATK:
          return `攻擊增加${formatNumber(buff._0.value)}`;
        case AffectType.INCREASE_FIRE_DMG_RECEIVED:
          return `受到火屬性攻擊增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_WATER_DMG_RECEIVED:
          return `受到水屬性攻擊增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_WIND_DMG_RECEIVED:
          return `受到風屬性攻擊增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_LIGHT_DMG_RECEIVED:
          return `受到光屬性攻擊增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_DARK_DMG_RECEIVED:
          return `受到暗屬性攻擊增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_ATK:
          return `攻擊增加${buff._0.value * 100}%`;
        case AffectType.MAX_HP:
          return `最大HP增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_DMG:
          return `造成傷害增加${fixDecimal(buff._0.value * 100)}%`;
        case AffectType.INCREASE_BASIC_DMG:
          return `普攻傷害增加${fixDecimal(buff._0.value * 100)}%`;
        case AffectType.INCREASE_ULTIMATE_DMG:
          return `必殺技傷害增加${fixDecimal(buff._0.value * 100)}%`;
        case AffectType.INCREASE_DMG_RECEIVED:
          return `受到傷害增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_ULTIMATE_DMG_RECEIVED:
          return `受到必殺技傷害增加${buff._0.value * 100}%`;
        case AffectType.REDUCE_ATTRIBUTE_EFFECT:
          return `屬性相剋傷害減少${buff._0.value * 100}%`;
        case AffectType.INCREASE_BASIC_DMG_RECEIVED:
          return `受到普攻傷害增加${buff._0.value * 100}%`;
        case AffectType.DECREASE_BASIC_DMG_RECEIVED:
          return `受到普攻傷害減少${buff._0.value * 100}%`;
        case AffectType.INCREASE_TRIGGER_DMG:
          return `觸發傷害增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_TRIGGER_DMG_RECEIVED:
          return `受到觸發傷害增加${buff._0.value * 100}%`;
        case AffectType.DECREASE_TRIGGER_DMG:
          return `觸發傷害減少${buff._0.value * 100}%`;
        case AffectType.DECREASE_TRIGGER_DMG_RECEIVED:
          return `受到觸發傷害減少${buff._0.value * 100}%`;
        case AffectType.INCREASE_HEAL_RATE_OVER_TIME:
          return `受到持續回復增加${buff._0.value * 100}%`;
        case AffectType.INCREASE_HEAL_RATE:
          return `被治療時回復量增加${buff._0.value * 100}%`;
        case AffectType.DECREASE_HEAL_RATE:
          return `被治療時回復量減少${buff._0.value * 100}%`;
        case AffectType.DECREASE_HEAL_RATE_OVER_TIME:
          return `受到持續回復減少${buff._0.value * 100}%`;
        case AffectType.INCREASE_GUARD_EFFECT:
          return `防禦減傷效果增加${fixDecimal(buff._0.value * 100)}%`;
        case AffectType.DECREASE_GUARD_EFFECT:
          return `防禦減傷效果減少${fixDecimal(buff._0.value * 100)}%`;
        case AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED:
          const char = buff._0.specificCharId;
          if (char) {
            //@ts-ignore
            const charName = characterJson.name[char];
            return `受到${charName}傷害增加${buff._0.value * 100}%`;
          } else {
            return '受到特定角色傷害增加';
          }
        case AffectType.IMMUNE_SLEEP:
          return '免疫睡眠';
        case AffectType.IMMUNE_PARALYSIS:
          return '免疫麻痺';
        case AffectType.IMMUNE_SILENCE:
          return '免疫沉默';
        case AffectType.IMMUNE_CD_CHANGE:
          return '免疫技能CD變動';
        case AffectType.IMMUNE_ATTRIBUTE_EFFECT:
          return `屬性相剋減傷效果減少${buff._0.value * 100}%`;
        case AffectType.SUCK_HP_ON_DMG:
          return `造成傷害時會以傷害值${buff._0.value * 100}%回復自身HP`;
        case AffectType.IMMUNE_DECREASE_HEAL_RECEIVED:
          return buff.name;
      }
    }

    return `${
      buff.deactivated === true
        ? '(未發動)'
        : buff.deactivated === false
          ? '(發動中)'
          : ''
    }${buff.name}`;
  }
  if (buff.type === 3 && buff._3) {
    if (!buff.deactivated) {
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
        case AffectType.INCREASE_ATTACKER_DMG_RECEIVED:
          return `受到攻擊者傷害增加${formatToTwoDecimal(
            buff._3.value * buff._3.stack * 100,
          )}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
        case AffectType.INCREASE_TRIGGER_DMG_RECEIVED:
          return `受到觸發傷害增加${formatToTwoDecimal(
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
          return `防禦減傷效果增加${fixDecimal(buff._3.value * buff._3.stack * 100)}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
        case AffectType.DECREASE_GUARD_EFFECT:
          return `防禦減傷效果減少${fixDecimal(buff._3.value * buff._3.stack * 100)}% (Lv.${buff._3.stack}) (最多${buff._3.maxStack}層)`;
        case AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED:
          const char = buff._3.specificCharId;
          if (char) {
            //@ts-ignore
            const charName = characterJson.name[char];
            return `受到「${charName}」傷害增加${
              buff._3.value * buff._3.stack * 100
            }%`;
          } else {
            return '受到特定角色傷害增加';
          }
        case AffectType.NONE:
          return `${buff.name} ${buff._3.stack}層 (最多${buff._3.maxStack}層)`;
      }
    }
    return `${
      buff.deactivated === true
        ? '(未發動)'
        : buff.deactivated === false
          ? '(發動中)'
          : ''
    }${buff.name}`;
  }

  if (buff.type === 7) {
    return `${buff.name}[${buff._7?.activated ? '已觸發' : '未觸發'}])`;
  }
  return `${
    buff.deactivated === true
      ? '(未發動)'
      : buff.deactivated === false
        ? '(發動中)'
        : ''
  }${buff.name}`;
}

export function fixDecimal(num: number) {
  const test = num.toFixed(2);
  //check if decimal is 00
  if (test.slice(-2) === '00') {
    return num.toFixed(0);
  }
  return test;
}

export function parseAttribute(
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

export function formatToTwoDecimal(num: number) {
  return Math.round(num * 100) / 100;
}

export const validateNumber = (value: string, start: number, end: number) => {
  return (
    (Number.parseInt(value) >= start && Number.parseInt(value) <= end) ||
    value === ''
  );
};

export function parseMoveSet(move: number) {
  switch (move) {
    case 0:
      return '1普攻';
    case 1:
      return '2普攻';
    case 2:
      return '3普攻';
    case 3:
      return '4普攻';
    case 4:
      return '5普攻';
    case 5:
      return '1必殺';
    case 6:
      return '2必殺';
    case 7:
      return '3必殺';
    case 8:
      return '4必殺';
    case 9:
      return '5必殺';
    case 10:
      return '1防禦';
    case 11:
      return '2防禦';
    case 12:
      return '3防禦';
    case 13:
      return '4防禦';
    case 14:
      return '5防禦';
    default:
      return '無法讀取';
  }
}

export function calculateDamageDifference(base: number, current: number) {
  if (base === 0 && current === 0) return 0;
  const diff = (current / base) * 100;

  return +(diff - 100).toFixed(2);
}

export function parseTargetToNum(target: Target) {
  switch (target) {
    case Target.POSITION_1:
      return 0;
    case Target.POSITION_2:
      return 1;
    case Target.POSITION_3:
      return 2;
    case Target.POSITION_4:
      return 3;
    case Target.POSITION_5:
      return 4;
    default:
      return -1;
  }
}

// print zustand state
export function p(obj: unknown) {
  return JSON.parse(JSON.stringify(obj));
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
