import Big from "big.js";
import {
  triggerDmgToPos,
  checkOpponent,
  triggerDmgToTargeting,
  triggerDmgToAll,
} from "./applyDamage";
import {
  basicHealAllAllies,
  ultHealAllAllies,
  ultHpHealAll,
  ultTriggerHeal,
} from "./applyHeal";
import { applyRawAttBuff, rawHotAll } from "./applyRawAtk";
import {
  triggerShieldAllAllies,
  ultHpShieldAllAllies,
  ultShieldAllAllies,
} from "./applyShield";
import { basicDamage } from "./calculations/basicDamage";
import { ultDamage } from "./calculations/ultDamage";
import { checkSpecialCondition } from "./condition";
import { GameState } from "./GameState";
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
  SpecialCondition,
  Target,
} from "./types/Skill";
import { checkTargetAlive, lowestHp } from "./utils";
import { p as print } from "./utils";
import { damageOverTime } from "./calculations/damageOverTime";
import { setLock } from "./target";

export function trigger(
  G: GameState,
  oG: GameState,
  p: number,
  buff: Skill,
  ca: CharacterAction,
) {
  if (buff.disabledOnSkill) {
    const isExist = oG.characters[p].buff.some((x) => {
      return x.id === buff.disabledOnSkill;
    });
    if (isExist) {
      return;
    }
  }

  if (buff.specialCondition === SpecialCondition.SKILL_STACK_MORE_THAN) {
    if (!buff.specialConditionValue && buff.specialConditionValue !== 0) {
      return;
    }
    if (!buff.specialConditionSkill) {
      return;
    }
    const skill = oG.characters[p].buff.find(
      (x) => x.id === buff.specialConditionSkill,
    );
    if (!skill) {
      return;
    }
    if (skill && skill._3 && skill._3?.stack < buff.specialConditionValue) {
      return;
    }
  }

  switch (buff.type) {
    case 0: {
      break;
    }
    case 1: {
      // 傷害
      if (!buff._1) {
        console.log("Wrong data");
        break;
      }

      let d = buff._1.defender;
      switch (buff._1.defender) {
        case Target.ENEMY_1:
          setLock(G, p, d);
          d = G.characters[p].lock1;
          break;
        case Target.ENEMY_2:
          setLock(G, p, d);
          d = G.characters[p].lock2;
          break;
        case Target.ENEMY_3:
          setLock(G, p, d);
          d = G.characters[p].lock3;
          break;
        case Target.ENEMY_4:
          setLock(G, p, d);
          d = G.characters[p].lock4;
          break;
        case Target.ENEMY_5:
          setLock(G, p, d);
          d = G.characters[p].lock5;
          break;
      }

      const dt = buff._1.damageType;

      switch (buff._1.damageType) {
        case DamageType.BASIC: {
          if (buff._1.multiple) {
            if (!buff._1.multipleValue) {
              console.log("Missing Multiple Value");
              break;
            }
            for (let i = 0; i < buff._1.multipleValue; i++) {
              if (checkTargetAlive(G, d)) {
                const dmg = basicDamage(G, oG, buff._1.value, p, d, false);
                triggerDmgToPos(G, oG, dmg, p, d, false, dt, ca);
              }
            }
          } else {
            if (checkTargetAlive(G, d)) {
              const dmg = basicDamage(G, oG, buff._1.value, p, d, false);
              triggerDmgToPos(G, oG, dmg, p, d, false, dt, ca);
            }
          }
        }
        case DamageType.ULTIMATE: {
          // There won't be non-ult damage
          console.log("Wrong data, not suppose to have ult dmg");
          break;
        }
        case DamageType.TRIGGER: {
          if (d === Target.ENEMY) {
            const dmg = ultDamage(G, oG, buff._1.value, p, d, true, false);
            triggerDmgToTargeting(G, oG, dmg, p, d, false, dt, ca);
          } else if (d === Target.ALL_ENEMIES) {
            triggerDmgToAll(G, oG, buff._1.value, p, false, dt, ca);
          } else {
            if (buff._1.multiple) {
              if (!buff._1.multipleValue) {
                console.log("Missing Multiple Value");
                break;
              }
              for (let i = 0; i < buff._1.multipleValue; i++) {
                const dmg = ultDamage(G, oG, buff._1.value, p, d, true, false);
                triggerDmgToPos(G, oG, dmg, p, d, false, dt, ca);
              }
            } else {
              const dmg = ultDamage(G, oG, buff._1.value, p, d, true, false);
              triggerDmgToPos(G, oG, dmg, p, d, false, dt, ca);
            }
          }
        }
      }
      break;
    }
    case 4: {
      // 增加層次型狀態
      // 如果沒有就會贈與初始層次
      // Increase stack buff,if don't exist then it will apply
      if (!buff._4) {
        console.log("Wrong data");
        break;
      }

      switch (buff._4.target) {
        case Target.SELF: {
          // x is G buff
          const isExist = G.characters[p].buff.some((x) => {
            return x.id === buff._4?.targetSkill;
          });

          if (isExist) {
            G.characters[p].buff.map((x) => {
              if (x.id === buff._4?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._4) {
                    x._3.stack += buff._4.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._4");
                  }
                }
              }
              return x;
            });
          } else {
            // purely typescript problem
            if (buff._4?.applySkill) {
              G.characters[p].buff = [
                ...G.characters[p].buff,
                buff._4.applySkill,
              ];
            } else {
              console.log("Wrong data buff._4.applySkill");
            }
          }
          break;
        }
        case Target.SPECIFIC_CHARACTER: {
          const char = G.characters.findIndex((character) => {
            return character.id === buff._4?.applyToSpecificChar;
          });
          if (char === -1) {
            break;
          }

          const isExist = G.characters[char].buff.some((x) => {
            return x.id === buff._4?.targetSkill;
          });

          if (isExist) {
            G.characters[char].buff.map((x) => {
              if (x.id === buff._4?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._4) {
                    x._3.stack += buff._4.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._4");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._4?.applySkill) {
              G.characters[char].buff = [
                ...G.characters[char].buff,
                buff._4.applySkill,
              ];
            } else {
              console.log("Wrong data buff._4.applySkill");
            }
          }
          break;
        }

        case Target.ALL_ALLIES: {
          G.characters.forEach((_, index) => {
            const isExist = G.characters[index].buff.some((x) => {
              return x.id === buff._4?.targetSkill;
            });
            const charBuff = checkSpecialCondition(G, oG, index);
            const isHealImmune = charBuff.some((x) => {
              return (
                x._0?.affectType === AffectType.IMMUNE_DECREASE_HEAL_RECEIVED
              );
            });
            if (
              isHealImmune &&
              buff._4 &&
              buff._4.applySkill &&
              buff._4.applySkill._3 &&
              buff._4?.applySkill._3.affectType ===
                AffectType.DECREASE_HEAL_RECEIVED
            ) {
              return;
            }

            if (isExist) {
              G.characters[index].buff = G.characters[index].buff.map((x) => {
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
                      console.log("Wrong data buff._4");
                    }
                  }
                }
                return x;
              });
            } else {
              // purely typescript problem
              // console.log('give first buff, suppose only 5');
              if (buff._4?.applySkill) {
                G.characters[index].buff = [
                  ...G.characters[index].buff,
                  buff._4.applySkill,
                ];
              } else {
                console.log("Wrong data buff._4.applySkill");
              }
            }
          });
          break;
        }
        case Target.ENEMY: {
          const isExist = G.enemies[G.targeting].buff.some((x) => {
            return x.id === buff._4?.targetSkill;
          });
          if (isExist) {
            G.enemies[G.targeting].buff.map((x) => {
              if (x.id === buff._4?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._4) {
                    x._3.stack += buff._4.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._4");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._4?.applySkill) {
              G.enemies[G.targeting].buff = [
                ...G.enemies[G.targeting].buff,
                buff._4.applySkill,
              ];
            } else {
              console.log("Wrong data buff._4.applySkill");
            }
          }
          break;
        }
        case Target.ALL_ENEMIES: {
          console.log("trigger all enemy");
          G.enemies.forEach((_, index) => {
            const isExist = G.enemies[index].buff.some((x) => {
              return x.id === buff._4?.targetSkill;
            });

            console.log("trigger all enemy", isExist);
            if (isExist) {
              G.enemies[index].buff = G.enemies[index].buff.map((x) => {
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
                      console.log("Wrong data buff._4");
                    }
                  }
                }
                return x;
              });
            } else {
              // purely typescript problem
              // console.log('give first buff, suppose only 5');
              //
              console.log("give original buff");

              if (buff._4?.applySkill) {
                G.enemies[index].buff = [
                  ...G.enemies[index].buff,
                  buff._4.applySkill,
                ];
                console.log("give original buff", G.enemies[index].buff);
              } else {
                console.log("Wrong data buff._4.applySkill");
              }
            }
          });
          break;
        }
        case Target.POSITION_1:
        case Target.POSITION_2:
        case Target.POSITION_3:
        case Target.POSITION_4:
        case Target.POSITION_5: {
          const pos = buff._4.target;
          const isExist = G.characters[pos].buff.some((x) => {
            return x.id === buff._4?.targetSkill;
          });
          if (isExist) {
            G.characters[pos].buff.map((x) => {
              if (x.id === buff._4?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._4) {
                    x._3.stack += buff._4.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._4");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._4?.applySkill) {
              G.characters[pos].buff = [
                ...G.characters[pos].buff,
                buff._4.applySkill,
              ];
            } else {
              console.log("Wrong data buff._4.applySkill");
            }
          }
        }

        case Target.FIRE:
        case Target.LIGHT:
        case Target.DARK:
        case Target.WIND:
        case Target.WATER: {
          const attribute = buff._4.target;
          G.characters.forEach((character, index) => {
            //@ts-ignore
            if (character.attribute === attribute) {
              const isExist = G.characters[index].buff.some((x) => {
                return x.id === buff._4?.targetSkill;
              });

              if (isExist) {
                G.characters[index].buff.map((x) => {
                  if (x.id === buff._4?.targetSkill) {
                    if (x._3 && x._3.stack < x._3.maxStack) {
                      if (x._3 && buff._4) {
                        x._3.stack += buff._4.increaseStack;
                        if (x._3.stack > x._3.maxStack) {
                          x._3.stack = x._3.maxStack;
                        }
                      } else {
                        console.log("Wrong data buff._4");
                      }
                    }
                  }
                  return x;
                });
              } else {
                if (buff._4?.applySkill) {
                  G.characters[index].buff = [
                    ...G.characters[index].buff,
                    buff._4.applySkill,
                  ];
                } else {
                  console.log("Wrong data buff._4.applySkill");
                }
              }
            }
          });
          break;
        }
        case Target.ENEMY_1:
        case Target.ENEMY_2:
        case Target.ENEMY_3:
        case Target.ENEMY_4:
        case Target.ENEMY_5: {
          const target = buff._4.target - 20;
          const isExist = G.enemies[target].buff.some((x) => {
            return x.id === buff._4?.targetSkill;
          });
          if (isExist) {
            G.enemies[target].buff.map((x) => {
              if (x.id === buff._4?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._4) {
                    x._3.stack += buff._4.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._4");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._4?.applySkill) {
              G.enemies[target].buff = [
                ...G.enemies[target].buff,
                buff._4.applySkill,
              ];
            } else {
              console.log("Wrong data buff._4.applySkill");
            }
          }
          break;
        }
        default:
          console.log("No target found");
          break;
      }
      break;
    }
    case 5: {
      if (!buff._5) {
        console.log(buff.id);
        console.log("Wrong data 5");
        break;
      }

      switch (buff._5.damageType) {
        case DamageType.BASIC: {
          break;
        }
        case DamageType.ULTIMATE: {
          break;
        }
        case DamageType.TRIGGER: {
          if (buff._5.target === Target.ALL_ALLIES) {
            ultHealAllAllies(G, oG, buff._5.value, p, true, false, ca);
          }
          break;
        }
        case DamageType.TRIGGER_HP: {
          console.log("trigger hp");
          if (buff._5.target === Target.ALL_ALLIES) {
            ultHpHealAll(G, oG, buff._5.value, p, true, false, ca);
          }
          // TODO susan need
        }
      }
      break;
    }
    case 6: {
      if (!buff._6) {
        console.log("Wrong data 6");
        break;
      }
      //傳功
      switch (buff._6.target) {
        case Target.ALL_ALLIES: {
          G.characters.forEach((_, index) => {
            if (!buff._6) {
              console.log("2.Wrong data 6");
              return;
            }

            const rawAttSkill = applyRawAttBuff(G, p);
            const baseAtk = Big(G.characters[p].atk);
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: `${buff.id}-buff`,
                name: buff.name,
                type: 0,
                condition: Condition.NONE,
                duration: buff._6.duration,
                _0: {
                  value:
                    buff._6?.base === true
                      ? baseAtk
                          .mul(buff._6.value)
                          .round(0, Big.roundDown)
                          .toNumber()
                      : rawAttSkill
                          .mul(buff._6.value)
                          .round(0, Big.roundDown)
                          .toNumber(),
                  affectType: AffectType.RAW_ATK,
                },
              },
            ];
          });

          break;
        }
        case Target.SELF: {
          const rawAttSkill = applyRawAttBuff(G, p);
          const baseAtk = Big(G.characters[p].atk);
          console.log("test");
          console.log(rawAttSkill.toNumber());
          console.log(buff._6.value);
          console.log(
            rawAttSkill.mul(buff._6.value).round(0, Big.roundDown).toNumber(),
          );

          G.characters[p].buff = [
            ...G.characters[p].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._6.duration,
              _0: {
                value:
                  buff._6?.base === true
                    ? baseAtk
                        .mul(buff._6.value)
                        .round(0, Big.roundDown)
                        .toNumber()
                    : rawAttSkill
                        .mul(buff._6.value)
                        .round(0, Big.roundDown)
                        .toNumber(),
                affectType: AffectType.RAW_ATK,
              },
            },
          ];
          break;
        }
        case Target.ALL_EXCEPT_SELF: {
          G.characters.forEach((_, index) => {
            if (!buff._6) {
              console.log("2.Wrong data 6");
              return;
            }
            const rawAttSkill = applyRawAttBuff(G, p);
            const baseAtk = Big(G.characters[p].atk);
            if (index !== p) {
              G.characters[index].buff = [
                ...G.characters[index].buff,
                {
                  id: `${buff.id}-buff`,
                  name: buff.name,
                  type: 0,
                  condition: Condition.NONE,
                  duration: buff._6.duration,
                  _0: {
                    value:
                      buff._6?.base === true
                        ? baseAtk
                            .mul(buff._6.value)
                            .round(0, Big.roundDown)
                            .toNumber()
                        : rawAttSkill
                            .mul(buff._6.value)
                            .round(0, Big.roundDown)
                            .toNumber(),
                    affectType: AffectType.RAW_ATK,
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
          G.characters.forEach((character, index) => {
            if (!buff._6) {
              console.log("2.Wrong data 6");
              return;
            }

            const rawAttSkill = applyRawAttBuff(G, p);
            const baseAtk = Big(G.characters[p].atk);
            if (character.class === buff._6?.target) {
              G.characters[index].buff = [
                ...G.characters[index].buff,
                {
                  id: `${buff.id}-buff`,
                  name: buff.name,
                  type: 0,
                  condition: Condition.NONE,
                  duration: buff._6.duration,
                  _0: {
                    value:
                      buff._6?.base === true
                        ? baseAtk
                            .mul(buff._6.value)
                            .round(0, Big.roundDown)
                            .toNumber()
                        : rawAttSkill
                            .mul(buff._6.value)
                            .round(0, Big.roundDown)
                            .toNumber(),
                    affectType: AffectType.RAW_ATK,
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
          const rawAttSkill = applyRawAttBuff(G, p);
          const baseAtk = Big(G.characters[p].atk);

          if (p === -1) {
            console.log("Target Parsing is Wrong!");
            break;
          }
          G.characters[buff._6.target].buff = [
            ...G.characters[buff._6.target].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._6.duration,
              _0: {
                value:
                  buff._6?.base === true
                    ? baseAtk
                        .mul(buff._6.value)
                        .round(0, Big.roundDown)
                        .toNumber()
                    : rawAttSkill
                        .mul(buff._6.value)
                        .round(0, Big.roundDown)
                        .toNumber(),
                affectType: AffectType.RAW_ATK,
              },
            },
          ];
          break;
        }

        case Target.ALL_LIGHT_EXCEPT_SELF: {
          break;
        }

        case Target.SPECIFIC_CHARACTER: {
          const rawAttSkill = applyRawAttBuff(G, p);
          const baseAtk = Big(G.characters[p].atk);
          const pos = G.characters.findIndex((character) => {
            return character.id === buff._6?.applyToSpecificChar;
          });

          if (pos === -1) {
            console.log("_6 Error: Could not find Character listed");
            break;
          }
          console.log("_6 Test", rawAttSkill);
          G.characters[pos].buff = [
            ...G.characters[pos].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._6.duration,
              _0: {
                value:
                  buff._6?.base === true
                    ? baseAtk
                        .mul(buff._6.value)
                        .round(0, Big.roundDown)
                        .toNumber()
                    : rawAttSkill
                        .mul(buff._6.value)
                        .round(0, Big.roundDown)
                        .toNumber(),
                affectType: AffectType.RAW_ATK,
              },
            },
          ];

          break;
        }

        default: {
          break;
        }
      }

      break;
    }
    case 7: {
      if (!buff._7) {
        console.log(`${buff.id} Wrong Data trigger 7`);
        break;
      }
      switch (buff._7.target) {
        case Target.ALL_EXCEPT_SELF: {
          G.characters.forEach((_, charIndex) => {
            if (charIndex !== p) {
              buff._7?.clearSkill.forEach((deleteBuffId) => {
                G.characters[charIndex].buff = G.characters[
                  charIndex
                ].buff.filter((x) => x.id !== deleteBuffId);
              });
            }
          });

          break;
        }

        case Target.SELF: {
          buff._7?.clearSkill.forEach((deleteBuffId) => {
            G.characters[p].buff = G.characters[p].buff.filter(
              (x) => x.id !== deleteBuffId,
            );
          });
          break;
        }
      }
      break;
    }

    case 8: {
      if (!buff._8) {
        console.log(buff.id);
        console.log("Wrong data 8");
        break;
      }
      if (!oG) {
        console.log("Can't find old state");
        break;
      }
      switch (buff._8.target) {
        case Target.SELF: {
          const skillStackNum = oG.characters[p].buff.find((x) => {
            return x.id === buff._8?.targetSkill;
          });

          if (!skillStackNum || !skillStackNum._3) {
            // Does not have this skill
            break;
          }
          for (let i = 0; i < skillStackNum._3.stack; i++) {
            trigger(G, oG, p, buff._8.triggerSkill, ca);
          }
          break;
        }
        //case Target.ENEMY_1:
        //case Target.ENEMY_2:
        //case Target.ENEMY_3:
        //case Target.ENEMY_4:
        //case Target.ENEMY_5: {
        //  const enemyIndex = buff._8.target - 20;
        //  const skillStackNum = G.enemies[enemyIndex].buff.find((x) => {
        //    return x.id === buff._8?.targetSkill;
        //  });
        //  if (!skillStackNum || !skillStackNum._3) {
        //    break;
        //  }
        //  for (let i = 0; i < skillStackNum._3.stack; i++) {
        //    triggerSkill(
        //      buff._8.triggerSkill,
        //      G,
        //      buff._8.target,
        //      oldState,
        //    );
        //  }
        //  break;
        //}
      }
      break;
    }
    case 9: {
      if (!buff._9) {
        console.log(buff.id);
        console.log("Wrong data 9");
        break;
      }
      switch (buff._9.damageType) {
        case DamageType.BASIC: {
          if (buff._9.target === Target.ALL_ALLIES) {
            basicHealAllAllies(G, oG, buff._9.value, p, ca);
          }
          break;
        }
        case DamageType.ULTIMATE: {
          break;
        }
        case DamageType.TRIGGER: {
          if (buff._9.target === Target.ALL_ALLIES) {
            ultHealAllAllies(G, oG, buff._9.value, p, true, false, ca);
          }
          if (buff._9.target === Target.LOWEST_HP) {
            const lowestHpIndex = lowestHp(G, G.characters);

            console.log("9 Lowest HP Index", lowestHpIndex);
            if (lowestHpIndex === -1) {
              break;
            }

            ultTriggerHeal(
              G,
              oG,
              buff._9.value,
              p,
              lowestHpIndex,
              true,
              false,
              ca,
            );
          }
          break;
        }
      }
      break;
    }
    case 10: {
      if (!buff._10) {
        console.log(buff.id);
        console.log("Wrong data 10");
        break;
      }
      const v = buff._10.value;
      const d = buff._10.duration;
      switch (buff._10.damageType) {
        case DamageType.BASIC: {
          break;
        }
        case DamageType.ULTIMATE: {
          break;
        }
        case DamageType.TRIGGER: {
          if (buff._10.target === Target.ALL_ALLIES) {
            triggerShieldAllAllies(G, oG, v, p, ca);
          }
          break;
        }
        case DamageType.TRIGGER_HP: {
          if (buff._10.target === Target.ALL_ALLIES) {
            ultHpShieldAllAllies(G, oG, v, p, true, false, ca, d);
          }
          break;
        }
      }
      break;
    }
    case 11: {
      if (!buff._11) {
        console.log(buff.id);
        console.log("Wrong data 11");
        break;
      }

      if (buff._11.overlap) {
        const buffIndex = G.characters[p].buff.findIndex(
          (x) => x.id === buff._11?.applySkill[0].id,
        );
        if (buffIndex !== -1) {
          console.log("Buff Index", buffIndex);
          const clone = [...G.characters[p].buff];
          clone.splice(buffIndex, 1);
          G.characters[p].buff = clone;
        }
      }

      switch (buff._11.target) {
        case Target.SELF: {
          G.characters[p].buff = [
            ...G.characters[p].buff,
            ...buff._11.applySkill,
          ];
          console.log(print(G.characters[p].buff));
          break;
        }
        case Target.ENEMY: {
          // If you use overlap then you can only use one apply buff
          //if (buff._11.overlap && buff._11.applySkill.length < 2) {
          //  G.enemies[G.targeting].buff = G.enemies[G.targeting].buff.filter(
          //    (buff) => buff.id !== buff._11?.applySkill[0].id,
          //  );
          //}
          G.enemies[G.targeting].buff = [
            ...G.enemies[G.targeting].buff,
            ...buff._11.applySkill,
          ];
          break;
        }

        case Target.ALL_ENEMIES: {
          G.enemies.forEach((_, index) => {
            if (!buff._11) {
              console.log("_11 Apply buff don't exist");
              return;
            }
            const clone = [...G.enemies[index].buff, ...buff._11.applySkill];
            console.log("11 All Enemies", clone);
            G.enemies[index].buff = clone;
          });
        }
        case Target.DARK_ENEMY: {
          G.enemies.forEach((enemy, index) => {
            if (enemy.attribute === CharacterAttribute.DARK) {
              if (!buff._11) {
                console.log("Wrong data 11");
                return;
              }
              G.enemies[index].buff = [
                ...G.enemies[index].buff,
                ...buff._11.applySkill,
              ];
            }
          });
          break;
        }
        case Target.ALL_ALLIES: {
          G.characters.forEach((_, index) => {
            if (!buff._11) {
              console.log("_11 Apply buff don't exist");
              return;
            }
            G.characters[index].buff = [
              ...G.characters[index].buff,
              ...buff._11.applySkill,
            ];
          });
          break;
        }

        case Target.ALL_EXCEPT_SELF: {
          G.characters.forEach((_, index) => {
            if (index !== p) {
              if (!buff._11) {
                console.log("_11 Apply buff don't exist");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._11.applySkill,
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
          G.characters.forEach((character, index) => {
            if (character.class === buff._11?.target) {
              if (!buff._11) {
                console.log("Wrong data 11");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._11?.applySkill,
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
          G.characters.forEach((character, index) => {
            //@ts-ignore
            if (character.attribute === buff._11?.target) {
              if (!buff._11) {
                console.log("Wrong data 11");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._11?.applySkill,
              ];
            }
          });
          break;
        }

        case Target.ALL_FIRE_EXCEPT_SELF:
        case Target.ALL_WATER_EXCEPT_SELF:
        case Target.ALL_DARK_EXCEPT_SELF:
        case Target.ALL_WIND_EXCEPT_SELF:
        case Target.ALL_LIGHT_EXCEPT_SELF: {
          G.characters.forEach((character, index) => {
            if (
              //@ts-ignore
              character.attribute === buff._11?.target - 20 &&
              index !== p
            ) {
              if (!buff._11) {
                console.log("Wrong data 11");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._11?.applySkill,
              ];
            }
          });
          break;
        }

        // NEED TO JUMP IF NO TARGET
        case Target.POSITION_1:
        case Target.POSITION_2:
        case Target.POSITION_3:
        case Target.POSITION_4:
        case Target.POSITION_5: {
          G.characters[buff._11.target].buff = [
            ...G.characters[buff._11.target].buff,
            ...buff._11.applySkill,
          ];
          break;
        }

        case Target.ALL_LIGHT_EXCEPT_SELF: {
          G.characters.forEach((character, index) => {
            if (
              index !== p &&
              character.attribute === CharacterAttribute.LIGHT
            ) {
              if (!buff._11) {
                console.log("_11 Apply buff don't exist");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._11.applySkill,
              ];
            }
          });
          break;
        }

        case Target.SPECIFIC_CHARACTER: {
          const pos = G.characters.findIndex((character) => {
            return character.id === buff._11?.applyToSpecificChar;
          });

          if (pos === -1) {
            console.log(
              `_11 Error: Can't find this specific character ${buff._11.applyToSpecificChar}`,
            );
            break;
          }
          G.characters[pos].buff = [
            ...G.characters[pos].buff,
            ...buff._11.applySkill,
          ];
          break;
        }

        case Target.LOWEST_HP: {
          const lowestHpIndex = lowestHp(G, G.characters);
          console.log("11 Lowest HP Index", lowestHpIndex);
          if (lowestHpIndex === -1) {
            break;
          }
          G.characters[lowestHpIndex].buff = [
            ...G.characters[lowestHpIndex].buff,
            ...buff._11.applySkill,
          ];
          break;
        }

        default:
          break;
      }
      break;
    }
    case 12: {
      if (!buff._12) {
        console.log("Wrong data 12");
        break;
      }
      switch (buff._12.target) {
        case Target.ALL_ALLIES: {
          rawHotAll(G, p, buff._12.value, buff.id, buff._12.duration);
          break;
        }
      }

      break;
    }
    case 13: {
      if (!buff._13) {
        console.log("Wrong data 13");
        break;
      }
      G.characters.forEach((character, index) => {
        if (character.id === buff._13?.target) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            ...buff._13.applySkill,
          ];
        }
      });
      break;
    }
    case 14: {
      if (!buff._14) {
        console.log("Wrong data 14");
        break;
      }
      switch (buff._14.target) {
        case Target.SELF:
          G.characters[p].cd -= buff._14.reduceCD;
          if (G.characters[p].cd < 0) {
            G.characters[p].cd = 0;
          }
          break;

        case Target.ALL_EXCEPT_SELF:
          G.characters.forEach((_, index) => {
            if (!buff._14) {
              console.log("Wrong data 14");
              return;
            }
            if (p !== index) {
              G.characters[index].cd -= buff._14.reduceCD;
              if (G.characters[index].cd < 0) {
                G.characters[index].cd = 0;
              }
            }
          });
          break;
        case Target.ALL_ALLIES:
          G.characters.forEach((_, index) => {
            if (!buff._14) {
              console.log("Wrong data 14");
              return;
            }
            G.characters[index].cd -= buff._14.reduceCD;
            if (G.characters[index].cd < 0) {
              G.characters[index].cd = 0;
            }
          });
          break;
        case Target.ATTACKER:
          G.characters.forEach((character, index) => {
            if (character.class === CharacterClass.ATTACKER) {
              if (!buff._14) {
                console.log("Wrong data 14");
                return;
              }
              G.characters[index].cd -= buff._14.reduceCD;
              if (G.characters[index].cd < 0) {
                G.characters[index].cd = 0;
              }
            }
          });
          break;
        case Target.OBSTRUCTER:
          G.characters.forEach((character, index) => {
            if (character.class === CharacterClass.OBSTRUCTER) {
              if (!buff._14) {
                console.log("Wrong data 14");
                return;
              }
              G.characters[index].cd -= buff._14.reduceCD;
              if (G.characters[index].cd < 0) {
                G.characters[index].cd = 0;
              }
            }
          });
          break;
        case Target.PROTECTOR:
          G.characters.forEach((character, index) => {
            if (character.class === CharacterClass.PROTECTOR) {
              if (!buff._14) {
                console.log("Wrong data 14");
                return;
              }
              G.characters[index].cd -= buff._14.reduceCD;
              if (G.characters[index].cd < 0) {
                G.characters[index].cd = 0;
              }
            }
          });

          break;
        case Target.SUPPORT:
          G.characters.forEach((character, index) => {
            if (character.class === CharacterClass.SUPPORT) {
              if (!buff._14) {
                console.log("Wrong data 14");
                return;
              }
              G.characters[index].cd -= buff._14.reduceCD;
              if (G.characters[index].cd < 0) {
                G.characters[index].cd = 0;
              }
            }
          });
          break;
        case Target.HEALER:
          G.characters.forEach((character, index) => {
            if (character.class === CharacterClass.HEALER) {
              if (!buff._14) {
                console.log("Wrong data 14");
                return;
              }
              G.characters[index].cd -= buff._14.reduceCD;
              if (G.characters[index].cd < 0) {
                G.characters[index].cd = 0;
              }
            }
          });
          break;
      }
      break;
    }

    case 15: {
      if (!buff._15) {
        console.log("Wrong data 15");
        break;
      }
      console.log("15", buff._15.position);

      // TODO random apply if no target
      G.characters[buff._15.position].cd =
        G.characters[buff._15.position].cd - buff._15.reduceCD;
      if (G.characters[buff._15.position].cd < 0) {
        G.characters[buff._15.position].cd = 0;
      }
      break;
    }
    case 16: {
      if (!buff._16) {
        console.log("Wrong data 6");
        break;
      }
      switch (buff._16.target) {
        case Target.ALL_ALLIES: {
          G.characters.forEach((_, index) => {
            if (!buff._16) {
              console.log("2.Wrong data 16");
              return;
            }

            const rawAttSkill = applyRawAttBuff(G, p)
              .round(0, Big.roundDown)
              .toNumber();

            const baseAtk = G.characters[p].atk;
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: `${buff.id}-heal`,
                name: buff.name,
                type: 0,
                condition: Condition.NONE,
                duration: buff._16.duration,
                _0: {
                  value:
                    buff._16?.base === true
                      ? Big(baseAtk)
                          .mul(buff._16.value)
                          .round(0, Big.roundDown)
                          .toNumber()
                      : Big(rawAttSkill)
                          .mul(buff._16.value)
                          .mul(buff._16.value)
                          .round(0, Big.roundDown)
                          .toNumber(),
                  affectType: AffectType.RAW_HEAL_OVER_TIME,
                },
              },
            ];
          });

          break;
        }
        case Target.SELF: {
          const rawAttSkill = applyRawAttBuff(G, p).toNumber();
          const baseAtk = G.characters[p].atk;
          G.characters[p].buff = [
            ...G.characters[p].buff,
            {
              id: `${buff.id}-heal`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._16.duration,
              _0: {
                value:
                  buff._16?.base === true
                    ? Big(baseAtk)
                        .mul(buff._16.value)
                        .round(0, Big.roundDown)
                        .toNumber()
                    : Big(rawAttSkill)
                        .mul(buff._16.value)
                        .mul(buff._16.value)
                        .round(0, Big.roundDown)
                        .toNumber(),
                affectType: AffectType.RAW_HEAL_OVER_TIME,
              },
            },
          ];
          break;
        }
        case Target.ALL_EXCEPT_SELF: {
          G.characters.forEach((_, index) => {
            if (!buff._16) {
              console.log("2.Wrong data 16");
              return;
            }
            const rawAttSkill = applyRawAttBuff(G, p).toNumber();
            const baseAtk = G.characters[p].atk;
            if (index !== p) {
              G.characters[index].buff = [
                ...G.characters[index].buff,
                {
                  id: `${buff.id}-heal`,
                  name: buff.name,
                  type: 0,
                  condition: Condition.NONE,
                  duration: buff._16.duration,
                  _0: {
                    value:
                      buff._16?.base === true
                        ? Big(baseAtk)
                            .mul(buff._16.value)
                            .round(0, Big.roundDown)
                            .toNumber()
                        : Big(rawAttSkill)
                            .mul(buff._16.value)
                            .mul(buff._16.value)
                            .round(0, Big.roundDown)
                            .toNumber(),
                    affectType: AffectType.RAW_HEAL_OVER_TIME,
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
          G.characters.forEach((character, index) => {
            if (!buff._16) {
              console.log("2.Wrong data 16");
              return;
            }

            const rawAttSkill = applyRawAttBuff(G, p).toNumber();
            const baseAtk = G.characters[p].atk;
            if (character.class === buff._16?.target) {
              G.characters[index].buff = [
                ...G.characters[index].buff,
                {
                  id: `${buff.id}-buff`,
                  name: buff.name,
                  type: 0,
                  condition: Condition.NONE,
                  duration: buff._16.duration,
                  _0: {
                    value:
                      buff._16?.base === true
                        ? Big(baseAtk)
                            .mul(buff._16.value)
                            .round(0, Big.roundDown)
                            .toNumber()
                        : Big(rawAttSkill)
                            .mul(buff._16.value)
                            .mul(buff._16.value)
                            .round(0, Big.roundDown)
                            .toNumber(),
                    affectType: AffectType.RAW_HEAL_OVER_TIME,
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
          const rawAttSkill = applyRawAttBuff(G, p).toNumber();
          const baseAtk = G.characters[p].atk;

          if (p === -1) {
            console.log("Target Parsing is Wrong!");
            break;
          }
          G.characters[buff._16.target].buff = [
            ...G.characters[buff._16.target].buff,
            {
              id: `${buff.id}-heal`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._16.duration,
              _0: {
                value:
                  buff._16?.base === true
                    ? Big(baseAtk)
                        .mul(buff._16.value)
                        .round(0, Big.roundDown)
                        .toNumber()
                    : Big(rawAttSkill)
                        .mul(buff._16.value)
                        .mul(buff._16.value)
                        .round(0, Big.roundDown)
                        .toNumber(),
                affectType: AffectType.RAW_HEAL_OVER_TIME,
              },
            },
          ];
          break;
        }

        case Target.ALL_LIGHT_EXCEPT_SELF: {
          break;
        }

        case Target.SPECIFIC_CHARACTER: {
          const rawAttSkill = applyRawAttBuff(G, p).toNumber();
          const baseAtk = G.characters[p].atk;
          const pos = G.characters.findIndex((character) => {
            return character.id === buff._16?.applyToSpecificChar;
          });

          if (pos === -1) {
            console.log("_16 Error: Could not find Character listed");
            break;
          }
          G.characters[pos].buff = [
            ...G.characters[pos].buff,
            {
              id: `${buff.id}-heal`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._16.duration,
              _0: {
                value:
                  buff._16?.base === true
                    ? Big(baseAtk)
                        .mul(buff._16.value)
                        .round(0, Big.roundDown)
                        .toNumber()
                    : Big(rawAttSkill)
                        .mul(buff._16.value)
                        .mul(buff._16.value)
                        .round(0, Big.roundDown)
                        .toNumber(),
                affectType: AffectType.RAW_HEAL_OVER_TIME,
              },
            },
          ];
          break;
        }
        default: {
          break;
        }
      }
      break;
    }

    case 17:
      console.log("trigger 17");
      // TODO remove Math floor
      if (!buff._17) {
        console.log("Wrong data 17");
        break;
      }
      console.log("trigger 17");
      switch (buff._17.target) {
        case Target.ALL_ALLIES: {
          const hp = G.characters[p].maxHp;
          G.characters.forEach((_, index) => {
            if (!buff._17) {
              return;
            }
            G.characters[index].buff = [
              ...G.characters[index].buff,
              {
                id: `${buff.id}-buff`,
                name: buff.name,
                type: 0,
                condition: Condition.NONE,
                duration: buff._17?.duration,
                _0: {
                  value: Math.floor(hp * buff._17.value),
                  affectType: AffectType.RAW_ATK,
                },
              },
            ];
          });
          break;
        }
      }
      break;
    case 20: {
      if (!buff._20) {
        console.log("Wrong data 20");
        break;
      }

      switch (buff._20.target) {
        case Target.ENEMY: {
          const charIndex = G.enemies.findIndex((x) => {
            return x.id === buff._20?.targetChar;
          });

          if (charIndex === -1) {
            console.log("Enemy not found, 20 error");
            break;
          }
          if (buff._20.clearAll) {
            const buffIndex = G.enemies[charIndex].buff.findIndex(
              (x) => x.id === buff._20?.targetSkill,
            );
            if (!buffIndex || buffIndex == -1) {
              break;
            }
            const clone = [...G.enemies[charIndex].buff];
            clone.splice(buffIndex, 1);
            G.enemies[charIndex].buff = clone;
          }

          if (buff._20.clearStack && buff._20.clearStack > 0) {
            const buffIndex = G.enemies[charIndex].buff.findIndex(
              (x) => x.id === buff._20?.targetSkill,
            );
            if (!buffIndex || buffIndex == -1) {
              break;
            }
            G.enemies[charIndex].buff.map((x) => {
              if (x.id === buff._20?.targetSkill) {
                if (x._3 && x._3.stack && x._3.stack > 0) {
                  if (buff._20.clearStack && buff._20.clearStack > 0) {
                    x._3.stack -= buff._20?.clearStack;
                    if (x._3.stack === 0) {
                      return;
                    }
                  }
                }
              }
              return x;
            });
          }
          break;
        }
        case Target.ALL_ALLIES: {
          const charIndex = G.characters.findIndex((x) => {
            return x.id === buff._20?.targetChar;
          });

          if (charIndex === -1) {
            console.log("Character not found, 20 error");
            break;
          }
          if (buff._20.clearAll) {
            const buffIndex = G.characters[charIndex].buff.findIndex(
              (x) => x.id === buff._20?.targetSkill,
            );
            if (!buffIndex || buffIndex == -1) {
              break;
            }
            const clone = [...G.characters[charIndex].buff];
            clone.splice(buffIndex, 1);
            G.characters[p].buff = clone;
          }

          if (buff._20.clearStack && buff._20.clearStack > 0) {
            const buffIndex = G.characters[charIndex].buff.findIndex(
              (x) => x.id === buff._20?.targetSkill,
            );
            if (!buffIndex || buffIndex == -1) {
              break;
            }
            G.characters[charIndex].buff.map((x) => {
              if (x.id === buff._20?.targetSkill) {
                if (x._3 && x._3.stack && x._3.stack > 0) {
                  if (buff._20.clearStack && buff._20.clearStack > 0) {
                    x._3.stack -= buff._20?.clearStack;
                    if (x._3.stack === 0) {
                      return;
                    }
                  }
                }
              }
              return x;
            });
          }
          break;
        }
        default:
          break;
      }

      break;
    }

    case 21: {
      if (!buff._21) {
        console.log("Wrong data 21");
        break;
      }
      buff._21.trigger.forEach((b) => {
        trigger(G, oG, p, b, ca);
      });
      break;
    }

    case 28: {
      if (!buff._28) {
        console.log("Wrong data 28");
        break;
      }
      damageOverTime(
        p,
        buff._28.value,
        G,
        G,
        buff._28.target,
        buff._28.duration,
        buff.id,
        buff._28.overlap,
      );
      break;
    }

    case 30: {
      if (!buff._30) {
        console.log("Wrong data _30");
        break;
      }

      switch (buff._30.target) {
        case Target.SELF: {
          // x is gameState buff
          const isExist = G.characters[p].buff.some((x) => {
            return x.id === buff._30?.targetSkill;
          });

          if (isExist) {
            G.characters[p].buff = G.characters[p].buff
              .map((x) => {
                if (x.id === buff._30?.targetSkill) {
                  if (x._3 && x._3.stack > 0) {
                    if (x._3 && buff._30) {
                      x._3.stack -= buff._30.reduceStack;
                      if (x._3.stack < 0 || x._3.stack === 0) {
                        return;
                      }
                    } else {
                      console.log("Wrong data buff._4");
                    }
                  }
                }
                return x;
              })
              .filter((item) => item !== undefined);
          }
          break;
        }
      }
      break;
    }
  }

  if (buff.deleteSelf) {
    const buffIndex = G.characters[p].buff.findIndex((x) => x.id === buff.id);
    if (buffIndex === -1) {
      console.log("Skill not found, delete self error");
      return;
    }
    const clone = [...G.characters[p].buff];
    clone.splice(buffIndex, 1);
    G.characters[p].buff = clone;
  }
}
