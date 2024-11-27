'use client';

import { SimulateTeamSelect } from './SimulateTeamSelect';
import { useSimulateTeamState } from '@/core/SimulateTeamState';

export default function SimulateTeam() {
  const teams = useSimulateTeamState((state) => state.teams);
  return (
    <div className="w-full max-w-[420px] p-2 mx-auto font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-3">
        {teams.map((_, index) => {
          return <SimulateTeamSelect key={index} index={index} />;
        })}
      </div>
    </div>
  );
}
