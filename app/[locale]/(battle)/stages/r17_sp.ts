import Big from "big.js";
import { initCharacterState } from "../data/placeholder";
import { GameState } from "../GameState";
import { trigger } from "../trigger";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "../types/Character";
import { CharacterState } from "../types/Select";
import {
  AffectType,
  Condition,
  DamageType,
  Skill,
  SpecialCondition,
  Target,
} from "../types/Skill";
import { highestHp, p } from "../utils";
import {
  enemyDealBasicDmgToAllAllies,
  enemyDealBasicDmgToTarget,
  enemyDealTrueDmgToAllAllies,
  enemyDealUltDmgToAllAllies,
  enemyDealUltDmgToTarget,
} from "./enemyApplyDmg";

export function r17_sp(gameState: GameState) {
  const enemy1: CharacterState = {
    id: "43189",
    name: "驕傲魔王 伊布力斯",
    isExist: true,
    baseAtk: 500,
    baseHp: 500000,
    maxAtk: 868721,
    maxHp: 3015397470,
    atk: 806977,
    //atk: 806977,
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
        id: "43189-passive-4",
        name: "受到伤害减少100%",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.DECREASE_DMG_RECEIVED,
          value: 1,
        },
      },
      {
        id: "43189-passive-5",
        name: "自身HP不會低於25%",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.HP_LOCK,
          value: 0.25,
        },
      },
    ],
    lib: 0,
  };

  gameState.enemies[0] = enemy1;
  gameState.stageState = {
    lock1: true,
    act3: false,
    act4: false,
    act5: false,
    act6: false,
    act7: false,
    act10: false,
  };
}
export function r17_sp_action(G: GameState, oG: GameState) {
  let act = 2;
  //[Act01]  [类型：对话  ]  [模式：一次]  [结束行动：False]  [目标：Default]  [优先级：255]
  //[触发条件：0回合时触发]
  //[台词]  肮髒的野狗，臣服于我伊布力斯一族的高贵魔力下吧！
  if (G.turn === 0) {
    G.enemyBattleLog.push("肮髒的野狗，臣服于我伊布力斯一族的高贵魔力下吧！");
  }

  //[Act02]  [类型：触发技能]  [模式：一次]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：0回合时触发]
  //[技能]：全体攻击
  //以自身攻击力250%对敌方全体造成伤害
  if (G.turn === 0) {
    enemyDealUltDmgToAllAllies(
      G,
      oG,
      2.5,
      Target.ENEMY_1,
      false,
      DamageType.ULTIMATE,
      CharacterAction.ULTIMATE,
    );
  }

  //[Act03]  [类型：回合技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在15%及以下，仅触发1次]
  //[台词]  在我眼前消失吧，微不足道的虫子。
  //[技能]：烈焰送葬
  //以自身攻击力600%对敌方全体造成2次伤害
  if (
    Big(G.enemies[0].hp).div(G.enemies[0].maxHp).lt(0.15) &&
    !G.stageState.act3
  ) {
    G.enemyBattleLog.push("在我眼前消失吧，微不足道的虫子。");
    enemyDealUltDmgToAllAllies(
      G,
      oG,
      6,
      Target.ENEMY_1,
      false,
      DamageType.BASIC,
      CharacterAction.BASIC,
    );
    G.stageState.act3 = true;
    return;
  }

  //以自身攻击力600%对敌方全体造成2次伤害
  //[Act04]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：首次执行当前AI Act05]
  //[技能]：低贱的秽犬，跪下！
  //以敌方全体最大HP199%对敌方全体造成真实伤害
  if (G.stageState.act5 && !G.stageState.act4) {
    G.enemyBattleLog.push("低贱的秽犬，跪下！");
    enemyDealTrueDmgToAllAllies(
      G,
      oG,
      1.99,
      Target.ENEMY_1,
      CharacterAction.ULTIMATE,
    );
    G.stageState.act4 = true;
    return;
  }

  //[Act05]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在76%及以下，仅触发1次]
  //[台词]  哦？有意思，竟然还想反抗吗？看来我得一口气让你屈服。
  //[技能]：绝对魔力屏障
  //受到伤害减少200%(2回合)
  if (G.enemies[0].hp / G.enemies[0].maxHp <= 0.76 && !G.stageState.act5) {
    G.enemyBattleLog.push(
      "哦？有意思，竟然还想反抗吗？看来我得一口气让你屈服。",
    );
    G.enemies[0].buff = [
      ...G.enemies[0].buff,
      {
        id: "43189-act-05",
        name: "绝对魔力屏障",
        type: 0,
        condition: Condition.NONE,
        duration: 2,
        _0: {
          affectType: AffectType.DECREASE_DMG_RECEIVED,
          value: 2,
        },
      },
    ];
    G.stageState.act5 = true;
    return;
  }

  //[Act06]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在51%及以下，仅触发1次]
  //[台词]  呜…就凭你这种傢伙…！别给我太得意忘形了！！
  //[技能]：秘术．烟殁雾逝之炎
  //以自身攻击力300%对敌方全体造成伤害
  //并以自身攻击力300%对敌方全体每回合造成伤害(1回合)
  if (
    Big(G.enemies[0].hp).div(G.enemies[0].maxHp).lt(0.51) &&
    !G.stageState.act6
  ) {
    G.enemyBattleLog.push("呜…就凭你这种傢伙…！别给我太得意忘形了！！");
    G.stageState.act6 = true;
    return;
  }

  //[Act07]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：自身 HP在26%及以下，仅触发1次]
  //[台词]  看来，不给你们一点教训是不行了。
  //[技能]：凝聚魔力
  //解除自身25%锁血
  //以自身最大HP100%对自身造成真实治疗
  if (
    Big(G.enemies[0].hp).div(G.enemies[0].maxHp).lt(0.26) &&
    !G.stageState.act7
  ) {
    G.enemyBattleLog.push("看来，不给你们一点教训是不行了。");
    G.enemies[0].buff = G.enemies[0].buff.filter(
      (x) => x.id !== "43189-passive-5",
    );
    G.enemies[0].hp = G.enemies[0].maxHp;
    G.stageState.act7 = true;
    return;
  }

  //[Act08]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  //[触发条件：3n+1 回合，n>0  『且』  自身 存活]
  //[技能]：伊布力斯的魔力仪式
  //使自身造成伤害增加10%(最多10层)
  //使自身攻击时，以造成伤害值500%回復自身HP(2回合)
  if ((G.turn - 1) % 3 === 0 && G.turn > 3) {
    const buff: Skill = {
      id: "43189-act-08",
      name: "伊布力斯的魔力仪式",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        targetSkill: "43189-act-08-1",
        target: Target.ENEMY_1,
        applySkill: {
          id: "43189-act-08-1",
          name: "造成伤害增加10%(最多10层)",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "43189-act-08-1",
            name: "造成伤害增加10%(最多10层)",
            value: 0.1,
            stack: 1,
            maxStack: 10,
            affectType: AffectType.INCREASE_DMG,
          },
        },
      },
    };
    trigger(G, oG, Target.ENEMY_1, buff, CharacterAction.BASIC);
    act = act - 1;
  }

  //[Act09]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：3n+2 回合，n>0  『且』  自身 存活]
  //[技能]：全体攻击
  //以自身攻击力250%对敌方全体造成伤害
  if ((G.turn - 2) % 3 === 0 && G.turn > 3) {
    enemyDealUltDmgToAllAllies(
      G,
      oG,
      2.5,
      Target.ENEMY_1,
      false,
      DamageType.ULTIMATE,
      CharacterAction.ULTIMATE,
    );
    return;
  }
  //
  //[Act10]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  //[触发条件：首次执行当前AI Act07]
  //[台词]  给我跪下。
  //[技能]：毁灭震波
  //以自身攻击力200%对全体造成伤害
  //使敌方全体受到伤害增加20%(最多10层)
  //使敌方全体受到护盾效果减少30%(最多10层)
  if (G.stageState.act7 && !G.stageState.act10) {
    G.enemyBattleLog.push("给我跪下。");
    enemyDealUltDmgToAllAllies(
      G,
      oG,
      2,
      Target.ENEMY_1,
      false,
      DamageType.BASIC,
      CharacterAction.BASIC,
    );

    const buff: Skill = {
      id: "43189-act-10",
      name: "毁灭震波",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        targetSkill: "43189-act-10-1",
        target: Target.ALL_ALLIES,
        applySkill: {
          id: "43189-act-10-1",
          name: "受到伤害增加",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "43189-act-10-1",
            name: "受到伤害增加",
            value: 0.2,
            stack: 1,
            maxStack: 10,
            affectType: AffectType.INCREASE_DMG_RECEIVED,
          },
        },
      },
    };
    trigger(G, oG, Target.ALL_ALLIES, buff, CharacterAction.BASIC);
    const buff2: Skill = {
      id: "43189-act-10-2",
      name: "毁灭震波",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        targetSkill: "43189-act-10-2",
        target: Target.ALL_ALLIES,
        applySkill: {
          id: "43189-act-10-2",
          name: "受到护盾效果减少",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "43189-act-10-2",
            name: "受到护盾效果减少",
            value: 0.3,
            stack: 1,
            maxStack: 10,
            affectType: AffectType.DECREASE_SHIELD_ABSORB,
          },
        },
      },
    };
    trigger(G, oG, Target.ALL_ALLIES, buff2, CharacterAction.BASIC);
    G.stageState.act10 = true;
  }

  //[Act11]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：Default]  [优先级：255]
  //[触发条件：回合数>0时，2n 回合，n>0  『且』  已执行过当前AI Act07，每经过2回合]
  //[台词]  再给我跪下。
  //[技能]：毁灭震波
  //以自身攻击力200%对全体造成伤害
  //使敌方全体受到伤害增加20%(最多10层)
  //使敌方全体受到护盾效果减少30%(最多10层)

  if (G.turn > 0 && (G.turn - 2) % 2 === 0 && G.stageState.act7) {
    G.enemyBattleLog.push("再给我跪下。");
    enemyDealUltDmgToAllAllies(
      G,
      oG,
      2,
      Target.ENEMY_1,
      false,
      DamageType.BASIC,
      CharacterAction.BASIC,
    );

    const buff: Skill = {
      id: "43189-act-10",
      name: "毁灭震波",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        targetSkill: "43189-act-10-1",
        target: Target.ALL_ALLIES,
        applySkill: {
          id: "43189-act-10-1",
          name: "受到伤害增加",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "43189-act-10-1",
            name: "受到伤害增加",
            value: 0.2,
            stack: 1,
            maxStack: 10,
            affectType: AffectType.INCREASE_DMG_RECEIVED,
          },
        },
      },
    };
    trigger(G, oG, Target.ALL_ALLIES, buff, CharacterAction.BASIC);
    const buff2: Skill = {
      id: "43189-act-10-2",
      name: "毁灭震波",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        targetSkill: "43189-act-10-2",
        target: Target.ALL_ALLIES,
        applySkill: {
          id: "43189-act-10-2",
          name: "受到护盾效果减少",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "43189-act-10-2",
            name: "受到护盾效果减少",
            value: 0.3,
            stack: 1,
            maxStack: 10,
            affectType: AffectType.DECREASE_SHIELD_ABSORB,
          },
        },
      },
    };
    trigger(G, oG, Target.ALL_ALLIES, buff2, CharacterAction.BASIC);
    return;
  }

  //[Act12]  [类型：普攻  ]  [模式：循环]  [结束行动：False]  [目标：玩家当前HP百分比最高者]  [优先级：1]
  //[触发条件：回合数≥1]
  if (G.turn >= 1) {
    for (let i = 0; i < act; i++) {
      const who = highestHp(G);
      console.log("who", who);
      enemyDealBasicDmgToTarget(
        G,
        oG,
        1,
        Target.ENEMY_1,
        who,
        false,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
    }
  }
}
