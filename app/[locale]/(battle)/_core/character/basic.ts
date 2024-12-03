import {
  AffectType,
  Skill,
  Condition,
  Target,
  DamageType,
} from '@/types/Skill';
import { applyRawAttBuff } from '../applyRawAtk';
import { dealBasicDamage } from '../dealBasisDamage';
import { dealBasicHpDamage } from '../dealBasicHpDamage';
import { heal } from '../heal';
import { parseCondition } from '../parseCondition';
import { triggerSkill } from '../triggerSkill';
import { GameState } from '../GameState';
import { CharacterAction } from '../../_types/Character';

export function basicAttack(gameState: GameState, position: number) {
  const id = gameState.characters[position].id;
  switch (id) {
    // "10001": "魔王 巴爾",
    // "10002": "魔王 撒旦",
    // "10003": "魔王 伊布力斯",
    // "10004": "精靈王 賽露西亞",
    case '10004': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
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
      gameState.characters.forEach((character) => {
        character.buff = [
          ...character.buff,
          {
            id: '10023-basic-1',
            name: '攻擊力',
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              value: 0.25,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      });
      dealBasicDamage(
        position,
        0.75,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
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
      gameState.characters.forEach((character) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.3);
        character.buff = [
          ...character.buff,
          {
            id: '10044-basic-1',
            name: '攻擊力',
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              value: attack,
              affectType: AffectType.RAW_ATK,
            },
          },
        ];
      });
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
    case '10088': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
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
    case '10098': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10100": "惡兔魔王 兔姬",
    // "10106": "絕代佳人 賽露西亞",
    // "10107": "龍飛鳳舞 蘭兒",
    // "10108": "甜心可可 巴爾",
    case '10108': {
      gameState.characters.forEach((character, index) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.2);
        if (index !== position) {
          character.buff = [
            ...character.buff,
            {
              id: '10108-basic-1',
              name: '攻擊力',
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: attack,
                affectType: AffectType.RAW_ATK,
              },
            },
          ];
        }
      });
      heal(position, 0.75, gameState, true, Target.ALL_ALLIES);
      break;
    }
    // "10109": "純情可可 伊布力斯",
    // "10110": "致命可可 撒旦",
    // "10111": "背德密醫 艾琳",
    // "10113": "嬌蠻兇護 凱薩",
    // "10114": "魔法少女 朱諾安",
    // "10115": "魔法少女 布蘭妮",
    case '10115': {
      heal(position, 0.75, gameState, true, Target.ALL_ALLIES);
      break;
    }
    // "10116": "夏日 神田綾音",
    // "10117": "夏日 巴爾",
    case '10117': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10118": "夏日 菲歐菈",
    case '10118': {
      heal(position, 0.75, gameState, true, Target.ALL_ALLIES);
      break;
    }
    // "10119": "夏日 艾可",
    case '10119': {
      gameState.characters.forEach((character) => {
        character.buff = [
          ...character.buff,
          {
            id: '10119-basic-1',
            name: '攻擊力',
            type: 0,
            condition: Condition.NONE,
            duration: 3,
            _0: {
              value: Math.floor(applyRawAttBuff(gameState, position) * 0.5),
              affectType: AffectType.RAW_HEAL_OVER_TIME,
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
    case '10125': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '10125-basic-1',
            name: '攻擊力',
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              value: 0.5,
              affectType: AffectType.INCREASE_ATK,
            },
          },
        ];
      });
      break;
    }
    // "10126": "調皮搗蛋 白",
    case '10126': {
      gameState.characters.forEach((character) => {
        const attack = Math.floor(applyRawAttBuff(gameState, position) * 0.3);
        character.buff = [
          ...character.buff,
          {
            id: '10126-basic-1',
            name: '攻擊力',
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              value: attack,
              affectType: AffectType.RAW_ATK,
            },
          },
        ];
      });
      break;
    }
    // "10127": "雪夜幻夢 阿爾蒂雅",
    // "10128": "性誕戀歌 伊布力斯",
    case '10128': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10129": "性誕馴鹿 希依",
    case '10129': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10130": "聖夜喧嘩 莎琳娜",
    // "10131": "時御者 伊娜絲",
    // "10132": "幽夜女爵 卡蒂雅",
    // "10133": "甜心偶像 星空奈奈美",
    // "10134": "閃耀歌姬 黑白諾艾莉",
    case '10134': {
      heal(position, 0.75, gameState, true, Target.ALL_ALLIES);
      break;
    }
    // "10135": "偶像經紀人 梅絲米奈雅",
    // "10136": "賞金獵人 安潔娜爾",
    case '10136': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10137": "春情白兔 鈴蘭",
    case '10137': {
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '805-basic-1',
          name: '攻擊力',
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            value: 0.5,
            affectType: AffectType.INCREASE_ATK,
          },
        },
      ];
      dealBasicDamage(
        position,
        0.7,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
    }
    // "10138": "迷情薄紗 露露",
    // "10139": "不健全遐想 托特拉",
    case '10139': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10140": "真神化身 菈萊亞 菈萊亞",
    // "10141": "調查員 娜娜",
    // "10142": "夏日 千鶴",
    case '10142': {
      dealBasicDamage(
        position,
        1.25,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10143": "夏日 賽露西亞",
    case '10143': {
      // 以自身攻擊力37.5%對我方全體進行治療(4回合)
      break;
    }
    // "10144": "夏日 凱薩",
    case '10144': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      dealBasicHpDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
    }
    // "10145": "夏日 撒旦",
    case '10145': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10146": "魔獸獵手 神無雪",
    case '10146': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10147": "魔物終結 鬼醉木",
    case '10147': {
      dealBasicHpDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10148": "酩酊狂歡 靜",
    case '10148': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10149": "千年靈狐 椿",
    case '10149': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10150": "勇者兔女郎 神田綾音",
    case '10150': {
      dealBasicDamage(
        position,
        1,
        gameState,
        Target.ENEMY,
        DamageType.BASIC,
        CharacterAction.BASIC,
      );
      break;
    }
    // "10151": "性感兔女郎 伊布力斯",
    case '10151': {
      gameState.characters.forEach((_, index) => {
        gameState.characters[index].buff = [
          ...gameState.characters[index].buff,
          {
            id: '525-basic-1',
            name: '攻擊力',
            type: 0,
            condition: Condition.NONE,
            duration: 1,
            _0: {
              value: 0.5,
              affectType: AffectType.INCREASE_ATK,
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
      gameState.characters[position].buff = [
        ...gameState.characters[position].buff,
        {
          id: '10155-basic-1',
          name: '攻擊力',
          type: 0,
          condition: Condition.NONE,
          duration: 1,
          _0: {
            value: 1,
            affectType: AffectType.INCREASE_ATK,
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
