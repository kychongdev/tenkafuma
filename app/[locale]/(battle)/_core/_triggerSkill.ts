import {
  Buff,
  Condition,
  DamageType,
  SkillStackCondition,
  Target,
} from '@/app/[locale]/(battle)/_types/Skill';
import { CharacterAttribute, CharacterClass } from '@/types/Character';
import { applyRawAttBuff } from './applyRawAtk';
import { dealBasicDamage } from './dealBasisDamage';
import { dealBasicHpDamage } from './dealBasicHpDamage';
import { dealUltDamage } from './dealUltDamage';
import { dealUltHpDamage } from './dealUltHpDamage';
import { GameState } from './GameState';
import { p, parseTargetToNum } from './utils';

export function triggerSkill(
  buff: Buff,
  gameState: GameState,
  position: number,
) {
  switch (buff.type) {
    case 0: {
      // 回合制狀態
      // Turn based buff
      break;
    }
    case 1:
      // 傷害
      if (!buff._1) {
        console.log('Wrong data');
        break;
      }

      if (buff._1.damageType === 0) {
        dealBasicDamage(position, buff._1.value, gameState, buff._1.target);
      }
      if (buff._1.damageType === 1) {
        dealUltDamage(
          position,
          buff._1.value,
          gameState,
          buff._1.isTrigger,
          buff._1.target,
        );
      }
      break;
    case 2:
      if (!buff._2) {
        console.log('Wrong data');
        break;
      }
      // 贈與狀態
      // Apply Buff
      switch (buff._2.target) {
        case Target.SELF:
          gameState.characters[position].buff = [
            ...gameState.characters[position].buff,
            buff._2,
          ];
          break;
      }

      break;
    case 3:
      // 層次型狀態
      // Stack Based Buff
      if (!buff._3) {
        console.log('Wrong data');
        break;
      }
      break;
    case 4: {
      // 增加層次型狀態
      // 如果沒有就會贈與初始層次
      // Increase stack buff,if don't exist then it will apply
      if (!buff._4) {
        console.log('Wrong data');
        break;
      }
      if (buff._4.target === Target.SELF) {
        // x is gameState buff
        const isExist = gameState.characters[position].buff.some((x) => {
          return x.id === buff._4?.targetSkill;
        });

        if (isExist) {
          gameState.characters[position].buff.map((x) => {
            if (x.id === buff._4?.targetSkill) {
              if (x._3 && x._3.stack < x._3.maxStack) {
                if (x._3 && buff._4) {
                  x._3.stack += buff._4.increaseStack;
                  if (x._3.stack > x._3.maxStack) {
                    x._3.stack = x._3.maxStack;
                  }
                } else {
                  console.log('Wrong data buff._4');
                }
              }
            }
            return x;
          });
        } else {
          // purely typescript problem
          if (buff._4?.applyBuff) {
            gameState.characters[position].buff = [
              ...gameState.characters[position].buff,
              buff._4.applyBuff,
            ];
          } else {
            console.log('Wrong data buff._4.applyBuff');
          }
        }
      }
      if (buff._4.target === Target.ENEMY) {
        const isExist = gameState.enemies[gameState.targeting].buff.some(
          (x) => {
            return x.id === buff._4?.targetSkill;
          },
        );
        if (isExist) {
          gameState.enemies[gameState.targeting].buff.map((x) => {
            if (x.id === buff._4?.targetSkill) {
              if (x._3 && x._3.stack < x._3.maxStack) {
                if (x._3 && buff._4) {
                  x._3.stack += buff._4.increaseStack;
                  if (x._3.stack > x._3.maxStack) {
                    x._3.stack = x._3.maxStack;
                  }
                } else {
                  console.log('Wrong data buff._4');
                }
              }
            }
            return x;
          });
        } else {
          if (buff._4?.applyBuff) {
            gameState.enemies[gameState.targeting].buff = [
              ...gameState.enemies[gameState.targeting].buff,
              buff._4.applyBuff,
            ];
          } else {
            console.log('Wrong data buff._4.applyBuff');
          }
        }
      }
      if (buff._4.target === Target.ALL_ALLIES) {
        gameState.characters.forEach((_, index) => {
          const isExist = gameState.characters[index].buff.some((x) => {
            return x.id === buff._4?.targetSkill;
          });

          if (isExist) {
            gameState.characters[index].buff = gameState.characters[
              index
            ].buff.map((x) => {
              if (x.id === buff._4?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._4) {
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                    const clone = {
                      ...x,
                      _3: {
                        ...x._3,
                        stack: x._3.stack + buff._4.increaseStack,
                      },
                    };
                    return clone;
                  } else {
                    console.log('Wrong data buff._4');
                  }
                }
              }
              return x;
            });

            // gameState.characters[index].buff = gameState.characters[
            //   index
            // ].buff.map((x) => {
            //   if (x.id === buff._4?.targetSkill) {
            //     if (x._3 && x._3.stack < x._3.maxStack) {
            //       if (x._3 && buff._4) {
            //         x._3.stack += buff._4.increaseStack;
            //
            //         if (x._3.stack > x._3.maxStack) {
            //           x._3.stack = x._3.maxStack;
            //         }
            //       } else {
            //         console.log("Wrong data buff._4");
            //       }
            //     }
            //   }
            //   return x;
            // });
          } else {
            // purely typescript problem
            console.log('give first buff, suppose only 5');
            if (buff._4?.applyBuff) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                buff._4.applyBuff,
              ];
            } else {
              console.log('Wrong data buff._4.applyBuff');
            }
          }
        });
      }
      switch (buff._4.target) {
        case Target.POSITION_1:
        case Target.POSITION_2:
        case Target.POSITION_3:
        case Target.POSITION_4:
        case Target.POSITION_5: {
          const pos = parseTargetToNum(buff._4.target);
          if (pos === -1) {
            console.log('Wrong data buff._4.target');
            break;
          }
          // x is gameState buff
          const isExist = gameState.characters[pos].buff.some((x) => {
            return x.id === buff._4?.targetSkill;
          });
          if (isExist) {
            gameState.characters[pos].buff.map((x) => {
              if (x.id === buff._4?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._4) {
                    x._3.stack += buff._4.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log('Wrong data buff._4');
                  }
                }
              }
              return x;
            });
          } else {
            // purely typescript problem
            if (buff._4?.applyBuff) {
              gameState.characters[pos].buff = [
                ...gameState.characters[pos].buff,
                buff._4.applyBuff,
              ];
            } else {
              console.log('Wrong data buff._4.applyBuff');
            }
          }
        }

        case Target.FIRE:
        case Target.LIGHT:
        case Target.DARK:
        case Target.WIND:
        case Target.WATER:
          {
            const attribute = buff._4.target;
            gameState.characters.forEach((character, index) => {
              //@ts-ignore
              if (character.attribute === attribute) {
                const isExist = gameState.characters[index].buff.some((x) => {
                  return x.id === buff._4?.targetSkill;
                });

                if (isExist) {
                  gameState.characters[index].buff.map((x) => {
                    if (x.id === buff._4?.targetSkill) {
                      if (x._3 && x._3.stack < x._3.maxStack) {
                        if (x._3 && buff._4) {
                          x._3.stack += buff._4.increaseStack;
                          if (x._3.stack > x._3.maxStack) {
                            x._3.stack = x._3.maxStack;
                          }
                        } else {
                          console.log('Wrong data buff._4');
                        }
                      }
                    }
                    return x;
                  });
                } else {
                  if (buff._4?.applyBuff) {
                    gameState.characters[index].buff = [
                      ...gameState.characters[index].buff,
                      buff._4.applyBuff,
                    ];
                  } else {
                    console.log('Wrong data buff._4.applyBuff');
                  }
                }
              }
            });
          }
          break;
      }

      break;
    }
    case 5:
      if (!buff._5) {
        console.log('Wrong data 5');
        break;
      }
      break;
    case 6: {
      if (!buff._6) {
        console.log('Wrong data 6');
        break;
      }
      switch (buff._6.target) {
        case Target.ALL_ALLIES: {
          gameState.characters.forEach((_, index) => {
            if (!buff._6) {
              console.log('2.Wrong data 6');
              return;
            }

            const rawAttBuff = applyRawAttBuff(gameState, position);
            const baseAtk = gameState.characters[position].atk;
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: `${buff.id}-buff`,
                name: buff.name,
                type: 0,
                condition: Condition.NONE,
                duration: buff._6.duration,
                _0: {
                  value:
                    buff._6?.base === true
                      ? Math.floor(baseAtk * buff._6.value)
                      : Math.floor(rawAttBuff * buff._6.value),
                  affectType: buff._6?.affectType,
                },
              },
            ];
          });

          break;
        }
        case Target.SELF: {
          const rawAttBuff = applyRawAttBuff(gameState, position);
          const baseAtk = gameState.characters[position].atk;
          console.log('test');
          gameState.characters[position].buff = [
            ...gameState.characters[position].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._6.duration,
              _0: {
                value:
                  buff._6?.base === true
                    ? Math.floor(baseAtk * buff._6.value)
                    : Math.floor(rawAttBuff * buff._6.value),
                affectType: buff._6?.affectType,
              },
            },
          ];
          break;
        }
        case Target.ALL_EXCEPT_SELF: {
          gameState.characters.forEach((_, index) => {
            if (!buff._6) {
              console.log('2.Wrong data 6');
              return;
            }
            const rawAttBuff = applyRawAttBuff(gameState, position);
            const baseAtk = gameState.characters[position].atk;
            if (index !== position) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: `${buff.id}-buff`,
                  name: buff.name,
                  type: 0,
                  condition: Condition.NONE,
                  duration: buff._6.duration,
                  _0: {
                    value:
                      buff._6?.base === true
                        ? Math.floor(baseAtk * buff._6.value)
                        : Math.floor(rawAttBuff * buff._6.value),
                    affectType: buff._6?.affectType,
                  },
                },
              ];
            }
          });
          break;
        }
        case Target.OBSTRUCTER:
        case Target.HEALER:
        case Target.ATTACKER:
        case Target.PROTECTOR:
        case Target.SUPPORT: {
          gameState.characters.forEach((character, index) => {
            if (!buff._6) {
              console.log('2.Wrong data 6');
              return;
            }

            const rawAttBuff = applyRawAttBuff(gameState, position);
            const baseAtk = gameState.characters[position].atk;
            if (character.class === buff._6?.target) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                {
                  id: `${buff.id}-buff`,
                  name: buff.name,
                  type: 0,
                  condition: Condition.NONE,
                  duration: buff._6.duration,
                  _0: {
                    value:
                      buff._6?.base === true
                        ? Math.floor(baseAtk * buff._6.value)
                        : Math.floor(rawAttBuff * buff._6.value),
                    affectType: buff._6?.affectType,
                  },
                },
              ];
            }
          });
          break;
        }
        case Target.POSITION_1:
        case Target.POSITION_2:
        case Target.POSITION_3:
        case Target.POSITION_4:
        case Target.POSITION_5: {
          const rawAttBuff = applyRawAttBuff(gameState, position);
          const baseAtk = gameState.characters[position].atk;
          const pos = parseTargetToNum(buff._6.target);

          if (pos === -1) {
            console.log('Target Parsing is Wrong!');
            break;
          }
          gameState.characters[pos].buff = [
            ...gameState.characters[pos].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._6.duration,
              _0: {
                value:
                  buff._6?.base === true
                    ? Math.floor(baseAtk * buff._6.value)
                    : Math.floor(rawAttBuff * buff._6.value),
                affectType: buff._6?.affectType,
              },
            },
          ];
          break;
        }

        case Target.ALL_LIGHT_EXCEPT_SELF: {
          break;
        }

        default: {
          break;
        }
      }

      break;
    }
    case 7:
      if (!buff._7) {
        console.log('Wrong data 7');
        break;
      }
      if (buff._7.activated) {
        console.log('Already activated');
        break;
      }

      if (buff._7?.target === Target.SELF) {
        const skillStackNum = gameState.characters[position].buff.find((x) => {
          return x.id === buff._7?.targetSkill;
        });
        if (buff._7?.stackCondition === SkillStackCondition.HIGHER) {
          if (
            skillStackNum?._3?.stack &&
            skillStackNum._3.stack > buff._7?.stack
          ) {
            const buffIndex = gameState.characters[position].buff.findIndex(
              (x) => x.id === buff.id,
            );

            if (buffIndex == -1) {
              console.log("buff 7 can't find target buff");
              break;
            }

            //@ts-ignore
            gameState.characters[position].buff[buffIndex]._7.activated = true;

            if (buff._7.applyTarget === Target.SELF) {
              gameState.characters[position].buff = [
                ...gameState.characters[position].buff,
                buff._7.activateBuff,
              ];
            }
          }
        }
        // if (buff._7?.stackCondition === SkillStackCondition.HIGHER) {
        //   if (
        //     skillStackNum?._3?.stack &&
        //     skillStackNum._3.stack >= buff._7?.stack
        //   ) {
        //     const buffIndex = gameState.characters[position].buff.findIndex(
        //       (x) => x.id === buff.id,
        //     );
        //
        //     if (buffIndex == -1) {
        //       console.log("buff 7-2 can't find target buff");
        //       break;
        //     }
        //
        //     //@ts-ignore
        //     gameState.characters[position].buff[buffIndex]._7.activated = true;
        //     gameState.characters[position].buff = [
        //       ...gameState.characters[position].buff,
        //       buff._7.activateBuff,
        //     ];
        //     if (buff._7.applyTarget === Target.SELF) {
        //       gameState.characters[position].buff = [
        //         ...gameState.characters[position].buff,
        //         buff._7.activateBuff,
        //       ];
        //     }
        //   }
        // }
      }
      break;
    case 8:
      if (!buff._8) {
        console.log('Wrong data 8');
        console.log(buff);
        break;
      }
      if (buff._8?.target === Target.SELF) {
        const skillStackNum = gameState.characters[position].buff.find((x) => {
          return x.id === buff._8?.targetSkill;
        });
        if (buff._8?.applyTarget === Target.SELF) {
          gameState.characters[position].buff = [
            ...gameState.characters[position].buff,
            buff._8.applyBuff,
          ];
        } else if (buff._8?.applyTarget === Target.ENEMY) {
          const applyBuff = buff._8.applyBuff;
          if (
            !applyBuff ||
            !applyBuff._0 ||
            !skillStackNum ||
            !skillStackNum._3
          ) {
            console.log(JSON.parse(JSON.stringify(buff)));
            console.log('Wrong data 8 applyBuff');
            break;
          }
          gameState.enemies[gameState.targeting].buff = [
            ...gameState.enemies[gameState.targeting].buff,
            {
              id: applyBuff.id,
              name: applyBuff.name,
              type: 0,
              condition: Condition.NONE,
              duration: 1,
              _0: {
                value: applyBuff._0?.value * skillStackNum._3.stack,
                affectType: applyBuff._0?.affectType,
              },
            },
          ];
        }
      }
      break;
    case 9:
      if (!buff._9) {
        console.log('Wrong data 9');
        break;
      }
      break;
    case 10:
      if (!buff._10) {
        console.log('Wrong data 10');
        break;
      }
      break;
    case 11:
      if (!buff._11) {
        console.log('Wrong data 11');
        break;
      }
      switch (buff._11.target) {
        case Target.SELF: {
          gameState.characters[position].buff = [
            ...gameState.characters[position].buff,
            ...buff._11.applyBuff,
          ];
          break;
        }
        case Target.ENEMY: {
          gameState.enemies[gameState.targeting].buff = [
            ...gameState.enemies[gameState.targeting].buff,
            ...buff._11.applyBuff,
          ];
          break;
        }
        case Target.DARK_ENEMY: {
          gameState.enemies.forEach((enemy, index) => {
            if (enemy.attribute === CharacterAttribute.DARK) {
              if (!buff._11) {
                console.log('Wrong data 11');
                return;
              }
              gameState.enemies[index].buff = [
                ...gameState.enemies[index].buff,
                ...buff._11.applyBuff,
              ];
            }
          });
          break;
        }
        case Target.ALL_ALLIES: {
          gameState.characters.forEach((_, index) => {
            if (!buff._11) {
              console.log("_11 Apply buff don't exist");
              return;
            }
            if (buff.id === '522-passive-5-1') {
              console.log('did run');
            }
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              ...buff._11.applyBuff,
            ];
          });
          break;
        }

        case Target.ALL_EXCEPT_SELF: {
          gameState.characters.forEach((_, index) => {
            if (index !== position) {
              if (!buff._11) {
                console.log("_11 Apply buff don't exist");
                return;
              }
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                ...buff._11.applyBuff,
              ];
            }
          });
          break;
        }

        case Target.ATTACKER:
        case Target.OBSTRUCTER:
        case Target.HEALER:
        case Target.PROTECTOR:
        case Target.SUPPORT: {
          gameState.characters.forEach((character, index) => {
            if (character.class === buff._11?.target) {
              if (!buff._11) {
                console.log('Wrong data 11');
                return;
              }
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                ...buff._11?.applyBuff,
              ];
            }
          });
          break;
        }

        case Target.FIRE:
        case Target.WIND:
        case Target.DARK:
        case Target.LIGHT:
        case Target.WATER: {
          gameState.characters.forEach((character, index) => {
            //@ts-ignore
            if (character.attribute === buff._11?.target) {
              if (!buff._11) {
                console.log('Wrong data 11');
                return;
              }
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                ...buff._11?.applyBuff,
              ];
            }
          });
          break;
        }

        case Target.POSITION_1:
        case Target.POSITION_2:
        case Target.POSITION_3:
        case Target.POSITION_4:
        case Target.POSITION_5: {
          const pos = parseTargetToNum(buff._11.target);

          if (pos === -1) {
            console.log('Target Parsing is Wrong!');
            break;
          }

          gameState.characters[pos].buff = [
            ...gameState.characters[pos].buff,
            ...buff._11.applyBuff,
          ];
          break;
        }

        case Target.ALL_LIGHT_EXCEPT_SELF: {
          gameState.characters.forEach((character, index) => {
            if (
              index !== position &&
              character.attribute === CharacterAttribute.LIGHT
            ) {
              if (!buff._11) {
                console.log("_11 Apply buff don't exist");
                return;
              }
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                ...buff._11.applyBuff,
              ];
            }
          });
          break;
        }

        default:
          break;
      }

      if (buff._11.deleteSelf) {
        const buffIndex = gameState.characters[position].buff.findIndex(
          (x) => x.id === buff.id,
        );
        if (buffIndex === -1) {
          break;
        }
        const clone = [...gameState.characters[position].buff];
        clone.splice(buffIndex, 1);
        gameState.characters[position].buff = clone;
      }
      break;
    case 12:
      //TODO Check bug
      if (!buff._12) {
        console.log('Wrong data 12');
        break;
      }
      {
        const positionList = [0, 1, 2, 3, 4];
        positionList.splice(buff._12?.position, 1);
        function recursiveRandomPosition(applyBuff: Buff) {
          if (positionList.length === 0) {
            return;
          }
          const randomPosition = Math.floor(
            Math.random() * positionList.length,
          );
          if (
            gameState.characters[randomPosition].isExist &&
            !gameState.characters[randomPosition].isDead
          ) {
            gameState.characters[randomPosition].buff = [
              ...gameState.characters[randomPosition].buff,
              applyBuff,
            ];
          } else {
            positionList.splice(randomPosition, 1);
            recursiveRandomPosition(applyBuff);
          }
        }
        if (buff._12?.position) {
          if (!buff._12.applyBuff) {
            console.log('Wrong data 12 applyBuff');
            break;
          }
          if (
            gameState.characters[buff._12.position].isExist &&
            !gameState.characters[buff._12.position].isDead
          ) {
            gameState.characters[buff._12.position].buff = [
              ...gameState.characters[buff._12.position].buff,
              buff._12.applyBuff,
            ];
          } else {
            recursiveRandomPosition(buff._12.applyBuff);
          }
        }
      }
      break;
    case 13:
      if (!buff._13) {
        console.log('Wrong data 13');
        break;
      }
      gameState.characters.forEach((character, index) => {
        if (character.id === buff._13?.target) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            ...buff._13.applyBuff,
          ];
        }
      });
      break;
    case 14:
      if (!buff._14) {
        console.log('Wrong data 14');
        break;
      }
      switch (buff._14.target) {
        case Target.SELF:
          gameState.characters[position].cd -= buff._14.reduceCD;
          if (gameState.characters[position].cd < 0) {
            gameState.characters[position].cd = 0;
            console.log(gameState.characters[position].cd);
          }
          break;
        case Target.ALL_ALLIES:
          gameState.characters.forEach((_, index) => {
            if (!buff._14) {
              console.log('Wrong data 14');
              return;
            }
            gameState.characters[index].cd -= buff._14.reduceCD;
            if (gameState.characters[index].cd < 0) {
              gameState.characters[index].cd = 0;
            }
          });
          break;
        case Target.ATTACKER:
          gameState.characters.forEach((character, index) => {
            if (character.class === CharacterClass.ATTACKER) {
              if (!buff._14) {
                console.log('Wrong data 14');
                return;
              }
              gameState.characters[index].cd -= buff._14.reduceCD;
              if (gameState.characters[index].cd < 0) {
                gameState.characters[index].cd = 0;
              }
            }
          });
          break;
        case Target.OBSTRUCTER:
          gameState.characters.forEach((character, index) => {
            if (character.class === CharacterClass.OBSTRUCTER) {
              if (!buff._14) {
                console.log('Wrong data 14');
                return;
              }
              gameState.characters[index].cd -= buff._14.reduceCD;
              if (gameState.characters[index].cd < 0) {
                gameState.characters[index].cd = 0;
              }
            }
          });
          break;
        case Target.PROTECTOR:
          gameState.characters.forEach((character, index) => {
            if (character.class === CharacterClass.PROTECTOR) {
              if (!buff._14) {
                console.log('Wrong data 14');
                return;
              }
              gameState.characters[index].cd -= buff._14.reduceCD;
              if (gameState.characters[index].cd < 0) {
                gameState.characters[index].cd = 0;
              }
            }
          });

          break;
        case Target.SUPPORT:
          gameState.characters.forEach((character, index) => {
            if (character.class === CharacterClass.SUPPORT) {
              if (!buff._14) {
                console.log('Wrong data 14');
                return;
              }
              gameState.characters[index].cd -= buff._14.reduceCD;
              if (gameState.characters[index].cd < 0) {
                gameState.characters[index].cd = 0;
              }
            }
          });
          break;
        case Target.HEALER:
          gameState.characters.forEach((character, index) => {
            if (character.class === CharacterClass.HEALER) {
              if (!buff._14) {
                console.log('Wrong data 14');
                return;
              }
              gameState.characters[index].cd -= buff._14.reduceCD;
              if (gameState.characters[index].cd < 0) {
                gameState.characters[index].cd = 0;
              }
            }
          });
          break;
      }
      break;
    case 15:
      {
        if (!buff._15) {
          console.log('Wrong data 15');
          break;
        }
        const positionList = [0, 1, 2, 3, 4];
        positionList.splice(buff._15?.position, 1);
        function recursiveRandomPosition1(reduce: number) {
          if (positionList.length === 0) {
            return;
          }
          const randomPosition = Math.floor(
            Math.random() * positionList.length,
          );
          if (
            gameState.characters[randomPosition].isExist &&
            !gameState.characters[randomPosition].isDead
          ) {
            gameState.characters[randomPosition].cd -= reduce;
            if (gameState.characters[randomPosition].cd < 0) {
              gameState.characters[randomPosition].cd = 0;
            }
          } else {
            positionList.splice(randomPosition, 1);
            recursiveRandomPosition1(reduce);
          }
        }
        if (
          gameState.characters[buff._15.position].isExist &&
          !gameState.characters[buff._15.position].isDead
        ) {
          gameState.characters[buff._15.position].cd -= buff._15.reduceCD;
          if (gameState.characters[buff._15.position].cd < 0) {
            gameState.characters[buff._15.position].cd = 0;
          }
        } else {
          recursiveRandomPosition1(buff._15.reduceCD);
        }
      }
      break;
    case 16:
      if (!buff._16) {
        console.log('Wrong data 16');
        break;
      }
      gameState.characters.forEach((character, index) => {
        const hp = gameState.characters[position].maxHp;
        if (character.class === buff._16?.target) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._16?.duration,
              _0: {
                value: Math.floor(hp * buff._16.value),
                affectType: buff._16?.affectType,
              },
            },
          ];
        } else if (buff._16?.target === Target.ALL_ALLIES) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._16?.duration,
              _0: {
                value: Math.floor(hp * buff._16.value),
                affectType: buff._16?.affectType,
              },
            },
          ];
        } else if (buff._16?.target === Target.ALL_EXCEPT_SELF) {
          if (index !== position) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: `${buff.id}-buff`,
                name: buff.name,
                type: 0,
                condition: Condition.NONE,
                duration: buff._16?.duration,
                _0: {
                  value: Math.floor(hp * buff._16.value),
                  affectType: buff._16?.affectType,
                },
              },
            ];
          }
        }
      });
      if (buff._16?.target === Target.SELF) {
        const hp = gameState.characters[position].maxHp;
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: `${buff.id}-buff`,
            name: buff.name,
            type: 0,
            condition: Condition.NONE,
            duration: buff._16?.duration,
            _0: {
              value: Math.floor(hp * buff._16.value),
              affectType: buff._16?.affectType,
            },
          },
        ];
      }
      break;
    case 17:
      if (!buff._17) {
        console.log('Wrong data 17');
        break;
      }
      gameState.characters.forEach((character, index) => {
        if (buff._17?.includeSelf) {
          if (buff._17?.target.includes(character.class)) {
            if (character.attribute === buff._17.attributeTarget) {
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                ...buff._17.applyBuff,
              ];
            }
          }
        } else {
          if (index !== position) {
            if (buff._17?.target.includes(character.class)) {
              if (character.attribute === buff._17.attributeTarget) {
                gameState.characters[index].buff = [
                  ...gameState.characters[index].buff,
                  ...buff._17.applyBuff,
                ];
              }
            }
          }
        }
      });
      break;
    case 18:
      if (!buff._18) {
        console.log('Wrong data 18');
        break;
      }
      gameState.characters.forEach((character, index) => {
        if (buff._18?.attribute === character.attribute) {
          if (buff._18.includeSelf) {
            gameState.characters[index].cd -= buff._18.reduceCD;
            if (gameState.characters[index].cd < 0) {
              gameState.characters[index].cd = 0;
            }
          } else {
            if (index !== position) {
              gameState.characters[index].cd -= buff._18.reduceCD;
              if (gameState.characters[index].cd < 0) {
                gameState.characters[index].cd = 0;
              }
            }
          }
        }
      });
      break;
    case 19: {
      if (!buff._19) {
        console.log('Wrong data 19');
        break;
      }
      {
        const buff2: Buff = {
          id: '',
          name: '',
          type: 4,
          condition: Condition.NONE,
          duration: 100,
          _4: {
            target: buff._19.target,
            targetSkill: buff._19.targetSkill,
            increaseStack: buff._19.increaseStack,
            applyBuff: buff._19.applyBuff,
          },
        };
        triggerSkill(buff2, gameState, position);
      }
      let checkTargetPos: number | undefined | null;

      switch (buff._19.target) {
        case Target.POSITION_1:
          checkTargetPos = 0;
          break;
        case Target.SELF:
          checkTargetPos = position;
          break;
      }

      console.log(JSON.parse(JSON.stringify(gameState.characters[0].buff)));
      buff._19.checkActivation.forEach((activation) => {
        if (activation.skillStackCondition === SkillStackCondition.HIGHER) {
          if (checkTargetPos === undefined || checkTargetPos === null) {
            console.log("Can't find _19 check skill target");
            return;
          }
          const skillStackNum = gameState.characters[checkTargetPos].buff.find(
            (x) => {
              return x.id === activation.checkSkillId;
            },
          );
          console.log(skillStackNum);
          if (!skillStackNum) {
            console.log('Skill stack not found');
            return;
          }
          if (
            skillStackNum?._3?.stack &&
            skillStackNum?._3?.stack > activation.activateIfStack
          ) {
            const char = gameState.characters.findIndex((x) => {
              return x.id === activation.characterId;
            });
            if (char === -1) {
              console.log('Character not found, 19 error');
              return;
            }
            const checkBuff = gameState.characters[char].buff.find((x) => {
              return x.id === activation.checkSkillId;
            });
            if (!checkBuff) {
              console.log('Buff not found, 19 error');
              return;
            }
            if (
              checkBuff._3 &&
              checkBuff._3.stack >= activation.activateIfStack
            ) {
              const activatedBuff = gameState.characters[char].buff.map((x) => {
                if (x.id === activation.activateBuffId) {
                  // x.deactivated = 'activated';
                  x.deactivated = false;
                }
                return x;
              });
              gameState.characters[char].buff = activatedBuff;
            }
          } else {
            console.log('less stack');
          }
        }
      });
      break;
    }
    case 20: {
      if (!buff._20) {
        console.log('Wrong data 20');
        break;
      }

      const charIndex = gameState.characters.findIndex((x) => {
        return x.id === buff._20?.targetChar;
      });

      if (charIndex === -1) {
        console.log('Character not found, 19 error');
        break;
      }

      if (buff._20.clearAll) {
        const buffIndex = gameState.characters[charIndex].buff.findIndex(
          (x) => x.id === buff._20?.targetSkill,
        );
        if (!buffIndex || buffIndex == -1) {
          break;
        }
        const clone = [...gameState.characters[charIndex].buff];
        clone.splice(buffIndex, 1);
        gameState.characters[position].buff = clone;
        // gameState.characters[charIndex].buff.forEach((x) => {
        //   if (x.id === buff._20?.targetSkill) {
        //
        //     if (x._3) {
        //       x._3.stack = 0;
        //     }
        //   }
        //   return x;
        // });
      }
      break;
    }
    case 21:
      if (!buff._21) {
        console.log('Wrong data 21');
        break;
      }
      buff._21.trigger.forEach((b) => {
        console.log(p(b.id));
        triggerSkill(b, gameState, position);
      });

      break;
    case 22:
      if (!buff._22) {
        console.log('Wrong data 22');
        break;
      }
      {
        const buff2: Buff = {
          id: '',
          name: '',
          type: 4,
          condition: Condition.NONE,
          duration: 100,
          _4: {
            target: buff._22.target,
            targetSkill: buff._22.targetSkill,
            increaseStack: buff._22.increaseStack,
            applyBuff: buff._22.applyBuff,
          },
        };
        triggerSkill(buff2, gameState, position);
      }

      let checkTargetPos: number | undefined | null;

      switch (buff._22.target) {
        case Target.POSITION_1:
          checkTargetPos = 0;
          break;
        case Target.SELF:
          checkTargetPos = position;
          break;
      }

      buff._22.checkActivation.forEach((activation) => {
        switch (activation.skillStackCondition) {
          case SkillStackCondition.HIGHER: {
            if (checkTargetPos === undefined || checkTargetPos === null) {
              console.log("Can't find _22 check skill target");
              return;
            }
            const skillStackNum = gameState.characters[position].buff.find(
              (x) => {
                return x.id === activation.checkSkillId;
              },
            );
            if (!skillStackNum) {
              console.log('Skill stack not found 22');
              return;
            }
            if (
              skillStackNum?._3?.stack &&
              skillStackNum?._3?.stack > activation.activateIfStack
            ) {
              const char = gameState.characters.findIndex((x) => {
                return x.id === activation.characterId;
              });
              if (char === -1) {
                console.log('Character not found, 22 error');
                return;
              }
              const checkBuff = gameState.characters[char].buff.find((x) => {
                return x.id === activation.checkSkillId;
              });
              if (!checkBuff) {
                console.log('Buff not found, 22 error');
                return;
              }
              if (
                checkBuff._3 &&
                checkBuff._3.stack >= activation.activateIfStack
              ) {
                gameState.characters[char].buff = [
                  ...gameState.characters[char].buff,
                  ...activation.applyBuffs,
                ];
              }
            } else {
              console.log('less stack');
            }
            break;
          }
          case SkillStackCondition.EQUAL: {
            if (checkTargetPos === undefined || checkTargetPos === null) {
              console.log("Can't find _22 check skill target");
              return;
            }
            const skillStackNum = gameState.characters[position].buff.find(
              (x) => {
                return x.id === activation.checkSkillId;
              },
            );
            if (!skillStackNum) {
              console.log('Skill stack not found 22');
              return;
            }
            if (
              skillStackNum?._3?.stack &&
              skillStackNum?._3?.stack == activation.activateIfStack
            ) {
              const char = gameState.characters.findIndex((x) => {
                return x.id === activation.characterId;
              });
              if (char === -1) {
                console.log('Character not found, 22 error');
                return;
              }
              const checkBuff = gameState.characters[char].buff.find((x) => {
                return x.id === activation.checkSkillId;
              });
              if (!checkBuff) {
                console.log('Buff not found, 22 error');
                return;
              }
              if (
                checkBuff._3 &&
                checkBuff._3.stack >= activation.activateIfStack
              ) {
                gameState.characters[char].buff = [
                  ...gameState.characters[char].buff,
                  ...activation.applyBuffs,
                ];
              }
            } else {
              console.log('less stack');
            }
            break;
          }
        }
      });
      break;
    case 23: {
      if (!buff._23) {
        console.log('Wrong data 23');
        break;
      }
      const charIndex = gameState.characters.findIndex((x) => {
        return x.id === buff._23?.targetChar;
      });

      if (charIndex === -1) {
        console.log('Character not found, 23 error');
        break;
      }

      buff._23.targetSkill.forEach((skillId) => {
        const clone = gameState.characters[charIndex].buff.map((charBuff) => {
          if (charBuff.id === skillId) {
            charBuff.deactivated = false;
            return charBuff;
          }
          return charBuff;
        });
        gameState.characters[position].buff = clone;
      });

      buff._23.clearSkill.forEach((skillId) => {
        const buffIndex = gameState.characters[charIndex].buff.findIndex(
          (x) => x.id === skillId,
        );
        if (!buffIndex || buffIndex == -1) {
          return;
        }
        const clone = [...gameState.characters[charIndex].buff];
        clone.splice(buffIndex, 1);
        gameState.characters[position].buff = clone;
      });
      break;
    }

    case 24: {
      if (!buff._24) {
        console.log('Wrong data 24');
        break;
      }
      function recursiveDeleteSkill(index: string, pos: number) {
        const buffIndex = gameState.characters[pos].buff.findIndex(
          (x) => x.id === index,
        );

        if (!buffIndex || buffIndex == -1) {
          return;
        }

        const clone = [...gameState.characters[pos].buff];
        clone.splice(buffIndex, 1);
        gameState.characters[pos].buff = clone;
        recursiveDeleteSkill(index, pos);
      }

      switch (buff._24.target) {
        case Target.ALL_EXCEPT_SELF: {
          gameState.characters.forEach((_, charIndex) => {
            if (charIndex !== position) {
              buff._24?.clearSkill.forEach((deleteSkillIndex) => {
                recursiveDeleteSkill(deleteSkillIndex, charIndex);
              });
            }
          });

          break;
        }

        case Target.SELF: {
          buff._24?.clearSkill.forEach((index) => {
            recursiveDeleteSkill(index, position);
          });
          break;
        }
      }

      break;
    }

    case 25:
      // 傷害
      if (!buff._25) {
        console.log('Wrong data');
        break;
      }
      if (buff._25.damageType === 0) {
        dealBasicHpDamage(
          position,
          buff._25.value,
          gameState,
          buff._25.target,
          DamageType.BASIC,
        );
      }
      if (buff._25.damageType === 1) {
        dealUltHpDamage(
          position,
          buff._25.value,
          gameState,
          buff._25.isTrigger,
          buff._25.target,
        );
      }
      break;
  }

  if (buff.deleteSelf) {
    const buffIndex = gameState.characters[position].buff.findIndex(
      (x) => x.id === buff.id,
    );
    if (buffIndex === -1) {
      console.log('Buff not found, delete self error');
      return;
    }

    const clone = [...gameState.characters[position].buff];
    clone.splice(buffIndex, 1);
    gameState.characters[position].buff = clone;
  }
}
