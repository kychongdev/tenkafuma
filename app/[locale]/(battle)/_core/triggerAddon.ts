import { Condition, DamageType, Skill, Target } from "@/types/Skill";
import { CharacterAttribute, CharacterClass } from "@/types/Character";
import { GameState } from "./GameState";
import { applyRawAttBuff } from "./applyRawAtk";
import { dealBasicDamage } from "./dealBasicDamage";
import { dealUltDamage } from "./dealUltDamage";
import { parseCondition } from "./parseCondition";
import { dealBasicHpDamage } from "./dealBasicHpDamage";
import { dealUltHpDamage } from "./dealUltHpDamage";
import { parseTargetToNum } from "./utils";

export function parseConditionAddon(
  position: number,
  condition: Condition[],
  state: GameState,
  oldState: GameState,
) {
  const b = state.characters[position].buff;
  condition.forEach((c) => {
    if (position >= 0 && position < 5 && !state.characters[position].isDead) {
      for (const char of b) {
        if (char.deactivated) continue;
        if (c === char.condition) {
          triggerAddOn(char, state, position, oldState);
        }
      }
    }
    for (const enemy of state.enemies) {
      if (enemy.isDead) continue;
      for (const char of enemy.buff) {
        if (char.deactivated) continue;
        if (c === char.condition) {
          triggerAddOn(char, state, position);
        }
      }
    }
  });
}

export function triggerAddOn(
  buff: Skill,
  gameState: GameState,
  position: number,
  oldState?: GameState,
) {
  switch (buff.type) {
    case 101:
      if (!buff._101) {
        console.log("Wrong data");
        break;
      }

      switch (buff._101.damageType) {
        case DamageType.BASIC:
        case DamageType.BASIC_ADDON: {
          console.log("test101");
          if (buff._101.multiple) {
            for (let i = 0; i < buff._101.multiple; i++) {
              if (buff._101.target === Target.ALL_ALLIES) {
                dealBasicDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_1,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealBasicDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_2,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealBasicDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_3,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealBasicDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_4,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealBasicDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_5,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
              } else {
                dealBasicDamage(
                  position,
                  buff._101.value,
                  gameState,
                  buff._101.target,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
              }
            }
          } else {
            dealBasicDamage(
              position,
              buff._101.value,
              gameState,
              buff._101.target,
              buff._101.damageType,
              buff._101.action,
              buff._101.isTrueDamage,
            );
          }
          break;
        }
        case DamageType.BASIC_HP: {
          if (buff._101.multiple) {
            for (let i = 0; i < buff._101.multiple; i++) {
              dealBasicHpDamage(
                position,
                buff._101.value,
                gameState,
                buff._101.target,
                buff._101.damageType,
                buff._101.action,
                buff._101.isTrueDamage,
              );
            }
          } else {
            dealBasicHpDamage(
              position,
              buff._101.value,
              gameState,
              buff._101.target,
              buff._101.damageType,
              buff._101.action,
              buff._101.isTrueDamage,
            );
          }

          break;
        }
        case DamageType.ULTIMATE:
        case DamageType.ULTIMATE_ADDON:
        case DamageType.TRIGGER: {
          console.log("dealUltDamage");
          if (buff._101.multiple) {
            for (let i = 0; i < buff._101.multiple; i++) {
              if (buff._101.target === Target.ALL_ALLIES) {
                dealUltDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_1,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealUltDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_2,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealUltDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_3,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealUltDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_4,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
                dealUltDamage(
                  position,
                  buff._101.value,
                  gameState,
                  Target.POSITION_5,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
              } else {
                dealUltDamage(
                  position,
                  buff._101.value,
                  gameState,
                  buff._101.target,
                  buff._101.damageType,
                  buff._101.action,
                  buff._101.isTrueDamage,
                );
              }
            }
          } else {
            dealUltDamage(
              position,
              buff._101.value,
              gameState,
              buff._101.target,
              buff._101.damageType,
              buff._101.action,
              buff._101.isTrueDamage,
            );
          }
          break;
        }
        case DamageType.ULTIMATE_HP:
          if (buff._101.multiple) {
            for (let i = 0; i < buff._101.multiple; i++) {
              dealUltHpDamage(
                position,
                buff._101.value,
                gameState,
                buff._101.target,
                buff._101.damageType,
                buff._101.action,
                buff._101.isTrueDamage,
              );
            }
          } else {
            dealUltHpDamage(
              position,
              buff._101.value,
              gameState,
              buff._101.target,
              buff._101.damageType,
              buff._101.action,
              buff._101.isTrueDamage,
            );
          }
          break;
        // TODO
        case DamageType.DOT: {
          break;
        }
        default:
          break;
      }

      if (
        (buff._101.target >= 0 && buff._101.target < 5) ||
        (buff._101.target == Target.SELF && position >= 0 && position < 5)
      ) {
        parseCondition(
          buff._101.target == Target.SELF ? position : buff._101.target,
          [Condition.RECEIVED_ATTACK],
          gameState,
        );
      }
      break;
    case 104:
      if (!buff._104) {
        console.log("Wrong data");
        break;
      }
      switch (buff._104.target) {
        case Target.SELF: {
          // x is gameState buff
          const isExist = gameState.characters[position].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });

          if (isExist) {
            gameState.characters[position].buff.map((x) => {
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
              gameState.characters[position].buff = [
                ...gameState.characters[position].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
            }
          }
          break;
        }
        case Target.ALL_ALLIES: {
          gameState.characters.forEach((_, index) => {
            const isExist = gameState.characters[index].buff.some((x) => {
              return x.id === buff._104?.targetSkill;
            });

            if (isExist) {
              gameState.characters[index].buff = gameState.characters[
                index
              ].buff.map((x) => {
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
                gameState.characters[index].buff = [
                  ...gameState.characters[index].buff,
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
          const isExist = gameState.enemies[gameState.targeting].buff.some(
            (x) => {
              return x.id === buff._104?.targetSkill;
            },
          );
          if (isExist) {
            gameState.enemies[gameState.targeting].buff.map((x) => {
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
              gameState.enemies[gameState.targeting].buff = [
                ...gameState.enemies[gameState.targeting].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
            }
          }

          break;
        }
        case Target.ALL_ENEMIES: {
          {
            gameState.enemies.forEach((_, index) => {
              const isExist = gameState.enemies[index].buff.some((x) => {
                return x.id === buff._104?.targetSkill;
              });

              if (isExist) {
                gameState.enemies[index].buff = gameState.enemies[
                  index
                ].buff.map((x) => {
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
                console.log("give first buff, suppose only 5");
                if (buff._104?.applySkill) {
                  gameState.enemies[index].buff = [
                    ...gameState.enemies[index].buff,
                    buff._104.applySkill,
                  ];
                } else {
                  console.log("Wrong data buff._104.applySkill");
                }
              }
            });
          }
          break;
        }
        case Target.POSITION_1:
        case Target.POSITION_2:
        case Target.POSITION_3:
        case Target.POSITION_4:
        case Target.POSITION_5: {
          const pos = parseTargetToNum(buff._104.target);
          if (pos === -1) {
            console.log("Wrong data buff._104.target");
            break;
          }
          // x is gameState buff
          const isExist = gameState.characters[pos].buff.some((x) => {
            return x.id === buff._104?.targetSkill;
          });
          if (isExist) {
            gameState.characters[pos].buff.map((x) => {
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
              gameState.characters[pos].buff = [
                ...gameState.characters[pos].buff,
                buff._104.applySkill,
              ];
            } else {
              console.log("Wrong data buff._104.applySkill");
            }
          }
          break;
        }

        case Target.FIRE:
        case Target.LIGHT:
        case Target.DARK:
        case Target.WIND:
        case Target.WATER:
          {
            const attribute = buff._104.target;
            gameState.characters.forEach((character, index) => {
              //@ts-ignore
              if (character.attribute === attribute) {
                const isExist = gameState.characters[index].buff.some((x) => {
                  return x.id === buff._104?.targetSkill;
                });

                if (isExist) {
                  gameState.characters[index].buff.map((x) => {
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
                    gameState.characters[index].buff = [
                      ...gameState.characters[index].buff,
                      buff._104.applySkill,
                    ];
                  } else {
                    console.log("Wrong data buff._104.applySkill");
                  }
                }
              }
            });
          }
          break;
      }
      break;
    case 105:
      // if (!buff._105) {
      //   console.log("Wrong data");
      //   break;
      // }
      parseCondition(position, [Condition.RECEIVED_ATTACK], gameState);
      break;
    case 106:
      if (!buff._106) {
        console.log("Wrong data 106");
        break;
      }
      gameState.characters.forEach((character, index) => {
        const rawAttSkill = applyRawAttBuff(gameState, position);
        const baseAtk = gameState.characters[position].atk;
        if (character.class === buff._106?.target) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._106.duration,
              _0: {
                value: buff._106?.base === true
                  ? Math.floor(baseAtk * buff._106.value)
                  : Math.floor(rawAttSkill * buff._106.value),
                affectType: buff._106?.affectType,
              },
            },
          ];
        } else if (buff._106?.target === Target.ALL_ALLIES) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            {
              id: `${buff.id}-buff`,
              name: buff.name,
              type: 0,
              condition: Condition.NONE,
              duration: buff._106.duration,
              _0: {
                value: buff._106?.base === true
                  ? Math.floor(baseAtk * buff._106.value)
                  : Math.floor(rawAttSkill * buff._106.value),
                affectType: buff._106?.affectType,
              },
            },
          ];
        } else if (buff._106?.target === Target.ALL_EXCEPT_SELF) {
          if (index !== position) {
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              {
                id: `${buff.id}-buff`,
                name: buff.name,
                type: 0,
                condition: Condition.NONE,
                duration: buff._106.duration,
                _0: {
                  value: buff._106?.base === true
                    ? Math.floor(baseAtk * buff._106.value)
                    : Math.floor(rawAttSkill * buff._106.value),
                  affectType: buff._106?.affectType,
                },
              },
            ];
          }
        }
      });
      if (buff._106?.target === Target.SELF) {
        const rawAttSkill = applyRawAttBuff(gameState, position);
        const baseAtk = gameState.characters[position].atk;
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          {
            id: `${buff.id}-buff`,
            name: buff.name,
            type: 0,
            condition: Condition.NONE,
            duration: buff._106.duration,
            _0: {
              value: buff._106?.base === true
                ? Math.floor(baseAtk * buff._106.value)
                : Math.floor(rawAttSkill * buff._106.value),
              affectType: buff._106?.affectType,
            },
          },
        ];
      }
      if (buff._106?.target === Target.POSITION_1) {
        const rawAttSkill = applyRawAttBuff(gameState, position);
        const baseAtk = gameState.characters[position].atk;
        gameState.characters[0].buff = [
          ...gameState.characters[0].buff,
          {
            id: `${buff.id}-buff`,
            name: buff.name,
            type: 0,
            condition: Condition.NONE,
            duration: buff._106.duration,
            _0: {
              value: buff._106?.base === true
                ? Math.floor(baseAtk * buff._106.value)
                : Math.floor(rawAttSkill * buff._106.value),
              affectType: buff._106?.affectType,
            },
          },
        ];
      }
      break;
    case 111:
      if (!buff._111) {
        console.log("Wrong data 111");
        break;
      }
      if (buff._111?.target === Target.SELF) {
        gameState.characters[position].buff = [
          ...gameState.characters[position].buff,
          ...buff._111.applySkill,
        ];
      } else if (buff._111?.target === Target.ENEMY) {
        gameState.enemies[gameState.targeting].buff = [
          ...gameState.enemies[gameState.targeting].buff,
          ...buff._111.applySkill,
        ];
      } else if (buff._111?.target === Target.ALL_ALLIES) {
        gameState.characters.forEach((_, index) => {
          if (!buff._111) {
            console.log("_111 Apply buff don't exist");
            return;
          }
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            ...buff._111.applySkill,
          ];
        });
      } else if (buff._111?.target === Target.ATTACKER) {
        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.ATTACKER) {
            if (!buff._111) {
              console.log("Wrong data 111");
              return;
            }
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              ...buff._111?.applySkill,
            ];
          }
        });
      } else if (buff._111?.target === Target.OBSTRUCTER) {
        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.OBSTRUCTER) {
            if (!buff._111) {
              console.log("Wrong data 111");
              return;
            }
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              ...buff._111?.applySkill,
            ];
          }
        });
      } else if (buff._111?.target === Target.PROTECTOR) {
        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.PROTECTOR) {
            if (!buff._111) {
              console.log("Wrong data 111");
              return;
            }
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              ...buff._111?.applySkill,
            ];
          }
        });
      } else if (buff._111?.target === Target.SUPPORT) {
        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.SUPPORT) {
            if (!buff._111) {
              console.log("Wrong data 111");
              return;
            }
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              ...buff._111?.applySkill,
            ];
          }
        });
      } else if (buff._111?.target === Target.HEALER) {
        gameState.characters.forEach((character, index) => {
          if (character.class === CharacterClass.HEALER) {
            if (!buff._111) {
              console.log("Wrong data 111");
              return;
            }
            gameState.characters[index].buff = [
              ...gameState.characters[index].buff,
              ...buff._111?.applySkill,
            ];
          }
        });
      }

      switch (buff._111?.target) {
        case Target.WATER:
          gameState.characters.forEach((character, index) => {
            if (character.attribute === CharacterAttribute.WATER) {
              if (!buff._111) {
                console.log("Wrong data 111");
                return;
              }
              gameState.characters[index].buff = [
                ...gameState.characters[index].buff,
                ...buff._111?.applySkill,
              ];
            }
          });
      }

      if (buff._111.deleteSelf) {
        const buffIndex = gameState.characters[position].buff.findIndex(
          (x) => x.id === buff.id,
        );
        const clone = [...gameState.characters[position].buff];
        clone.splice(buffIndex, 1);
        gameState.characters[position].buff = clone;
      }
      break;

    case 113: {
      if (!buff._113) {
        console.log("Wrong data 113");
        break;
      }

      console.log("test113");
      gameState.characters.forEach((character, index) => {
        if (character.id === buff._113?.target) {
          gameState.characters[index].buff = [
            ...gameState.characters[index].buff,
            ...buff._113.applySkill,
          ];
        }
      });
      break;
    }
  }
}
