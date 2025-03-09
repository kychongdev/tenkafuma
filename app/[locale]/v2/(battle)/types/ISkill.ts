import type {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "./Character";
import type {
  AffectType,
  DamageType,
  Skill,
  SkillStackCondition,
  SpecialCondition,
  Target,
} from "./Skill";

// 只是BUFF
export interface _0 {
  affectType: AffectType;
  value: number;
  specificCharId?: string;
  hidden?: boolean;
  appliedChar?: number;
}

// DEAL DAMAGE
export interface _1 {
  value: number;
  defender: Target;
  damageType: DamageType;
  multiple: boolean;
  multipleValue?: number;
}

//ADD CD
export interface _2 {
  increaseCD: number;
  target: Target;
}

// Stack buff 層數BUFF
export interface _3 {
  id: string;
  name: string;
  stack: number;
  maxStack: number;
  affectType: AffectType;
  value: number;
  specificCharId?: string;
}

// increase _3 stack buff
// 增加層次的BUFF
export interface _4 {
  increaseStack: number;
  targetSkill: string;
  target: Target | CharacterClass;
  applySkill?: Skill;
  applyToSpecificChar?: string;
}

// immediately effect buff
// 立即生效的BUFF
// 未寫
export interface _5 {
  condition: SpecialCondition;
  conditionValue: number;
  value: number;
  affectType: AffectType;
  target: Target | CharacterClass;
}

// 傳功
export interface _6 {
  value: number;
  affectType: AffectType.RAW_ATK;
  target: Target | CharacterClass;
  applyToSpecificChar?: string;
  duration: number;
  base: boolean;
}

// Check skill stack and apply buff
export interface _7 {
  stackCondition: SkillStackCondition;
  stack: number;
  target: Target | CharacterClass;
  targetSkill: string;
  activateSkill: Skill;
  applyTarget: Target | CharacterClass;
  activated: boolean;
}

// apply debuff/buff
// 白被動3
// 必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火、水屬性傷害增加3%(1回合)』」
export interface _8 {
  target: Target | CharacterClass;
  targetSkill: string;
  triggerSkill: Skill;
}

// 潛6的被動
export interface _9 {
  applySkill: Skill;
}

// Apply HP based shield
// 必殺時，觸發「以自身最大HP10%給予我方全體護盾(1回合)」
export interface _10 {
  value: number;
  hpBased: string;
  target: Target | CharacterClass;
  affectType: AffectType;
}

// Apply Simple buff
export interface _11 {
  target: Target | CharacterClass;
  applySkill: Skill[];
  applyToSpecificChar?: string;
  deleteSelf?: boolean;
  overlap?: boolean;
}

// Apply buff based on position, random it if position does not exist
export interface _12 {
  position: number;
  applySkill: Skill;
}

//Apply to character X buff
export interface _13 {
  target: string;
  applySkill: Skill[];
}

// Reduce CD on target
export interface _14 {
  reduceCD: number;
  target: Target;
}

//Reduce CD on position
export interface _15 {
  position: 0 | 1 | 2 | 3 | 4;
  reduceCD: number;
}

//用HP傳功
export interface _16 {
  value: number;
  affectType: AffectType.RAW_ATK;
  target: Target | CharacterClass;
  duration: number;
}

// based on multiple condition apply buff
export interface _17 {
  target: CharacterClass[];
  attributeTarget: CharacterAttribute;
  applySkill: Skill[];
  includeSelf: boolean;
}

// reduce CD to specific attribute (include self or not )
export interface _18 {
  reduceCD: number;
  includeSelf: boolean;
  attribute: CharacterAttribute;
}

//Specially made for tyrella lead
// this activate skill (one time activate)
export interface _19 {
  target: Target;
  applySkill: Skill;
  targetSkill: string;
  increaseStack: number;
  checkActivation: {
    characterId: string;
    checkSkillId: string;
    skillStackCondition: SkillStackCondition;
    activateIfStack: number;
    activateSkillId: string;
  }[];
}

// reduce the stack of _3 type buff / delete them when it reach 0
export interface _20 {
  target: Target.ENEMY | Target.ALL_ALLIES;
  targetChar: string;
  targetSkill: string;
  clearAll: boolean;
  clearStack?: number;
}

export interface _21 {
  trigger: Skill[];
}

// Skill stack to check
// this apply buff
export interface _22 {
  target: Target;
  applySkill: Skill;
  targetSkill: string;
  increaseStack: number;
  checkActivation: {
    characterId: string;
    checkSkillId: string;
    skillStackCondition: SkillStackCondition;
    activateIfStack: number;
    applySkills: Skill[];
  }[];
}

// Clear skill on specific target char
export interface _23 {
  clearSkill: string[];
  targetChar: string;
  targetSkill: string[];
}

// 清除自身以外的X buff with Target
export interface _24 {
  clearSkill: string[];
  target: Target;
}

// HP攻擊
export interface _25 {
  //skillId: string;
  //stack: number;
  //specialCondition: SpecialCondition;
  target: Target;
  disableOnSkillId: string;
  triggerSkill: Skill;
}

export interface _26 {
  value: number;
  target: Target;
  damageType: DamageType;
  action: CharacterAction;
  multiple?: number;
}

// 娜娜1層觸發
export interface _27 {
  target: Target.ENEMY | Target.ALL_ALLIES;
  targetChar: string;
  targetSkill: string;
  specialCondition:
    | SpecialCondition.SKILL_STACK_MORE_THAN
    | SpecialCondition.SKILL_STACK_LESS_THAN;
  stack: number;
  triggerSkill: Skill[];
}

export interface _28 {
  value: number;
  target: Target;
  // 0 is basic, 1 is ultimate
  action: CharacterAction;
  duration: number;
  multiple?: number;
  overlap?: boolean;
}

export interface _29 {
  value: number;
  target: Target | CharacterClass;
  applyToSpecificChar?: string;
  duration: number;
  base: boolean;
}

export interface _30 {
  reduceStack: number;
  targetSkill: string;
  target: Target | CharacterClass;
}

export interface _31 {
  value: number;
  affectType: AffectType.RAW_SHIELD;
  target: Target | CharacterClass;
  applyToSpecificChar?: string;
  duration: number;
}

// ---------------------------- ADD ON BUFF ----------------------------
export interface _101 {
  value: number;
  target: Target;
  // 0 is basic, 1 is ultimate
  damageType: DamageType;
  action: CharacterAction;
  isTrueDamage?: boolean;
  multiple?: number;
}

// increase _3 stack buff
// 增加層次的BUFF
export interface _104 {
  increaseStack: number;
  targetSkill: string;
  target: Target | CharacterClass;
  applySkill?: Skill;
}

// damage self
export interface _105 {}

//追加傳功

export interface _106 {
  value: number;
  affectType: AffectType.RAW_ATK;
  target: Target | CharacterClass;
  duration: number;
  base: boolean;
}

// Apply Simple buff
export interface _111 {
  target: Target | CharacterClass;
  applySkill: Skill[];
  deleteSelf?: boolean;
}

export interface _113 {
  target: string;
  applySkill: Skill[];
}
