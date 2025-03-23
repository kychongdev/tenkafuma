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
  console.log("id", id);
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
    case "10044": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10044-lead-1",
            name: "最大HP增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.3,
            },
          },
          {
            id: "10044-lead-2",
            name: "必殺技傷害增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
              value: 0.2,
            },
          },
          {
            id: "10044-lead-3",
            name: "普攻傷害增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_BASIC_DMG,
              value: 0.3,
            },
          },
        ];
      });
      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10044-lead-4",
          name: "攻擊力增加350%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ATK,
            value: 3.5,
          },
        },
        {
          id: "10044-lead-5",
          name: "必殺時，觸發「使自身以外我方全體獲得『必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)』、『普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)』」",
          type: 21,
          condition: Condition.ULTIMATE,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "10044-lead-5-1",
                name: "使自身以外我方全體獲得『必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)』、『普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)』」",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ALL_EXCEPT_SELF,
                  applySkill: [
                    {
                      id: "10044-lead-5-1-1",
                      name: "必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)",
                      type: 101,
                      condition: Condition.ULTIMATE,
                      duration: 1,
                      _101: {
                        value: 1,
                        defender: Target.ENEMY,
                        damageType: DamageType.ULTIMATE_ADDON,
                        isTrueDamage: false,
                        multiple: false,
                      },
                    },
                    {
                      id: "10044-lead-5-1-2",
                      name: "普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)",
                      type: 101,
                      condition: Condition.BASIC_ATTACK,
                      duration: 2,
                      _101: {
                        value: 0.25,
                        defender: Target.ENEMY,
                        damageType: DamageType.BASIC_ADDON,
                        isTrueDamage: false,
                        multiple: false,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: "10044-lead-6",
          name: "每經過4回合，觸發「使敵方全體受到火、水、風、光、闇屬性傷害增加70%(2回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _11: {
            target: Target.ALL_ENEMIES,
            applySkill: [
              {
                id: "10044-lead-6-1",
                name: "受到火屬性傷害增加70%(2回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: "10044-lead-6-2",
                name: "受到水屬性傷害增加70%(2回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: "10044-lead-6-3",
                name: "受到風屬性傷害增加70%(2回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: "10044-lead-6-4",
                name: "受到光屬性傷害增加70%(2回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: "10044-lead-6-5",
                name: "受到闇屬性傷害增加70%(2回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                  value: 0.7,
                },
              },
            ],
          },
        },
      ];
      const twoAttackerCondition = [
        CharacterClass.ATTACKER,
        CharacterClass.ATTACKER,
      ];

      G.characters.forEach((character) => {
        if (twoAttackerCondition.includes(character.class)) {
          const index = twoAttackerCondition.indexOf(character.class);
          if (index !== -1) {
            twoAttackerCondition.splice(
              twoAttackerCondition.indexOf(character.class),
              1,
            );
          }
        }
      });

      if (twoAttackerCondition.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10044-lead-7",
            name: "攻擊力減少350%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_ATK,
              value: 3.5,
            },
          },
        ];
      }

      const twoHealerCondition = [CharacterClass.HEALER, CharacterClass.HEALER];

      G.characters.forEach((character) => {
        if (twoHealerCondition.includes(character.class)) {
          const index = twoAttackerCondition.indexOf(character.class);
          if (index !== -1) {
            twoHealerCondition.splice(
              twoHealerCondition.indexOf(character.class),
              1,
            );
          }
        }
      });

      if (twoHealerCondition.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10044-lead-8",
            name: "攻擊力減少350%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_ATK,
              value: 3.5,
            },
          },
        ];
      }

      const twoSupportCondition = [
        CharacterClass.SUPPORT,
        CharacterClass.SUPPORT,
      ];

      G.characters.forEach((character) => {
        if (twoSupportCondition.includes(character.class)) {
          const index = twoSupportCondition.indexOf(character.class);
          if (index !== -1) {
            twoSupportCondition.splice(
              twoSupportCondition.indexOf(character.class),
              1,
            );
          }
        }
      });

      if (twoSupportCondition.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10044-lead-9",
            name: "攻擊力減少350%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_ATK,
              value: 3.5,
            },
          },
        ];
      }

      const twoObstructerCondition = [
        CharacterClass.OBSTRUCTER,
        CharacterClass.OBSTRUCTER,
      ];

      G.characters.forEach((character) => {
        if (twoObstructerCondition.includes(character.class)) {
          const index = twoObstructerCondition.indexOf(character.class);
          if (index !== -1) {
            twoObstructerCondition.splice(
              twoObstructerCondition.indexOf(character.class),
              1,
            );
          }
        }
      });

      if (twoObstructerCondition.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10044-lead-10",
            name: "攻擊力減少350%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_ATK,
              value: 3.5,
            },
          },
        ];
      }

      const twoProtectorCondition = [
        CharacterClass.PROTECTOR,
        CharacterClass.PROTECTOR,
      ];

      G.characters.forEach((character) => {
        if (twoProtectorCondition.includes(character.class)) {
          const index = twoProtectorCondition.indexOf(character.class);
          if (index !== -1) {
            twoProtectorCondition.splice(
              twoProtectorCondition.indexOf(character.class),
              1,
            );
          }
        }
      });

      if (twoProtectorCondition.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10044-lead-11",
            name: "攻擊力減少350%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_ATK,
              value: 3.5,
            },
          },
        ];
      }

      break;
    }
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
    case "10077": {
      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10077-Lead-1",
          name: "最大HP增加50%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.MAX_HP,
            value: 0.5,
          },
        },
        {
          id: "10077-Lead-2",
          name: "普攻時，觸發「以自身最大HP6%使我方全體攻擊力增加(1回合)」",
          type: 17,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _17: {
            value: 0.06,
            target: Target.ALL_ALLIES,
            duration: 1,
          },
        },
        {
          id: "10077-Lead-3",
          name: "必殺時，觸發「以自身最大HP8%使我方全體攻擊力增加(1回合)」",
          type: 17,
          condition: Condition.ULTIMATE,
          duration: 100,
          _17: {
            value: 0.08,
            target: Target.ALL_ALLIES,
            duration: 1,
          },
        },
      ];
      G.characters.forEach((character, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10077-Lead-4",
            name: "攻擊力增加60%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.6,
            },
          },
        ];
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10077-Lead-5",
              name: "造成傷害增加50%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.5,
              },
            },
          ];
        }
        if (
          character.class === CharacterClass.PROTECTOR ||
          character.class === CharacterClass.HEALER ||
          character.class === CharacterClass.SUPPORT
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10077-Lead-6",
              name: "必殺時，觸發「使我方全體必殺技傷害增加30%」",
              type: 11,
              condition: Condition.ULTIMATE,
              duration: 100,
              _11: {
                target: Target.ALL_ALLIES,
                applySkill: [
                  {
                    id: "10077-Lead-6-1",
                    name: "必殺技傷害增加30%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                      value: 0.3,
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

    // "10078": "慵懶貓貓 露露",
    case "10078": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10078-Lead-1",
            name: "最大HP增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.3,
            },
          },
          {
            id: "10078-Lead-2",
            name: "攻擊力增加25%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.25,
            },
          },
        ];
      });

      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10078-Lead-3",
          name: "普攻傷害增加30%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DMG,
            value: 0.3,
          },
        },
      ];

      G.characters.forEach((character, index) => {
        if (character.attribute === CharacterAttribute.WATER) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10078-Lead-3",
              name: "普攻時，觸發「使目標受到普攻傷害增加15%(最多5層)」",
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: "10078-Lead-3-1",
                target: Target.ENEMY,
                applySkill: {
                  id: "10078-Lead-3-1",
                  name: "受到普攻傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10078-Lead-3-1",
                    name: "受到普攻傷害增加",
                    stack: 1,
                    maxStack: 5,
                    affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
                    value: 0.15,
                  },
                },
              },
            },
            {
              id: "10078-Lead-4",
              name: "普攻時，追加「以自身攻擊力30%對目標造成傷害」",
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _101: {
                value: 0.3,
                defender: Target.ENEMY,
                damageType: DamageType.BASIC,
                isTrueDamage: false,
                multiple: false,
              },
            },
          ];
        }
      });

      const fourWaterCondition = [
        CharacterAttribute.WATER,
        CharacterAttribute.WATER,
        CharacterAttribute.WATER,
        CharacterAttribute.WATER,
      ];
      G.characters.forEach((character) => {
        if (fourWaterCondition.includes(character.attribute)) {
          const index = fourWaterCondition.indexOf(character.attribute);
          if (index !== -1) {
            fourWaterCondition.splice(
              fourWaterCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (fourWaterCondition.length === 0) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,

            {
              id: "10078-Lead-5",
              name: "普攻傷害增加50%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DMG,
                value: 0.5,
              },
            },
            {
              id: "10078-lead-6",
              name: "攻擊時，觸發「使我方站位1的隊員造成傷害增加5%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _11: {
                target: Target.POSITION_1,
                applySkill: [
                  {
                    id: "10078-Lead-6-1",
                    name: "造成傷害增加5%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      affectType: AffectType.INCREASE_DMG,
                      value: 0.05,
                    },
                  },
                  {
                    id: "10078-Lead-6-2",
                    name: "普攻時，追加「以自身攻擊力10%對目標造成傷害」",
                    type: 101,
                    condition: Condition.BASIC_ATTACK,
                    duration: 1,
                    _101: {
                      value: 0.1,
                      defender: Target.ENEMY,
                      damageType: DamageType.BASIC,
                      isTrueDamage: false,
                      multiple: false,
                    },
                  },
                  {
                    id: "10078-Lead-6-3",
                    name: "必殺時，追加「以自身攻擊力10%對目標造成傷害」",
                    type: 101,
                    condition: Condition.ULTIMATE,
                    duration: 1,
                    _101: {
                      value: 0.1,
                      defender: Target.ENEMY,
                      damageType: DamageType.ULTIMATE,
                      isTrueDamage: false,
                      multiple: false,
                    },
                  },
                ],
              },
            },
          ];
        });
      }

      const fiveWaterCondition = [
        CharacterAttribute.WATER,
        CharacterAttribute.WATER,
        CharacterAttribute.WATER,
        CharacterAttribute.WATER,
        CharacterAttribute.WATER,
      ];
      G.characters.forEach((character) => {
        if (fiveWaterCondition.includes(character.attribute)) {
          const index = fiveWaterCondition.indexOf(character.attribute);
          if (index !== -1) {
            fiveWaterCondition.splice(
              fiveWaterCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (fiveWaterCondition.length === 0) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,

            {
              id: "10078-Lead-7",
              name: "普攻傷害增加50%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.3,
              },
            },
            {
              id: "10078-lead-7",
              name: "攻擊時，觸發「使我方站位1的隊員造成傷害增加5%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力20%對目標造成傷害』(1回合)」",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _11: {
                target: Target.POSITION_1,
                applySkill: [
                  {
                    id: "10078-Lead-7-1",
                    name: "造成傷害增加5%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      affectType: AffectType.INCREASE_DMG,
                      value: 0.05,
                    },
                  },
                  {
                    id: "10078-Lead-7-2",
                    name: "普攻時，追加「以自身攻擊力20%對目標造成傷害」",
                    type: 101,
                    condition: Condition.BASIC_ATTACK,
                    duration: 1,
                    _101: {
                      value: 0.2,
                      defender: Target.ENEMY,
                      damageType: DamageType.BASIC,
                      isTrueDamage: false,
                      multiple: false,
                    },
                  },
                  {
                    id: "10078-Lead-7-3",
                    name: "必殺時，追加「以自身攻擊力20%對目標造成傷害」",
                    type: 101,
                    condition: Condition.ULTIMATE,
                    duration: 1,
                    _101: {
                      value: 0.2,
                      defender: Target.ENEMY,
                      damageType: DamageType.ULTIMATE,
                      isTrueDamage: false,
                      multiple: false,
                    },
                  },
                ],
              },
            },
          ];
        });
      }
      break;
    }
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
    case "10091": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10091-Lead-1",
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
            id: "10091-Lead-2",
            name: "攻擊力增加40%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.4,
            },
          },
        ];
      });
      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10091-Lead-3",
          name: "使自身普攻時，觸發「以自身攻擊力40%使我方全體妨礙者攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _6: {
            duration: 1,
            value: 0.4,
            base: false,
            target: Target.OBSTRUCTER,
          },
        },
        {
          id: "10091-Lead-3",
          name: "使自身必殺時，觸發「以自身攻擊力25%使我方全體妨礙者攻擊力增加(10回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            duration: 10,
            value: 0.25,
            base: false,
            target: Target.OBSTRUCTER,
          },
        },
      ];
      G.characters.forEach((character, index) => {
        if (character.class === CharacterClass.OBSTRUCTER) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10091-lead-4",
              name: "自身攻擊時，觸發「使我方站位1的隊員攻擊力增加25%(4回合)」",
              type: 11,
              condition: Condition.ATTACK,
              duration: 100,
              _11: {
                target: Target.POSITION_1,
                applySkill: [
                  {
                    id: "10091-Lead-4-1",
                    name: "攻擊力增加25%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 4,
                    _0: {
                      value: 0.25,
                      affectType: AffectType.INCREASE_ATK,
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
    // "10092": "夏日 阿爾蒂雅",
    case "10092": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10092-lead-1",
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
            id: "10092-lead-2",
            name: "受到傷害減少15%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_DMG_RECEIVED,
              value: 0.15,
            },
          },
        ];
      });
      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10092-lead-3",
          name: "每經過3回合，觸發「使自身造成傷害增加125%(1回合)",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "10092-lead-3-1",
                name: "使自身造成傷害增加125%(1回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 1.25,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            ],
          },
        },
        {
          id: "10092-lead-4",
          name: "每經過3回合，使敵方全體受到傷害增加50%(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _11: {
            target: Target.ALL_ENEMIES,
            applySkill: [
              {
                id: "10092-lead-4-1",
                name: "使敵方全體受到傷害增加50%",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.5,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            ],
          },
        },
        {
          id: "10092-lead-5",
          name: "每經過6回合，觸發「使自身造成必殺技傷害增加125%(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 6,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "10092-lead-5-1",
                name: "使自身造成必殺技傷害增加125%(1回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 1.25,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            ],
          },
        },
      ];
      break;
    }
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
    case "10114": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10114-Lead-1",
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
      {
        const threeDarkCondition = [
          CharacterAttribute.DARK,
          CharacterAttribute.DARK,
          CharacterAttribute.DARK,
        ];
        G.characters.forEach((character) => {
          if (threeDarkCondition.includes(character.attribute)) {
            const index = threeDarkCondition.indexOf(character.attribute);
            if (index !== -1) {
              threeDarkCondition.splice(
                threeDarkCondition.indexOf(character.attribute),
                1,
              );
            }
          }
        });
        if (threeDarkCondition.length === 0) {
          G.characters.forEach((_, index) => {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10114-Lead-2",
                name: "攻擊力增加40%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_ATK,
                  value: 0.4,
                },
              },
              {
                id: "10114-Lead-3",
                name: "行動時，觸發「使目標受到傷害增加2.5%(最多12層)」",
                type: 4,
                condition: Condition.MOVE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10114-Lead-3-1",
                  target: Target.ENEMY,
                  applySkill: {
                    id: "10114-Lead-3-1",
                    name: "受到傷害增加2.5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10114-Lead-3-1",
                      name: "受到傷害增加2.5%",
                      stack: 1,
                      maxStack: 12,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                      value: 0.025,
                    },
                  },
                },
              },
              {
                id: "10114-Lead-4",
                name: "行動時，觸發「使目標受到觸發技傷害增加5%(最多12層)」",
                type: 4,
                condition: Condition.MOVE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10114-Lead-4-1",
                  target: Target.ENEMY,
                  applySkill: {
                    id: "10114-Lead-4-1",
                    name: "受到觸發技傷害增加5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10114-Lead-4-1",
                      name: "受到觸發技傷害增加5%",
                      stack: 1,
                      maxStack: 12,
                      affectType: AffectType.INCREASE_TRIGGER_DMG_RECEIVED,
                      value: 0.05,
                    },
                  },
                },
              },
            ];
          });
        }
        const twoLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];
        G.characters.forEach((character) => {
          if (twoLightCondition.includes(character.attribute)) {
            const index = twoLightCondition.indexOf(character.attribute);
            if (index !== -1) {
              twoLightCondition.splice(
                twoLightCondition.indexOf(character.attribute),
                1,
              );
            }
          }
        });
        if (twoLightCondition.length === 0) {
          G.characters.forEach((_, index) => {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10114-Lead-5",
                name: "造成傷害增加20%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.2,
                },
              },
              {
                id: "10114-Lead-6",
                name: "必殺時，觸發「使目標受到暗屬性傷害增加17.5%(最多2層)」",
                type: 4,
                condition: Condition.ULTIMATE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10114-Lead-6-1",
                  target: Target.ENEMY,
                  applySkill: {
                    id: "10114-Lead-6-1",
                    name: "受到暗屬性傷害增加17.5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10114-Lead-6-1",
                      name: "受到暗屬性傷害增加17.5%",
                      stack: 1,
                      maxStack: 2,
                      affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                      value: 0.175,
                    },
                  },
                },
              },
              {
                id: "10114-Lead-7",
                name: "必殺時，觸發「使目標受到光屬性傷害增加17.5%(最多2層)」",
                type: 4,
                condition: Condition.ULTIMATE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10114-Lead-7-1",
                  target: Target.ENEMY,
                  applySkill: {
                    id: "10114-Lead-7-1",
                    name: "受到光屬性傷害增加17.5%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10114-Lead-7-1",
                      name: "受到光屬性傷害增加17.5%",
                      stack: 1,
                      maxStack: 2,
                      affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                      value: 0.175,
                    },
                  },
                },
              },
            ];
          });
        }
      }

      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10114-Lead-8",
          name: "攻擊力增加80%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ATK,
            value: 0.8,
          },
        },
        {
          id: "10114-Lead-9",
          name: "普攻傷害增加60%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DMG,
            value: 0.6,
          },
        },
        {
          id: "10114-Lead-10",
          name: "必殺技傷害增加40%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ULTIMATE_DMG,
            value: 0.4,
          },
        },
        {
          id: "10114-Lead-11",
          name: "必殺時，觸發「以自身攻擊力150%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 1.5,
            action: CharacterAction.ULTIMATE,
            target: Target.ENEMY,
            damageType: DamageType.TRIGGER,
          },
        },
      ];
      break;
    }
    // "10115": "魔法少女 布蘭妮",
    // "10116": "夏日 神田綾音",
    // "10117": "夏日 巴爾",
    case "10117": {
      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10117-lead-1",
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
          id: "10117-lead-2",
          name: "造成傷害增加20%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_DMG,
            value: 0.2,
          },
        },
      ];
      G.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.FIRE ||
          character.attribute === CharacterAttribute.LIGHT
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10117-lead-1",
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
              id: "10117-lead-2",
              name: "造成傷害增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.2,
              },
            },
          ];
        }
      });

      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10117-lead-3",
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
          id: "10117-lead-4",
          name: "普攻傷害增加20%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DMG,
            value: 0.2,
          },
        },
      ];
      G.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.FIRE ||
          character.attribute === CharacterAttribute.LIGHT
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10117-lead-5",
              name: "攻擊力增加80%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 0.8,
              },
            },
            {
              id: "10117-lead-6",
              name: "普攻傷害增加50%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DMG,
                value: 0.5,
              },
            },
          ];
        }
      });

      {
        const twoFireCondition = [
          CharacterAttribute.FIRE,
          CharacterAttribute.FIRE,
        ];
        const twoLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];

        G.characters.forEach((character) => {
          if (twoFireCondition.includes(character.attribute)) {
            const index = twoFireCondition.indexOf(character.attribute);
            if (index !== -1) {
              twoFireCondition.splice(
                twoFireCondition.indexOf(character.attribute),
                1,
              );
            }
          }
          if (twoLightCondition.includes(character.attribute)) {
            const index = twoLightCondition.indexOf(character.attribute);
            if (index !== -1) {
              twoLightCondition.splice(
                twoLightCondition.indexOf(character.attribute),
                1,
              );
            }
          }
        });

        if (twoFireCondition.length === 0) {
          G.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              G.characters[index].buff = [
                ...G.characters[index].buff,
                {
                  id: "10117-lead-7",
                  name: "普攻時，追加「以自身攻擊力40%對目標造成傷害」",
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.4,
                    defender: Target.ENEMY,
                    damageType: DamageType.BASIC_ADDON,
                    multiple: false,
                    isTrueDamage: false,
                  },
                },
                {
                  id: "10117-lead-8",
                  name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                  type: 104,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _104: {
                    increaseStack: 1,
                    targetSkill: "10117-lead-8-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "10117-lead-8-1",
                      name: "受到普攻傷害增加18%",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "10117-lead-8-1",
                        name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                        stack: 1,
                        maxStack: 5,
                        value: 0.18,
                        affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
                      },
                    },
                  },
                },
              ];
            }
          });
        }

        if (twoLightCondition.length === 0) {
          G.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              G.characters[index].buff = [
                ...G.characters[index].buff,
                {
                  id: "10117-lead-9",
                  name: "普攻時，追加「以自身攻擊力40%對目標造成傷害」",
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.4,
                    defender: Target.ENEMY,
                    damageType: DamageType.BASIC_ADDON,
                    multiple: false,
                    isTrueDamage: false,
                  },
                },
                {
                  id: "10117-lead-10",
                  name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                  type: 104,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _104: {
                    increaseStack: 1,
                    targetSkill: "10117-lead-10-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "10117-lead-10-1",
                      name: "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "10117-lead-10-1",
                        name: "受到普攻傷害增加18%",
                        stack: 1,
                        maxStack: 5,
                        value: 0.18,
                        affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
                      },
                    },
                  },
                },
              ];
            }
          });
        }
      }
      break;
    }
    // "10118": "夏日 菲歐菈",
    case "10118": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10118-lead-1",
            name: "最大HP增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.2,
            },
          },
        ];
      });
      const fourLightCondition = [
        CharacterAttribute.LIGHT,
        CharacterAttribute.LIGHT,
        CharacterAttribute.LIGHT,
        CharacterAttribute.LIGHT,
      ];
      G.characters.forEach((character) => {
        if (fourLightCondition.includes(character.attribute)) {
          const index = fourLightCondition.indexOf(character.attribute);
          if (index !== -1) {
            fourLightCondition.splice(
              fourLightCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });
      if (fourLightCondition.length === 0) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10118-lead-2",
              name: "攻擊力增加100%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 1,
              },
            },
          ];
        });
        G.characters.forEach((character, index) => {
          if (character.attribute === CharacterAttribute.LIGHT) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10118-lead-3",
                name: "必殺技傷害增加50%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                  value: 0.5,
                },
              },
            ];
          }
        });
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10118-lead-4",
            name: "每經過4回合，觸發「使目標受到傷害增加50%(1回合)」",
            type: 11,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 4,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "10118-lead-4-1",
                  name: "受到傷害增加50%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.5,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
          {
            id: "10118-lead-5",
            name: "被治療時，觸發「使我方全體造成傷害增加15%(1回合)」",
            type: 11,
            condition: Condition.GET_HEAL,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10118-lead-5-1",
                  name: "造成傷害增加15%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
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
      break;
    }
    // "10119": "夏日 艾可",
    // "10120": "乘風破浪 蘭兒",
    // "10121": "碧波白喵 娜娜",
    // "10122": "性感天使 兔姬",
    // "10123": "惡魔貓娘 杏仁咪嚕",
    case "10123": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10123-Lead-1",
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
            id: "10123-Lead-2",
            name: "攻擊力增加70%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.7,
            },
          },
        ];
      });
      const characterThreeAttackerCondition = [
        CharacterClass.ATTACKER,
        CharacterClass.ATTACKER,
        CharacterClass.ATTACKER,
      ];
      const characterTwoObstructerCondition = [
        CharacterClass.OBSTRUCTER,
        CharacterClass.OBSTRUCTER,
      ];
      G.characters.forEach((character) => {
        if (characterThreeAttackerCondition.includes(character.class)) {
          const index = characterThreeAttackerCondition.indexOf(
            character.class,
          );
          if (index !== -1) {
            characterThreeAttackerCondition.splice(
              characterThreeAttackerCondition.indexOf(character.class),
              1,
            );
          }
        }
        if (characterTwoObstructerCondition.includes(character.class)) {
          const index = characterTwoObstructerCondition.indexOf(
            character.class,
          );
          if (index !== -1) {
            characterTwoObstructerCondition.splice(
              characterTwoObstructerCondition.indexOf(character.class),
              1,
            );
          }
        }
      });
      if (characterThreeAttackerCondition.length === 0) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10123-Lead-3",
              name: "造成觸發技效果增加150%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_TRIGGER_DMG,
                value: 1.5,
              },
            },
            {
              id: "10123-Lead-4",
              name: "造成傷害增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.3,
              },
            },
            {
              id: "10123-Lead-5",
              name: "必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」",
              type: 11,
              condition: Condition.ULTIMATE,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: "10123-Lead-5-1",
                    name: "受到火屬性傷害增加5%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.05,
                      affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                    },
                  },
                  {
                    id: "10123-Lead-5-2",
                    name: "受到水屬性傷害增加5%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.05,
                      affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                    },
                  },
                  {
                    id: "10123-Lead-5-3",
                    name: "受到風屬性傷害增加5%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.05,
                      affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                    },
                  },
                  {
                    id: "10123-Lead-5-4",
                    name: "受到光屬性傷害增加5%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.05,
                      affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                    },
                  },
                  {
                    id: "10123-Lead-5-5",
                    name: "受到暗屬性傷害增加5%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.05,
                      affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                    },
                  },
                ],
              },
            },
          ];
        });
        if (characterTwoObstructerCondition.length === 0) {
          G.characters.forEach((_, index) => {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10123-Lead-6",
                name: "造成觸發技效果增加150%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_TRIGGER_DMG,
                  value: 1.5,
                },
              },
              {
                id: "10123-Lead-7",
                name: "造成傷害增加30%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.3,
                },
              },
              {
                id: "10123-Lead-8",
                name: "必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ENEMY,
                  applySkill: [
                    {
                      id: "10123-Lead-8-1",
                      name: "受到火屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "10123-Lead-8-2",
                      name: "受到水屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "10123-Lead-8-3",
                      name: "受到風屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "10123-Lead-8-4",
                      name: "受到光屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                      },
                    },
                    {
                      id: "10123-Lead-8-5",
                      name: "受到暗屬性傷害增加5%",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                      },
                    },
                  ],
                },
              },
            ];
          });
        }
      }
      break;
    }
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
    case "10137": {
      G.characters.forEach((character, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10137-lead-1",
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
        if (
          character.attribute === CharacterAttribute.WIND &&
          (character.class === CharacterClass.ATTACKER ||
            character.class === CharacterClass.PROTECTOR ||
            character.class === CharacterClass.OBSTRUCTER)
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10137-lead-2",
              name: "普攻時，觸發「使我方全體攻擊力增加6%(最多18層)」",
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                target: Target.ALL_ALLIES,
                increaseStack: 1,
                targetSkill: "10137-lead-2-1",
                applySkill: {
                  id: "10137-lead-2-1",
                  name: "攻擊力增加6%",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10137-lead-2-1",
                    name: "攻擊力增加6%",
                    value: 0.06,
                    stack: 1,
                    maxStack: 18,
                    affectType: AffectType.INCREASE_ATK,
                  },
                },
              },
            },
            {
              id: "10137-lead-3",
              name: "普攻時，觸發「使我方全體普攻傷害增加6%(最多18層)」",
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                target: Target.ALL_ALLIES,
                increaseStack: 1,
                targetSkill: "10137-lead-3-1",
                applySkill: {
                  id: "10137-lead-3-1",
                  name: "普攻傷害增加6%",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10137-lead-3-1",
                    name: "普攻傷害增加6%",
                    stack: 1,
                    maxStack: 18,
                    value: 0.06,
                    affectType: AffectType.INCREASE_BASIC_DMG,
                  },
                },
              },
            },
            {
              id: "10137-lead-4",
              name: "普攻時，觸發「使我方全體造成傷害增加2%(最多18層)」",
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                target: Target.ALL_ALLIES,
                increaseStack: 1,
                targetSkill: "10137-lead-4-1",
                applySkill: {
                  id: "10137-lead-4-1",
                  name: "造成傷害增加2%",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10137-lead-4-1",
                    name: "造成傷害增加2%",
                    stack: 1,
                    maxStack: 18,
                    value: 0.02,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              },
            },
          ];
        }
      });
      break;
    }
    // "10138": "迷情薄紗 露露",
    // "10139": "不健全遐想 托特拉",
    // "10140": "真神化身 菈萊亞 菈萊亞",
    // "10141": "調查員 娜娜",
    // "10142": "夏日 千鶴",
    case "10142": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10142-lead-1",
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
            id: "10142-lead-2",
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
      const threeAttackerCondition = [
        CharacterClass.ATTACKER,
        CharacterClass.ATTACKER,
        CharacterClass.ATTACKER,
      ];
      G.characters.forEach((character) => {
        if (threeAttackerCondition.includes(character.class)) {
          const index = threeAttackerCondition.indexOf(character.class);
          if (index !== -1) {
            threeAttackerCondition.splice(
              threeAttackerCondition.indexOf(character.class),
              1,
            );
          }
        }
      });
      if (threeAttackerCondition.length === 0) {
        G.characters[0].buff = [
          ...G.characters[0].buff,
          {
            id: "10142-lead-3",
            name: "自身必殺時，觸發「使敵方全體受到傷害增加20%(4回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "10142-lead-3-1",
                  name: "受到傷害增加20%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 4,
                  _0: {
                    value: 0.2,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
          {
            id: "10142-lead-4",
            name: "自身必殺時，觸發「使我方全體攻擊者造成傷害增加20%(4回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ATTACKER,
              applySkill: [
                {
                  id: "10142-lead-4-1",
                  name: "造成傷害增加20%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 4,
                  _0: {
                    value: 0.2,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              ],
            },
          },
          {
            id: "10142-lead-5",
            name: "自身必殺時，觸發「使我方全體攻擊者普攻傷害增加110%(4回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ATTACKER,
              applySkill: [
                {
                  id: "10142-lead-5-1",
                  name: "普攻傷害增加110%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 4,
                  _0: {
                    value: 1.1,
                    affectType: AffectType.INCREASE_BASIC_DMG,
                  },
                },
              ],
            },
          },
        ];
      }
      break;
    }
    // "10143": "夏日 賽露西亞",
    case "10143": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10143-lead-1",
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
      const threeDifferentClassCondition = [
        CharacterClass.ATTACKER,
        CharacterClass.OBSTRUCTER,
        CharacterClass.SUPPORT,
        CharacterClass.PROTECTOR,
        CharacterClass.HEALER,
      ];
      G.characters.forEach((character) => {
        if (threeDifferentClassCondition.includes(character.class)) {
          const index = threeDifferentClassCondition.indexOf(character.class);
          if (index !== -1) {
            threeDifferentClassCondition.splice(
              threeDifferentClassCondition.indexOf(character.class),
              1,
            );
          }
        }
      });
      if (threeDifferentClassCondition.length == 2) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10143-lead-2",
              name: "攻擊力增加100%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 1,
              },
            },
            {
              id: "10143-lead-3",
              name: "造成傷害增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.2,
              },
            },
            {
              id: "10143-lead-4",
              name: "普攻傷害110%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DMG,
                value: 1.1,
              },
            },
            {
              id: "10143-lead-5",
              name: "普攻時，追加「以自身攻擊力30%對目標造成傷害」",
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _101: {
                value: 0.3,
                defender: Target.ENEMY,
                damageType: 0,
                multiple: false,
                isTrueDamage: false,
              },
            },
          ];
        });
      }
      break;
    }
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
    case "10151": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10151-lead-1",
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
            id: "10151-lead-2",
            name: "攻擊力增加40%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.4,
            },
          },
          {
            id: "10151-lead-5",
            name: "免疫必殺技CD變動效果",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.IMMUNE_CD_CHANGE,
              value: 0,
            },
          },
        ];
      });
      const twoAttributeCondition = [
        CharacterAttribute.DARK,
        CharacterAttribute.LIGHT,
        CharacterAttribute.WIND,
        CharacterAttribute.WATER,
        CharacterAttribute.FIRE,
      ];
      G.characters.forEach((character) => {
        if (twoAttributeCondition.includes(character.attribute)) {
          const index = twoAttributeCondition.indexOf(character.attribute);
          if (index !== -1) {
            twoAttributeCondition.splice(
              twoAttributeCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (twoAttributeCondition.length === 3) {
        G.characters.forEach((character, index) => {
          if (character.attribute === CharacterAttribute.WIND) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10151-lead-3",
                name: "當我方隊伍恰好有2種屬性角色時，發動『第1回合時，觸發《本小姐不需要運氣》",
                type: 21,
                condition: Condition.ON_TURN_START,
                duration: 100,
                _21: {
                  trigger: [
                    {
                      id: "10151-lead-3-1",
                      name: "使我方全體攻擊力增加25%",
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10151-lead-3-1-1",
                        target: Target.ALL_ALLIES,
                        applySkill: {
                          id: "10151-lead-3-1-1",
                          name: "攻擊力增加",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10151-lead-3-1-1",
                            name: "攻擊力增加",
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_ATK,
                            value: 0.25,
                          },
                        },
                      },
                    },
                    {
                      id: "10151-lead-3-2",
                      name: "使我方全體必殺技傷害增加25%",
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10151-lead-3-2-1",
                        target: Target.ALL_ALLIES,
                        applySkill: {
                          id: "10151-lead-3-2-1",
                          name: "使我方全體必殺技傷害增加25%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10151-lead-3-2-1",
                            name: "使我方全體必殺技傷害增加25%",
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_ULTIMATE_DMG,
                            value: 0.25,
                          },
                        },
                      },
                    },
                    {
                      id: "10151-lead-3-3",
                      name: "使我方全體攻擊者獲得「必殺時，追加『以自身攻擊力25%對目標造成傷害』(50回合)」",
                      type: 11,
                      condition: Condition.NONE,
                      duration: 50,
                      _11: {
                        target: Target.ATTACKER,
                        applySkill: [
                          {
                            id: "10151-lead-3-3-1",
                            name: "必殺時，追加『以自身攻擊力25%對目標造成傷害』",
                            type: 101,
                            condition: Condition.ULTIMATE,
                            duration: 50,
                            _101: {
                              value: 0.25,
                              defender: Target.ENEMY,
                              damageType: DamageType.ULTIMATE_ADDON,
                              isTrueDamage: false,
                              multiple: false,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ];
          }

          if (character.attribute === CharacterAttribute.LIGHT) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "10151-lead-4",
                name: "當我方隊伍恰好有2種屬性角色時，發動『第1回合時，觸發《絕對的實力能輾壓一切》",
                type: 21,
                condition: Condition.ON_TURN_START,
                duration: 100,
                _21: {
                  trigger: [
                    {
                      id: "10151-lead-4-1",
                      name: "使我方造成傷害增加25%",
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10151-lead-4-1-1",
                        target: Target.ALL_ALLIES,
                        applySkill: {
                          id: "10151-lead-4-1-1",
                          name: "造成傷害增加",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10151-lead-4-1-1",
                            name: "造成傷害增加",
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_DMG,
                            value: 0.15,
                          },
                        },
                      },
                    },
                    {
                      id: "10151-lead-4-2",
                      name: "使我方全體普攻傷害增加25%",
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: "10151-lead-4-2-1",
                        target: Target.ALL_ALLIES,
                        applySkill: {
                          id: "10151-lead-4-2-1",
                          name: "使我方全體普攻傷害增加35%",
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: "10151-lead-4-2-1",
                            name: "使我方全體普攻傷害增加35%",
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_BASIC_DMG,
                            value: 0.35,
                          },
                        },
                      },
                    },
                    {
                      id: "10151-lead-4-3",
                      name: "使我方全體攻擊者獲得「普攻時，追加『以自身攻擊力20%對目標造成傷害』(50回合)」",
                      type: 11,
                      condition: Condition.NONE,
                      duration: 50,
                      _11: {
                        target: Target.ATTACKER,
                        applySkill: [
                          {
                            id: "10151-lead-4-3-1",
                            name: "普攻時，追加『以自身攻擊力20%對目標造成傷害』",
                            type: 101,
                            condition: Condition.BASIC_ATTACK,
                            duration: 50,
                            _101: {
                              value: 0.2,
                              defender: Target.ENEMY,
                              damageType: DamageType.BASIC,
                              isTrueDamage: false,
                              multiple: false,
                            },
                          },
                        ],
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
    // "10152": "治癒之星 蘇珊",
    case "10152": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "101522-lead-1",
            name: "最大HP增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.5,
            },
          },
          {
            id: "101522-lead-2",
            name: "使我方全體受到護盾效果減少200%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_SHIELD_RATE_RECEIVED,
              value: 0.5,
            },
          },
        ];
      });

      const attributeCount = [
        CharacterAttribute.LIGHT,
        CharacterAttribute.DARK,
        CharacterAttribute.FIRE,
        CharacterAttribute.WATER,
        CharacterAttribute.WIND,
      ];

      G.characters.forEach((character) => {
        if (attributeCount.includes(character.attribute)) {
          const index = attributeCount.indexOf(character.attribute);
          if (index !== -1) {
            attributeCount.splice(
              attributeCount.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (attributeCount.length === 4) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10152-lead-3",
              name: "攻擊力增加75%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 0.75,
              },
            },
            {
              id: "10152-lead-4",
              name: "必殺時，觸發「使目標受到光屬性傷害增加3%(最多15層)」",
              type: 4,
              condition: Condition.ULTIMATE,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: "10152-lead-4-1",
                target: Target.ENEMY,
                applySkill: {
                  id: "10152-lead-4-1",
                  name: "受到光屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10152-lead-4-1",
                    name: "受到光屬性傷害增加",
                    stack: 1,
                    maxStack: 15,
                    affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                    value: 0.03,
                  },
                },
              },
            },
            {
              id: "10152-lead-5",
              name: "必殺時，觸發「使目標受到闇屬性傷害增加3%(最多15層)」",
              type: 4,
              condition: Condition.ULTIMATE,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: "10152-lead-5-1",
                target: Target.ENEMY,
                applySkill: {
                  id: "10152-lead-5-1",
                  name: "受到闇屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10152-lead-5-1",
                    name: "受到闇屬性傷害增加",
                    stack: 1,
                    maxStack: 15,
                    affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                    value: 0.03,
                  },
                },
              },
            },
            {
              id: "10152-lead-6",
              name: "必殺時，追加「以自身攻擊力200%對目標造成傷害」",
              type: 101,
              condition: Condition.ULTIMATE,
              duration: 100,
              _101: {
                value: 2,
                defender: Target.ENEMY,
                damageType: DamageType.ULTIMATE_ADDON,
                isTrueDamage: false,
                multiple: false,
              },
            },
            {
              id: "10152-lead-7",
              name: "普攻時，追加「以自身攻擊力100%對目標造成傷害」",
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _101: {
                value: 1,
                defender: Target.ENEMY,
                damageType: DamageType.BASIC_ADDON,
                isTrueDamage: false,
                multiple: false,
              },
            },
          ];
        });
      }

      if (attributeCount.length === 3) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10152-lead-3",
              name: "攻擊力增加75%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 0.75,
              },
            },
            {
              id: "10152-lead-4",
              name: "必殺時，觸發「使目標受到光屬性傷害增加3%(最多15層)」",
              type: 4,
              condition: Condition.ULTIMATE,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: "10152-lead-4-1",
                target: Target.ENEMY,
                applySkill: {
                  id: "10152-lead-4-1",
                  name: "受到光屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10152-lead-5-1",
                    name: "受到光屬性傷害增加",
                    stack: 1,
                    maxStack: 15,
                    affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                    value: 0.03,
                  },
                },
              },
            },
            {
              id: "10152-lead-5",
              name: "必殺時，觸發「使目標受到闇屬性傷害增加3%(最多15層)」",
              type: 4,
              condition: Condition.ULTIMATE,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: "10152-lead-5-1",
                target: Target.ENEMY,
                applySkill: {
                  id: "10152-lead-5-1",
                  name: "受到闇屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10152-lead-5-1",
                    name: "受到闇屬性傷害增加",
                    stack: 1,
                    maxStack: 15,
                    affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                    value: 0.03,
                  },
                },
              },
            },
            {
              id: "10152-lead-6",
              name: "必殺時，追加「以自身攻擊力200%對目標造成傷害」",
              type: 101,
              condition: Condition.ULTIMATE,
              duration: 100,
              _101: {
                value: 2,
                defender: Target.ENEMY,
                damageType: DamageType.ULTIMATE_ADDON,
                isTrueDamage: false,
                multiple: false,
              },
            },
            {
              id: "10152-lead-7",
              name: "普攻時，追加「以自身攻擊力100%對目標造成傷害」",
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _101: {
                value: 1,
                defender: Target.ENEMY,
                damageType: DamageType.BASIC_ADDON,
                isTrueDamage: false,
                multiple: false,
              },
            },
          ];
        });
      }
      break;
    }
    // "10153": "純真殺意 撒旦",
    // "10154": "甜蜜女僕 星空奈奈美",
    // "10155": "冷淡女僕 KS-Ⅷ",
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
    case "10157": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10157-lead-1",
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
            id: "10157-lead-2",
            name: "攻擊力增加100%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 1,
            },
          },
          {
            id: "10157-lead-3",
            name: "普攻時，追加『以自身攻擊力15%對目標造成傷害』",
            type: 101,
            duration: 100,
            condition: Condition.BASIC_ATTACK,
            _101: {
              value: 0.15,
              defender: Target.ENEMY,
              damageType: DamageType.BASIC_ADDON,
              multiple: false,
              isTrueDamage: false,
            },
          },
          {
            id: "10157-lead-4",
            name: "必殺時，追加「以自身攻擊力30%對目標造成傷害」",
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 100,
            _101: {
              value: 0.3,
              defender: Target.ENEMY,
              damageType: DamageType.ULTIMATE_ADDON,
              multiple: false,
              isTrueDamage: false,
            },
          },
        ];
      });

      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10157-lead-5",
          name: "攻擊時，根據自身《純真祈願》的層數，觸發「使我方全體造成傷害增加0.75%(最多80層)」",
          type: 8,
          condition: Condition.ATTACK,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10157-ult-1-1",
            triggerSkill: {
              id: "10157-lead-5-1",
              name: "攻擊時，根據自身《純真祈願》的層數，觸發「使我方全體造成傷害增加0.75%(最多80層)」",
              type: 4,
              condition: Condition.NONE,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ALL_ALLIES,
                targetSkill: "10157-lead-5-1-1",
                applySkill: {
                  id: "10157-lead-5-1-1",
                  name: "造成傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10157-lead-5-1-1",
                    name: "造成傷害增加",
                    stack: 1,
                    maxStack: 80,
                    value: 0.0075,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              },
            },
          },
        },
        {
          id: "10157-lead-7",
          name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到傷害增加0.25%(最多80層)」",
          type: 8,
          condition: Condition.ATTACK,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10157-ult-1-1",
            triggerSkill: {
              id: "10157-lead-7-1",
              name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到傷害增加0.25%(最多80層)」",
              type: 4,
              condition: Condition.NONE,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ENEMY,
                targetSkill: "10157-lead-7-1-1",
                applySkill: {
                  id: "10157-lead-7-1-1",
                  name: "受到傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10157-lead-7-1-1",
                    name: "受到傷害增加",
                    stack: 1,
                    maxStack: 80,
                    value: 0.0025,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              },
            },
          },
        },

        {
          id: "10157-lead-8",
          name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到水屬性傷害增加0.25%(最多80層)」",
          type: 8,
          condition: Condition.ATTACK,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10157-ult-1-1",
            triggerSkill: {
              id: "10157-lead-8-1",
              name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到水屬性傷害增加0.25%(最多80層)」",
              type: 4,
              condition: Condition.NONE,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ENEMY,
                targetSkill: "10157-lead-8-1-1",
                applySkill: {
                  id: "10157-lead-8-1-1",
                  name: "受到水屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10157-lead-8-1-1",
                    name: "受到水屬性傷害增加",
                    stack: 1,
                    maxStack: 80,
                    value: 0.0025,
                    affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                  },
                },
              },
            },
          },
        },
        {
          id: "10157-lead-9",
          name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到火屬性傷害增加0.25%(最多80層)」",
          type: 8,
          condition: Condition.ATTACK,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10157-ult-1-1",
            triggerSkill: {
              id: "10157-lead-9-1",
              name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到火屬性傷害增加0.25%(最多80層)」",
              type: 4,
              condition: Condition.NONE,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ENEMY,
                targetSkill: "10157-lead-9-1-1",
                applySkill: {
                  id: "10157-lead-9-1-1",
                  name: "受到火屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10157-lead-9-1-1",
                    name: "受到火屬性傷害增加",
                    stack: 1,
                    maxStack: 80,
                    value: 0.0025,
                    affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                  },
                },
              },
            },
          },
        },
        {
          id: "10157-lead-10",
          name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到風屬性傷害增加0.25%(最多80層)」",
          type: 8,
          condition: Condition.ATTACK,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10157-ult-1-1",
            triggerSkill: {
              id: "10157-lead-10-1",
              name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到風屬性傷害增加0.25%(最多80層)」",
              type: 4,
              condition: Condition.NONE,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ENEMY,
                targetSkill: "10157-lead-10-1-1",
                applySkill: {
                  id: "10157-lead-10-1-1",
                  name: "受到風屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10157-lead-10-1-1",
                    name: "受到風屬性傷害增加",
                    stack: 1,
                    maxStack: 80,
                    value: 0.0025,
                    affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                  },
                },
              },
            },
          },
        },
        {
          id: "10157-lead-11",
          name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到光屬性傷害增加0.25%(最多80層)」",
          type: 8,
          condition: Condition.ATTACK,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10157-ult-1-1",
            triggerSkill: {
              id: "10157-lead-11-1",
              name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到光屬性傷害增加0.25%(最多80層)」",
              type: 4,
              condition: Condition.NONE,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ENEMY,
                targetSkill: "10157-lead-11-1-1",
                applySkill: {
                  id: "10157-lead-11-1-1",
                  name: "受到光屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10157-lead-11-1-1",
                    name: "受到光屬性傷害增加",
                    stack: 1,
                    maxStack: 80,
                    value: 0.0025,
                    affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                  },
                },
              },
            },
          },
        },
        {
          id: "10157-lead-12",
          name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到暗屬性傷害增加0.25%(最多80層)」",
          type: 8,
          condition: Condition.ATTACK,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10157-ult-1-1",
            triggerSkill: {
              id: "10157-lead-12-1",
              name: "攻擊時，根據自身《純真祈願》的層數，觸發「使目標受到暗屬性傷害增加0.25%(最多80層)」",
              type: 4,
              condition: Condition.NONE,
              duration: 100,
              _4: {
                increaseStack: 1,
                target: Target.ENEMY,
                targetSkill: "10157-lead-12-1-1",
                applySkill: {
                  id: "10157-lead-12-1-1",
                  name: "受到暗屬性傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10157-lead-12-1-1",
                    name: "受到暗屬性傷害增加",
                    stack: 1,
                    maxStack: 80,
                    value: 0.0025,
                    affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                  },
                },
              },
            },
          },
        },
      ];
      break;
    }
    // "10158": "聖夜奇謀 布蘭妮"
    // "10159": "喜迎性春 菲歐菈",
    case "10159": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10159-lead-1",
            name: "最大HP增加40%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.5,
            },
          },
        ];
      });

      const onlyTwoAttributes = [
        CharacterAttribute.DARK,
        CharacterAttribute.LIGHT,
        CharacterAttribute.WIND,
        CharacterAttribute.WATER,
        CharacterAttribute.FIRE,
      ];

      G.characters.forEach((character) => {
        if (onlyTwoAttributes.includes(character.attribute)) {
          const index = onlyTwoAttributes.indexOf(character.attribute);
          if (index !== -1) {
            onlyTwoAttributes.splice(
              onlyTwoAttributes.indexOf(character.attribute),
              1,
            );
          }
        }
      });
      if (onlyTwoAttributes.length === 3) {
        G.characters.forEach((_, index) => {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10159-lead-2",
              name: "攻擊力增加80%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 0.8,
              },
            },
            {
              id: "10159-lead-3",
              name: "造成傷害增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.3,
              },
            },

            {
              id: "10159-lead-4",
              name: "使自身必殺技傷害增加70%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
                value: 0.7,
              },
            },
            {
              id: "10159-lead-5",
              name: "必殺時，觸發「使目標受到水、闇屬性傷害增加4%(最多12層)」",
              type: 21,
              condition: Condition.ULTIMATE,
              duration: 100,
              _21: {
                trigger: [
                  {
                    id: "10159-lead-5-1",
                    name: "必殺時，觸發「使目標受到水屬性傷害增加4%(最多12層)」",
                    type: 4,
                    condition: Condition.ULTIMATE,
                    duration: 100,
                    _4: {
                      increaseStack: 1,
                      targetSkill: "10159-lead-5-1-1",
                      target: Target.ENEMY,
                      applySkill: {
                        id: "10159-lead-5-1-1",
                        name: "受到水屬性傷害增加4%",
                        type: 3,
                        condition: Condition.NONE,
                        duration: 100,
                        _3: {
                          id: "10159-lead-5-1-1",
                          name: "受到傷害增加4%",
                          value: 0.04,
                          stack: 1,
                          maxStack: 12,
                          affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                        },
                      },
                    },
                  },
                  {
                    id: "10159-lead-5-2",
                    name: "必殺時，觸發「使目標受到闇屬性傷害增加4%(最多12層)」",
                    type: 4,
                    condition: Condition.ULTIMATE,
                    duration: 100,
                    _4: {
                      increaseStack: 1,
                      targetSkill: "10159-lead-5-2-1",
                      target: Target.ENEMY,
                      applySkill: {
                        id: "10159-lead-5-2-1",
                        name: "受到闇屬性傷害增加4%",
                        type: 3,
                        condition: Condition.NONE,
                        duration: 100,
                        _3: {
                          id: "10159-lead-5-2-1",
                          name: "受到傷害增加4%",
                          value: 0.04,
                          stack: 1,
                          maxStack: 12,
                          affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ];
        });
      }

      G.characters.forEach((character, index) => {
        if (character.class === CharacterClass.HEALER) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10159-lead-1",
              name: "防禦時，觸發「以自身攻擊力50%每回合對我方全體進行治療(1回合)」",
              type: 12,
              condition: Condition.GUARD,
              duration: 100,
              _12: {
                value: 0.5,
                duration: 1,
                target: Target.ALL_ALLIES,
              },
            },
          ];
        }
      });
      break;
    }

    // "10161": "舞焰赤龍 薩夏",
    case "10161": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10161-lead-1",
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
            id: "10161-lead-2",
            name: "攻擊力增加100%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 1,
            },
          },
          {
            id: "10161-lead-3",
            name: "造成傷害減少200%(持續型傷害不受影響)",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.DECREASE_DMG,
              value: 2,
            },
          },
        ];
      });

      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10161-lead-4",
          name: "每Wave第1回合時，觸發《點燃火焰山》",
          type: 21,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "10161-lead-4-1",
                name: "觸發《點燃火焰山》",
                type: 11,
                condition: Condition.NONE,
                duration: 100,
                _11: {
                  target: Target.ALL_ENEMIES,
                  applySkill: [
                    {
                      id: "10161-lead-4-1-1",
                      name: "使敵方全體受到持續型傷害增加200%(50回合)",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 50,
                      _0: {
                        affectType: AffectType.INCREASE_DMG_OVER_TIME_RECEIVED,
                        value: 2,
                      },
                    },
                    {
                      id: "10161-lead-4-1-2",
                      name: "使敵方全體受到傷害增加100%(50回合)",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 50,
                      _0: {
                        affectType: AffectType.INCREASE_DMG_RECEIVED,
                        value: 1,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ];
      break;
    }
    // "10162": "虔信神祀 艾可",
    // "10163": "夜之影 凱薩",
    case "10163": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10163-lead-1",
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
            id: "10163-lead-2",
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

      G.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10163-lead-3",
              name: "免疫必殺技CD變動效果",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.IMMUNE_CD_CHANGE,
                value: 0,
              },
            },
            {
              id: "10163-lead-4",
              name: "防禦時，觸發「使我方全體造成傷害增加20%(2回合)」",
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.ALL_ALLIES,
                applySkill: [
                  {
                    id: "10163-lead-4-1",
                    name: "造成傷害增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.2,
                      affectType: AffectType.INCREASE_DMG,
                    },
                  },
                ],
              },
            },
            {
              id: "10163-lead-5",
              name: "防禦時，觸發「使自身必殺技傷害增加30%(2回合)」",
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10163-lead-5-1",
                    name: "必殺技傷害增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.3,
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                    },
                  },
                ],
              },
            },
            {
              id: "10163-lead-6",
              name: "防禦時，觸發「使自身攻擊力增加40%(2回合)」",
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10163-lead-6-1",
                    name: "攻擊力增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      value: 0.4,
                      affectType: AffectType.INCREASE_ATK,
                    },
                  },
                ],
              },
            },
            {
              id: "10163-lead-7",
              name: "必殺時，觸發「以自身攻擊力55%對目標造成傷害」",
              type: 1,
              condition: Condition.ULTIMATE,
              duration: 100,
              _1: {
                value: 0.55,
                defender: Target.ENEMY,
                damageType: DamageType.TRIGGER,
                multiple: false,
              },
            },
          ];
        }
      });
      break;
    }
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
    case "10175": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10175-lead-1",
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

      G.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.WATER ||
          character.attribute === CharacterAttribute.DARK
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10175-lead-2",
              name: "攻擊力增加100%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 1,
              },
            },
          ];
        }
      });
      G.characters[0].buff = [
        ...G.characters[0].buff,
        {
          id: "10175-lead-3",
          name: "每經過3回合時，觸發《大家一起打雪仗～》",
          type: 21,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "10175-lead-3-1",
                name: "使目標受到傷害增加10%(1回合)",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ENEMY,
                  applySkill: [
                    {
                      id: "10175-lead-3-1-1",
                      name: "受到傷害增加10%(1回合)",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 0.1,
                        affectType: AffectType.INCREASE_DMG_RECEIVED,
                      },
                    },
                  ],
                },
              },
              {
                id: "10175-Lead-3-2",
                name: "使我方全體造成傷害增加20%(最多4層)",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10175-Lead-3-2-1",
                  target: Target.ALL_ALLIES,
                  applySkill: {
                    id: "10175-Lead-3-2-1",
                    name: "造成傷害增加",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10175-Lead-3-2-1",
                      name: "造成傷害增加",
                      stack: 1,
                      maxStack: 4,
                      affectType: AffectType.INCREASE_DMG,
                      value: 0.2,
                    },
                  },
                },
              },
              {
                id: "10175-lead-3-3",
                name: "使我方全體獲得必殺時，追加「以自身攻擊力200%對目標造成傷害」(1回合)",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ALL_ALLIES,
                  applySkill: [
                    {
                      id: "10175-Lead-3-3-1",
                      name: "必殺時，追加「以自身攻擊力200%對目標造成傷害」",
                      type: 101,
                      condition: Condition.ULTIMATE,
                      duration: 1,
                      _101: {
                        value: 2,
                        defender: Target.ENEMY,
                        damageType: DamageType.ULTIMATE_ADDON,
                        multiple: false,
                        isTrueDamage: false,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ];
      break;
    }
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
