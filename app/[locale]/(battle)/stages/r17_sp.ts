import { initCharacterState } from "../data/placeholder";
import { GameState } from "../GameState";
import { CharacterAttribute, CharacterClass } from "../types/Character";
import { CharacterState } from "../types/Select";
import { AffectType, Condition, SpecialCondition } from "../types/Skill";

export function r21_sp(gameState: GameState) {
  const enemy1: CharacterState = {
    id: "43189",
    name: "死灵女王　艾莉莎白",
    isExist: true,
    baseAtk: 500,
    baseHp: 500000,
    maxAtk: 868721,
    maxHp: 3015397470,
    atk: 766628,
    hp: 3015397470,
    bond: 1,
    stars: 3,
    passive4: false,
    attribute: CharacterAttribute.NONE,
    position: 0,
    class: CharacterClass.NONE,
    cd: 4,
    maxCd: 4,
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
    attackedBy: [],
    lock1: 0,
    lock2: 1,
    lock3: 2,
    lock4: 3,
    lock5: 4,
    buff: [
      //属性相剋效果减少100%
      //受到伤害减少100%
      //最大HP增加200%
      //使自身最大HP不低于25%
      {
        id: "43189-passive-1",
        name: "免疫沉默",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.IMMUNE_SILENCE,
          value: 0,
        },
      },
      {
        id: "43189-passive-2",
        name: "免疫麻痺",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.IMMUNE_PARALYSIS,
          value: 0,
        },
      },
      {
        id: "43189-passive-3",
        name: "免疫睡眠",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.IMMUNE_SLEEP,
          value: 0,
        },
      },
      {
        id: "43189-passive-3",
        name: "免疫必殺CD变动效果",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.IMMUNE_CD_CHANGE,
          value: 0,
        },
      },
      {
        id: "43189-passive-1",
        name: "自身HP不會低於25%",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.NONE,
          value: 0,
        },
      },
      {
        id: "15114-passive-4",
        name: "或许可以尝试减少她面前的死灵数量，迫使她现身",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.NONE,
          value: 0,
        },
      },
      {
        id: "15114-passive-5",
        name: "普攻时，触发「使敌方全体获得2层『受到伤害增加1%(最多100%)』」",
        type: 1,
        condition: Condition.BASIC_ATTACK,
        duration: 100,
      },
      {
        id: "15114-passive-6",
        name: "HP不会低于0.01%",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.HP_LOCK_PERCENTAGE,
          value: 0.1,
        },
      },
      {
        id: "15114-passive-7",
        name: "每经过1回合，发动「使自身攻击力增加5%(最多50层)」效果;",
        type: 4,
        condition: Condition.EVERY_X_TURN,
        duration: 100,
      },
    ],
    lib: 0,
  };

  gameState.enemies = [
    enemy1,
    initCharacterState,
    initCharacterState,
    initCharacterState,
    initCharacterState,
  ];
}
export function r21_sp_action(gameState: GameState, oG: GameState) {
  //[Act01]  [类型：对话  ]  [模式：一次]  [结束行动：False]  [目标：Default]  [优先级：255]
  //[触发条件：0回合时触发]
  //[台词]  肮髒的野狗，臣服于我伊布力斯一族的高贵魔力下吧！
  //[Act02]  [类型：触发技能]  [模式：一次]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：0回合时触发]
  //[技能]：全体攻击
  //以自身攻击力250%对敌方全体造成伤害
  //[Act03]  [类型：回合技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在15%及以下，仅触发1次]
  //[台词]  在我眼前消失吧，微不足道的虫子。
  //[技能]：烈焰送葬
  //以自身攻击力600%对敌方全体造成2次伤害
  //[Act04]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：首次执行当前AI Act05]
  //[技能]：低贱的秽犬，跪下！
  //以敌方全体最大HP199%对敌方全体造成真实伤害
  //[Act05]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在76%及以下，仅触发1次]
  //[台词]  哦？有意思，竟然还想反抗吗？看来我得一口气让你屈服。
  //[技能]：绝对魔力屏障
  //受到伤害减少200%(2回合)
  //[Act06]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在51%及以下，仅触发1次]
  //[台词]  呜…就凭你这种傢伙…！别给我太得意忘形了！！
  //[技能]：秘术．烟殁雾逝之炎
  //以自身攻击力300%对敌方全体造成伤害
  //并以自身攻击力300%对敌方全体每回合造成伤害(1回合)
  //[Act07]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在26%及以下，仅触发1次]
  //[台词]  看来，不给你们一点教训是不行了。
  //[技能]：凝聚魔力
  //解除自身25%锁血
  //以自身最大HP100%对自身造成真实治疗
  //[Act08]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  //[触发条件：3n+1 回合，n>0  『且』  自身 存活]
  //[技能]：伊布力斯的魔力仪式
  //使自身造成伤害增加10%(最多10层)
  //使自身攻击时，以造成伤害值500%回復自身HP(2回合)
  //[Act09]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：3n+2 回合，n>0  『且』  自身 存活]
  //[技能]：全体攻击
  //以自身攻击力250%对敌方全体造成伤害
  //[Act10]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  //[触发条件：首次执行当前AI Act07]
  //[台词]  给我跪下。
  //[技能]：毁灭震波
  //以自身攻击力200%对全体造成伤害
  //使敌方全体受到伤害增加20%(最多10层)
  //使敌方全体受到护盾效果减少30%(最多10层)
  //[Act11]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：回合数>0时，2n 回合，n>0  『且』  已执行过当前AI Act07，每经过2回合]
  //[台词]  再给我跪下。
  //[技能]：毁灭震波
  //以自身攻击力200%对全体造成伤害
  //使敌方全体受到伤害增加20%(最多10层)
  //使敌方全体受到护盾效果减少30%(最多10层)
  //[Act12]  [类型：普攻  ]  [模式：循环]  [结束行动：False]  [目标：玩家当前HP百分比最高者]  [优先级：1]
  //[触发条件：回合数≥1]
}
