"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CharacterTeam } from "../../../_types/Select";
import { CharStatsSelect } from "../../CharStatsSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "@/app/i18n/routing";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useParams } from "next/navigation";
import { isString } from "lodash";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Edit() {
  const t = useTranslations("Team");
  const { index } = useParams();
  const router = useRouter();
  const [team, setTeam] = useLocalStorage<CharacterTeam[]>("team", []);

  if (!index || !isString(index)) {
    return <div>Wrong Parameter</div>;
  }

  const teamData = team[parseInt(index)];
  const form = useForm<CharacterTeam>({
    values: teamData,
  });
  const { handleSubmit, watch } = form;

  function onSubmit(data: CharacterTeam) {
    if (!index || !isString(index)) {
      return;
    }
    const teams = team.map((x, i) => {
      console.log(i, index);
      if (i === parseInt(index)) {
        console.log(data);
        return data;
      }
      return x;
    });
    setTeam(teams);
    router.push("/team");
  }

  return (
    <div className="w-full max-w-[420px] mx-auto p-2 font-[family-name:var(--font-geist-sans)]">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <CharStatsSelect useForm={form} position={0} char={watch("0.id")} />
            <CharStatsSelect useForm={form} position={1} char={watch("1.id")} />
            <CharStatsSelect useForm={form} position={2} char={watch("2.id")} />
            <CharStatsSelect useForm={form} position={3} char={watch("3.id")} />
            <CharStatsSelect useForm={form} position={4} char={watch("4.id")} />
          </div>

          <div className="flex justify-end mt-3">
            <Button type="submit">{t("Edit")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
