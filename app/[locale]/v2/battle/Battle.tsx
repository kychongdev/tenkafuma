"use client";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { f, p } from "../(battle)/utils";
import { BattleLog } from "./BattleLog";
import { EnemyStatus } from "./EnemyStatus";
import {
  ArrowLeft,
  ArrowRight,
  ChartPie,
  Info,
  RotateCcw,
  Save,
  Sword,
  Undo,
} from "lucide-react";
import { useStore } from "zustand";
import { SaveBattle } from "./SaveBattle";
import { CharacterState } from "../(battle)/types/Select";
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
import { Target } from "../(battle)/types/Skill";
import { useGameState } from "../(battle)/GameState";
import { HealLog } from "./HealLog";
import { useSimulateTeamState } from "../(simulate)/useSimulateState";

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
    enemies,
    moveLeft,
    moveRight,
    targeting,
    initBattle,
    select,
    undoLastAction,
    action,
    damageLog1,
    damageLog2,
    damageLog3,
    damageLog4,
    damageLog5,
    battleSettings,
    debug,
    enableEveryTurnAttack,
    addEveryTurnAttackTarget,
  } = useStore(useGameState, (state) => state);

  const { saveToTeam } = useStore(useSimulateTeamState, (state) => state);

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Badge>{t("turn", { turn })}</Badge>
            <Badge>Wave {wave}</Badge>
          </div>
        </div>
        <Progress
          value={(enemies[targeting].hp / enemies[targeting].maxHp) * 100}
          className="mt-3 w-full"
        />
        <div className="text-end text-sm">
          {f(enemies[targeting].hp)}
          {"      "}(
          {((enemies[targeting].hp / enemies[targeting].maxHp) * 100).toFixed(
            2,
          )}
          %) HP
        </div>

        <div className="">
          {ready ? (
            <div className="grid grid-cols-3">
              <div className="flex items-center justify-center">
                <ArrowLeft onClick={() => moveLeft()} />
              </div>
              <div className="flex items-center justify-center">
                <div>
                  <EnemyStatus position={targeting} />
                  <div className="text-white text-center">
                    Enemy {targeting + 1}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight onClick={() => moveRight()} />
              </div>
            </div>
          ) : (
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
        {!checkEnemyAlive(enemies) && stage !== "dummy" ? <SaveBattle /> : null}

        <div className="flex flex-wrap gap-2">
          <BattleLog />
          <HealLog />
          <Button
            className="px-2 gap-1"
            onClick={() => {
              router.push("/v2/battle/stats");
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
              router.push("/v2/stage");
            }}
          >
            <Sword /> {t("Stage")}
          </Button>

          <Button
            className="px-2 gap-1"
            onClick={() => {
              debug();
            }}
          >
            <Undo /> debug{" "}
          </Button>
          <Button
            className="px-2 gap-1"
            onClick={() => {
              undoLastAction();
            }}
          >
            <Undo /> {t("Undo")}
          </Button>

          {stage == "dummy" ? (
            <Button
              className="px-2 gap-1"
              onClick={() => {
                if (select) {
                  saveToTeam(
                    p(select),
                    p(action),
                    p({
                      damageLog1,
                      damageLog2,
                      damageLog3,
                      damageLog4,
                      damageLog5,
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
          ) : null}
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
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
