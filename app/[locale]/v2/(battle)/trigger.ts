import { applyDamage, applyDamageTrigger, checkOpponent } from "./applyDamage";
import { basicDamage } from "./calculations/basicDamage";
import { ultDamage } from "./calculations/ultDamage";
import { checkSpecialCondition } from "./condition";
import { GameState } from "./GameState";
import { CharacterAction } from "./types/Character";
import {
  AffectType,
  Condition,
  DamageType,
  Skill,
  Target,
} from "./types/Skill";
import { checkAvailable, checkAvailablepos } from "./utils";

export function trigger(
  G: GameState,
  oG: GameState,
  p: number,
  buff: Skill,
  ca: CharacterAction,
) {
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

      const d = buff._1.defender;
      const dt = buff._1.damageType;

      switch (buff._1.damageType) {
        case DamageType.BASIC: {
          const opponent = checkOpponent(oG, d);
          if (buff._1.multiple) {
            if (!buff._1.multipleValue) {
              console.log("Missing Multiple Value");
              break;
            }
            for (let i = 0; i < buff._1.multipleValue; i++) {
              const checkAgain = checkAvailablepos(G, opponent);
              if (checkAgain === -1) {
                break;
              }
              const dmg = basicDamage(G, oG, buff._1.value, p, d, false);
              applyDamageTrigger(G, oG, dmg, p, d, false, dt, ca);
            }
          } else {
            const checkAgain = checkAvailablepos(G, opponent);
            if (checkAgain === -1) {
              break;
            }
            const dmg = basicDamage(G, oG, buff._1.value, p, d, false);
            applyDamageTrigger(G, oG, dmg, p, d, false, dt, ca);
          }
        }
        case DamageType.ULTIMATE: {
          break;
        }
        case DamageType.TRIGGER: {
          const opponent = checkOpponent(oG, d);
          if (buff._1.multiple) {
            if (!buff._1.multipleValue) {
              console.log("Missing Multiple Value");
              break;
            }
            for (let i = 0; i < buff._1.multipleValue; i++) {
              console.log(opponent);
              const checkAgain = checkAvailablepos(G, opponent);
              if (checkAgain === -1) {
                break;
              }
              const dmg = ultDamage(G, oG, buff._1.value, p, d, true, false);
              applyDamageTrigger(G, oG, dmg, p, d, false, dt, ca);
            }
          } else {
            const checkAgain = checkAvailablepos(G, opponent);
            if (checkAgain === -1) {
              break;
            }
            const dmg = ultDamage(G, oG, buff._1.value, p, d, true, false);
            applyDamageTrigger(G, oG, dmg, p, d, false, dt, ca);
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
          G.enemies.forEach((_, index) => {
            const isExist = G.enemies[index].buff.some((x) => {
              return x.id === buff._4?.targetSkill;
            });

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
              if (buff._4?.applySkill) {
                G.enemies[index].buff = [
                  ...G.enemies[index].buff,
                  buff._4.applySkill,
                ];
              } else {
                console.log("Wrong data buff._4.applySkill");
              }
            }
          });
          break;
        }
        case Target.pos_1:
        case Target.pos_2:
        case Target.pos_3:
        case Target.pos_4:
        case Target.pos_5: {
          const pos = parseTargetToNum(buff._4.target);
          if (pos === -1) {
            console.log(buff.id);
            console.log("Wrong data buff._4.target");
            break;
          }
          // x is G buff
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
            // purely typescript problem
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

            const rawAttSkill = applyRawAttBuff(G, pos);
            const baseAtk = G.characters[pos].atk;
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
                      ? Math.floor(baseAtk * buff._6.value)
                      : Math.floor(rawAttSkill * buff._6.value),
                  affectType: buff._6?.affectType,
                },
              },
            ];
          });

          break;
        }
        case Target.SELF: {
          const rawAttSkill = applyRawAttBuff(G, pos);
          const baseAtk = G.characters[pos].atk;
          console.log("test");
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
                    ? Math.floor(baseAtk * buff._6.value)
                    : Math.floor(rawAttSkill * buff._6.value),
                affectType: buff._6?.affectType,
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
            const rawAttSkill = applyRawAttBuff(G, pos);
            const baseAtk = G.characters[pos].atk;
            if (index !== pos) {
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
                        ? Math.floor(baseAtk * buff._6.value)
                        : Math.floor(rawAttSkill * buff._6.value),
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
          G.characters.forEach((character, index) => {
            if (!buff._6) {
              console.log("2.Wrong data 6");
              return;
            }

            const rawAttSkill = applyRawAttBuff(G, pos);
            const baseAtk = G.characters[pos].atk;
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
                        ? Math.floor(baseAtk * buff._6.value)
                        : Math.floor(rawAttSkill * buff._6.value),
                    affectType: buff._6?.affectType,
                  },
                },
              ];
            }
          });
          break;
        }
        case Target.pos_1:
        case Target.pos_2:
        case Target.pos_3:
        case Target.pos_4:
        case Target.pos_5: {
          const rawAttSkill = applyRawAttBuff(G, pos);
          const baseAtk = G.characters[pos].atk;
          const pos = parseTargetToNum(buff._6.target);

          if (pos === -1) {
            console.log("Target Parsing is Wrong!");
            break;
          }
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
                    ? Math.floor(baseAtk * buff._6.value)
                    : Math.floor(rawAttSkill * buff._6.value),
                affectType: buff._6?.affectType,
              },
            },
          ];
          break;
        }

        case Target.ALL_LIGHT_EXCEPT_SELF: {
          break;
        }

        case Target.SPECIFIC_CHARACTER: {
          const rawAttSkill = applyRawAttBuff(G, pos);
          const baseAtk = G.characters[pos].atk;
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
                    ? Math.floor(baseAtk * buff._6.value)
                    : Math.floor(rawAttSkill * buff._6.value),
                affectType: buff._6?.affectType,
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
  }
}
