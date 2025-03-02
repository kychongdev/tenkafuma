import { AffectType } from "@/types/Skill";
import { CharacterState } from "@/types/Select";
import { f } from "../_core/utils";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CharacterStats = (props: { character: CharacterState }) => {
  const atkBuff = props.character.atk;
  const atkPercentage = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_ATK) {
      return acc + buff._0?.value;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_ATK) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    return acc;
  }, 0);
  const rawAtk = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (buff.type === 0 && buff._0?.affectType === AffectType.RAW_ATK) {
      return acc + buff._0?.value;
    }
    return acc;
  }, 0);

  const increaseDmg = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (buff.type === 0 && buff._0?.affectType === AffectType.INCREASE_DMG) {
      return acc + buff._0?.value;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.INCREASE_DMG) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (buff.type === 0 && buff._0?.affectType === AffectType.DECREASE_DMG) {
      return acc - buff._0?.value;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.DECREASE_DMG) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const increaseDmgReceived = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DMG_RECEIVED
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DMG_RECEIVED
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const basicAtkBuff = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_BASIC_DMG
    ) {
      return acc + buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_BASIC_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_BASIC_DMG
    ) {
      return acc - buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_BASIC_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }

    return acc;
  }, 0);

  const darkAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_DARK_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_DARK_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_DARK_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_DARK_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const lightAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_LIGHT_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_LIGHT_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_LIGHT_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_LIGHT_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const fireAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_FIRE_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_FIRE_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_FIRE_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_FIRE_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const windAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WIND_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WIND_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WIND_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WIND_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const waterAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_WATER_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_WATER_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_WATER_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_WATER_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const triggerAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_TRIGGER_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_TRIGGER_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_TRIGGER_DMG
    ) {
      return acc - buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_TRIGGER_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const triggerEffectAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_TRIGGER_EFFECT
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }

    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
    ) {
      return acc - buff._0?.value;
    }

    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_TRIGGER_EFFECT
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const ultimateAttribute = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.INCREASE_ULTIMATE_DMG
    ) {
      return acc + buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.INCREASE_ULTIMATE_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    if (
      buff.type === 0 &&
      buff._0?.affectType === AffectType.DECREASE_ULTIMATE_DMG
    ) {
      return acc - buff._0?.value;
    }
    if (
      buff.type === 3 &&
      buff._3?.affectType === AffectType.DECREASE_ULTIMATE_DMG
    ) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc - _value;
    }
    return acc;
  }, 0);

  const otherAttribute = props.character.buff.reduce((acc, _) => {
    return acc;
    //TO BE ADDED
  }, 0);
  const hpPercentage = props.character.buff.reduce((acc, buff) => {
    if (buff.deactivated) return acc;
    if (buff.type === 0 && buff._0?.affectType === AffectType.MAX_HP) {
      return acc + buff._0?.value;
    }
    if (buff.type === 3 && buff._3?.affectType === AffectType.MAX_HP) {
      const _value = buff._3?.value * buff._3?.stack;
      return acc + _value;
    }
    return acc;
  }, 0);

  function roundNum(num: number) {
    return (Math.round(num * 1000) / 10).toFixed(2);
  }

  return (
    <ScrollArea className="grid gap-1 h-96">
      <Card className="p-2 text-sm ">HP: {f(props.character.maxHp)}</Card>
      <Card className="p-2 text-sm ">
        總攻擊力: {f(Math.floor(atkBuff * (atkPercentage + 1) + rawAtk))}
      </Card>
      {roundNum(atkPercentage) !== "0.00"
        ? (
          <Card className="p-2 text-sm ">
            最大HP加成 : {f(hpPercentage * 100)}%
          </Card>
        )
        : null}
      {f(rawAtk) !== "0"
        ? <Card className="p-2 text-sm ">攻擊力加成(定值): {f(rawAtk)}</Card>
        : null}
      {roundNum(atkPercentage) !== "0.00"
        ? (
          <Card className="p-2 text-sm ">
            ATK加成%: {roundNum(atkPercentage)}%
          </Card>
        )
        : null}
      {f(atkBuff) !== "0"
        ? <Card className="p-2 text-sm ">基礎攻擊力: {f(atkBuff)}</Card>
        : null}
      {roundNum(increaseDmg) !== "0.00"
        ? (
          <Card className="p-2 text-sm ">
            造成傷害加成%: {roundNum(increaseDmg)}%
          </Card>
        )
        : null}
      {roundNum(increaseDmgReceived) !== "0.00"
        ? (
          <Card className="p-2 text-sm ">
            受到傷害加成%: {roundNum(increaseDmgReceived)}%
          </Card>
        )
        : null}
      {f(fireAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            火屬性傷害加成%: {roundNum(fireAttribute)}%
          </Card>
        )
        : null}
      {f(waterAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            水屬性傷害加成%: {roundNum(waterAttribute)}%
          </Card>
        )
        : null}
      {f(windAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            風屬性傷害加成%: {roundNum(windAttribute)}%
          </Card>
        )
        : null}
      {f(lightAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            光屬性傷害加成%: {roundNum(lightAttribute)}%
          </Card>
        )
        : null}
      {f(darkAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            暗屬性傷害加成%: {roundNum(darkAttribute)}%
          </Card>
        )
        : null}
      {f(basicAtkBuff) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            普攻效果加成%: {roundNum(basicAtkBuff)}%
          </Card>
        )
        : null}
      {f(ultimateAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            必殺效果加成%: {roundNum(ultimateAttribute)}%
          </Card>
        )
        : null}
      {f(triggerEffectAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            觸發效果加成%: {roundNum(triggerEffectAttribute)}%
          </Card>
        )
        : null}
      {f(triggerAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            觸發傷害加成%: {roundNum(triggerAttribute)}%
          </Card>
        )
        : null}
      {f(otherAttribute) !== "0"
        ? (
          <Card className="p-2 text-sm ">
            其他類效果加成%: {roundNum(otherAttribute)}%
          </Card>
        )
        : null}
    </ScrollArea>
  );
};
