import { ultToTargeting, ultHpToTargeting } from "./applyDamage";
import { ultHealAllAllies, ultHpHealAll } from "./applyHeal";
import { applyRawAttBuff, rawAtkBuffAll } from "./applyRawAtk";
import { ultHpShieldAllAllies } from "./applyShield";
import { shieldUltHp } from "./calculations/shieldHp";
import { GameState } from "./GameState";
import { trigger } from "./trigger";
import {
  CharacterAction,
  CharacterAttribute,
  CharacterClass,
} from "./types/Character";
import {
  AffectType,
  Condition,
  DamageType,
  Skill,
  Target,
} from "./types/Skill";

export function ultimate(G: GameState, oG: GameState, pos: number) {
  const id = G.characters[pos].id;
  const passive4 = G.characters[pos].passive4;
  const lib = G.characters[pos].lib;
  const bond = G.characters[pos].bond;
  const stars = G.characters[pos].stars;
  const ca = CharacterAction.ULTIMATE;
  const dt = DamageType.ULTIMATE;
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
      G.characters.forEach((character, index) => {
        if (
          character.attribute === CharacterAttribute.WATER ||
          character.attribute === CharacterAttribute.FIRE
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10042-ult-1",
              name: "攻擊力",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: bond < 3 ? 0.3 : 0.4,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          ];
        }
      });
      const buff1: Skill = {
        id: "10042-ult-2",
        name: "受到傷害增加",
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "144-ult-2-1",
          target: Target.ENEMY,
          applySkill: {
            id: "10042-ult-2-1",
            name: "受到水傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10042-ult-2-1",
              name: "受到水傷害增加",
              stack: 1,
              maxStack: 2,
              affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
              value:
                bond === 1
                  ? 0.05
                  : bond === 2
                    ? 0.075
                    : bond === 3
                      ? 0.1
                      : bond === 4
                        ? 0.125
                        : 0.15,
            },
          },
        },
      };

      const buff2: Skill = {
        id: "10042-ult-3",
        name: "受到火傷害增加",
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "10042-ult-3-1",
          target: Target.ENEMY,
          applySkill: {
            id: "10042-ult-3-1",
            name: "受到火傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10042-ult-3-1",
              name: "受到火傷害增加",
              stack: 1,
              maxStack: 2,
              affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
              value:
                bond === 1
                  ? 0.05
                  : bond === 2
                    ? 0.075
                    : bond === 3
                      ? 0.1
                      : bond === 4
                        ? 0.125
                        : 0.15,
            },
          },
        },
      };

      trigger(G, oG, pos, buff1, ca);
      trigger(G, oG, pos, buff2, ca);

      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.68
                : 5.14,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
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
    case "10081": {
      if (lib === 0) {
        ultToTargeting(
          G,
          oG,
          bond === 1
            ? 3.88
            : bond === 2
              ? 4.45
              : bond === 3
                ? 5.03
                : bond === 4
                  ? 5.6
                  : 6.18,
          pos,
          Target.ENEMY,
          false,
          false,
          dt,
          ca,
        );
      }
      if (lib > 0) {
        G.characters.forEach((character, index) => {
          if (
            index === pos ||
            character.attribute === CharacterAttribute.WATER
          ) {
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: "1081-ult-1",
                name: "造成傷害增加",
                type: 0,
                condition: Condition.NONE,
                duration: 1,
                _0: {
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
                  affectType: AffectType.INCREASE_DMG,
                },
              },
            ];
          }
        });

        ultToTargeting(
          G,
          oG,
          bond === 1
            ? 1.94
            : bond === 2
              ? 222.5
              : bond === 3
                ? 251.5
                : bond === 4
                  ? 2.8
                  : 3.09,
          pos,
          Target.ENEMY,
          false,
          false,
          dt,
          ca,
        );
        ultToTargeting(
          G,
          oG,
          bond === 1
            ? 1.94
            : bond === 2
              ? 222.5
              : bond === 3
                ? 251.5
                : bond === 4
                  ? 2.8
                  : 3.09,
          pos,
          Target.ENEMY,
          false,
          false,
          dt,
          ca,
        );
      }

      break;
    }

    // "10082": "花嫁 撒旦",
    // "10083": "夢天堂店長 咲野夢",
    // "10084": "貓娘Vtuber 杏仁咪嚕",
    // "10085": "花魁 香奈",
    // "10088": "雙星之紅 安絲蒂",
    case "10088": {
      G.enemies[G.targeting].buff = [
        ...G.enemies[G.targeting].buff,
        {
          id: "10088-ult-1",
          name: "受到傷害增加",
          type: 0,
          condition: Condition.NONE,
          duration: 7,
          _0: {
            affectType: AffectType.INCREASE_DMG_RECEIVED,
            value:
              bond === 1
                ? 0.18
                : bond === 2
                  ? 0.18
                  : bond === 3
                    ? 0.2
                    : bond === 4
                      ? 0.2
                      : 0.2,
          },
        },
      ];
      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 2.65
          : bond === 2
            ? 2.98
            : bond === 3
              ? 3.31
              : bond === 4
                ? 3.64
                : 3.97,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
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
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10119-ult-1",
            name: "觸發技效果增加",
            type: 0,
            condition: Condition.NONE,
            duration: 3,
            _0: {
              value: bond === 1 ? 0.5 : bond === 2 || bond === 3 ? 0.75 : 1,
              affectType: AffectType.INCREASE_TRIGGER_EFFECT,
            },
          },
          {
            id: "10119-ult-2",
            name: "造成傷害增加",
            type: 0,
            condition: Condition.NONE,
            duration: 3,
            _0: {
              value: bond === 1 ? 0.1 : bond === 2 || bond === 3 ? 0.2 : 0.3,
              affectType: AffectType.INCREASE_DMG,
            },
          },
          {
            id: "10119-ult-3",
            name: "攻擊力增加",
            type: 0,
            condition: Condition.NONE,
            duration: 3,
            _0: {
              value: bond === 1 ? 0.2 : bond === 2 || bond === 3 ? 0.35 : 0.5,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      });
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
      G.enemies[G.targeting].buff = [
        ...G.enemies[G.targeting].buff,
        {
          id: "10126-ult-1",
          name: "受到傷害增加30%(4回合)",
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
                      : 0.45,
          },
        },
      ];

      const ult2: Skill = {
        id: "10126-ult-2",
        name: "受到傷害增加10%(最多1層)",
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.ENEMY,
          targetSkill: "10126-ult-2-1",
          applySkill: {
            id: "10126-ult-2-1",
            name: "受到傷害增加10%(最多1層)",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10126-ult-2-1",
              name: "受到傷害增加10%(最多1層)",
              affectType: AffectType.INCREASE_DMG_RECEIVED,
              value:
                bond === 2 ? 0.1 : bond === 3 ? 0.1 : bond === 4 ? 0.2 : 0.2,
              stack: 1,
              maxStack: 1,
            },
          },
        },
      };
      trigger(G, oG, pos, ult2, ca);

      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10126-ult-3",
            name: "必殺技傷害增加30%(4回合)",
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
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
      break;
    }
    // "10127": "雪夜幻夢 阿爾蒂雅",
    // "10128": "性誕戀歌 伊布力斯",
    case "10128": {
      const buff: Skill = {
        id: "10128-ult-1",
        name: "受到攻擊者傷害增加30%(2回合)",
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.ENEMY,
          targetSkill: "10128-ult-1",
          applySkill: {
            id: "10128-ult-1",
            name: "受到攻擊者傷害增加30%(2回合)",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10128-ult-1",
              name: "受到攻擊者傷害增加(最多2層)",
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
      trigger(G, oG, pos, buff, ca);
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10128-ult-2",
          name: `普攻時，追加『以攻擊力${
            bond === 1
              ? "50"
              : bond === 2
                ? "56.5"
                : bond === 3
                  ? "70"
                  : bond === 4
                    ? "76.5"
                    : "90"
          }對目標造成傷害』(4回合)`,
          type: 101,
          condition: Condition.BASIC_ATTACK,
          duration: 4,
          _101: {
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
            defender: Target.ENEMY,
            damageType: DamageType.BASIC_ADDON,
            multiple: false,
            isTrueDamage: false,
          },
        },
      ];

      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.86
                : 5.14,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
      break;
    }
    // "10129": "性誕馴鹿 希依",
    // "10130": "聖夜喧嘩 莎琳娜",
    // "10131": "時御者 伊娜絲",
    // "10132": "幽夜女爵 卡蒂雅",
    // "10133": "甜心偶像 星空奈奈美",
    // "10134": "閃耀歌姬 黑白諾艾莉",
    case "10134": {
      // 使自身獲得『攻擊時，觸發「以自身攻擊力0/0/10/12.5/15使自身以外我方全體攻擊力增加(1回合)」』(5回合)
      if (G.characters[pos].bond > 2) {
        G.characters[pos].buff = [
          ...G.characters[pos].buff,
          {
            id: "10134-ult-1",
            name: "攻擊時，觸發『以自身攻擊力使自身以外我方全體攻擊力增加』(1回合)",
            type: 6,
            condition: Condition.ATTACK,
            duration: 5,
            _6: {
              value: bond === 3 ? 0.1 : bond === 4 ? 0.125 : 0.15,
              target: Target.ALL_EXCEPT_SELF,
              base: false,
              duration: 1,
            },
          },
        ];
      }
      G.characters.forEach((character, index) => {
        if (
          character.class === CharacterClass.ATTACKER ||
          character.class === CharacterClass.OBSTRUCTER
        ) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10134-ult-2",
              name: `必殺時，追加『以自身攻擊力${
                bond === 1 ? 65 : 75
              }對目標造成傷害』(1回合)`,
              type: 101,
              condition: Condition.ULTIMATE,
              duration: 1,
              _101: {
                value: bond === 1 ? 0.65 : 0.75,
                defender: Target.ENEMY,
                damageType: DamageType.ULTIMATE_ADDON,
                multiple: false,
                isTrueDamage: false,
              },
            },
          ];
        }
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10134-ult-2",
            name: "造成傷害增加(1回合)",
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
                        ? 0.10125
                        : 0.6,
            },
          },
        ];
      });
      ultHealAllAllies(
        G,
        oG,
        bond === 1
          ? 1.65
          : bond === 2
            ? 1.88
            : bond === 3
              ? 2.11
              : bond === 4
                ? 2.34
                : 2.57,
        pos,
        false,
        false,
        ca,
      );
      break;
    } // "10135": "偶像經紀人 梅絲米奈雅",
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
      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 2.95
          : bond === 2
            ? 3.64
            : bond === 3
              ? 4.33
              : bond === 4
                ? 5.02
                : 5.71,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
      ultHpToTargeting(
        G,
        oG,
        bond === 1
          ? 0.89
          : bond === 2
            ? 1.07
            : bond === 3
              ? 1.25
              : bond === 4
                ? 1.43
                : 1.61,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
      break;
    }

    // "10145": "夏日 撒旦",
    case "10145": {
      if (bond < 3) {
        ultToTargeting(
          G,
          oG,
          bond === 1 ? 3.3 : 3.76,
          pos,
          Target.ENEMY,
          false,
          false,
          dt,
          ca,
        );
        const buff: Skill = {
          id: "10145-ult-1",
          name: "以自身最大HP5/6.25%使我方全體攻擊力增加(5回合)",
          type: 17,
          condition: Condition.ULTIMATE,
          duration: 100,
          _17: {
            value: bond === 1 ? 0.05 : 0.0625,
            target: Target.ALL_ALLIES,
            duration: 5,
          },
        };
        trigger(G, oG, pos, buff, ca);
      } else {
        const buff: Skill = {
          id: "10145-ult-1",
          name: "以自身最大HP7.5/8.75/10%使我方全體攻擊力增加(5回合)",
          type: 17,
          condition: Condition.ULTIMATE,
          duration: 100,
          _17: {
            value: bond === 3 ? 0.075 : bond === 4 ? 0.0875 : 0.1,
            target: Target.ALL_ALLIES,
            duration: 5,
          },
        };
        trigger(G, oG, pos, buff, ca);
        ultToTargeting(
          G,
          oG,
          bond === 3 ? 4.2 : bond === 4 ? 4.68 : 5.14,
          pos,
          Target.ENEMY,
          false,
          false,
          dt,
          ca,
        );
      }
      ultHpShieldAllAllies(G, oG, 0.25, pos, false, false, ca, 5);
      break;
    }
    // "10146": "魔獸獵手 神無雪",
    case "10146": {
      const buff: Skill = {
        id: "10146-ultimate-1",
        name: "普攻傷害減少",
        condition: Condition.NONE,
        type: 4,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "10146-ultimate-1-1",
          target: Target.SELF,
          applySkill: {
            id: "10146-ultimate-1-1",
            name: "普攻傷害減少",
            condition: Condition.NONE,
            type: 3,
            duration: 100,
            _3: {
              id: "10146-ultimate-1-1",
              name: "普攻傷害減少",
              stack: 1,
              maxStack: 1,
              value: 1.5,
              affectType: AffectType.DECREASE_BASIC_DMG,
            },
          },
        },
      };
      const buff2: Skill = {
        id: "10146-ultimate-2",
        name: "必殺技傷害增加",
        condition: Condition.NONE,
        type: 4,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "10146-ultimate-2-1",
          target: Target.SELF,
          applySkill: {
            id: "10146-ultimate-2-1",
            name: "必殺技傷害增加",
            condition: Condition.NONE,
            type: 3,
            duration: 100,
            _3: {
              id: "10146-ultimate-2-1",
              name: "必殺技傷害增加",
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
        id: "10146-ultimate-3",
        name: "受到暗屬性傷害增加",
        condition: Condition.NONE,
        type: 4,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "10146-ultimate-3-1",
          target: Target.ENEMY,
          applySkill: {
            id: "10146-ultimate-3-1",
            name: "受到暗屬性傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10146-ultimate-3-1",
              name: "受到暗屬性傷害增加",
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
      trigger(G, oG, pos, buff, ca);
      trigger(G, oG, pos, buff2, ca);
      trigger(G, oG, pos, buff3, ca);
      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.86
                : 5.14,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
      break;
    }
    // "10147": "魔物終結 鬼醉木",
    // "10148": "酩酊狂歡 靜",
    // "10149": "千年靈狐 椿",
    case "10149": {
      G.characters.forEach((character, index) => {
        if (character.attribute === CharacterAttribute.FIRE) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10149-ult-1",
              name: "必殺技傷害增加30%(4回合)",
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
      G.characters.forEach((character, index) => {
        if (character.class === CharacterClass.OBSTRUCTER) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            {
              id: "10149-ult-1",
              name: "造成傷害增加(4回合)",
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

      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 3.3
          : bond === 2
            ? 3.76
            : bond === 3
              ? 4.22
              : bond === 4
                ? 4.86
                : 5.14,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
      break;
    }
    // "10150": "勇者兔女郎 神田綾音",
    // "10151": "性感兔女郎 伊布力斯",
    // "10152": "治癒之星 蘇珊",
    case "10152": {
      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10152-ult-1",
            name: "受到治療增加",
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              affectType: AffectType.INCREASE_HEAL_RECEIVED,
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
            },
          },
        ];
      });

      ultHpHealAll(
        G,
        oG,
        bond === 1
          ? 0.4
          : bond === 2
            ? 0.45
            : bond === 3
              ? 0.5
              : bond === 4
                ? 0.5
                : 0.5,
        pos,
        false,
        false,
        ca,
      );

      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10152-ult-2",
            name: "造成傷害增加",
            type: 0,
            condition: Condition.NONE,
            duration: 4,
            _0: {
              affectType: AffectType.INCREASE_DMG,
              value:
                bond === 1
                  ? 0.25
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
      });
      const skill: Skill = {
        id: "10152-ult-3",
        name: "攻擊力增加",
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          targetSkill: "10152-ult-3-1",
          target: Target.SELF,
          applySkill: {
            id: "10152-ult-3-1",
            name: "攻擊力增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10152-ult-3-1",
              name: "攻擊力增加",
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_ATK,
              value:
                bond === 1
                  ? 0.2
                  : bond === 2
                    ? 0.4
                    : bond === 3
                      ? 0.6
                      : bond === 4
                        ? 0.8
                        : 1,
            },
          },
        },
      };
      trigger(G, oG, pos, skill, ca);
      break;
    }
    // "10153": "純真殺意 撒旦",
    // "10154": "星空奈奈美",
    // "10155": "甜蜜女僕",
    case "10155": {
      G.characters[pos].buff = [
        ...G.characters[pos].buff,
        {
          id: "10155-ultimate-1",
          name: "攻擊力增加",
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
          id: "10155-ultimate-2",
          name: "觸發技效果增加",
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
            affectType: AffectType.INCREASE_TRIGGER_EFFECT,
          },
        },
      ];
      G.enemies[G.targeting].buff = [
        ...G.enemies[G.targeting].buff,
        {
          id: "10155-ultimate-3",
          name: "觸發技效果增加",
          type: 0,
          condition: Condition.NONE,
          duration: 3,
          _0: {
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
            affectType: AffectType.INCREASE_TRIGGER_DMG_RECEIVED,
          },
        },
      ];
      break;
    }
    // "10156": "性誕魔王 巴爾"
    // "10157": "純真祈願 牧愛菈"
    case "10157": {
      const skill: Skill = {
        id: "10157-ult-1",
        name: "《純真祈願》",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        disabledOnSkill: "10157-passive-1-1",
        _4: {
          increaseStack: 1,
          targetSkill: "10157-ult-1-1",
          target: Target.SELF,
          applySkill: {
            id: "10157-ult-1-1",
            name: "《純真祈願》",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10157-ult-1-1",
              name: "《純真祈願》",
              stack:
                bond === 1
                  ? 6
                  : bond === 2
                    ? 7
                    : bond === 3
                      ? 8
                      : bond === 4
                        ? 9
                        : 10,
              maxStack: 10,
              value: 0,
              affectType: AffectType.NONE,
            },
          },
        },
      };
      trigger(G, oG, pos, skill, ca);
      rawAtkBuffAll(G, pos, 0.3, "10157-ult-2", 1);
      break;
    }
    // "10158": "聖夜奇謀 布蘭妮"
    // "10159": "喜迎性春 菲歐菈",
    // "10161": "舞焰赤龍 薩夏",
    // "10162": "虔信神祀 艾可",
    // "10163": "夜之影 凱薩",
    case "10163": {
      const valueIncrease =
        bond === 1
          ? 0.1
          : bond === 2
            ? 0.23
            : bond === 3
              ? 0.36
              : bond === 4
                ? 0.49
                : 0.62;
      const skill: Skill = {
        id: "10163-ult-1",
        name: "造成傷害增加",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.SELF,
          targetSkill: "10163-ult-1-1",
          applySkill: {
            id: "10163-ult-1-1",
            name: "造成傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10163-ult-1-1",
              name: "造成傷害增加",
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_DMG,
              value: valueIncrease,
            },
          },
        },
      };
      trigger(G, oG, pos, skill, ca);

      const valueIncrease2 =
        bond === 1
          ? 0.15
          : bond === 2
            ? 0.2
            : bond === 3
              ? 0.25
              : bond === 4
                ? 0.3
                : 0.35;

      const skill2: Skill = {
        id: "10163-ult-2",
        name: "受到水屬性傷害增加",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.ENEMY,
          targetSkill: "10163-ult-2-1",
          applySkill: {
            id: "10163-ult-2-1",
            name: "受到水屬性傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10163-ult-2-1",
              name: "受到水屬性傷害增加",
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_WATER_DMG_RECEIVED,
              value: valueIncrease2,
            },
          },
        },
      };
      trigger(G, oG, pos, skill2, ca);

      const skill3: Skill = {
        id: "10163-ult-3",
        name: "受到火屬性傷害增加",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.ENEMY,
          targetSkill: "10163-ult-3-1",
          applySkill: {
            id: "10163-ult-3-1",
            name: "受到火屬性傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10163-ult-3-1",
              name: "受到火屬性傷害增加",
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_FIRE_DMG_RECEIVED,
              value: valueIncrease2,
            },
          },
        },
      };
      trigger(G, oG, pos, skill3, ca);

      const skill4: Skill = {
        id: "10163-ult-4",
        name: "受到風屬性傷害增加",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.ENEMY,
          targetSkill: "10163-ult-4-1",
          applySkill: {
            id: "10163-ult-4-1",
            name: "受到風屬性傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10163-ult-4-1",
              name: "受到風屬性傷害增加",
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_WIND_DMG_RECEIVED,
              value: valueIncrease2,
            },
          },
        },
      };
      trigger(G, oG, pos, skill4, ca);
      const skill5: Skill = {
        id: "10163-ult-5",
        name: "受到光屬性傷害增加",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.ENEMY,
          targetSkill: "10163-ult-5-1",
          applySkill: {
            id: "10163-ult-5-1",
            name: "受到光屬性傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10163-ult-5-1",
              name: "受到光屬性傷害增加",
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_LIGHT_DMG_RECEIVED,
              value: valueIncrease2,
            },
          },
        },
      };
      trigger(G, oG, pos, skill5, ca);

      const skill6: Skill = {
        id: "10163-ult-6",
        name: "受到暗屬性傷害增加",
        type: 4,
        condition: Condition.NONE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.ENEMY,
          targetSkill: "10163-ult-6-1",
          applySkill: {
            id: "10163-ult-6-1",
            name: "受到暗屬性傷害增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10163-ult-6-1",
              name: "受到暗屬性傷害增加",
              stack: 1,
              maxStack: 1,
              affectType: AffectType.INCREASE_DARK_DMG_RECEIVED,
              value: valueIncrease2,
            },
          },
        },
      };
      trigger(G, oG, pos, skill6, ca);

      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 1.65
          : bond === 2
            ? 1.88
            : bond === 3
              ? 2.11
              : bond === 4
                ? 2.34
                : 2.57,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
      ultToTargeting(
        G,
        oG,
        bond === 1
          ? 1.65
          : bond === 2
            ? 1.88
            : bond === 3
              ? 2.11
              : bond === 4
                ? 2.34
                : 2.57,
        pos,
        Target.ENEMY,
        false,
        false,
        dt,
        ca,
      );
      break;
    }
    // "10164": "祭典花韻 香奈"
    // "10165": "銀鴞武裝 米婭",
    case "10166": {
      const b1 =
        bond === 1
          ? 0.6
          : bond === 2
            ? 0.7
            : bond === 3
              ? 0.8
              : bond === 4
                ? 0.9
                : 1;
      const buff: Skill = {
        id: "10166-ult-1",
        name: "使自身攻擊力增加60/70/80/90/100%(8回合)(不可疊加)",
        type: 11,
        condition: Condition.ULTIMATE,
        duration: 100,
        _11: {
          target: Target.SELF,
          overlap: true,
          applySkill: [
            {
              id: "10166-ult-1-1",
              name: "攻擊力增加",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: b1,
                affectType: AffectType.INCREASE_ATK,
              },
            },
          ],
        },
      };
      const buff2: Skill = {
        id: "10166-ult-2",
        name: "普攻傷害增加60/70/80/90/100%(8回合)(不可疊加)",
        type: 11,
        condition: Condition.ULTIMATE,
        duration: 100,
        _11: {
          target: Target.SELF,
          overlap: true,
          applySkill: [
            {
              id: "10166-ult-1-1",
              name: "普攻傷害增加",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: b1,
                affectType: AffectType.INCREASE_BASIC_DMG,
              },
            },
          ],
        },
      };
      const b2 =
        bond === 1
          ? 0.4
          : bond === 2
            ? 0.45
            : bond === 3
              ? 0.5
              : bond === 4
                ? 0.55
                : 0.6;
      const buff3: Skill = {
        id: "10166-ult-3",
        name: "造成傷害增加40/45/50/55/60%(8回合)(不可疊加)",
        type: 11,
        condition: Condition.ULTIMATE,
        duration: 100,
        _11: {
          target: Target.SELF,
          overlap: true,
          applySkill: [
            {
              id: "10166-ult-1-1",
              name: "造成傷害",
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: b2,
                affectType: AffectType.INCREASE_DMG,
              },
            },
          ],
        },
      };
      trigger(G, oG, pos, buff, ca);
      trigger(G, oG, pos, buff2, ca);
      trigger(G, oG, pos, buff3, ca);
      break;
    }
    // "10166": "白熊武裝 冬。艾妮",
    case "10166": {
      const buff: Skill = {
        id: "10166-ult-1",
        name: "使我方全體攻擊力增加15/15/15/20/25%(最多2層)",
        type: 4,
        condition: Condition.ULTIMATE,
        duration: 100,
        _4: {
          increaseStack: 1,
          target: Target.SELF,
          targetSkill: "10166-ult-1",
          applySkill: {
            id: "10166-ult-1",
            name: "攻擊力增加",
            type: 3,
            condition: Condition.NONE,
            duration: 100,
            _3: {
              id: "10166-ult-1",
              name: "攻擊力增加",
              stack: 1,
              maxStack: 3,
              value:
                bond === 1
                  ? 0.14
                  : bond === 2
                    ? 0.165
                    : bond === 3
                      ? 0.19
                      : bond === 4
                        ? 0.215
                        : 0.24,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        },
      };
      trigger(G, oG, pos, buff, ca);

      G.characters.forEach((_, index) => {
        G.characters[index].buff = [
          ...G.characters[index].buff,
          {
            id: "10166-ult-2",
            name: "攻擊力增加",
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              value:
                bond === 1
                  ? 0.36
                  : bond === 2
                    ? 0.42
                    : bond === 3
                      ? 0.48
                      : bond === 4
                        ? 0.54
                        : 0.6,
              affectType: AffectType.INCREASE_ULTIMATE_DMG,
            },
          },
        ];
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
