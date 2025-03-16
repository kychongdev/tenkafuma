// @ts-nocheck
import { CharacterAttribute, CharacterClass } from "../../_types/Character";
import { AffectType, Condition, Target } from "../../_types/Skill";
import { GameState } from "../GameState";

export function initPassiveSkill(position: number, gameState: GameState) {
  const id = gameState.characters[position].id;
  switch (id) {
    case "144":
      // 防禦時，觸發「使我方全體水、火屬性隊員被治療時回復量增加50%(2回合)」
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "144-passive-2",
          name: "必殺時，觸發「使我方全體水屬性隊員攻擊力增加15%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            target: Target.WATER,
            targetSkill: "144-passive-2-1",
            increaseStack: 1,
            applySkill: {
              id: "144-passive-2-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "144-passive-2-1",
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
          id: "144-passive-3",
          name: "必殺時，觸發「使我方全體火屬性隊員攻擊力增加15%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            target: Target.FIRE,
            targetSkill: "144-passive-3-1",
            increaseStack: 1,
            applySkill: {
              id: "144-passive-3-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "144-passive-2-1",
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
          id: "144-passive-4",
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
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "144-passive-5",
            name: "每經過4回合，觸發「使目標受到水、火屬性傷害增加40%(1回合)」",
            type: 11,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 4,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "144-passive-5-1",
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
                  id: "144-passive-5-2",
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
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "144-passive-6",
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
    case "160":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "160-passive-1",
          name:
            "攻擊時，觸發「以自身攻擊力25%使我方全體攻擊力增加(1回合)」效果",
          type: 6,
          condition: Condition.ATTACK,
          duration: 100,
          _6: {
            value: 0.25,
            target: Target.ALL_ALLIES,
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
            id: "160-passive-2",
            name: "攻擊時，觸發「使我方全體造成傷害增加(最多5層)」效果",
            type: 4,
            condition: Condition.ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "160-passive-2-1",
              target: Target.ALL_ALLIES,
              applySkill: {
                id: "160-passive-2-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "160-passive-2-1",
                  name: "造成傷害增加",
                  value: 0.05,
                  stack: 1,
                  maxStack: 5,
                  affectType: AffectType.INCREASE_DMG,
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
            id: "160-passive4",
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
    case "163":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "163-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加10%(最多4層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "163-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "163-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "163-passive-1-1",
                name: "攻擊力增加",
                value: 0.1,
                stack: 1,
                maxStack: 4,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "163-passive-2",
          name: "必殺時，觸發「使我方站位5的隊員攻擊力增加40%(2回合)」",
          type: 12,
          condition: Condition.ULTIMATE,
          duration: 100,
          _12: {
            position: 4,
            applySkill: {
              id: "163-passive-2-1",
              name: "攻擊力增加",
              type: 0,
              condition: Condition.NONE,
              duration: 2,
              _0: {
                value: 0.4,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "163-passive-3",
            name: "必殺時，觸發「使我方全體造成傷害增加30%(1回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "163-passive-3-1",
                  name: "造成傷害增加",
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
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "163-passive-4",
            name: "使自身受到傷害減少5%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.DECREASE_DMG_RECEIVED,
            },
          },
        ];
      }
      break;
    // 花嫁 巴爾
    case "172":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "172-passive-1",
          name: "第1回合時，觸發「使我方站位2的角色造成傷害增加25%」",
          type: 12,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _12: {
            position: 1,
            applySkill: {
              id: "172-passive-1-1",
              name: "造成傷害增加",
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                value: 0.25,
                affectType: AffectType.INCREASE_DMG,
              },
            },
          },
        },
        {
          id: "172-passive-2",
          name: "第1回合時，觸發「使我方站位4的角色受到傷害減少20%(50回合)」",
          type: 12,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _12: {
            position: 3,
            applySkill: {
              id: "172-passive-2-1",
              name: "受到傷害減少",
              type: 0,
              condition: Condition.NONE,
              duration: 50,
              _0: {
                value: 0.2,
                affectType: AffectType.DECREASE_DMG_RECEIVED,
              },
            },
          },
        },
        {
          id: "172-passive-3",
          name: "第1回合時，觸發「使自身當前必殺技CD減少4回合」",
          type: 14,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _14: {
            reduceCD: 4,
            target: Target.SELF,
          },
        },

        {
          id: "172-passive-4",
          name: "每經過1回合，觸發「使自身攻擊力增加15%(最多8層)」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "172-passive-4-1",
            target: Target.SELF,
            applySkill: {
              id: "172-passive-4-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "172-passive-4-1",
                name: "攻擊力增加",
                value: 0.15,
                stack: 1,
                maxStack: 8,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "172-passive-5",
            name:
              "每經過2回合，觸發「使自身《若即若離的吸引力》賦予的攻擊力增加狀態增加1層」效果",
            type: 4,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 2,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "172-passive-4-1",
              target: Target.SELF,
              applySkill: {
                id: "172-passive-4-1",
                name: "攻擊力增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "172-passive-4-1",
                  name: "攻擊力增加",
                  value: 0.15,
                  stack: 1,
                  maxStack: 8,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            },
          },
          {
            id: "172-passive-6",
            name: "每經過1回合，觸發「以自身攻擊力35%使自身攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _6: {
              value: 0.35,
              target: Target.SELF,
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
            id: "172-passive-5",
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
    case "176":
      //
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "176-passive-1",
          name: "必殺時，觸發「使我方全體普攻傷害增加30%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            target: Target.ALL_ALLIES,
            targetSkill: "176-passive-1-1",
            increaseStack: 1,
            applySkill: {
              id: "176-passive-1-1",
              name: "普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "176-passive-1-1",
                name: "普攻傷害增加",
                value: 0.3,
                stack: 1,
                maxStack: 2,
                affectType: AffectType.INCREASE_BASIC_DMG,
              },
            },
          },
        },
        {
          id: "176-passive-2",
          name: "第1回合時，觸發「使我方全體普攻傷害增加30%(50回合)」",
          type: 11,
          condition: Condition.ON_SPECIFIC_TURN,
          conditionTurn: 1,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "176-passive-2-1",
                name: "普攻傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 50,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_BASIC_DMG,
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
            id: "176-passive-3",
            name: "必殺時，觸發「使我方全體造成傷害增加12.5%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              target: Target.ALL_ALLIES,
              targetSkill: "176-passive-3-1",
              increaseStack: 1,
              applySkill: {
                id: "176-passive-3-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "176-passive-3-1",
                  name: "造成傷害增加",
                  value: 0.125,
                  stack: 1,
                  maxStack: 2,
                  affectType: AffectType.INCREASE_DMG,
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
            id: "176-passive-4",
            name: "使普攻傷害增加10%",
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
    case "177":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "177-passive-1",
          name: "普攻時，觸發「使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _6: {
            value: 0.2,
            target: Target.ALL_ALLIES,
            affectType: AffectType.RAW_ATK,
            duration: 1,
            base: false,
          },
        },
        {
          id: "177-passive-2",
          name: "必殺時，觸發「使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            value: 0.25,
            target: Target.ALL_ALLIES,
            affectType: AffectType.RAW_ATK,
            duration: 1,
            base: false,
          },
        },
      ];

      //TODO:
      // 普攻時 ，觸發「以自身最大HP10%對我方全體施加護盾(1回合)、再以自身攻擊力10%對我方全體施加護盾(1回合)」
      //

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "177-passive-4",
            name: "必殺時，觸發「使我方全體攻擊力增加(8回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "177-passive-4-1",
                  name: "攻擊力增加",
                  type: 0,
                  condition: Condition.NONE,
                  duration: 8,
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

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "177-passive4",
            name: "使自身攻擊力增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_HEAL_RATE_OVER_TIME,
            },
          },
        ];
      }
      break;

    case "178":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "178-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加10%(最多5層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "178-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "178-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "178-passive-1-1",
                name: "攻擊力增加",
                value: 0.1,
                stack: 1,
                maxStack: 5,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        },
        {
          id: "178-passive-2",
          name: "攻擊時，觸發「使目標被治療時回復量減少50%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "178-passive-2-1",
                name: "被治療時回復量減少",
                type: 0,
                condition: Condition.GET_HEAL,
                duration: 1,
                _0: {
                  value: 0.5,
                  affectType: AffectType.DECREASE_HEAL_RECEIVED,
                },
              },
            ],
          },
        },
        {
          id: "178-passive-3",
          name: "普攻時，追加『以自身攻擊力35%對目標造成傷害』",
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _101: {
            value: 0.35,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 0,
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "178-passive-4",
            name: "普攻時，觸發「使目標受到水屬性傷害增加2%(最多5層)」",
            type: 4,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "178-passive-4-1",
              target: Target.ENEMY,
              applySkill: {
                id: "178-passive-4-1",
                name: "受到水屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "178-passive-4-1",
                  name: "受到水屬性傷害增加2%",
                  value: 0.02,
                  stack: 1,
                  maxStack: 5,
                  affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                },
              },
            },
          },
          {
            id: "178-passive-5",
            name: "普攻時，觸發「使目標受到普攻傷害增加15%(最多5層)」",
            type: 4,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "178-passive-5-1",
              target: Target.ENEMY,
              applySkill: {
                id: "178-passive-5-1",
                name: "受到普攻傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "178-passive-5-1",
                  name: "受到普攻傷害增加15%",
                  value: 0.15,
                  stack: 1,
                  maxStack: 5,
                  affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
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
            id: "178-passive-4",
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
    //新春 凜月
    case "179":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "179-passive-1",
          name: "普攻時，觸發「使目標受到普攻傷害增加20%(最多4層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "179-passive-1-1",
            target: Target.ENEMY,
            applySkill: {
              id: "179-passive-1-1",
              name: "受到普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "179-passive-1-1",
                name: "受到普攻傷害增加20%",
                value: 0.2,
                stack: 1,
                maxStack: 4,
                affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
              },
            },
          },
        },
        {
          id: "179-passive-2",
          name: "第1回合時，觸發「使我方全體普攻傷害增加30%(50回合)」",
          type: 11,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "179-passive-2-1",
                name: "普攻傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 50,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_BASIC_DMG,
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
            id: "179-passive-3",
            name: "使自身造成傷害增加10%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.1,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "179-passive-4",
            name: "攻擊時，觸發「使目標受到傷害增加5%(最多5層)」",
            type: 4,
            condition: Condition.ATTACK,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "179-passive-4-1",
              target: Target.ENEMY,
              applySkill: {
                id: "179-passive-4-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "179-passive-4-1",
                  name: "受到傷害增加5%",
                  value: 0.05,
                  stack: 1,
                  maxStack: 5,
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
            id: "179-passive-4",
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
    case "188":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "188-passive-1",
          name: "必殺時，觸發「使我方全體造成必殺技傷害增加25%(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "188-passive-1-1",
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
          id: "188-passive-2",
          name:
            "使我方全體攻擊者、妨礙者獲得「必殺時，觸發『以攻擊力77%對目標造成傷害』(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ATTACKER,
            applySkill: [
              {
                id: "188-passive-2-1",
                name: "必殺時，觸發『以攻擊力77%對目標造成傷害』(1回合)",
                type: 1,
                condition: Condition.ULTIMATE,
                duration: 1,
                _1: {
                  value: 0.77,
                  isTrigger: true,
                  target: Target.ENEMY,
                  damageType: 1,
                },
              },
            ],
          },
        },
        {
          id: "188-passive-3",
          name:
            "使我方全體攻擊者、妨礙者獲得「必殺時，觸發『以攻擊力77%對目標造成傷害』(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.OBSTRUCTER,
            applySkill: [
              {
                id: "188-passive-2-1",
                name: "攻擊",
                type: 1,
                condition: Condition.ULTIMATE,
                duration: 1,
                _1: {
                  value: 0.77,
                  isTrigger: true,
                  target: Target.ENEMY,
                  damageType: 1,
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
            id: "188-passive-4",
            name: "第7回合時，觸發「使我方全體造成傷害增加30%(最多1層)」",
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            conditionTurn: 7,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "188-passive-4-1",
                  name: "造成傷害增加",
                  type: 3,
                  condition: Condition.NONE,
                  duration: 1,
                  _3: {
                    id: "188-passive-4-1",
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
            id: "188-passive4",
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
    case "191": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "191-passive-1",
          name: "第一回合時，觸發「使我方全體妨礙者必殺技傷害增加35%(50回合)」",
          type: 11,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _11: {
            target: Target.OBSTRUCTER,
            applySkill: [
              {
                id: "191-passive-1-1",
                name: "必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 50,
                _0: {
                  value: 0.35,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            ],
          },
        },
        {
          id: "191-passive-2",
          name: "攻擊時，觸發「以自身攻擊力10%使我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ATTACK,
          duration: 100,
          _6: {
            base: false,
            duration: 1,
            value: 0.1,
            target: Target.ALL_ALLIES,
            affectType: AffectType.RAW_ATK,
          },
        },
        {
          id: "191-passive-3",
          name: "第一回合時，觸發「使我方全體妨礙者造成傷害增加20%(50回合)」",
          type: 11,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _11: {
            target: Target.OBSTRUCTER,
            applySkill: [
              {
                id: "191-passive-3-1",
                name: "造成傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 50,
                _0: {
                  value: 0.2,
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            ],
          },
        },
      ];
      break;
    }
    case "198": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "198-passive-1",
          name: "每經過1回合，觸發「使敵方全體受到傷害增加5%(最多11層)」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            target: Target.ENEMY,
            increaseStack: 1,
            targetSkill: "198-passive-1-1",
            applySkill: {
              id: "198-passive-1-1",
              name: "受到傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "198-passive-1-1",
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
          id: "198-passive-2",
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
          id: "198-passive-3",
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
          id: "198-passive-4",
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
            id: "198-passive-5",
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
            id: "198-passive-6",
            name:
              "必殺時，觸發「使目標受到《鬼抓人大賽開始喏∼》 賦予的受到傷害增加狀態增加4層」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              target: Target.ENEMY,
              increaseStack: 4,
              targetSkill: "198-passive-1-1",
              applySkill: {
                id: "198-passive-1-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "198-passive-1-1",
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

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "198-passive4",
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

    case "196":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "196-passive-1",
          name: "普攻時，觸發「使我方全體普攻傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "196-passive-1-1",
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
          id: "196-passive-2",
          name: "必殺時，觸發「使我方全體必殺技傷害增加10%(2回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "196-passive-2-1",
                name: "必殺技傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  value: 0.1,
                  affectType: AffectType.INCREASE_ULTIMATE_DMG,
                },
              },
            ],
          },
        },
        {
          id: "196-passive-3",
          name: "每經過4回合，觸發「使敵方全體受到傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "196-passive-3-1",
                name: "受到傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.3,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
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
            character.class === CharacterClass.OBSTRUCTER ||
            character.class === CharacterClass.PROTECTOR
          ) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: "196-passive-4",
                // 行動時，觸發「使我方全體攻擊力增加15%(50回合)」
                name: "行動時，觸發「使我方全體攻擊力增加15%(50回合)」",
                type: 11,
                condition: Condition.MOVE,
                duration: 1,
                _11: {
                  target: Target.ALL_ALLIES,
                  applySkill: [
                    {
                      id: "196-passive-4-1",
                      name: "攻擊力增加",
                      type: 0,
                      condition: Condition.NONE,
                      duration: 50,
                      _0: {
                        value: 0.15,
                        affectType: AffectType.INCREASE_ATK,
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
            id: "196-passive-5",
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
    case "508":
      {
        const lowestHP = gameState.characters.reduce((prev, current) =>
          prev && prev.maxHp < current.maxHp ? prev : current
        );
        const lowestHpIndex = gameState.characters.findIndex(
          (character) => character.id === lowestHP.id,
        );
        gameState.characters[lowestHpIndex].buff = [
          ...gameState.characters[lowestHpIndex].buff,
          {
            id: "508-passive-1",
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
              id: "508-passive-2",
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
            id: "508-passive-3",
            name: "必殺時，觸發「使我方全體被治療時回復量增加20%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "508-passive-3-1",
              target: Target.ALL_ALLIES,
              applySkill: {
                id: "508-passive-3-1",
                name: "被治療時回復量增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "508-passive-3-1",
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
                  id: "508-passive-4",
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
                  id: "508-passive-5",
                  name: "防禦時，觸發「我方全體受到持續型治療增加20%(1回合)」",
                  type: 11,
                  condition: Condition.GUARD,
                  duration: 100,
                  _11: {
                    target: Target.ALL_ALLIES,
                    applySkill: [
                      {
                        id: "508-passive-5-1",
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
              id: "508-passive4",
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
      break;
    // 魔法少女 朱諾安
    case "515":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "515-passive-1",
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
          id: "515-passive-2",
          name: "被治療時，觸發「使我方全體攻擊力增加20%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "515-passive-2-1",
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
      gameState.characters.forEach((character, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "515-passive-3",
            name: "給予我方全體「當前HP≧95%時，發動『造成傷害增加15%』」",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value: 0.15,
            },
          },
        ];
      });

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "515-passive4",
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
    case "517":
      gameState.characters.forEach((character, index) => {
        if (character.attribute === CharacterAttribute.WATER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "517-passive-1",
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
              id: "517-passive-2",
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
            // 使我方全體攻擊者和妨礙者獲得
            if (
              character.class === CharacterClass.ATTACKER ||
              character.class === CharacterClass.OBSTRUCTER
            ) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: "517-passive-3",
                  name: "普攻時，追加『以自身攻擊力15%對目標造成傷害』",
                  type: 1,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _1: {
                    value: 0.15,
                    isTrigger: false,
                    target: Target.ENEMY,
                    damageType: 1,
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
                  id: "517-passive-4",
                  name: "普攻時，追加『以自身攻擊力15%對目標造成傷害』",
                  type: 1,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _1: {
                    value: 0.15,
                    isTrigger: false,
                    target: Target.ENEMY,
                    damageType: 1,
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
                  id: "517-passive-5",
                  name: "普攻時，追加『使目標受到普攻傷害增加9%(最多5層)』",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "517-passive-5-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "517-passive-5-1",
                      name: "受到普攻傷害增加",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "517-passive-5-1",
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
                  id: "517-passive-6",
                  name: "普攻時，追加『使目標受到普攻傷害增加9%(最多5層)』",
                  type: 4,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _4: {
                    increaseStack: 1,
                    targetSkill: "517-passive-6-1",
                    target: Target.ENEMY,
                    applySkill: {
                      id: "517-passive-6-1",
                      name: "受到普攻傷害增加",
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: "517-passive-6-1",
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
                id: "517-passive-7",
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
                id: "517-passive-8",
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
          // 使自身普攻傷害增加10%
          {
            id: "517-passive4",
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

    //夏日 菲歐菈
    case "518":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "518-passive-1",
          name: "必殺時，觸發「使我方全體攻擊力增加40%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "518-passive-1-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "518-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "518-passive-1-1",
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
          id: "518-passive-2",
          name: "被治療時，觸發「使我方全體攻擊力增加10%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "518-passive-2-1",
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
          id: "518-passive-3",
          name: "必殺時，觸發「使我方全體必殺技傷害增加30%(最多1層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "518-passive-3-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "518-passive-3-1",
              name: "必殺技傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "518-passive-3-1",
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
          id: "518-passive-4",
          name: "被治療時，觸發「使我方全體必殺技傷害增加10%(1回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "518-passive-4-1",
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
            id: "518-passive-5",
            name: "必殺時，觸發「使我方增造成傷害加20%(最多1層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "518-passive-5-1",
              target: Target.ALL_ALLIES,
              applySkill: {
                id: "518-passive-5-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "518-passive-3-1",
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
            id: "518-passive-6",
            name: "被治療時，觸發「使我方全體造成傷害增加5%(1回合)」",
            type: 11,
            condition: Condition.GET_HEAL,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "518-passive-6-1",
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
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "518-passive4-1",
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
    case "520": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "520-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加50%(3回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "520-passive-1-1",
                name: "攻擊力增加50%",
                type: 0,
                condition: Condition.NONE,
                duration: 3,
                _0: {
                  value: 0.5,
                  affectType: AffectType.INCREASE_ATK,
                },
              },
            ],
          },
        },
      ];

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "520-passive-2",
          name:
            "每經過1回合，觸發「使自身獲得必殺時，觸發『清除自身《填裝火藥》的攻擊力增加(回合型)效果』(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "520-passive-2-1",
                name:
                  "必殺時，觸發『清除自身《填裝火藥》的攻擊力增加(回合型)效果』(1回合)」",
                type: 24,
                duration: 1,
                condition: Condition.ULTIMATE,
                _24: {
                  target: Target.SELF,
                  clearSkill: ["520-passive-1-1"],
                },
              },
            ],
          },
        },
      ];

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "520-passive-3",
          name: "普攻時，觸發「《是的船長！》」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "520-passive-3-1",
                name:
                  "使自身獲得必殺時，觸發「以自身攻擊力80%對目標造成傷害」(3回合)",
                type: 1,
                condition: Condition.ULTIMATE,
                duration: 3,
                _1: {
                  value: 0.8,
                  isTrigger: true,
                  target: Target.ENEMY,
                  damageType: 1,
                },
              },
            ],
          },
        },
      ];

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "520-passive-4",
          name:
            "每經過1回合，觸發「使自身獲得必殺時，觸發『清除自身《是的船長！》的效果』(1回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _11: {
            target: Target.SELF,
            applySkill: [
              {
                id: "520-passive-4-1",
                name:
                  "必殺時，觸發『清除自身《填裝火藥》的攻擊力增加(回合型)效果』(1回合)」",
                type: 24,
                duration: 1,
                condition: Condition.ULTIMATE,
                _24: {
                  target: Target.SELF,
                  clearSkill: ["520-passive-3-1"],
                },
              },
            ],
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].maxCd = 3;
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "520-passive-5",
            name: "普攻時，觸發「使自身造成傷害增加20%(3回合)」",
            type: 11,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _11: {
              target: Target.SELF,
              applySkill: [
                {
                  id: "520-passive-5-1",
                  name: "自身造成傷害增加20%",
                  type: 0,
                  condition: Condition.ULTIMATE,
                  duration: 3,
                  _0: {
                    value: 0.2,
                    affectType: AffectType.INCREASE_DMG,
                  },
                },
              ],
            },
          },
        ];
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "520-passive-6",
            name:
              "每經過1回合，觸發「使自身獲得必殺時，觸發『清除自身《太小聲囉！》的造成傷害增加(回合型)效果』(1回合)",
            type: 11,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _11: {
              target: Target.SELF,
              applySkill: [
                {
                  id: "520-passive-6-1",
                  name:
                    "必殺時，觸發『清除自身《太小聲囉！》的造成傷害增加(回合型)效果』(1回合)",
                  type: 24,
                  duration: 1,
                  condition: Condition.ULTIMATE,
                  _24: {
                    target: Target.SELF,
                    clearSkill: ["520-passive-5-1"],
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
            id: "520-passive4",
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
    case "522":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "522-passive-1",
          name: "必殺時，觸發「使我方全體必殺技傷害增加20%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "522-passive-1-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "522-passive-1-1",
              name: "必殺技傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "522-passive-1-1",
                name: "必殺技傷害增加20%",
                value: 0.2,
                stack: 1,
                maxStack: 2,
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
              },
            },
          },
        },
        {
          id: "522-passive-2",
          name: "必殺時，觸發「以自身攻擊力150%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 1.5,
            isTrigger: true,
            target: Target.ENEMY,
            damageType: 1,
          },
        },
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "522-passive-3",
            name: "普攻時，觸發「以自身攻擊力50%對目標造成傷害」",
            type: 1,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _1: {
              value: 0.5,
              isTrigger: true,
              target: Target.ENEMY,
              damageType: 1,
            },
          },
          {
            id: "522-passive-4",
            name: "必殺時，觸發「以自身攻擊力100%對目標造成傷害」",
            type: 1,
            condition: Condition.ULTIMATE,
            duration: 100,
            _1: {
              value: 1,
              isTrigger: true,
              target: Target.ENEMY,
              damageType: 1,
            },
          },
          {
            id: "522-passive-5",
            name:
              "每經過4回合，觸發「給予我方全體必殺時，觸發「使我方全體觸發技效果增加30%(4回合)」(4回合)(施放必殺後會消除此效果)」",
            type: 11,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 4,
            duration: 100,
            _11: {
              target: Target.ALL_ALLIES,
              applySkill: [
                {
                  id: "522-passive-5-1",
                  // 必殺時，觸發「使我方全體觸發技效果增加30%(4回合)」(4回合)
                  name:
                    "必殺時，觸發「使我方全體觸發技效果增加30%(4回合)」(4回合)(施放必殺後會消除此效果)",
                  type: 11,
                  condition: Condition.ULTIMATE,
                  duration: 4,
                  _11: {
                    target: Target.ALL_ALLIES,
                    deleteSelf: true,
                    applySkill: [
                      {
                        id: "522-passive-5-1-1",
                        name: "觸發技效果增加",
                        type: 0,
                        condition: Condition.NONE,
                        duration: 4,
                        _0: {
                          value: 0.3,
                          affectType: AffectType.INCREASE_TRIGGER_EFFECT,
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
            id: "522-passive4",
            name: "必殺時，觸發「以自身攻擊力30%對目標造成傷害」",
            type: 1,
            condition: Condition.ULTIMATE,
            duration: 100,
            _1: {
              value: 0.3,
              isTrigger: true,
              target: Target.ENEMY,
              damageType: 1,
            },
          },
        ];
      }

      break;

    // 杏仁咪嚕
    case "523":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "523-passive-1",
          name: "必殺時，觸發「使自身攻擊力增加40%(最多2層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "523-1",
            target: Target.SELF,
            applySkill: {
              id: "523-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "523-1",
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
          id: "523-passive-2",
          name: "必殺時 ，觸發「使目標受到必殺技傷害增加20%(4回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "523-passive-2-1",
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
            id: "523-passive-3",
            name: "必殺時 ，觸發「使目標受到傷害增加20%(4回合)」",
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "523-passive-3-1",
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
            id: "523-passive-4",
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

    case "525":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "525-1",
          name: "必殺時，追加「以自身攻擊力250%對目標造成傷害」",
          type: 1,
          condition: Condition.ULTIMATE,
          duration: 100,
          _1: {
            value: 2.5,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 1,
          },
        },
        {
          id: "525-2",
          name:
            "每經過3回合，觸發「使自身獲得必殺時，觸發『以自身攻擊力25%使我方攻擊者攻擊力增加(1回合)』(1回合)」",
          type: 2,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _2: {
            id: "525-2-1",
            name: "必殺時,觸發 以自身攻擊力25%使我方攻擊者攻擊力增加(1回合)",
            type: 6,
            target: Target.SELF,
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
        },
        {
          id: "525-3",
          name:
            "每經過3回合，觸發「使自身獲得必殺時，觸發『以自身攻擊力25%使我方妨礙者攻擊力增加(1回合)』(1回合)」",
          type: 2,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 3,
          duration: 100,
          _2: {
            id: "525-3-1",
            name:
              "必殺時,觸發 『以自身攻擊力25%使我方妨礙者攻擊力增加(1回合)』(1回合)」",
            type: 6,
            duration: 1,
            target: Target.SELF,
            condition: Condition.ULTIMATE,
            _6: {
              base: false,
              value: 0.25,
              duration: 1,
              target: Target.OBSTRUCTER,
              affectType: AffectType.RAW_ATK,
            },
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
                id: "525-4",
                name: "必殺時，追加『以自身攻擊力100%對目標造成傷害』(50回合)",
                type: 101,
                condition: Condition.ULTIMATE,
                duration: 50,
                _101: {
                  value: 1,
                  isTrigger: false,
                  target: Target.ENEMY,
                  damageType: 1,
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
            id: "525-passive4",
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
    case "526":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "526-1",
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
          id: "526-passive-2",
          name: "每經過1回合時，觸發「給予自身『連環陷阱(最多9層)』」",
          type: 19,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: "526-passive-2-1",
            target: Target.SELF,
            applySkill: {
              id: "526-passive-2-1",
              name: "『連環陷阱』",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "526-passive-2-1",
                name: "連環陷阱",
                stack: 1,
                maxStack: 9,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "526",
                checkSkillId: "526-passive-2-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 6,
                activateBuffId: "526-passive-6",
              },
              {
                characterId: "526",
                checkSkillId: "526-passive-2-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 8,
                activateBuffId: "526-passive-7",
              },
            ],
          },
        },
        {
          id: "526-passive-3",
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
          id: "526-passive-6",
          name: "當自身「連環陷阱」層數>6層時，開啟「攻擊力增加20%」",
          type: 0,
          deactivated: "deactivated",
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.2,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: "526-passive-7",
          name: "當自身「連環陷阱」層數>9層時，開啟「攻擊力增加20%」",
          type: 0,
          deactivated: "deactivated",
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
            id: "526-7",
            name:
              "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火屬性傷害增加3%(1回合)』」",
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              value: 0.03,
              target: Target.SELF,
              targetSkill: "526-passive-2-1",
              applyTarget: Target.ENEMY,
              applySkill: {
                id: "526-7-1",
                name: "受到火屬性傷害增加3%",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.03,
                  affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                },
              },
            },
          },
          {
            id: "526-8",
            name:
              "必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到水屬性傷害增加3%(1回合)』」",
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              value: 0.03,
              target: Target.SELF,
              targetSkill: "526-passive-2-1",
              applyTarget: Target.ENEMY,
              applySkill: {
                id: "526-7-1",
                name: "受到水屬性傷害增加3%",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.03,
                  affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
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
            id: "526-9",
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

    // 使自身攻擊力增加10%
    case "527":
      break;
    case "528": {
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "528-passive-1",
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
          id: "528-passive-2",
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
              id: "528-passive-3",
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
          id: "528-passive-4",
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
                id: "528-passive-5",
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
            id: "528-passive-6",
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
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "528-passive-5",
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
    case "529": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "529-passive-1",
          name: "每經過1回合，觸發「使我方全體必殺技傷害增加3%(最多15層)」",
          type: 21,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "529-passive-1-1",
                name:
                  "每經過1回合，觸發「使我方全體必殺技傷害增加3%(最多15層)」",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "529-passive-1-1-1",
                  target: Target.ALL_ALLIES,
                  applySkill: {
                    id: "529-passive-1-1-1",
                    name: "受到傷害增加20%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "529-passive-1-1-1",
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
          id: "529-passive-2",
          name:
            "被攻擊時，觸發「使《油門當剎車踩》的我方全體必殺技傷害增加效果增加1層」",
          type: 21,
          condition: Condition.RECEIVED_ATTACK,
          conditionTurn: 1,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "529-passive-1-1",
                name:
                  "每經過1回合，觸發「使我方全體必殺技傷害增加3%(最多15層)」",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "529-passive-1-1-1",
                  target: Target.ALL_ALLIES,
                  applySkill: {
                    id: "529-passive-1-1-1",
                    name: "必殺技傷害增加3%",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "529-passive-1-1-1",
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
          id: "529-passive-3",
          name: "被攻擊時，觸發「使自身造成傷害增加10%(最多4層)」",
          type: 21,
          condition: Condition.RECEIVED_ATTACK,
          conditionTurn: 1,
          duration: 100,
          _21: {
            trigger: [
              {
                id: "529-passive-3-1",
                name: "被攻擊時，觸發「使自身造成傷害增加10%(最多4層)」",
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: "529-passive-3-1-1",
                  target: Target.ALL_ALLIES,
                  applySkill: {
                    id: "529-passive-3-1-1",
                    name: "造成傷害增加10%(最多4層)",
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: "529-passive-3-1-1",
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

    case "531":
      break;
    case "532":
      // "532": "幽夜女爵 卡蒂雅",
      //
      // 必殺時，追加「使目標受到傷害增加15%(7回合)」

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "532-passive-1",
          name: "必殺時，追加「使目標受到傷害增加15%(7回合)」",
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          _111: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "532-passive-1-1",
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
          id: "532-passive-3",
          name: "必殺時，追加「使目標受到必殺技傷害增加20%(7回合)」",
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          _111: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "532-passive-3-1",
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
            id: "523-passive4",
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
      // 必殺時，追加「以自身最大HP7%對我方全體施放護盾(1回合)」

      break;
    case "601":
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: "601-passive-1",
              name: "每經過1回合，使目標受到普攻傷害增加30%",
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 1,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: "601-passive-1-1",
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
              id: "601-passive-2",
              name: "必殺時，觸發「使我方『夏日 千鶴』攻擊力增加20%(4回合)」",
              type: 13,
              condition: Condition.ULTIMATE,
              duration: 100,
              _13: {
                target: "601",
                applySkill: [
                  {
                    id: "601-passive-2-1",
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
            id: "601-passive-3",
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
            id: "601-passive-4",
            name: "必殺時，觸發「使目標受到傷害增加20%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "601-passive-4-1",
              target: Target.ENEMY,
              applySkill: {
                id: "601-passive-4-1",
                name: "受到傷害增加20%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "601-passive-4-1",
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
            id: "601-passive4",
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
    case "801":
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "801-passive-4",
            name:
              "每經過1回合時，觸發「以自身攻擊力25使我方全體攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _6: {
              base: false,
              duration: 1,
              value: 0.25,
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
            id: "801-passive4",
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
    case "802":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "802-passive-1",
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
          id: "802-passive-2",
          name:
            "必殺時，觸發「以自身攻擊力15使自身以外我方全體攻擊力增加(1回合)」",
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            base: false,
            duration: 1,
            value: 0.15,
            target: Target.ALL_ALLIES_EXCEPT_SELF,
            affectType: AffectType.RAW_ATK,
          },
        },
      ];
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "802-passive-5",
            name:
              "必殺時，觸發「以自身攻擊力15使自身以外我方全體攻擊力增加(1回合)」",
            type: 6,
            condition: Condition.ULTIMATE,
            duration: 100,
            _6: {
              base: false,
              duration: 1,
              value: 0.15,
              target: Target.ALL_ALLIES_EXCEPT_SELF,
              affectType: AffectType.RAW_ATK,
            },
          },
        ];
      }
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "802-passive4",
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
    case "803": {
      // 使我方站位3的隊員獲得攻擊時，觸發「使【偶像經紀人 梅絲米奈雅】獲得1層《妾身，蛇后，小白臉！》(最多4層)」
      const pos = randomizePos(gameState, position);
      if (pos === -1 || !pos) {
        return;
      } else {
        gameState.characters[pos].buff = [
          ...gameState.characters[pos].buff,
          {
            id: "803-passive-1",
            name: "使【偶像經紀人 梅絲米奈雅】獲得1層《妾身，蛇后，小白臉！》",
            type: 13,
            condition: Condition.ATTACK,
            duration: 100,
            _3: {
              id: "803-passive-1-1",
              name: "《妾身，蛇后，小白臉！》",
              stack: 1,
              maxStack: 4,
              value: 0,
              affectType: AffectType.NONE,
            },
          },
        ];
      }

      const pos2 = randomizePos(gameState, position);
      if (pos2 === -1 || !pos2) {
        return;
      } else {
        gameState.characters[pos2].buff = [
          ...gameState.characters[pos2].buff,
          {
            id: "803-passive-2",
            name: "攻擊時，觸發「使【偶像經紀人 梅絲米奈雅】攻擊力增加」",
            type: 13,
            condition: Condition.ATTACK,
            duration: 100,
            _13: {
              target: "803",
              applySkill: [
                {
                  id: "803-passive-2-1",
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
        ];
      }

      const pos3 = randomizePos(gameState, position);
      if (pos3 === -1 || !pos3) {
        return;
      } else {
        gameState.characters[pos3].buff = [
          ...gameState.characters[pos3].buff,
          {
            id: "803-passive-3",
            name: "造成傷害減少100%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 1,
              affectType: AffectType.DECREASE_DMG,
            },
          },
        ];
      }

      // 必殺時，觸發「清除自身《妾身，蛇后，小白臉！》的所有層數」
      // 當《妾身，蛇后，小白臉！》≧1時，發動「使自身普攻傷害增加75%」
      // 當《妾身，蛇后，小白臉！》≧2時，發動「使自身攻擊力增加100%」
      // 當《妾身，蛇后，小白臉！》≧3時，發動「使自身攻擊力增加100%」
      // 當《妾身，蛇后，小白臉！》=4時，發動「自身必殺技傷害增加60%」
      // 使我方站位3的隊員獲得必殺時，觸發「使【偶像經紀人 梅絲米奈雅】獲得造成傷害增加40%(2回合)」
      // 自身第1回合時，觸發「使自身必殺時不再清除《妾身，蛇后，小白臉！》的所有層數」
      // 使自身造成傷害增加7.5%
      break;
    }
    case "804":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "804-passive-1",
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
          id: "804-passive-1",
          name:
            "必殺時，觸發「使我方全體水屬性的攻擊者、守護者、妨礙者獲得《傳遞飛刀》」",
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
                id: "804-passive-1-1",
                name: "普攻時，追加「以自身攻擊力30%對目標造成傷害」(1回合)",
                type: 101,
                condition: Condition.BASIC_ATTACK,
                duration: 1,
                _101: {
                  value: 0.3,
                  isTrigger: false,
                  target: Target.ENEMY,
                  damageType: 0,
                },
              },
            ],
          },
        },
        {
          id: "804-passive-2",
          name:
            "必殺時，觸發「使我方全體水屬性的攻擊者、守護者、妨礙者獲得「必殺時，觸發『使我方賞金獵人安潔娜爾』獲得《傳遞飛刀》』」",
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
                id: "804-passive-2-1",
                name: "必殺時，觸發「使我方賞金獵人安潔娜爾獲得《傳遞飛刀》」",
                type: 13,
                condition: Condition.ULTIMATE,
                duration: 4,
                _13: {
                  target: "804",
                  applySkill: [
                    {
                      id: "804-passive-2-2",
                      name:
                        "普攻時，追加「以自身攻擊力30%對目標造成傷害」(1回合)",
                      type: 101,
                      condition: Condition.BASIC_ATTACK,
                      duration: 1,
                      _101: {
                        value: 0.3,
                        isTrigger: false,
                        target: Target.ENEMY,
                        damageType: 0,
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
            id: "804-passive-3",
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
            id: "804-passive-4",
            name:
              "第一回合時，使自身以外的我方全體水屬性隊員當前必殺技CD減少1回合",
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
            id: "804-passive4",
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
    case "805":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "805-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加15%(最多6層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "805-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "805-passive-1-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "805-passive-1-1",
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
          id: "805-passive-2",
          name: "普攻時，觸發「使目標受到普攻傷害增加15%(最多6層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "805-passive-2-1",
            target: Target.ENEMY,
            applySkill: {
              id: "805-passive-2-1",
              name: "受到普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "805-passive-2-1",
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
            id: "805-passive-3",
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
            id: "805-passive-4",
            name: "必殺時，觸發「使目標受到風屬性傷害增加10%(最多3層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "805-passive-4-1",
              target: Target.ENEMY,
              applySkill: {
                id: "805-passive-4-1",
                name: "受到風屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "805-passive-4-1",
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
            id: "805-passive4",
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

    case "806":
      //     使自身以外我方所有光屬性攻擊者免疫必殺技CD變動效果
      {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "806-passive-2",
            // 必殺時，觸發「使自身當前必殺技CD減少2回合」
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
            id: "806-passive-3",
            name: "必殺時，觸發「使自身造成傷害增加15%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "806-passive-3-1",
              target: Target.SELF,
              applySkill: {
                id: "806-passive-3-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "806-passive-3-1",
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
            id: "806-passive-4",
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
            id: "806-passive-5",
            name: "必殺時，觸發「使目標受到光屬性傷害增加20%(最多1層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "806-passive-5-1",
              target: Target.ENEMY,
              applySkill: {
                id: "806-passive-5-1",
                name: "受到光屬性傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "806-passive-5-1",
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
            id: "806-passive4",
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
    case "808": {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: "808-passive-1",
            name: "使我方全體必殺技傷害增加30%",
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              value: 0.3,
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
            },
          },
        ];
      });

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "808-passive-2",
          name: "造成傷害增加10%",
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            value: 0.1,
            affectType: AffectType.INCREASE_DMG,
          },
        },
        {
          id: "808-passive-3",
          name: "必殺時，觸發「使我方全體造成傷害增加20%(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "808-passive-3-1",
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
        // 防禦時，觸發「使我方全體被治療時回復量增加20%(1回合)
      ];

      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "808-passive-4",
            name: "普攻時，觸發「使自身『降臨值(最多10層)』增加1層」",
            type: 19,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            _19: {
              increaseStack: 1,
              targetSkill: "808-passive-4-1",
              target: Target.SELF,
              applySkill: {
                id: "808-passive-4-1",
                name: "降臨值",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "808-passive-4-1",
                  name: "降臨值",
                  stack: 1,
                  maxStack: 10,
                  value: 0,
                  affectType: AffectType.NONE,
                },
              },
              checkActivation: [
                {
                  characterId: "808",
                  checkSkillId: "808-passive-4-1",
                  skillStackCondition: SkillStackCondition.EQUAL,
                  activateIfStack: 10,
                  activateBuffId: "808-passive-6",
                },
              ],
            },
          },
          {
            id: "808-passive-5",
            name: "必殺時，觸發「使自身『降臨值(最多10層)』增加3層」",
            type: 19,
            condition: Condition.ULTIMATE,
            duration: 100,
            _19: {
              increaseStack: 3,
              targetSkill: "808-passive-4-1",
              target: Target.SELF,
              applySkill: {
                id: "808-passive-4-1",
                name: "降臨值",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "808-passive-4-1",
                  name: "降臨值",
                  stack: 1,
                  maxStack: 10,
                  value: 0,
                  affectType: AffectType.NONE,
                },
              },
              checkActivation: [
                {
                  characterId: "808",
                  checkSkillId: "808-passive-4-1",
                  skillStackCondition: SkillStackCondition.EQUAL,
                  activateIfStack: 10,
                  activateBuffId: "808-passive-6",
                },
                {
                  characterId: "808",
                  checkSkillId: "808-passive-4-1",
                  skillStackCondition: SkillStackCondition.EQUAL,
                  activateIfStack: 10,
                  activateBuffId: "808-passive-7",
                },
              ],
            },
          },
          {
            id: "808-passive-6",
            name: "使目標受到傷害增加5%",
            type: 4,
            condition: Condition.BASIC_ATTACK,
            duration: 100,
            deactivated: "deactivated",
            _4: {
              increaseStack: 1,
              targetSkill: "808-passive-6-1",
              target: Target.ENEMY,
              applySkill: {
                id: "808-passive-6-1",
                name: "受到傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "808-passive-6-1",
                  name: "受到傷害增加5%",
                  value: 0.05,
                  stack: 1,
                  maxStack: 9,
                  affectType: AffectType.INCREASE_DMG_RECEIVED,
                },
              },
            },
          },
          {
            id: "808-passive-7",
            name: "必殺時，觸發「以自身最大HP50%對目標造成傷害」",
            type: 1,
            condition: Condition.ULTIMATE,
            duration: 100,
            deactivated: "deactivated",
            _1: {
              value: 0.5,
              target: Target.ENEMY,
              damageType: DamageType.ULTIMATE_HP,
              action: CharacterAction.ULTIMATE,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "808-passive4",
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

    case "811":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "811-passive-1",
          name:
            "普攻時，追加「以自身當前HP1%對自身造成真實傷害(可觸發「被攻擊時」觸發效果)」",
          condition: Condition.BASIC_ATTACK,
          type: 105,
          duration: 100,
        },
        {
          id: "811-passive-2",
          name: "普攻時，追加「並使我方全體普攻傷害增加5%(最多10層)」)",
          condition: Condition.BASIC_ATTACK,
          type: 104,
          duration: 100,
          _104: {
            increaseStack: 1,
            targetSkill: "811-passive-2-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "811-passive-2-1",
              name: "普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "811-passive-2-1",
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
          id: "811-passive-3",
          name:
            "必殺時，追加「以自身當前HP1%對自身造成真實傷害(可觸發「被攻擊時」觸發效果)」",
          condition: Condition.ULTIMATE,
          type: 105,
          duration: 100,
        },
        {
          id: "811-passive-4",
          name: "必殺時，追加「並使我方全體必殺傷害增加10%(最多3層)」)",
          condition: Condition.ULTIMATE,
          type: 104,
          duration: 100,
          _104: {
            increaseStack: 1,
            targetSkill: "811-passive-4-1",
            target: Target.ALL_ALLIES,
            applySkill: {
              id: "811-passive-4-1",
              name: "普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "811-passive-4-1",
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
          id: "811-passive-5",
          name: "被攻擊時，觸發「使我方全體造成傷害增加1.33%(最多15層)」",
          type: 4,
          condition: Condition.RECEIVED_ATTACK,
          duration: 100,
          _4: {
            target: Target.ALL_ALLIES,
            increaseStack: 1,
            targetSkill: "811-passive-5-1",
            applySkill: {
              id: "811-passive-5-1",
              name: "造成傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "811-passive-5-1",
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
            id: "811-passive-6",
            name: "被攻擊時，觸發「使敵方全體受到傷害增加1.33%(最多15層)」",
            type: 4,
            condition: Condition.RECEIVED_ATTACK,
            duration: 100,
            _4: {
              target: Target.ENEMY,
              increaseStack: 1,
              targetSkill: "811-passive-6-1",
              applySkill: {
                id: "811-passive-6-1",
                name: "造成傷害增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "811-passive-6-1",
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
            id: "811-passive4",
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
    case "812":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "812-passive-1",
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
          id: "812-passive-2",
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
          id: "812-passive-3",
          name: "每經過1回合時，觸發「使自身攻擊力增加5%(最多20層)」",
          type: 4,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "812-passive-3-1",
            target: Target.SELF,
            applySkill: {
              id: "812-passive-3-1",
              name: "攻擊力增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "812-passive-3-1",
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
          id: "812-passive-4",
          name:
            "普攻時，觸發「使敵方全體受到『夏日 凱薩』傷害增加4%(最多15層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "812-passive-4-1",
            target: Target.ENEMY,
            applySkill: {
              id: "812-passive-4-1",
              name: "受到傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "812-passive-4-1",
                name: "受到X角色的傷害增加4%",
                value: 0.04,
                stack: 1,
                maxStack: 15,
                specificCharId: "812",
                affectType: AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED,
              },
            },
          },
        },
        {
          id: "812-passive-5",
          name: "必殺時，觸發「使自身造成傷害增加20%(最多4層)」",
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "812-passive-5-1",
            target: Target.SELF,
            applySkill: {
              id: "812-passive-5-1",
              name: "造成傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "812-passive-5-1",
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
            // weird
            id: "812-passive-6",
            name: "必殺時，追加「以自身攻擊力150%對目標造成傷害」",
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 100,
            _101: {
              value: 1.5,
              isTrigger: false,
              target: Target.ENEMY,
              damageType: 1,
            },
          },
          {
            id: "812-passive-7",
            name:
              "每經過1回合時，觸發「以自身攻擊力5%使我方全體攻擊力增加(1回合)」",
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
            id: "812-passive4",
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
    case "813":
      // 每Wave的第9回合時，觸發「使敵方全體受到傷害增加50%(50回合)
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "813-passive-1",
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
        // 每Wave的第9回合時，觸發「使敵方全體受到傷害增加50%(50回合)
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "813-passive-2",
            name:
              "每Wave的第9回合時，觸發「使敵方全體受到傷害增加50%(50回合)」",
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            duration: 100,
            conditionTurn: 9,
            _11: {
              target: Target.ENEMY,
              applySkill: [
                {
                  id: "813-passive-2-1",
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
            id: "813-passive4",
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
    case "814":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "814-passive-1",
          name: "第1回合，觸發「使自身獲得1層《孱弱的假象》(最多1層)」",
          type: 19,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: "814-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "814-passive-1-1",
              name: "孱弱的假象",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "814-passive-1-1",
                name: "孱弱的假象",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "814",
                checkSkillId: "814-passive-1-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: "814-passive-3",
              },
            ],
          },
        },
        {
          id: "814-passive-2",
          name: "必殺時，觸發「使自身獲得1層《孱弱的假象》(最多1層)」",
          type: 19,
          condition: Condition.ULTIMATE,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: "814-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "814-passive-1-1",
              name: "孱弱的假象",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "814-passive-1-1",
                name: "孱弱的假象",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "814",
                checkSkillId: "814-passive-1-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: "814-passive-3",
              },
            ],
          },
        },
        {
          id: "814-passive-3",
          name: "防禦時，觸發「使自身獲得嘲諷(1回合)」且獲得《反擊》效果」",
          type: 22,
          condition: Condition.GUARD,
          duration: 100,
          deactivated: "deactivated",
          _22: {
            increaseStack: 1,
            targetSkill: "814-passive-3-1",
            target: Target.SELF,
            applySkill: {
              id: "814-passive-3-1",
              name: "反擊",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "814-passive-3-1",
                name: "反擊",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "814",
                checkSkillId: "814-passive-1-1",
                skillStackCondition: SkillStackCondition.EQUAL,
                activateIfStack: 1,
                applySkills: [
                  {
                    id: "814-passive-3-2",
                    //
                    name:
                      "被攻擊時，觸發「使我方全體造成傷害增加35%(4回合)(1回合)(觸發1次後解除)",
                    type: 11,
                    condition: Condition.RECEIVED_ATTACK,
                    duration: 2,
                    deleteSelf: true,
                    _11: {
                      target: Target.ALL_ALLIES,
                      applySkill: [
                        {
                          id: "814-passive-3-2",
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
                    id: "814-passive-4",
                    name:
                      "被攻擊時，清除自身的《孱弱的假象》的所有層數」(1回合)(觸發1次後解除)",
                    type: 20,
                    condition: Condition.RECEIVED_ATTACK,
                    duration: 2,
                    deleteSelf: true,
                    _20: {
                      targetChar: "814",
                      targetSkill: "814-passive-1-1",
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
          id: "814-passive-5",
          name: "防禦時，觸發「使自身獲得1層《反攻的時機》(最多1層)」",
          type: 19,
          condition: Condition.GUARD,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: "814-passive-5-1",
            target: Target.SELF,
            applySkill: {
              id: "814-passive-5-1",
              name: "反攻的時機",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "814-passive-5-1",
                name: "反攻的時機",
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: "814",
                checkSkillId: "814-passive-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: "814-passive-6",
              },
              {
                characterId: "814",
                checkSkillId: "814-passive-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: "814-passive-7",
              },
              {
                characterId: "814",
                checkSkillId: "814-passive-5-1",
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: "814-passive-8",
              },
            ],
          },
        },
        {
          id: "814-passive-6",
          name: "必殺時，追加「以自身攻擊力75%對目標造成傷害2次」",
          type: 101,
          condition: Condition.ULTIMATE,
          deactivated: "deactivated",
          duration: 100,
          _101: {
            value: 0.75,
            isTrigger: false,
            target: Target.ENEMY,
            damageType: 1,
            multiple: 2,
          },
        },
        {
          id: "814-passive-7",
          name: "必殺時，觸發「清除自身《反攻的時機》的所有層數」",
          type: 23,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: "deactivated",
          _23: {
            clearSkill: ["814-passive-5-1"],
            targetChar: "814",
            targetSkill: ["814-passive-6", "814-passive-7", "814-passive-8"],
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
            id: "814-passive-8",
            name: "必殺時，追加「以自身攻擊力45.5%對目標造成傷害8次」",
            type: 101,
            condition: Condition.ULTIMATE,
            deactivated: "deactivated",
            duration: 100,
            _101: {
              value: 0.455,
              isTrigger: false,
              target: Target.ENEMY,
              damageType: 1,
              multiple: 8,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "814-passive4",
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
    case "816":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "816-passive-1",
          name: "普攻時，觸發「使自身攻擊力增加40%(最多2層)」",
          type: 4,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "816-passive-1-1",
            target: Target.SELF,
            applySkill: {
              id: "816-passive-1-1",
              name: "攻擊力增加40%",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "816-passive-1-1",
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
          id: "816-passive-2",
          name: "必殺時，觸發「清除自身《屏氣凝神》的攻擊力增加效果」",
          type: 20,
          condition: Condition.ULTIMATE,
          duration: 100,
          _20: {
            targetChar: "816",
            targetSkill: "816-passive-1-1",
            clearAll: true,
          },
        },
        {
          id: "816-passive-3",
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
              id: "816-passive-4",
              name: "第一回合時，觸發「使自身造成傷害增加15%(50回合)」",
              type: 12,
              condition: Condition.ON_TURN_START,
              duration: 100,
              _12: {
                position: index,
                applySkill: {
                  id: "816-passive-4-1",
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
              id: "816-passive-5",
              name:
                "第一回合時，觸發「使『魔獸獵手 神無雪』造成傷害增加15%(50回合)」",
              type: 13,
              condition: Condition.ON_TURN_START,
              duration: 100,
              _13: {
                target: "816",
                applySkill: [
                  {
                    id: "816-passive-5-1",
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
      // 每經過一回合時，觸發「使自身獲得『摒除雜念(最多8層)』」
      // 當自身「摒除雜念」層數=8時，開啟「必殺時，追加『以自身攻擊力220%對目標造成傷害』」
      // export interface _19 {
      //   target: Target;
      //   applySkill: Buff;
      //   targetSkill: string;
      //   increaseStack: number;
      //   checkActivation: {
      //     characterId: string;
      //     checkSkillId: string;
      //     skillStackCondition: SkillStackCondition;
      //     activateIfStack: number;
      //     activateBuffId: string;
      //   }[];
      //   deleteSelf: boolean;
      // }
      if (gameState.characters[position].stars === 5) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "816-passive-6",
            name: "每經過一回合時，觸發「使自身獲得『摒除雜念(最多8層)』」",
            type: 19,
            condition: Condition.EVERY_X_TURN,
            conditionTurn: 1,
            duration: 100,
            _19: {
              target: Target.SELF,
              increaseStack: 1,
              targetSkill: "816-passive-6-1",
              applySkill: {
                id: "816-passive-6-1",
                name: "摒除雜念",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "816-passive-6-1",
                  name: "摒除雜念",
                  stack: 1,
                  maxStack: 8,
                  affectType: AffectType.NONE,
                  value: 0,
                },
              },
              checkActivation: [
                {
                  characterId: "816",
                  checkSkillId: "816-passive-6-1",
                  skillStackCondition: SkillStackCondition.HIGHER,
                  activateIfStack: 7,
                  activateBuffId: "816-passive-7",
                },
              ],
            },
          },
          {
            id: "816-passive-7",
            name: "必殺時，追加『以自身攻擊力220%對目標造成傷害",
            type: 101,
            condition: Condition.ULTIMATE,
            deactivated: "deactivated",
            duration: 100,
            _101: {
              value: 2.2,
              isTrigger: false,
              target: Target.ENEMY,
              damageType: 1,
            },
          },
        ];
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "816-passive4",
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

    case "817": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "817-passive-1",
          name: "必殺時，觸發「使自身以外的我方全體獲得《享受大餐》」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES_EXCEPT_SELF,
            applySkill: [
              {
                id: "817-passive-1-1",
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
                id: "817-passive-1-2",
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
                id: "817-passive-1-3",
                name:
                  "行動後，觸發「清除自身以外的我方全體《享受大餐》的所有效果」(2回合)(觸發1次後解除)",
                type: 24,
                condition: Condition.MOVE,
                duration: 2,
                _24: {
                  clearSkill: [
                    "817-passive-1-1",
                    "817-passive-1-2",
                    "817-passive-1-3",
                  ],
                  target: Target.ALL_ALLIES_EXCEPT_SELF,
                },
                deleteSelf: true,
              },
            ],
          },
        },
      ];

      // 《醃製內臟乾》
      // 行動後，觸發「使自身受到傷害減少20%(1回合)，並清除自身以外的我方全體《醃製內臟乾》的效果」(1回合)(觸發1次後解除)

      // 使我方站位2獲得「必殺時，觸發『《魔物肢解》』」
      // 《魔物肢解》
      // 使目標受到必殺技傷害增加100%(1回合)
      // 使目標被治療時回復量減少20%(4回合)
      if (gameState.characters[position].stars === 5) {
        {
          const buff: Buff = {
            id: "817-passive-3",
            name: "《魔物肢解》",
            type: 12,
            duration: 100,
            condition: Condition.NONE,
            _12: {
              position: 1,
              applySkill: {
                id: "817-passive-3",
                name: "使目標受到必殺技傷害增加100%(1回合)",
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ENEMY,
                  applySkill: [
                    {
                      id: "817-passive-3-1",
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
          triggerPassive(buff, gameState, position);
        }
      }

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "817-passive4",
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
    case "818": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "818-passive-1",
          name: "被治療時，觸發「使我方全體攻擊者攻擊力增加2.5%(4回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.ATTACKER,
            applySkill: [
              {
                id: "818-passive-1-1",
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
          id: "818-passive-2",
          name: "被治療時，觸發「使我方全體妨礙者攻擊力增加2.5%(4回合)」",
          type: 11,
          condition: Condition.GET_HEAL,
          duration: 100,
          _11: {
            target: Target.OBSTRUCTER,
            applySkill: [
              {
                id: "818-passive-2-1",
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
          id: "818-passive-3",
          name: "攻擊時，觸發「使自身普攻傷害增加10%(最多10層)」",
          type: 4,
          condition: Condition.ATTACK,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: "818-passive-3-1",
            target: Target.SELF,
            applySkill: {
              id: "818-passive-3-1",
              name: "普攻傷害增加",
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: "818-passive-3-1",
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
            id: "818-passive-4",
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
                id: "818-passive-5",
                name: "攻擊時，觸發「使我方全體攻擊者造成傷害增加10%(1回合)」",
                type: 11,
                condition: Condition.ATTACK,
                duration: 100,
                _11: {
                  target: Target.ATTACKER,
                  applySkill: [
                    {
                      id: "818-passive-5-1",
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
                id: "818-passive-6",
                name: "攻擊時，觸發「使我方全體妨礙者造成傷害增加10%(1回合)」",
                type: 11,
                condition: Condition.GET_HEAL,
                duration: 100,
                _11: {
                  target: Target.OBSTRUCTER,
                  applySkill: [
                    {
                      id: "818-passive-6-1",
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
                id: "818-passive-6",
                name:
                  "攻擊時，使我方全體攻擊者、妨礙者獲得「普攻時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」",
                type: 11,
                condition: Condition.ATTACK,
                duration: 100,
                _11: {
                  target: Target.ATTACKER,
                  applySkill: [
                    {
                      id: "818-passive-6-1",
                      name: "普攻時，追加『以自身攻擊力10%對目標造成傷害』",
                      type: 101,
                      condition: Condition.NONE,
                      duration: 1,
                      _101: {
                        value: 0.1,
                        isTrigger: false,
                        target: Target.ENEMY,
                        damageType: 1,
                      },
                    },
                  ],
                },
              },
              {
                id: "818-passive-7",
                name:
                  "攻擊時，使我方全體妨礙者獲得「普攻時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」",
                type: 11,
                condition: Condition.ATTACK,
                duration: 100,
                _11: {
                  target: Target.OBSTRUCTER,
                  applySkill: [
                    {
                      id: "818-passive-7-1",
                      name: "普攻時，追加『以自身攻擊力10%對目標造成傷害』",
                      type: 101,
                      condition: Condition.NONE,
                      duration: 1,
                      _101: {
                        value: 0.1,
                        isTrigger: false,
                        target: Target.ENEMY,
                        damageType: 1,
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
            id: "818-passive4",
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
    case "819":
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "819-passive-1",
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
            id: "819-passive-2",
            name: "必殺時，觸發「使目標受到傷害增加30%(最多2層)」",
            type: 4,
            condition: Condition.ULTIMATE,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "819-passive-2-1",
              target: Target.ENEMY,
              applySkill: {
                id: "819-passive-2-1",
                name: "受到傷害增加30%",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "819-passive-2-1",
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
            id: "819-passive4",
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
    case "820": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "820-passive-1",
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
          id: "820-passive-2",
          name: "每經過4回合時，觸發「使目標受到傷害增加25%(2回合)」",
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _11: {
            target: Target.ENEMY,
            applySkill: [
              {
                id: "820-passive-2-1",
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
            id: "820-passive-3",
            name: "防禦時，觸發「使自身攻擊力增加30%(最多3層)」",
            type: 4,
            condition: Condition.GUARD,
            duration: 100,
            _4: {
              increaseStack: 1,
              targetSkill: "820-passive-3-1",
              target: Target.SELF,
              applySkill: {
                id: "820-passive-3-1",
                name: "攻擊力增加",
                type: 3,
                condition: Condition.NONE,
                duration: 100,
                _3: {
                  id: "820-passive-3-1",
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
            id: "820-passive-4",
            name:
              "每經過1回合時，觸發「以自身攻擊力5%使我方全體攻擊力增加(1回合)」",
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
            id: "820-passive4",
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

    case "821": {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "821-passive-1",
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
              id: "821-passive-2",
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
          id: "821-passive-3",
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
          id: "821-passive-4",
          name:
            "普攻時，觸發「使自身以外我方全體光屬性角色普攻傷害增加40%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES_LIGHT_EXCEPT_SELF,
            applySkill: [
              {
                id: "821-passive-4-1",
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
                id: "821-passive-5",
                name:
                  "使自身以外我方全體光屬性角色獲得「必殺時，觸發『《賭客的視線》』」",
                type: 21,
                condition: Condition.ULTIMATE,
                duration: 100,
                _21: {
                  trigger: [
                    {
                      id: "821-passive-5-1",
                      name:
                        "使自身以外我方全體光屬性角色獲得「必殺時，觸發『《賭客的視線》』」",
                      type: 13,
                      condition: Condition.NONE,
                      duration: 100,
                      _13: {
                        target: "821",
                        applySkill: [
                          {
                            id: "821-passive-5-2",
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
                            id: "821-passive-5-3",
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
                            id: "821-passive-5-4",
                            name:
                              "必殺時，追加『以自身攻擊力25%對目標造成傷害』(1回合)",
                            type: 101,
                            condition: Condition.ULTIMATE,
                            duration: 1,
                            _101: {
                              value: 0.25,
                              isTrigger: false,
                              target: Target.ENEMY,
                              damageType: 1,
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
      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "821-passive4",
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
    case "822": {
      // 免疫必殺技CD變動效果
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: "822-passive-1",
          name: "普攻時，觸發「使我方全體普攻傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "822-passive-1-1",
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
          id: "822-passive-2",
          name: "必殺時，觸發「使我方全體必殺傷害增加30%(1回合)」",
          type: 11,
          condition: Condition.ULTIMATE,
          duration: 100,
          _11: {
            target: Target.ALL_ALLIES,
            applySkill: [
              {
                id: "822-passive-2-1",
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
            id: "822-passive-3",
            name:
              "攻擊時，觸發「以自身攻擊力30%使我方全體攻擊力增加(1回合)」效果",
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
                id: "822-passive-4",
                name:
                  "攻擊時，觸發「以自身攻擊力5%使我方全體攻擊力增加(1回合)」效果",
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

      if (gameState.characters[position].passive4) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: "822-passive4",
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
    default:
      break;
  }
}
