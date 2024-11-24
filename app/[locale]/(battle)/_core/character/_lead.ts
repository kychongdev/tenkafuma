import {
  AffectType,
  Condition,
  SkillStackCondition,
  Target,
} from '@/types/Skill';
import { CharacterAttribute, CharacterClass } from '@/types/Character';
import { GameState } from '../GameState';

export function triggerLead(leader: string, gameState: GameState) {
  switch (leader) {
    case '177':
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: '177-Lead-1',
          name: '最大HP增加50%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.MAX_HP,
            value: 0.5,
          },
        },
        {
          id: '177-Lead-2',
          name: '普攻時，觸發「以自身最大HP6%使我方全體攻擊力增加(1回合)」',
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
          id: '177-Lead-3',
          name: '必殺時，觸發「以自身最大HP8%使我方全體攻擊力增加(1回合)」',
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
            id: '177-Lead-4',
            name: '攻擊力增加60%',
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
              id: '177-Lead-5',
              name: '造成傷害增加50%',
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
              id: '177-Lead-6',
              name: '必殺時，觸發「使我方全體必殺技傷害增加30%」',
              type: 11,
              condition: Condition.ULTIMATE,
              duration: 100,
              _11: {
                target: Target.ALL_ALLIES,
                applyBuff: [
                  {
                    id: '177-Lead-6-1',
                    name: '必殺技傷害增加30%',
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
    case '178': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '178-Lead-1',
            name: '最大HP增加30%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.3,
            },
          },
          {
            id: '178-Lead-2',
            name: '攻擊力增加25%',
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
          id: '178-Lead-3',
          name: '普攻傷害增加30%',
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
              id: '178-Lead-3',
              name: '普攻時，觸發「使目標受到普攻傷害增加15%(最多5層)」',
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: '178-Lead-3-1',
                target: Target.ENEMY,
                applyBuff: {
                  id: '178-Lead-3-1',
                  name: '受到普攻傷害增加',
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: '178-Lead-3-1',
                    name: '受到普攻傷害增加',
                    stack: 1,
                    maxStack: 5,
                    affectType: AffectType.INCREASE_BASIC_DMG_RECEIVED,
                    value: 0.15,
                  },
                },
              },
            },
            {
              id: '178-Lead-4',
              name: '普攻時，追加「以自身攻擊力30%對目標造成傷害」',
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _101: {
                value: 0.3,
                target: Target.ENEMY,
                damageType: 0,
                isTrigger: false,
              },
            },
          ];
        }
      });

      // 我方全體水屬性隊員獲得《獸化》
      // 使我方全體獲得「隊伍中至少有4名水屬性隊員時，發動《超危險獸化！》」、「隊伍中至少有5名水屬性隊員時，發動《超濃起司！！》」

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
              id: '178-Lead-5',
              name: '普攻傷害增加50%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DMG,
                value: 0.5,
              },
            },
            {
              id: '178-lead-6',
              name: '攻擊時，觸發「使我方站位1的隊員造成傷害增加5%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _11: {
                target: Target.POSITION_1,
                applyBuff: [
                  {
                    id: '178-Lead-6-1',
                    name: '造成傷害增加5%',
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      affectType: AffectType.INCREASE_DMG,
                      value: 0.05,
                    },
                  },
                  {
                    id: '178-Lead-6-2',
                    name: '普攻時，追加「以自身攻擊力10%對目標造成傷害」',
                    type: 101,
                    condition: Condition.BASIC_ATTACK,
                    duration: 1,
                    _101: {
                      value: 0.1,
                      target: Target.ENEMY,
                      damageType: 0,
                      isTrigger: false,
                    },
                  },
                  {
                    id: '178-Lead-6-3',
                    name: '必殺時，追加「以自身攻擊力10%對目標造成傷害」',
                    type: 101,
                    condition: Condition.ULTIMATE,
                    duration: 1,
                    _101: {
                      value: 0.1,
                      target: Target.ENEMY,
                      damageType: 1,
                      isTrigger: false,
                    },
                  },
                ],
              },
            },
            // 攻擊時，觸發「使我方站位1的隊員造成傷害增加5%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力10%對目標造成傷害』(1回合)」
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

            // 《超濃起司》
            // 造成傷害增加30%
            // 攻擊時，觸發「使我方站位1的隊員造成傷害增加10%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力20%對目標造成傷害』(1回合)」
            {
              id: '178-Lead-7',
              name: '普攻傷害增加50%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.3,
              },
            },
            {
              id: '178-lead-7',
              name: '攻擊時，觸發「使我方站位1的隊員造成傷害增加5%(1回合)、獲得普攻時與必殺時，追加『以自身攻擊力20%對目標造成傷害』(1回合)」',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _11: {
                target: Target.POSITION_1,
                applyBuff: [
                  {
                    id: '178-Lead-7-1',
                    name: '造成傷害增加5%',
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      affectType: AffectType.INCREASE_DMG,
                      value: 0.05,
                    },
                  },
                  {
                    id: '178-Lead-7-2',
                    name: '普攻時，追加「以自身攻擊力20%對目標造成傷害」',
                    type: 101,
                    condition: Condition.BASIC_ATTACK,
                    duration: 1,
                    _101: {
                      value: 0.2,
                      target: Target.ENEMY,
                      damageType: 0,
                      isTrigger: false,
                    },
                  },
                  {
                    id: '178-Lead-7-3',
                    name: '必殺時，追加「以自身攻擊力20%對目標造成傷害」',
                    type: 101,
                    condition: Condition.ULTIMATE,
                    duration: 1,
                    _101: {
                      value: 0.2,
                      target: Target.ENEMY,
                      damageType: 1,
                      isTrigger: false,
                    },
                  },
                ],
              },
            },
          ];
        });
      }
      // 《獸化》
      // 攻擊時，觸發「使目標被治療時回復量減少20%(1回合)」

      break;
    }
    case '191': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '191-Lead-1',
            name: '最大HP增加20%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.2,
            },
          },
          {
            id: '191-Lead-2',
            name: '攻擊力增加40%',
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
          id: '191-Lead-3',
          name: '使自身普攻時，觸發「以自身攻擊力40%使我方全體妨礙者攻擊力增加(1回合)」',
          type: 6,
          condition: Condition.BASIC_ATTACK,
          duration: 100,
          _6: {
            affectType: AffectType.RAW_ATK,
            duration: 1,
            value: 0.4,
            base: false,
            target: Target.OBSTRUCTER,
          },
        },
        {
          id: '191-Lead-3',
          name: '使自身必殺時，觸發「以自身攻擊力25%使我方全體妨礙者攻擊力增加(10回合)」',
          type: 6,
          condition: Condition.ULTIMATE,
          duration: 100,
          _6: {
            affectType: AffectType.RAW_ATK,
            duration: 10,
            value: 0.25,
            base: false,
            target: Target.OBSTRUCTER,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.OBSTRUCTER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '191-lead-4',
              name: '自身攻擊時，觸發「使我方站位1的隊員攻擊力增加25%(4回合)」',
              type: 11,
              condition: Condition.ATTACK,
              duration: 100,
              _11: {
                target: Target.POSITION_1,
                applyBuff: [
                  {
                    id: '191-Lead-4-1',
                    name: '攻擊力增加25%',
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

    case '514':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '514-Lead-1',
            name: '最大HP增加30%',
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
                id: '514-Lead-2',
                name: '攻擊力增加40%',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_ATK,
                  value: 0.4,
                },
              },
              {
                id: '514-Lead-3',
                name: '行動時，觸發「使目標受到傷害增加2.5%(最多12層)」',
                type: 4,
                condition: Condition.MOVE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: '514-Lead-3-1',
                  target: Target.ENEMY,
                  applyBuff: {
                    id: '514-Lead-3-1',
                    name: '受到傷害增加2.5%',
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: '514-Lead-3-1',
                      name: '受到傷害增加2.5%',
                      stack: 1,
                      maxStack: 12,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                      value: 0.025,
                    },
                  },
                },
              },
              {
                id: '514-Lead-4',
                name: '行動時，觸發「使目標受到觸發技傷害增加5%(最多12層)」',
                type: 4,
                condition: Condition.MOVE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: '514-Lead-4-1',
                  target: Target.ENEMY,
                  applyBuff: {
                    id: '514-Lead-4-1',
                    name: '受到觸發技傷害增加5%',
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: '514-Lead-4-1',
                      name: '受到觸發技傷害增加5%',
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
                id: '514-Lead-5',
                name: '造成傷害增加20%',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.2,
                },
              },
              {
                id: '514-Lead-6',
                name: '必殺時，觸發「使目標受到暗屬性傷害增加17.5%(最多2層)」',
                type: 4,
                condition: Condition.ULTIMATE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: '514-Lead-6-1',
                  target: Target.ENEMY,
                  applyBuff: {
                    id: '514-Lead-6-1',
                    name: '受到暗屬性傷害增加17.5%',
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: '514-Lead-6-1',
                      name: '受到暗屬性傷害增加17.5%',
                      stack: 1,
                      maxStack: 2,
                      affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                      value: 0.175,
                    },
                  },
                },
              },
              {
                id: '514-Lead-7',
                name: '必殺時，觸發「使目標受到光屬性傷害增加17.5%(最多2層)」',
                type: 4,
                condition: Condition.ULTIMATE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: '514-Lead-7-1',
                  target: Target.ENEMY,
                  applyBuff: {
                    id: '514-Lead-7-1',
                    name: '受到光屬性傷害增加17.5%',
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: '514-Lead-7-1',
                      name: '受到光屬性傷害增加17.5%',
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
          id: '514-Lead-8',
          name: '攻擊力增加80%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ATK,
            value: 0.8,
          },
        },
        {
          id: '514-Lead-9',
          name: '普攻傷害增加60%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DMG,
            value: 0.6,
          },
        },
        {
          id: '514-Lead-10',
          name: '必殺技傷害增加40%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ULTIMATE_DMG,
            value: 0.4,
          },
        },
        {
          id: '514-Lead-11',
          name: '必殺時，觸發「以自身攻擊力150%對目標造成傷害」',
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
      break;
    // 夏日 巴爾
    case '517':
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: '517-Lead-1',
          name: '最大HP增加20%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.MAX_HP,
            value: 0.2,
          },
        },
        {
          id: '517-Lead-2',
          name: '造成傷害增加20%',
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
              id: '517-Lead-1',
              name: '最大HP增加20%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.MAX_HP,
                value: 0.2,
              },
            },
            {
              id: '517-Lead-2',
              name: '造成傷害增加20%',
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
          id: '517-Lead-3',
          name: '攻擊力增加50%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ATK,
            value: 0.5,
          },
        },
        {
          id: '517-Lead-4',
          name: '普攻傷害增加20%',
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
              id: '517-Lead-5',
              name: '攻擊力增加80%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 0.8,
              },
            },
            {
              id: '517-Lead-6',
              name: '普攻傷害增加50%',
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
                  id: '517-Lead-7',
                  name: '普攻時，追加「以自身攻擊力40%對目標造成傷害」',
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.4,
                    target: Target.ENEMY,
                    damageType: 0,
                    isTrigger: false,
                  },
                },
                {
                  id: '517-Lead-8',
                  name: '普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」',
                  type: 104,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _104: {
                    increaseStack: 1,
                    targetSkill: '517-Lead-8-1',
                    target: Target.ENEMY,
                    applyBuff: {
                      id: '517-Lead-8-1',
                      name: '受到普攻傷害增加18%',
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: '517-Lead-8-1',
                        name: '普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」',
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
                  id: '517-Lead-9',
                  name: '普攻時，追加「以自身攻擊力40%對目標造成傷害」',
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    value: 0.4,
                    target: Target.ENEMY,
                    damageType: 0,
                    isTrigger: false,
                  },
                },
                {
                  id: '517-Lead-10',
                  name: '普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」',
                  type: 104,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _104: {
                    increaseStack: 1,
                    targetSkill: '517-Lead-10-1',
                    target: Target.ENEMY,
                    applyBuff: {
                      id: '517-Lead-10-1',
                      name: '普攻時，追加「使目標受到普攻傷害增加18%(最多5層)」',
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: '517-Lead-10-1',
                        name: '受到普攻傷害增加18%',
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
    // 夏日 菲歐菈
    case '518':
      {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '518-Lead-1',
              name: '最大HP增加20%',
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
                id: '518-Lead-2',
                name: '攻擊力增加100%',
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
                  id: '518-Lead-3',
                  name: '必殺技傷害增加50%',
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
              id: '518-Lead-4',
              name: '每經過4回合，觸發「使目標受到傷害增加50%(1回合)」',
              type: 11,
              condition: Condition.EVERY_X_TURN,
              conditionTurn: 4,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applySkill: [
                  {
                    id: '518-Lead-4-1',
                    name: '受到傷害增加50%',
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
              id: '518-Lead-5',
              name: '被治療時，觸發「使我方全體造成傷害增加15%(1回合)」',
              type: 11,
              condition: Condition.GET_HEAL,
              duration: 100,
              _11: {
                target: Target.ALL_ALLIES,
                applySkill: [
                  {
                    id: '518-Lead-5-1',
                    name: '造成傷害增加15%',
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
      }

      break;
    case '523':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '523-Lead-1',
            name: '最大HP增加20%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.2,
            },
          },
          {
            id: '523-Lead-2',
            name: '攻擊力增加70%',
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
      {
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
                id: '523-Lead-3',
                name: '造成觸發技效果增加150%',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_TRIGGER_DMG,
                  value: 1.5,
                },
              },
              {
                id: '523-Lead-4',
                name: '造成傷害增加30%',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.3,
                },
              },
              {
                id: '523-Lead-5',
                name: '必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」',
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ENEMY,
                  applyBuff: [
                    {
                      id: '523-Lead-5-1',
                      name: '受到火屬性傷害增加5%',
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                      },
                    },
                    {
                      id: '523-Lead-5-2',
                      name: '受到水屬性傷害增加5%',
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                      },
                    },
                    {
                      id: '523-Lead-5-3',
                      name: '受到風屬性傷害增加5%',
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                      },
                    },
                    {
                      id: '523-Lead-5-4',
                      name: '受到光屬性傷害增加5%',
                      type: 0,
                      condition: Condition.NONE,
                      duration: 2,
                      _0: {
                        value: 0.05,
                        affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                      },
                    },
                    {
                      id: '523-Lead-5-5',
                      name: '受到暗屬性傷害增加5%',
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
                  id: '523-Lead-6',
                  name: '造成觸發技效果增加150%',
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.INCREASE_TRIGGER_DMG,
                    value: 1.5,
                  },
                },
                {
                  id: '523-Lead-7',
                  name: '造成傷害增加30%',
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.INCREASE_DMG,
                    value: 0.3,
                  },
                },
                {
                  id: '523-Lead-8',
                  name: '必殺時，觸發「使目標受到火、水、風、光、闇屬性傷害增加5%(2回合)」',
                  type: 11,
                  condition: Condition.ULTIMATE,
                  duration: 100,
                  _11: {
                    target: Target.ENEMY,
                    applyBuff: [
                      {
                        id: '523-Lead-8-1',
                        name: '受到火屬性傷害增加5%',
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                        },
                      },
                      {
                        id: '523-Lead-8-2',
                        name: '受到水屬性傷害增加5%',
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                        },
                      },
                      {
                        id: '523-Lead-8-3',
                        name: '受到風屬性傷害增加5%',
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                        },
                      },
                      {
                        id: '523-Lead-8-4',
                        name: '受到光屬性傷害增加5%',
                        type: 0,
                        condition: Condition.NONE,
                        duration: 2,
                        _0: {
                          value: 0.05,
                          affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                        },
                      },
                      {
                        id: '523-Lead-8-5',
                        name: '受到暗屬性傷害增加5%',
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
      }
      break;
    case '525':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '525-Lead-1',
            name: '最大HP增加20%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.2,
            },
          },
          {
            id: '525-Lead-2',
            name: '攻擊力增加50%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.5,
            },
          },
          {
            id: '525-Lead-3',
            name: '造成傷害增加50%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value: 0.5,
            },
          },
          {
            id: '525-Lead-4',
            name: '必殺技傷害增加70%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
              value: 0.7,
            },
          },
        ];
      });

      break;
    case '526':
      {
        const characterClassCondition = [
          CharacterClass.ATTACKER,
          CharacterClass.OBSTRUCTER,
          CharacterClass.SUPPORT,
          CharacterClass.PROTECTOR,
          CharacterClass.HEALER,
        ];
        gameState.characters.forEach((character) => {
          if (characterClassCondition.includes(character.class)) {
            const index = characterClassCondition.indexOf(character.class);
            if (index !== -1) {
              characterClassCondition.splice(
                characterClassCondition.indexOf(character.class),
                1,
              );
            }
          }
        });
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '526-Lead-1',
              name: '我方全體最大HP增加30%',
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

        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            id: '526-Lead-2',
            name: '必殺時，觸發「以自身最大HP10%給予我方全體護盾(1回合)」',
            type: 10,
            condition: Condition.ULTIMATE,
            duration: 100,
            _10: {
              target: Target.ALL_ALLIES,
              value: 0.1,
              hpBased: '526',
              affectType: AffectType.RAW_SHIELD,
            },
          },
          {
            id: '526-Lead-2',
            name: '必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到光屬性傷害增加6%(1回合)』」',
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              value: 0.03,
              target: Target.SELF,
              targetSkill: '526-passive-2-1',
              applyTarget: Target.ENEMY,
              applyBuff: {
                id: '526-Lead-2-1',
                name: '受到光屬性傷害增加3%',
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.06,
                  affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                },
              },
            },
          },
          {
            id: '526-Lead-3',
            name: '必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到暗屬性傷害增加6%(1回合)』」',
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              value: 0.03,
              target: Target.SELF,
              targetSkill: '526-passive-2-1',
              applyTarget: Target.ENEMY,
              applyBuff: {
                id: '526-Lead-3-1',
                name: '受到暗屬性傷害增加6%',
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
                  value: 0.06,
                  affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
                },
              },
            },
          },

          {
            id: '526-Lead-4',
            name: '必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火屬性傷害增加3%(1回合)』」',
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              value: 0.03,
              target: Target.SELF,
              targetSkill: '526-passive-2-1',
              applyTarget: Target.ENEMY,
              applyBuff: {
                id: '526-Lead-4-1',
                name: '受到火屬性傷害增加3%',
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
            id: '526-Lead-5',
            name: '必殺時，觸發「依據自身『連環陷阱』的層數觸發『使目標受到火、水屬性傷害增加3%(1回合)』」',
            type: 8,
            condition: Condition.ULTIMATE,
            duration: 100,
            _8: {
              value: 0.03,
              target: Target.SELF,
              targetSkill: '526-passive-2-1',
              applyTarget: Target.ENEMY,
              applyBuff: {
                id: '526-Lead-5-1',
                name: '受到水屬性傷害增加3%',
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
        if (characterClassCondition.length <= 1) {
          gameState.characters.forEach((_, index) => {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: '526-Lead-3',
                name: '《萬聖搗蛋派對！》',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_ATK,
                  value: 1.2,
                },
              },
              {
                id: '526-Lead-2',
                name: '《萬聖搗蛋派對！》',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.5,
                },
              },
            ];
          });
        }
      }
      break;
    case '528':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '528-Lead-1',
            name: '最大HP增加20%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.2,
            },
          },
          {
            id: '528-Lead-2',
            name: '攻擊力增加40%',
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

      {
        const threeLightCondition = [
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
          CharacterAttribute.LIGHT,
        ];
        const threeAttackerCondition = [
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
          CharacterClass.ATTACKER,
        ];
        gameState.characters.forEach((character) => {
          if (threeLightCondition.includes(character.attribute)) {
            const index = threeLightCondition.indexOf(character.attribute);
            if (index !== -1) {
              threeLightCondition.splice(
                threeLightCondition.indexOf(character.attribute),
                1,
              );
            }
          }
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

        if (threeLightCondition.length <= 0) {
          gameState.characters[0].buff = [
            ...gameState.characters[0].buff,
            {
              id: '528-Lead-3',
              name: '屬性相剋效果減少55%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.REDUCE_ATTRIBUTE_EFFECT,
                value: 0.55,
              },
            },
            {
              id: '528-Lead-4',
              name: '普攻時，觸發「以自身基礎攻擊力30%使我方全體攻擊者攻擊力增加(4回合)」',
              type: 6,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _6: {
                affectType: AffectType.RAW_ATK,
                duration: 4,
                value: 0.3,
                base: true,
                target: Target.ALL_ALLIES,
              },
            },
            {
              id: '528-Lead-5',
              name: '普攻時，觸發「使目標受到光屬性傷害增加7%(最多8層)」',
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                increaseStack: 1,
                targetSkill: '528-Lead-5-1',
                target: Target.ENEMY,
                applyBuff: {
                  id: '528-Lead-5-1',
                  name: '受到光屬性傷害增加7%',
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: '514-Lead-5-1',
                    name: '受到光屬性傷害增加7%',
                    stack: 1,
                    maxStack: 8,
                    affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                    value: 0.07,
                  },
                },
              },
            },
          ];
        }
        if (threeAttackerCondition.length <= 0) {
          gameState.characters.forEach((_, index) => {
            if (gameState.characters[index].class === CharacterClass.ATTACKER) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: '528-Lead-6',
                  name: '受到闇屬性傷害減少25%',
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.DECREASE_DARK_DMG_RECEIVED,
                    value: 0.25,
                  },
                },
                {
                  id: '528-Lead-7',
                  name: '免疫CD變動',
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.IMMUNE_CD_CHANGE,
                    value: 0,
                  },
                },
                {
                  id: '528-Lead-8',
                  name: '使自身造成傷害增加20%',
                  type: 0,
                  condition: Condition.NONE,
                  duration: 100,
                  _0: {
                    affectType: AffectType.INCREASE_DMG,
                    value: 0.2,
                  },
                },
                {
                  id: '528-Lead-9',
                  name: '普攻時，追加「以攻擊力40%對目標造成傷害」',
                  type: 101,
                  condition: Condition.BASIC_ATTACK,
                  duration: 100,
                  _101: {
                    isTrigger: false,
                    value: 0.4,
                    target: Target.ENEMY,
                    damageType: 0,
                  },
                },
              ];
            }
          });
        }
      }

      break;
    case '529': {
      // 自身最大HP增加30%

      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: '529-Lead-1',
          name: '最大HP增加30%',
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
          id: '529-Lead-2',
          name: '每Wave的第一回合時，觸發「使敵方全體受到傷害增加50%(最多1層)」',
          type: 21,
          condition: Condition.ON_TURN_START,
          conditionTurn: 1,
          duration: 1,
          _21: {
            trigger: [
              {
                id: '529-lead-2-1',
                name: '每Wave的第一回合時，觸發「使敵方全體受到傷害增加50%(最多1層)」',
                type: 4,
                condition: Condition.NONE,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: '529-lead-2-1-1',
                  target: Target.ENEMY,
                  applyBuff: {
                    id: '529-lead-2-1-1',
                    name: '受到傷害增加50%',
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: '529-lead-2-1-1',
                      name: '受到傷害增加50%',
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

      // 我方全體獲得，我方隊伍風屬性角色有4人以上時，發動 「《性誕快樂！》」
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
              id: '529-Lead-3',
              name: '攻擊力增加130%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 1.3,
              },
            },
            {
              id: '529-Lead-4',
              name: '必殺技傷害增加50%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
                value: 0.5,
              },
            },
            {
              id: '529-Lead-5',
              name: '造成傷害增加20%',
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

    case '601':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '601-Lead-1',
            name: '最大HP增加40%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.4,
            },
          },
          {
            id: '601-Lead-2',
            name: '攻擊力增加50%',
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
      // 我方隊伍攻擊者角色有3人以上時，發動《加入比賽》
      //
      // 《加入比賽》
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
            id: '601-Lead-3',
            name: '自身必殺時，觸發「使敵方全體受到傷害增加20%(4回合)」',
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ENEMY,
              applyBuff: [
                {
                  id: '601-Lead-3-1',
                  name: '受到傷害增加20%',
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
            id: '601-Lead-4',
            name: '自身必殺時，觸發「使我方全體攻擊者造成傷害增加20%(4回合)」',
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ATTACKER,
              applyBuff: [
                {
                  id: '601-Lead-4-1',
                  name: '造成傷害增加20%',
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
            id: '601-Lead-5',
            name: '自身必殺時，觸發「使我方全體攻擊者普攻傷害增加110%(4回合)」',
            type: 11,
            condition: Condition.ULTIMATE,
            duration: 100,
            _11: {
              target: Target.ATTACKER,
              applyBuff: [
                {
                  id: '601-Lead-5-1',
                  name: '普攻傷害增加110%',
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
    case '804':
      gameState.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.WATER ||
          character.attribute === CharacterAttribute.WIND
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '804-Lead-1',
              name: '最大HP增加20%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.MAX_HP,
                value: 0.2,
              },
            },
            {
              id: '804-Lead-2',
              name: '攻擊力增加100%',
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
              id: '804-Lead-3',
              name: '普攻傷害增加80%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DMG,
                value: 0.8,
              },
            },
            {
              id: '804-Lead-4',
              name: '造成傷害增加50%',
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
              id: '804-Lead-5',
              // 攻擊時，觸發「使我方水屬性的角色造成傷害增加30%(1回合)」
              name: '《集團追獵》',
              type: 11,
              condition: Condition.NONE,
              duration: 100,
              _11: {
                target: Target.WATER,
                applyBuff: [
                  {
                    id: '804-Lead-5-1',
                    name: '造成傷害增加30%',
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
    case '805':
      gameState.characters.forEach((character, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '805-Lead-1',
            name: '最大HP增加30%',
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
              id: '805-Lead-2',
              name: '普攻時，觸發「使我方全體攻擊力增加6%(最多18層)」',
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                target: Target.ALL_ALLIES,
                increaseStack: 1,
                targetSkill: '805-Lead-2-1',
                applyBuff: {
                  id: '805-Lead-2-1',
                  name: '攻擊力增加6%',
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: '805-Lead-2-1',
                    name: '攻擊力增加6%',
                    value: 0.06,
                    stack: 1,
                    maxStack: 18,
                    affectType: AffectType.INCREASE_ATK,
                  },
                },
              },
            },
            {
              id: '805-Lead-3',
              name: '普攻時，觸發「使我方全體普攻傷害增加6%(最多18層)」',
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                target: Target.ALL_ALLIES,
                increaseStack: 1,
                targetSkill: '805-Lead-3-1',
                applyBuff: {
                  id: '805-Lead-3-1',
                  name: '普攻傷害增加6%',
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: '805-Lead-3-1',
                    name: '普攻傷害增加6%',
                    stack: 1,
                    maxStack: 18,
                    value: 0.06,
                    affectType: AffectType.INCREASE_BASIC_DMG,
                  },
                },
              },
            },
            {
              id: '805-Lead-4',
              name: '普攻時，觸發「使我方全體造成傷害增加2%(最多18層)」',
              type: 4,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _4: {
                target: Target.ALL_ALLIES,
                increaseStack: 1,
                targetSkill: '805-Lead-4-1',
                applyBuff: {
                  id: '805-Lead-4-1',
                  name: '造成傷害增加2%',
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: '805-Lead-4-1',
                    name: '造成傷害增加2%',
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

    case '806':
      gameState.characters[0].buff = [
        ...gameState.characters[0].buff,
        {
          id: '806-Lead-1',
          name: '當自身「魔法少女之力」≧2層時，發動「攻擊力增加50%」',
          type: 0,
          condition: Condition.NONE,
          deactivated: true,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ATK,
            value: 0.5,
          },
        },
        {
          id: '806-Lead-2',
          name: '當自身「魔法少女之力」≧2層時，發動「造成傷害增加20%」',
          type: 0,
          condition: Condition.NONE,
          deactivated: true,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_DMG,
            value: 0.2,
          },
        },
        {
          id: '806-Lead-3',
          name: '當自身「魔法少女之力」≧3層時，發動「攻擊時，觸發『使目標受到傷害增加10%(最多4層)」',
          type: 4,
          condition: Condition.ATTACK,
          deactivated: true,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: '806-Lead-3-1',
            target: Target.ENEMY,
            applyBuff: {
              id: '806-Lead-3-1',
              name: '受到傷害增加10%(最多4層)',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '806-Lead-3-1',
                name: '受到傷害增加10%',
                value: 0.1,
                affectType: AffectType.INCREASE_DMG_RECEIVED,
                stack: 1,
                maxStack: 4,
              },
            },
          },
        },
        {
          id: '806-Lead-4',
          name: '當自身「魔法少女之力」≧4層時，發動「必殺時，追加『以自身攻擊力120%對目標造成傷害』」',
          type: 101,
          condition: Condition.ULTIMATE,
          deactivated: true,
          duration: 100,
          _101: {
            value: 1.2,
            target: Target.ENEMY,
            damageType: 1,
            isTrigger: false,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.LIGHT ||
          character.attribute === CharacterAttribute.FIRE
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '806-Lead-5',
              name: '最大HP增加30%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.MAX_HP,
                value: 0.3,
              },
            },
            {
              id: '806-Lead-6',
              name: '攻擊力增加100%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 1,
              },
            },
            {
              id: '806-Lead-7',
              name: '造成傷害增加20%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.2,
              },
            },
            {
              id: '806-Lead-8',
              name: '必殺技傷害增加40%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
                value: 0.4,
              },
            },
            {
              id: '806-Lead-9',
              name: '行動時，觸發「使我方站位1角色獲得魔法少女之力(最多4層)」',
              type: 19,
              condition: Condition.MOVE,
              duration: 100,
              deleteSelf: true,
              _19: {
                increaseStack: 1,
                targetSkill: '806-Lead-9-1',
                target: Target.POSITION_1,
                applyBuff: {
                  id: '806-Lead-9-1',
                  name: '魔法少女之力',
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: '806-Lead-5-1',
                    name: '魔法少女之力',
                    stack: 1,
                    maxStack: 4,
                    value: 0,
                    affectType: AffectType.NONE,
                  },
                },
                checkActivation: [
                  {
                    characterId: '806',
                    checkSkillId: '806-Lead-9-1',
                    skillStackCondition: SkillStackCondition.HIGHER,
                    activateIfStack: 1,
                    activateBuffId: '806-Lead-1',
                  },
                  {
                    characterId: '806',
                    checkSkillId: '806-Lead-9-1',
                    skillStackCondition: SkillStackCondition.HIGHER,
                    activateIfStack: 1,
                    activateBuffId: '806-Lead-2',
                  },
                  {
                    characterId: '806',
                    checkSkillId: '806-Lead-9-1',
                    skillStackCondition: SkillStackCondition.HIGHER,
                    activateIfStack: 1,
                    activateBuffId: '806-Lead-3',
                  },
                  {
                    characterId: '806',
                    checkSkillId: '806-Lead-9-1',
                    skillStackCondition: SkillStackCondition.HIGHER,
                    activateIfStack: 3,
                    activateBuffId: '806-Lead-4',
                  },
                ],
              },
            },
          ];
        }
      });
      break;
    case '811':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '811-Lead-1',
            name: '最大HP增加40%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.4,
            },
          },
          {
            id: '811-Lead-2',
            name: '攻擊力增加70%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ATK,
              value: 0.7,
            },
          },
          {
            id: '811-Lead-3',
            name: '普攻傷害增加60%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_BASIC_DMG,
              value: 0.6,
            },
          },
          {
            id: '811-Lead-4',
            name: '必殺傷害增加20%',
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
          id: '811-Lead-5',
          name: '攻擊時，觸發「以自身最大HP5%使我方全體攻擊力增加(2回合)」',
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
          id: '811-lead-6',
          name: '被攻擊時，觸發「使我方全體造成傷害增加1.33%(最多15層)」',
          type: 4,
          condition: Condition.RECEIVED_ATTACK,
          duration: 100,
          _4: {
            target: Target.ALL_ALLIES,
            increaseStack: 1,
            targetSkill: '811-lead-6-1',
            applyBuff: {
              id: '811-lead-6-1',
              name: '造成傷害增加',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '811-lead-6-1',
                stack: 1,
                maxStack: 15,
                value: 0.0133,
                name: '造成傷害增加1.33%',
                affectType: AffectType.INCREASE_DMG,
              },
            },
          },
        },
        {
          id: '811-lead-7',
          name: '被攻擊時，觸發「使敵方全體受到傷害增加1.33%(最多15層)」',
          type: 4,
          condition: Condition.RECEIVED_ATTACK,
          duration: 100,
          _4: {
            target: Target.ENEMY,
            increaseStack: 1,
            targetSkill: '811-lead-7-1',
            applyBuff: {
              id: '811-lead-7-1',
              name: '造成傷害增加',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '811-lead-7-1',
                stack: 1,
                maxStack: 15,
                value: 0.0133,
                name: '受到傷害',
                affectType: AffectType.INCREASE_DMG_RECEIVED,
              },
            },
          },
        },
      ];
      break;
    case '812':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '812-Lead-1',
            name: '最大HP增加20%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.2,
            },
          },
          {
            id: '812-Lead-2',
            name: '攻擊力增加50%',
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
          id: '812-Lead-3',
          name: '最大HP增加20%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.MAX_HP,
            value: 0.2,
          },
        },
        {
          id: '812-passive-3-1',
          name: '攻擊力增加',
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: '812-passive-3-1',
            name: '攻擊力增加5%',
            value: 0.05,
            stack: 20,
            maxStack: 20,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: '812-passive-5-1',
          name: '造成傷害增加',
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: '812-passive-5-1',
            name: '造成傷害增加20%',
            value: 0.2,
            stack: 4,
            maxStack: 4,
            affectType: AffectType.INCREASE_DMG,
          },
        },
      ];
      gameState.enemies[0].buff = [
        ...gameState.enemies[0].buff,
        {
          id: '812-passive-4-1',
          name: '受到夏日凱撒的傷害增加4%',
          type: 3,
          condition: Condition.NONE,
          duration: 100,
          _3: {
            id: '812-passive-4-1',
            name: '受到夏日凱撒的傷害增加4%',
            value: 0.04,
            stack: 15,
            maxStack: 15,
            specificCharId: '812',
            affectType: AffectType.INCREASE_SPECIFIC_CHARACTER_DMG_RECEIVED,
          },
        },
      ];

      gameState.characters.forEach((_, index) => {
        if (index !== 0) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '812-lead-4',
              name: '防禦時，觸發「使目標受到傷害增加9%（2回合）」',
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applyBuff: [
                  {
                    id: '812-lead-4-1',
                    name: '受到傷害增加9%',
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
              id: '812-lead-5',
              name: '防禦時，觸發『以自身基礎攻擊力75%使我方站位位攻擊力增加』(1回合)',
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
              id: '812-lead-6',
              name: '必殺時，觸發「使目標受到傷害增加9%（2回合）」',
              type: 11,
              condition: Condition.ULTIMATE,
              duration: 100,
              _11: {
                target: Target.ENEMY,
                applyBuff: [
                  {
                    id: '812-lead-4-1',
                    name: '受到傷害增加9%',
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
              id: '812-lead-7',
              name: '必殺時，觸發『以自身基礎攻擊力75%使我方站位位攻擊力增加』(1回合)',
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
    case '813':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '813-Lead-1',
            name: '最大HP增加30%',
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
              id: '813-Lead-2',
              name: '攻擊力增加100%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 1,
              },
            },
            {
              id: '813-Lead-3',
              name: '造成傷害增加20%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value: 0.2,
              },
            },
            {
              id: '813-Lead-4',
              name: '普攻傷害110%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_BASIC_DMG,
                value: 1.1,
              },
            },
            {
              id: '813-Lead-5',
              name: '普攻時，追加「以自身攻擊力30%對目標造成傷害」',
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 100,
              _101: {
                value: 0.3,
                target: Target.ENEMY,
                damageType: 0,
                isTrigger: false,
              },
            },
          ];
        });
      }
      break;
    case '814':
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '814-Lead-1',
            name: '最大HP增加10%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.1,
            },
          },
          {
            id: '814-Lead-2',
            name: '攻擊力增加100%',
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
              id: '814-Lead-3',
              name: '防禦時，觸發「使我方站位1獲得1層《編制重整》(最多4層)」(50回合)',
              type: 19,
              condition: Condition.GUARD,
              duration: 50,
              _19: {
                target: Target.POSITION_1,
                targetSkill: '814-Lead-3-1',
                increaseStack: 1,
                applyBuff: {
                  id: '814-Lead-3-1',
                  name: '編制重整',
                  type: 3,
                  condition: Condition.NONE,
                  duration: 100,
                  _3: {
                    id: '814-Lead-3-1',
                    name: '編制重整',
                    stack: 1,
                    maxStack: 4,
                    value: 0,
                    affectType: AffectType.NONE,
                  },
                },
                checkActivation: [
                  {
                    characterId: '814',
                    checkSkillId: '814-Lead-3-1',
                    skillStackCondition: SkillStackCondition.HIGHER,
                    activateIfStack: 3,
                    activateBuffId: '814-Lead-5',
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
          id: '814-Lead-4',
          name: '每經過1回合時，觸發「清除自身《編制重整》的所有層數」',
          type: 20,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 1,
          duration: 100,
          _20: {
            targetChar: '814',
            targetSkill: '814-Lead-3-1',
            clearAll: true,
          },
        },
        {
          id: '814-Lead-5',
          name: '防禦時，觸發『使自身獲得1層《轉進》(最多1層)』',
          type: 19,
          condition: Condition.GUARD,
          duration: 100,
          deactivated: true,
          _19: {
            target: Target.SELF,
            targetSkill: '814-Lead-5-1',
            increaseStack: 1,
            applyBuff: {
              id: '814-Lead-5-1',
              name: '轉進',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '814-Lead-5-1',
                name: '轉進',
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: '814',
                checkSkillId: '814-Lead-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: '814-Lead-6',
              },
              {
                characterId: '814',
                checkSkillId: '814-Lead-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: '814-Lead-7',
              },
              {
                characterId: '814',
                checkSkillId: '814-Lead-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: '814-Lead-8',
              },
              {
                characterId: '814',
                checkSkillId: '814-Lead-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: '814-Lead-9',
              },
              {
                characterId: '814',
                checkSkillId: '814-Lead-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateBuffId: '814-Lead-10',
              },
            ],
          },
        },
        {
          id: '814-Lead-6',
          name: '(反噬的犬嚎) 必殺時，追加「以自身攻擊力25%使自身以外的我方全體攻擊力增加(1回合)」',
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
          id: '814-Lead-7',
          name: '(反噬的犬嚎) 必殺時，追加「使我方全體造成傷害增加50%(1回合)」',
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _111: {
            target: Target.ALL_ALLIES,
            applyBuff: [
              {
                id: '814-Lead-7-1',
                name: '我方全體造成傷害增加50%(1回合)',
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
          id: '814-Lead-8',
          name: '(反噬的犬嚎) 必殺時，追加「使我方全體必殺技傷害增加50%(1回合)」',
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _111: {
            target: Target.ALL_ALLIES,
            applyBuff: [
              {
                id: '814-Lead-8-1',
                name: '必殺技傷害增加50%(1回合)',
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
          id: '814-Lead-9',
          name: '(反噬的犬嚎) 必殺時，追加「使目標受到傷害增加50%(1回合)」',
          type: 111,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _111: {
            target: Target.ENEMY,
            applyBuff: [
              {
                id: '814-Lead-9-1',
                name: '受到傷害增加50%(1回合)',
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
          id: '814-Lead-10',
          name: '(反噬的犬嚎) 必殺時，觸發「清除自身《轉進》的所有層數」',
          type: 23,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _23: {
            targetChar: '814',
            clearSkill: ['814-Lead-5-1'],
            targetSkill: [
              '814-Lead-5',
              '814-Lead-6',
              '814-Lead-7',
              '814-Lead-8',
              '814-Lead-9',
              '814-Lead-10',
            ],
          },
        },
      ];

      break;
    case '815':
      break;
    case '816':
      {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '816-Lead-1',
              name: '最大HP增加30%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.MAX_HP,
                value: 0.3,
              },
            },
            {
              id: '816-Lead-2',
              name: '攻擊力增加50%',
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
            id: '816-Lead-3',
            name: '必殺時，追加『以自身攻擊力80%對目標造成傷害',
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 100,
            _101: {
              value: 0.8,
              isTrigger: false,
              target: Target.ENEMY,
              damageType: 1,
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
                id: '816-Lead-4',
                name: '第一回合時，觸發「以自身基礎攻擊力10%使我方全體攻擊力增加(50回合)」',
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
                id: '816-Lead-5',
                name: '第五回合時，觸發「使自身必殺技傷害增加50%(最多1層)」',
                type: 11,
                condition: Condition.ON_SPECIFIC_TURN,
                conditionTurn: 5,
                duration: 100,
                _11: {
                  target: Target.SELF,
                  applyBuff: [
                    {
                      id: '816-Lead-5-1',
                      name: '「必殺技傷害增加50%(最多1層)」',
                      type: 3,
                      condition: Condition.NONE,
                      duration: 100,
                      _3: {
                        id: '816-Lead-5-1',
                        name: '「必殺技傷害增加50%(最多1層)」',
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
                id: '816-Lead-6',
                name: '第九回合時，觸發「使敵方全體受到傷害增加33%(最多3層)」',
                type: 21,
                condition: Condition.ON_SPECIFIC_TURN,
                conditionTurn: 9,
                duration: 100,
                _21: {
                  trigger: [
                    {
                      id: '816-Lead-6-1',
                      name: '第九回合時，觸發「使敵方全體受到傷害增加33%(最多3層)」',
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        target: Target.ENEMY,
                        targetSkill: '816-Lead-6-1-1',
                        applyBuff: {
                          id: '816-Lead-6-1-1',
                          name: '受到傷害增加33%(最多3層)',
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: '816-Lead-6-1-1',
                            name: '受到傷害增加33%(最多3層)',
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
      }
      break;
    case '817': {
      break;
    }
    case '819': {
      // 使我方全體妨礙者免疫必殺技CD變動效果 NO IMPLEMENT
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '819-Lead-1',
            name: '最大HP增加30%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.3,
            },
          },
          {
            id: '819-Lead-2',
            name: '攻擊力增加40%',
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
          id: '819-Lead-3',
          name: '必殺時，觸發「使目標受到火屬性傷害增加100%(最多1層)」',
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: '819-Lead-3-1',
            target: Target.ENEMY,
            applyBuff: {
              id: '819-Lead-3-1',
              name: '受到火屬性傷害增加',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '819-Lead-3-1',
                name: '受到火屬性傷害增加',
                stack: 1,
                maxStack: 1,
                affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                value: 1,
              },
            },
          },
        },
        {
          id: '819-Lead-4',
          name: '必殺時，觸發「使目標受到妨礙者傷害增加50%(最多1層)」',
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            targetSkill: '819-Lead-4-1',
            target: Target.ENEMY,
            applyBuff: {
              id: '819-Lead-4-1',
              name: '受到妨礙者傷害增加',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '819-Lead-4-1',
                name: '受到妨礙者傷害增加',
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
              id: '819-Lead-5',
              name: '防禦時，觸發《妖術達人》',
              type: 11,
              condition: Condition.GUARD,
              duration: 100,
              _11: {
                target: Target.SELF,
                applyBuff: [
                  {
                    id: '819-Lead-5-1',
                    name: '攻擊力增加50%',
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      affectType: AffectType.INCREASE_ATK,
                      value: 0.5,
                    },
                  },
                  {
                    id: '819-Lead-5-2',
                    name: '必殺技傷害增加60%',
                    type: 0,
                    condition: Condition.NONE,
                    duration: 2,
                    _0: {
                      affectType: AffectType.INCREASE_ULTIMATE_DMG,
                      value: 0.6,
                    },
                  },
                  {
                    id: '819-Lead-5-3',
                    name: '必殺時，追加「以自身攻擊力100%對目標造成傷害」',
                    type: 101,
                    condition: Condition.ULTIMATE,
                    duration: 2,
                    _101: {
                      value: 1,
                      target: Target.ENEMY,
                      damageType: 1,
                      isTrigger: false,
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
              id: '819-Lead-6',
              name: '攻擊力減少250%',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.DECREASE_ATK,
                value: 2.5,
              },
            },
            {
              id: '819-Lead-7',
              name: '必殺技傷害減少250%',
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

    case '820': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '820-Lead-1',
            name: '最大HP增加30%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.3,
            },
          },
          {
            id: '820-Lead-2',
            name: '必殺技傷害增加20%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
              value: 0.2,
            },
          },
          {
            id: '820-Lead-3',
            name: '普攻傷害增加30%',
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
          id: '820-Lead-4',
          name: '攻擊力增加350%',
          type: 0,
          condition: Condition.NONE,
          duration: 100,
          _0: {
            affectType: AffectType.INCREASE_ATK,
            value: 3.5,
          },
        },
        {
          id: '820-Lead-5',
          name: '必殺時，觸發「使自身以外我方全體獲得『必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)』、『普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)』」',
          type: 21,
          condition: Condition.ULTIMATE,
          duration: 100,
          _21: {
            trigger: [
              {
                id: '820-Lead-5-1',
                name: '使自身以外我方全體獲得『必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)』、『普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)』」',
                type: 11,
                condition: Condition.ULTIMATE,
                duration: 100,
                _11: {
                  target: Target.ALL_EXCEPT_SELF,
                  applyBuff: [
                    {
                      id: '820-Lead-5-1-1',
                      name: '必殺時，追加『以自身攻擊力100%對目標造成傷害』(1回合)',
                      type: 101,
                      condition: Condition.ULTIMATE,
                      duration: 1,
                      _101: {
                        value: 1,
                        target: Target.ENEMY,
                        damageType: 1,
                        isTrigger: false,
                      },
                    },
                    {
                      id: '820-Lead-5-1-2',
                      name: '普攻時，追加『以自身攻擊力25%對目標造成傷害』(2回合)',
                      type: 101,
                      condition: Condition.BASIC_ATTACK,
                      duration: 2,
                      _101: {
                        value: 0.25,
                        target: Target.ENEMY,
                        damageType: 0,
                        isTrigger: false,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          id: '820-Lead-6',
          name: '每經過4回合，觸發「使敵方全體受到火、水、風、光、闇屬性傷害增加70%(2回合)」',
          type: 11,
          condition: Condition.EVERY_X_TURN,
          conditionTurn: 4,
          duration: 100,
          _11: {
            //TODO this is for Enemies
            target: Target.ENEMY,
            applyBuff: [
              {
                id: '820-Lead-6-1',
                name: '受到火屬性傷害增加70%(2回合)',
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: '820-Lead-6-2',
                name: '受到水屬性傷害增加70%(2回合)',
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: '820-Lead-6-3',
                name: '受到風屬性傷害增加70%(2回合)',
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: '820-Lead-6-4',
                name: '受到光屬性傷害增加70%(2回合)',
                type: 0,
                condition: Condition.NONE,
                duration: 2,
                _0: {
                  affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
                  value: 0.7,
                },
              },
              {
                id: '820-Lead-6-5',
                name: '受到闇屬性傷害增加70%(2回合)',
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
            id: '820-Lead-7',
            name: '攻擊力減少350%',
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
            id: '820-Lead-8',
            name: '攻擊力減少350%',
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
            id: '820-Lead-9',
            name: '攻擊力減少350%',
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
            id: '820-Lead-10',
            name: '攻擊力減少350%',
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
            id: '820-Lead-11',
            name: '攻擊力減少350%',
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
    case '821': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '821-Lead-1',
            name: '最大HP增加40%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.4,
            },
          },
          {
            id: '821-Lead-2',
            name: '攻擊力增加80%',
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
            id: '821-Lead-3',
            name: '攻擊力增加80%',
            type: 11,
            condition: Condition.ON_SPECIFIC_TURN,
            conditionTurn: 1,
            duration: 100,
            _11: {
              target: Target.DARK_ENEMY,
              applyBuff: [
                {
                  id: '821-Lead-3-1',
                  name: '受到光屬性傷害增加50%',
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
            id: '821-Lead-4',
            name: '必殺傷害增加',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
              value: 0.4,
            },
          },
          {
            id: '821-lead-5',
            name: '必殺時，追加『以自身攻擊力66.6%對目標造成傷害』',
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 100,
            _101: {
              value: 0.666,
              target: Target.ENEMY,
              damageType: 1,
              isTrigger: false,
            },
          },
        ];

        gameState.characters.forEach((character, index) => {
          if (character.attribute === CharacterAttribute.LIGHT) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: '821-Lead-6',
                name: '造成傷害增加30%',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_DMG,
                  value: 0.3,
                },
              },
              {
                id: '821-Lead-7',
                name: '普攻傷害增加50%',
                type: 0,
                condition: Condition.NONE,
                duration: 100,
                _0: {
                  affectType: AffectType.INCREASE_BASIC_DMG,
                  value: 0.5,
                },
              },
              {
                id: '821-lead-8',
                name: '普攻時，追加「以自身攻擊力18%對目標造成傷害」',
                type: 101,
                condition: Condition.ULTIMATE,
                duration: 100,
                _101: {
                  value: 0.18,
                  target: Target.ENEMY,
                  damageType: 0,
                  isTrigger: false,
                },
              },
              // 攻擊時，觸發「使目標受到傷害增加0.4%(最多50層)，再使目標受到光屬性傷害增加0.6%(最多50層)」
              {
                id: '821-lead-9',
                name: '攻擊時，觸發「使目標受到傷害增加0.4%(最多50層)」',
                type: 4,
                condition: Condition.ATTACK,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: '821-lead-9-1',
                  target: Target.ENEMY,
                  applyBuff: {
                    id: '821-lead-9-1',
                    name: '受到傷害增加',
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: '821-lead-9-1',
                      name: '受到傷害增加',
                      stack: 1,
                      maxStack: 50,
                      affectType: AffectType.INCREASE_DMG_RECEIVED,
                      value: 0.004,
                    },
                  },
                },
              },
              {
                id: '821-lead-10',
                name: '攻擊時，觸發「使目標受到光屬性傷害增加0.6%(最多50層)」',
                type: 4,
                condition: Condition.ATTACK,
                duration: 100,
                _4: {
                  increaseStack: 1,
                  targetSkill: '821-lead-10-1',
                  target: Target.ENEMY,
                  applyBuff: {
                    id: '821-lead-10-1',
                    name: '受到傷害增加',
                    type: 3,
                    condition: Condition.NONE,
                    duration: 100,
                    _3: {
                      id: '821-lead-10-1',
                      name: '受到傷害增加',
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

    case '822': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '822-Lead-1',
            name: '最大HP增加40%',
            type: 0,
            condition: Condition.NONE,
            duration: 100,
            _0: {
              affectType: AffectType.MAX_HP,
              value: 0.4,
            },
          },
          {
            id: '822-Lead-2',
            name: '攻擊力增加40%',
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
                id: '822-Lead-3',
                name: '當我方隊伍恰好有2種屬性角色時，發動『第1回合時，觸發《本小姐不需要運氣》',
                type: 21,
                condition: Condition.ON_TURN_START,
                duration: 100,
                _21: {
                  trigger: [
                    {
                      id: '822-Lead-3-1',
                      name: '使我方全體攻擊力增加25%',
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: '822-lead-3-1-1',
                        target: Target.ALL_ALLIES,
                        applyBuff: {
                          id: '822-lead-3-1-1',
                          name: '攻擊力增加',
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: '822-lead-3-1-1',
                            name: '攻擊力增加',
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_ATK,
                            value: 0.25,
                          },
                        },
                      },
                    },
                    {
                      id: '822-Lead-3-2',
                      name: '使我方全體必殺技傷害增加25%',
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: '822-lead-3-2-1',
                        target: Target.ALL_ALLIES,
                        applyBuff: {
                          id: '822-lead-3-2-1',
                          name: '使我方全體必殺技傷害增加25%',
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: '822-lead-3-2-1',
                            name: '使我方全體必殺技傷害增加25%',
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_ULTIMATE_DMG,
                            value: 0.25,
                          },
                        },
                      },
                    },
                    {
                      id: '822-lead-3-3',
                      name: '使我方全體攻擊者獲得「必殺時，追加『以自身攻擊力25%對目標造成傷害』(50回合)」',
                      type: 11,
                      condition: Condition.NONE,
                      duration: 50,
                      _11: {
                        target: Target.ATTACKER,
                        applyBuff: [
                          {
                            id: '822-lead-3-3-1',
                            name: '必殺時，追加『以自身攻擊力25%對目標造成傷害』',
                            type: 101,
                            condition: Condition.ULTIMATE,
                            duration: 50,
                            _101: {
                              value: 0.25,
                              target: Target.ENEMY,
                              damageType: 1,
                              isTrigger: false,
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
                id: '822-lead-4',
                name: '當我方隊伍恰好有2種屬性角色時，發動『第1回合時，觸發《絕對的實力能輾壓一切》',
                type: 21,
                condition: Condition.ON_TURN_START,
                duration: 100,
                _21: {
                  trigger: [
                    {
                      id: '822-lead-4-1',
                      name: '使我方造成傷害增加25%',
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: '822-lead-4-1-1',
                        target: Target.ALL_ALLIES,
                        applyBuff: {
                          id: '822-lead-4-1-1',
                          name: '造成傷害增加',
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: '822-lead-4-1-1',
                            name: '造成傷害增加',
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_DMG,
                            value: 0.15,
                          },
                        },
                      },
                    },
                    {
                      id: '822-Lead-4-2',
                      name: '使我方全體普攻傷害增加25%',
                      type: 4,
                      condition: Condition.NONE,
                      duration: 100,
                      _4: {
                        increaseStack: 1,
                        targetSkill: '822-lead-4-2-1',
                        target: Target.ALL_ALLIES,
                        applyBuff: {
                          id: '822-lead-4-2-1',
                          name: '使我方全體普攻傷害增加35%',
                          type: 3,
                          condition: Condition.NONE,
                          duration: 100,
                          _3: {
                            id: '822-lead-4-2-1',
                            name: '使我方全體普攻傷害增加35%',
                            stack: 1,
                            maxStack: 3,
                            affectType: AffectType.INCREASE_BASIC_DMG,
                            value: 0.35,
                          },
                        },
                      },
                    },
                    {
                      id: '822-Lead-4-3',
                      name: '使我方全體攻擊者獲得「普攻時，追加『以自身攻擊力20%對目標造成傷害』(50回合)」',
                      type: 11,
                      condition: Condition.NONE,
                      duration: 50,
                      _11: {
                        target: Target.ATTACKER,
                        applyBuff: [
                          {
                            id: '822-Lead-4-3-1',
                            name: '普攻時，追加『以自身攻擊力20%對目標造成傷害』',
                            type: 101,
                            condition: Condition.BASIC_ATTACK,
                            duration: 50,
                            _101: {
                              value: 0.2,
                              target: Target.ENEMY,
                              damageType: 0,
                              isTrigger: false,
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

    default:
      break;
  }
}
