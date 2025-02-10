import {
  AffectType,
  Condition,
  DamageType,
  SkillStackCondition,
  Target,
} from "@/types/Skill";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "@/types/Character";
import { GameState } from "../GameState";

export function triggerLead(gameState: GameState) {
  const leader = gameState.characters[0].id;
  switch (leader) {
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
    case "10023": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10023-Lead-1",
            name: "最大HP增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.1,
            },
          },
          {
            id: "10023-Lead-2",
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
      gameState.characters.forEach((_, index) => {
        if (index !== 0) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10023-Lead-3",
              name:
                "防禦時，觸發「使我方站位1獲得1層《編制重整》(最多4層)」(50回合)",
              type: 19,
              condition: Condition.GUARD,
              duration: 50,
              _19: {
                target: Target.POSITION_1,
                targetSkill: "10023-Lead-3-1",
                increaseStack: 1,
                applySkill: {
                  id: "10023-Lead-3-1",
                  name: "編制重整",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10023-Lead-3-1",
                    name: "編制重整",
                    stack: 1,
                    maxStack: 4,
                    value: 0,
                    affectType: AffectType.NONE,
                  },
                },
                checkActivation: [
                  {
                    characterId: "10023",
                    checkSkillId: "10023-Lead-3-1",
                    skillStackCondition: SkillStackCondition.HIGHER,
                    activateIfStack: 3,
                    activateSkillId: "10023-Lead-5",
                  },
                ],
              },
            },
          ];
        }
      });
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "10023-Lead-4",
          name: "每經過1回合時，觸發「清除自身《編制重整》的所有層數」",
          type: 20,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _20: {
            target: Target.ALL_ALLIES,
            targetChar: "10023",
            targetSkill: "10023-Lead-3-1",
            clearAll: true,
          },
        },
        {
          id: "10023-Lead-5",
          name: "防禦時，觸發『使自身獲得1層《轉進》(最多1層)』",
          type: 19,
          condition: Condition.GUARD,
          duration: 100,
          deactivated: true,
          _19: {
            target: Target.SELF,
            targetSkill: "10023-Lead-5-1",
            increaseStack: 1,
            applySkill: {
              id: "10023-Lead-5-1",
              name: "轉進",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10023-Lead-5-1",
                name: "轉進",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "10023",
                checkSkillId: "10023-Lead-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-Lead-6",
              },
              {
                characterId: "10023",
                checkSkillId: "10023-Lead-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-Lead-7",
              },
              {
                characterId: "10023",
                checkSkillId: "10023-Lead-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-Lead-8",
              },
              {
                characterId: "10023",
                checkSkillId: "10023-Lead-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-Lead-9",
              },
              {
                characterId: "10023",
                checkSkillId: "10023-Lead-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-Lead-10",
              },
            ],
          },
        },
        {
          id: "10023-Lead-6",
          name:
            "(反噬的犬嚎) 必殺時，追加「以自身攻擊力25%使自身以外的我方全體攻擊力增加(1回合)」",
          type: 106,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _106: {
            value: 0.25,
            affectType: AffectType.RAW_ATK,
            target: Target.ALL_EXCEPT_SELF,
            duration: 1,
            base: false,
          },
        },
        {
          id: "10023-Lead-7",
          name: "(反噬的犬嚎) 必殺時，追加「使我方全體造成傷害增加50%(1回合)」",
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _111: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10023-Lead-7-1",
                name: "我方全體造成傷害增加50%(1回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.5,
                },
              },
            ],
          },
        },
        {
          id: "10023-Lead-8",
          name:
            "(反噬的犬嚎) 必殺時，追加「使我方全體必殺技傷害增加50%(1回合)」",
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _111: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10023-Lead-8-1",
                name: "必殺技傷害增加50%(1回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                  value: 0.5,
                },
              },
            ],
          },
        },
        {
          id: "10023-Lead-9",
          name: "(反噬的犬嚎) 必殺時，追加「使目標受到傷害增加50%(1回合)」",
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _111: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "10023-Lead-9-1",
                name: "受到傷害增加50%(1回合)",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                  value: 0.5,
                },
              },
            ],
          },
        },
        {
          id: "10023-Lead-10",
          name: "(反噬的犬嚎) 必殺時，觸發「清除自身《轉進》的所有層數」",
          type: 23,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _23: {
            targetChar: "10023",
            clearSkill: ["10023-Lead-5-1"],
            targetSkill: [
              "10023-Lead-5",
              "10023-Lead-6",
              "10023-Lead-7",
              "10023-Lead-8",
              "10023-Lead-9",
              "10023-Lead-10",
            ],
          },
        },
      ];

      break;
    }
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
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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
          name:
            "必殺時，觸發「使自身以外我方全體獲得『必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)』、『普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)』」",
          type: 21,
          condition: Condition.ULTIMATE,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "10044-lead-5-1",
                name:
                  "使自身以外我方全體獲得『必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)』、『普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)』」",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ALL_EXCEPT_SELF,
                  applySkill: [
                    {
                      id: "10044-lead-5-1-1",
                      name:
                        "必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)",
                      type: 101,
                      condition: Condition.ULTIMATE,
                      duration: 1,
                      _101: {
                        value: 1,
                        target: Target.ENEMY,
                        damageType: DamageType.ULTIMATE_ADDON,
                        action: CharacterAction.ULTIMATE,
                      },
                    },
                    {
                      id: "10044-lead-5-1-2",
                      name:
                        "普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)",
                      type: 101,
                      condition: Condition.BASIC_ATTACK,
                      duration: 2,
                      _101: {
                        value: 0.25,
                        target: Target.ENEMY,
                        damageType: DamageType.BASIC_ADDON,
                        action: CharacterAction.BASIC,
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
          name:
            "每經過4回合，觸發「使敵方全體受到火、水、風、光、闇屬性傷害增加70%(2回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _11: {
            //TODO this is for Enemies
            target: Target.ENEMY,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
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
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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
          type: 16,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _16: {
            value: 0.06,
            affectType: AffectType.RAW_ATK,
            target: Target.ALL_ALLIES,
            duration: 1,
          },
        },
        {
          id: "10077-Lead-3",
          name: "必殺時，觸發「以自身最大HP8%使我方全體攻擊力增加(1回合)」",
          type: 16,
          condition: Condition.ULTIMATE,
          duration: 100,
          _16: {
            value: 0.08,
            affectType: AffectType.RAW_ATK,
            target: Target.ALL_ALLIES,
            duration: 1,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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

      gameState.characters.forEach((character, index) => {
        if (character.attribute === CharacterAttribute.WATER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
                target: Target.ENEMY,
                damageType: 0,
                action: CharacterAction.BASIC,
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
      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,

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
              name:
                "攻擊時，觸發「使我方站位1的隊員造成傷害增加5%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」",
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
                      target: Target.ENEMY,
                      damageType: 0,
                      action: CharacterAction.BASIC,
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
                      target: Target.ENEMY,
                      damageType: 1,
                      action: CharacterAction.BASIC,
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
      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,

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
              name:
                "攻擊時，觸發「使我方站位1的隊員造成傷害增加5%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力20%對目標造成傷害』(1回合)」",
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
                      target: Target.ENEMY,
                      damageType: 0,
                      action: CharacterAction.BASIC,
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
                      target: Target.ENEMY,
                      damageType: 1,
                      action: CharacterAction.ULTIMATE,
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
    // "10082": "花嫁 撒旦",
    // "10083": "夢天堂店長 咲野夢",
    // "10084": "貓娘Vtuber 杏仁咪嚕",
    // "10085": "花魁 香奈",
    // "10088": "雙星之紅 安絲蒂",
    // "10089": "銀河之藍 安絲娜",
    // "10090": "夏日 聖米勒",
    // "10091": "夏日 黑白諾艾莉",
    // "10092": "夏日 阿爾蒂雅",
    case "10092": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
      //《追浪》
      //每經過3回合，觸發「使自身造成傷害增加125%(1回合)、使敵方全體受到傷害增加50%(1回合)」
      //
      //《啟乘》
      //每經過6回合，觸發「使自身造成必殺技傷害增加125%(1回合)」
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
        gameState.characters.forEach((character) => {
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
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
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
        gameState.characters.forEach((character) => {
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
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
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

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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
      gameState.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.FIRE ||
          character.attribute === CharacterAttribute.LIGHT
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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
      gameState.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.FIRE ||
          character.attribute === CharacterAttribute.LIGHT
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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

        gameState.characters.forEach((character) => {
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
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "10117-lead-7",
                  name: "普攻時，追加「以自身攻擊力40%對目標造成傷害」",
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.4,
                    target: Target.ENEMY,
                    damageType: DamageType.BASIC_ADDON,
                    action: CharacterAction.BASIC,
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
                        name:
                          "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
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
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "10117-lead-9",
                  name: "普攻時，追加「以自身攻擊力40%對目標造成傷害」",
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.4,
                    target: Target.ENEMY,
                    damageType: DamageType.BASIC_ADDON,
                    action: CharacterAction.BASIC,
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
                      name:
                        "普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」",
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
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "518-lead-1",
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
      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "518-lead-2",
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
        gameState.characters.forEach((character, index) => {
          if (character.attribute === CharacterAttribute.LIGHT) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "518-lead-3",
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            id: "518-lead-4",
            name: "每經過4回合，觸發「使目標受到傷害增加50%(1回合)」",
            type: 11,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 4,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "518-lead-4-1",
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
            id: "518-lead-5",
            name: "被治療時，觸發「使我方全體造成傷害增加15%(1回合)」",
            type: 11,
            condition: Condition.GET_HEAL,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "518-lead-5-1",
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
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
              name:
                "必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」",
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
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
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
                name:
                  "必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」",
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
    case "10129": {
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "10129-Lead-1",
          name: "最大HP增加30%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.MAX_HP,
            value: 0.3,
          },
        },
        // 自身護盾效果增加50%
        {
          id: "10129-Lead-2",
          name:
            "每Wave的第一回合時，觸發「使敵方全體受到傷害增加50%(最多1層)」",
          type: 21,
          condition: Condition.ON_TURN_START,
          conditionTurn: 1,
          duration: 1,
          _21: {
            trigger: [
              {
                id: "10129-lead-2-1",
                name:
                  "每Wave的第一回合時，觸發「使敵方全體受到傷害增加50%(最多1層)」",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10129-lead-2-1-1",
                  target: Target.ENEMY,
                  applySkill: {
                    id: "10129-lead-2-1-1",
                    name: "受到傷害增加50%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10129-lead-2-1-1",
                      name: "受到傷害增加50%",
                      value: 0.5,
                      stack: 1,
                      maxStack: 1,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                    },
                  },
                },
              },
            ],
          },
        },
      ];

      const fourWindCondition = [
        CharacterAttribute.WIND,
        CharacterAttribute.WIND,
        CharacterAttribute.WIND,
        CharacterAttribute.WIND,
      ];
      gameState.characters.forEach((character) => {
        if (fourWindCondition.includes(character.attribute)) {
          const index = fourWindCondition.indexOf(character.attribute);
          if (index !== -1) {
            fourWindCondition.splice(
              fourWindCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });
      if (fourWindCondition.length === 0) {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10129-Lead-3",
              name: "攻擊力增加130%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 1.3,
              },
            },
            {
              id: "10129-Lead-4",
              name: "必殺技傷害增加50%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
                value: 0.5,
              },
            },
            {
              id: "10129-Lead-5",
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
        });
      }
      break;
    }
    // "10130": "聖夜喧嘩 莎琳娜",
    // "10131": "時御者 伊娜絲",
    // "10132": "幽夜女爵 卡蒂雅",
    // "10133": "甜心偶像 星空奈奈美",
    // "10134": "閃耀歌姬 黑白諾艾莉",
    case "10134": {
      // 我方全體最大HP增加35%
      // 自身必殺時，觸發「《驅散悲傷之光☆》」
      // 我方全體獲得「我方隊伍中正好有4種屬性隊員時，發動 《偶像勁舞團》」
      //
      // 《驅散悲傷之光☆》
      // 使敵方全體受到傷害增加30%(1回合)
      // 使我方全體攻擊者、妨礙者獲得「必殺時，追加『以自身攻擊力80對目標造成傷害』(1回合)」
      //
      // 《偶像勁舞團》
      // 攻擊力增加125%
      // 受到治療量增加30%
      break;
    }
    // "10135": "偶像經紀人 梅絲米奈雅",
    // "10136": "賞金獵人 安潔娜爾",
    case "10136": {
      gameState.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.WATER ||
          character.attribute === CharacterAttribute.WIND
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10136-Lead-1",
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
              id: "10136-Lead-2",
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
        if (character.attribute === CharacterAttribute.WATER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10136-Lead-3",
              name: "普攻傷害增加80%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DMG,
                value: 0.8,
              },
            },
            {
              id: "10136-Lead-4",
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
          character.attribute === CharacterAttribute.WIND &&
          (character.class === CharacterClass.HEALER ||
            character.class === CharacterClass.SUPPORT)
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10136-Lead-5",
              // 攻擊時，觸發「使我方水屬性的角色造成傷害增加30%(1回合)」
              name: "《集團追獵》",
              type: 11,
              condition: Condition.NONE,
              duration: 100,
              _11: {
                target: Target.WATER,
                applySkill: [
                  {
                    id: "10136-Lead-5-1",
                    name: "造成傷害增加30%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.3,
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
    // "10137": "春情白兔 鈴蘭",
    case "10137": {
      gameState.characters.forEach((character, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
      gameState.characters.forEach((character) => {
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
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
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
                target: Target.ENEMY,
                damageType: 0,
                action: CharacterAction.BASIC,
              },
            },
          ];
        });
      }
      break;
    }
    // "10144": "夏日 凱薩",
    case "10144": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
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
          name:
            "每Wave的第1回合時，觸發『使自身《婚紗兵裝。能量汲取》的疊層效果達到滿層』",
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

      gameState.characters.forEach((_, index) => {
        if (index !== 0) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
              name:
                "防禦時，觸發『以自身基礎攻擊力75%使我方站位位攻擊力增加』(1回合)",
              type: 6,
              condition: Condition.GUARD,
              duration: 100,
              _6: {
                value: 0.75,
                target: Target.POSITION_1,
                base: true,
                affectType: AffectType.RAW_ATK,
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
              name:
                "必殺時，觸發『以自身基礎攻擊力75%使我方站位位攻擊力增加』(1回合)",
              type: 6,
              condition: Condition.ULTIMATE,
              duration: 100,
              _6: {
                value: 0.75,
                target: Target.POSITION_1,
                base: true,
                affectType: AffectType.RAW_ATK,
                duration: 1,
              },
            },
          ];
        }
      });
      break;
    }
    // "10145": "夏日 撒旦",
    case "10145": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10145-lead-1",
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
            id: "10145-lead-2",
            name: "攻擊力增加70%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.7,
            },
          },
          {
            id: "10145-lead-3",
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
            id: "10145-lead-4",
            name: "必殺傷害增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
              value: 0.2,
            },
          },
        ];
      });
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "10145-lead-5",
          name: "攻擊時，觸發「以自身最大HP5%使我方全體攻擊力增加(2回合)」",
          type: 16,
          condition: Condition.ATTACK,
          duration: 100,
          _16: {
            value: 0.05,
            affectType: AffectType.RAW_ATK,
            target: Target.ALL_ALLIES,
            duration: 2,
          },
        },
        {
          id: "10145-lead-6",
          name: "被攻擊時，觸發「使我方全體造成傷害增加1.33%(最多15層)」",
          type: 4,
          condition: Condition.RECEIVED_ATTACK,
          duration: 100,
          _4: {
            target: Target.ALL_ALLIES,
            increaseStack: 1,
            targetSkill: "10145-lead-6-1",
            applySkill: {
              id: "10145-lead-6-1",
              name: "造成傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10145-lead-6-1",
                stack: 1,
                maxStack: 15,
                value: 0.0133,
                name: "造成傷害增加1.33%",
                affectType: AffectType.INCREASE_DMG,
              },
            },
          },
        },
        {
          id: "10145-lead-7",
          name: "被攻擊時，觸發「使敵方全體受到傷害增加1.33%(最多15層)」",
          type: 4,
          condition: Condition.RECEIVED_ATTACK,
          duration: 100,
          _4: {
            target: Target.ENEMY,
            increaseStack: 1,
            targetSkill: "10145-lead-7-1",
            applySkill: {
              id: "10145-lead-7-1",
              name: "造成傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10145-lead-7-1",
                stack: 1,
                maxStack: 15,
                value: 0.0133,
                name: "受到傷害",
                affectType: AffectType.INCREASE_DMG_RECEIVED,
              },
            },
          },
        },
      ];
      break;
    }
    // "10146": "魔獸獵手 神無雪",
    case "10146": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10146-lead-1",
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
            id: "10146-lead-2",
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
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "10146-lead-3",
          name: "必殺時，追加『以自身攻擊力80%對目標造成傷害",
          type: 101,
          condition: Condition.ULTIMATE,
          duration: 100,
          _101: {
            value: 0.8,
            action: CharacterAction.ULTIMATE,
            target: Target.ENEMY,
            damageType: DamageType.ULTIMATE_ADDON,
          },
        },
      ];

      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10146-lead-4",
              name:
                "第一回合時，觸發「以自身基礎攻擊力10%使我方全體攻擊力增加(50回合)」",
              type: 6,
              condition: Condition.ON_TURN_START,
              conditionTurn: 1,
              duration: 100,
              _6: {
                value: 0.1,
                affectType: AffectType.RAW_ATK,
                target: Target.ALL_ALLIES,
                duration: 50,
                base: true,
              },
            },
            {
              id: "10146-lead-5",
              name: "第五回合時，觸發「使自身必殺技傷害增加50%(最多1層)」",
              type: 11,
              condition: Condition.ON_SPECIFIC_TURN,
              conditionTurn: 5,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10146-lead-5-1",
                    name: "「必殺技傷害增加50%(最多1層)」",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10146-lead-5-1",
                      name: "「必殺技傷害增加50%(最多1層)」",
                      stack: 1,
                      maxStack: 1,
                      value: 0.5,
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                    },
                  },
                ],
              },
            },
            {
              id: "10146-lead-6",
              name: "第九回合時，觸發「使敵方全體受到傷害增加33%(最多3層)」",
              type: 21,
              condition: Condition.ON_SPECIFIC_TURN,
              conditionTurn: 9,
              duration: 100,
              _21: {
                trigger: [
                  {
                    id: "10146-lead-6-1",
                    name:
                      "第九回合時，觸發「使敵方全體受到傷害增加33%(最多3層)」",
                    type: 4,
                    condition: Condition.NONE,
                    duration: 100,
                    _4: {
                      increaseStack: 1,
                      target: Target.ENEMY,
                      targetSkill: "10146-lead-6-1-1",
                      applySkill: {
                        id: "10146-lead-6-1-1",
                        name: "受到傷害增加33%(最多3層)",
                        type: 3,
                        condition: Condition.NONE,
                        duration: 100,
                        _3: {
                          id: "10146-lead-6-1-1",
                          name: "受到傷害增加33%(最多3層)",
                          stack: 1,
                          maxStack: 3,
                          value: 0.33,
                          affectType: AffectType.INCREASE_DMG_RECEIVED,
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
      break;
    }
    // "10147": "魔物終結 鬼醉木",
    // "10148": "酩酊狂歡 靜",
    case "10148": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10148-lead-1",
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
            id: "10148-lead-2",
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
      const twoHealerCondition = [CharacterClass.HEALER, CharacterClass.HEALER];

      gameState.characters.forEach((character) => {
        if (twoHealerCondition.includes(character.class)) {
          const index = twoHealerCondition.indexOf(character.class);
          if (index !== -1) {
            twoHealerCondition.splice(
              twoHealerCondition.indexOf(character.class),
              1,
            );
          }
        }
      });
      if (twoHealerCondition.length === 0) {
        gameState.characters.forEach((character, index) => {
          if (
            character.class === CharacterClass.ATTACKER ||
            character.class === CharacterClass.OBSTRUCTER
          ) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
            ];
          }
        });
      }
      // 我方全體治療者獲得「我方隊伍治療者角色有2人以上時，發動《調皮狐娘》」
      //
      // 《再來一杯～》
      // 普攻時，追加「以自身攻擊力10%對我方全體進行治療」
      //
      // 《調皮狐娘》
      // 造成傷害增加30%
      // 普攻傷害增加60%
      // 普攻時，追加「以自身攻擊力100%對目標造成傷害」
      // 攻擊時，觸發「《惡作劇時間》」
      //
      // 《惡作劇時間》
      // 使我方站位1獲得「普攻時，追加『以自身攻擊力25%對目標造成傷害』(1回合)」
      // 使我方全體造成傷害增加5%(4回合)
      // 使我方全體普攻傷害增加6.25%(4回合)
      break;
    }
    // "10149": "千年靈狐 椿",
    case "10149": {
      // 使我方全體妨礙者免疫必殺技CD變動效果 NO IMPLEMENT
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10149-lead-1",
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
            id: "10149-lead-2",
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

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: "10149-lead-3",
          name: "必殺時，觸發「使目標受到火屬性傷害增加100%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10149-lead-3-1",
            target: Target.ENEMY,
            applySkill: {
              id: "10149-lead-3-1",
              name: "受到火屬性傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10149-lead-3-1",
                name: "受到火屬性傷害增加",
                stack: 1,
                maxStack: 1,
                affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                value: 1,
              },
            },
          },
        },
        {
          id: "10149-lead-4",
          name: "必殺時，觸發「使目標受到妨礙者傷害增加50%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10149-lead-4-1",
            target: Target.ENEMY,
            applySkill: {
              id: "10149-lead-4-1",
              name: "受到妨礙者傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10149-lead-4-1",
                name: "受到妨礙者傷害增加",
                stack: 1,
                maxStack: 2,
                affectType: AffectType.INCREASE_OBSTRUCTER_DMG_RECEIVED,
                value: 0.5,
              },
            },
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.OBSTRUCTER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,

            {
              id: "10149-lead-5",
              name: "防禦時，觸發《妖術達人》",
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.SELF,
                applySkill: [
                  {
                    id: "10149-lead-5-1",
                    name: "攻擊力增加50%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      affectType: AffectType.INCREASE_ATK,
                      value: 0.5,
                    },
                  },
                  {
                    id: "10149-lead-5-2",
                    name: "必殺技傷害增加60%",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                      value: 0.6,
                    },
                  },
                  {
                    id: "10149-lead-5-3",
                    name: "必殺時，追加「以自身攻擊力100%對目標造成傷害」",
                    type: 101,
                    condition: Condition.ULTIMATE,
                    duration: 2,
                    _101: {
                      value: 1,
                      target: Target.ENEMY,
                      damageType: DamageType.ULTIMATE_ADDON,
                      action: CharacterAction.ULTIMATE,
                    },
                  },
                ],
              },
            },
          ];
        }
      });

      const twoFireCondition = [
        CharacterAttribute.FIRE,
        CharacterAttribute.FIRE,
      ];

      gameState.characters.forEach((character) => {
        if (twoFireCondition.includes(character.attribute)) {
          const index = twoFireCondition.indexOf(character.attribute);
          if (index !== -1) {
            twoFireCondition.splice(
              twoFireCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (twoFireCondition.length === 0) {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10149-lead-6",
              name: "攻擊力減少250%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.DECREASE_ATK,
                value: 2.5,
              },
            },
            {
              id: "10149-lead-7",
              name: "必殺技傷害減少250%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.DECREASE_ULTIMATE_DMG,
                value: 2.5,
              },
            },
            // 使自身被治療時回復量減少250%
          ];
        });
      }
      break;
    }
    // "10150": "勇者兔女郎 神田綾音",
    case "10150": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10150-lead-1",
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
            id: "10150-lead-2",
            name: "攻擊力增加80%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.8,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            id: "10150-lead-3",
            name:
              "每Wave的第1回合時，觸發「使敵方全體暗屬性角色受到光屬性傷害增加50%(50回合)」",
            type: 11,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _11: {
              target: Target.DARK_ENEMY,
              applySkill: [
                {
                  id: "10150-lead-3-1",
                  name: "受到光屬性傷害增加50%",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 50,
                  _0: {
                    affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                    value: 0.5,
                  },
                },
              ],
            },
          },
          {
            id: "10150-lead-4",
            name: "必殺傷害增加",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
              value: 0.4,
            },
          },
          {
            id: "10150-lead-5",
            name: "必殺時，追加『以自身攻擊力66.6%對目標造成傷害』",
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 100,
            _101: {
              value: 0.666,
              target: Target.ENEMY,
              damageType: DamageType.ULTIMATE_ADDON,
              action: CharacterAction.ULTIMATE,
            },
          },
        ];

        //TODO 屬性相剋效果減少100%
        //免疫必殺技CD變動效果

        gameState.characters.forEach((character, index) => {
          if (character.attribute === CharacterAttribute.LIGHT) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10150-lead-6",
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
                id: "10150-lead-7",
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
                id: "10150-lead-8",
                name: "普攻時，追加「以自身攻擊力18%對目標造成傷害」",
                type: 101,
                condition: Condition.BASIC_ATTACK,
                duration: 100,
                _101: {
                  value: 0.18,
                  target: Target.ENEMY,
                  damageType: DamageType.BASIC_ADDON,
                  action: CharacterAction.BASIC,
                },
              },
              // 攻擊時，觸發「使目標受到傷害增加0.4%(最多50層)，再使目標受到光屬性傷害增加0.6%(最多50層)」
              {
                id: "10150-lead-9",
                name: "攻擊時，觸發「使目標受到傷害增加0.4%(最多50層)」",
                type: 4,
                condition: Condition.ATTACK,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10150-lead-9-1",
                  target: Target.ENEMY,
                  applySkill: {
                    id: "10150-lead-9-1",
                    name: "受到傷害增加",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10150-lead-9-1",
                      name: "受到傷害增加",
                      stack: 1,
                      maxStack: 50,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                      value: 0.004,
                    },
                  },
                },
              },
              {
                id: "10150-lead-10",
                name: "攻擊時，觸發「使目標受到光屬性傷害增加0.6%(最多50層)」",
                type: 4,
                condition: Condition.ATTACK,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10150-lead-10-1",
                  target: Target.ENEMY,
                  applySkill: {
                    id: "10150-lead-10-1",
                    name: "受到傷害增加",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10150-lead-10-1",
                      name: "受到傷害增加",
                      stack: 1,
                      maxStack: 50,
                      affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                      value: 0.006,
                    },
                  },
                },
              },
            ];
          }
        });
      }
      break;
    }
    // "10151": "性感兔女郎 伊布力斯",
    case "10151": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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
        ];
      });
      // 使我方全體攻擊者免疫必殺技CD變動效果

      const twoAttributeCondition = [
        CharacterAttribute.DARK,
        CharacterAttribute.LIGHT,
        CharacterAttribute.WIND,
        CharacterAttribute.WATER,
        CharacterAttribute.FIRE,
      ];
      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((character, index) => {
          if (character.attribute === CharacterAttribute.WIND) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10151-lead-3",
                name:
                  "當我方隊伍恰好有2種屬性角色時，發動『第1回合時，觸發《本小姐不需要運氣》",
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
                      name:
                        "使我方全體攻擊者獲得「必殺時，追加『以自身攻擊力25%對目標造成傷害』(50回合)」",
                      type: 11,
                      condition: Condition.NONE,
                      duration: 50,
                      _11: {
                        target: Target.ATTACKER,
                        applySkill: [
                          {
                            id: "10151-lead-3-3-1",
                            name:
                              "必殺時，追加『以自身攻擊力25%對目標造成傷害』",
                            type: 101,
                            condition: Condition.ULTIMATE,
                            duration: 50,
                            _101: {
                              value: 0.25,
                              target: Target.ENEMY,
                              damageType: DamageType.ULTIMATE_ADDON,
                              action: CharacterAction.ULTIMATE,
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
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10151-lead-4",
                name:
                  "當我方隊伍恰好有2種屬性角色時，發動『第1回合時，觸發《絕對的實力能輾壓一切》",
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
                      name:
                        "使我方全體攻擊者獲得「普攻時，追加『以自身攻擊力20%對目標造成傷害』(50回合)」",
                      type: 11,
                      condition: Condition.NONE,
                      duration: 50,
                      _11: {
                        target: Target.ATTACKER,
                        applySkill: [
                          {
                            id: "10151-lead-4-3-1",
                            name:
                              "普攻時，追加『以自身攻擊力20%對目標造成傷害』",
                            type: 101,
                            condition: Condition.BASIC_ATTACK,
                            duration: 50,
                            _101: {
                              value: 0.2,
                              target: Target.ENEMY,
                              damageType: DamageType.BASIC,
                              action: CharacterAction.BASIC,
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
      // 使我方全體最大HP增加50%
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
                target: Target.ENEMY,
                damageType: DamageType.ULTIMATE_ADDON,
                action: CharacterAction.ULTIMATE,
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
                target: Target.ENEMY,
                damageType: DamageType.BASIC_ADDON,
                action: CharacterAction.BASIC,
              },
            },
          ];
        });
      }

      if (attributeCount.length === 3) {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
                target: Target.ENEMY,
                damageType: DamageType.ULTIMATE_ADDON,
                action: CharacterAction.ULTIMATE,
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
                target: Target.ENEMY,
                damageType: DamageType.BASIC_ADDON,
                action: CharacterAction.BASIC,
              },
            },
          ];
        });
      }
      break;
    }
    // "10153": "純真殺意 撒旦",
    case "10153": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10153-lead-1",
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
            id: "10153-lead-2",
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
      const fourDarkCondition = [
        CharacterAttribute.DARK,
        CharacterAttribute.DARK,
        CharacterAttribute.DARK,
        CharacterAttribute.DARK,
      ];

      gameState.characters.forEach((character) => {
        if (fourDarkCondition.includes(character.attribute)) {
          const index = fourDarkCondition.indexOf(character.attribute);
          if (index !== -1) {
            fourDarkCondition.splice(
              fourDarkCondition.indexOf(character.attribute),
              1,
            );
          }
        }
      });

      if (fourDarkCondition.length === 0) {
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            id: "10153-lead-3",
            name:
              "每經過1回合時，觸發「使自身獲得2層《高級萬聖甜點組》(最多6層)」",
            type: 4,
            condition: Condition.ON_SPECIFIC_TURN,
            duration: 1,
            deactivated: false,
            _4: {
              increaseStack: 1,
              targetSkill: "10153-lead-3-1",
              target: Target.SELF,
              applySkill: {
                id: "10153-lead-3-1",
                name: "《高級萬聖甜點組》",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10153-lead-3-1",
                  name: "《高級萬聖甜點組》",
                  stack: 1,
                  maxStack: 6,
                  value: 0,
                  affectType: AffectType.NONE,
                },
              },
            },
          },
          {
            id: "10153-lead-3",
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
            id: "10153-lead-4",
            name: "造成傷害效果增加50%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value: 0.5,
            },
          },
          {
            id: "10153-lead-5",
            name: "被攻擊時，觸發「使目標受到闇屬性傷害增加5%(最多10層)」",
            type: 4,
            condition: Condition.RECEIVED_ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10153-lead-5-1",
              target: Target.ENEMY,
              applySkill: {
                id: "10153-lead-5-1",
                name: "受到闇屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10153-lead-5-1",
                  name: "受到闇屬性傷害增加",
                  stack: 1,
                  maxStack: 10,
                  affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                  value: 0.05,
                },
              },
            },
          },
        ];
      }
      gameState.characters.forEach((_, index) => {
        if (index !== 0) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10153-lead-6",
              name: "攻擊時，觸發「以自身攻擊力20%對目標造成傷害」",
              type: 1,
              condition: Condition.ATTACK,
              duration: 100,
              _1: {
                value: 0.2,
                target: Target.ENEMY,
                damageType: DamageType.TRIGGER,
                action: CharacterAction.ATTACK,
              },
            },
          ];
        }
      });
      break;
    }
    // "10154": "星空奈奈美",
    case "10154": {
      break;
    }
    // "10155": "甜蜜女僕",
    case "10155": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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

      gameState.characters.forEach((character) => {
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
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
                target: Target.ENEMY,
                damageType: DamageType.TRIGGER,
                action: CharacterAction.ATTACK,
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
    case "10156": {
      break;
    }

    // "10157": "純真祈願 牧愛菈"
    case "10157": {
      break;
    }

    // "10158": "聖夜奇謀 布蘭妮"
    case "10158": {
      break;
    }

    // "10159": "喜迎性春 菲歐菈",
    case "10159": {
      break;
    }

    // "10161": "舞焰赤龍 薩夏",
    case "10161": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,

        //每Wave第1回合時，觸發「《點燃火焰山》」
        //
        //《點燃火焰山》
        //
        //使敵方全體受到傷害增加100%(50回合)
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

    // "10175": "翩舞雪花 初華"
    case "10175": {
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
    // "10801": "法斯帝國士兵 賽蓮",
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
    default:
      break;
  }
}
