"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Accordion } from "@radix-ui/react-accordion";
import { Pie, PieChart } from "recharts";
import { formatNumber } from "@/core/utils";
import { Separator } from "@/components/ui/separator";
import { useGameState } from "../../(battle)/GameState";
import { DamageType } from "../../(battle)/types/Skill";

export default function Stats() {
  const characters = useGameState((state) => state.characters);

  const totalDamage = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => acc + log.damage, 0),
  );
  const triggerDamage = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === DamageType.TRIGGER) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const ultimateDamage = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const basicDamage = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === DamageType.BASIC) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceBasic = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === DamageType.BASIC_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceUltimate = useGameState((state) =>
    state.damageLog1.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  // const sourceNone = useGameState((state) =>
  //   state.damage_log_1.reduce((acc, log) => {
  //     if (log.type=== DamageType) {
  //       return acc + log.damage;
  //     }
  //     return acc;
  //   }, 0),
  // );

  const totalDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === DamageType.TRIGGER) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const ultimateDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const basicDamage2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === DamageType.BASIC) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceBasic2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === DamageType.BASIC_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceUltimate2 = useGameState((state) =>
    state.damageLog2.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const totalDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === DamageType.TRIGGER) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const ultimateDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const basicDamage3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === DamageType.BASIC) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceBasic3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === DamageType.BASIC_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceUltimate3 = useGameState((state) =>
    state.damageLog3.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const totalDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === DamageType.TRIGGER) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const ultimateDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const basicDamage4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === DamageType.BASIC) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceBasic4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === DamageType.BASIC_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceUltimate4 = useGameState((state) =>
    state.damageLog4.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const totalDamage5 = useGameState((state) =>
    state.damageLog5.reduce((acc, log) => acc + log.damage, 0),
  );

  const triggerDamage5 = useGameState((state) =>
    state.damageLog5.reduce((acc, log) => {
      if (log.type === DamageType.TRIGGER) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const ultimateDamage5 = useGameState((state) =>
    state.damageLog5.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const basicDamage5 = useGameState((state) =>
    state.damageLog5.reduce((acc, log) => {
      if (log.type === DamageType.BASIC) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceBasic5 = useGameState((state) =>
    state.damageLog5.reduce((acc, log) => {
      if (log.type === DamageType.BASIC_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );
  const sourceUltimate5 = useGameState((state) =>
    state.damageLog5.reduce((acc, log) => {
      if (log.type === DamageType.ULTIMATE_ADDON) {
        return acc + log.damage;
      }
      return acc;
    }, 0),
  );

  const teamTotalDamage =
    totalDamage + totalDamage2 + totalDamage3 + totalDamage4 + totalDamage5;

  const chartConfig = {
    [`[1] ${characters[0].name}`]: {
      color: "#1446A0",
    },
    [`[2] ${characters[1].name}`]: {
      color: "#DB3069",
    },
    [`[3] ${characters[2].name}`]: {
      color: "#F5D547",
    },
    [`[4] ${characters[3].name}`]: {
      color: "#4ECDC4",
    },
    [`[5] ${characters[4].name}`]: {
      color: "#FA8334",
    },
  } satisfies ChartConfig;
  const chartData = [
    {
      name: `[1] ${characters[0].name}`,
      value: +((totalDamage / teamTotalDamage) * 100).toFixed(2),
      fill: "#1446A0",
    },
    {
      name: `[2] ${characters[1].name}`,
      value: +((totalDamage2 / teamTotalDamage) * 100).toFixed(2),
      fill: "#DB3069",
    },
    {
      name: `[3] ${characters[2].name}`,
      value: +((totalDamage3 / teamTotalDamage) * 100).toFixed(2),
      fill: "#F5D547",
    },
    {
      name: `[4] ${characters[3].name}`,
      value: +((totalDamage4 / teamTotalDamage) * 100).toFixed(2),
      fill: "#4ECDC4",
    },
    {
      name: `[5] ${characters[4].name}`,
      value: +((totalDamage5 / teamTotalDamage) * 100).toFixed(2),
      fill: "#FA8334",
    },
  ];

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={chartData}
            dataKey="value"
            label
            nameKey="name"
            isAnimationActive={false}
          />
        </PieChart>
      </ChartContainer>
      <Accordion type="single" collapsible className="w-full px-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {characters[0].name}: {formatNumber(totalDamage)}
          </AccordionTrigger>
          <AccordionContent>
            <div>普攻型攻擊: {formatNumber(basicDamage)}</div>
            <div>必殺型傷害: {formatNumber(ultimateDamage)}</div>
            <div>觸發型傷害: {formatNumber(triggerDamage)}</div>
            <div>普攻追加傷害: {formatNumber(sourceBasic)}</div>
            <div>必殺追加傷害: {formatNumber(sourceUltimate)}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            {characters[1].name}: {formatNumber(totalDamage2)}
          </AccordionTrigger>
          <AccordionContent>
            <div>普攻型攻擊: {formatNumber(basicDamage2)}</div>
            <div>必殺型傷害: {formatNumber(ultimateDamage2)}</div>
            <div>觸發型傷害: {formatNumber(triggerDamage2)}</div>
            <div>普攻追加傷害: {formatNumber(sourceBasic2)}</div>
            <div>必殺追加傷害: {formatNumber(sourceUltimate2)}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            {characters[2].name}: {formatNumber(totalDamage3)}
          </AccordionTrigger>
          <AccordionContent>
            <div>普攻型攻擊: {formatNumber(basicDamage3)}</div>
            <div>必殺型傷害: {formatNumber(ultimateDamage3)}</div>
            <div>觸發型傷害: {formatNumber(triggerDamage3)}</div>
            <div>普攻追加傷害: {formatNumber(sourceBasic3)}</div>
            <div>必殺追加傷害: {formatNumber(sourceUltimate3)}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            {characters[3].name}: {formatNumber(totalDamage4)}
          </AccordionTrigger>
          <AccordionContent>
            <div>普攻型攻擊: {formatNumber(basicDamage4)}</div>
            <div>必殺型傷害: {formatNumber(ultimateDamage4)}</div>
            <div>觸發型傷害: {formatNumber(triggerDamage4)}</div>
            <div>普攻追加傷害: {formatNumber(sourceBasic4)}</div>
            <div>必殺追加傷害: {formatNumber(sourceUltimate4)}</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            {characters[4].name}: {formatNumber(totalDamage5)}
          </AccordionTrigger>
          <AccordionContent>
            <div>普攻型攻擊: {formatNumber(basicDamage5)}</div>
            <div>必殺型傷害: {formatNumber(ultimateDamage5)}</div>
            <div>觸發型傷害: {formatNumber(triggerDamage5)}</div>
            <div>普攻追加傷害: {formatNumber(sourceBasic5)}</div>
            <div>必殺追加傷害: {formatNumber(sourceUltimate5)}</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
