import {
  AffectType,
  Skill,
  Condition,
  SkillStackCondition,
  SpecialCondition,
  Target,
  DamageType,
} from "@/types/Skill";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "@/types/Character";
import { randomizePos } from "../randomizePos";
import { triggerSkill } from "../triggerSkill";
import { GameState } from "../GameState";
import { p } from "../utils";

export function initPassiveSkill(position: number, gameState: GameState) {
  const id = gameState.characters[position].id;
  const passive4 = gameState.characters[position].passive4;
  const lib = gameState.characters[position].lib;
  switch (id) {
    // "10001": "魔王 巴爾",
    // "10002": "魔王 撒旦",
    // "10003": "魔王 伊布力斯",
    // "10004": "精靈王 賽露西亞",
    case "10004": {
      // 破防还没弄
      if (lib === 0) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10004-passive-1",
            name: '普攻時，觸發"使我方全體普攻傷害增加7.5%(1回合)"效果',
            type: 11,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10004-passive-1-1",
                  name: "普攻傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    value: 0.075,
                    affectType: AffectType.INCREASE_BASIC_DMG,
                  },
                },
              ],
            },
          },
          {
            id: "10004-passive-3",
            name: "必殺時，觸發「使目標受到傷害增加10%(3回合)且防禦狀態解除」",
            type: 111,
            condition: Condition.ULTIMATE,
            duration: 100,
            _111: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "10004-passive-3-1",
                  name: "受到傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 3,
                  _0: {
                    value: 0.1,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
          {
            id: "10004-passive-4",
            name: '每經過3回合，觸發"使我方全體攻擊力增加20%(1回合)"效果',
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10004-passive-4-1",
                  name: "攻擊力增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 3,
                  _0: {
                    value: 0.1,
                    affectType: AffectType.INCREASE_ATK,
                  },
                },
              ],
            },
          },
        ];
      }

      if (lib === 1) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10004-passive-1",
            name: "攻擊時，觸發「使我方全體造成傷害增加20%(1回合)」",
            type: 11,
            condition: Condition.ATTACK,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10004-passive-1-1",
                  name: "造成傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    value: 0.2,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              ],
            },
          },
          {
            id: "10004-passive-2",
            name: "攻擊時，觸發「使我方全體普攻傷害增加30%(1回合)」",
            type: 11,
            condition: Condition.ATTACK,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10004-passive-2-1",
                  name: "普攻傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    value: 0.3,
                    affectType: AffectType.INCREASE_BASIC_DMG,
                  },
                },
              ],
            },
          },
          {
            id: "10004-passive-3",
            name: "必殺時，觸發「使目標受到傷害增加10%(3回合)且防禦狀態解除」",
            type: 111,
            condition: Condition.ULTIMATE,
            duration: 100,
            _111: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "10004-passive-3-1",
                  name: "受到傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 3,
                  _0: {
                    value: 0.1,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
          {
            id: "10004-passive-4",
            name: '每經過3回合，觸發"使我方全體攻擊力增加20%(1回合)"效果',
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10004-passive-4-1",
                  name: "攻擊力增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 3,
                  _0: {
                    value: 0.1,
                    affectType: AffectType.INCREASE_ATK,
                  },
                },
              ],
            },
          },
        ];
      }

      if (lib === 3) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10004-passive-1",
            name: "攻擊時，觸發「使我方全體造成傷害增加20%(1回合)」",
            type: 11,
            condition: Condition.ATTACK,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10004-passive-1-1",
                  name: "造成傷害增加",
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
            id: "10004-passive-2",
            name: "攻擊時，觸發「使我方全體普攻傷害增加30%(1回合)」",
            type: 11,
            condition: Condition.ATTACK,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10004-passive-2-1",
                  name: "普攻傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.3,
                    affectType: AffectType.INCREASE_BASIC_DMG,
                  },
                },
              ],
            },
          },
          {
            id: "10004-passive-3",
            name: "必殺時，觸發「使敵方全體受到傷害增加12.5%(最多2層)且使敵方全體防禦狀態解除」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              target: Target.ALL_ENEMIES,
              targetSkill: "10004-passive-3-1",
              applySkill: {
                id: "10004-passive-3-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10004-passive-3-1",
                  name: "受到傷害增加12.5%",
                  stack: 1,
                  maxStack: 2,
                  value: 0.125,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10004-passive-4",
            name: "必殺時，觸發「使敵方目標受到普攻傷害增加35%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              target: Target.ALL_ENEMIES,
              targetSkill: "10004-passive-4-1",
              applySkill: {
                id: "10004-passive-4-1",
                name: "受到普攻傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10004-passive-4-1",
                  name: "受到普攻傷害增加",
                  stack: 1,
                  maxStack: 2,
                  value: 0.35,
                  affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
                },
              },
            },
          },
        ];

        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10004-passive-5",
              name: "攻擊增加35%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.25,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          ];
        });

        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10004-passive-6",
            name: "第1回合，觸發「使自身必殺技冷卻時間減少6回合」",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              reduceCD: 6,
              target: Target.SELF,
            },
          },
        ];
      }
      if (passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10004-passive4-1",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DMG,
            },
          },
        ];
      }
      break;
    }
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
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10023-passive-1",
          name: "第1回合，觸發「使自身獲得1層《孱弱的假象》(最多1層)」",
          type: 19,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: "10023-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "10023-passive-1-1",
              name: "孱弱的假象",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10023-passive-1-1",
                name: "孱弱的假象",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "10023",
                checkSkillId: "10023-passive-1-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-passive-3",
              },
            ],
          },
        },
        {
          id: "10023-passive-2",
          name: "必殺時，觸發「使自身獲得1層《孱弱的假象》(最多1層)」",
          type: 19,
          condition: Condition.ULTIMATE,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: "10023-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "10023-passive-1-1",
              name: "孱弱的假象",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10023-passive-1-1",
                name: "孱弱的假象",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "10023",
                checkSkillId: "10023-passive-1-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-passive-3",
              },
            ],
          },
        },
        {
          id: "10023-passive-3",
          name: "防禦時，觸發「使自身獲得嘲諷(1回合)」且獲得《反擊》效果」",
          type: 22,
          condition: Condition.GUARD,
          duration: 100,
          deactivated: true,
          _22: {
            increaseStack: 1,
            targetSkill: "10023-passive-3-1",
            target: Target.SELF,
            applySkill: {
              id: "10023-passive-3-1",
              name: "反擊",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10023-passive-3-1",
                name: "反擊",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "10023",
                checkSkillId: "10023-passive-1-1",
                skillStackCondition: SkillStackCondition.EQUAL,
                activateIfStack: 1,
                applySkills: [
                  {
                    id: "10023-passive-3-2",
                    //
                    name: "被攻擊時，觸發「使我方全體造成傷害增加35%(4回合)(1回合)(觸發1次後解除)",
                    type: 11,
                    condition: Condition.RECEIVED_ATTACK,
                    duration: 2,
                    deleteSelf: true,
                    _11: {
                      target: Target.ALL_ALLIES,
                      applySkill: [
                        {
                          id: "10023-passive-3-2",
                          name: "造成傷害增加",
                          type: 0,
                          condition: Condition.NONE,
                          duration: 4,
                          _0: {
                            value: 0.35,
                            affectType: AffectType.INCREASE_DMG,
                          },
                        },
                      ],
                    },
                  },
                  {
                    id: "10023-passive-4",
                    name: "被攻擊時，清除自身的《孱弱的假象》的所有層數」(1回合)(觸發1次後解除)",
                    type: 20,
                    condition: Condition.RECEIVED_ATTACK,
                    duration: 2,
                    deleteSelf: true,
                    _20: {
                      target: Target.ALL_ALLIES,
                      targetChar: "10023",
                      targetSkill: "10023-passive-1-1",
                      clearAll: true,
                    },
                  },
                ],
              },
            ],
          },
        },
        // 防禦時，觸發「使自身獲得嘲諷(1回合)」且獲得《反擊》效果」
        {
          id: "10023-passive-5",
          name: "防禦時，觸發「使自身獲得1層《反攻的時機》(最多1層)」",
          type: 19,
          condition: Condition.GUARD,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: "10023-passive-5-1",
            target: Target.SELF,
            applySkill: {
              id: "10023-passive-5-1",
              name: "反攻的時機",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10023-passive-5-1",
                name: "反攻的時機",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "10023",
                checkSkillId: "10023-passive-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-passive-6",
              },
              {
                characterId: "10023",
                checkSkillId: "10023-passive-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-passive-7",
              },
              {
                characterId: "10023",
                checkSkillId: "10023-passive-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: "10023-passive-8",
              },
            ],
          },
        },
        {
          id: "10023-passive-6",
          name: "必殺時，追加「以自身攻擊力75%對目標造成傷害2次」",
          type: 101,
          condition: Condition.ULTIMATE,
          deactivated: true,
          duration: 100,
          _101: {
            value: 0.75,
            target: Target.ENEMY,
            damageType: DamageType.ULTIMATE_ADDON,
            action: CharacterAction.ULTIMATE,
            multiple: 2,
          },
        },
        {
          id: "10023-passive-7",
          name: "必殺時，觸發「清除自身《反攻的時機》的所有層數」",
          type: 23,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _23: {
            clearSkill: ["10023-passive-5-1"],
            targetChar: "10023",
            targetSkill: [
              "10023-passive-6",
              "10023-passive-7",
              "10023-passive-8",
            ],
          },
        },
      ];
      // 當自身《反攻的時機》層數=1層時，發動「《逆襲的彈雨》」
      //
      // 《逆襲的彈雨》
      // 必殺時，追加「以自身攻擊力45.5%對目標造成傷害8次」
      //
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10023-passive-8",
            name: "必殺時，追加「以自身攻擊力45.5%對目標造成傷害8次」",
            type: 101,
            condition: Condition.ULTIMATE,
            deactivated: true,
            duration: 100,
            _101: {
              value: 0.455,
              target: Target.ENEMY,
              damageType: DamageType.ULTIMATE_ADDON,
              action: CharacterAction.ULTIMATE,
              multiple: 8,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10023-passive4",
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
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10044-passive-1",
          name: "必殺時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            value: 0.3,
            target: Target.ALL_ALLIES,
            affectType: AffectType.RAW_ATK,
            duration: 1,
            base: false,
          },
        },
        {
          id: "10044-passive-2",
          name: "每經過4回合時，觸發「使目標受到傷害增加25%(2回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "10044-passive-2-1",
                name: "受到傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 0.25,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10044-passive-3",
            name: "防禦時，觸發「使自身攻擊力增加30%(最多3層)」",
            type: 4,
            condition: Condition.GUARD,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10044-passive-3-1",
              target: Target.SELF,
              applySkill: {
                id: "10044-passive-3-1",
                name: "攻擊力增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10044-passive-3-1",
                  name: "攻擊力增加",
                  stack: 1,
                  maxStack: 3,
                  affectType: AffectType.INCREASE_ATK,
                  value: 0.3,
                },
              },
            },
          },
          {
            id: "10044-passive-4",
            name: "每經過1回合時，觸發「以自身攻擊力5%使我方全體攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _6: {
              value: 0.05,
              target: Target.ALL_ALLIES,
              affectType: AffectType.RAW_ATK,
              duration: 1,
              base: false,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10044-passive4",
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
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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
                  target: Target.ENEMY,
                  damageType: DamageType.TRIGGER,
                  action: CharacterAction.ULTIMATE,
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
                  target: Target.ENEMY,
                  damageType: DamageType.TRIGGER,
                  action: CharacterAction.ULTIMATE,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
    case "10092": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10092-passive-1",
          name: "自身HP大於75%時，攻擊力增加50%",
          type: 0,
          condition: Condition.NONE,
          specialCondition: SpecialCondition.HP_HIGHER_THAN,
          specialConditionValue: 0.75,
          duration: 100,
          _0: {
            value: 0.5,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: "10092-passive-2",
          name: "必殺時，以攻擊力30%對敵方站位2的目標造成傷害",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 0.3,
            target: Target.ENEMY_2,
            damageType: DamageType.ULTIMATE,
            action: CharacterAction.ULTIMATE,
          },
        },
        {
          id: "10092-passive-3",
          name: "必殺時，以攻擊力30%對敵方站位3的目標造成傷害",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 0.3,
            target: Target.ENEMY_3,
            damageType: DamageType.ULTIMATE,
            action: CharacterAction.ULTIMATE,
          },
        },
        {
          id: "10092-passive-4",
          name: "必殺時，以攻擊力30%對敵方站位4的目標造成傷害",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 0.3,
            target: Target.ENEMY_4,
            damageType: DamageType.ULTIMATE,
            action: CharacterAction.ULTIMATE,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        //第4回合時，觸發「使自身攻擊力增加40%(50回合)」
        //第7回合時，觸發「使自身攻擊力增加80%(50回合)」
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10092-passive-5",
            name: "第4回合時，觸發「使自身攻擊力增加40%(50回合)」",
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            conditionTurn: 4,
            duration: 100,
            _11: {
              target: Target.SELF,
              applySkill: [
                {
                  id: "10092-passive-5-1",
                  name: "攻擊力增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 50,
                  _0: {
                    value: 0.4,
                    affectType: AffectType.INCREASE_ATK,
                  },
                },
              ],
            },
          },
          {
            id: "10092-passive-6",
            name: "第7回合時，觸發「使自身攻擊力增加80%(50回合)」",
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            conditionTurn: 7,
            duration: 100,
            _11: {
              target: Target.SELF,
              applySkill: [
                {
                  id: "10092-passive-6-1",
                  name: "攻擊力增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 50,
                  _0: {
                    value: 0.8,
                    affectType: AffectType.INCREASE_ATK,
                  },
                },
              ],
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10108-passive4",
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
    // "10093": "適格者 娜娜",
    // "10094": "未知生命體 基貝魯",
    // "10096": "鮮血魔王 洛緹亞",
    // "10097": "性誕兔女郎 艾可",
    // "10098": "聖誕雪狐 靜",
    case "10098": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10098-passive-1",
          name: "每經過1回合，觸發「使敵方全體受到傷害增加5%(最多11層)」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            target: Target.ENEMY,
            increaseStack: 1,
            targetSkill: "10098-passive-1-1",
            applySkill: {
              id: "10098-passive-1-1",
              name: "受到傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10098-passive-1-1",
                name: "受到傷害增加5%",
                stack: 1,
                maxStack: 11,
                value: 0.05,
                affectType: AffectType.INCREASE_DMG_RECEIVED,
              },
            },
          },
        },
      ];

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10098-passive-2",
          name: "自身受到護盾效果增加25%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.25,
            affectType: AffectType.INCREASE_SHIELD_RATE_RECEIVED,
          },
        },
        {
          id: "10098-passive-3",
          name: "自身被治療時回復量增加25%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.25,
            affectType: AffectType.INCREASE_HEAL_RATE,
          },
        },
        {
          id: "10098-passive-4",
          name: "自身受到持續型治療效果增加25%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.25,
            affectType: AffectType.INCREASE_HEAL_RATE_OVER_TIME,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10098-passive-5",
            name: "自身造成傷害增加35%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.35,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "10098-passive-6",
            name: "必殺時，觸發「使目標受到《鬼抓人大賽開始喏∼》 賦予的受到傷害增加狀態增加4層」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              target: Target.ENEMY,
              increaseStack: 4,
              targetSkill: "10098-passive-1-1",
              applySkill: {
                id: "10098-passive-1-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10098-passive-1-1",
                  name: "受到傷害增加5%",
                  stack: 1,
                  maxStack: 11,
                  value: 0.05,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10098-passive4",
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
    // "10100": "惡兔魔王 兔姬",
    // "10106": "絕代佳人 賽露西亞",
    // "10107": "龍飛鳳舞 蘭兒",
    // "10108": "甜心可可 巴爾",
    case "10108": {
      const lowestHP = gameState.characters.reduce((prev, current) =>
        prev && prev.maxHp < current.maxHp ? prev : current,
      );
      const lowestHpIndex = gameState.characters.findIndex(
        (character) => character.id === lowestHP.id,
      );
      gameState.characters[lowestHpIndex].buff = [
        ...gameState.characters[lowestHpIndex].buff,
        {
          id: "10108-passive-1",
          name: "受到傷害減少15%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.15,
            affectType: AffectType.DECREASE_DMG_RECEIVED,
          },
        },
      ];

      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10108-passive-2",
            name: "受到必殺技傷害減少10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.DECREASE_ULTIMATE_DMG_RECEIVED,
            },
          },
        ];
      });
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10108-passive-3",
          name: "必殺時，觸發「使我方全體被治療時回復量增加20%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10108-passive-3-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "10108-passive-3-1",
              name: "被治療時回復量增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10108-passive-3-1",
                name: "被治療時回復量增加20%",
                value: 0.2,
                stack: 1,
                maxStack: 2,
                affectType: AffectType.INCREASE_HEAL_RATE,
              },
            },
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters.forEach((character, index) => {
          if (
            character.class === CharacterClass.HEALER ||
            character.class === CharacterClass.SUPPORT
          ) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10108-passive-4",
                name: "攻擊力增加40%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.4,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
              {
                id: "10108-passive-5",
                name: "防禦時，觸發「我方全體受到持續型治療增加20%(1回合)」",
                type: 11,
                condition: Condition.GUARD,
                duration: 100,
                _11: {
                  target: Target.ALL_ALLIES,
                  applySkill: [
                    {
                      id: "10108-passive-5-1",
                      name: "受到持續型治療增加",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 0.2,
                        affectType: AffectType.INCREASE_HEAL_RATE,
                      },
                    },
                  ],
                },
              },
            ];
          }
        });
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10108-passive4",
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
    // "10109": "純情可可 伊布力斯",
    // "10110": "致命可可 撒旦",
    // "10111": "背德密醫 艾琳",
    // "10113": "嬌蠻兇護 凱薩",
    // "10114": "魔法少女 朱諾安",
    // "10115": "魔法少女 布蘭妮",
    case "10115": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10115-passive-1",
          name: "攻擊時，觸發「以自身攻擊力20%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ATTACK,
          conditionTurn: 1,
          duration: 100,
          _6: {
            base: false,
            duration: 1,
            value: 0.2,
            target: Target.ALL_ALLIES,
            affectType: AffectType.RAW_ATK,
          },
        },
        {
          id: "10115-passive-2",
          name: "被治療時，觸發「使我方全體攻擊力增加20%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10115-passive-2-1",
                name: "攻擊力增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.2,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ],
          },
        },
      ];
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "10115-passive-3",
            name: "給予我方全體「當前HP≧95%時，發動『造成傷害增加15%』」",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            specialCondition: SpecialCondition.HP_HIGHER_THAN,
            specialConditionValue: 95,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value: 0.15,
            },
          },
        ];
      });

      if (passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10115-passive4",
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
    // "10116": "夏日 神田綾音",
    // "10117": "夏日 巴爾",
    case "10117": {
      gameState.characters.forEach((character, index) => {
        if (character.attribute === CharacterAttribute.WATER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10117-passive-1",
              name: "攻擊力增加30%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.3,
                affectType: AffectType.INCREASE_ATK,
              },
            },
            {
              id: "10117-passive-2",
              name: "普攻傷害增加20%",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.2,
                affectType: AffectType.INCREASE_BASIC_DMG,
              },
            },
          ];
        }
      });

      {
        const fiveWaterCondtion = [
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
        ];

        const fourWaterCondition = [
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
          CharacterAttribute.WATER,
        ];

        gameState.characters.forEach((character, _) => {
          if (fiveWaterCondtion.includes(character.attribute)) {
            const index = fiveWaterCondtion.indexOf(character.attribute);
            if (index !== -1) {
              fiveWaterCondtion.splice(index, 1);
            }
            const index2 = fourWaterCondition.indexOf(character.attribute);
            if (index2 !== -1) {
              fourWaterCondition.splice(index2, 1);
            }
          }
        });

        if (fourWaterCondition.length === 0) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "10117-passive-3",
                  name: "普攻時，追加『以自身攻擊力15%對目標造成傷害』",
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.15,
                    target: Target.ENEMY,
                    damageType: DamageType.BASIC_ADDON,
                    action: CharacterAction.BASIC,
                  },
                },
              ];
            }
          });
        }
        if (fiveWaterCondtion.length === 0) {
          gameState.characters.forEach((character, index) => {
            // 使我方全體攻擊者和妨礙者獲得
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "10117-passive-4",
                  name: "普攻時，追加『以自身攻擊力15%對目標造成傷害』",
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.15,
                    target: Target.ENEMY,
                    damageType: DamageType.BASIC_ADDON,
                    action: CharacterAction.BASIC,
                  },
                },
              ];
            }
          });
        }
        if (fourWaterCondition.length === 0) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "10117-passive-5",
                  name: "普攻時，追加『使目標受到普攻傷害增加9%(最多5層)』",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "10117-passive-5-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "10117-passive-5-1",
                      name: "受到普攻傷害增加",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "10117-passive-5-1",
                        name: "受到普攻傷害增加9%",
                        value: 0.09,
                        stack: 1,
                        maxStack: 5,
                        affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
                      },
                    },
                  },
                },
              ];
            }
          });
        }

        if (fiveWaterCondtion.length === 0) {
          gameState.characters.forEach((character, index) => {
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "10117-passive-6",
                  name: "普攻時，追加『使目標受到普攻傷害增加9%(最多5層)』",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "10117-passive-6-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "10117-passive-6-1",
                      name: "受到普攻傷害增加",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "10117-passive-6-1",
                        name: "受到普攻傷害增加9%",
                        value: 0.09,
                        stack: 1,
                        maxStack: 5,
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

      if (gameState.characters[position].stars === 5) {
        const twoAttackerCondition = [
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
        ];

        gameState.characters.forEach((character) => {
          if (twoAttackerCondition.includes(character.class)) {
            const index = twoAttackerCondition.indexOf(character.class);
            if (index !== -1) {
              twoAttackerCondition.splice(index, 1);
            }
          }
        });

        if (twoAttackerCondition.length === 0) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10117-passive-7",
                name: "造成傷害增加30%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
              {
                id: "10117-passive-8",
                name: "普攻傷害增加30%",
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_BASIC_DMG,
                },
              },
            ];
          });
        }
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10117-passive4",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DMG,
            },
          },
        ];
      }

      break;
    }
    // "10118": "夏日 菲歐菈",
    case "10118": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10118-passive-1",
          name: "必殺時，觸發「使我方全體攻擊力增加40%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10118-passive-1-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "10118-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10118-passive-1-1",
                name: "攻擊力增加40%",
                value: 0.4,
                stack: 1,
                maxStack: 1,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "10118-passive-2",
          name: "被治療時，觸發「使我方全體攻擊力增加10%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10118-passive-2-1",
                name: "攻擊力增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.1,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ],
          },
        },
        {
          id: "10118-passive-3",
          name: "必殺時，觸發「使我方全體必殺技傷害增加30%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10118-passive-3-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "10118-passive-3-1",
              name: "必殺技傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10118-passive-3-1",
                name: "必殺技傷害增加30%",
                value: 0.3,
                stack: 1,
                maxStack: 1,
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
              },
            },
          },
        },
        {
          id: "10118-passive-4",
          name: "被治療時，觸發「使我方全體必殺技傷害增加10%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10118-passive-4-1",
                name: "必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.1,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10118-passive-5",
            name: "必殺時，觸發「使我方增造成傷害加20%(最多1層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10118-passive-5-1",
              target: Target.ALL_ALLIES,
              applySkill: {
                id: "10118-passive-5-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10118-passive-3-1",
                  name: "造成傷害增加20%",
                  value: 0.2,
                  stack: 1,
                  maxStack: 1,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            },
          },
          {
            id: "10118-passive-6",
            name: "被治療時，觸發「使我方全體造成傷害增加5%(1回合)」",
            type: 11,
            condition: Condition.GET_HEAL,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "10118-passive-6-1",
                  name: "造成傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 1,
                  _0: {
                    value: 0.05,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              ],
            },
          },
        ];
      }
      if (passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10118-passive4-1",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DMG,
            },
          },
        ];
      }
      break;
    }
    // "10119": "夏日 艾可",
    case "10119": {
      // 必殺時，觸發「以自身攻擊力150%對我方全體進行治療」
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10119-passive-1",
          name: "必殺時，觸發「以自身攻擊力150%對我方全體進行治療」",
          type: 26,
          condition: Condition.ULTIMATE,
          duration: 100,
          _26: {
            value: 1.5,
            target: Target.ALL_ALLIES,
            damageType: DamageType.TRIGGER,
            action: CharacterAction.ULTIMATE,
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
            target: Target.ENEMY,
            damageType: DamageType.TRIGGER,
            action: CharacterAction.ULTIMATE,
          },
        },
      ];
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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
      ];
      // TODO: 必殺時，觸發「以自身最大HP15%給予我方全體護盾(1回合)」

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
    case "10123": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10123-passive-1",
          name: "必殺時，觸發「使自身攻擊力增加40%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10123-1",
            target: Target.SELF,
            applySkill: {
              id: "10123-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10123-1",
                name: "攻擊力增加40%",
                value: 0.4,
                stack: 1,
                maxStack: 2,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "10123-passive-2",
          name: "必殺時 ，觸發「使目標受到必殺技傷害增加20%(4回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "10123-passive-2-1",
                name: "受到必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 4,
                _0: {
                  value: 0.2,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG_RECEIVED,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10123-passive-3",
            name: "必殺時 ，觸發「使目標受到傷害增加20%(4回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "10123-passive-3-1",
                  name: "受到傷害增加",
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
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10123-passive-4",
            name: "使自身必殺技傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
            },
          },
        ];
      }

      break;
    }
    // "10124": "沁夏淡粉 香草奈若",
    // "10125": "南瓜魔女 神田綾音",
    case "10125": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10125-passive-1",
          name: "必殺時，追加「以自身攻擊力250%對目標造成傷害」",
          type: 101,
          condition: Condition.ULTIMATE,
          duration: 100,
          _101: {
            value: 2.5,
            target: Target.ENEMY,
            damageType: DamageType.ULTIMATE_ADDON,
            action: CharacterAction.ULTIMATE,
          },
        },
        {
          id: "10125-passive-2",
          name: "每經過3回合，觸發「使自身獲得必殺時，觸發『以自身攻擊力25%使我方攻擊者攻擊力增加(1回合)』(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "10125-passive-2-1",
                name: "必殺時,觸發 以自身攻擊力25%使我方攻擊者攻擊力增加(1回合)",
                type: 6,
                condition: Condition.ULTIMATE,
                duration: 1,
                _6: {
                  base: false,
                  duration: 1,
                  value: 0.25,
                  target: Target.ATTACKER,
                  affectType: AffectType.RAW_ATK,
                },
              },
            ],
          },
        },
        {
          id: "10125-passive-3",
          name: "每經過3回合，觸發「使自身獲得必殺時，觸發『以自身攻擊力25%使我方妨礙者攻擊力增加(1回合)』(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "10125-passive-3-1",
                name: "必殺時,觸發 『以自身攻擊力25%使我方妨礙者攻擊力增加(1回合)』(1回合)」",
                type: 6,
                duration: 1,
                condition: Condition.ULTIMATE,
                _6: {
                  base: false,
                  value: 0.25,
                  duration: 1,
                  target: Target.OBSTRUCTER,
                  affectType: AffectType.RAW_ATK,
                },
              },
            ],
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters.forEach((character, index) => {
          if (
            character.class === CharacterClass.ATTACKER ||
            character.class === CharacterClass.OBSTRUCTER
          ) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10125-passive-4",
                name: "必殺時，追加『以自身攻擊力100%對目標造成傷害』(50回合)",
                type: 101,
                condition: Condition.ULTIMATE,
                duration: 50,
                _101: {
                  value: 1,
                  target: Target.ENEMY,
                  damageType: DamageType.ULTIMATE_ADDON,
                  action: CharacterAction.ULTIMATE,
                },
              },
            ];
          }
        });
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10125-passive4",
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
    // "10126": "調皮搗蛋 白",
    case "10126": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10126-passive-1",
          name: "當前HP≤99%時，發動「自身受到傷害減少10%」",
          type: 5,
          condition: Condition.NONE,
          duration: 100,
          _5: {
            condition: SpecialCondition.HP_LOWER_THAN,
            conditionValue: 99,
            value: 0.1,
            affectType: AffectType.DECREASE_DMG_RECEIVED,
            target: Target.ATTACKER,
          },
        },
        {
          id: "10126-passive-2",
          name: "每經過1回合時，觸發「給予自身『連環陷阱(最多9層)』」",
          type: 19,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _19: {
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
            checkActivation: [
              {
                characterId: "10126",
                checkSkillId: "10126-passive-2-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 6,
                activateSkillId: "10126-passive-6",
              },
              {
                characterId: "10126",
                checkSkillId: "10126-passive-2-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 8,
                activateSkillId: "10126-passive-7",
              },
            ],
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
            affectType: AffectType.RAW_ATK,
          },
        },
        {
          id: "10126-passive-6",
          name: "當自身「連環陷阱」層數>6層時，開啟「攻擊力增加20%」",
          type: 0,
          deactivated: true,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.2,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: "10126-passive-7",
          name: "當自身「連環陷阱」層數>9層時，開啟「攻擊力增加20%」",
          type: 0,
          deactivated: true,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.2,
            affectType: AffectType.INCREASE_ATK,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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

      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
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

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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

      if (gameState.characters[position].stars === 5) {
        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.ATTACKER) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
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

        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
    case "10129": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10129-passive-1",
          name: "每經過1回合，觸發「使我方全體必殺技傷害增加3%(最多15層)」",
          type: 21,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "10129-passive-1-1",
                name: "每經過1回合，觸發「使我方全體必殺技傷害增加3%(最多15層)」",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10129-passive-1-1-1",
                  target: Target.ALL_ALLIES,
                  applySkill: {
                    id: "10129-passive-1-1-1",
                    name: "受到傷害增加20%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10129-passive-1-1-1",
                      name: "受到傷害增加20%",
                      value: 0.03,
                      stack: 1,
                      maxStack: 15,
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                    },
                  },
                },
              },
            ],
          },
        },

        // TODO
        {
          id: "10129-passive-2",
          name: "被攻擊時，觸發「使《油門當剎車踩》的我方全體必殺技傷害增加效果增加1層」",
          type: 21,
          condition: Condition.RECEIVED_ATTACK,
          conditionTurn: 1,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "10129-passive-1-1",
                name: "每經過1回合，觸發「使我方全體必殺技傷害增加3%(最多15層)」",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10129-passive-1-1-1",
                  target: Target.ALL_ALLIES,
                  applySkill: {
                    id: "10129-passive-1-1-1",
                    name: "必殺技傷害增加3%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10129-passive-1-1-1",
                      name: "必殺技傷害增加3%",
                      value: 0.03,
                      stack: 1,
                      maxStack: 15,
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                    },
                  },
                },
              },
            ],
          },
        },
        {
          id: "10129-passive-3",
          name: "被攻擊時，觸發「使自身造成傷害增加10%(最多4層)」",
          type: 21,
          condition: Condition.RECEIVED_ATTACK,
          conditionTurn: 1,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "10129-passive-3-1",
                name: "被攻擊時，觸發「使自身造成傷害增加10%(最多4層)」",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "10129-passive-3-1-1",
                  target: Target.ALL_ALLIES,
                  applySkill: {
                    id: "10129-passive-3-1-1",
                    name: "造成傷害增加10%(最多4層)",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "10129-passive-3-1-1",
                      name: "造成傷害增加10%(最多4層)",
                      value: 0.1,
                      stack: 1,
                      maxStack: 4,
                      affectType: AffectType.INCREASE_DMG,
                    },
                  },
                },
              },
            ],
          },
        },
      ];

      // 被攻擊時，觸發「以自身最大HP23%對自身施放護盾(1回合)
      break;
    }
    // "10130": "聖夜喧嘩 莎琳娜",
    // "10131": "時御者 伊娜絲",
    // "10132": "幽夜女爵 卡蒂雅",
    case "10132": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10132-passive-1",
          name: "必殺時，追加「使目標受到傷害增加15%(7回合)」",
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          _111: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "10132-passive-1-1",
                name: "受到傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 7,
                _0: {
                  value: 0.15,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            ],
          },
        },
        {
          id: "10132-passive-3",
          name: "必殺時，追加「使目標受到必殺技傷害增加20%(7回合)」",
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          _111: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "10132-passive-3-1",
                name: "受到必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 7,
                _0: {
                  value: 0.2,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG_RECEIVED,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10132-passive4",
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
    // "10133": "甜心偶像 星空奈奈美",
    // "10134": "閃耀歌姬 黑白諾艾莉",
    case "10134": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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
            affectType: AffectType.RAW_ATK,
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
              affectType: AffectType.RAW_ATK,
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10134-passive4",
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

    // "10135": "偶像經紀人 梅絲米奈雅",
    // "10136": "賞金獵人 安潔娜爾",
    case "10136": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10136-passive-1",
          name: "普攻傷害增加70%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.7,
            affectType: AffectType.INCREASE_BASIC_DMG,
          },
        },
      ];
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10136-passive-1",
          name: "必殺時，觸發「使我方全體水屬性的攻擊者、守護者、妨礙者獲得《傳遞飛刀》」",
          type: 17,
          condition: Condition.ULTIMATE,
          duration: 100,
          _17: {
            includeSelf: true,
            target: [
              CharacterClass.ATTACKER,
              CharacterClass.PROTECTOR,
              CharacterClass.OBSTRUCTER,
            ],
            attributeTarget: CharacterAttribute.WATER,
            applySkill: [
              {
                id: "10136-passive-1-1",
                name: "普攻時，追加「以自身攻擊力30%對目標造成傷害」(1回合)",
                type: 101,
                condition: Condition.BASIC_ATTACK,
                duration: 1,
                _101: {
                  value: 0.3,
                  target: Target.ENEMY,
                  damageType: DamageType.BASIC_ADDON,
                  action: CharacterAction.BASIC,
                },
              },
            ],
          },
        },
        {
          id: "10136-passive-2",
          name: "必殺時，觸發「使我方全體水屬性的攻擊者、守護者、妨礙者獲得「必殺時，觸發『使我方賞金獵人安潔娜爾』獲得《傳遞飛刀》』」",
          type: 17,
          condition: Condition.ULTIMATE,
          duration: 100,
          _17: {
            includeSelf: false,
            target: [
              CharacterClass.ATTACKER,
              CharacterClass.PROTECTOR,
              CharacterClass.OBSTRUCTER,
            ],
            attributeTarget: CharacterAttribute.WATER,
            applySkill: [
              {
                id: "10136-passive-2-1",
                name: "必殺時，觸發「使我方賞金獵人安潔娜爾獲得《傳遞飛刀》」",
                type: 13,
                condition: Condition.ULTIMATE,
                duration: 4,
                _13: {
                  target: "10136",
                  applySkill: [
                    {
                      id: "10136-passive-2-2",
                      name: "普攻時，追加「以自身攻擊力30%對目標造成傷害」(1回合)",
                      type: 101,
                      condition: Condition.BASIC_ATTACK,
                      duration: 1,
                      _101: {
                        value: 0.3,
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
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10136-passive-3",
            name: "第一回合時，使自身當前必殺技CD減少4回合",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              reduceCD: 4,
              target: Target.SELF,
            },
          },
          {
            id: "10136-passive-4",
            name: "第一回合時，使自身以外的我方全體水屬性隊員當前必殺技CD減少1回合",
            type: 18,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _18: {
              reduceCD: 1,
              attribute: CharacterAttribute.WATER,
              includeSelf: false,
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10136-passive4",
            name: "普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DMG,
            },
          },
        ];
      }
      break;
    }
    // "10137": "春情白兔 鈴蘭",
    case "10137": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10137-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加15%(最多6層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10137-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "10137-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10137-passive-1-1",
                name: "攻擊力增加15%",
                value: 0.15,
                maxStack: 6,
                stack: 1,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "10137-passive-2",
          name: "普攻時，觸發「使目標受到普攻傷害增加15%(最多6層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10137-passive-2-1",
            target: Target.ENEMY,
            applySkill: {
              id: "10137-passive-2-1",
              name: "受到普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10137-passive-2-1",
                name: "受到普攻傷害增加15%",
                value: 0.15,
                maxStack: 6,
                stack: 1,
                affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
              },
            },
          },
        },
      ];

      // 造成傷害增加20%
      // 必殺時，觸發「使目標受到風屬性傷害增加10%(最多3層)」
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10137-passive-3",
            name: "造成傷害增加20%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.2,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "10137-passive-4",
            name: "必殺時，觸發「使目標受到風屬性傷害增加10%(最多3層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10137-passive-4-1",
              target: Target.ENEMY,
              applySkill: {
                id: "10137-passive-4-1",
                name: "受到風屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10137-passive-4-1",
                  name: "受到風屬性傷害增加10%",
                  value: 0.1,
                  stack: 1,
                  maxStack: 3,
                  affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10137-passive4",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DMG,
            },
          },
        ];
      }
      break;
    }
    // "10138": "迷情薄紗 露露",
    // "10139": "不健全遐想 托特拉",
    case "10139": {
      {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10139-passive-2",
            name: "必殺時，觸發「使自身當前必殺技CD減少2回合」",
            type: 14,
            condition: Condition.ULTIMATE,
            duration: 100,
            _14: {
              reduceCD: 2,
              target: Target.SELF,
            },
          },
          {
            id: "10139-passive-3",
            name: "必殺時，觸發「使自身造成傷害增加15%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10139-passive-3-1",
              target: Target.SELF,
              applySkill: {
                id: "10139-passive-3-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10139-passive-3-1",
                  name: "造成傷害增加15%",
                  value: 0.15,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10139-passive-4",
            name: "第一回合時，觸發「使自身當前必殺技CD減少2回合」",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              reduceCD: 2,
              target: Target.SELF,
            },
          },
          {
            id: "10139-passive-5",
            name: "必殺時，觸發「使目標受到光屬性傷害增加20%(最多1層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10139-passive-5-1",
              target: Target.ENEMY,
              applySkill: {
                id: "10139-passive-5-1",
                name: "受到光屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10139-passive-5-1",
                  name: "受到光屬性傷害增加20%",
                  value: 0.2,
                  stack: 1,
                  maxStack: 1,
                  affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10139-passive4",
            name: "使自身必殺技傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
            },
          },
        ];
      }
      break;
    }
    // "10140": "真神化身 菈萊亞 菈萊亞",
    // "10141": "調查員 娜娜",
    // "10142": "夏日 千鶴",
    case "10142": {
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10142-passive-1",
              name: "每經過1回合，使目標受到普攻傷害增加30%",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 1,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: "10142-passive-1-1",
                    name: "受到普攻傷害增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      value: 0.3,
                      affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
                    },
                  },
                ],
              },
            },
            {
              id: "10142-passive-2",
              name: "必殺時，觸發「使我方『夏日 千鶴』攻擊力增加20%(4回合)」",
              type: 13,
              condition: Condition.ULTIMATE,
              duration: 100,
              _13: {
                target: "10142",
                applySkill: [
                  {
                    id: "10142-passive-2-1",
                    name: "攻擊力增加",
                    type: 0,
                    condition: Condition.NONE,
                    duration: 4,
                    _0: {
                      value: 0.2,
                      affectType: AffectType.INCREASE_ATK,
                    },
                  },
                ],
              },
            },
          ];
        }
      });
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10142-passive-3",
            name: "使自身當前必殺技CD減少4回合",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              reduceCD: 4,
              target: Target.SELF,
            },
          },
          {
            id: "10142-passive-4",
            name: "必殺時，觸發「使目標受到傷害增加20%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10142-passive-4-1",
              target: Target.ENEMY,
              applySkill: {
                id: "10142-passive-4-1",
                name: "受到傷害增加20%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10142-passive-4-1",
                  name: "受到傷害增加20%",
                  value: 0.2,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10142-passive4",
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
    // "10143": "夏日 賽露西亞",
    case "10143": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10143-passive-1",
          name: "攻擊力增加30%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.3,
            affectType: AffectType.INCREASE_ATK,
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10143-passive-2",
            name: "每Wave的第9回合時，觸發「使敵方全體受到傷害增加50%(50回合)」",
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            duration: 100,
            conditionTurn: 9,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "10143-passive-2-1",
                  name: "受到傷害增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 50,
                  _0: {
                    value: 0.5,
                    affectType: AffectType.INCREASE_DMG_RECEIVED,
                  },
                },
              ],
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10143-passive4",
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
    // "10144": "夏日 凱薩",
    case "10144": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10144-passive-6",
            name: "必殺時，追加「以自身攻擊力150%對目標造成傷害」",
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 100,
            _101: {
              value: 1.5,
              target: Target.ENEMY,
              damageType: DamageType.ULTIMATE_ADDON,
              action: CharacterAction.ULTIMATE,
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
              affectType: AffectType.RAW_ATK,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
    case "10145": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10145-passive-1",
          name: "普攻時，追加「以自身當前HP1%對自身造成真實傷害(可觸發「被攻擊時」觸發效果)」",
          condition: Condition.BASIC_ATTACK,
          type: 105,
          duration: 100,
        },
        {
          id: "10145-passive-2",
          name: "普攻時，追加「並使我方全體普攻傷害增加5%(最多10層)」)",
          condition: Condition.BASIC_ATTACK,
          type: 104,
          duration: 100,
          _104: {
            increaseStack: 1,
            targetSkill: "10145-passive-2-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "10145-passive-2-1",
              name: "普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10145-passive-2-1",
                name: "普攻傷害增加5%",
                value: 0.05,
                stack: 1,
                maxStack: 10,
                affectType: AffectType.INCREASE_BASIC_DMG,
              },
            },
          },
        },
        {
          id: "10145-passive-3",
          name: "必殺時，追加「以自身當前HP1%對自身造成真實傷害(可觸發「被攻擊時」觸發效果)」",
          condition: Condition.ULTIMATE,
          type: 105,
          duration: 100,
        },
        {
          id: "10145-passive-4",
          name: "必殺時，追加「並使我方全體必殺傷害增加10%(最多3層)」)",
          condition: Condition.ULTIMATE,
          type: 104,
          duration: 100,
          _104: {
            increaseStack: 1,
            targetSkill: "10145-passive-4-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "10145-passive-4-1",
              name: "普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10145-passive-4-1",
                name: "普攻傷害增加5%",
                value: 0.1,
                stack: 1,
                maxStack: 3,
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
              },
            },
          },
        },
        {
          id: "10145-passive-5",
          name: "被攻擊時，觸發「使我方全體造成傷害增加1.33%(最多15層)」",
          type: 4,
          condition: Condition.RECEIVED_ATTACK,
          duration: 100,
          _4: {
            target: Target.ALL_ALLIES,
            increaseStack: 1,
            targetSkill: "10145-passive-5-1",
            applySkill: {
              id: "10145-passive-5-1",
              name: "造成傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10145-passive-5-1",
                stack: 1,
                maxStack: 15,
                value: 0.0133,
                name: "造成傷害增加1.33%",
                affectType: AffectType.INCREASE_DMG,
              },
            },
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10145-passive-6",
            name: "被攻擊時，觸發「使敵方全體受到傷害增加1.33%(最多15層)」",
            type: 4,
            condition: Condition.RECEIVED_ATTACK,
            duration: 100,
            _4: {
              target: Target.ENEMY,
              increaseStack: 1,
              targetSkill: "10145-passive-6-1",
              applySkill: {
                id: "10145-passive-6-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10145-passive-6-1",
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
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10145-passive4",
            name: "使自身造成傷害增加7.5%",
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
    // "10146": "魔獸獵手 神無雪",
    case "10146": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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
          type: 20,
          condition: Condition.ULTIMATE,
          duration: 100,
          _20: {
            target: Target.ALL_ALLIES,
            targetChar: "10146",
            targetSkill: "10146-passive-1-1",
            clearAll: true,
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
      gameState.characters.forEach((character, index) => {
        if (
          index !== position &&
          (character.class === CharacterClass.ATTACKER ||
            character.class === CharacterClass.OBSTRUCTER)
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10146-passive-4",
              name: "第一回合時，觸發「使自身造成傷害增加15%(50回合)」",
              type: 12,
              condition: Condition.ON_TURN_START,
              duration: 100,
              _12: {
                position: index,
                applySkill: {
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
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10146-passive-6",
            name: "每經過一回合時，觸發「使自身獲得『摒除雜念(最多8層)』」",
            type: 19,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _19: {
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
              checkActivation: [
                {
                  characterId: "10146",
                  checkSkillId: "10146-passive-6-1",
                  skillStackCondition: SkillStackCondition.HIGHER,
                  activateIfStack: 7,
                  activateSkillId: "10146-passive-7",
                },
              ],
            },
          },
          {
            id: "10146-passive-7",
            name: "必殺時，追加『以自身攻擊力220%對目標造成傷害",
            type: 101,
            condition: Condition.ULTIMATE,
            deactivated: true,
            duration: 100,
            _101: {
              value: 2.2,
              target: Target.ENEMY,
              damageType: DamageType.ULTIMATE,
              action: CharacterAction.BASIC,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
    case "10147": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10147-passive-1",
          name: "必殺時，觸發「使自身以外的我方全體獲得《享受大餐》」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_EXCEPT_SELF,
            applySkill: [
              {
                id: "10147-passive-1-1",
                name: "攻擊力增加100%",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 1,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
              {
                id: "10147-passive-1-2",
                name: "普攻傷害增加100%",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 1,
                  affectType: AffectType.INCREASE_BASIC_DMG,
                },
              },
              {
                id: "10147-passive-1-3",
                name: "行動後，觸發「清除自身以外的我方全體《享受大餐》的所有效果」(2回合)(觸發1次後解除)",
                type: 24,
                condition: Condition.MOVE,
                duration: 2,
                _24: {
                  clearSkill: [
                    "10147-passive-1-1",
                    "10147-passive-1-2",
                    "10147-passive-1-3",
                  ],
                  target: Target.ALL_EXCEPT_SELF,
                },
                deleteSelf: true,
              },
            ],
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        {
          const buff: Skill = {
            id: "10147-passive-3",
            name: "《魔物肢解》",
            type: 12,
            duration: 100,
            condition: Condition.NONE,
            _12: {
              position: 1,
              applySkill: {
                id: "10147-passive-3",
                name: "使目標受到必殺技傷害增加100%(1回合)",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ENEMY,
                  applySkill: [
                    {
                      id: "10147-passive-3-1",
                      name: "受到必殺技傷害增加",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 1,
                        affectType: AffectType.INCREASE_ULTIMATE_DMG_RECEIVED,
                      },
                    },
                  ],
                },
              },
            },
          };
          triggerSkill(buff, gameState, position);
        }
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10147-passive4",
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
    // "10148": "酩酊狂歡 靜",
    case "10148": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10148-passive-1",
          name: "被治療時，觸發「使我方全體攻擊者攻擊力增加2.5%(4回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ATTACKER,
            applySkill: [
              {
                id: "10148-passive-1-1",
                name: "攻擊力增加",
                type: 0,
                condition: Condition.NONE,
                duration: 4,
                _0: {
                  value: 0.025,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ],
          },
        },
        {
          id: "10148-passive-2",
          name: "被治療時，觸發「使我方全體妨礙者攻擊力增加2.5%(4回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.OBSTRUCTER,
            applySkill: [
              {
                id: "10148-passive-2-1",
                name: "攻擊力增加",
                type: 0,
                condition: Condition.NONE,
                duration: 4,
                _0: {
                  value: 0.025,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ],
          },
        },
        {
          id: "10148-passive-3",
          name: "攻擊時，觸發「使自身普攻傷害增加10%(最多10層)」",
          type: 4,
          condition: Condition.ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10148-passive-3-1",
            target: Target.SELF,
            applySkill: {
              id: "10148-passive-3-1",
              name: "普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10148-passive-3-1",
                name: "普攻傷害增加",
                stack: 1,
                maxStack: 10,
                value: 0.1,
                affectType: AffectType.INCREASE_BASIC_DMG,
              },
            },
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10148-passive-4",
            name: "第1回合時，觸發「使我方全體治療者的必殺技當前CD減少4回合」",
            type: 14,
            condition: Condition.ON_SPECIFIC_TURN,
            conditionTurn: 1,
            duration: 100,
            _14: {
              target: Target.HEALER,
              reduceCD: 4,
            },
          },
        ];

        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.HEALER) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10148-passive-5",
                name: "攻擊時，觸發「使我方全體攻擊者造成傷害增加10%(1回合)」",
                type: 11,
                condition: Condition.ATTACK,
                duration: 100,
                _11: {
                  target: Target.ATTACKER,
                  applySkill: [
                    {
                      id: "10148-passive-5-1",
                      name: "攻擊力增加",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 0.1,
                        affectType: AffectType.INCREASE_DMG,
                      },
                    },
                  ],
                },
              },
              {
                id: "10148-passive-6",
                name: "攻擊時，觸發「使我方全體妨礙者造成傷害增加10%(1回合)」",
                type: 11,
                condition: Condition.GET_HEAL,
                duration: 100,
                _11: {
                  target: Target.OBSTRUCTER,
                  applySkill: [
                    {
                      id: "10148-passive-6-1",
                      name: "造成傷害增加",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 0.1,
                        affectType: AffectType.INCREASE_DMG,
                      },
                    },
                  ],
                },
              },
              {
                id: "10148-passive-6",
                name: "攻擊時，使我方全體攻擊者、妨礙者獲得「普攻時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」",
                type: 11,
                condition: Condition.ATTACK,
                duration: 100,
                _11: {
                  target: Target.ATTACKER,
                  applySkill: [
                    {
                      id: "10148-passive-6-1",
                      name: "普攻時，追加『以自身攻擊力10%對目標造成傷害』",
                      type: 101,
                      condition: Condition.NONE,
                      duration: 1,
                      _101: {
                        value: 0.1,
                        target: Target.ENEMY,
                        damageType: DamageType.BASIC_ADDON,
                        action: CharacterAction.BASIC,
                      },
                    },
                  ],
                },
              },
              {
                id: "10148-passive-7",
                name: "攻擊時，使我方全體妨礙者獲得「普攻時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」",
                type: 11,
                condition: Condition.ATTACK,
                duration: 100,
                _11: {
                  target: Target.OBSTRUCTER,
                  applySkill: [
                    {
                      id: "10148-passive-7-1",
                      name: "普攻時，追加『以自身攻擊力10%對目標造成傷害』",
                      type: 101,
                      condition: Condition.NONE,
                      duration: 1,
                      _101: {
                        value: 0.1,
                        target: Target.ENEMY,
                        damageType: DamageType.BASIC_ADDON,
                        action: CharacterAction.BASIC,
                      },
                    },
                  ],
                },
              },
            ];
          }
        });
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10148-passive4",
            name: "使自身普攻傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_BASIC_DMG,
            },
          },
        ];
      }
      break;
    }
    // "10149": "千年靈狐 椿",
    case "10149": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
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
            affectType: AffectType.RAW_ATK,
            duration: 1,
            base: false,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10149-passive-2",
            name: "必殺時，觸發「使目標受到傷害增加30%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "10149-passive-2-1",
              target: Target.ENEMY,
              applySkill: {
                id: "10149-passive-2-1",
                name: "受到傷害增加30%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "10149-passive-2-1",
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

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
    case "10150": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10150-passive-1",
          name: "攻擊力增加",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.5,
            affectType: AffectType.INCREASE_ATK,
          },
        },
      ];

      gameState.characters.forEach((character, index) => {
        if (character.attribute === CharacterAttribute.LIGHT) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10150-passive-2",
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
        }
      });

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10150-passive-3",
          name: "普攻傷害增加",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.3,
            affectType: AffectType.INCREASE_BASIC_DMG,
          },
        },
      ];
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10150-passive-4",
          name: "普攻時，觸發「使自身以外我方全體光屬性角色普攻傷害增加40%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ALL_LIGHT_EXCEPT_SELF,
            applySkill: [
              {
                id: "10150-passive-4-1",
                name: "普攻傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.4,
                  affectType: AffectType.INCREASE_BASIC_DMG,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters.forEach((character, index) => {
          if (
            character.attribute === CharacterAttribute.LIGHT &&
            position !== index
          ) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10150-passive-5",
                name: "使自身以外我方全體光屬性角色獲得「必殺時，觸發『《賭客的視線》』」",
                type: 21,
                condition: Condition.ULTIMATE,
                duration: 100,
                _21: {
                  trigger: [
                    {
                      id: "10150-passive-5-1",
                      name: "使自身以外我方全體光屬性角色獲得「必殺時，觸發『《賭客的視線》』」",
                      type: 13,
                      condition: Condition.NONE,
                      duration: 100,
                      _13: {
                        target: "10150",
                        applySkill: [
                          {
                            id: "10150-passive-5-2",
                            name: "造成傷害增加",
                            type: 0,
                            condition: Condition.NONE,
                            duration: 4,
                            _0: {
                              value: 0.0666,
                              affectType: AffectType.INCREASE_DMG,
                            },
                          },
                          {
                            id: "10150-passive-5-3",
                            name: "必殺傷害增加",
                            type: 0,
                            condition: Condition.NONE,
                            duration: 1,
                            _0: {
                              value: 0.18,
                              affectType: AffectType.INCREASE_ULTIMATE_DMG,
                            },
                          },
                          {
                            id: "10150-passive-5-4",
                            name: "必殺時，追加『以自身攻擊力25%對目標造成傷害』(1回合)",
                            type: 101,
                            condition: Condition.ULTIMATE,
                            duration: 1,
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
        });
      }
      if (passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10150-passive4",
            name: "使自身造成傷害增加7.5%",
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
    // "10151": "性感兔女郎 伊布力斯",
    case "10151": {
      // 免疫必殺技CD變動效果
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10151-passive-1",
          name: "普攻時，觸發「使我方全體普攻傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10152-passive-1-1",
                name: "普攻傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_BASIC_DMG,
                },
              },
            ],
          },
        },
        {
          id: "10151-passive-2",
          name: "必殺時，觸發「使我方全體必殺傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "10151-passive-2-1",
                name: "必殺傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10151-passive-3",
            name: "攻擊時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」效果",
            type: 6,
            condition: Condition.ATTACK,
            duration: 100,
            _6: {
              value: 0.3,
              target: Target.ALL_ALLIES,
              affectType: AffectType.RAW_ATK,
              duration: 1,
              base: false,
            },
          },
        ];

        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.ATTACKER) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10151-passive-4",
                name: "攻擊時，觸發「以自身攻擊力5%使我方全體攻擊力增加(1回合)」效果",
                type: 6,
                condition: Condition.ATTACK,
                duration: 100,
                _6: {
                  value: 0.05,
                  target: Target.ALL_ALLIES,
                  affectType: AffectType.RAW_ATK,
                  duration: 1,
                  base: false,
                },
              },
            ];
          }
        });
      }

      if (passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10151-passive4",
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
    // "10152": "治癒之星 蘇珊",
    // "10153": "純真殺意 撒旦",
    case "10153": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10153-passive-1",
          name: "必殺時，觸發「使自身不受《向聖杯祈願》層數變動效果影響(50回合)」(觸發1次後解除)",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          deleteSelf: true,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "10153-passive-1-1",
                name: "使自身不受《向聖杯祈願》層數變動效果影響",
                type: 0,
                condition: Condition.NONE,
                duration: 50,
                _0: {
                  value: 0,
                  affectType: AffectType.NONE,
                },
              },
            ],
          },
        },
        {
          id: "10153-passive-2",
          name: "必殺時，根據自身《向聖杯祈願》的層數，觸發「以自身攻擊力30%對目標造成傷害」",
          type: 8,
          condition: Condition.ULTIMATE,
          duration: 100,
          _8: {
            target: Target.SELF,
            targetSkill: "10154-ult-1-1",
            triggerSkill: {
              id: "10153-passive-2-1",
              name: "以自身攻擊力30%對目標造成傷害",
              type: 1,
              condition: Condition.ULTIMATE,
              duration: 1,
              _1: {
                value: 0.3,
                target: Target.ENEMY,
                damageType: DamageType.TRIGGER,
                action: CharacterAction.ULTIMATE,
              },
            },
          },
        },
        //
      ];
      gameState.characters.forEach((_, index) => {
        if (index !== position) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "10153-passive-3",
              name: "被攻擊時，觸發「使我方【純真殺意 撒旦】獲得1層《高級萬聖甜點組》(最多6層)」",
              type: 4,
              condition: Condition.RECEIVED_ATTACK,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: "10153-passive-3-1",
                target: Target.SELF,
                applySkill: {
                  id: "10153-passive-3-1",
                  name: "《高級萬聖甜點組》",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: "10153-passive-3-1",
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
              id: "10153-passive-4",
              name: "行動後，觸發「清除自身《高級萬聖甜點組》的所有層數」",
              type: 20,
              condition: Condition.MOVE,
              duration: 100,
              _20: {
                target: Target.ALL_ALLIES,
                targetChar: "10153",
                targetSkill: "10153-passive-3-1",
                clearAll: true,
              },
            },
            {
              id: "10153-passive-5",
              name: "普攻時，根據自身《高級萬聖甜點組》的層數，觸發「以自身攻擊力10%對目標造成傷害」",
              type: 8,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _8: {
                target: Target.SELF,
                targetSkill: "10153-passive-3-1",
                triggerSkill: {
                  id: "10153-passive-5-1",
                  name: "以自身攻擊力10%對目標造成傷害",
                  type: 1,
                  condition: Condition.BASIC_ATTACK,
                  duration: 1,
                  _1: {
                    value: 0.1,
                    target: Target.ENEMY,
                    damageType: DamageType.TRIGGER,
                    action: CharacterAction.BASIC,
                  },
                },
              },
            },
            {
              id: "10153-passive-6",
              name: "自身《高級萬聖甜點組》層數≧2時，開啟「造成觸發技效果增加50%」",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
              specialConditionValue: 1,
              specialConditionSkill: "10153-passive-3-1",
              _0: {
                value: 0.5,
                affectType: AffectType.INCREASE_TRIGGER_EFFECT,
              },
            },
            {
              id: "10153-passive-7",
              name: "自身《高級萬聖甜點組》層數≧4時，開啟「攻擊力增加40%」",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
              specialConditionValue: 3,
              specialConditionSkill: "10153-passive-3-1",
              _0: {
                value: 0.4,
                affectType: AffectType.INCREASE_ATK,
              },
            },
            {
              id: "10153-passive-8",
              name: "自身《高級萬聖甜點組》層數=6時，開啟「造成傷害增加30%」",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              specialCondition: SpecialCondition.SKILL_STACK_MORE_THAN,
              specialConditionValue: 5,
              specialConditionSkill: "10153-passive-3-1",
              _0: {
                value: 0.3,
                affectType: AffectType.INCREASE_DMG,
              },
            },
          ];
        }
      });

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10153-passive-9",
            name: "第1回合時，觸發「使自身當前必殺技CD減少3回合」",
            type: 14,
            duration: 100,
            condition: Condition.ON_TURN_START,
            _14: {
              target: Target.SELF,
              reduceCD: 3,
            },
          },
        ];
        gameState.characters.forEach((_, index) => {
          if (index !== position) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "10153-passive-10",
                name: "普攻時，追加「以自身當前HP1%對自身造成真實傷害」",
                type: 101,
                duration: 100,
                condition: Condition.BASIC_ATTACK,
                _101: {
                  value: 0.01,
                  target: Target.SELF,
                  damageType: DamageType.BASIC_ADDON,
                  action: CharacterAction.BASIC,
                  isTrueDamage: true,
                },
              },
              {
                id: "10153-passive-11",
                name: "必殺時，追加「以自身當前HP1%對自身造成真實傷害」",
                type: 101,
                duration: 100,
                condition: Condition.ULTIMATE,
                _101: {
                  value: 0.01,
                  target: Target.SELF,
                  damageType: DamageType.ULTIMATE_ADDON,
                  action: CharacterAction.ULTIMATE,
                  isTrueDamage: true,
                },
              },
            ];
          }
        });
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10153-passive4",
            name: "使自身造成觸發技效果增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.3,
              affectType: AffectType.INCREASE_TRIGGER_EFFECT,
            },
          },
        ];
      }

      break;
    }
    // "10154": "星空奈奈美",
    case "10154": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10154-passive-1",
          name: "必殺時，觸發「使自身不受《戀愛的萌系能量》層數變動效果影響(50回合)」(觸發1次後清除)",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          deleteSelf: true,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "10154-passive-1-1",
                name: "使自身不受《戀愛的萌系能量》層數變動效果影響",
                type: 0,
                condition: Condition.NONE,
                duration: 50,
                _0: {
                  value: 0,
                  affectType: AffectType.NONE,
                },
              },
            ],
          },
        },
        {
          id: "10154-passive-2",
          name: "必殺時，觸發「使目標受到水屬性傷害增加7.5%(最多4層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "10154-passive-2-1",
            target: Target.ENEMY,
            applySkill: {
              id: "10154-passive-2-1",
              name: "受到水屬性傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "10154-passive-2-1",
                name: "受到水屬性傷害增加",
                stack: 1,
                maxStack: 4,
                value: 0.075,
                affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
              },
            },
          },
        },

        {
          id: "10154-passive-3",
          name: "每經過3回合，觸發「《只屬於你的偶像》」",
          type: 21,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _21: {
            trigger: [
              //使我方全體必殺技傷害增加50%(1回合)
              {
                id: "10154-passive-3-1",
                name: "使我方全體必殺技傷害增加50%(1回合)",
                type: 11,
                condition: Condition.NONE,
                duration: 1,
                _11: {
                  target: Target.ALL_ALLIES,
                  applySkill: [
                    {
                      id: "10154-passive-3-1-1",
                      name: "必殺傷害增加",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 1,
                      _0: {
                        value: 0.5,
                        affectType: AffectType.INCREASE_ULTIMATE_DMG,
                      },
                    },
                  ],
                },
              },
              {
                id: "10154-passive-3-2",
                name: "使自身獲得「防禦時，觸發『使自身當前必殺技CD增加3回合，並使自身獲得嘲諷效果(1回合)』(1回合)",
                type: 11,
                condition: Condition.GUARD,
                duration: 100,
                _11: {
                  target: Target.SELF,
                  applySkill: [
                    {
                      id: "10154-passive-3-2-1",
                      name: "「防禦時，觸發『使自身當前必殺技CD增加3回合，並使自身獲得嘲諷效果(1回合)』」",
                      type: 2,
                      condition: Condition.GUARD,
                      duration: 100,
                      _2: {
                        target: Target.SELF,
                        increaseCD: 3,
                      },
                    },
                    //TODO: 嘲諷效果
                  ],
                },
              },

              {
                id: "10154-passive-3-3",
                name: "使自身獲得「防禦時，根據自身《戀愛的萌系能量》的層數，觸發『《萌耶～萌耶～碰碰碰～♪》』(1回合)」",
                type: 11,
                condition: Condition.NONE,
                duration: 100,
                _11: {
                  target: Target.SELF,
                  applySkill: [
                    {
                      id: "10154-passive-3-3-1",
                      name: "「防禦時，根據自身《戀愛的萌系能量》的層數，觸發『《萌耶～萌耶～碰碰碰～♪》』(1回合)」",
                      type: 8,
                      condition: Condition.GUARD,
                      duration: 100,
                      _8: {
                        target: Target.SELF,
                        targetSkill: "10154-ult-1-1",
                        triggerSkill: {
                          id: "10126-passive-4-1",
                          name: "《萌耶～萌耶～碰碰碰～♪》",
                          type: 21,
                          condition: Condition.NONE,
                          duration: 1,
                          _21: {
                            trigger: [
                              {
                                id: "10154-passive-4-1-1",
                                name: "以自身最大HP30%對我方全體進行治療",
                                type: 26,
                                condition: Condition.NONE,
                                duration: 1,
                                _26: {
                                  value: 0.3,
                                  target: Target.ALL_ALLIES,
                                  damageType: DamageType.TRIGGER_HP,
                                  action: CharacterAction.GUARD,
                                },
                              },
                              {
                                id: "10154-passive-4-1-2",
                                name: "使我方全體受到傷害減少10%(1回合)",
                                type: 11,
                                condition: Condition.NONE,
                                duration: 1,
                                _11: {
                                  target: Target.ALL_ALLIES,
                                  applySkill: [
                                    {
                                      id: "10154-passive-4-1-2-1",
                                      name: "受到傷害減少",
                                      type: 0,
                                      condition: Condition.NONE,
                                      duration: 1,
                                      _0: {
                                        value: 0.1,
                                        affectType:
                                          AffectType.DECREASE_DMG_RECEIVED,
                                      },
                                    },
                                    {
                                      id: "10154-passive-4-1-3",
                                      name: "使自身防禦減傷增加5%(1回合)",
                                      type: 0,
                                      condition: Condition.NONE,
                                      duration: 1,
                                      _0: {
                                        value: 0.05,
                                        affectType:
                                          AffectType.INCREASE_GUARD_EFFECT,
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10154-passive-7",
            name: "第1回合時，觸發「使自身當前必殺技CD減少3回合」",
            type: 14,
            condition: Condition.ON_TURN_START,
            duration: 100,
            _14: {
              target: Target.SELF,
              reduceCD: 3,
            },
          },
          {
            id: "10154-passive-8",
            name: "每經過3回合時，觸發「使我方全體水屬性角色攻擊力增加120%(1回合)，再使我方全體水屬性角色造成傷害增加60%(1回合)」",
            type: 21,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 3,
            duration: 100,
            _21: {
              trigger: [
                {
                  id: "10154-passive-8-1",
                  name: "使我方全體水屬性角色攻擊力增加120%(1回合)",
                  type: 11,
                  condition: Condition.NONE,
                  duration: 1,
                  _11: {
                    target: Target.WATER,
                    applySkill: [
                      {
                        id: "10154-passive-8-1-1",
                        name: "攻擊力增加",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 1,
                        _0: {
                          value: 1.2,
                          affectType: AffectType.INCREASE_ATK,
                        },
                      },
                      {
                        id: "10154-passive-8-1-2",
                        name: "造成傷害增加",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 1,
                        _0: {
                          value: 0.6,
                          affectType: AffectType.INCREASE_DMG,
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

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10154-passive4",
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
    // "10155": "甜蜜女僕",
    case "10155": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10155-passive-1",
          name: "普攻時，觸發「以自身攻擊力100%對目標造成傷害",
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _1: {
            value: 1,
            target: Target.ENEMY,
            damageType: DamageType.TRIGGER,
            action: CharacterAction.BASIC,
          },
        },
      ];

      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
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

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "10155-passive-3",
          name: "必殺時，觸發「以自身攻擊力300%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 3,
            target: Target.ENEMY,
            damageType: DamageType.TRIGGER,
            action: CharacterAction.ULTIMATE,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
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
              target: Target.ENEMY,
              damageType: DamageType.TRIGGER,
              action: CharacterAction.ULTIMATE,
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

      //
      if (passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "10154-passive4",
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
    default: {
      break;
    }
  }
}
