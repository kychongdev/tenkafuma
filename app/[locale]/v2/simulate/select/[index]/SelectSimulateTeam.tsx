"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SimulateCharStatsSelect } from "../SimulateCharStatsSelect";
import { useRouter } from "@/app/i18n/routing";
import { useParams } from "next/navigation";
import { useGameState } from "../../../(battle)/GameState";
import { useSimulateTeamState } from "../../../(simulate)/useSimulateState";
import { CharacterTeam } from "../../../(battle)/types/Select";

export default function SelectSimulateTeam() {
  const param = useParams();
  const index = parseInt(param.index as string);
  const t = useTranslations("Team");
  const teams = useSimulateTeamState((state) => state.teams);
  const { initBattle, basicAction, ultAction, guardAction, analysis } =
    useGameState((state) => state);
  const router = useRouter();

  const form = useForm<CharacterTeam>({
    values: teams[index].team,
  });

  const { handleSubmit, watch } = form;

  function onSubmit(data: CharacterTeam) {
    initBattle(data);

    const baseAction = teams[index].baseAction;
    console.log("Base Action:", baseAction);
    baseAction.forEach((action) => {
      switch (action.position) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4: {
          console.log("Basic Action:", action.position);
          basicAction(action.position);
          break;
        }
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          console.log("Ult Action:", action.position);
          ultAction(action.position - 5);
          break;
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
          console.log("Guard Action:", action.position);
          guardAction(action.position - 10);
          break;
        default:
          console.log("Invalid move");
          break;
      }
    });
    analysis(index);
    router.push(`/simulate/result/${index}`);
  }

  return (
    <div className="w-full max-w-[420px] mx-auto p-2 font-[family-name:var(--font-geist-sans)]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <SimulateCharStatsSelect
              useForm={form}
              position={0}
              char={watch("0.id")}
            />
            <SimulateCharStatsSelect
              useForm={form}
              position={1}
              char={watch("1.id")}
            />
            <SimulateCharStatsSelect
              useForm={form}
              position={2}
              char={watch("2.id")}
            />
            <SimulateCharStatsSelect
              useForm={form}
              position={3}
              char={watch("3.id")}
            />
            <SimulateCharStatsSelect
              useForm={form}
              position={4}
              char={watch("4.id")}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button type="submit">模擬</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
