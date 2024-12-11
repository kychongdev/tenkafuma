import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "@/types/Character";
import { GameState } from "../GameState";
import { CharacterState } from "@/types/Select";
import {
  AffectType,
  Condition,
  DamageType,
  Skill,
  SpecialCondition,
  Target,
} from "@/types/Skill";
import { triggerSkill } from "../triggerSkill";
import { dealUltDamage } from "../dealUltDamage";
import { hpSort, maxHpSort, p } from "../utils";
import { dealBasicDamage } from "../dealBasicDamage";
import { parseCondition } from "../parseCondition";
import { randomizePos } from "../randomizePos";

export function s21_63(gameState: GameState) {
  const enemy1: CharacterState = {
    id: "42228",
    name: "背德密醫 艾琳",
    isExist: true,
    baseAtk: 500,
    baseHp: 2500000,
    maxAtk: 868721,
    maxHp: 6515412293,
    atk: 868721,
    hp: 6515412293,
    bond: 1,
    stars: 3,
    passive4: false,
    attribute: CharacterAttribute.NONE,
    position: 0,
    class: CharacterClass.NONE,
    cd: 5,
    maxCd: 5,
    ultName: "",
    shield: 0,
    isMoved: false,
    isGuard: false,
    isBroken: false,
    isTaunt: false,
    isParalysis: false,
    isSleep: false,
    isHeal: false,
    isSilence: false,
    isDead: false,
    buff: [
      {
        id: "42228-passive-1",
        name: "免疫沈默",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.IMMUNE_SILENCE,
          value: 0,
        },
      },
      {
        id: "42228-passive-2",
        name: "免疫麻痹",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.IMMUNE_PARALYSIS,
          value: 0,
        },
      },
      {
        id: "42228-passive-3",
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
        id: "42228-passive-4",
        name: "受到属性相剋效果减少100%",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.IMMUNE_ATTRIBUTE_EFFECT,
          value: 1,
        },
      },
      {
        id: "42228-passive-5",
        name: "每经过1回合时，触发「使敌方全体被治疗时回復量减少5%(最多50层)」",
        type: 4,
        condition: Condition.EVERY_X_TURN,
        conditionTurn: 1,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "42228-passive-5-1",
          target: Target.ALL_ALLIES,
          applySkill: {
            id: "42228-passive-5-1",
            name: "被治疗时回復量",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "42228-passive-5-1",
              name: "被治疗时回復量",
              stack: 1,
              maxStack: 50,
              value: 0.05,
              affectType: AffectType.DECREASE_HEAL_RECEIVED,
            },
          },
        },
      },
      {
        id: "42228-passive-6",
        name: "每经过1回合时，触发「使自身攻击力增加5%(最多50层)」",
        type: 4,
        condition: Condition.EVERY_X_TURN,
        conditionTurn: 1,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "42228-passive-6-1",
          target: Target.ENEMY_1,
          applySkill: {
            id: "42228-passive-6-1",
            name: "使自身攻击力增加5%(最多50层)",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "42228-passive-6-1",
              name: "使自身攻击力增加5%(最多50层)",
              stack: 1,
              maxStack: 50,
              value: 0.05,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        },
      },
      {
        id: "42228-passive-7",
        name: "吸血",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.SUCK_HP_ON_DMG,
          value: 5,
        },
      },
      {
        id: "42228-passive-8",
        name: "敌方必杀时，触发「使自身获得1层《精力补充》(最多10层)」",
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "42228-passive-8-1",
          target: Target.ENEMY_1,
          applySkill: {
            id: "42228-passive-8-1",
            name: "《精力补充》",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "42228-passive-8-1",
              name: "《精力补充》",
              stack: 1,
              maxStack: 10,
              value: 0,
              affectType: AffectType.NONE,
            },
          },
        },
      },
      {
        id: "42228-passive-9",
        name: "吸血",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        _0: {
          affectType: AffectType.SUCK_HP_ON_DMG,
          value: 5,
        },
      },
    ],
    lib: 0,
  };
  // StageID	42228
  // StageName	私蜜♡健检师 艾琳
  // Wave	1
  // Position	1
  // CharID	42228
  // Name	私蜜♡健检师 艾琳
  // AIID	42228
  // BaseHP	2500000
  // BaseATK	500
  // Prop	暗属性
  // CharKind	治疗者
  // StageLv	0
  // Rank	0
  // HP	0
  // ATK	0
  // Name	[42228] 私蜜♡健检师 艾琳
  // FatalSkillLV1	极限性爱测试
  // 使自身获得「普攻时，根据自身《精力补充》的层数，触发『以自身攻击力50%对敌方全体造成伤害』(1回合)」
  // 使自身获得「普攻时，触发『清除自身《精力补充》的所有层数』(1回合)」
  // FatalSkillLV2	N/A
  // FatalSkillLV3	N/A
  // FatalSkillLV4	N/A
  // FatalSkillLV5	N/A
  // AtkSkill	攻击
  // 以自身攻击力50%对敌方全体造成伤害
  // LeaderSkill	N/A
  // PassiveSkill1	被动1
  // 免疫所有异常
  // 受到属性相剋效果减少100%
  // 每经过1回合时，触发「使自身攻击力增加5%(最多50层)」
  // PassiveSkill2	被动2
  // 每经过1回合时，触发「使敌方全体被治疗时回復量减少5%(最多50层)」
  // 造成伤害时会以伤害值500%回復自身HP
  // 敌方必杀时，触发「使自身获得1层《精力补充》(最多10层)」
  // 使敌方全体获得「当前HP≦99%时，发动『免疫『被治疗时回復量减少』效果』」
  // PassiveSkill3	被动3
  // 最大HP增加100%
  // 被治疗时回復量增加100%
  // 每经过1回合时，触发「使敌方全体受到伤害增加2.5%(最多50层)」
  // 必杀技最大CD增加10回合(仅供AI判断，无实际效果)
  // 使敌方全体获得「当前HP≧100%时，发动『免疫『受到伤害增加』效果』(50回合)」
  // PotSkill1	N/A
  // PotSkill2	N/A
  //
  gameState.stage_state = {
    last_turn_hp: 6515412293,
    act_10_target: -1,
    skill_list: [
      {
        id: "42228-act01",
        name: "健检开始",
        description: "使敌方全体护盾效果减少90%(50回合)",
        requirements: "[触发条件]：0回合时触发",
        available: true,
      },
      {
        id: "42228-act02",
        name: "私蜜♡健检开始",
        description: "使敌方全体护盾效果减少500%(50回合)",
        requirements: "[触发条件]：0回合时触发",
        available: true,
      },
      {
        id: "42228-act03",
        name: "可不能逃喔～",
        description: "使敌方全体防御减伤效果减少2.5%(最多20层)",
        requirements: "[触发条件]：回合内玩家防御次数≥2",
        available: true,
      },
      {
        id: "42228-act04",
        name: "再更激烈一点♡",
        description:
          "使自身造成伤害增加5%(最多10层) \n使自身受到伤害增加5%(最多10层)",
        requirements: "自身 HP损伤量<1%『且』玩家位置3 存活",
        available: true,
      },
      {
        id: "42228-act05",
        name: "让人家稍微喘口气",
        description:
          "使自身「造成伤害增加5%(最多10层)」的层数减少1层\n使自身「受到伤害增加5%(最多10层)」的层数减少1层",
        requirements: "自身 HP损伤量>1%『且』玩家位置3 存活",
        available: true,
      },
      {
        id: "42228-act06",
        name: "还请您使出浑身解数，跟我来一场酣畅淋漓的极限性爱吧♡",
        description: "必殺",
        requirements: "CD=0",
        available: true,
      },
      {
        id: "42228-act07",
        name: "性器检查",
        description:
          "以自身攻击力400%对敌方最大HP最高者造成伤害\n以自身攻击力250%对敌方最大HP第四高者造成伤害",
        requirements: "3n+1 回合，n≥0 『且』 玩家位置5 存活",
        available: true,
      },
      {
        id: "42228-act08",
        name: "抽插测验",
        description:
          "以自身攻击力350%对敌方最大HP第二高者造成伤害\n以自身攻击力200%对敌方最大HP最低者造成伤害",
        requirements: "3n+2 回合，n≥0 『且』 玩家位置5 存活",
        available: true,
      },
      {
        id: "42228-act09",
        name: "硬度检测",
        description: "以自身攻击力300%对敌方最大HP第三高者造成伤害",
        requirements: "3n 回合，n≥0 『且』 玩家位置5 存活",
        available: true,
      },
      {
        id: "42228-act10",
        name: "普攻",
        description: "玩家当前HP百分比最高者",
        requirements: "3n+2 回合，n≥0",
        available: true,
      },
      {
        id: "42228-act11",
        name: "普攻",
        description: "玩家当前HP百分比最高者",
        requirements: "玩家位置9 存活",
        available: true,
      },
      {
        id: "42228-act12",
        name: "自控力测试",
        description: "玩家最大HP最高者",
        requirements: "3n 回合，n≥0",
        available: true,
      },
      {
        id: "42228-act13",
        name: "自控力测试",
        description: "参数81",
        requirements: "3n+2 回合，n≥0",
        available: true,
      },
      {
        id: "42228-act14",
        name: "自控力测试",
        description: "参数81",
        requirements: "3n+2 回合，n≥0",
        available: true,
      },
      {
        id: "42228-act15",
        name: "自控力测试",
        description: "玩家最大HP最低者",
        requirements: "3n+2 回合，n≥0",
        available: true,
      },
    ],
  };
  gameState.enemies = [enemy1];

  gameState.characters.forEach((_, index) => {
    gameState.characters[index].buff = [
      ...gameState.characters[index].buff,
      {
        id: "42228-passive-10",
        name: "「当前HP≦99%时，发动『免疫『被治疗时回復量减少』效果』」",
        type: 0,
        condition: Condition.NONE,
        duration: 100,
        specialCondition: SpecialCondition.HP_LOWER_THAN,
        specialConditionValue: 99,
        _0: {
          affectType: AffectType.IMMUNE_DECREASE_HEAL_RECEIVED,
          value: 0,
        },
      },
    ];
  });
}

export function s21_63_action(gameState: GameState) {
  if (gameState.enemies[0].isDead) {
    return;
  }
  const startingHp = gameState.enemies[0].hp;
  console.log("startingHp", startingHp);
  console.log("gameState.last turn", gameState.stage_state.last_turn_hp);

  // [模式01]：AI42228  [行动点]：5
  if (gameState.turn === 0) {
    // [Act01]  [类型：回合技能]  [模式：一次]  [结束行动：True]  [目标：Default]  [优先级：255]
    // [触发条件：0回合时触发  『且』  回合数>0时，必杀技CD=10，仅触发1次]
    // [台词]  呵呵～让我仔细检查一下您的身体吧♡
    // [技能]：健检开始
    // 使敌方全体护盾效果减少90%(50回合)
    // gameState.characters.forEach((_, index) => {
    //   gameState.characters[index].buff = [
    //     ...gameState.characters[index].buff,
    //     {
    //       id: '42228-act01',
    //       name: '护盾效果减少90%',
    //       type: 0,
    //       condition: Condition.NONE,
    //       duration: 100,
    //       _0: {
    //         affectType: AffectType.DECREASE_SHIELD_RATE_RECEIVED,
    //         value: 0.9,
    //       },
    //     },
    //   ];
    // });

    // [Act02]  [类型：回合技能]  [模式：一次]  [结束行动：True]  [目标：Default]  [优先级：255]
    // [触发条件：0回合时触发]
    // [台词]  呵呵～让我不留馀地的检查您的身体吧♡
    // [技能]：私蜜♡健检开始
    // 使敌方全体护盾效果减少500%(50回合)
    // 清除自身「必杀技最大CD增加10回合」效果
    gameState.characters.forEach((_, index) => {
      gameState.characters[index].buff = [
        ...gameState.characters[index].buff,
        {
          id: "42228-act02",
          name: "护盾效果减少500%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.DECREASE_SHIELD_RATE_OUTPUT,
            value: 0.9,
          },
        },
      ];
    });
  }

  // [Act03]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  // [触发条件：回合内玩家防御次数≥2]
  // [台词]  不好好接受检查可不行喔～
  // [技能]：可不能逃喔～
  // 使敌方全体防禦减伤效果减少2.5%(最多20层)
  //
  const guardAmount = gameState.characters.reduce((acc, character) => {
    return acc + (character.isGuard ? 1 : 0);
  }, 0);
  if (guardAmount > 1) {
    const skill: Skill = {
      id: "42228-act02",
      name: "使敌方全体防禦减伤效果减少2.5%",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        targetSkill: "42228-act03-1",
        target: Target.ALL_ALLIES,
        applySkill: {
          id: "42228-act03-1",
          name: "防禦减伤效果减少2.5%",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "42228-act03-1",
            name: "防禦减伤效果减少2.5%",
            stack: 1,
            maxStack: 20,
            affectType: AffectType.DECREASE_GUARD_EFFECT,
            value: 0.025,
          },
        },
      },
    };
    triggerSkill(skill, gameState, Target.ENEMY_1);
  }

  // [Act04]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  // [触发条件：自身 HP损伤量<1%]
  // [台词]  不认真一点可无法确认身体的真实状况喔。
  // [技能]：再更激烈一点♡
  // 使自身造成伤害增加5%(最多10层)
  // 使自身受到伤害增加5%(最多10层)

  const hpLossLastTurnPercentage =
    Math.abs(
      (startingHp - gameState.stage_state.last_turn_hp) /
        gameState.enemies[0].maxHp,
    ) * 100;

  if (gameState.turn !== 0 && hpLossLastTurnPercentage < 1) {
    console.log("hpLossLastTurnPercentage", hpLossLastTurnPercentage);
    const buff: Skill = {
      id: "42228-act04-1",
      name: "自身HP损伤量<1%,使自身造成伤害增加5%",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        target: Target.ENEMY_1,
        targetSkill: "42228-act04-1-1",
        applySkill: {
          id: "42228-act04-1-1",
          name: "使自身造成伤害增加5%(最多10层)",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "42228-act04-1-1",
            name: "使自身造成伤害增加5%(最多10层)",
            stack: 1,
            maxStack: 10,
            value: 0.05,
            affectType: AffectType.INCREASE_DMG,
          },
        },
      },
    };
    triggerSkill(buff, gameState, Target.ENEMY_1);

    const buff2: Skill = {
      id: "42228-act04-2",
      name: "自身HP损伤量<1%,使自身造成伤害增加5%",
      type: 4,
      condition: Condition.NONE,
      duration: 100,
      _4: {
        increaseStack: 1,
        target: Target.ENEMY_1,
        targetSkill: "42228-act04-2-1",
        applySkill: {
          id: "42228-act04-2-1",
          name: "使自身造成伤害增加5%(最多10层)",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "42228-act04-2-1",
            name: "使自身造成伤害增加5%(最多10层)",
            stack: 1,
            maxStack: 10,
            value: 0.05,
            affectType: AffectType.INCREASE_DMG_RECEIVED,
          },
        },
      },
    };
    triggerSkill(buff2, gameState, Target.ENEMY_1);
  }

  // [Act05]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  // [触发条件：自身 HP损伤量>1%  『且』  玩家位置3 存活]
  // [台词]  啊～这样的健检真的是太刺激了♡
  // [技能]：让人家稍微喘口气
  // 使自身「造成伤害增加5%(最多10层)」的层数减少1层
  // 使自身「受到伤害增加5%(最多10层)」的层数减少1层
  if (gameState.turn !== 0 && hpLossLastTurnPercentage >= 1) {
    const buff: Skill = {
      id: "42228-act04-1",
      name: "自身HP损伤量>1%,『且』  玩家位置3 存活",
      type: 20,
      condition: Condition.NONE,
      duration: 100,
      _20: {
        target: Target.ENEMY,
        targetSkill: "42228-act04-1-1",
        targetChar: "42228",
        clearAll: false,
        clearStack: 1,
      },
    };
    triggerSkill(buff, gameState, Target.ENEMY_1);

    const buff2: Skill = {
      id: "42228-act04-2",
      name: "自身HP损伤量>1%,『且』  玩家位置3 存活",
      type: 20,
      condition: Condition.NONE,
      duration: 100,
      _20: {
        target: Target.ENEMY,
        targetSkill: "42228-act04-2-1",
        targetChar: "42228",
        clearAll: false,
        clearStack: 1,
      },
    };
    triggerSkill(buff2, gameState, Target.ENEMY_1);
  }

  // [Act06]  [类型：必杀  ]  [模式：循环]  [结束行动：False]  [目标：Default]  [优先级：255]
  // [触发条件：回合数>0时，必杀技CD=0]
  // [台词]  还请您使出浑身解数，跟我来一场酣畅淋漓的极限性爱吧♡
  if (gameState.turn !== 0 && gameState.enemies[0].cd === 0) {
    // 使自身获得「普攻时，根据自身《精力补充》的层数，触发『以自身攻击力50%对敌方全体造成伤害』(1回合)」
    // 使自身获得「普攻时，触发『清除自身《精力补充》的所有层数』(1回合)」
    gameState.enemies[0].buff = [
      ...gameState.enemies[0].buff,
      {
        id: "42228-act06-1",
        name: "使自身获得「普攻时，根据自身《精力补充》的层数，触发『以自身攻击力50%对敌方全体造成伤害』(1回合)」",
        type: 8,
        condition: Condition.ENEMY_BASIC_ATTACK,
        duration: 1,
        _8: {
          target: Target.ENEMY_1,
          targetSkill: "42228-passive-8-1",
          triggerSkill: {
            id: "42228-act06-1-1",
            name: "以自身攻击力50%对敌方全体造成伤害",
            type: 1,
            condition: Condition.NONE,
            duration: 100,
            _1: {
              target: Target.ALL_ALLIES,
              value: 0.5,
              damageType: DamageType.TRIGGER,
              action: CharacterAction.BASIC,
            },
          },
        },
      },
      {
        id: "42228-act06-2",
        name: "普攻时，触发『清除自身《精力补充》的所有层数』(1回合)",
        type: 20,
        condition: Condition.ENEMY_BASIC_ATTACK,
        duration: 1,
        _20: {
          target: Target.ENEMY,
          targetSkill: "42228-passive-8-1",
          targetChar: "42228",
          clearAll: true,
        },
      },
    ];

    gameState.enemies[0].cd = gameState.enemies[0].maxCd;
  }

  // [Act07]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：参数83]  [优先级：255]
  // [触发条件：3n+1 回合，n≥0  『且』  玩家位置5 存活]
  // [台词]  首先要麻烦您让性器勃起，这样我才能仔细观察您雄伟的性器。
  // [技能]：性器检查
  // 以自身攻击力400%对敌方最大HP最高者造成伤害
  // 以自身攻击力250%对敌方最大HP第四高者造成伤害
  if (
    (gameState.turn !== 0 &&
      (gameState.turn - 1) % 3 === 0 &&
      (gameState.turn - 1) % 5 !== 0) ||
    gameState.turn === 1
  ) {
    const hpSorted = maxHpSort(gameState.characters);
    dealUltDamage(
      Target.ENEMY_1,
      2.5,
      gameState,
      hpSorted[1],
      DamageType.ULTIMATE,
      CharacterAction.SKILL,
    );
    dealUltDamage(
      Target.ENEMY_1,
      4,
      gameState,
      hpSorted[4],
      DamageType.ULTIMATE,
      CharacterAction.SKILL,
    );
  }

  // [Act08]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：参数81]  [优先级：255]
  // [触发条件：3n+2 回合，n≥0  『且』  玩家位置5 存活]
  // [台词]  现在要测验抽插力度，请尽情用力抽插人家的小穴吧♡
  // [技能]：抽插测验
  // 以自身攻击力350%对敌方最大HP第二高者造成伤害
  // 以自身攻击力200%对敌方最大HP最低者造成伤害
  if ((gameState.turn - 2) % 3 === 0 && (gameState.turn - 1) % 5 !== 0) {
    const hpSorted = maxHpSort(gameState.characters);
    dealUltDamage(
      Target.ENEMY_1,
      3.5,
      gameState,
      hpSorted[3],
      DamageType.ULTIMATE,
      CharacterAction.SKILL,
    );
    dealUltDamage(
      Target.ENEMY_1,
      2,
      gameState,
      hpSorted[0],
      DamageType.ULTIMATE,
      CharacterAction.SKILL,
    );
  }

  // [Act09]  [类型：触发技能]  [模式：循环]  [结束行动：False]  [目标：参数82]  [优先级：255]
  // [触发条件：3n 回合，n≥0  『且』  玩家位置5 存活]
  // [台词]  还请您把性器勃起到极限，我会用小穴榨精的方式来检测您的性器硬度。
  // [技能]：硬度检测
  // 以自身攻击力300%对敌方最大HP第三高者造成伤害

  if (
    gameState.turn > 0 &&
    gameState.turn % 3 === 0 &&
    (gameState.turn - 1) % 5 !== 0
  ) {
    const hpSorted = maxHpSort(gameState.characters);
    dealUltDamage(
      Target.ENEMY_1,
      2.75,
      gameState,
      hpSorted[2],
      DamageType.ULTIMATE,
      CharacterAction.SKILL,
    );
  }
  // [Act10]  [类型：普攻  ]  [模式：循环]  [结束行动：False]  [目标：玩家当前HP百分比最高者]  [优先级：255]
  // [触发条件：3n+2 回合，n≥0]
  //

  if (gameState.turn !== 0) {
    if ((gameState.turn - 2) % 3 === 0) {
      const hpSorted = hpSort(gameState.characters);
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[0],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[1],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[2],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[3],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[4],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      parseCondition(Target.ENEMY_1, [Condition.ENEMY_BASIC_ATTACK], gameState);
    }

    // [Act11]  [类型：普攻  ]  [模式：循环]  [结束行动：True]  [目标：玩家当前HP百分比最高者]  [优先级：255]
    // [触发条件：玩家位置9 存活]
    else {
      const hpSorted = hpSort(gameState.characters);

      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[0],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[1],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[2],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[3],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      dealBasicDamage(
        Target.ENEMY_1,
        0.5,
        gameState,
        hpSorted[4],
        DamageType.ULTIMATE,
        CharacterAction.SKILL,
      );
      parseCondition(Target.ENEMY_1, [Condition.ENEMY_BASIC_ATTACK], gameState);

      gameState.stage_state.last_turn_hp = gameState.enemies[0].hp;
      return;
    }
  }

  // [Act12]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：玩家最大HP最高者]  [优先级：10]
  // [触发条件：3n+2 回合，n≥0]
  // [台词]  在时间到之前可不能射出来喔～
  // [技能]：自控力测试
  // 使目标获得「攻击时，触发『以自身攻击力500%对我方全体造成伤害』(1回合)」
  if ((gameState.turn - 2) % 3 === 0) {
    const randomPos = Math.floor(Math.random() * 4);
    const hpSorted = maxHpSort(gameState.characters);
    hpSorted.splice(2, 1);
    const position = hpSorted[randomPos];

    gameState.characters[position].buff = [
      ...gameState.characters[position].buff,
      {
        id: "42228-act06-1-1",
        name: "以自身攻击力500%对自身全体造成伤害",
        type: 1,
        condition: Condition.ATTACK,
        duration: 2,
        _1: {
          target: Target.ALL_ALLIES,
          value: 5,
          damageType: DamageType.TRIGGER,
          action: CharacterAction.BASIC,
        },
      },
    ];

    // randomizePos(position);
  }

  // [Act13]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：参数81]  [优先级：10]
  // [触发条件：3n+2 回合，n≥0]
  // [台词]  在时间到之前可不能射出来喔～
  // [技能]：自控力测试
  // 使目标获得「攻击时，触发『以自身攻击力500%对我方全体造成伤害』(1回合)」
  // [Act14]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：参数83]  [优先级：10]
  // [触发条件：3n+2 回合，n≥0]
  // [台词]  在时间到之前可不能射出来喔～
  // [技能]：自控力测试
  // 使目标获得「攻击时，触发『以自身攻击力500%对我方全体造成伤害』(1回合)」
  // [Act15]  [类型：触发技能]  [模式：循环]  [结束行动：True]  [目标：玩家最大HP最低者]  [优先级：10]
  // [触发条件：3n+2 回合，n≥0]
  // [台词]  在时间到之前可不能射出来喔～
  // [技能]：自控力测试
  // 使目标获得「攻击时，触发『以自身攻击力500%对我方全体造成伤害』(1回合)」
  gameState.stage_state.last_turn_hp = gameState.enemies[0].hp;
}
