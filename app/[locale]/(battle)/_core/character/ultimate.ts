import {
  AffectType,
  Skill,
  Condition,
  Target,
  DamageType,
  SkillStackCondition,
} from '@/types/Skill';
import { applyRawAttBuff } from '../applyRawAtk';
import { dealBasicDamage } from '../dealBasisDamage';
import { dealBasicHpDamage } from '../dealBasicHpDamage';
import { heal } from '../heal';
import { parseCondition } from '../parseCondition';
import { triggerSkill } from '../triggerSkill';
import { GameState } from '../GameState';
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from '@/types/Character';
import { dealUltDamage } from '../dealUltDamage';
import { dealUltHpDamage } from '../dealUltHpDamage';
import { Dam } from 'lucide-react';

export function ultimateAttack(gameState: GameState, position: number) {
  const bond = gameState.characters[position].bond;
  const id = gameState.characters[position].id;
  const lib = gameState.characters[position].lib;
  switch (id) {
    // "10001": "魔王 巴爾",
    // "10002": "魔王 撒旦",
    // "10003": "魔王 伊布力斯",
    // "10004": "精靈王 賽露西亞",
    case '10004': {
      console.log(bond);
      if (lib === 0) {
        dealUltDamage(
          position,
          bond === 1
            ? 4.75
            : bond === 2
              ? 5.5
              : bond === 3
                ? 6.25
                : bond === 4
                  ? 6.25
                  : 6.25,
          gameState,
          Target.ENEMY,
          DamageType.ULTIMATE,
          CharacterAction.ULTIMATE,
        );
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '10004-ultimate-1',
              name: '攻擊力增加',
              type: 0,
              condition: Condition.NONE,
              duration: 3,
              _0: {
                value: bond === 4 ? 0.2 : bond === 5 ? 0.25 : 0.15,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          ];
        });
      }
      if (lib > 0) {
        // 以攻擊力475/550/625/625/625%對目標造成傷害，並使我方全體攻擊力增加15/15/15/20/25%(最多2層)，CD: 6
        dealUltDamage(
          position,
          bond === 1
            ? 4.75
            : bond === 2
              ? 5.5
              : bond === 3
                ? 6.25
                : bond === 4
                  ? 6.25
                  : 6.25,
          gameState,
          Target.ENEMY,
          DamageType.ULTIMATE,
          CharacterAction.ULTIMATE,
        );

        const buff: Skill = {
          id: '10004-ultimate-lib1-1',
          name: '使我方全體攻擊力增加15/15/15/20/25%(最多2層)',
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            target: Target.ALL_ALLIES,
            targetSkill: '10004-ultimate-lib1-1',
            applySkill: {
              id: '10004-ultimate-lib1-1',
              name: '攻擊力增加',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '10004-ultimate-lib1-1',
                name: '攻擊力增加',
                stack: 1,
                maxStack: 2,
                value: bond === 4 ? 0.2 : bond === 5 ? 0.25 : 0.15,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          },
        };
        triggerSkill(buff, gameState, position);
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
    case '10023': {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10023-passive-1',
          name: '第1回合，觸發「使自身獲得1層《孱弱的假象》(最多1層)」',
          type: 19,
          condition: Condition.ON_TURN_START,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: '10023-passive-1-1',
            target: Target.SELF,
            applySkill: {
              id: '10023-passive-1-1',
              name: '孱弱的假象',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '10023-passive-1-1',
                name: '孱弱的假象',
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: '10023',
                checkSkillId: '10023-passive-1-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: '10023-passive-3',
              },
            ],
          },
        },
        {
          id: '10023-passive-2',
          name: '必殺時，觸發「使自身獲得1層《孱弱的假象》(最多1層)」',
          type: 19,
          condition: Condition.ULTIMATE,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: '10023-passive-1-1',
            target: Target.SELF,
            applySkill: {
              id: '10023-passive-1-1',
              name: '孱弱的假象',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '10023-passive-1-1',
                name: '孱弱的假象',
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: '10023',
                checkSkillId: '10023-passive-1-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: '10023-passive-3',
              },
            ],
          },
        },
        {
          id: '10023-passive-3',
          name: '防禦時，觸發「使自身獲得嘲諷(1回合)」且獲得《反擊》效果」',
          type: 22,
          condition: Condition.GUARD,
          duration: 100,
          deactivated: true,
          _22: {
            increaseStack: 1,
            targetSkill: '10023-passive-3-1',
            target: Target.SELF,
            applySkill: {
              id: '10023-passive-3-1',
              name: '反擊',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '10023-passive-3-1',
                name: '反擊',
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: '10023',
                checkSkillId: '10023-passive-1-1',
                skillStackCondition: SkillStackCondition.EQUAL,
                activateIfStack: 1,
                applySkills: [
                  {
                    id: '10023-passive-3-2',
                    //
                    name: '被攻擊時，觸發「使我方全體造成傷害增加35%(4回合)(1回合)(觸發1次後解除)',
                    type: 11,
                    condition: Condition.RECEIVED_ATTACK,
                    duration: 2,
                    deleteSelf: true,
                    _11: {
                      target: Target.ALL_ALLIES,
                      applySkill: [
                        {
                          id: '10023-passive-3-2',
                          name: '造成傷害增加',
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
                    id: '10023-passive-4',
                    name: '被攻擊時，清除自身的《孱弱的假象》的所有層數」(1回合)(觸發1次後解除)',
                    type: 20,
                    condition: Condition.RECEIVED_ATTACK,
                    duration: 2,
                    deleteSelf: true,
                    _20: {
                      target: Target.ALL_ALLIES,
                      targetChar: '10023',
                      targetSkill: '10023-passive-1-1',
                      clearAll: true,
                    },
                  },
                ],
              },
            ],
          },
        },
        {
          id: '10023-passive-5',
          name: '防禦時，觸發「使自身獲得1層《反攻的時機》(最多1層)」',
          type: 19,
          condition: Condition.GUARD,
          duration: 100,
          _19: {
            increaseStack: 1,
            targetSkill: '10023-passive-5-1',
            target: Target.SELF,
            applySkill: {
              id: '10023-passive-5-1',
              name: '反攻的時機',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '10023-passive-5-1',
                name: '反攻的時機',
                stack: 1,
                maxStack: 1,
                value: 0,
                affectType: AffectType.NONE,
              },
            },
            checkActivation: [
              {
                characterId: '10023',
                checkSkillId: '10023-passive-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: '10023-passive-6',
              },
              {
                characterId: '10023',
                checkSkillId: '10023-passive-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: '10023-passive-7',
              },
              {
                characterId: '10023',
                checkSkillId: '10023-passive-5-1',
                skillStackCondition: SkillStackCondition.HIGHER,
                activateIfStack: 0,
                activateSkillId: '10023-passive-8',
              },
            ],
          },
        },
        {
          id: '10023-passive-6',
          name: '必殺時，追加「以自身攻擊力75%對目標造成傷害2次」',
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
          id: '10023-passive-7',
          name: '必殺時，觸發「清除自身《反攻的時機》的所有層數」',
          type: 23,
          condition: Condition.ULTIMATE,
          duration: 100,
          deactivated: true,
          _23: {
            clearSkill: ['10023-passive-5-1'],
            targetChar: '10023',
            targetSkill: [
              '10023-passive-6',
              '10023-passive-7',
              '10023-passive-8',
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
            id: '10023-passive-8',
            name: '必殺時，追加「以自身攻擊力45.5%對目標造成傷害8次」',
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
            id: '10023-passive4',
            name: '使自身攻擊力增加10%',
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
    case '10044': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '10044-ult-3',
            name: '造成傷害增加',
            type: 0,
            condition: Condition.NONE,
            duration: 2,
            _0: {
              value:
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.1
                    : bond === 3
                      ? 0.15
                      : bond === 4
                        ? 0.15
                        : 0.2,
              affectType: AffectType.INCREASE_DMG,
            },
          },
        ];
      });
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
    // "10089": "銀河之藍 安絲娜",
    // "10090": "夏日 聖米勒",
    // "10091": "夏日 黑白諾艾莉",
    // "10092": "夏日 阿爾蒂雅",
    // "10093": "適格者 娜娜",
    // "10094": "未知生命體 基貝魯",
    // "10096": "鮮血魔王 洛緹亞",
    // "10097": "性誕兔女郎 艾可",
    // "10098": "聖誕雪狐 靜",
    case '10098': {
      const buff: Skill = {
        id: '10098-ult-1',
        name: '受到必殺技傷害增加(最多1層)',
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10098-ult-1-1',
          target: Target.ENEMY,
          applySkill: {
            id: '10098-ult-1-1',
            name: '受到必殺技傷害增加(最多1層)',
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: '10098-ult-1-1',
              name: '受到必殺技傷害增加(最多1層)',
              stack: 1,
              maxStack:
                bond === 1
                  ? 3
                  : bond === 2
                    ? 3
                    : bond === 3
                      ? 3
                      : bond === 4
                        ? 2
                        : 2,
              affectType: AffectType.INCREASE_ULTIMATE_DMG_RECEIVED,
              value:
                bond === 1
                  ? 0.08
                  : bond === 2
                    ? 0.08
                    : bond === 3
                      ? 0.08
                      : bond === 4
                        ? 0.18
                        : 0.225,
            },
          },
        },
      };
      triggerSkill(buff, gameState, position);

      dealUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
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
    case '10115': {
      // 以自身攻擊力80/85/90/95/100%每回合對我方全體進行治療(4回合)、再以自身最大HP20/24/28/32/36%對我方全體施放護盾(1回合)，並使目標受到傷害增加0/0/10/15/20%(4回合)，CD:4
      if (bond > 2) {
        gameState.enemies[gameState.targeting].buff = [
          ...gameState.enemies[gameState.targeting].buff,
          {
            id: '10115-ult-1',
            name: '攻擊力',
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              value: bond === 3 ? 0.1 : bond === 4 ? 0.15 : 0.2,
              affectType: AffectType.INCREASE_DMG_RECEIVED,
            },
          },
        ];
      }
      break;
    }
    // "10116": "夏日 神田綾音",
    // "10117": "夏日 巴爾",
    case '10117': {
      dealUltDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10117-ult-1',
          name: '普攻時，追加『以自身攻擊力96/115/135/154/173%對目標造成傷害』(4回合)',
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _1: {
            value:
              bond === 1
                ? 0.96
                : bond === 2
                  ? 1.15
                  : bond === 3
                    ? 1.35
                    : bond === 4
                      ? 1.54
                      : 1.73,
            target: Target.ENEMY,
            damageType: DamageType.BASIC_ADDON,
            action: CharacterAction.BASIC,
          },
        },
      ];
      break;
    }
    // "10118": "夏日 菲歐菈",
    case '10118': {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '518-ult-1',
          name: '治療增加50%(4回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_HEAL_RATE,
            value:
              bond === 1
                ? 0.3
                : bond === 2
                  ? 0.35
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.45
                      : 0.5,
          },
        },
      ];

      heal(position, 2.75, gameState, true, Target.ALL_ALLIES);

      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: '518-ult-2',
          name: '受到光屬性傷害增加25%(1回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.1
                : bond === 2
                  ? 0.1
                  : bond === 3
                    ? 0.15
                    : bond === 4
                      ? 0.2
                      : 0.25,
          },
        },
      ];
      break;
    }
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
    case '10128': {
      {
        const buff: Skill = {
          id: '10128-ult-1',
          name: '受到攻擊者傷害增加30%(2回合)',
          type: 4,
          condition: Condition.ULTIMATE,
          duration: 100,
          _4: {
            increaseStack: 1,
            target: Target.ENEMY,
            targetSkill: '10128-ult-1',
            applySkill: {
              id: '10128-ult-1',
              name: '受到攻擊者傷害增加30%(2回合)',
              type: 3,
              condition: Condition.NONE,
              duration: 100,
              _3: {
                id: '10128-ult-1',
                name: '受到攻擊者傷害增加(最多2層)',
                affectType: AffectType.INCREASE_ATTACKER_DMG_RECEIVED,
                value:
                  bond === 1
                    ? 0.3
                    : bond === 2
                      ? 0.365
                      : bond === 3
                        ? 0.4
                        : bond === 4
                          ? 0.465
                          : 0.5,
                stack: 1,
                maxStack: 2,
              },
            },
          },
        };
        triggerSkill(buff, gameState, position);
      }
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10128-ult-2',
          name: '普攻時，追加『以攻擊力50/56.5/70/76.5/90%對目標造成傷害』(4回合)',
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _1: {
            value:
              bond === 1
                ? 0.5
                : bond === 2
                  ? 0.565
                  : bond === 3
                    ? 0.7
                    : bond === 4
                      ? 0.765
                      : 0.9,
            target: Target.ENEMY,
            action: CharacterAction.BASIC,
            damageType: DamageType.BASIC_ADDON,
          },
        },
      ];
      dealUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );

      break;
    }
    // "10129": "性誕馴鹿 希依",
    case '10129': {
      // 自身獲得嘲諷效果(2回合)並變為防禦狀態，CD :4
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '10129-ult-1',
            name: '造成傷害增加(4回合)',
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value:
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.15
                    : bond === 3
                      ? 0.2
                      : bond === 4
                        ? 0.25
                        : 0.3,
            },
          },
        ];
      });
      dealUltDamage(
        position,
        bond === 1
          ? 3.88
          : bond === 2
            ? 4.45
            : bond === 3
              ? 5.03
              : bond === 4
                ? 5.6
                : 6.18,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }

    // "10130": "聖夜喧嘩 莎琳娜",
    // "10131": "時御者 伊娜絲",
    // "10132": "幽夜女爵 卡蒂雅",
    // "10133": "甜心偶像 星空奈奈美",
    // "10134": "閃耀歌姬 黑白諾艾莉",
    case '10134': {
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '10134-ult-2',
              name: `必殺時，追加『以自身攻擊力${
                bond === 1 ? 65 : 75
              }對目標造成傷害』(1回合)`,
              type: 101,
              condition: Condition.ULTIMATE,
              duration: 1,
              _101: {
                value: bond === 1 ? 0.65 : 0.75,
                target: Target.ENEMY,
                damageType: 1,
                action: CharacterAction.ULTIMATE,
              },
            },
          ];
        }
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '10134-ult-2',
            name: '造成傷害增加(1回合)',
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value:
                bond === 1
                  ? 0.3
                  : bond === 2
                    ? 0.375
                    : bond === 3
                      ? 0.45
                      : bond === 4
                        ? 0.525
                        : 0.6,
            },
          },
        ];
      });
      heal(
        position,
        bond === 1
          ? 1.65
          : bond === 2
            ? 1.88
            : bond === 3
              ? 2.11
              : bond === 4
                ? 2.34
                : 2.57,
        gameState,
        false,
        Target.ALL_ALLIES,
      );
    }
    // "10135": "偶像經紀人 梅絲米奈雅",
    // "10136": "賞金獵人 安潔娜爾",
    case '10136': {
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: '10136-ult-1',
          name: '受到傷害增加(4回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.3
                : bond === 2
                  ? 0.35
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.45
                      : 0.5,
          },
        },
      ];
      dealUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10136-ult-2',
          name: '普攻時，追加『以自身攻擊力15/15/22.5/22.5/30%對目標造成傷害』',
          type: 1,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _1: {
            value:
              bond === 1
                ? 0.15
                : bond === 2
                  ? 0.15
                  : bond === 3
                    ? 0.225
                    : bond === 4
                      ? 0.225
                      : 0.3,
            target: Target.ENEMY,
            damageType: DamageType.BASIC_ADDON,
            action: CharacterAction.BASIC,
          },
        },
      ];

      break;
    }
    // "10137": "春情白兔 鈴蘭",
    case '10137': {
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: '10137-ult-1',
          name: '受到傷害增加(4回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.2
                : bond === 2
                  ? 0.25
                  : bond === 3
                    ? 0.3
                    : bond === 4
                      ? 0.35
                      : 0.4,
          },
        },
      ];
      gameState.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER ||
          character.class === CharacterClass.PROTECTOR
        ) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '10137-ult-2',
              name: `普攻時，追加『以自身攻擊力${
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.15
                    : bond === 3
                      ? 0.2
                      : bond === 4
                        ? 0.25
                        : 0.3
              }%對目標造成傷害』`,
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 4,
              _101: {
                value:
                  bond === 1
                    ? 0.1
                    : bond === 2
                      ? 0.15
                      : bond === 3
                        ? 0.2
                        : bond === 4
                          ? 0.25
                          : 0.3,
                target: Target.ENEMY,
                damageType: DamageType.BASIC_ADDON,
                action: CharacterAction.BASIC,
              },
            },
          ];
        }
      });

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10137-ult-3',
          name: `普攻時，追加『以自身攻擊力${
            bond === 1
              ? 20
              : bond === 2
                ? 30
                : bond === 3
                  ? 40
                  : bond === 4
                    ? 50
                    : 60
          }%對目標造成傷害』`,
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _101: {
            value:
              bond === 1
                ? 0.2
                : bond === 2
                  ? 0.3
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.5
                      : 0.6,
            damageType: DamageType.BASIC_ADDON,
            action: CharacterAction.BASIC,
            target: Target.ENEMY,
          },
        },
      ];
      break;
    }
    // "10138": "迷情薄紗 露露",
    // "10139": "不健全遐想 托特拉",
    case '10139': {
      const buff: Skill = {
        id: '10139-ult-1',
        name: '受到光屬性傷害增加(最多1層)',
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10139-ult-1-1',
          target: Target.ENEMY,
          applySkill: {
            id: '10139-ult-1-1',
            name: '受到光屬性傷害增加(最多1層)',
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: '10139-ult-1-1',
              name: '受到光屬性傷害增加(最多1層)',
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
              value:
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.15
                    : bond === 3
                      ? 0.2
                      : bond === 4
                        ? 0.2
                        : 0.2,
            },
          },
        },
      };
      triggerSkill(buff, gameState, position);
      const buff2: Skill = {
        id: '10139-ult-2',
        name: '受到傷害增加(最多1層)',
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10139-ult-2-1',
          target: Target.ENEMY,
          applySkill: {
            id: '10139-ult-2-1',
            name: '受到傷害增加(最多1層)',
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: '10139-ult-2-1',
              name: '受到傷害增加(最多1層)',
              stack: 1,
              maxStack: bond === 1 ? 1 : bond === 2 ? 2 : 2,
              affectType: AffectType.INCREASE_DMG_RECEIVED,
              value: bond === 1 ? 0.1 : bond === 2 ? 0.1 : 0.1,
            },
          },
        },
      };
      triggerSkill(buff2, gameState, position);
      if (bond > 1) {
        gameState.characters.forEach((_, index) => {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '10139-ult-3',
              name: '攻擊力',
              type: 0,
              condition: Condition.NONE,
              duration: 100,
              _0: {
                affectType: AffectType.INCREASE_ATK,
                value: 0.1,
              },
            },
          ];
        });
      }

      dealUltDamage(
        position,
        bond === 1
          ? 5.2
          : bond === 2
            ? 5.5
            : bond === 3
              ? 5.8
              : bond === 4
                ? 6.1
                : 6.4,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
    // "10140": "真神化身 菈萊亞 菈萊亞",
    // "10141": "調查員 娜娜",
    // "10142": "夏日 千鶴",
    case '10142': {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10142-ult-1',
          name: '普攻傷害增加(4回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_BASIC_DMG,
            value:
              bond === 1
                ? 0.5
                : bond === 2
                  ? 0.7
                  : bond === 3
                    ? 0.9
                    : bond === 4
                      ? 1.1
                      : 1.3,
          },
        },
        {
          id: '10142-ult-2',
          name: '造成傷害增加(4回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG,
            value:
              bond === 1
                ? 0.2
                : bond === 2
                  ? 0.25
                  : bond === 3
                    ? 0.3
                    : bond === 4
                      ? 0.35
                      : 0.4,
          },
        },
      ];

      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.ATTACKER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '10142-ult-3',
              name: `普攻時，追加『以自身攻擊力${
                bond === 1
                  ? 20
                  : bond === 2
                    ? 30
                    : bond === 3
                      ? 30
                      : bond === 4
                        ? 40
                        : 60
              }%對目標造成傷害』(4回合)`,
              type: 101,
              condition: Condition.BASIC_ATTACK,
              duration: 4,
              _101: {
                value:
                  bond === 1
                    ? 0.2
                    : bond === 2
                      ? 0.3
                      : bond === 3
                        ? 0.3
                        : bond === 4
                          ? 0.4
                          : 0.6,
                target: Target.ENEMY,
                damageType: DamageType.BASIC_ADDON,
                action: CharacterAction.BASIC,
              },
            },
            {
              id: '10142-ult-4',
              name: '必殺時，觸發『使我方夏日 千鶴攻擊力增加10/10/20/20/30%(1回合)』(4回合)',
              type: 13,
              condition: Condition.ATTACK,
              duration: 4,
              _13: {
                target: '10142',
                applySkill: [
                  {
                    id: '10142-ult-4',
                    name: '攻擊力增加(1回合)',
                    type: 0,
                    condition: Condition.NONE,
                    duration: 1,
                    _0: {
                      affectType: AffectType.INCREASE_ATK,
                      value:
                        bond === 1
                          ? 0.1
                          : bond === 2
                            ? 0.1
                            : bond === 3
                              ? 0.2
                              : bond === 4
                                ? 0.2
                                : 0.3,
                    },
                  },
                ],
              },
            },
          ];
        }
      });
      dealUltDamage(
        position,
        2,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
    // "10143": "夏日 賽露西亞",
    case '10143': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '10143-ult-1',
            name: '普攻傷害增加(4回合)',
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_BASIC_DMG,
              value:
                bond === 1
                  ? 0.3
                  : bond === 2
                    ? 0.45
                    : bond === 3
                      ? 0.6
                      : bond === 4
                        ? 0.75
                        : 0.9,
            },
          },
        ];
      });
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10143-ult-2',
          name: '普攻時，追加『以自身攻擊力60/80/100/120/140%對目標造成傷害』',
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _101: {
            value:
              bond === 1
                ? 0.6
                : bond === 2
                  ? 0.8
                  : bond === 3
                    ? 1
                    : bond === 4
                      ? 1.2
                      : 1.4,
            target: Target.ENEMY,
            damageType: DamageType.BASIC_ADDON,
            action: CharacterAction.BASIC,
          },
        },
        {
          id: '10143-ult-3',
          name: '攻擊力',
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_ATK,
            value:
              bond === 1
                ? 0
                : bond === 2
                  ? 0
                  : bond === 3
                    ? 0.3
                    : bond === 4
                      ? 0.6
                      : 0.9,
          },
        },
      ];
      break;
    }
    // "10144": "夏日 凱薩",
    case '10144': {
      dealUltDamage(
        position,
        bond === 1
          ? 2.95
          : bond === 2
            ? 3.64
            : bond === 3
              ? 4.33
              : bond === 4
                ? 5.02
                : 5.71,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      dealUltHpDamage(
        position,
        bond === 1
          ? 0.89
          : bond === 2
            ? 1.07
            : bond === 3
              ? 1.25
              : bond === 4
                ? 1.43
                : 1.61,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
    // "10145": "夏日 撒旦",
    case '10145': {
      if (bond < 3) {
        dealUltDamage(
          position,
          bond === 1 ? 3.3 : 3.76,
          gameState,
          Target.ENEMY,
          DamageType.ULTIMATE,
          CharacterAction.ULTIMATE,
        );
        const buff: Skill = {
          id: '10145-ult-1',
          name: '以自身最大HP5/6.25%使我方全體攻擊力增加(5回合)',
          type: 16,
          condition: Condition.ULTIMATE,
          duration: 1,
          _16: {
            value: bond === 1 ? 0.05 : 0.0625,
            affectType: AffectType.RAW_ATK,
            target: Target.ALL_ALLIES,
            duration: 5,
          },
        };
        triggerSkill(buff, gameState, position);
      } else {
        const buff: Skill = {
          id: '10145-ult-1',
          name: '以自身最大HP5/6.25%使我方全體攻擊力增加(5回合)',
          type: 16,
          condition: Condition.ULTIMATE,
          duration: 1,
          _16: {
            value: bond === 3 ? 0.075 : bond === 4 ? 0.0875 : 0.1,
            affectType: AffectType.RAW_ATK,
            target: Target.ALL_ALLIES,
            duration: 5,
          },
        };
        triggerSkill(buff, gameState, position);
        dealUltDamage(
          position,
          bond === 3 ? 4.2 : bond === 4 ? 4.68 : 5.14,
          gameState,
          Target.ENEMY,
          DamageType.ULTIMATE,
          CharacterAction.ULTIMATE,
        );
      }
      break;
    }
    // "10146": "魔獸獵手 神無雪",
    case '10146': {
      const buff: Skill = {
        id: '10146-ultimate-1',
        name: '普攻傷害減少',
        condition: Condition.NONE,
        type: 4,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10146-ultimate-1-1',
          target: Target.SELF,
          applySkill: {
            id: '10146-ultimate-1-1',
            name: '普攻傷害減少',
            condition: Condition.NONE,
            type: 3,
            duration: 100,
            _3: {
              id: '10146-ultimate-1-1',
              name: '普攻傷害減少',
              stack: 1,
              maxStack: 1,
              value: 1.5,
              affectType: AffectType.DECREASE_BASIC_DMG,
            },
          },
        },
      };
      const buff2: Skill = {
        id: '10146-ultimate-2',
        name: '必殺技傷害增加',
        condition: Condition.NONE,
        type: 4,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10146-ultimate-2-1',
          target: Target.SELF,
          applySkill: {
            id: '10146-ultimate-2-1',
            name: '必殺技傷害增加',
            condition: Condition.NONE,
            type: 3,
            duration: 100,
            _3: {
              id: '10146-ultimate-2-1',
              name: '必殺技傷害增加',
              stack: 1,
              maxStack: 1,
              value:
                bond === 1
                  ? 0.6
                  : bond === 2
                    ? 0.7
                    : bond === 3
                      ? 0.8
                      : bond === 4
                        ? 0.9
                        : 1,
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
            },
          },
        },
      };

      const buff3: Skill = {
        id: '10146-ultimate-3',
        name: '受到暗屬性傷害增加',
        condition: Condition.NONE,
        type: 4,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10146-ultimate-3-1',
          target: Target.ENEMY,
          applySkill: {
            id: '10146-ultimate-3-1',
            name: '受到暗屬性傷害增加',
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: '10146-ultimate-3-1',
              name: '受到暗屬性傷害增加',
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
              value:
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.15
                    : bond === 3
                      ? 0.2
                      : bond === 4
                        ? 0.3
                        : 0.4,
            },
          },
        },
      };
      triggerSkill(buff, gameState, position);
      triggerSkill(buff2, gameState, position);
      triggerSkill(buff3, gameState, position);

      dealUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.86
                : 5.14,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
    // "10147": "魔物終結 鬼醉木",
    case '10147': {
      if (bond < 3) {
        // 以自身攻擊力330/376%對目標造成傷害，使目標受到風、光屬性傷害增加30/35%(2回合)。CD:4
        dealUltDamage(
          position,
          bond === 1 ? 3.3 : 3.76,
          gameState,
          Target.ENEMY,
          DamageType.ULTIMATE,
          CharacterAction.ULTIMATE,
        );
        gameState.enemies[gameState.targeting].buff = [
          ...gameState.enemies[gameState.targeting].buff,
          {
            id: '10147-ult-1',
            name: '受到風屬性傷害增加30/35%(2回合)',
            type: 0,
            condition: Condition.NONE,
            duration: 2,
            _0: {
              affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
              value: bond === 1 ? 0.3 : 0.35,
            },
          },
          {
            id: '10147-ult-2',
            name: '受到光屬性傷害增加30/35%(2回合)',
            type: 0,
            condition: Condition.NONE,
            duration: 2,
            _0: {
              affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
              value: bond === 1 ? 0.3 : 0.35,
            },
          },
        ];
        break;
      }
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: '10147-ult-1',
          name: '受到風屬性傷害增加30/35%(2回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 2,
          _0: {
            affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
            value: bond === 3 ? 0.4 : bond === 4 ? 0.45 : 0.5,
          },
        },
        {
          id: '10147-ult-2',
          name: '受到光屬性傷害增加30/35%(2回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 2,
          _0: {
            affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
            value: bond === 3 ? 0.4 : bond === 4 ? 0.45 : 0.5,
          },
        },
        {
          id: '10147-ult-3',
          name: '目標受到傷害增加15%(2回合)',
          type: 0,
          condition: Condition.NONE,
          duration: 2,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value: 0.15,
          },
        },
      ];
      dealUltDamage(
        position,
        bond === 3 ? 4.22 : bond === 4 ? 4.68 : 5.14,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
    // "10148": "酩酊狂歡 靜",
    case '10148': {
      const buff: Skill = {
        id: '10148-ult-1',
        name: '受到水屬性傷害增加(最多2層)',
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10148-ult-1-1',
          target: Target.ENEMY,
          applySkill: {
            id: '10148-ult-1-1',
            name: '受到水屬性傷害增加(最多2層)',
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: '10148-ult-1-1',
              name: '受到水屬性傷害增加(最多2層)',
              stack: 1,
              maxStack: 2,
              affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
              value:
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.125
                    : bond === 3
                      ? 0.15
                      : bond === 4
                        ? 0.175
                        : 0.2,
            },
          },
        },
      };
      triggerSkill(buff, gameState, position);
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10148-ult-2',
          name: '普攻時，追加『以自身攻擊力110/125/140/155/170%對目標造成傷害』',
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _101: {
            value:
              bond === 1
                ? 1.1
                : bond === 2
                  ? 1.25
                  : bond === 3
                    ? 1.4
                    : bond === 4
                      ? 1.55
                      : 1.7,
            target: Target.ENEMY,
            damageType: DamageType.BASIC_ADDON,
            action: CharacterAction.BASIC,
          },
        },
      ];
      dealUltDamage(
        position,
        bond === 1
          ? 1
          : bond === 2
            ? 1.25
            : bond === 3
              ? 1.5
              : bond === 4
                ? 1.75
                : 2,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
    // "10149": "千年靈狐 椿",
    case '10149': {
      gameState.characters.forEach((character, index) => {
        if (character.attribute === CharacterAttribute.FIRE) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '10149-ult-1',
              name: '必殺技傷害增加30%(4回合)',
              type: 0,
              condition: Condition.NONE,
              duration: 4,
              _0: {
                affectType: AffectType.INCREASE_ULTIMATE_DMG,
                value:
                  bond === 1
                    ? 0.2
                    : bond === 2
                      ? 0.3
                      : bond === 3
                        ? 0.4
                        : bond === 4
                          ? 0.5
                          : 0.6,
              },
            },
          ];
        }
      });
      gameState.characters.forEach((character, index) => {
        if (character.class === CharacterClass.OBSTRUCTER) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: '10149-ult-1',
              name: '造成傷害增加(4回合)',
              type: 0,
              condition: Condition.NONE,
              duration: 4,
              _0: {
                affectType: AffectType.INCREASE_DMG,
                value:
                  bond === 1
                    ? 0.15
                    : bond === 2
                      ? 0.2
                      : bond === 3
                        ? 0.3
                        : bond === 4
                          ? 0.4
                          : 0.5,
              },
            },
          ];
        }
      });

      dealUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.86
                : 5.14,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );
      break;
    }
    // "10150": "勇者兔女郎 神田綾音",
    case '10150': {
      const buff: Skill = {
        id: '10150-ult-1',
        name: '受到傷害增加(最多2層)',
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: '10150-ult-1-1',
          target: Target.LIGHT,
          applySkill: {
            id: '10150-ult-1-1',
            name: '造成傷害增加',
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: '10150-ult-1-1',
              name: '造成傷害增加',
              stack: 1,
              maxStack: 2,
              affectType: AffectType.INCREASE_DMG,
              value:
                bond === 1
                  ? 0.1
                  : bond === 2
                    ? 0.1
                    : bond === 3
                      ? 0.15
                      : bond === 4
                        ? 0.15
                        : 0.2,
            },
          },
        },
      };
      triggerSkill(buff, gameState, position);
      dealUltDamage(
        position,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        gameState,
        Target.ENEMY,
        DamageType.ULTIMATE,
        CharacterAction.ULTIMATE,
      );

      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10150-ult-2',
          name: `普攻時，追加『以自身攻擊力${
            bond === 1
              ? 50
              : bond === 2
                ? 57
                : bond === 3
                  ? 65
                  : bond === 4
                    ? 72
                    : 80
          }%對目標造成傷害』`,
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration:
            bond === 1
              ? 3
              : bond === 2
                ? 3
                : bond === 3
                  ? 4
                  : bond === 4
                    ? 4
                    : 4,
          _101: {
            value:
              bond === 1
                ? 0.5
                : bond === 2
                  ? 0.57
                  : bond === 3
                    ? 0.65
                    : bond === 4
                      ? 0.72
                      : 0.8,
            target: Target.ENEMY,
            damageType: DamageType.BASIC_ADDON,
            action: CharacterAction.BASIC,
          },
        },
      ];

      break;
    }
    // "10151": "性感兔女郎 伊布力斯",
    case '10151': {
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: '10151-ult-1',
          name: '受到傷害增加',
          type: 0,
          condition: Condition.NONE,
          duration: 4,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.3
                : bond === 2
                  ? 0.3
                  : bond === 3
                    ? 0.4
                    : bond === 4
                      ? 0.4
                      : 0.5,
          },
        },
      ];

      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '10151-ult-2',
            name: `必殺時，追加『以自身攻擊力${
              bond === 1
                ? 30
                : bond === 2
                  ? 40
                  : bond === 3
                    ? 40
                    : bond === 4
                      ? 50
                      : 60
            }%對目標造成傷害』`,
            type: 101,
            condition: Condition.ULTIMATE,
            duration: 1,
            _101: {
              value:
                bond === 1
                  ? 0.3
                  : bond === 2
                    ? 0.4
                    : bond === 3
                      ? 0.4
                      : bond === 4
                        ? 0.5
                        : 0.6,
              target: Target.ENEMY,
              damageType: DamageType.ULTIMATE_ADDON,
              action: CharacterAction.ULTIMATE,
            },
          },
          {
            id: '10151-ult-3',
            name: `普攻時，追加『以自身攻擊力${
              bond === 1
                ? 20
                : bond === 2
                  ? 22.5
                  : bond === 3
                    ? 25
                    : bond === 4
                      ? 27.5
                      : 30
            }%對目標造成傷害』`,
            type: 101,
            condition: Condition.BASIC_ATTACK,
            duration: 4,
            _101: {
              value:
                bond === 1
                  ? 0.2
                  : bond === 2
                    ? 0.225
                    : bond === 3
                      ? 0.25
                      : bond === 4
                        ? 0.275
                        : 0.3,
              target: Target.ENEMY,
              damageType: DamageType.BASIC_ADDON,
              action: CharacterAction.BASIC,
            },
          },
        ];
      });
      break;
    }
    // "10152": "治癒之星 蘇珊",
    // "10153": "純真殺意 撒旦",
    // "10154": "星空奈奈美",
    case '10154': {
      break;
    }
    // "10155": "甜蜜女僕",
    case '10155': {
      // 使自身攻擊力增加100/125/150/175/200%(1回合)、再使自身造成觸發技效果增加100/150/200/250/300%(3回合)、再使目標受到觸發技傷害增加60/70/80/90/100%(3回合)，CD:3
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10155-ultimate-1',
          name: '攻擊力增加',
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            value:
              bond === 1
                ? 1
                : bond === 2
                  ? 1.25
                  : bond === 3
                    ? 1.5
                    : bond === 4
                      ? 1.75
                      : 2,
            affectType: AffectType.INCREASE_ATK,
          },
        },
        {
          id: '10155-ultimate-2',
          name: '觸發技效果增加',
          type: 0,
          condition: Condition.NONE,
          duration: 3,
          _0: {
            value:
              bond === 1
                ? 1
                : bond === 2
                  ? 1.5
                  : bond === 3
                    ? 2
                    : bond === 4
                      ? 2.5
                      : 3,
            affectType: AffectType.INCREASE_TRIGGER_DMG,
          },
        },
      ];
      gameState.enemies[gameState.targeting].buff = [
        ...gameState.enemies[gameState.targeting].buff,
        {
          id: '10155-ultimate-3',
          name: '觸發技效果增加',
          type: 0,
          condition: Condition.NONE,
          duration: 3,
          _0: {
            value:
              bond === 1
                ? 1
                : bond === 2
                  ? 1.5
                  : bond === 3
                    ? 2
                    : bond === 4
                      ? 2.5
                      : 3,
            affectType: AffectType.INCREASE_TRIGGER_DMG_RECEIVED,
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
  }
}
