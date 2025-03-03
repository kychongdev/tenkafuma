"use client";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TurnState, useGameState } from "@/core/GameState";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CharacterButton } from "./CharacterButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/app/i18n/routing";
import { useEffect, useState } from "react";
import { f, p } from "../_core/utils";
import { BattleLog } from "./BattleLog";
import { EnemyStatus } from "./EnemyStatus";
import { useSimulateTeamState } from "../_core/SimulateTeamState";
import { ChartPie, Info, RotateCcw, Save, Sword, Undo } from "lucide-react";
import { useStore } from "zustand";
import { SaveBattle } from "./SaveBattle";
import { CharacterState } from "../_types/Select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { GearIcon } from "@radix-ui/react-icons";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Target } from "../_types/Skill";

function checkEnemyAlive(enemies: CharacterState[]) {
  return enemies.filter((enemy) => enemy.hp > 0).length > 0;
}

export default function Battle() {
  const t = useTranslations("Battle");
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();

  const {
    ready,
    wave,
    turn,
    stage,
    turn_state: turnState,
    enemies,
    setTargeting,
    targeting,
    initBattle,
    select,
    undoLastAction,
    debug,
    action,
    damage_log_1,
    damage_log_2,
    damage_log_3,
    damage_log_4,
    damage_log_5,
    battleSettings,
    enableEveryTurnAttack,
    setEveryTurnAttackTarget,
  } = useStore(useGameState, (state) => state);

  const { saveToTeam } = useStore(useSimulateTeamState, (state) => state);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setTargeting(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Badge>{t("turn", { turn })}</Badge>
            <Badge>Wave {wave}</Badge>
          </div>
          <Badge>
            {turnState === TurnState.PLAYER_TURN
              ? t("player_turn")
              : turnState === TurnState.ENEMY_TURN
              ? t("enemy_turn")
              : t("data_error")}
          </Badge>
        </div>
        <Progress
          value={(enemies[targeting].hp / enemies[targeting].maxHp) * 100}
          className="mt-3 w-full"
        />
        <div className="text-end text-sm">
          {f(enemies[targeting].hp)}{"      "}(
          {((enemies[targeting].hp / enemies[targeting].maxHp) * 100).toFixed(
            2,
          )}
          %) HP
        </div>

        <div className="flex min-h-[100px] justify-center mt-4 items-center">
          {ready
            ? (
              <div className="mx-12 col-span-3">
                <Carousel
                  setApi={setApi}
                  className="w-full max-w-xs mb-3 "
                >
                  <CarouselContent>
                    {enemies.map((enemy, index) => (
                      <CarouselItem key={index} className="">
                        <EnemyStatus position={index} />
                        <div className="text-white text-center">
                          Enemy {index + 1}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )
            : (
              <Button
                onClick={() => {
                  router.push("/team");
                }}
              >
                Please pick a team
              </Button>
            )}
        </div>
        <div className="grid grid-cols-5 gap-2 mb-5">
          <CharacterButton position={0} />
          <CharacterButton position={1} />
          <CharacterButton position={2} />
          <CharacterButton position={3} />
          <CharacterButton position={4} />
        </div>
        {!checkEnemyAlive(enemies) && stage !== "wood" ? <SaveBattle /> : null}

        <div className="flex flex-wrap gap-2">
          <BattleLog />
          <Button
            className="px-2 gap-1"
            onClick={() => {
              router.push("/battle/stats");
            }}
          >
            <ChartPie /> {t("Damage Stats")}
          </Button>
          <Button
            className="px-2 gap-1"
            onClick={() => {
              if (select) initBattle(select);
            }}
          >
            <RotateCcw /> {t("Restart")}
          </Button>

          <Button
            className="px-2 gap-1"
            onClick={() => {
              router.push("/stage");
            }}
          >
            <Sword /> {t("Stage")}
          </Button>

          <Button
            className="px-2 gap-1"
            onClick={() => {
              undoLastAction();
            }}
          >
            <Undo /> {t("Undo")}
          </Button>

          {stage == "wood"
            ? (
              <Button
                className="px-2 gap-1"
                onClick={() => {
                  if (select) {
                    saveToTeam(
                      p(select),
                      p(action),
                      p({
                        damage_log_1,
                        damage_log_2,
                        damage_log_3,
                        damage_log_4,
                        damage_log_5,
                      }),
                      p(turn),
                    );
                  } else {
                    console.log("no team selected");
                  }
                }}
              >
                <Save /> {t("Save To Calculator")}
              </Button>
            )
            : null}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-2 gap-1">
                <GearIcon />
                {t("Settings")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[350px]">
              <DialogHeader>
                <DialogTitle>{t("Control Centre")}</DialogTitle>
              </DialogHeader>
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="attack"
                    checked={battleSettings.everyTurnAttack}
                    onCheckedChange={() => {
                      enableEveryTurnAttack();
                    }}
                  />
                  <Label htmlFor="attack">{t("Every Turn Enemy Attack")}</Label>
                </div>
                <Separator className="my-2" />

                <Label>{t("Target")}:</Label>
                <div className="flex flex-wrap mt-2">
                  <Toggle
                    onPressedChange={() => {
                      setEveryTurnAttackTarget(Target.ALL_ALLIES);
                    }}
                    pressed={battleSettings.everyTurnAttackTarget ===
                      Target.ALL_ALLIES}
                    className="data-[state=on]:bg-green-500"
                  >
                    {t("ALL ALLIES")}
                  </Toggle>

                  <Toggle
                    onPressedChange={() => {
                      setEveryTurnAttackTarget(Target.POSITION_1);
                    }}
                    pressed={battleSettings.everyTurnAttackTarget ===
                      Target.POSITION_1}
                    className="data-[state=on]:bg-green-500"
                  >
                    {t("POSITION 1")}
                  </Toggle>

                  <Toggle
                    onPressedChange={() => {
                      setEveryTurnAttackTarget(Target.POSITION_2);
                    }}
                    pressed={battleSettings.everyTurnAttackTarget ===
                      Target.POSITION_2}
                    className="data-[state=on]:bg-green-500"
                  >
                    {t("POSITION 2")}
                  </Toggle>

                  <Toggle
                    onPressedChange={() => {
                      setEveryTurnAttackTarget(Target.POSITION_3);
                    }}
                    pressed={battleSettings.everyTurnAttackTarget ===
                      Target.POSITION_3}
                    className="data-[state=on]:bg-green-500"
                  >
                    {t("POSITION 3")}
                  </Toggle>

                  <Toggle
                    onPressedChange={() => {
                      setEveryTurnAttackTarget(Target.POSITION_4);
                    }}
                    pressed={battleSettings.everyTurnAttackTarget ===
                      Target.POSITION_4}
                    className="data-[state=on]:bg-green-500"
                  >
                    {t("POSITION 4")}
                  </Toggle>

                  <Toggle
                    onPressedChange={() => {
                      setEveryTurnAttackTarget(Target.POSITION_5);
                    }}
                    pressed={battleSettings.everyTurnAttackTarget ===
                      Target.POSITION_5}
                    className="data-[state=on]:bg-green-500"
                  >
                    {t("POSITION 5")}
                  </Toggle>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
