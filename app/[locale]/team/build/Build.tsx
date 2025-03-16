"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { CharacterTeam } from "../../(battle)/types/Select";
import { CharStatsSelect } from "../CharStatsSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "@/app/i18n/routing";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function Build() {
  const t = useTranslations("Team");
  const [teams, setTeam] = useLocalStorage<CharacterTeam[]>("team", []);
  const defaultChar = {
    id: "",
    hpPot: 100,
    atkPot: 100,
    level: 60,
    bond: 5,
    stars: 5,
    discipline: 3,
    isPot6: true,
    lib: 0,
  };

  const form = useForm<CharacterTeam>({
    defaultValues: {
      0: defaultChar,
      1: defaultChar,
      2: defaultChar,
      3: defaultChar,
      4: defaultChar,
    },
  });
  const { handleSubmit, watch } = form;
  const router = useRouter();

  function onSubmit(data: CharacterTeam) {
    setTeam([...teams, data]);
    router.push("/team");
  }

  return (
    <div className="w-full max-w-[500px] mx-auto p-2 font-[family-name:var(--font-geist-sans)]">
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
            <Button type="submit">{t("Create")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
