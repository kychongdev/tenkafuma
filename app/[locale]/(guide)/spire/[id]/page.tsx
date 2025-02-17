import { ActionLog } from "@/core/Analysis";
import type { CharacterTeam } from "@/types/Select";
import { TeamSelectData } from "./TeamSelectData";
import { createClient } from "@/supabase/server";

export interface CharacterTeamData {
  client_id: string;
  stage: string;
  profiles: {
    avatar: string;
    name: string;
  };
  select: CharacterTeam;
  action: ActionLog[];
  created_at: Date;
}

export default async function Page(
  { params, searchParams },
) {
  const { id } = await params;

  const supabase = await createClient();

  const { data } = await supabase
    .from("stage_team")
    .select(
      `profiles (name,avatar), client_id, stage, author, select, action, created_at`,
    ).eq("stage", id).returns<CharacterTeamData[]>();

  //const search = await searchParams;
  //.overlaps('team', searchParams.team)

  console.log(data);

  return (
    <div className="w-full mx-auto max-w-[420px] p-2 font-[family-name:var(--font-geist-sans)] px-4 py-2">
      {data && data.map((x) => <TeamSelectData key={x.client_id} data={x} />)}
    </div>
  );
}
