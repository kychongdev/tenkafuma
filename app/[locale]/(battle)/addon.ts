import { GameState } from "./GameState";
import { CharacterAction, CharacterAttribute } from "./types/Character";
import {
  AffectType,
  DamageType,
  Skill,
  SpecialCondition,
  Target,
} from "./types/Skill";
import {
  basicHpToSelf,
  basicToSelf,
  basicToSpecificPos,
  basicToTargeting,
  ultHpToSelf,
  ultToSelf,
  ultToTargeting,
} from "./applyDamage";
import { checkSpecialCondition } from "./condition";
import { basicHealAllAllies } from "./applyHeal";
import { lowestHp } from "./utils";

export function addOn(
  G: GameState,
  oG: GameState,
  p: number,
  buff: Skill,
  ca: CharacterAction,
) {
  if (buff.specialCondition === SpecialCondition.SKILL_STACK_MORE_THAN) {
    if (!buff.specialConditionValue) {
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
    case 101: {
      // 傷害
      if (!buff._101) {
        console.log("Wrong data");
        break;
      }

      const d = buff._101.defender;
      const dt = buff._101.damageType;
      const v = buff._101.value;
      const isTrueDamage = buff._101.isTrueDamage;

      //defender: Target.ENEMY,
      //damageType: DamageType.BASIC_ADDON,
      switch (buff._101.damageType) {
        //defender: Target.ENEMY,
        //damageType: DamageType.BASIC_ADDON,
        case DamageType.BASIC_ADDON: {
          if (d === Target.ENEMY) {
            if (buff._101.multiple && buff._101.multipleValue) {
              for (let i = buff._101.multipleValue; i > 0; i--) {
                basicToTargeting(G, oG, v, p, d, isTrueDamage, dt, ca);
              }
            } else {
              basicToTargeting(G, oG, v, p, d, isTrueDamage, dt, ca);
            }
          } else {
            basicToSpecificPos(G, oG, v, p, d, isTrueDamage, dt, ca);
          }
          break;
        }
        case DamageType.BASIC_HP: {
          if (d === Target.SELF) {
            basicHpToSelf(G, oG, v, p, isTrueDamage, dt, ca);
            G.receivedAttack = [
              ...G.receivedAttack,
              {
                attacker: p,
                defender: p,
              },
            ];
          }
          break;
        }
        case DamageType.ULTIMATE: {
          if (d === Target.ENEMY) {
            ultToTargeting(G, oG, v, p, d, isTrueDamage, false, dt, ca);
          }
          break;
        }
        case DamageType.ULTIMATE_HP: {
          if (d === Target.SELF) {
            ultHpToSelf(G, oG, v, p, isTrueDamage, false, dt, ca);
            G.receivedAttack = [
              ...G.receivedAttack,
              {
                attacker: p,
                defender: p,
              },
            ];
          }
          break;
        }

        //defender: Target.ENEMY,
        //damageType: DamageType.ULTIMATE_ADDON,
        case DamageType.ULTIMATE_ADDON: {
          if (d === Target.ENEMY) {
            ultToTargeting(G, oG, v, p, d, isTrueDamage, false, dt, ca);
          }
          if (d === Target.SELF) {
            ultToSelf(G, oG, v, p, isTrueDamage, false, dt, ca);
            G.receivedAttack = [
              ...G.receivedAttack,
              {
                attacker: p,
                defender: p,
              },
            ];
          }
          break;
        }
      }
      break;
    }
    case 104: {
      // 增加層次型狀態
      // 如果沒有就會贈與初始層次
      // Increase stack buff,if don't exist then it will apply
      if (!buff._104) {
        console.log("Wrong data");
        break;
      }

      switch (buff._104.target) {
        case Target.SELF: {
          // x is G buff
          const isExist = G.characters[p].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });

          if (isExist) {
            G.characters[p].buff.map((x) => {
              if (x.id === buff._104?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._104) {
                    x._3.stack += buff._104.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._104");
                  }
                }
              }
              return x;
            });
          } else {
            // purely typescript problem
            if (buff._104?.applySkill) {
              G.characters[p].buff = [
                ...G.characters[p].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
            }
          }
          break;
        }
        case Target.SPECIFIC_CHARACTER: {
          const char = G.characters.findIndex((character) => {
            return character.id === buff._104?.applyToSpecificChar;
          });
          if (char === -1) {
            break;
          }

          const isExist = G.characters[char].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });

          if (isExist) {
            G.characters[char].buff.map((x) => {
              if (x.id === buff._104?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._104) {
                    x._3.stack += buff._104.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._104");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._104?.applySkill) {
              G.characters[char].buff = [
                ...G.characters[char].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
            }
          }
          break;
        }

        case Target.ALL_ALLIES: {
          G.characters.forEach((_, index) => {
            const isExist = G.characters[index].buff.some((x) => {
              return x.id === buff._104?.targetSkill;
            });
            const charBuff = checkSpecialCondition(G, oG, index);
            const isHealImmune = charBuff.some((x) => {
              return (
                x._0?.affectType === AffectType.IMMUNE_DECREASE_HEAL_RECEIVED
              );
            });
            if (
              isHealImmune &&
              buff._104 &&
              buff._104.applySkill &&
              buff._104.applySkill._3 &&
              buff._104?.applySkill._3.affectType ===
                AffectType.DECREASE_HEAL_RECEIVED
            ) {
              return;
            }

            if (isExist) {
              G.characters[index].buff = G.characters[index].buff.map((x) => {
                if (x.id === buff._104?.targetSkill) {
                  if (x._3 && x._3.stack < x._3.maxStack) {
                    if (x._3 && buff._104) {
                      if (x._3.stack > x._3.maxStack) {
                        x._3.stack = x._3.maxStack;
                      }
                      const clone = {
                        ...x,
                        _3: {
                          ...x._3,
                          stack: x._3.stack + buff._104.increaseStack,
                        },
                      };
                      return clone;
                    } else {
                      console.log("Wrong data buff._104");
                    }
                  }
                }
                return x;
              });
            } else {
              // purely typescript problem
              if (buff._104?.applySkill) {
                G.characters[index].buff = [
                  ...G.characters[index].buff,
                  buff._104.applySkill,
                ];
              } else {
                console.log("Wrong data buff._104.applySkill");
              }
            }
          });
          break;
        }
        case Target.ENEMY: {
          const isExist = G.enemies[G.targeting].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });
          if (isExist) {
            G.enemies[G.targeting].buff.map((x) => {
              if (x.id === buff._104?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._104) {
                    x._3.stack += buff._104.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._104");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._104?.applySkill) {
              G.enemies[G.targeting].buff = [
                ...G.enemies[G.targeting].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
            }
          }
          break;
        }
        case Target.ALL_ENEMIES: {
          console.log("trigger all enemy");
          G.enemies.forEach((_, index) => {
            const isExist = G.enemies[index].buff.some((x) => {
              return x.id === buff._104?.targetSkill;
            });

            console.log("trigger all enemy", isExist);
            if (isExist) {
              G.enemies[index].buff = G.enemies[index].buff.map((x) => {
                if (x.id === buff._104?.targetSkill) {
                  if (x._3 && x._3.stack < x._3.maxStack) {
                    if (x._3 && buff._104) {
                      if (x._3.stack > x._3.maxStack) {
                        x._3.stack = x._3.maxStack;
                      }
                      const clone = {
                        ...x,
                        _3: {
                          ...x._3,
                          stack: x._3.stack + buff._104.increaseStack,
                        },
                      };
                      return clone;
                    } else {
                      console.log("Wrong data buff._104");
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

              if (buff._104?.applySkill) {
                G.enemies[index].buff = [
                  ...G.enemies[index].buff,
                  buff._104.applySkill,
                ];
                console.log("give original buff", G.enemies[index].buff);
              } else {
                console.log("Wrong data buff._104.applySkill");
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
          const pos = buff._104.target;
          const isExist = G.characters[pos].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });
          if (isExist) {
            G.characters[pos].buff.map((x) => {
              if (x.id === buff._104?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._104) {
                    x._3.stack += buff._104.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._104");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._104?.applySkill) {
              G.characters[pos].buff = [
                ...G.characters[pos].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
            }
          }
        }

        case Target.FIRE:
        case Target.LIGHT:
        case Target.DARK:
        case Target.WIND:
        case Target.WATER: {
          const attribute = buff._104.target;
          G.characters.forEach((character, index) => {
            //@ts-ignore
            if (character.attribute === attribute) {
              const isExist = G.characters[index].buff.some((x) => {
                return x.id === buff._104?.targetSkill;
              });

              if (isExist) {
                G.characters[index].buff.map((x) => {
                  if (x.id === buff._104?.targetSkill) {
                    if (x._3 && x._3.stack < x._3.maxStack) {
                      if (x._3 && buff._104) {
                        x._3.stack += buff._104.increaseStack;
                        if (x._3.stack > x._3.maxStack) {
                          x._3.stack = x._3.maxStack;
                        }
                      } else {
                        console.log("Wrong data buff._104");
                      }
                    }
                  }
                  return x;
                });
              } else {
                if (buff._104?.applySkill) {
                  G.characters[index].buff = [
                    ...G.characters[index].buff,
                    buff._104.applySkill,
                  ];
                } else {
                  console.log("Wrong data buff._104.applySkill");
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
          const target = buff._104.target - 20;
          const isExist = G.enemies[target].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });
          if (isExist) {
            G.enemies[target].buff.map((x) => {
              if (x.id === buff._104?.targetSkill) {
                if (x._3 && x._3.stack < x._3.maxStack) {
                  if (x._3 && buff._104) {
                    x._3.stack += buff._104.increaseStack;
                    if (x._3.stack > x._3.maxStack) {
                      x._3.stack = x._3.maxStack;
                    }
                  } else {
                    console.log("Wrong data buff._104");
                  }
                }
              }
              return x;
            });
          } else {
            if (buff._104?.applySkill) {
              G.enemies[target].buff = [
                ...G.enemies[target].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
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

    case 105: {
      if (!buff._105) {
        console.log(buff.id);
        console.log("Wrong data 5");
        break;
      }

      switch (buff._105.damageType) {
        case DamageType.BASIC: {
          if (buff._105.target === Target.ALL_ALLIES) {
            basicHealAllAllies(G, oG, buff._105.value, p, ca);
          }
          break;
        }
        case DamageType.ULTIMATE: {
          break;
        }
        case DamageType.TRIGGER: {
          break;
        }
        case DamageType.TRIGGER_HP: {
          // TODO susan need
        }
      }
      break;
    }
    case 111: {
      if (!buff._111) {
        console.log(buff.id);
        console.log("Wrong data 111");
        break;
      }

      if (buff._111.overlap) {
        const buffIndex = G.characters[p].buff.findIndex(
          (x) => x.id === buff._111?.applySkill[0].id,
        );
        if (buffIndex !== -1) {
          console.log("Buff Index", buffIndex);
          const clone = [...G.characters[p].buff];
          clone.splice(buffIndex, 1);
          G.characters[p].buff = clone;
        }
      }

      switch (buff._111.target) {
        case Target.SELF: {
          G.characters[p].buff = [
            ...G.characters[p].buff,
            ...buff._111.applySkill,
          ];
          break;
        }
        case Target.ENEMY: {
          // If you use overlap then you can only use one apply buff
          //if (buff._111.overlap && buff._11.applySkill.length < 2) {
          //  G.enemies[G.targeting].buff = G.enemies[G.targeting].buff.filter(
          //    (buff) => buff.id !== buff._111?.applySkill[0].id,
          //  );
          //}
          G.enemies[G.targeting].buff = [
            ...G.enemies[G.targeting].buff,
            ...buff._111.applySkill,
          ];
          break;
        }

        case Target.ALL_ENEMIES: {
          G.enemies.forEach((_, index) => {
            if (!buff._111) {
              console.log("_111 Apply buff don't exist");
              return;
            }
            G.enemies[index].buff = [
              ...G.enemies[index].buff,
              ...buff._111.applySkill,
            ];
          });
        }
        case Target.DARK_ENEMY: {
          G.enemies.forEach((enemy, index) => {
            if (enemy.attribute === CharacterAttribute.DARK) {
              if (!buff._111) {
                console.log("Wrong data 111");
                return;
              }
              G.enemies[index].buff = [
                ...G.enemies[index].buff,
                ...buff._111.applySkill,
              ];
            }
          });
          break;
        }
        case Target.ALL_ALLIES: {
          G.characters.forEach((_, index) => {
            if (!buff._111) {
              console.log("_111 Apply buff don't exist");
              return;
            }
            G.characters[index].buff = [
              ...G.characters[index].buff,
              ...buff._111.applySkill,
            ];
          });
          break;
        }

        case Target.ALL_EXCEPT_SELF: {
          G.characters.forEach((_, index) => {
            if (index !== p) {
              if (!buff._111) {
                console.log("_111 Apply buff don't exist");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._111.applySkill,
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
            if (character.class === buff._111?.target) {
              if (!buff._111) {
                console.log("Wrong data 111");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._111?.applySkill,
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
            if (character.attribute === buff._111?.target) {
              if (!buff._111) {
                console.log("Wrong data 111");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._111?.applySkill,
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
              character.attribute === buff._111?.target - 20 &&
              index !== p
            ) {
              if (!buff._111) {
                console.log("Wrong data 111");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._111?.applySkill,
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
          G.characters[buff._111.target].buff = [
            ...G.characters[buff._111.target].buff,
            ...buff._111.applySkill,
          ];
          break;
        }

        case Target.ALL_LIGHT_EXCEPT_SELF: {
          G.characters.forEach((character, index) => {
            if (
              index !== p &&
              character.attribute === CharacterAttribute.LIGHT
            ) {
              if (!buff._111) {
                console.log("_111 Apply buff don't exist");
                return;
              }
              G.characters[index].buff = [
                ...G.characters[index].buff,
                ...buff._111.applySkill,
              ];
            }
          });
          break;
        }

        case Target.SPECIFIC_CHARACTER: {
          const pos = G.characters.findIndex((character) => {
            return character.id === buff._111?.applyToSpecificChar;
          });

          if (pos === -1) {
            console.log(
              `_111 Error: Can't find this specific character ${buff._111.applyToSpecificChar}`,
            );
            break;
          }
          G.characters[pos].buff = [
            ...G.characters[pos].buff,
            ...buff._111.applySkill,
          ];
          break;
        }

        case Target.LOWEST_HP: {
          const lowestHpIndex = lowestHp(G, G.characters);
          console.log("111 Lowest HP Index", lowestHpIndex);
          if (lowestHpIndex === -1) {
            break;
          }
          G.characters[lowestHpIndex].buff = [
            ...G.characters[lowestHpIndex].buff,
            ...buff._111.applySkill,
          ];
          break;
        }

        default:
          break;
      }
      break;
    }

    case 113: {
      if (!buff._113) {
        console.log("Wrong data 13");
        break;
      }
      G.characters.forEach((character, index) => {
        if (character.id === buff._113?.target) {
          G.characters[index].buff = [
            ...G.characters[index].buff,
            ...buff._113.applySkill,
          ];
        }
      });
      break;
    }
  }
}
