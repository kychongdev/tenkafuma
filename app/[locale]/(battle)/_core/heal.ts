import { AffectType, Target } from '@/types/Skill';
import { GameState } from './GameState';
import { checkSpecialCondition } from './checkSpecialCondition';

export function heal(
  position: number,
  value: number,
  gameState: GameState,
  isBasic: boolean,
  target: Target,
) {
  const atk = gameState.characters[position].atk;
  let rawAtk = 0;
  let atkPercentage = 1;
  let healRate = 1;
  let basicRate = 1;
  let ultRate = 1;

  for (const buff of gameState.characters[position].buff) {
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage += buff._0?.value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage -= buff._0?.value;
    }

    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
      atkPercentage += buff._3?.value * buff._3?.stack;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_ATK) {
      atkPercentage -= buff._3?.value * buff._3?.stack;
    }

    if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
      rawAtk += buff._0?.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_HEAL_RATE
    ) {
      healRate += buff._0.value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_BASIC_DMG
    ) {
      basicRate += buff._0.value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DMG
    ) {
      ultRate += buff._0.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DMG
    ) {
      basicRate += buff._3?.value * buff._3?.stack;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DMG
    ) {
      basicRate -= buff._3?.value * buff._3?.stack;
    }
  }
  const res = Math.floor(
    (atk * atkPercentage + rawAtk) *
      (isBasic ? basicRate : ultRate) *
      healRate *
      value,
  );
  console.log('atk', atk * atkPercentage + rawAtk);
  console.log('basic', basicRate);
  console.log('healRate', healRate);

  if (isBasic) {
    parseHealTarget(gameState, position, target, res);
    return;
  }
  parseHealTarget(
    gameState,
    position,
    target,
    Math.floor((atk * atkPercentage + rawAtk) * healRate * value),
  );
}

function parseHealTarget(
  gameState: GameState,
  position: number,
  target: Target,
  heal: number,
) {
  switch (target) {
    case Target.SELF:
      console.log('heal', heal);
      gameState.characters[position].hp += heal;
      gameState.characters[position].isHeal = true;
      break;
    case Target.ALL_ALLIES:
      gameState.characters.forEach((character, index) => {
        const charBuff = checkSpecialCondition(gameState, index);
        let healReceived = 1;
        for (const buff of charBuff) {
          if (
            buff.type === 0 &&
            buff._0?.affectType === AffectType.INCREASE_HEAL_RECEIVED
          ) {
            healReceived += buff._0?.value;
          }
          if (
            buff.type === 0 &&
            buff._0?.affectType === AffectType.DECREASE_HEAL_RECEIVED
          ) {
            healReceived -= buff._0?.value;
          }

          if (
            buff.type === 3 &&
            buff._3?.affectType === AffectType.INCREASE_HEAL_RECEIVED
          ) {
            healReceived += buff._3?.value * buff._3?.stack;
          }
          if (
            buff.type === 3 &&
            buff._3?.affectType === AffectType.DECREASE_HEAL_RECEIVED
          ) {
            healReceived -= buff._3?.value * buff._3?.stack;
          }
        }

        console.log('heal', heal * healReceived);
        character.hp = Math.floor(character.hp + heal * healReceived);
        if (character.hp > character.maxHp) {
          character.hp = character.maxHp;
        }

        gameState.characters.forEach((character, index) => {
          character.isHeal = true;
          // parseCondition(index, [Condition.GET_HEAL], gameState);
        });
      });
      break;
  }
}
