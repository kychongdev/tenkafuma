import { GameState } from "./GameState";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "./types/Character";
import { AffectType, Condition, DamageType, Target } from "./types/Skill";

export function initLeadSkill(G: GameState) {
  const id = G.characters[0].id;
  const passive4 = G.characters[0].passive4;
  const lib = G.characters[0].lib;
  const bond = G.characters[0].bond;
  const stars = G.characters[0].stars;
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
    case "10081": {
      if (lib < 3) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10081-Lead-1",
            name: "普攻時，觸發「以自身攻擊力50%對敵方全體造成傷害」",
            type: 1,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _1: {
              value: 0.5,
              defender: Target.ALL_ENEMIES,
              damageType: DamageType.TRIGGER,
              multiple: false,
            },
          },
        ];
        G.characters.forEach((character, index) => {
          if (
            character.attribute === CharacterAttribute.WATER ||
            character.attribute === CharacterAttribute.LIGHT
          ) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10081-Lead-2",
                name: "第一回合時，觸發「《高貴婚紗》」",
                type: 11,
                condition: Condition.ON_TURN_START,
                duration: 100,
                _11: {
                  target: Target.SELF,
                  applySkill: [
                    {
                      id: "10081-Lead-2-1",
                      name: "攻擊力增加70%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 50,
                      _0: {
                        value: 0.7,
                        affectType: AffectType.INCREASE_ATK,
                      },
                    },
                    {
                      id: "10081-Lead-2-2",
                      name: "必殺時，觸發「使目標受到觸發技傷害增加20%(最多5層)」",
                      type: 4,
                      condition: Condition.ULTIMATE,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-2-2-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-2-2-1",
                          name: "受到觸發技傷害增加20%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-2-2-1",
                            name: "受到觸發技傷害增加20%",
                            stack: 1,
                            maxStack: 5,
                            affectType:
                              AffectType.INCREASE_TRIGGER_DMG_RECEIVED,
                            value: 0.2,
                          },
                        },
                      },
                    },
                    {
                      id: "10081-Lead-2-3",
                      name: "普攻時，觸發「使目標受到必殺傷害增加2%(最多25層)」(50回合)",
                      type: 4,
                      condition: Condition.BASIC_ATTACK,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-2-3-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-2-3-1",
                          name: "受到必殺傷害增加2%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-2-3-1",
                            name: "受到必殺傷害增加2%",
                            stack: 1,
                            maxStack: 25,
                            affectType:
                              AffectType.INCREASE_ULTIMATE_DMG_RECEIVED,
                            value: 0.02,
                          },
                        },
                      },
                    },
                    {
                      id: "10081-Lead-2-4",
                      name: "普攻時，觸發「使目標受到水屬性傷害增加5%(最多4層)」(50回合)",
                      type: 4,
                      condition: Condition.BASIC_ATTACK,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-2-4-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-2-4-1",
                          name: "受到水屬性傷害增加5%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-2-4-1",
                            name: "受到水屬性傷害增加5%",
                            stack: 1,
                            maxStack: 4,
                            affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                            value: 0.05,
                          },
                        },
                      },
                    },
                    {
                      id: "10081-Lead-2-5",
                      name: "普攻時，觸發「使目標受到光屬性傷害增加5%(最多4層)」(50回合)",
                      type: 4,
                      condition: Condition.BASIC_ATTACK,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-2-5-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-2-5-1",
                          name: "受到光屬性傷害增加5%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-2-5-1",
                            name: "受到光屬性傷害增加5%",
                            stack: 1,
                            maxStack: 4,
                            affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                            value: 0.05,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ];
          }
        });
      } else {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10081-Lead-1",
              name: "最大HP增加40%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.MAX_HP,
                value: 0.4,
              },
            },
          ];
        });

        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10081-Lead-2",
            name: "普攻時，觸發「以自身攻擊力50%對敵方全體造成傷害」",
            type: 1,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _1: {
              value: 0.5,
              defender: Target.ALL_ENEMIES,
              damageType: DamageType.TRIGGER,
              multiple: false,
            },
          },
        ];

        G.characters.forEach((character, index) => {
          if (
            character.attribute === CharacterAttribute.WATER ||
            character.attribute === CharacterAttribute.LIGHT
          ) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10081-Lead-3",
                name: "第一回合時，觸發「《高貴婚紗》」",
                type: 11,
                condition: Condition.ON_TURN_START,
                duration: 100,
                _11: {
                  target: Target.SELF,
                  applySkill: [
                    {
                      id: "10081-Lead-3-1",
                      name: "攻擊力增加100%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 50,
                      _0: {
                        value: 1,
                        affectType: AffectType.INCREASE_ATK,
                      },
                    },
                    {
                      id: "10081-Lead-3-2",
                      name: "必殺時，觸發「使目標受到觸發技傷害增加20%(最多5層)」",
                      type: 4,
                      condition: Condition.ULTIMATE,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-2-3-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-2-3-1",
                          name: "受到觸發技傷害增加20%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-2-3-1",
                            name: "受到觸發技傷害增加20%",
                            stack: 1,
                            maxStack: 5,
                            affectType:
                              AffectType.INCREASE_TRIGGER_DMG_RECEIVED,
                            value: 0.2,
                          },
                        },
                      },
                    },
                    {
                      id: "10081-Lead-3-3",
                      name: "攻擊時，觸發「使目標受到必殺傷害增加2%(最多60層)」(50回合)",
                      type: 4,
                      condition: Condition.ATTACK,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-3-3-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-3-3-1",
                          name: "受到必殺傷害增加2%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-3-3-1",
                            name: "受到必殺傷害增加2%",
                            stack: 1,
                            maxStack: 60,
                            affectType:
                              AffectType.INCREASE_ULTIMATE_DMG_RECEIVED,
                            value: 0.02,
                          },
                        },
                      },
                    },
                    {
                      id: "10081-Lead-3-4",
                      name: "攻擊時，觸發「使目標受到傷害增加1%(最多60層)」",
                      type: 4,
                      condition: Condition.ATTACK,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-3-4-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-3-4-1",
                          name: "受到傷害增加1%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-3-4-1",
                            name: "受到傷害增加1%",
                            stack: 1,
                            maxStack: 60,
                            affectType: AffectType.INCREASE_DMG_RECEIVED,
                            value: 0.01,
                          },
                        },
                      },
                    },
                    {
                      id: "10081-Lead-3-5",
                      name: "普攻時，觸發「使目標受到水屬性傷害增加5%(最多7層)」(50回合)",
                      type: 4,
                      condition: Condition.BASIC_ATTACK,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-3-5-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-3-5-1",
                          name: "受到水屬性傷害增加5%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-3-5-1",
                            name: "受到水屬性傷害增加5%",
                            stack: 1,
                            maxStack: 7,
                            affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                            value: 0.05,
                          },
                        },
                      },
                    },
                    {
                      id: "10081-Lead-3-6",
                      name: "普攻時，觸發「使目標受到光屬性傷害增加5%(最多7層)」(50回合)",
                      type: 4,
                      condition: Condition.BASIC_ATTACK,
                      duration: 50,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10081-Lead-3-6-1",
                        target: Target.ENEMY,
                        applySkill: {
                          id: "10081-Lead-3-6-1",
                          name: "受到光屬性傷害增加5%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10081-Lead-3-6-1",
                            name: "受到光屬性傷害增加5%",
                            stack: 1,
                            maxStack: 7,
                            affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                            value: 0.05,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ];
          }
        });
      }
      break;
    }
    // "10082": "花嫁 撒旦",
    // "10083": "夢天堂店長 咲野夢",
    // "10084": "貓娘Vtuber 杏仁咪嚕",
    // "10085": "花魁 香奈",
    // "10088": "雙星之紅 安絲蒂",
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
    // "10120": "乘風破浪 蘭兒",
    // "10121": "碧波白喵 娜娜",
    // "10122": "性感天使 兔姬",
    // "10123": "惡魔貓娘 杏仁咪嚕",
    // "10124": "沁夏淡粉 香草奈若",
    // "10125": "南瓜魔女 神田綾音",
    // "10126": "調皮搗蛋 白",
    // "10127": "雪夜幻夢 阿爾蒂雅",
    // "10128": "性誕戀歌 伊布力斯",
    // "10129": "性誕馴鹿 希依",
    // "10130": "聖夜喧嘩 莎琳娜",
    // "10131": "時御者 伊娜絲",
    // "10132": "幽夜女爵 卡蒂雅",
    // "10133": "甜心偶像 星空奈奈美",
    // "10134": "閃耀歌姬 黑白諾艾莉",
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
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10144-lead-1",
            name: "最大HP增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.2,
            },
          },
          {
            id: "10144-lead-2",
            name: "攻擊力增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.5,
            },
          },
        ];
      });
      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10144-lead-3",
          name: "最大HP增加20%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.MAX_HP,
            value: 0.2,
          },
        },
        {
          id: "10144-passive-3-1",
          name: "攻擊力增加",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "10144-passive-3-1",
            name: "攻擊力增加5%",
            value: 0.05,
            stack: 20,
            maxStack: 20,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: "10144-passive-5-1",
          name: "造成傷害增加",
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: "10144-passive-5-1",
            name: "造成傷害增加20%",
            value: 0.2,
            stack: 4,
            maxStack: 4,
            affectType: AffectType.INCREASE_DMG,
          },
        },
        {
          id: "10144-lead-11",
          name: "每Wave的第1回合時，觸發『使自身《婚紗兵裝。能量汲取》的疊層效果達到滿層』",
          type: 11,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _11: {
            target: Target.ALL_ENEMIES,
            applySkill: [
              {
                id: "10144-passive-4-1",
                name: "受到夏日凱撒的傷害增加60%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10144-passive-4-1",
                  name: "受到夏日凱撒的傷害增加60%",
                  value: 0.04,
                  stack: 15,
                  maxStack: 15,
                  specificCharId: "10144",
                  affectType:
                    AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED,
                },
              },
            ],
          },
        },
      ];

      G.characters.forEach((_, index) => {
        if (index !== 0) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10144-lead-4",
              name: "防禦時，觸發「使目標受到傷害增加9%（2回合）」",
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: "10144-lead-4-1",
                    name: "受到傷害增加9%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.09,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                    },
                  },
                ],
              },
            },
            {
              id: "10144-lead-5",
              name: "防禦時，觸發『以自身基礎攻擊力75%使我方站位位攻擊力增加』(1回合)",
              type: 6,
              condition: Condition.GUARD,
              duration: 100,
              _6: {
                value: 0.75,
                target: Target.POSITION_1,
                base: true,
                duration: 1,
              },
            },
            {
              id: "10144-lead-6",
              name: "必殺時，觸發「使目標受到傷害增加9%（2回合）」",
              type: 11,
              condition: Condition.ULTIMATE,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: "10144-lead-4-1",
                    name: "受到傷害增加9%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.09,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                    },
                  },
                ],
              },
            },
            {
              id: "10144-lead-7",
              name: "必殺時，觸發『以自身基礎攻擊力75%使我方站位位攻擊力增加』(1回合)",
              type: 6,
              condition: Condition.ULTIMATE,
              duration: 100,
              _6: {
                value: 0.75,
                target: Target.POSITION_1,
                base: true,
                duration: 1,
              },
            },
          ];
        }
      });
      break;
    } // "10145": "夏日 撒旦",
    // "10146": "魔獸獵手 神無雪",
    // "10147": "魔物終結 鬼醉木",
    // "10148": "酩酊狂歡 靜",
    // "10149": "千年靈狐 椿",
    // "10150": "勇者兔女郎 神田綾音",
    // "10151": "性感兔女郎 伊布力斯",
    // "10152": "治癒之星 蘇珊",
    // "10153": "純真殺意 撒旦",
    // "10154": "星空奈奈美",
    // "10155": "甜蜜女僕",

    case "10155": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10155-lead-1",
            name: "最大HP增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.3,
            },
          },
        ];
      });
      const singleAttributeCondition = [
        CharacterAttribute.DARK,
        CharacterAttribute.LIGHT,
        CharacterAttribute.WIND,
        CharacterAttribute.WATER,
        CharacterAttribute.FIRE,
      ];

      G.characters.forEach((character) => {
        if (singleAttributeCondition.includes(character.attribute)) {
          const index = singleAttributeCondition.indexOf(character.attribute);
          if (index !== -1) {
            singleAttributeCondition.splice(
              singleAttributeCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (singleAttributeCondition.length === 4) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10155-lead-2",
              name: "攻擊力增加40%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 0.7,
              },
            },
            {
              id: "10155-lead-3",
              name: "造成增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.3,
              },
            },
            {
              id: "10155-lead-4",
              name: "被治療時回復量增加50%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_HEAL_RECEIVED,
                value: 0.5,
              },
            },
            {
              id: "10155-lead-5",
              name: "攻擊時，觸發「以自身攻擊力40%對目標造成傷害」",
              type: 1,
              condition: Condition.ATTACK,
              duration: 100,
              _1: {
                value: 0.4,
                defender: Target.ENEMY,
                damageType: DamageType.TRIGGER,
                multiple: false,
              },
            },
            {
              id: "10155-lead-6",
              name: "第7回合時，觸發「使自身必殺技傷害增加100%(最多1層)」",
              type: 4,
              condition: Condition.ON_SPECIFIC_TURN,
              conditionTurn: 10,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ALL_ENEMIES,
                targetSkill: "10155-lead-5-1",
                applySkill: {
                  id: "10155-lead-5-1",
                  name: "受到火屬性傷害增加10%",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10155-lead-5-1",
                    name: "受到火屬性傷害增加10%",
                    stack: 1,
                    maxStack: 5,
                    value: 0.1,
                    affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                  },
                },
              },
            },
          ];
        });
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
    // "10164": "祭典花韻 香奈"
    // "10165": "銀鴞武裝 米婭",
    case "10165": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10165-lead-1",
            name: "最大HP增加40%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.4,
            },
          },
          {
            id: "10165-lead-2",
            name: "攻擊力增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.5,
            },
          },
        ];
      });

      const atLeastOneFire = [CharacterAttribute.FIRE];

      G.characters.forEach((character) => {
        if (atLeastOneFire.includes(character.attribute)) {
          const index = atLeastOneFire.indexOf(character.attribute);
          if (index !== -1) {
            atLeastOneFire.splice(
              atLeastOneFire.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (atLeastOneFire.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10165-lead-3",
            name: "攻擊力增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.5,
            },
          },
          {
            id: "10165-lead-5",
            name: "普攻時，觸發「使目標受到火、風屬性傷害增加4%(最多10層)」",
            type: 21,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _21: {
              trigger: [
                {
                  id: "10165-lead-5-1",
                  name: "普攻時，觸發「使目標受到火屬性傷害增加4%(最多10層)」",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "10165-lead-5-1-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "10165-lead-5-1-1",
                      name: "受到火屬性傷害增加4%",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "10165-lead-5-1-1",
                        name: "受到火屬性傷害增加4%",
                        stack: 1,
                        maxStack: 10,
                        affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                        value: 0.04,
                      },
                    },
                  },
                },
                {
                  id: "10165-lead-5-2",
                  name: "普攻時，觸發「使目標受到風屬性傷害增加4%(最多10層)」",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "10165-lead-5-2-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "10165-lead-5-2-1",
                      name: "受到風屬性傷害增加4%",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "10165-lead-5-2-1",
                        name: "受到風屬性傷害增加4%",
                        stack: 1,
                        maxStack: 10,
                        affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                        value: 0.04,
                      },
                    },
                  },
                },
              ],
            },
          },
        ];
      }

      const onlyTwoAttribute = [
        CharacterAttribute.DARK,
        CharacterAttribute.LIGHT,
        CharacterAttribute.WIND,
        CharacterAttribute.WATER,
        CharacterAttribute.FIRE,
      ];

      G.characters.forEach((character) => {
        if (onlyTwoAttribute.includes(character.attribute)) {
          const index = onlyTwoAttribute.indexOf(character.attribute);
          if (index !== -1) {
            onlyTwoAttribute.splice(
              onlyTwoAttribute.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (onlyTwoAttribute.length === 3) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10165-lead-7",
            name: "普攻傷害增加100%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_BASIC_DMG,
              value: 1,
            },
          },
          {
            id: "10165-lead-8",
            name: "普攻時，觸發「使目標受到傷害增加4%(最多10層)」",
            type: 4,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10165-lead-8-1",
              target: Target.ENEMY,
              applySkill: {
                id: "10165-lead-8-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10165-lead-8-1",
                  name: "受到傷害增加",
                  stack: 1,
                  maxStack: 10,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                  value: 0.04,
                },
              },
            },
          },
        ];
      }

      const threeAttacker = [
        CharacterClass.ATTACKER,
        CharacterClass.ATTACKER,
        CharacterClass.ATTACKER,
      ];

      G.characters.forEach((character) => {
        if (threeAttacker.includes(character.class)) {
          const index = threeAttacker.indexOf(character.class);
          if (index !== -1) {
            threeAttacker.splice(threeAttacker.indexOf(character.class), 1);
          }
        }
      });

      if (threeAttacker.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10165-lead-9",
            name: "造成傷害增加35%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value: 0.35,
            },
          },
          {
            id: "10165-lead-10",
            name: "普攻時，追加「以自身攻擊力20%對目標造成傷害」",
            type: 101,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _101: {
              value: 0.2,
              defender: Target.ENEMY,
              damageType: DamageType.BASIC_ADDON,
              multiple: false,
              isTrueDamage: false,
            },
          },
        ];
      }
      break;
    }
    // "10166": "白熊武裝 冬。艾妮",
    case "10166": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10166-lead-1",
            name: "最大HP增加40%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.4,
            },
          },
          {
            id: "10166-lead-2",
            name: "攻擊力增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.5,
            },
          },
          {
            id: "10166-lead-3",
            name: "必殺技傷害增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
              value: 0.3,
            },
          },
        ];
      });
      G.characters.forEach((character, index) => {
        if (
          (character.class === CharacterClass.ATTACKER &&
            character.attribute === CharacterAttribute.DARK) ||
          (character.class === CharacterClass.OBSTRUCTER &&
            character.attribute === CharacterAttribute.DARK) ||
          (character.class === CharacterClass.ATTACKER &&
            character.attribute === CharacterAttribute.LIGHT) ||
          (character.class === CharacterClass.OBSTRUCTER &&
            character.attribute === CharacterAttribute.LIGHT)
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10166-lead-4",
              name: "每經過4回合，觸發「使目標受到傷害增加20%(1回合)」",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 4,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: "10166-lead-4-1",
                    name: "使目標受到傷害增加20%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.2,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                    },
                  },
                ],
              },
            },
            {
              id: "10166-lead-5",
              name: "每經過4回合，觸發「使自身攻擊力增加80%(1回合)」",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 4,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10166-lead-5",
                    name: "使自身攻擊力增加80%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.8,
                      affectType: AffectType.INCREASE_ATK,
                    },
                  },
                ],
              },
            },
            {
              id: "10166-lead-6",
              name: "每經過4回合，觸發「使自身必殺技傷害增加45%(1回合)」",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 4,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10166-lead-6",
                    name: "使必殺技傷害增加80%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.45,
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                    },
                  },
                ],
              },
            },
            {
              id: "10166-lead-7",
              name: "每經過4回合，觸發「使自身造成傷害增加50%(1回合)」",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 4,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10166-lead-7",
                    name: "造成傷害增加50%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.5,
                      affectType: AffectType.INCREASE_DMG,
                    },
                  },
                ],
              },
            },
          ];
        }
      });
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
