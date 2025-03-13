import { GameState } from "./GameState";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "./types/Character";
import {
  AffectType,
  Condition,
  DamageType,
  SkillStackCondition,
  SpecialCondition,
  Target,
} from "./types/Skill";

export function initPassiveSkill(G: GameState, pos: number) {
  const id = G.characters[pos].id;
  const passive4 = G.characters[pos].passive4;
  const lib = G.characters[pos].lib;
  const bond = G.characters[pos].bond;
  const stars = G.characters[pos].stars;
  switch (id) {
    // "10001": "魔王 巴爾",
    // "10002": "魔王 撒旦",
    // "10003": "魔王 伊布力斯",
    // "10004": "精靈王 賽露西亞",
    // "10005": "矮人王 蘭兒",
    // "10006": "法斯公主 露露",
    // "10007": "天使長 聖米勒",
    // "10008": "魔人偶 KS-VIII",
    // "10009": "魔管家 艾可",
    // "10010": "聖騎士長 雷歐娜",
    // "10011": "神官長 菲歐菈",
    // "10012": "女忍者 凜月",
    // "10013": "劍聖 神無雪",
    // "10014": "妖狐 靜",
    // "10015": "大將軍 朱諾安",
    // "10016": "天才女軍師 布蘭妮",
    // "10017": "祭典狂歡 巴爾",
    // "10018": "古代勇者 烏魯塔",
    // "10019": "現代勇者 神田綾音",
    // "10020": "未來勇者 牧愛菈",
    // "10021": "賢者 白",
    // "10022": "狂犬 諾蕾蒂",
    // "10023": "副手 貝蕾朵",
    // "10024": "死靈女王 艾莉莎白",
    // "10025": "偶像 伊布力斯",
    // "10026": "偶像 黑白諾艾莉",
    // "10027": "復活節 撒旦",
    // "10028": "復生公主 千鶴",
    // "10029": "夏日 靜",
    // "10030": "夏日 露露",
    // "10031": "夏日 KS-Ⅷ",
    // "10032": "夏日 娜娜",
    // "10033": "食夢 阿爾蒂雅",
    // "10034": "剪裁之紅 安絲蒂",
    // "10035": "縫紉之藍 安絲娜",
    // "10036": "史萊姆女王 娜芙菈菈",
    // "10037": "蛇女之后 梅絲米奈雅",
    // "10038": "魔法少女 托特拉",
    // "10039": "千年血族 洛緹亞",
    // "10040": "小惡魔 布蘭妮",
    // "10041": "公會看板娘 小螢",
    // "10042": "夏日 伊布力斯",
    case "10042": {
      // TODO combine both skill together
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10042-passive-1",
          name: "防禦時，觸發「使我方全體水屬性隊員被治療時回復量增加50%(2回合)」",
          type: 11,
          condition: Condition.GUARD,
          conditionTurn: 4,
          duration: 100,
          _11: {
            target: Target.WATER,
            applySkill: [
              {
                id: "10042-passive-1-1",
                name: "被治療時回復量增加",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 0.5,
                  affectType: AffectType.INCREASE_HEAL_RECEIVED,
                },
              },
            ],
          },
        },
        {
          id: "10042-passive-2",
          name: "防禦時，觸發「使我方全體火屬性隊員被治療時回復量增加50%(2回合)」",
          type: 11,
          condition: Condition.GUARD,
          conditionTurn: 4,
          duration: 100,
          _11: {
            target: Target.FIRE,
            applySkill: [
              {
                id: "10042-passive-1-1",
                name: "被治療時回復量增加",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 0.5,
                  affectType: AffectType.INCREASE_HEAL_RECEIVED,
                },
              },
            ],
          },
        },
        {
          id: "10042-passive-3",
          name: "必殺時，觸發「使我方全體水屬性隊員攻擊力增加15%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            target: Target.WATER,
            targetSkill: "10042-passive-3-1",
            increaseStack: 1,
            applySkill: {
              id: "10042-passive-3-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10042-passive-3-1",
                name: "攻擊力增加",
                stack: 1,
                maxStack: 2,
                value: 0.15,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "10042-passive-4",
          name: "必殺時，觸發「使我方全體火屬性隊員攻擊力增加15%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            target: Target.FIRE,
            targetSkill: "10042-passive-4-1",
            increaseStack: 1,
            applySkill: {
              id: "10042-passive-4-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10042-passive-4-1",
                name: "攻擊力增加",
                stack: 1,
                maxStack: 2,
                value: 0.15,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "10042-passive-5",
          name: "使自身造成傷害增加25%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.25,
            affectType: AffectType.INCREASE_DMG,
          },
        },
      ];
      if (stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10042-passive-5",
            name: "每經過4回合，觸發「使目標受到水、火屬性傷害增加40%(1回合)」",
            type: 11,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 4,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "10042-passive-5-1",
                  name: "受到水屬性傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.4,
                    affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                  },
                },
                {
                  id: "10042-passive-5-2",
                  name: "受到火屬性傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.4,
                    affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
        ];
      }
      if (G.characters[pos].passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10042-passive-6",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }

      break;
    }
    // "10043": "機靈古怪 賽露西亞",
    // "10044": "占星師 亞美西思特",
    // "10045": "極樂之鬼 伊吹朱點",
    // "10046": "刺針 嘉維爾",
    // "10047": "夜星 狄",
    // "10048": "毒蠍 莫默",
    // "10049": "高等魔族 法雅",
    // "10050": "異界 凱薩",
    // "10051": "最後的銀龍 普莉希拉",
    // "10052": "暗黑聖誕 艾可",
    // "10053": "聖誕矮人王 蘭兒",
    // "10054": "聖誕馴鹿 希依",
    // "10055": "精靈舞者 塔諾西雅",
    // "10056": "墮龍 凱茜菲娜",
    // "10057": "煌星 妲絲艾菲娜",
    // "10058": "膽小紙袋狼 沃沃",
    // "10059": "音速魅影 祈",
    // "10060": "豐收聖女 菲歐菈",
    // "10061": "地方媽媽 提爾絲",
    // "10062": "異國商人 雪蘭瑚",
    // "10063": "傳說女僕 艾蜜莉",
    // "10066": "千咒魔女 安西莉卡",
    // "10067": "新春 神無雪",
    // "10068": "元氣補給 蓮",
    // "10069": "尋情慾兔 鈴蘭",
    // "10071": "詛咒凝視 絲塔夏",
    // "10072": "花嫁 巴爾",
    // "10074": "雪姬 初華",
    // "10075": "夢遊魔境 千鶴",
    // "10076": "夢遊魔境 露露",
    // "10077": "黑鷹 貝里絲",

    // "10078": "慵懶貓貓 露露",
    // "10079": "新春 凜月",
    // "10081": "花嫁 伊布力斯",
    // "10082": "花嫁 撒旦",
    // "10083": "夢天堂店長 咲野夢",
    // "10084": "貓娘Vtuber 杏仁咪嚕",
    // "10085": "花魁 香奈",
    // "10088": "雙星之紅 安絲蒂",
    case "10088": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10088-passive-1",
          name: "必殺時，觸發「使我方全體造成必殺技傷害增加25%(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10088-passive-1-1",
                name: "必殺傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.25,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            ],
          },
        },
        {
          id: "10088-passive-2",
          name: "使我方全體攻擊者獲得「必殺時，觸發『以攻擊力77%對目標造成傷害』(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ATTACKER,
            applySkill: [
              {
                id: "10088-passive-2-1",
                name: "必殺時，觸發『以攻擊力77%對目標造成傷害』(1回合)",
                type: 1,
                condition: Condition.ULTIMATE,
                duration: 1,
                _1: {
                  value: 0.77,
                  defender: Target.ENEMY,
                  damageType: DamageType.TRIGGER,
                  multiple: false,
                },
              },
            ],
          },
        },
        {
          id: "10088-passive-3",
          name: "使我方全體妨礙者獲得「必殺時，觸發『以攻擊力77%對目標造成傷害』(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.OBSTRUCTER,
            applySkill: [
              {
                id: "10088-passive-2-1",
                name: "攻擊",
                type: 1,
                condition: Condition.ULTIMATE,
                duration: 1,
                _1: {
                  value: 0.77,
                  defender: Target.ENEMY,
                  damageType: DamageType.TRIGGER,
                  multiple: false,
                },
              },
            ],
          },
        },
      ];

      if (G.characters[pos].stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10088-passive-4",
            name: "第7回合時，觸發「使我方全體造成傷害增加30%(最多1層)」",
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            conditionTurn: 7,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10088-passive-4-1",
                  name: "造成傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10088-passive-4-1",
                    name: "造成傷害增加",
                    stack: 1,
                    maxStack: 1,
                    value: 0.3,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              ],
            },
          },
        ];
      }
      if (passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10088-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }
      break;
    }
    // "10089": "銀河之藍 安絲娜",
    // "10090": "夏日 聖米勒",
    // "10091": "夏日 黑白諾艾莉",
    // "10092": "夏日 阿爾蒂雅",
    // "10093": "適格者 娜娜",
    // "10094": "未知生命體 基貝魯",
    // "10096": "鮮血魔王 洛緹亞",
    // "10097": "性誕兔女郎 艾可",
    // "10098": "聖誕雪狐 靜",
    // "10100": "惡兔魔王 兔姬",
    // "10106": "絕代佳人 賽露西亞",
    // "10107": "龍飛鳳舞 蘭兒",
    // "10108": "甜心可可 巴爾",
    // "10109": "純情可可 伊布力斯",
    // "10110": "致命可可 撒旦",
    // "10111": "背德密醫 艾琳",
    // "10113": "嬌蠻兇護 凱薩",
    // "10114": "魔法少女 朱諾安",
    // "10115": "魔法少女 布蘭妮",
    // "10116": "夏日 神田綾音",
    // "10117": "夏日 巴爾",
    // "10118": "夏日 菲歐菈",
    // "10119": "夏日 艾可",
    case "10119": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10119-passive-1",
          name: "必殺時，觸發「以自身攻擊力150%對我方全體進行治療」",
          type: 9,
          condition: Condition.ULTIMATE,
          duration: 100,
          _9: {
            value: 1.5,
            target: Target.ALL_ALLIES,
            damageType: DamageType.TRIGGER,
          },
        },
        {
          id: "10119-passive-2",
          name: "必殺時，觸發「以自身攻擊力250%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 2.5,
            defender: Target.ENEMY,
            damageType: DamageType.TRIGGER,
            multiple: false,
          },
        },
      ];
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10119-passive-3",
            name: "我方全體受到持續治療量增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.2,
              affectType: AffectType.INCREASE_HEAL_RATE_OVER_TIME,
            },
          },
        ];
      });

      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10119-passive-4",
          name: "使自身攻擊力增加50%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.5,
            affectType: AffectType.INCREASE_ATK,
          },
        },
      ];
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10119-passive-5",
          name: "造成觸發技效果增加75%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.75,
            affectType: AffectType.INCREASE_TRIGGER_EFFECT,
          },
        },
        {
          id: "10119-passive-6",
          name: "必殺時，觸發「以自身最大HP15%給予我方全體護盾(1回合)」",
          type: 10,
          condition: Condition.ULTIMATE,
          duration: 100,
          _10: {
            target: Target.ALL_ALLIES,
            value: 0.15,
            damageType: DamageType.TRIGGER,
            duration: 1,
          },
        },
      ];

      if (passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10119-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }
      break;
    }
    // "10120": "乘風破浪 蘭兒",
    // "10121": "碧波白喵 娜娜",
    // "10122": "性感天使 兔姬",
    // "10123": "惡魔貓娘 杏仁咪嚕",
    // "10124": "沁夏淡粉 香草奈若",
    // "10125": "南瓜魔女 神田綾音",
    // "10126": "調皮搗蛋 白",
    case "10126": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10126-passive-1",
          name: "當前HP≤99%時，發動「自身受到傷害減少10%」",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          specialCondition: SpecialCondition.HP_LOWER_THAN,
          specialConditionValue: 99,
          _0: {
            value: 0.1,
            affectType: AffectType.DECREASE_DMG_RECEIVED,
          },
        },
        {
          id: "10126-passive-2",
          name: "每經過1回合時，觸發「給予自身『連環陷阱(最多9層)』」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10126-passive-2-1",
            target: Target.SELF,
            applySkill: {
              id: "10126-passive-2-1",
              name: "『連環陷阱』",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10126-passive-2-1",
                name: "連環陷阱",
                stack: 1,
                maxStack: 9,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
          },
        },
        {
          id: "10126-passive-3",
          name: "必殺時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            base: false,
            duration: 1,
            value: 0.3,
            target: Target.ALL_ALLIES,
          },
        },
        {
          id: "10126-passive-6",
          name: "當自身「連環陷阱」層數>3層時，開啟「受到護盾效果增加20%」",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
          specialConditionSkill: "10126-passive-2-1",
          specialConditionValue: 2,
          _0: {
            value: 0.2,
            affectType: AffectType.INCREASE_SHIELD_RATE_RECEIVED,
          },
        },
        {
          id: "10126-passive-6",
          name: "當自身「連環陷阱」層數>6層時，開啟「攻擊力增加20%」",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
          specialConditionSkill: "10126-passive-2-1",
          specialConditionValue: 6,
          _0: {
            value: 0.2,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: "10126-passive-7",
          name: "當自身「連環陷阱」層數>9層時，開啟「攻擊力增加20%」",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
          specialConditionSkill: "10126-passive-2-1",
          specialConditionValue: 8,
          _0: {
            value: 0.2,
            affectType: AffectType.INCREASE_ATK,
          },
        },
      ];

      if (G.characters[pos].stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10126-passive-8",
            name: "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火屬性傷害增加3%(1回合)』」",
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              target: Target.SELF,
              targetSkill: "10126-passive-2-1",
              triggerSkill: {
                id: "10126-passive-8-1",
                name: "受到火屬性傷害增加3%",
                type: 11,
                condition: Condition.NONE,
                duration: 1,
                _11: {
                  target: Target.ENEMY,
                  applySkill: [
                    {
                      id: "10126-passive-8-1-1",
                      name: "受到火屬性傷害增加3%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 0.03,
                        affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                      },
                    },
                  ],
                },
              },
            },
          },
          {
            id: "10126-passive-9",
            name: "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到水屬性傷害增加3%(1回合)』」",
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              target: Target.SELF,
              targetSkill: "10126-passive-2-1",
              triggerSkill: {
                id: "10126-passive-9-1",
                name: "受到水屬性傷害增加3%",
                type: 11,
                condition: Condition.NONE,
                duration: 1,
                _11: {
                  target: Target.ENEMY,
                  applySkill: [
                    {
                      id: "10126-passive-9-1-1",
                      name: "受到水屬性傷害增加3%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 0.03,
                        affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                      },
                    },
                  ],
                },
              },
            },
          },
        ];
      }
      if (G.characters[pos].passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10126-9",
            name: "使自身受到傷害減少5%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.05,
              affectType: AffectType.DECREASE_DMG_RECEIVED,
            },
          },
        ];
      }
      break;
    }
    // "10127": "雪夜幻夢 阿爾蒂雅",
    // "10128": "性誕戀歌 伊布力斯",
    case "10128": {
      G.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10128-passive-1",
              name: "使我方全體攻擊者普攻增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.3,
                affectType: AffectType.INCREASE_BASIC_DMG,
              },
            },
          ];
        }
      });
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10128-passive-2",
          name: "自身普攻傷害增加60%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.6,
            affectType: AffectType.INCREASE_BASIC_DMG,
          },
        },
      ];

      G.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10128-passive-3",
              name: "使我方全體攻擊者攻擊力增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.3,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          ];
        }
      });

      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10128-passive-4",
          name: "使自身攻擊力增加50%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.5,
            affectType: AffectType.INCREASE_ATK,
          },
        },
      ];

      if (G.characters[pos].stars === 5) {
        G.characters.forEach((character, index) => {
          if (character.class === CharacterClass.ATTACKER) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10128-passive-5",
                name: "使我方全體攻擊者造成傷害增加15%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.15,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            ];
          }
        });

        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10128-passive-6",
            name: "造成傷害增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.2,
              affectType: AffectType.INCREASE_DMG,
            },
          },
        ];
      }
      if (passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10128-passive-5",
            name: "使自身造成傷害加7.5%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.075,
              affectType: AffectType.INCREASE_DMG,
            },
          },
        ];
      }
      break;
    }
    // "10129": "性誕馴鹿 希依",
    // "10130": "聖夜喧嘩 莎琳娜",
    // "10131": "時御者 伊娜絲",
    // "10132": "幽夜女爵 卡蒂雅",
    // "10133": "甜心偶像 星空奈奈美",
    // "10134": "閃耀歌姬 黑白諾艾莉",
    case "10134": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10134-passive-1",
          name: "攻擊力增加35%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.35,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: "10134-passive-2",
          name: "必殺時，觸發「以自身攻擊力15使自身以外我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            base: false,
            duration: 1,
            value: 0.15,
            target: Target.ALL_EXCEPT_SELF,
          },
        },
        {
          id: "10134-passive-3",
          name: "普攻時，觸發「以自身攻擊力40%每回合對我方全體進行治療(1回合)」",
          type: 9,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _9: {
            value: 0.8,
            target: Target.ALL_ALLIES,
            damageType: DamageType.TRIGGER,
          },
        },
        {
          id: "10134-passive-4",
          name: "必殺時，觸發「以自身攻擊力80%每回合對我方全體進行治療(1回合)」",
          type: 9,
          condition: Condition.ULTIMATE,
          duration: 100,
          _9: {
            value: 0.8,
            target: Target.ALL_ALLIES,
            damageType: DamageType.TRIGGER,
          },
        },
      ];
      if (G.characters[pos].stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10134-passive-5",
            name: "必殺時，觸發「以自身攻擊力15使自身以外我方全體攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.ULTIMATE,
            duration: 100,
            _6: {
              base: false,
              duration: 1,
              value: 0.15,
              target: Target.ALL_EXCEPT_SELF,
            },
          },
          {
            id: "10134-passive-6",
            name: "防禦時，觸發「以自身攻擊力120每回合對我方全體進行治療(1回合)」",
            type: 9,
            condition: Condition.GUARD,
            duration: 100,
            _9: {
              value: 1.2,
              target: Target.ALL_ALLIES,
              damageType: DamageType.TRIGGER,
            },
          },
        ];
      }
      if (G.characters[pos].passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10134-passive4",
            name: "使自身造成治療量提升15%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.15,
              affectType: AffectType.INCREASE_HEAL_RATE,
            },
          },
        ];
      }
      break;
    }
    // "10135": "偶像經紀人 梅絲米奈雅",
    // "10136": "賞金獵人 安潔娜爾",
    // "10137": "春情白兔 鈴蘭",
    // "10138": "迷情薄紗 露露",
    // "10139": "不健全遐想 托特拉",
    // "10140": "真神化身 菈萊亞 菈萊亞",
    // "10141": "調查員 娜娜",
    // "10142": "夏日 千鶴",
    // "10143": "夏日 賽露西亞",
    // "10144": "夏日 凱薩",
    case "10144": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10144-passive-1",
          name: "攻擊力增加50%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.5,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: "10144-passive-2",
          name: "必殺技傷害增加30%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.3,
            affectType: AffectType.INCREASE_ULTIMATE_DMG,
          },
        },
        {
          id: "10144-passive-3",
          name: "每經過1回合時，觸發「使自身攻擊力增加5%(最多20層)」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10144-passive-3-1",
            target: Target.SELF,
            applySkill: {
              id: "10144-passive-3-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10144-passive-3-1",
                name: "攻擊力增加5%",
                value: 0.05,
                stack: 1,
                maxStack: 20,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "10144-passive-4",
          name: "普攻時，觸發「使敵方全體受到『夏日 凱薩』傷害增加4%(最多15層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10144-passive-4-1",
            target: Target.ENEMY,
            applySkill: {
              id: "10144-passive-4-1",
              name: "受到傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10144-passive-4-1",
                name: "受到X角色的傷害增加4%",
                value: 0.04,
                stack: 1,
                maxStack: 15,
                specificCharId: "10144",
                affectType: AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED,
              },
            },
          },
        },
        {
          id: "10144-passive-5",
          name: "必殺時，觸發「使自身造成傷害增加20%(最多4層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10144-passive-5-1",
            target: Target.SELF,
            applySkill: {
              id: "10144-passive-5-1",
              name: "造成傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10144-passive-5-1",
                name: "造成傷害增加20%",
                value: 0.2,
                stack: 1,
                maxStack: 4,
                affectType: AffectType.INCREASE_DMG,
              },
            },
          },
        },
      ];

      if (G.characters[pos].stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10144-passive-6",
            name: "必殺時，追加「以自身攻擊力150%對目標造成傷害」",
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 100,
            _101: {
              value: 1.5,
              defender: Target.ENEMY,
              damageType: DamageType.ULTIMATE_ADDON,
              multiple: false,
            },
          },
          {
            id: "10144-passive-7",
            name: "每經過1回合時，觸發「以自身攻擊力5%使我方全體攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _6: {
              base: false,
              duration: 1,
              value: 0.05,
              target: Target.ALL_ALLIES,
            },
          },
        ];
      }

      if (G.characters[pos].passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10144-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }
      break;
    }
    // "10145": "夏日 撒旦",
    // "10146": "魔獸獵手 神無雪",
    case "10146": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10146-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加40%(最多2層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10146-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "10146-passive-1-1",
              name: "攻擊力增加40%",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10146-passive-1-1",
                name: "攻擊力增加",
                stack: 1,
                maxStack: 2,
                value: 0.4,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "10146-passive-2",
          name: "必殺時，觸發「清除自身《屏氣凝神》的攻擊力增加效果」",
          type: 7,
          condition: Condition.ULTIMATE,
          duration: 100,
          _7: {
            target: Target.SELF,
            clearSkill: ["10146-passive-1-1"],
          },
        },
        {
          id: "10146-passive-3",
          name: "造成傷害增加15%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.15,
            affectType: AffectType.INCREASE_DMG,
          },
        },
      ];
      G.characters.forEach((character, index) => {
        if (
          index !== pos &&
          (character.class === CharacterClass.ATTACKER ||
            character.class === CharacterClass.OBSTRUCTER)
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10146-passive-4",
              name: "第一回合時，觸發「使自身造成傷害增加15%(50回合)」",
              type: 11,
              condition: Condition.ON_TURN_START,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10146-passive-4-1",
                    name: "造成傷害增加15%",
                    type: 0,
                    duration: 50,
                    condition: Condition.NONE,
                    _0: {
                      value: 0.15,
                      affectType: AffectType.INCREASE_DMG,
                    },
                  },
                ],
              },
            },
            {
              id: "10146-passive-5",
              name: "第一回合時，觸發「使『魔獸獵手 神無雪』造成傷害增加15%(50回合)」",
              type: 13,
              condition: Condition.ON_TURN_START,
              duration: 100,
              _13: {
                target: "10146",
                applySkill: [
                  {
                    id: "10146-passive-5-1",
                    name: "造成傷害增加15%",
                    type: 0,
                    duration: 50,
                    condition: Condition.NONE,
                    _0: {
                      value: 0.15,
                      affectType: AffectType.INCREASE_DMG,
                    },
                  },
                ],
              },
            },
          ];
        }
      });
      if (G.characters[pos].stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10146-passive-6",
            name: "每經過一回合時，觸發「使自身獲得『摒除雜念(最多8層)』」",
            type: 4,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _4: {
              target: Target.SELF,
              increaseStack: 1,
              targetSkill: "10146-passive-6-1",
              applySkill: {
                id: "10146-passive-6-1",
                name: "摒除雜念",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10146-passive-6-1",
                  name: "摒除雜念",
                  stack: 1,
                  maxStack: 8,
                  affectType: AffectType.NONE,
                  value: 0,
                },
              },
            },
          },
          {
            id: "10146-passive-7",
            name: "必殺時，追加『以自身攻擊力220%對目標造成傷害",
            type: 101,
            condition: Condition.ULTIMATE,
            specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
            specialConditionSkill: "10146-passive-6-1",
            specialConditionValue: 7,
            duration: 100,
            _101: {
              value: 2.2,
              defender: Target.ENEMY,
              damageType: DamageType.ULTIMATE,
              multiple: false,
            },
          },
        ];
      }

      if (G.characters[pos].passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10146-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }
      break;
    }
    // "10147": "魔物終結 鬼醉木",
    // "10148": "酩酊狂歡 靜",
    // "10149": "千年靈狐 椿",
    case "10149": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10149-passive-1",
          name: "每經過4回合，觸發「以自身攻擊力60%使自身攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _6: {
            value: 0.6,
            target: Target.SELF,
            duration: 1,
            base: false,
          },
        },
      ];

      //必殺時，觸發「以自身攻擊力75%對自身進行治療」

      if (stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10149-passive-3",
            name: "必殺時，觸發「使目標受到傷害增加30%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10149-passive-3-1",
              target: Target.ENEMY,
              applySkill: {
                id: "10149-passive-3-1",
                name: "受到傷害增加30%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10149-passive-3-1",
                  name: "受到傷害增加30%",
                  value: 0.3,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10149-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }
      break;
    }
    // "10150": "勇者兔女郎 神田綾音",
    // "10151": "性感兔女郎 伊布力斯",
    // "10152": "治癒之星 蘇珊",
    case "10152": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10152-passive-1",
          name: "必殺時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            value: 0.3,
            target: Target.ALL_ALLIES,
            duration: 1,
            base: false,
          },
        },
      ];
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10152-passive-2",
            name: "防禦時，觸發「使自身受到傷害減少10%(1回合)」",
            type: 11,
            condition: Condition.GUARD,
            duration: 100,
            _11: {
              target: Target.SELF,
              applySkill: [
                {
                  id: "10152-passive-2-1",
                  name: "受到傷害減少",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.1,
                    affectType: AffectType.DECREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
          {
            id: "10152-passive-3",
            name: "防禦時，觸發「使我方『治癒之星 蘇珊』造成治療增加10%(2回合)」",
            type: 13,
            condition: Condition.GUARD,
            duration: 100,
            _13: {
              target: "10152",
              applySkill: [
                {
                  id: "10152-passive-3-1",
                  name: "造成治療增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 2,
                  _0: {
                    value: 0.1,
                    affectType: AffectType.INCREASE_HEAL_RATE,
                  },
                },
              ],
            },
          },
        ];
      });

      if (G.characters[pos].stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10152-passive-5",
            name: "每經過一回合時，觸發「使自身被攻擊時，觸發『以自身最大HP10%對我方全體造成治療』(1回合)(此效果最多作用一次)」",
            duration: 100,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            type: 11,
            _11: {
              target: Target.SELF,
              applySkill: [
                {
                  id: "10152-passive-5-1",
                  name: "被攻擊時，觸發『以自身最大HP10%對我方全體造成治療』(1回合)(此效果最多作用一次)",
                  condition: Condition.RECEIVED_ATTACK,
                  type: 5,
                  duration: 1,
                  deleteSelf: true,
                  _5: {
                    target: Target.ALL_ALLIES,
                    value: 0.1,
                    damageType: DamageType.TRIGGER_HP,
                  },
                },
              ],
            },
          },
        ];
        G.characters.forEach((character, index) => {
          if (
            character.attribute === CharacterAttribute.DARK ||
            character.attribute === CharacterAttribute.LIGHT
          ) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10152-passive-5",
                name: "攻擊力增加40%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.4,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ];
          }
        });
      }
      if (G.characters[pos].passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10152-passive4",
            name: "使自身造成治療增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_HEAL_RATE,
            },
          },
        ];
      }

      break;
    }
    // "10153": "純真殺意 撒旦",
    // "10154": "星空奈奈美",
    // "10155": "甜蜜女僕",
    case "10155": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10155-passive-1",
          name: "普攻時，觸發「以自身攻擊力100%對目標造成傷害",
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _1: {
            value: 1,
            defender: Target.ENEMY,
            damageType: DamageType.TRIGGER,
            multiple: false,
          },
        },
      ];

      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10155-passive-2",
            name: "攻擊力增加",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.3,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      });

      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10155-passive-3",
          name: "必殺時，觸發「以自身攻擊力300%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 3,
            defender: Target.ENEMY,
            damageType: DamageType.TRIGGER,
            multiple: false,
          },
        },
      ];

      if (G.characters[pos].stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10155-passive-4",
            name: "造成傷害增加",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.3,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "10155-passive-5",
            name: "防禦時，觸發「以自身攻擊力50%對目標造成傷害」",
            type: 1,
            condition: Condition.GUARD,
            duration: 100,
            _1: {
              value: 0.5,
              defender: Target.ENEMY,
              damageType: DamageType.TRIGGER,
              multiple: false,
            },
          },
          {
            id: "10155-passive-6",
            name: "第7回合時，觸發「使自身必殺技傷害增加100%(最多1層)」",
            type: 4,
            condition: Condition.ON_SPECIFIC_TURN,
            conditionTurn: 7,
            duration: 100,
            _4: {
              increaseStack: 1,
              target: Target.SELF,
              targetSkill: "10004-passive-3-1",
              applySkill: {
                id: "10155-passive-6",
                name: "必殺技傷害增加100%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10155-passive-6",
                  name: "必殺技傷害增加100%",
                  stack: 1,
                  maxStack: 1,
                  value: 1,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            },
          },
        ];
      }

      if (passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10155-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }
      break;
    }
    // "10156": "性誕魔王 巴爾"
    // "10157": "純真祈願 牧愛菈"
    // "10158": "聖夜奇謀 布蘭妮"
    // "10159": "喜迎性春 菲歐菈",
    // "10161": "舞焰赤龍 薩夏",
    // "10162": "虔信神祀 艾可",
    // "10163": "夜之影 凱薩",
    case "10163": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10163-passive-1",
          name: "防禦時，觸發「使自身必殺技傷害增加20%(最多5層)」",
          type: 4,
          condition: Condition.GUARD,
          duration: 100,
          _4: {
            increaseStack: 1,
            target: Target.SELF,
            targetSkill: "10163-passive-1-1",
            applySkill: {
              id: "10163-passive-1-1",
              name: "必殺技傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10163-passive-1-1",
                name: "必殺技傷害增加",
                stack: 1,
                maxStack: 5,
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
                value: 0.2,
              },
            },
          },
        },
        {
          id: "10163-passive-2",
          name: "防禦時，觸發「使自身獲得《魔分身》(最多2層)」",
          type: 4,
          condition: Condition.GUARD,
          duration: 100,
          _4: {
            increaseStack: 1,
            target: Target.SELF,
            targetSkill: "10163-passive-2-1",
            applySkill: {
              id: "10163-passive-2-1",
              name: "魔分身",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10163-passive-2-1",
                name: "魔分身",
                stack: 1,
                maxStack: 2,
                affectType: AffectType.NONE,
                value: 0,
              },
            },
          },
        },
        {
          id: "10163-passive-3",
          name: "必殺時，根據自身《魔分身》層數觸發「以自身攻擊力90%對目標造成傷害」幾次",
          type: 8,
          condition: Condition.ULTIMATE,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10163-passive-2-1",
            triggerSkill: {
              id: "10163-passive-3-1",
              name: "根據自身《魔分身》層數觸發「以自身攻擊力90%對目標造成傷害」",
              type: 1,
              condition: Condition.NONE,
              duration: 100,
              _1: {
                value: 0.9,
                defender: Target.ENEMY,
                damageType: DamageType.TRIGGER,
                multiple: false,
              },
            },
          },
        },
        {
          id: "10163-passive-4",
          name: "必殺時，觸發「清除自身所有《魔分身》」",
          type: 7,
          condition: Condition.ULTIMATE,
          duration: 100,
          _7: {
            target: Target.SELF,
            clearSkill: ["10163-passive-2-1"],
          },
        },
      ];
      G.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10163-passive-5",
              name: "第一回合時，觸發「使我方『夜之影 凱薩』攻擊力增加50%(最多3層)」",
              type: 4,
              condition: Condition.ON_TURN_START,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.SPECIFIC_CHARACTER,
                applyToSpecificChar: "10163",
                targetSkill: "10163-passive-5-1",
                applySkill: {
                  id: "10163-passive-5-1",
                  name: "攻擊力",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10163-passive-5-1",
                    name: "攻擊力",
                    stack: 1,
                    maxStack: 3,
                    affectType: AffectType.INCREASE_ATK,
                    value: 0.5,
                  },
                },
              },
            },
          ];
        }
      });

      if (G.characters[pos].stars === 5) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10163-passive-6",
              name: "我方全體防禦時，觸發「使目標受到傷害增加12%(2回合)」",
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: "10163-passive-6-1",
                    name: "受到傷害增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.12,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                    },
                  },
                ],
              },
            },
          ];
        });
      }

      if (passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10163-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }

      break;
    }
    // "10164": "祭典花韻 香奈"
    // "10165": "銀鴞武裝 米婭",
    // "10166": "白熊武裝 冬。艾妮",
    case "10166": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10166-passive-1",
          name: "必殺時，觸發「使我方全體造成傷害增加20%(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10166-passive-1-1",
                name: "造成傷害",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.2,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            ],
          },
        },
        {
          id: "10166-passive-2",
          name: "普攻時，觸發「使我方全體攻擊力增加20%(2回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10166-passive-2-1",
                name: "攻擊力增加",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 0.2,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ],
          },
        },
        {
          id: "10166-passive-3",
          name: "防禦時，觸發「使我方全體攻擊力增加10%(2回合)」",
          type: 11,
          condition: Condition.GUARD,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10166-passive-3-1",
                name: "攻擊力增加",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 0.1,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ],
          },
        },
        {
          id: "10166-passive-4",
          name: "必殺時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            value: 0.3,
            target: Target.ALL_ALLIES,
            duration: 1,
            base: false,
          },
        },
      ];

      if (stars === 5) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10166-passive-5",
            name: "每Wave的第1回合時，觸發「使敵方全體受到必殺技傷害增加30%(最多1層)」",
            type: 4,
            condition: Condition.ON_WAVE_FIRST_TURN,
            duration: 100,
            _4: {
              increaseStack: 1,
              target: Target.ALL_ENEMIES,
              targetSkill: "10166-passive-5-1",
              applySkill: {
                id: "10166-passive-5-1",
                name: "受到必殺技傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10166-passive-5-1",
                  name: "受到必殺技傷害增加",
                  stack: 1,
                  maxStack: 1,
                  value: 0.3,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (passive4) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10166-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      }
      break;
    }
    // "10175": "翩舞雪花 初華"
    // "10801": "雙蛇軍團護士長 艾琳",
    // "10802": "貓妖 娜娜",
    // "10803": "龍女 伊維絲",
    // "10804": "犬人族 朵拉",
    // "10805": "魅魔 撒芭絲",
    // "10806": "美人魚 瑪蓮",
    // "10807": "流浪魔法師 尤依",
    // "10808": "黑暗精靈 索拉卡",
    // "10809": "怪盜 米雅",
    // "10810": "人馬女僕 蘇菲",
    // "10811": "冷豔美醫 嘉莉娜",
    // "10812": "南瓜仙子 帕奈奈",
    // "10813": "白薔薇 伊艾",
    // "10901": "法斯帝國士兵 賽蓮",
    // "10902": "法斯帝國法師 佩托拉",
    // "10903": "魔族戰士 芙蕾",
    // "10904": "魔族法師 瑪努艾拉",
    // "10905": "烈日國武士 桔梗",
    // "10906": "烈日國巫女 楓",
    // "10907": "精靈射手 奧菈",
    // "10908": "矮人戰士 可兒",
    // "10909": "雙蛇軍團士兵 夏琳",
    // "10910": "聖光騎士 瑪蒂娜",
    // "10911": "主神教團僧兵 克蕾雅",
    // "10912": "史萊姆娘 蘿爾",
    // "10913": "牛女 米諾",
    // "10914": "蛇女 拉米亞",
    // "10915": "鳥身女妖 哈比",
    // "10916": "法斯精銳近衛 安娜",
    // "10917": "法斯精銳騎士 布蘭",
    // "10918": "法斯高階法師 諾諾可",
    // "10919": "懲戒天使",
    // "10920": "福音天使",
    // "10921": "獵犬小隊 茉莉",
    // "10922": "試作機三號",
    // "10923": "人馬 賽希",
    // "10924": "木乃伊 穆穆",
    // "10933": "獵犬小隊 安雅"
    default: {
      break;
    }
  }
}
