"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SimulateTeamSelect } from "./SimulateTeamSelect";
import { useSimulateTeamState } from "@/core/SimulateTeamState";
import { Book } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SimulateTeam() {
  const teams = useSimulateTeamState((state) => state.teams);
  const t = useTranslations("SimulatePage");

  return (
    <div className="w-full max-w-[420px] p-2 mx-auto font-[family-name:var(--font-geist-sans)]">
      <Alert>
        <AlertDescription className="flex gap-2">
          <Book className="h-4 w-4" />
          {t("label")}
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-3">
        {teams.map((_, index) => {
          return <SimulateTeamSelect key={index} index={index} />;
        })}
      </div>
    </div>
  );
}
